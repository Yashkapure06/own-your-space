import { Star } from "./Icons";

const testimonials = [
  {
    quote:
      "Three of their fixes lifted our checkout conversion by 18% in one week. Genuinely the most useful free thing I've ever received.",
    author: "Maya R.",
    title: "Founder, Lumen & Co",
    initials: "MR",
  },
  {
    quote:
      "The audit was incredibly thorough and gave us a clear roadmap for improvement. We've already seen a significant boost in our SEO rankings.",
    author: "John D.",
    title: "Marketing Head, Northwind",
    initials: "JD",
  },
  {
    quote:
      "I was skeptical about a free audit, but the value delivered was immense. The team's insights were sharp, actionable, and easy to understand.",
    author: "Sarah L.",
    title: "CEO, Foldcraft",
    initials: "SL",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative border-b border-oat py-20 lg:py-28"
    >
      <div className="container-page">
        <div className="text-center">
          <h2
            id="testimonials-heading"
            className="text-h1 font-medium text-ink"
          >
            Loved by teams,{" "}
            <span className="font-serif italic font-normal">
              trusted by founders.
            </span>
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="rounded-card border border-oat bg-cream/60 p-6"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-current text-yellow-500"
                  />
                ))}
              </div>
              <blockquote className="font-serif text-[19px] leading-[1.4] text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-[13px]">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-cream"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <span>
                  <span className="font-medium text-ink">{t.author}</span>
                  <span className="text-ink-60"> · {t.title}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
