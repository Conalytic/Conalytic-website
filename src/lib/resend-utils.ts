import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isValidEmail(email: string) {
  return email.length > 0 && email.length <= 254 && EMAIL_RE.test(email);
}

export function isDuplicateContactError(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("already") ||
    m.includes("duplicate") ||
    m.includes("exist") ||
    m.includes("unique")
  );
}

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Resend returns 401 when RESEND_API_KEY is missing, revoked, or wrong. */
export function isResendAuthError(error: { statusCode?: number | null; message?: string }) {
  if (error.statusCode === 401) return true;
  const m = (error.message ?? "").toLowerCase();
  return m.includes("api key") && m.includes("invalid");
}

export function isResendDomainError(error: { statusCode?: number | null; message?: string }) {
  const m = (error.message ?? "").toLowerCase();
  return (
    error.statusCode === 403 ||
    m.includes("domain") ||
    m.includes("not verified") ||
    m.includes("verify") ||
    m.includes("from address")
  );
}

export function mapResendSendError(error: { statusCode?: number | null; message?: string }) {
  if (isResendAuthError(error)) {
    return "Message delivery is not configured. Please email us directly at admin@conalytic.com.";
  }
  if (isResendDomainError(error)) {
    return "Message delivery is temporarily unavailable. Please email us directly at admin@conalytic.com.";
  }
  return "Could not submit your message. Try again later.";
}

export function getResendFromAddress() {
  const raw = process.env.RESEND_FROM?.trim();
  if (!raw) return "Conalytic <onboarding@resend.dev>";
  if (raw.includes("<")) return raw;
  return `Conalytic <${raw}>`;
}

export function getResendSandboxFromAddress() {
  return process.env.RESEND_SANDBOX_FROM?.trim() || "Conalytic <onboarding@resend.dev>";
}

export function getContactNotifyTo() {
  return (process.env.CONTACT_NOTIFY_TO ?? "admin@conalytic.com").trim();
}

export function getContactSegmentId() {
  return process.env.RESEND_CONTACT_SEGMENT_ID?.trim() || "";
}
