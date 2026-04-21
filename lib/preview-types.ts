/*
 * Shared types for the /api/preview response.
 *
 * Lives in lib/ rather than the route file because Next.js 16 route modules
 * only allow specific exports (handlers, runtime config). Client components
 * import the types from here; the route file uses them for its own response
 * shape. Keeping the two in sync is the trade-off for having a typed client.
 */

export type VisibleStatus = "good" | "warn" | "neutral";

export interface VisibleSignal {
  label: string;
  status: VisibleStatus;
  detail: string;
}

export interface LockedSignal {
  label: string;
  teaser: string;
}

export interface PreviewSuccess {
  ok: true;
  host: string;
  visible: VisibleSignal[];
  locked: LockedSignal[];
}

export interface PreviewError {
  ok: false;
  message: string;
}

/*
 * Discriminated union - narrow on `ok` to get the right shape:
 *   if (res.ok) { res.host ... } else { res.message ... }
 */
export type PreviewResponse = PreviewSuccess | PreviewError;
