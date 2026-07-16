/**
 * Public legal pages — defaults reflect Conalytic’s published business contact.
 * Override any field with NEXT_PUBLIC_LEGAL_* environment variables when needed.
 */
export const LEGAL_DOCUMENTS_LAST_UPDATED = "2026-07-16";

const DEFAULT_ENTITY = "Conalytic";
const DEFAULT_EMAIL = "admin@conalytic.com";
/** Controller address (GDPR Art. 13/14) — multiline ok */
const DEFAULT_REGISTERED_ADDRESS =
  "Conalytic\nPune, Maharashtra 411006\nIndia";
const DEFAULT_PHONE_DISPLAY = "+91-7900615417";
/** E.164-style for tel: links */
const DEFAULT_PHONE_TEL = "+917900615417";
const DEFAULT_GOVERNING_LAW = "India";
const DEFAULT_DISPUTE_VENUE = "Pune, Maharashtra, India";

export function getLegalEntityName(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME?.trim() || DEFAULT_ENTITY
  );
}

export function getLegalContactEmail(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_CONTACT_EMAIL?.trim() || DEFAULT_EMAIL
  );
}

/**
 * Full address of the data controller (required for GDPR Art. 13/14).
 */
export function getLegalRegisteredAddress(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_REGISTERED_ADDRESS?.trim() ||
    DEFAULT_REGISTERED_ADDRESS
  );
}

/** Governing law for Terms (substantive law of this country, unless mandatory law applies elsewhere). */
export function getLegalGoverningLawJurisdiction(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_GOVERNING_LAW?.trim() ||
    DEFAULT_GOVERNING_LAW
  );
}

/** Courts or region named for dispute venue (may differ from governing law in some setups). */
export function getLegalDisputeVenue(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_DISPUTE_VENUE?.trim() ||
    DEFAULT_DISPUTE_VENUE
  );
}

/** Human-readable phone for display */
export function getLegalContactPhoneDisplay(): string {
  return (
    process.env.NEXT_PUBLIC_LEGAL_CONTACT_PHONE?.trim() ||
    DEFAULT_PHONE_DISPLAY
  );
}

/** Normalized tel: href (digits and leading + only) */
export function getLegalContactPhoneTel(): string {
  const raw =
    process.env.NEXT_PUBLIC_LEGAL_CONTACT_PHONE?.trim() ||
    DEFAULT_PHONE_DISPLAY;
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+") && cleaned.length > 4) return cleaned;
  if (/^\d{10,15}$/.test(cleaned)) return `+${cleaned}`;
  return DEFAULT_PHONE_TEL;
}
