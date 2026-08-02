import { SITE_PATHS } from "@/lib/site-paths";

/** Paths that use the chat-app-style legal document chrome (no marketing nav/footer). */
export const LEGAL_DOCUMENT_PATHS = [SITE_PATHS.legal.privacy, SITE_PATHS.legal.terms] as const;

export function isLegalDocumentPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (LEGAL_DOCUMENT_PATHS as readonly string[]).includes(pathname);
}
