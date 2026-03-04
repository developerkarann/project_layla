import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import LotusSectionIcon from "../LotusSectionIcon";
import { useContent, getFieldValue } from "../../hooks/useContent";
import { TESTIMONIALS as FALLBACK_TESTIMONIALS } from "../../data/aboutData";

const CARDS_PER_VIEW = 3;
const AUTOPLAY_MS = 300;

function buildTestimonialsFromSection(fields) {
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const quote = getFieldValue(fields, `quote${i}`);
    const attribution = getFieldValue(fields, `author${i}`);
    if (quote || attribution) items.push({ quote: quote || "", attribution: attribution || "" });
  }
  return items.length > 0 ? items : FALLBACK_TESTIMONIALS;
}

export default function Testimonial() {
  const { fields } = useContent("home", "testimonial");
  const testimonials = useMemo(() => buildTestimonialsFromSection(fields), [fields]);
  const sectionTitle = getFieldValue(fields, "sectionTitle") || "Words from clients";

  // Duplicate to get enough cards for one-by-one sliding
  const CAROUSEL_ITEMS = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [testimonials]
  );
  const TOTAL_ITEMS = CAROUSEL_ITEMS.length;
  const MAX_INDEX = Math.max(0, TOTAL_ITEMS - CARDS_PER_VIEW);

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= MAX_INDEX ? 0 : i + 1));
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? MAX_INDEX : i - 1));
  }, []);

  useEffect(() => {
    if (MAX_INDEX <= 0 || isPaused) return;
    intervalRef.current = setInterval(goNext, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [MAX_INDEX, isPaused, goNext]);

  return (
    <section
      id="testimonial"
      className="relative overflow-hidden bg-reiki-bg-stripe py-16 md:py-20"
      aria-labelledby="testimonial-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <LotusSectionIcon />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <header className="text-center mb-10 md:mb-12">
          <h2
            id="testimonial-heading"
            className="font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl"
            style={{ fontFamily: "EB Garamond" }}
          >
            {sectionTitle.split(" ").length > 1 ? (
              <>
                {sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-reiki-olive">{sectionTitle.split(" ").slice(-1)[0]}</span>
              </>
            ) : (
              <span className="text-reiki-olive">{sectionTitle}</span>
            )}
          </h2>
        </header>

        {/* Cards only – no nav inside this area */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              width: (100 * TOTAL_ITEMS) / CARDS_PER_VIEW + "%",
              transform: "translateX(-" + index * (100 / TOTAL_ITEMS) + "%)",
            }}
          >
            {CAROUSEL_ITEMS.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 min-w-0 px-2 sm:px-3 first:pl-0 last:pr-0"
                style={{ width: 100 / TOTAL_ITEMS + "%" }}
                aria-hidden={
                  i < index || i >= index + CARDS_PER_VIEW
                }
              >
                <article
                  className="h-full rounded-2xl border border-reiki-card-border bg-white shadow-sm overflow-hidden flex flex-col"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(58, 79, 63, 0.06), 0 4px 12px rgba(58, 79, 63, 0.04)",
                  }}
                >
                  <div className="relative flex-1 flex flex-col min-h-0 p-5 sm:p-6">
                    <span
                      className="absolute left-5 top-5 font-serif text-3xl sm:text-4xl text-reiki-olive/25 leading-none select-none"
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <blockquote className="relative pl-6 sm:pl-7 flex-1 flex flex-col min-h-0 min-w-0">
                      <p
                        className="font-serif text-sm sm:text-base italic text-reiki-quote leading-relaxed break-words overflow-hidden line-clamp-5 min-w-0"
                        style={{ fontFamily: "Lora" }}
                      >
                        {item.quote}
                      </p>
                      <cite className="mt-4 flex-shrink-0 font-lato text-xs sm:text-sm not-italic text-reiki-quote-attribution font-medium border-l-2 border-reiki-olive/50 pl-3 break-words">
                        {item.attribution}
                      </cite>
                    </blockquote>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation below cards – does not overlap or shrink cards */}
        {MAX_INDEX > 0 && (
          <div className="flex items-center justify-between gap-4 mt-8 min-h-[3rem]">
            <button
              type="button"
              onClick={goPrev}
              className="flex-shrink-0 w-10 h-10 rounded-full border border-reiki-card-border bg-white text-reiki-dark shadow-sm flex items-center justify-center hover:bg-reiki-section hover:border-reiki-olive/40 transition-colors focus:outline-none focus:ring-2 focus:ring-reiki-olive/30"
              aria-label="Previous"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex justify-center gap-2 flex-1">
              {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={
                    "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-reiki-olive/40 " +
                    (i === index
                      ? "w-8 bg-reiki-olive"
                      : "w-2 bg-reiki-card-border hover:bg-reiki-muted")
                  }
                  aria-label={"Go to slide " + (i + 1)}
                  aria-current={i === index ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex-shrink-0 w-10 h-10 rounded-full border border-reiki-card-border bg-white text-reiki-dark shadow-sm flex items-center justify-center hover:bg-reiki-section hover:border-reiki-olive/40 transition-colors focus:outline-none focus:ring-2 focus:ring-reiki-olive/30"
              aria-label="Next"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
