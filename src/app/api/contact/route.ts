import { NextResponse } from "next/server";
import {
  escapeHtml,
  getContactNotifyTo,
  getContactSegmentId,
  getResendClient,
  getResendFromAddress,
  getResendSandboxFromAddress,
  isDuplicateContactError,
  isResendAuthError,
  isValidEmail,
} from "@/lib/resend-utils";

const MAX_NAME = 120;
const MAX_MESSAGE = 8000;

type ContactLead = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function parseLead(body: unknown): ContactLead | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;
  const firstName = String(raw.firstName ?? "").trim().slice(0, MAX_NAME);
  const lastName = String(raw.lastName ?? "").trim().slice(0, MAX_NAME);
  const email = String(raw.email ?? "").trim().toLowerCase();
  const message = String(raw.message ?? "").trim().slice(0, MAX_MESSAGE);

  if (!firstName || !lastName || !message || !isValidEmail(email)) return null;
  return { firstName, lastName, email, message };
}

async function upsertContactSegment(lead: ContactLead) {
  const resend = getResendClient();
  const segmentId = getContactSegmentId();
  if (!resend || !segmentId) return null;

  const { error } = await resend.contacts.create({
    email: lead.email,
    firstName: lead.firstName,
    lastName: lead.lastName,
    segments: [{ id: segmentId }],
  });

  if (error && !isDuplicateContactError(error.message ?? "")) {
    return error.message ?? "Could not save contact";
  }

  return null;
}

function contactEmailHtml(lead: ContactLead) {
  return `
    <p><strong>New contact form submission</strong></p>
    <p>Name: ${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</p>
    <p>Email: ${escapeHtml(lead.email)}</p>
    <p>Message:</p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(lead.message)}</pre>
  `;
}

async function sendContactNotify(
  resend: NonNullable<ReturnType<typeof getResendClient>>,
  lead: ContactLead,
) {
  const payload = {
    to: [getContactNotifyTo()],
    replyTo: lead.email,
    subject: `Contact form: ${lead.firstName} ${lead.lastName}`,
    html: contactEmailHtml(lead),
  };

  const fromCandidates = [getResendFromAddress(), getResendSandboxFromAddress()];
  let lastError: { statusCode?: number | null; message?: string } | null = null;

  for (const from of fromCandidates) {
    const { error } = await resend.emails.send({ ...payload, from });
    if (!error) return null;
    lastError = error;
    if (isResendAuthError(error)) break;
  }

  return lastError;
}

function mapContactSendError(error: { statusCode?: number | null; message?: string }) {
  if (isResendAuthError(error)) {
    console.error(
      "[contact] Invalid RESEND_API_KEY — create a new key at https://resend.com/api-keys and update .env.local / Vercel env.",
    );
    return "Message delivery is not configured. Please email us directly at admin@conalytic.com.";
  }
  return "Could not submit your message. Try again later.";
}

export async function POST(request: Request) {
  const resend = getResendClient();
  if (!resend) {
    return NextResponse.json(
      { error: "Email is not configured. Set RESEND_API_KEY on the server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    return NextResponse.json({ error: "Please fill in all fields with a valid email." }, { status: 400 });
  }

  const segmentError = await upsertContactSegment(lead);
  if (segmentError) {
    console.warn("[contact] segment skipped:", segmentError);
  }

  const sendError = await sendContactNotify(resend, lead);
  if (sendError) {
    console.error("[contact] notify", sendError);

    if (process.env.NODE_ENV === "development") {
      console.warn("[contact] dev fallback — submission logged:", lead);
      return NextResponse.json({ ok: true, dev: true });
    }

    return NextResponse.json({ error: mapContactSendError(sendError) }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
