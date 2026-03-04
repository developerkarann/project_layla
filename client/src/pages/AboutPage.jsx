import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { fetchAbout } from "../store/slices/aboutSlice";
import { selectAbout, selectAboutLoading, selectAboutError } from "../store/slices/aboutSlice";
import { ABOUT_FALLBACK } from "../utils/fallbacks";

/** Merge API about data with fallback so we always have safe defaults for rendering. */
function useAboutData() {
  const dispatch = useDispatch();
  const apiData = useSelector(selectAbout);
  const loading = useSelector(selectAboutLoading);
  const error = useSelector(selectAboutError);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  const about = apiData ?? ABOUT_FALLBACK;
  const journey = about.journey?.length ? about.journey : [
    { year: "Early path", title: "Across cultures", text: "Growing up between worlds sparked a lifelong interest in identity, belonging, and the many ways we heal." },
    { year: "Training", title: "Integrative systems", text: "Formal training in shamanic energy medicine, Vitality Qigong, and life coaching." },
    { year: "Today", title: "Practice & teaching", text: "Working with individuals and groups, bridging traditions and cultures." },
  ];
  const testimonial = about.testimonial ?? { quote: "", attribution: "" };

  return { about, journey, testimonial, loading, error };
}

export default function AboutPage() {
  const { about, journey, testimonial, loading, error } = useAboutData();

  if (loading && !about?.name) {
    return (
      <main className="min-h-screen bg-page-bg flex items-center justify-center">
        <div className="text-reiki-muted">Loading…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load latest content. Showing cached or default data.
        </div>
      )}
      {/* Hero – full viewport, image dominant */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-end overflow-hidden">
        <img src="/slide4.JPG" alt="" className="absolute inset-0 h-full w-full object-cover object-top scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-reiki-dark/30 to-reiki-dark/80" aria-hidden />
        <div className="relative z-10 w-full px-4 pb-16 pt-24 sm:pb-20 md:pb-24 md:pt-32">
          <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
            <span className="font-script text-4xl text-white drop-shadow-lg sm:text-5xl md:text-6xl" style={{ fontFamily: "Dancing Script" }}>
              {about.name}
            </span>
            <span className="mt-3 block h-px w-20 bg-white/80" aria-hidden />
            <h1 className="mt-5 font-garamond text-5xl font-normal text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-md" style={{ fontFamily: "EB Garamond" }}>
              About
            </h1>
            <p className="mt-5 font-lato text-xl text-white/95 sm:text-2xl md:text-3xl max-w-2xl">
              {about.tagline}
            </p>
          </div>
        </div>
        <div className="absolute inset-4 sm:inset-6 md:inset-8 border border-white/20 rounded-lg pointer-events-none" aria-hidden />
      </section>

      {/* Hi, I'm Layla */}
      <section className="bg-white py-20 md:py-28 lg:py-32 overflow-hidden">
        <LotusSectionIcon />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-lg mx-auto lg:max-w-none">
                <div className="aspect-[3/4] max-h-[75vh] overflow-hidden rounded-3xl border-4 border-reiki-card-border shadow-2xl">
                  <img src="/about.JPG" alt="Layla" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-8 w-[45%] sm:w-[50%] aspect-square overflow-hidden rounded-2xl border-4 border-white shadow-xl hidden sm:block">
                  <img src="/layla2.JPG" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-4 border-white bg-reiki-olive/40 shadow-lg" aria-hidden />
              </div>
            </div>
            <div className="lg:col-span-7 lg:pl-12">
              <h2 className="font-garamond text-3xl text-reiki-dark sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "EB Garamond" }}>
                {about.introTitle?.split("Layla")[0] ?? "Hi, my name is "}
                <span className="text-reiki-olive">Layla</span>
              </h2>
              <div className="mt-8 space-y-6">
                {(about.introParagraphs || []).map((p, i) => (
                  <p key={i} className="font-lato text-reiki-text leading-relaxed text-lg sm:text-xl">
                    {p}
                  </p>
                ))}
              </div>
              <Link to="/services" className="mt-10 inline-block rounded-xl bg-reiki-dark px-10 py-4 font-sans text-base font-semibold text-white transition hover:opacity-90 shadow-lg">
                {about.introCtaText || "Explore my services"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden">
        <img src="/slide3.JPG" alt="" className="absolute inset-0 h-full w-full object-cover scale-105" />
        <div className="absolute inset-0 bg-reiki-dark/60" aria-hidden />
        <div className="relative z-10 w-full max-w-4xl px-4 py-16 text-center">
          <h2 className="font-garamond text-2xl text-white sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {about.mission?.title}
          </h2>
          {about.mission?.quote && (
            <p className="mt-6 font-serif text-xl italic text-white/95 sm:text-2xl md:text-3xl leading-relaxed" style={{ fontFamily: "Lora" }}>
              "{about.mission.quote}"
            </p>
          )}
          <p className="mt-6 font-lato text-white/90 leading-relaxed text-lg sm:text-xl max-w-2xl mx-auto">
            {about.mission?.body}
          </p>
        </div>
      </section>

      {/* Approach + values */}
      <section className="bg-reiki-bg-stripe py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {about.approach?.title}
          </h2>
          <p className="mt-6 mx-auto max-w-3xl text-center font-lato text-reiki-text leading-relaxed text-lg">
            {about.approach?.body}
          </p>
          <div className="mt-16 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2 relative order-first lg:order-none">
              <div className="sticky top-24">
                <div className="aspect-[4/5] max-h-[500px] overflow-hidden rounded-3xl border border-reiki-card-border shadow-xl">
                  <img src="/yoga.JPG" alt="" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 grid gap-5 sm:grid-cols-2">
              {(about.values || []).map((v) => (
                <div key={v.title} className="rounded-2xl border-2 border-reiki-card-border bg-reiki-section p-6 shadow-sm hover:border-reiki-olive/50 transition-colors">
                  <h3 className="font-garamond text-xl font-semibold text-reiki-olive" style={{ fontFamily: "EB Garamond" }}>{v.title}</h3>
                  <p className="mt-3 font-lato text-reiki-body leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awakens */}
      <section className="bg-white py-20 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-0 lg:grid-cols-12 lg:gap-0 lg:items-stretch">
            <div className="lg:col-span-7 relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
              <img src="/awaken-final.jpg" alt="Awaken your powers" className="absolute inset-0 h-full w-full object-cover object-top" />
              <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-white/0 via-white/0 to-white/90" aria-hidden />
              <div className="absolute inset-0 hidden lg:flex items-center justify-end p-8 md:p-12">
                <div className="max-w-md lg:max-w-lg lg:mr-12 lg:ml-auto">
                  <h2 className="font-garamond text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-md" style={{ fontFamily: "EB Garamond" }}>
                    <span className="text-reiki-accent">Awakens</span> your powers of self healing
                  </h2>
                  <p className="mt-4 font-lato text-white/95 text-base sm:text-lg drop-shadow-sm">
                    {about.awaken?.closing}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-reiki-bg-stripe p-8 md:p-12 lg:py-16 flex flex-col justify-center">
              {(about.awaken?.paragraphs || []).map((p, i) => (
                <p key={i} className="font-lato text-reiki-text leading-relaxed text-lg mb-6 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <img src="/slide4.JPG" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-reiki-dark/65" aria-hidden />
        <div className="relative z-10 max-w-5xl px-4 py-20 text-center">
          {about.vision && (
            <p className="font-serif text-2xl italic text-white sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed" style={{ fontFamily: "Lora" }}>
              "{about.vision}"
            </p>
          )}
        </div>
      </section>

      {/* Training */}
      <section className="bg-white py-20 md:py-28">
        <LotusSectionIcon />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-garamond text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
                {(about.trainingSectionTitle || "Training & practice").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-reiki-olive">{(about.trainingSectionTitle || "Training & practice").split(" ").slice(-1)[0]}</span>
              </h2>
              <p className="mt-4 font-lato text-reiki-body text-lg max-w-xl">
                {about.trainingIntro || "My work is grounded in formal training and ongoing study across traditions that honor the whole person."}
              </p>
              <ul className="mt-8 space-y-4">
                {(about.trainings || []).map((t) => (
                  <li key={t} className="flex items-center gap-4 rounded-2xl border-2 border-reiki-card-border bg-reiki-section px-6 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reiki-benefit-icon text-reiki-dark font-semibold">✓</span>
                    <span className="font-lato text-reiki-dark text-lg">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <Link to="/services" className="font-lato text-base font-semibold text-reiki-olive hover:underline">
                  See all services →
                </Link>
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] sm:aspect-[3/4] max-h-[560px] overflow-hidden rounded-3xl border-4 border-reiki-card-border shadow-2xl">
                <img src="/service1.JPG" alt="Practice" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-reiki-bg-stripe py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {(about.journeySectionTitle || "My path").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-reiki-olive">{(about.journeySectionTitle || "My path").split(" ").slice(-1)[0]}</span>
          </h2>
          <div className="mt-10 space-y-6 sm:hidden">
            {journey.map((step, i) => (
              <article key={i} className="relative overflow-hidden rounded-3xl border-2 border-reiki-card-border bg-white shadow-xl">
                <div className="flex flex-col items-center text-center px-6 pt-8 pb-6">
                  <span className="flex w-16 h-16 items-center justify-center rounded-2xl bg-reiki-olive/15 border-2 border-reiki-olive font-garamond text-2xl font-bold text-reiki-dark shadow-inner" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="mt-4 font-lato text-xs font-bold uppercase tracking-widest text-reiki-olive">{step.year}</span>
                  <h3 className="mt-2 font-garamond text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{step.title}</h3>
                  <p className="mt-3 font-lato text-reiki-body leading-relaxed text-base">{step.text}</p>
                </div>
                {i < journey.length - 1 && (
                  <div className="flex justify-center py-2" aria-hidden>
                    <span className="text-reiki-olive/50 text-2xl">↓</span>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="mt-16 relative hidden sm:block">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-reiki-card-border" aria-hidden />
            <div className="space-y-12">
              {journey.map((step, i) => (
                <div key={i} className="flex flex-row items-start gap-6 sm:gap-8">
                  <div className="flex w-12 shrink-0 justify-center pt-0.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-reiki-olive bg-reiki-section font-garamond text-lg font-bold text-reiki-dark shadow-md z-10" aria-hidden>
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pl-2">
                    <span className="font-lato text-xs font-bold uppercase tracking-wider text-reiki-olive">{step.year}</span>
                    <h3 className="mt-1 font-garamond text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{step.title}</h3>
                    <p className="mt-3 font-lato text-reiki-body leading-relaxed text-lg">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonial" className="relative overflow-hidden bg-white py-16 md:py-20" aria-labelledby="testimonial-heading">
        <LotusSectionIcon />
        <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-6">
          <header className="text-center mb-10 md:mb-12">
            <h2 id="testimonial-heading" className="font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
              {(about.testimonialSectionTitle || "What people are saying").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-reiki-olive">{(about.testimonialSectionTitle || "What people are saying").split(" ").slice(-1)[0]}</span>
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[380px] gap-0">
            <figure className="relative md:col-span-5 order-2 md:order-1 min-h-[260px] md:min-h-0 m-0 overflow-hidden rounded-2xl border border-reiki-card-border shadow-sm">
              <img src="/about.JPG" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
            </figure>
            <div className="relative md:col-span-7 order-1 md:order-2 flex items-center py-10 md:py-14 px-0 md:pl-8 lg:pl-10 md:pr-4">
              <figure className="m-0 w-full">
                <blockquote className="relative border-l-4 border-reiki-olive pl-6 md:pl-7">
                  <span className="absolute -left-1 md:left-0 -top-1 font-serif text-5xl sm:text-6xl md:text-7xl text-reiki-olive/20 leading-none select-none" aria-hidden>&ldquo;</span>
                  <p className="relative font-serif text-lg sm:text-xl md:text-2xl italic text-reiki-quote leading-relaxed" style={{ fontFamily: "Lora" }}>
                    {testimonial.quote}
                  </p>
                  <cite className="mt-5 md:mt-6 block font-lato text-sm sm:text-base not-italic text-reiki-quote-attribution font-medium">
                    {testimonial.attribution}
                  </cite>
                </blockquote>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <img src="/awaken-final.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-reiki-dark/70" aria-hidden />
        <div className="relative z-10 max-w-2xl px-4 py-20 text-center">
          <p className="font-serif text-2xl italic text-white sm:text-3xl md:text-4xl" style={{ fontFamily: "Lora" }}>
            "{about.ctaQuote || "Create the life you want to live."}"
          </p>
          <p className="mt-5 font-lato text-white/95 text-lg">
            {about.ctaBody || "Ready to take the first step? I'd be honored to walk alongside you."}
          </p>
          <Link to="/contact" className="mt-8 inline-block rounded-xl bg-white px-12 py-4 font-sans text-base font-semibold text-reiki-dark transition hover:bg-reiki-section shadow-xl">
            {about.ctaButtonLabel || "Get in touch"}
          </Link>
        </div>
      </section>
    </main>
  );
}
