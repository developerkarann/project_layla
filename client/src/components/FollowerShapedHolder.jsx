/**
 * Reusable "follower shaped holder": thin vertical line with icon at the bottom.
 * @param {{ variant?: 'default' | 'olive' }} props - Use "olive" for HolisticHealingIntro section.
 */
export default function FollowerShapedHolder({ variant = "default" }) {
  const isOlive = variant === "olive";
  const lineClass = isOlive ? "bg-reiki-olive" : "bg-reiki-holder-line";
  const iconClass = isOlive ? "text-reiki-olive" : "text-reiki-holder-fill";
  return (
    <div className="flex flex-col items-center shrink-0" aria-hidden>
      <div className={`w-px h-8 md:h-10 ${lineClass}`} aria-hidden />
      <svg
        viewBox="0 0 24 16"
        className={`h-6 w-9 md:h-7 md:w-10 ${iconClass}`}
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 0 L22 7 L22 16 L2 16 L2 7 Z" />
        <rect x="6" y="9" width="2.5" height="2.5" rx="0.5" fill="var(--color-reiki-holder-inner)" />
        <rect x="15.5" y="9" width="2.5" height="2.5" rx="0.5" fill="var(--color-reiki-holder-inner)" />
      </svg>
    </div>
  );
}
