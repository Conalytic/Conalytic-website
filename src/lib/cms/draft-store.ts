import { Redis } from "@upstash/redis";
import { mkdir, readFile, writeFile, readdir, unlink } from "fs/promises";
import os from "os";
import path from "path";
import type { CmsDraftPayload } from "@/lib/cms/types";
import { getRegistryEntryById } from "@/lib/cms/page-registry";

function isServerlessDeploy(): boolean {
  return process.env.VERCEL === "1" || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

function getLocalDraftsDir(): string {
  if (isServerlessDeploy()) {
    return path.join(os.tmpdir(), "conalytic-cms-drafts");
  }
  return path.join(process.cwd(), ".cms-drafts");
}

export type CmsStorageStatus = {
  mode: "redis" | "local" | "serverless-ephemeral";
  canSaveSettings: boolean;
  message?: string;
};

export function getCmsStorageStatus(): CmsStorageStatus {
  if (getRedis()) {
    return { mode: "redis", canSaveSettings: true };
  }
  if (isServerlessDeploy()) {
    return {
      mode: "serverless-ephemeral",
      canSaveSettings: false,
      message:
        "Vercel cannot persist Studio settings to disk. Connect Upstash Redis to this project (KV_REST_API_URL + KV_REST_API_TOKEN) or set OPENAI_API_KEY, ANTHROPIC_API_KEY, and GITHUB_TOKEN as environment variables.",
    };
  }
  return { mode: "local", canSaveSettings: true };
}

let redis: Redis | null = null;

/** Vercel Upstash integration uses KV_*; direct Upstash uses UPSTASH_REDIS_REST_*. */
function resolveRedisRestCredentials(): { url: string; token: string } | null {
  const pairs: [string | undefined, string | undefined][] = [
    [process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN],
    [process.env.KV_REST_API_URL, process.env.KV_REST_API_TOKEN],
  ];

  for (const [url, token] of pairs) {
    const trimmedUrl = url?.trim();
    const trimmedToken = token?.trim();
    if (trimmedUrl && trimmedToken) {
      return { url: trimmedUrl, token: trimmedToken };
    }
  }

  return null;
}

function getRedis(): Redis | null {
  if (redis) return redis;
  const creds = resolveRedisRestCredentials();
  if (!creds) return null;
  redis = new Redis({ url: creds.url, token: creds.token });
  return redis;
}

function draftKey(sessionId: string, registryId: string) {
  return `draft:${sessionId}:${registryId}`;
}

function localDraftPath(sessionId: string, registryId: string) {
  return path.join(getLocalDraftsDir(), sessionId, `${registryId}.json`);
}

async function ensureLocalDir(sessionId: string) {
  await mkdir(path.join(getLocalDraftsDir(), sessionId), { recursive: true });
}

export async function saveDraft(
  sessionId: string,
  registryId: string,
  payload: CmsDraftPayload,
): Promise<void> {
  const entry = getRegistryEntryById(registryId);
  if (!entry) throw new Error("Unknown registry entry");

  const r = getRedis();
  if (r) {
    await r.set(draftKey(sessionId, registryId), payload);
    await r.sadd(`draft-index:${sessionId}`, registryId);
    return;
  }

  await ensureLocalDir(sessionId);
  await writeFile(localDraftPath(sessionId, registryId), JSON.stringify(payload, null, 2), "utf8");
}

export async function getDraft(
  sessionId: string,
  registryId: string,
): Promise<CmsDraftPayload | null> {
  const r = getRedis();
  if (r) {
    return (await r.get<CmsDraftPayload>(draftKey(sessionId, registryId))) ?? null;
  }

  try {
    const raw = await readFile(localDraftPath(sessionId, registryId), "utf8");
    return JSON.parse(raw) as CmsDraftPayload;
  } catch {
    return null;
  }
}

export async function deleteDraft(sessionId: string, registryId: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.del(draftKey(sessionId, registryId));
    await r.srem(`draft-index:${sessionId}`, registryId);
  } else {
    try {
      await unlink(localDraftPath(sessionId, registryId));
    } catch {
      /* ignore */
    }
  }

  await clearAiUndoSnapshot(sessionId, registryId);
}

export async function listDraftRegistryIds(sessionId: string): Promise<string[]> {
  const r = getRedis();
  if (r) {
    return (await r.smembers(`draft-index:${sessionId}`)) ?? [];
  }

  try {
    const dir = path.join(getLocalDraftsDir(), sessionId);
    const files = await readdir(dir);
    return files
      .filter((f) => f.endsWith(".json") && !f.startsWith("ai-undo-") && !f.startsWith("ai-chat-"))
      .map((f) => f.replace(/\.json$/, ""))
      .filter((id) => Boolean(getRegistryEntryById(id)));
  } catch {
    return [];
  }
}

export async function clearAllDrafts(sessionId: string, registryIds: string[]): Promise<void> {
  await Promise.all(registryIds.map((id) => deleteDraft(sessionId, id)));
}

/** Snapshot of draft state immediately before the last AI edit (single-level undo). */
export type AiUndoSnapshot = {
  draft: CmsDraftPayload | null;
};

function aiUndoKey(sessionId: string, registryId: string) {
  return `ai-undo:${sessionId}:${registryId}`;
}

function localAiUndoPath(sessionId: string, registryId: string) {
  return path.join(getLocalDraftsDir(), sessionId, `ai-undo-${registryId}.json`);
}

export async function saveAiUndoSnapshot(
  sessionId: string,
  registryId: string,
  draft: CmsDraftPayload | null,
): Promise<void> {
  const snapshot: AiUndoSnapshot = { draft };
  const r = getRedis();
  if (r) {
    await r.set(aiUndoKey(sessionId, registryId), snapshot);
    return;
  }

  await ensureLocalDir(sessionId);
  await writeFile(localAiUndoPath(sessionId, registryId), JSON.stringify(snapshot, null, 2), "utf8");
}

export async function getAiUndoSnapshot(
  sessionId: string,
  registryId: string,
): Promise<AiUndoSnapshot | null> {
  const r = getRedis();
  if (r) {
    return (await r.get<AiUndoSnapshot>(aiUndoKey(sessionId, registryId))) ?? null;
  }

  try {
    const raw = await readFile(localAiUndoPath(sessionId, registryId), "utf8");
    return JSON.parse(raw) as AiUndoSnapshot;
  } catch {
    return null;
  }
}

export async function clearAiUndoSnapshot(sessionId: string, registryId: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.del(aiUndoKey(sessionId, registryId));
    return;
  }

  try {
    await unlink(localAiUndoPath(sessionId, registryId));
  } catch {
    /* ignore */
  }
}

export async function consumeAiUndoSnapshot(
  sessionId: string,
  registryId: string,
): Promise<AiUndoSnapshot | null> {
  const snapshot = await getAiUndoSnapshot(sessionId, registryId);
  if (!snapshot) return null;
  await clearAiUndoSnapshot(sessionId, registryId);
  return snapshot;
}

export type AiChatMessage = {
  role: "user" | "assistant" | "system";
  text: string;
  undoable?: boolean;
};

const AI_CHAT_MAX_MESSAGES = 80;

function aiChatKey(sessionId: string, registryId: string) {
  return `ai-chat:${sessionId}:${registryId}`;
}

function localAiChatPath(sessionId: string, registryId: string) {
  return path.join(getLocalDraftsDir(), sessionId, `ai-chat-${registryId}.json`);
}

export async function getAiChatHistory(
  sessionId: string,
  registryId: string,
): Promise<AiChatMessage[]> {
  const r = getRedis();
  if (r) {
    return (await r.get<AiChatMessage[]>(aiChatKey(sessionId, registryId))) ?? [];
  }

  try {
    const raw = await readFile(localAiChatPath(sessionId, registryId), "utf8");
    return JSON.parse(raw) as AiChatMessage[];
  } catch {
    return [];
  }
}

export async function saveAiChatHistory(
  sessionId: string,
  registryId: string,
  messages: AiChatMessage[],
): Promise<void> {
  const trimmed = messages.slice(-AI_CHAT_MAX_MESSAGES);
  const r = getRedis();
  if (r) {
    await r.set(aiChatKey(sessionId, registryId), trimmed);
    return;
  }

  await ensureLocalDir(sessionId);
  await writeFile(localAiChatPath(sessionId, registryId), JSON.stringify(trimmed, null, 2), "utf8");
}

export async function clearAiChatHistory(sessionId: string, registryId: string): Promise<void> {
  const r = getRedis();
  if (r) {
    await r.del(aiChatKey(sessionId, registryId));
    return;
  }

  try {
    await unlink(localAiChatPath(sessionId, registryId));
  } catch {
    /* ignore */
  }
}

const SETTINGS_KEY = "cms:settings:encrypted";

export type AdminSettings = {
  openaiApiKey?: string;
  anthropicApiKey?: string;
  openaiModel?: string;
  anthropicModel?: string;
  githubToken?: string;
  githubRepo?: string;
  stagingBranch?: string;
  stagingPreviewUrl?: string;
  vercelStagingDeployHook?: string;
};

export async function getAdminSettings(): Promise<AdminSettings> {
  const r = getRedis();
  if (!r) return loadLocalSettings();

  const blob = await r.get<string>(SETTINGS_KEY);
  if (!blob) return envDefaultSettings();
  const { decryptJson } = await import("@/lib/admin/crypto");
  return decryptJson<AdminSettings>(blob);
}

export async function saveAdminSettings(settings: AdminSettings): Promise<void> {
  const storage = getCmsStorageStatus();
  if (!storage.canSaveSettings) {
    throw new Error(storage.message ?? "CMS settings storage is not available on this host.");
  }

  const { encryptJson } = await import("@/lib/admin/crypto");
  const blob = encryptJson(settings);
  const r = getRedis();
  if (r) {
    await r.set(SETTINGS_KEY, blob);
    return;
  }

  const dir = getLocalDraftsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "settings.enc"), blob, "utf8");
}

async function loadLocalSettings(): Promise<AdminSettings> {
  try {
    const blob = await readFile(path.join(getLocalDraftsDir(), "settings.enc"), "utf8");
    const { decryptJson } = await import("@/lib/admin/crypto");
    return decryptJson<AdminSettings>(blob);
  } catch {
    return envDefaultSettings();
  }
}

function envDefaultSettings(): AdminSettings {
  return {
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    githubToken: process.env.GITHUB_TOKEN,
    githubRepo: process.env.GITHUB_REPO || "Conalytic/Conalytic-website",
    stagingBranch: process.env.GITHUB_STAGING_BRANCH || "staging",
    stagingPreviewUrl:
      process.env.STAGING_PREVIEW_URL?.trim() ||
      process.env.NEXT_PUBLIC_STAGING_PREVIEW_URL?.trim(),
    openaiModel: "gpt-4.1",
    anthropicModel: "claude-sonnet-4-20250514",
  };
}
