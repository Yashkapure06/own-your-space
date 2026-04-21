"use client";

import {
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
} from "react";
import {
  AUDIT_GOALS,
  validateName,
  validateEmail,
  validateWebsite,
  validateGoal,
  validateAudit,
  inferGoalFromUrl,
  type AuditPayload,
  type ValidationErrors,
} from "@/lib/validation";
import type { PreviewResponse, PreviewSuccess } from "@/lib/preview-types";
import { ArrowRight, Check, IconAlert, IconLoader } from "./Icons";
import { MiniAuditPreview } from "./MiniAuditPreview";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type PreviewState =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "ready"; data: PreviewSuccess };

const fieldValidators = {
  name: validateName,
  email: validateEmail,
  website: validateWebsite,
  goal: validateGoal,
} as const;

/* Order of fields - drives keyboard-nav and the progress indicator. */
const FIELD_ORDER = ["name", "email", "website", "goal"] as const;

const PREVIEW_DEBOUNCE_MS = 500;

export function AuditForm() {
  const formId = useId();

  const [data, setData] = useState<AuditPayload>({
    name: "",
    email: "",
    website: "",
    goal: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof AuditPayload, boolean>>
  >({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState>({ state: "idle" });

  const successRef = useRef<HTMLDivElement>(null);

  const previewAbortRef = useRef<AbortController | null>(null);

  const goalManuallySetRef = useRef(false);

  const completedCount = FIELD_ORDER.filter((k) => {
    const v = data[k];
    if (!v) return false;
    return !fieldValidators[k](v as string);
  }).length;

  /*  preview fetching  */

  const fetchPreview = useCallback(async (website: string, goal: string) => {
    previewAbortRef.current?.abort();
    const controller = new AbortController();
    previewAbortRef.current = controller;

    setPreview({ state: "loading" });

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, goal }),
        signal: controller.signal,
      });
      const body: PreviewResponse = await res.json().catch(() => ({
        ok: false,
        message: "Unexpected response.",
      }));

      if (controller.signal.aborted) return;

      if (!res.ok || !body.ok) {
        setPreview({
          state: "error",
          message: body.ok === false ? body.message : "Couldn't peek.",
        });
        return;
      }
      setPreview({ state: "ready", data: body });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setPreview({
        state: "error",
        message: "Network hiccup - we'll still audit it after submission.",
      });
    }
  }, []);

  //* Debounced preview fetch - triggers when website is valid
  useEffect(() => {
    const websiteErr = validateWebsite(data.website);
    if (websiteErr) {
      setPreview({ state: "idle" });
      previewAbortRef.current?.abort();
      return;
    }
    const handle = setTimeout(() => {
      fetchPreview(data.website, data.goal);
    }, PREVIEW_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [data.website, fetchPreview]);

  //* Smart goal pre-selection - infer from URL if user hasn't picked one
  useEffect(() => {
    if (goalManuallySetRef.current || data.goal) return;
    const inferred = inferGoalFromUrl(data.website);
    if (inferred) {
      setData((d) => ({ ...d, goal: inferred }));
    }
  }, [data.website, data.goal]);

  useEffect(() => {
    if (status === "success") {
      successRef.current?.focus();
    }
  }, [status]);

  /* handlers  */

  function update<K extends keyof AuditPayload>(
    key: K,
    value: AuditPayload[K],
  ) {
    setData((d) => ({ ...d, [key]: value }));
    if (key === "goal") {
      goalManuallySetRef.current = true;
    }
    if (errors[key]) {
      const nextErr = fieldValidators[key](value as string);
      setErrors((e) => ({ ...e, [key]: nextErr }));
    }
  }

  function handleBlur<K extends keyof AuditPayload>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
    const err = fieldValidators[key](data[key] as string);
    setErrors((e) => ({ ...e, [key]: err }));
  }

  /*
   *  validates the current field before moving, so mistakes surface early.
   */
  function handleFieldKeyDown(
    e: KeyboardEvent<HTMLInputElement>,
    currentKey: (typeof FIELD_ORDER)[number],
  ) {
    if (e.key !== "Enter") return;
    const idx = FIELD_ORDER.indexOf(currentKey);
    const nextKey = FIELD_ORDER[idx + 1];
    if (!nextKey) return;
    e.preventDefault();

    setTouched((t) => ({ ...t, [currentKey]: true }));
    const err = fieldValidators[currentKey](data[currentKey] as string);
    setErrors((er) => ({ ...er, [currentKey]: err }));

    if (nextKey === "goal") {
      // Focus the first chip instead of the sr-only select
      const firstChip = document.querySelector<HTMLButtonElement>(
        `[data-goal-chip="${formId}"]`,
      );
      firstChip?.focus();
    } else {
      document.getElementById(`${formId}-${nextKey}`)?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const validation = validateAudit(data);
    setErrors(validation);
    setTouched({ name: true, email: true, website: true, goal: true });

    if (Object.keys(validation).length > 0) {
      const firstInvalid = FIELD_ORDER.find((k) => validation[k]);
      if (firstInvalid) {
        document.getElementById(`${formId}-${firstInvalid}`)?.focus();
      }
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (body?.errors) setErrors(body.errors as ValidationErrors);
        setServerError(
          body?.message ?? "Something went wrong. Please try again.",
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setServerError("Network error. Please check your connection and retry.");
      setStatus("error");
    }
  }

  function handleReset() {
    setData({ name: "", email: "", website: "", goal: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setServerError(null);
    setPreview({ state: "idle" });
    goalManuallySetRef.current = false;
  }

  /*  success state  */

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="surface-card relative overflow-hidden p-8 text-center animate-scale-in focus:outline-none sm:p-10"
      >
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-fin/30 bg-fin/10">
          <Check
            width={28}
            height={28}
            strokeWidth={2.4}
            className="text-fin"
          />
        </div>
        <h3 className="text-h2 font-medium text-ink">
          You&apos;re on the list,{" "}
          <span className="font-serif italic font-normal">
            {data.name.trim().split(" ")[0]}
          </span>
          .
        </h3>
        <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.55] text-ink-60 sm:text-[16px]">
          We&apos;ve received your request for{" "}
          <span className="font-medium text-ink">{data.website}</span>. Your
          12-point report will land in your inbox within{" "}
          <span className="font-medium text-ink">48 hours</span>.
        </p>

        <ol className="mx-auto mt-8 grid max-w-[420px] grid-cols-3 gap-3 text-left">
          {[
            { label: "Received", done: true },
            { label: "In review", done: false },
            { label: "Delivered", done: false },
          ].map((step) => (
            <li
              key={step.label}
              className="rounded-sharp border border-oat bg-cream/60 p-3"
            >
              <div
                className={`mb-1 h-1 w-full rounded-full ${
                  step.done ? "bg-fin" : "bg-oat"
                }`}
                aria-hidden
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-60">
                {step.label}
              </div>
            </li>
          ))}
        </ol>

        <button
          type="button"
          onClick={handleReset}
          className="mt-8 text-[13px] font-medium text-ink-60 underline-offset-4 hover:text-ink hover:underline"
        >
          Submit another website
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === "submitting"}
      className="surface-card relative overflow-hidden p-6 sm:p-8"
    >
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <div className="eyebrow mb-2">Free audit</div>
          <h3 className="text-h3 font-medium text-ink">
            Tell us about your site.
          </h3>
        </div>
        <ProgressIndicator
          completed={completedCount}
          total={FIELD_ORDER.length}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <Field
          id={`${formId}-name`}
          label="Your name"
          error={touched.name ? errors.name : undefined}
        >
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            onKeyDown={(e) => handleFieldKeyDown(e, "name")}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? `${formId}-name-err` : undefined}
            placeholder="Alex Carter"
            className="field-input"
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email"
          error={touched.email ? errors.email : undefined}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            onKeyDown={(e) => handleFieldKeyDown(e, "email")}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={errors.email ? `${formId}-email-err` : undefined}
            placeholder="alex@company.com"
            className="field-input"
          />
        </Field>

        <Field
          id={`${formId}-website`}
          label="Website URL"
          error={touched.website ? errors.website : undefined}
          className="sm:col-span-2"
        >
          <div className="relative">
            <span
              className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center font-mono text-[13px] text-tertiary"
              aria-hidden
            >
              https://
            </span>
            <input
              id={`${formId}-website`}
              name="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              value={data.website}
              onChange={(e) => update("website", e.target.value)}
              onBlur={() => handleBlur("website")}
              onKeyDown={(e) => handleFieldKeyDown(e, "website")}
              aria-invalid={touched.website && !!errors.website}
              aria-describedby={
                errors.website ? `${formId}-website-err` : undefined
              }
              placeholder="yoursite.com"
              className="field-input pl-[5.25rem]"
            />
          </div>
          {/* Mini audit preview - appears below the input when URL is valid */}
          <MiniAuditPreview {...preview} />
        </Field>

        <Field
          id={`${formId}-goal`}
          label="Main goal"
          error={touched.goal ? errors.goal : undefined}
          className="sm:col-span-2"
          help={
            !touched.goal && !goalManuallySetRef.current && data.goal
              ? "We guessed based on your URL - change it if needed."
              : "Pick the one that matters most right now."
          }
        >
          <select
            id={`${formId}-goal`}
            name="goal"
            value={data.goal}
            onChange={(e) =>
              update("goal", e.target.value as AuditPayload["goal"])
            }
            onBlur={() => handleBlur("goal")}
            aria-invalid={touched.goal && !!errors.goal}
            aria-describedby={errors.goal ? `${formId}-goal-err` : undefined}
            required
            className="sr-only"
            tabIndex={-1}
          >
            <option value="">Choose a goal</option>
            {AUDIT_GOALS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>

          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="radiogroup"
            aria-label="Main goal"
          >
            {AUDIT_GOALS.map((g, i) => {
              const selected = data.goal === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  data-goal-chip={i === 0 ? formId : undefined}
                  onClick={() => {
                    update("goal", g.value);
                    setTouched((t) => ({ ...t, goal: true }));
                  }}
                  className={[
                    "rounded-sharp border px-3 py-3 text-left text-[13.5px] font-medium",
                    "transition-all duration-200 ease-out-expo",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    selected
                      ? "border-ink bg-ink text-cream"
                      : "border-oat bg-cream/60 text-ink hover:border-ink/50 hover:bg-white",
                  ].join(" ")}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-sharp border border-r-red/30 bg-r-red/5 p-3 text-[13px] text-r-red animate-fade-up"
        >
          <IconAlert />
          <span>{serverError}</span>
        </div>
      )}

      <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-ink-60">
          We&apos;ll only use your details to send your audit. No spam, ever.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary min-w-[180px] disabled:cursor-wait disabled:opacity-90 disabled:hover:scale-100"
        >
          {status === "submitting" ? (
            <>
              <IconLoader width={16} height={16} />
              Submitting…
            </>
          ) : (
            <>
              Get my free audit
              <ArrowRight width={16} height={16} strokeWidth={2} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/*  helpers  */

function Field({
  id,
  label,
  error,
  help,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  help?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        <span>{label}</span>
      </label>
      {children}
      {help && !error && (
        <p className="mt-1.5 text-[12px] text-ink-60">{help}</p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="field-error">
          <IconAlert />
          {error}
        </p>
      )}
    </div>
  );
}

/*
 * Progress pill - "2/4" with a filling bar. Subtly rewards completion.
 */
function ProgressIndicator({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const pct = Math.max(0, Math.min(1, completed / total));
  return (
    <div
      className="flex shrink-0 items-center gap-2"
      aria-label={`Form progress: ${completed} of ${total} fields complete`}
    >
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-oat/70 sm:w-24">
        <div
          className="h-full bg-fin transition-[width] duration-500 ease-out-expo"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-ink-60">
        {completed}/{total}
      </span>
    </div>
  );
}
