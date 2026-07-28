"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Sparkles, Trash2 } from "lucide-react";
import { StudioAiPrompt } from "@/components/admin/ui/StudioAiPrompt";

type Message = {
  role: "user" | "assistant" | "system";
  text: string;
  undoable?: boolean;
};

type Props = {
  registryId: string;
  pageLabel?: string;
  onApplied: () => void;
};

function normalizeUndoableFlags(messages: Message[], undoAvailable: boolean): Message[] {
  if (!undoAvailable) {
    return messages.map((msg) => (msg.undoable ? { ...msg, undoable: false } : msg));
  }

  const lastUndoable = messages.findLastIndex((msg) => msg.role === "assistant");
  return messages.map((msg, i) => {
    if (msg.role !== "assistant") return msg.undoable ? { ...msg, undoable: false } : msg;
    return { ...msg, undoable: i === lastUndoable };
  });
}

export function AdminAiPanel({ registryId, pageLabel, onApplied }: Props) {
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [provider, setProvider] = useState<"openai" | "anthropic">("openai");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [historyReady, setHistoryReady] = useState(false);
  const skipSaveRef = useRef(true);

  const refreshUndoState = useCallback(async () => {
    const res = await fetch(`/api/admin/agent/undo?registryId=${encodeURIComponent(registryId)}`);
    if (!res.ok) return false;
    const json = (await res.json()) as { available?: boolean };
    return Boolean(json.available);
  }, [registryId]);

  const persistMessages = useCallback(
    async (next: Message[]) => {
      await fetch("/api/admin/agent/chat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registryId, messages: next }),
      });
    },
    [registryId],
  );

  const updateMessages = useCallback(
    (updater: Message[] | ((prev: Message[]) => Message[])) => {
      setMessages((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (historyReady && !skipSaveRef.current) {
          void persistMessages(next);
        }
        return next;
      });
    },
    [historyReady, persistMessages],
  );

  useEffect(() => {
    let cancelled = false;
    skipSaveRef.current = true;
    setHistoryReady(false);
    setPrompt("");
    setFiles([]);

    async function loadHistory() {
      const [chatRes, undoOpen] = await Promise.all([
        fetch(`/api/admin/agent/chat?registryId=${encodeURIComponent(registryId)}`),
        refreshUndoState(),
      ]);

      if (cancelled) return;

      let loaded: Message[] = [];
      if (chatRes.ok) {
        const json = (await chatRes.json()) as { messages?: Message[] };
        loaded = Array.isArray(json.messages) ? json.messages : [];
      }

      setUndoAvailable(undoOpen);
      setMessages(normalizeUndoableFlags(loaded, undoOpen));
      setHistoryReady(true);
      skipSaveRef.current = false;
    }

    void loadHistory();
    return () => {
      cancelled = true;
    };
  }, [registryId, refreshUndoState]);

  async function clearChat() {
    if (messages.length === 0 || clearing || loading) return;

    const label = pageLabel || "this page";
    if (!window.confirm(`Clear the AI chat for ${label}? Other pages keep their own history.`)) {
      return;
    }

    setClearing(true);
    const res = await fetch(`/api/admin/agent/chat?registryId=${encodeURIComponent(registryId)}`, {
      method: "DELETE",
    });
    setClearing(false);

    if (!res.ok) return;

    skipSaveRef.current = true;
    setMessages([]);
    setUndoAvailable(false);
    skipSaveRef.current = false;
  }

  async function runAgent() {
    const text = prompt.trim();
    if (!text && files.length === 0) return;

    setLoading(true);
    setUndoAvailable(false);
    const userLine =
      text ||
      (files.length === 1
        ? `Update this page using the attached file: ${files[0].name}`
        : `Update this page using ${files.length} attached files.`);
    updateMessages((prev) => [...prev, { role: "user", text: userLine }]);
    setPrompt("");

    const form = new FormData();
    form.set("registryId", registryId);
    form.set("prompt", text);
    form.set("provider", provider);
    for (const file of files) form.append("files", file);

    const res = await fetch("/api/admin/agent", { method: "POST", body: form });
    const json = (await res.json()) as {
      error?: string;
      summary?: string;
      undoAvailable?: boolean;
      changed?: boolean;
    };
    setLoading(false);
    setFiles([]);

    if (!res.ok) {
      updateMessages((prev) => [
        ...prev,
        { role: "assistant", text: json.error || "AI request failed. Check API keys in Settings." },
      ]);
      return;
    }

    const canUndo = Boolean(json.changed && json.undoAvailable);
    setUndoAvailable(canUndo);
    updateMessages((prev) => [
      ...prev.map((msg) => (msg.undoable ? { ...msg, undoable: false } : msg)),
      {
        role: "assistant",
        text:
          json.summary ||
          (json.changed
            ? "Changes applied to your draft. Review the preview and save when ready."
            : "Done."),
        undoable: canUndo,
      },
    ]);
    if (json.changed) {
      onApplied();
    }
  }

  async function undoLastEdit() {
    if (!undoAvailable || undoing || loading) return;

    setUndoing(true);
    const res = await fetch("/api/admin/agent/undo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registryId }),
    });
    const json = (await res.json()) as { error?: string };
    setUndoing(false);

    if (!res.ok) {
      updateMessages((prev) => [
        ...prev,
        { role: "assistant", text: json.error || "Could not undo the last edit." },
      ]);
      setUndoAvailable(false);
      return;
    }

    setUndoAvailable(false);
    updateMessages((prev) => [
      ...prev.map((msg) => (msg.undoable ? { ...msg, undoable: false } : msg)),
      { role: "system", text: "Undid the last AI edit. Your draft was restored to how it was before that prompt." },
    ]);
    onApplied();
  }

  const lastUndoableIndex = messages.findLastIndex((msg) => msg.role === "assistant" && msg.undoable);

  return (
    <div className="studio-ai-panel">
      <div className="studio-ai-panel__header">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-bold text-[var(--studio-fg)]">
            {pageLabel ? `${pageLabel} chat` : "Page chat"}
          </p>
          <p className="text-[10px] text-[var(--studio-muted)]">Separate history per page</p>
        </div>
        <button
          type="button"
          className="studio-ai-panel__clear"
          onClick={() => void clearChat()}
          disabled={messages.length === 0 || clearing || loading}
          title="Clear chat for this page"
        >
          <Trash2 className="h-3 w-3" aria-hidden />
          {clearing ? "Clearing…" : "Clear chat"}
        </button>
      </div>

      <div className="studio-ai-panel__messages studio-scroll">
        {!historyReady ? (
          <div className="studio-ai-panel__empty">
            <p className="text-xs text-[var(--studio-muted)]">Loading conversation…</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="studio-ai-panel__empty">
            <div className="studio-ai-panel__empty-icon" aria-hidden>
              <Sparkles className="h-6 w-6 text-[var(--studio-muted)]" />
            </div>
            <p className="text-xs font-semibold text-[var(--studio-fg)]">
              {pageLabel ? `Editing ${pageLabel}` : "AI assistant"}
            </p>
            <p className="mt-1 max-w-xs text-center text-[11px] leading-relaxed text-[var(--studio-muted)]">
              Describe content or SEO changes, attach files for reference, or ask for an SEO audit (read-only).
              Say &quot;apply&quot; or &quot;update&quot; when you want changes made.
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {messages.map((msg, i) => (
              <div key={`${msg.role}-${i}`}>
                <div
                  className={
                    msg.role === "user"
                      ? "ml-6 rounded-2xl rounded-br-md bg-[var(--studio-bg)] px-3 py-2.5 text-xs leading-relaxed text-[var(--studio-fg)]"
                      : msg.role === "system"
                        ? "mx-2 rounded-xl border border-dashed border-[var(--studio-border)] bg-[var(--studio-elevated)] px-3 py-2 text-[11px] leading-relaxed text-[var(--studio-muted)]"
                        : "mr-2 rounded-2xl rounded-bl-md border border-[var(--studio-border)] bg-[var(--studio-surface)] px-3 py-2.5 text-xs leading-relaxed text-[var(--studio-muted)]"
                  }
                >
                  {msg.text}
                </div>
                {undoAvailable && i === lastUndoableIndex ? (
                  <button
                    type="button"
                    className="studio-ai-undo"
                    onClick={() => void undoLastEdit()}
                    disabled={undoing || loading}
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden />
                    {undoing ? "Undoing…" : "Undo last edit"}
                  </button>
                ) : null}
              </div>
            ))}
            {loading ? (
              <p className="text-xs text-[var(--studio-muted)]" role="status" aria-live="polite">
                Analyzing your request and updating the draft…
              </p>
            ) : null}
          </div>
        )}
      </div>

      <div className="studio-ai-panel__composer">
        <StudioAiPrompt
          value={prompt}
          onChange={setPrompt}
          onSubmit={() => void runAgent()}
          loading={loading}
          provider={provider}
          onProviderChange={setProvider}
          files={files}
          onFilesChange={setFiles}
          placeholder="Describe what to change on this page…"
        />
      </div>
    </div>
  );
}
