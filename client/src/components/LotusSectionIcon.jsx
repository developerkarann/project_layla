/**
 * Lotus flower image for white-background sections.
 * At the very top of the section with no gap; visually emerges from the top edge.
 */
export default function LotusSectionIcon() {
  return (
    <div
      className="flex justify-center pt-0 pb-2 md:pb-4 -mt-4 md:-mt-0"
      aria-hidden
    >
      <img
        src="/lotus.png"
        alt=""
        className="h-16 w-auto object-contain object-top sm:h-20 md:h-32 lg:h-[8.5rem]"
        width={80}
        height={96}
      />
    </div>
  );
}
