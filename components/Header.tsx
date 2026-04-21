export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-oat/60 bg-cream/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 text-ink text-2xl"
          aria-label="Own Your Space - Home"
        >
          <span className="font-serif  font-semibold ">Own Your Space</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a
            href="#benefits"
            className="text-[14px] text-ink-60 transition-colors hover:text-ink"
          >
            What you get
          </a>
          <a
            href="#process"
            className="text-[14px] text-ink-60 transition-colors hover:text-ink"
          >
            Process
          </a>
          <a
            href="#audit"
            className="text-[14px] text-ink-60 transition-colors hover:text-ink"
          >
            Request audit
          </a>
        </nav>

        <a href="#audit" className="btn-primary py-2 text-[14px]">
          Get free audit
        </a>
      </div>
    </header>
  );
}
