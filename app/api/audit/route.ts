import { NextResponse } from "next/server";
import {
  validateAudit,
  normaliseWebsite,
  type AuditPayload,
} from "@/lib/validation";

/*
 * POST /api/audit
 *
 * Receives an audit submission, validates server-side, and would forward
 * to a CRM/database. The CRM call is stubbed below - swap `forwardToCRM`
 * for a real integration (HubSpot, Pipedrive, Postgres, etc.) without
 * touching the validation or response shape.
 *
 * Response shape:
 *   200 → { ok: true, id: string }
 *   400 → { ok: false, message: string, errors?: Record<field, msg> }
 *   500 → { ok: false, message: string }
 */
export async function POST(request: Request) {
  let body: Partial<AuditPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, message: "Missing payload." },
      { status: 400 },
    );
  }

  const payload: AuditPayload = {
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    website: typeof body.website === "string" ? body.website : "",
    goal: (typeof body.goal === "string"
      ? body.goal
      : "") as AuditPayload["goal"],
  };

  //* Same validation as the client - single source of truth from lib/validation
  const errors = validateAudit(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Some fields need attention.",
        errors,
      },
      { status: 400 },
    );
  }

  const submission = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    website: normaliseWebsite(payload.website),
    goal: payload.goal,
    source: "landing-page-audit-form",
  };

  try {
    await forwardToCRM(submission);
  } catch (err) {
    console.error("[audit] CRM forward failed", err);
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't save your request. Please try again in a moment.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: submission.id }, { status: 200 });
}

/*   we can easily connect to a CRM   */

async function forwardToCRM(
  submission: Record<string, unknown>,
): Promise<void> {
  //* Simulate network latency so the loading state is observable in dev env.
  await new Promise((r) => setTimeout(r, 600));

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[audit] new submission:", submission);
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
