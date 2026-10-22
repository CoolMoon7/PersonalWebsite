export function SectionHead({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  kicker?: string;
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-24 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div className="eyebrow mb-3 flex items-center gap-2">
          <span className="text-accent">{index}</span>
          <span className="w-6 h-px bg-line-2" />
          {kicker}
        </div>
        <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] leading-[1.1]">{title}</h2>
      </div>
      {children && <div className="text-[15px] text-muted max-w-md md:text-right">{children}</div>}
    </div>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
