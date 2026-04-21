import { ArrowRight, Check } from "./Icons";

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-oat"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 20%, rgba(255, 86, 0, 0.06), transparent 50%)",
        }}
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden />

      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3 animate-fade-up">
            <span
              className="inline-block h-2 w-2 rounded-full bg-fin animate-pulse-dot"
              aria-hidden
            />
            <span className="eyebrow">Free · 48-hour turnaround</span>
          </div>

          <h1
            id="hero-heading"
            className="text-hero font-medium text-ink animate-fade-up stagger-1"
          >
            Find the{" "}
            <span className="font-serif italic font-normal text-ink">
              growth gaps
            </span>
            <br />
            your website is hiding.
          </h1>

          <p className="mt-6 max-w-[560px] text-[17px] leading-[1.5] text-ink-60 sm:text-[18px] animate-fade-up stagger-2">
            A no-fluff audit of your conversion, speed, UX, and SEO - reviewed
            by a human, delivered as a 12-point report you can act on this week.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center animate-fade-up stagger-3">
            <a href="#audit" className="btn-primary">
              Request my free audit
              <ArrowRight width={16} height={16} strokeWidth={2} />
            </a>
            <a href="#benefits" className="btn-secondary">
              See what&apos;s included
            </a>
          </div>

          <ul
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up stagger-4"
            aria-label="Trust signals"
          >
            {[
              "No credit card",
              "12-point report",
              "Reviewed by a real human",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[13.5px] text-ink-60"
              >
                <Check
                  width={14}
                  height={14}
                  strokeWidth={2.4}
                  className="text-fin"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Report preview  */}
        <div className="relative lg:col-span-5 animate-scale-in stagger-3">
          <ReportPreview />
        </div>
      </div>

      {/* Trust logo strip */}
      <div className="border-t border-oat/70 bg-white/40">
        <div className="container-page flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
          <span className="eyebrow">
            Trusted by founders &amp; growth teams
          </span>
          <div
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-ink-60 sm:gap-x-8"
            aria-hidden
          >
            <span>NORTHWIND</span>
            <span className="font-serif italic text-ink/70">
              Lumen &amp; Co
            </span>
            <span className="font-mono uppercase tracking-[0.15em]">
              Foldcraft
            </span>
            <span className="font-semibold tracking-tight-1">QUANTA</span>
            <span className="font-serif italic text-ink/70">Atelier 9</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Editorial report preview - shows what the user receives.
 */
function ReportPreview() {
  const scores = [
    { label: "Conversion", value: 62, color: "bg-r-pink" },
    { label: "Speed", value: 84, color: "bg-r-green" },
    { label: "UX clarity", value: 71, color: "bg-r-blue" },
    { label: "SEO", value: 48, color: "bg-fin" },
  ];

  return (
    <div className="relative">
      <div
        className="absolute -left-3 -top-3 z-10 hidden rotate-[-4deg] rounded-sharp border border-ink bg-cream px-2.5 py-1 sm:block"
        aria-hidden
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.15em]  text-ink">
          Sample report
        </span>
      </div>

      <div className="surface-card relative overflow-hidden p-7 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.18)]">
        <div className="flex items-center justify-between border-b border-oat pb-5">
          <div>
            <div className="eyebrow mb-1.5">Audit · 12 pts</div>
            <div className="text-[20px] font-medium tracking-tight-1">
              northwind.co
            </div>
          </div>
          <div className="text-right">
            <div className="eyebrow mb-1.5">Overall</div>
            <div className="font-serif text-[36px] leading-none text-ink">
              66<span className="text-[18px] text-ink-60">/100</span>
            </div>
          </div>
        </div>

        <ul className="mt-5 space-y-4">
          {scores.map((s, i) => (
            <li key={s.label}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-ink">
                  {s.label}
                </span>
                <span className="font-mono text-[11px] text-ink-60">
                  {s.value}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-oat/70">
                <div
                  className={`h-full ${s.color} rounded-full`}
                  style={{
                    width: `${s.value}%`,
                    animation: `fade-in 0.6s ease-out ${400 + i * 120}ms both`,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2.5">
          <RecCard
            tag="HIGH IMPACT"
            tagColor="text-fin"
            text="Hero CTA buried below fold on mobile - move above the testimonial."
          />
          <RecCard
            tag="QUICK WIN"
            tagColor="text-r-green"
            text="Compress hero image (saves 1.4s on 4G)."
          />
        </div>
      </div>
    </div>
  );
}

/*
 * Component for individual recommendations in the report preview
 */

function RecCard({
  tag,
  tagColor,
  text,
}: {
  tag: string;
  tagColor: string;
  text: string;
}) {
  return (
    <div className="rounded-sharp border border-oat bg-cream/60 p-3">
      <div className={`font-mono text-[10px] tracking-[0.15em] ${tagColor}`}>
        {tag}
      </div>
      <p className="mt-1 text-[13px] leading-snug text-ink">{text}</p>
    </div>
  );
}
