/*
 * Audit form validation.
 *
 * Shared between client (real-time UX feedback) and the API route
 * (server-side trust boundary). Single source of truth - if a rule
 * changes here, both sides stay consistent by construction.
 */

export type AuditGoal = "leads" | "sales" | "ux" | "speed";

export const AUDIT_GOALS: { value: AuditGoal; label: string }[] = [
  { value: "leads", label: "More leads" },
  { value: "sales", label: "More sales" },
  { value: "ux", label: "Better user experience" },
  { value: "speed", label: "Faster website" },
];

export interface AuditPayload {
  name: string;
  email: string;
  website: string;
  goal: AuditGoal | "";
}

export type ValidationErrors = Partial<Record<keyof AuditPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Please enter your name.";
  if (v.length < 2) return "Name is a bit short.";
  if (v.length > 80) return "That's a long name - please shorten it.";
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Please enter your email.";
  if (!EMAIL_RE.test(v)) return "That email doesn't look right.";
  return undefined;
}

/*
 * Accepts URLs with or without protocol. Normalised downstream.
 * Host must contain at least one dot and a TLD-ish segment.
 */
export function validateWebsite(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Please enter your website.";
  const stripped = v.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
  const hostPattern =
    /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+/i;
  if (!hostPattern.test(stripped)) return "Please enter a valid website URL.";
  return undefined;
}

export function validateGoal(value: string): string | undefined {
  if (!value) return "Pick the goal that matters most.";
  if (!AUDIT_GOALS.some((g) => g.value === value)) {
    return "Please choose one of the listed goals.";
  }
  return undefined;
}

export function validateAudit(payload: AuditPayload): ValidationErrors {
  const errors: ValidationErrors = {};
  const nameErr = validateName(payload.name);
  if (nameErr) errors.name = nameErr;
  const emailErr = validateEmail(payload.email);
  if (emailErr) errors.email = emailErr;
  const websiteErr = validateWebsite(payload.website);
  if (websiteErr) errors.website = websiteErr;
  const goalErr = validateGoal(payload.goal);
  if (goalErr) errors.goal = goalErr;
  return errors;
}

/*
 * Normalise a website URL for storage / downstream tools (CRM etc.).
 * - Adds https:// if missing
 * - Lowercases the host
 * - Strips trailing slash for canonical form
 */
export function normaliseWebsite(value: string): string {
  const v = value.trim();
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const url = new URL(withProto);
    url.hostname = url.hostname.toLowerCase();
    return url.toString();
  } catch {
    return withProto;
  }
}

/*
 * Infer a sensible default goal from URL path segments.
 * Demonstrates product thinking - small touch, big signal.
 */
export function inferGoalFromUrl(value: string): AuditGoal | null {
  const v = value.trim().toLowerCase();
  if (!v) return null;

  if (/\b(shop|store|cart|checkout|products?|pricing)\b/.test(v)) {
    return "sales";
  }
  if (/\b(blog|articles?|newsletter|subscribe|signup|sign-up)\b/.test(v)) {
    return "leads";
  }
  if (/\b(app|dashboard|login|portal)\b/.test(v)) {
    return "ux";
  }
  return null;
}
