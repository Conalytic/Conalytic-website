import { readFile } from "fs/promises";
import path from "path";

const CMS_ROOT = path.join(process.cwd(), "content", "cms");

export function cmsFilePath(relativePath: string): string {
  return path.join(CMS_ROOT, relativePath);
}

export async function readCmsJson<T extends Record<string, unknown>>(
  relativePath: string,
): Promise<T | null> {
  try {
    const raw = await readFile(cmsFilePath(relativePath), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}
