export function Footer() {
  return (
    <footer className="bg-cream py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className=" text-2xl font-semibold font-serif ">
            Own Your Space
          </span>
        </div>
        <div className="text-[12px] text-ink-60">
          © {new Date().getFullYear()} Own Your Space. Built for founders who
          ship.
        </div>
      </div>
    </footer>
  );
}
