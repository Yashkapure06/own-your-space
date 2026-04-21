import { Check } from "./Icons";
import { AuditForm } from "./AuditForm";

const includes = [
  "Conversion funnel review",
  "Mobile + desktop performance scores",
  "First-impression UX audit (5-second test)",
  "On-page SEO health check",
  "12 prioritised actions, ranked by effort",
  "30-min walkthrough call (optional)",
];

export function AuditSection() {
  return (
    <section
      id="audit"
      aria-labelledby="audit-heading"
      className="relative border-b border-oat py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 90%, rgba(255, 86, 0, 0.05), transparent 45%)",
        }}
      />

      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Pitch + checklist + testimonial */}
        <div className="lg:col-span-5">
          <div className="eyebrow mb-4">Request your audit</div>
          <h2 id="audit-heading" className="text-h1 font-medium text-ink">
            Free, human-reviewed,{" "}
            <span className="font-serif italic font-normal">
              delivered in 48 hours.
            </span>
          </h2>
          <p className="mt-5 max-w-[440px] text-[17px] leading-[1.5] text-ink-60">
            Submit your site once. We&apos;ll do the rest - no calls, no
            qualifying gauntlet, no upsell.
          </p>

          <div className="mt-8 rounded-card border border-oat bg-white p-6">
            <div className="eyebrow mb-4">Every audit includes</div>
            <ul className="space-y-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14px] text-ink"
                >
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink/5"
                    aria-hidden
                  >
                    <Check
                      width={11}
                      height={11}
                      strokeWidth={3}
                      className="text-ink"
                    />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <AuditForm />
        </div>
      </div>
    </section>
  );
}
