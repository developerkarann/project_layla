/**
 * Section divider: thin vertical line extending down, terminating in circular icon.
 * Icon: dark green outline, light green fill, leaf/energy symbol.
 */
export default function SectionDivider() {
  return (
    <div className="flex flex-col items-center gap-0 pt-6 pb-4 md:pt-8 md:pb-6">
      {/* Vertical line (extends down from section) */}
      <div className="w-px h-10 md:h-14 bg-reiki-dark/25" aria-hidden />
      {/* Circular icon: dark green outline, light green fill */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-reiki-dark bg-reiki-accent"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-reiki-dark"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m11.88 11.88l1.42 1.42M5.64 18.36l1.42-1.42m11.88-11.88l1.42-1.42M18.36 5.64l-1.42 1.42M6.06 6.06l-1.42 1.42" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
