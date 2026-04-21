import { IconConversion, IconSpeed, IconClarity, IconHuman } from "./Icons";

const benefits = [
  {
    Icon: IconConversion,
    tag: "01 / Conversion",
    title: "Find revenue you're leaving on the table.",
    body: "We map every drop-off in your funnel and pinpoint exactly where visitors hesitate, bounce, or get stuck.",
    metric: "Avg. uplift",
    metricValue: "+27%",
  },
  {
    Icon: IconSpeed,
    tag: "02 / Performance",
    title: "Stop losing visitors to slow pages.",
    body: "Real-world speed scores on mobile and desktop - with the three highest-impact fixes ranked by effort.",
    metric: "Median load",
    metricValue: "<1.8s",
  },
  {
    Icon: IconClarity,
    tag: "03 / UX clarity",
    title: "Make your message land in 3 seconds.",
    body: "We pressure-test your hero, navigation, and CTAs against how real visitors actually scan a page.",
    metric: "5-sec test",
    metricValue: "Included",
  },
  {
    Icon: IconHuman,
    tag: "04 / Human review",
    title: "No AI-generated checklists. Just expertise.",
    body: "Every audit is reviewed and annotated by a senior strategist - not a script and not a generic template.",
    metric: "Turnaround",
    metricValue: "48 hrs",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="relative border-b border-oat py-20 lg:py-28"
    >
      <div className="container-page">
        <div className="mb-14 max-w-[680px]">
          <div className="eyebrow mb-4">What you get</div>
          <h2 id="benefits-heading" className="text-h1 font-medium text-ink">
            A 12-point report,{" "}
            <span className="font-serif italic font-normal">
              built to be acted on
            </span>{" "}
            - not filed away.
          </h2>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.5] text-ink-60">
            Every audit covers the four areas that move the needle. Concrete,
            prioritised, and ranked by effort vs. impact.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          aria-label="Audit benefits"
        >
          {benefits.map(({ Icon, tag, title, body, metric, metricValue }) => (
            <li
              key={tag}
              className="group surface-card relative flex flex-col gap-5 p-6 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,0.25)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-sharp border border-oat bg-cream text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-cream"
                  aria-hidden
                >
                  <Icon />
                </div>
                <span className="font-mono text-[11px] tracking-[0.12em] text-ink-60">
                  {tag}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-h3 font-medium text-ink">{title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-ink-60">
                  {body}
                </p>
              </div>

              <div className="flex items-end justify-between border-t border-oat pt-4">
                <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-ink-60">
                  {metric}
                </span>
                <span className="font-serif text-[28px] leading-none text-ink">
                  {metricValue}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Process strip */}
        <div
          id="process"
          className="mt-10 flex flex-col gap-6 rounded-card border border-oat bg-white p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-7"
        >
          <div className="eyebrow shrink-0">Process</div>
          <ol className="flex flex-1 flex-col gap-5 sm:flex-row sm:items-start">
            {[
              { n: "01", t: "You submit", d: "Site URL & one main goal." },
              { n: "02", t: "We audit", d: "Manual review by a strategist." },
              {
                n: "03",
                t: "You get a report",
                d: "12 prioritised actions, in 48h.",
              },
            ].map((step, i) => (
              <li key={step.n} className="flex flex-1 items-start gap-3">
                <span className="font-mono text-[11px] text-fin">{step.n}</span>
                <div>
                  <div className="text-[14px] font-medium text-ink">
                    {step.t}
                  </div>
                  <div className="text-[13px] text-ink-60">{step.d}</div>
                </div>
                {i < 2 && (
                  <span
                    aria-hidden
                    className="mt-2 hidden h-px flex-1 bg-oat sm:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
