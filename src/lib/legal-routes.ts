/** Paths that use the chat-app-style legal document chrome (no marketing nav/footer). */
export const LEGAL_DOCUMENT_PATHS = [
  "/privacy-and-policy",
  "/terms-of-service",
] as const;

export function isLegalDocumentPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (LEGAL_DOCUMENT_PATHS as readonly string[]).includes(pathname);
}
