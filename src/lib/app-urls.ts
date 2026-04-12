/**
 * Canonical product + marketing URLs (login/signup on chat app; contact on this marketing site).
 */
export const CHAT_APP_LOGIN_URL = "https://chat.conalytic.com/login";
export const CHAT_APP_SIGNUP_URL = "https://chat.conalytic.com/signup";

/** Enterprise / demo — use path for same-origin nav in dev & prod */
export const MARKETING_CONTACT_PATH = "/contact";

/** Absolute URL when linking from emails or off-site contexts */
export const MARKETING_CONTACT_ABSOLUTE = "https://www.conalytic.com/contact";

/** Hostnames for the conversational product (home CTA remap → #pricing) */
export const CHAT_APP_HOSTNAMES = new Set(["chat.conalytic.com", "app.conalytic.com"]);
