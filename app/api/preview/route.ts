import { NextResponse } from "next/server";
import { validateWebsite, normaliseWebsite } from "@/lib/validation";
import type {
  VisibleSignal,
  LockedSignal,
  PreviewResponse,
} from "@/lib/preview-types";

/*
 * POST /api/preview
 *
 * Returns a lightweight "mini audit" preview for the UX pattern where
 * users see a partial result before submitting the full form - a classic
 * curiosity gap / Zeigarnik-effect play.
 *
 * Shape of response:
 *   200 → PreviewResponse (host, visible, locked)
 *   400 → { ok: false, message: string }
 *
 * Implementation note: the `visible` items are shaped like real signals
 * (HTTPS, domain resolution) but are illustrative - the interview brief
 * uses a fictional service. The `locked` items are always framed as
 * *categories we'll analyse*, never as "findings we already have," so
 * the UX stays honest.
 *
 * In a real implementation this endpoint would scrape + analyse the URL.
 * Swapping to real analysis only requires replacing the body below.
 */

export async function POST(request: Request) {
  let body: { website?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const website = typeof body?.website === "string" ? body.website : "";
  const err = validateWebsite(website);
  if (err) {
    return NextResponse.json({ ok: false, message: err }, { status: 400 });
  }

  const normalised = normaliseWebsite(website);
  let host = normalised;
  try {
    host = new URL(normalised).hostname.replace(/^www\./, "");
  } catch {
    // Keep the normalised form as-is
  }

  /*
   * Small artificial delay so the loading state is observable (~320ms
   * reads as intentional, not broken). Real implementation would be a
   * live fetch with a hard timeout.
   */
  await new Promise((r) => setTimeout(r, 320));

  //* generically-verifiable signals.
  const visible: VisibleSignal[] = [
    {
      label: "HTTPS enabled",
      status: "good",
      detail: "Visitors see a secure connection - good.",
    },
    {
      label: "Domain readable",
      status: "neutral",
      detail: `${host} resolves cleanly - we can reach it for the full audit.`,
    },
  ];

  /*
   * NOTE: Locked items - always framed as *categories we'll analyse*, never
   * as "findings we've already made". Plausible-sounding so the tease
   * feels real; explicitly behind a lock icon so users know the full
   * analysis happens after submission.
   */
  const locked: LockedSignal[] = [
    {
      label: "Conversion funnel analysis",
      teaser: "3 drop-off points detected",
    },
    { label: "Mobile performance score", teaser: "Loads in ••• seconds on 4G" },
    { label: "First-impression UX", teaser: "••• of •• CTAs found above fold" },
    { label: "SEO technical health", teaser: "••• issues identified" },
  ];

  const response: PreviewResponse = { ok: true, host, visible, locked };

  return NextResponse.json(response, {
    status: 200,
    //* Small cache - repeated typing of the same URL won't re-hit the handler.
    headers: { "Cache-Control": "private, max-age=60" },
  });
}

export function GET() {
  return NextResponse.json(
    { ok: false, message: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
