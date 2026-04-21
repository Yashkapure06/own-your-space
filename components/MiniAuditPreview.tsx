"use client";

import type { PreviewSuccess, VisibleStatus } from "@/lib/preview-types";
import { Check, IconLock, IconAlert, IconLoader } from "./Icons";

type Props =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "ready"; data: PreviewSuccess };

/**
 * The "Quick peek" teaser card that appears below the Website URL field
 * as soon as the user enters a valid URL.
 *
 * UX rationale:
 * Showing a partial, identifiable result before the form is submitted turns
 * the form from "give us your data" into "give us your data to unlock what
 * we already found" - a classic curiosity-gap pattern (Zeigarnik effect).
 *
 * The visible signals are kept to generic facts that apply to any site
 * (HTTPS, DNS resolution). Everything labelled as an *analysis* is behind
 * the lock - the real audit happens after submission, by a human.
 */
export function MiniAuditPreview(props: Props) {
  if (props.state === "idle") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-slide-down overflow-hidden"
    >
      <div className="mt-3 rounded-sharp border border-oat bg-gradient-to-br from-cream to-white p-4 sm:p-5">
        <HeaderRow state={props.state} />

        {props.state === "error" && (
          <p className="mt-2 text-[13px] text-ink-60">{props.message}</p>
        )}

        {props.state === "loading" && <LoadingSkeleton />}

        {props.state === "ready" && <Contents data={props.data} />}
      </div>
    </div>
  );
}

function HeaderRow({ state }: { state: Props["state"] }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {state === "loading" ? (
          <>
            <IconLoader
              width={14}
              height={14}
              strokeWidth={2}
              className="text-ink-60"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
              Scanning…
            </span>
          </>
        ) : state === "error" ? (
          <>
            <IconAlert />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
              Couldn&apos;t peek
            </span>
          </>
        ) : (
          <>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-fin"
              aria-hidden
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
              Quick peek
            </span>
          </>
        )}
      </div>
      {state === "ready" && (
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-60">
          2 of 12 checks
        </span>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mt-3 space-y-2">
      {[60, 75].map((w, i) => (
        <div
          key={i}
          className="h-8 rounded-sharp bg-gradient-to-r from-oat/50 via-oat/20 to-oat/50 bg-[length:200%_100%] animate-shimmer"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}

function Contents({ data }: { data: PreviewSuccess }) {
  return (
    <>
      {/* Host line */}
      <div className="mt-2 font-mono text-[12px] text-ink-60">
        <span className="text-ink">{data.host}</span>
      </div>

      {/* Revealed signals */}
      <ul className="mt-3 space-y-2">
        {data.visible.map((item, i) => (
          <li
            key={item.label}
            className="flex items-start gap-2.5 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <StatusDot status={item.status} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-ink">
                {item.label}
              </div>
              <div className="text-[12px] leading-[1.4] text-ink-60">
                {item.detail}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-oat" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-60">
          Submit to unlock
        </span>
        <span className="h-px flex-1 bg-oat" />
      </div>

      {/* Locked tease */}
      <ul className="space-y-2" aria-label="Locked preview items">
        {data.locked.map((item, i) => (
          <li
            key={item.label}
            className="flex items-start gap-2.5 animate-fade-up"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink-60"
              aria-hidden
            >
              <IconLock />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium text-ink">
                {item.label}
              </div>
              {/* Blurred teaser text - readable shape, unreadable content */}
              <div
                className="select-none text-[12px] leading-[1.4] text-ink-60"
                style={{
                  filter: "blur(3.5px)",
                  WebkitUserSelect: "none",
                }}
                aria-hidden
              >
                {item.teaser}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[11px] leading-[1.4] text-ink-60">
        Full report includes {data.locked.length + data.visible.length + 6} more
        checks and prioritised fixes.
      </p>
    </>
  );
}

function StatusDot({ status }: { status: VisibleStatus }) {
  if (status === "good") {
    return (
      <span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-r-green/15 text-r-green"
        aria-hidden
      >
        <Check width={11} height={11} strokeWidth={3} />
      </span>
    );
  }
  if (status === "warn") {
    return (
      <span
        className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-fin"
        aria-hidden
      />
    );
  }
  return (
    <span
      className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-ink/25"
      aria-hidden
    />
  );
}
