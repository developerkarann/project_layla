import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { useContent, getFieldValue } from "../hooks/useContent";
import { fetchServices } from "../store/slices/servicesSlice";
import { selectServices, selectServicesLoading, selectServicesError } from "../store/slices/servicesSlice";
import { fetchBlogPosts } from "../store/slices/blogSlice";
import { selectBlogPosts } from "../store/slices/blogSlice";


/** Build 3 path objects from services/three-paths content (fields + images). */
function buildPathsFromContent(fields, images) {
  const get = (id) => getFieldValue(fields, id) ?? "";
  const getImg = (id) => images?.find((i) => i.id === id);
  const toList = (s) => (s || "").split("\n").filter(Boolean).map((x) => x.trim());
  return [1, 2, 3].map((n) => {
    const id = get(`path${n}Id`) || `path-${n}`;
    const img = getImg(`path${n}`);
    return {
      id,
      title: get(`path${n}Title`),
      tagline: get(`path${n}Tagline`),
      description: get(`path${n}Description`),
      image: img?.url || "/h2.JPG",
      imageAlt: img?.alt || get(`path${n}Title`),
      keyPoints: toList(get(`path${n}KeyPoints`)),
      quote: get(`path${n}Quote`) || null,
      whoItsFor: get(`path${n}WhoItsFor`) || null,
      offerings: toList(get(`path${n}Offerings`)),
    };
  }).filter((p) => p.title);
}

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-reiki-benefit-icon" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-reiki-dark" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function ServiceIcon() {
  return (
    <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-reiki-olive/30 bg-reiki-olive/10" aria-hidden>
      <span className="h-2.5 w-2.5 rounded-full bg-reiki-olive" />
    </span>
  );
}

/** Renders one service block (image + content). Layout alternates by index for variety. */
function ServiceBlock({ service, index }) {
  const isWideImage = index === 1; // TCK coaching style
  return (
    <section id={service.id} className={`scroll-mt-20 ${index % 2 === 0 ? "bg-reiki-bg-stripe" : "bg-white"} px-4 py-16 md:py-20 lg:py-24`}>
      <div className={`mx-auto ${isWideImage ? "max-w-7xl" : "max-w-5xl"}`}>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-reiki-card-border shadow-lg">
            <img
              src={service.image || "/h2.JPG"}
              alt={service.imageAlt || service.title}
              className={`w-full object-cover ${isWideImage ? "aspect-[21/9]" : "aspect-[4/3]"}`}
            />
          </div>
          {!isWideImage && (
            <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-full border-4 border-reiki-section bg-reiki-olive/20 md:block" aria-hidden />
          )}
        </div>
        <div className="mt-10">
          <h2 className="mt-2 font-garamond text-3xl text-reiki-dark sm:text-4xl md:text-5xl" style={{ fontFamily: "EB Garamond" }}>
            <ServiceIcon />
            {service.title}
          </h2>
          <p className="mt-3 font-lato text-lg text-reiki-body">{service.tagline}</p>
          <p className="mt-6 font-lato text-reiki-text leading-relaxed">{service.description}</p>
          {(service.keyPoints?.length > 0) && (
            <ul className="mt-6 space-y-3">
              {service.keyPoints.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <CheckIcon />
                  <span className="font-lato text-reiki-dark">{point}</span>
                </li>
              ))}
            </ul>
          )}
          {service.quote && (
            <div className="mt-8 rounded-xl border-l-4 border-reiki-olive bg-reiki-section p-5">
              <p className="font-serif italic text-reiki-quote" style={{ fontFamily: "Lora" }}>"{service.quote}"</p>
            </div>
          )}
          {service.whoItsFor && (
            <p className="mt-4 font-lato text-sm text-reiki-body">
              <strong className="text-reiki-dark">Who it's for:</strong> {service.whoItsFor}
            </p>
          )}
          {(service.offerings?.length > 0) && (
            <div className="mt-6">
              <p className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-muted">What we offer</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {service.offerings.map((o, i) => (
                  <li key={i} className="rounded-full bg-reiki-section px-3 py-1 font-lato text-sm text-reiki-dark border border-reiki-card-border">{o}</li>
                ))}
              </ul>
            </div>
          )}
          <Link to="/availability" className="mt-8 inline-block rounded-lg bg-reiki-dark px-8 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90">
            Book a session
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const dispatch = useDispatch();
  const apiServices = useSelector(selectServices);
  const loading = useSelector(selectServicesLoading);
  const error = useSelector(selectServicesError);
  const blogPosts = useSelector(selectBlogPosts);

  const heroContent = useContent("services", "hero");
  const introQuoteContent = useContent("services", "intro-quote");
  const threePathsContent = useContent("services", "three-paths");
  const atAGlanceContent = useContent("services", "at-a-glance");

  const heroTitle = getFieldValue(heroContent.fields, "title") || "Services";
  const heroSubtitle = getFieldValue(heroContent.fields, "subtitle") || "Three paths to wholeness—Shamanic Healing, TCK Holistic Coaching, and Vitality Qigong. Each meets you where you are.";
  const heroImage = heroContent.images?.find((i) => i.id === "main")?.url || "/awaken-final.jpg";
  const introQuote = getFieldValue(introQuoteContent.fields, "quote") || "Healing is not one size fits all. Whether you are drawn to the depth of shamanic work, the clarity of coaching, or the gentle power of Qigong—there is a path here for you.";

  const pathsFromContent = useMemo(
    () => buildPathsFromContent(threePathsContent.fields, threePathsContent.images),
    [threePathsContent.fields, threePathsContent.images]
  );
  const sectionTitle = getFieldValue(threePathsContent.fields, "title") || "Three paths, one intention";
  const sectionBody = getFieldValue(threePathsContent.fields, "body") || "Your wholeness. Each practice is rooted in respect for your autonomy and your inner knowing.";

  const atAGlanceTitle = getFieldValue(atAGlanceContent.fields, "title") || "At a glance";
  const blogSlug1 = (getFieldValue(atAGlanceContent.fields, "blogSlug1") || "").trim();
  const blogSlug2 = (getFieldValue(atAGlanceContent.fields, "blogSlug2") || "").trim();
  const blogSlug3 = (getFieldValue(atAGlanceContent.fields, "blogSlug3") || "").trim();
  const atAGlanceSlugs = useMemo(() => [blogSlug1, blogSlug2, blogSlug3], [blogSlug1, blogSlug2, blogSlug3]);
  const atAGlancePostsBySlot = useMemo(
    () => atAGlanceSlugs.map((slug) => (slug ? blogPosts.find((p) => p.slug === slug) : null)),
    [blogPosts, atAGlanceSlugs]
  );
  const atAGlanceFallbackItems = pathsFromContent.length > 0 ? pathsFromContent : apiServices;

  useEffect(() => {
    dispatch(fetchServices(true));
  }, [dispatch]);

  useEffect(() => {
    if (atAGlanceSlugs.some(Boolean)) dispatch(fetchBlogPosts(false));
  }, [dispatch, atAGlanceSlugs]);

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load services. Showing cached or empty list.
        </div>
      )}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] flex items-end justify-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-top md:object-[50%_20%] scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-reiki-dark/25 via-reiki-dark/45 to-reiki-dark/75" aria-hidden />
        <div className="relative z-10 w-full max-w-7xl px-4 pb-16 pt-24 sm:pb-20 md:pb-24 text-center">
          <h1 className="mt-4 font-garamond text-4xl font-normal text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "EB Garamond" }}>
            {heroTitle}
          </h1>
          <p className="mt-4 font-lato text-base text-white/90 sm:text-lg md:text-xl max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "Lora" }}>
            {introQuote}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-10 md:py-14">
        <LotusSectionIcon />
        <div className="mx-auto max-w-6xl">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {sectionTitle.split(" ").length > 1 ? (
              <>
                {sectionTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-reiki-olive">{sectionTitle.split(" ").slice(-1)[0]}</span>
              </>
            ) : (
              <span className="text-reiki-olive">{sectionTitle}</span>
            )}
          </h2>
          <p className="mt-4 font-lato text-center text-reiki-body max-w-2xl mx-auto">
            {sectionBody}
          </p>
          {threePathsContent.loading && pathsFromContent.length === 0 ? (
            <p className="mt-8 font-lato text-reiki-body text-center">Loading…</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {(pathsFromContent.length > 0 ? pathsFromContent : apiServices).map((s) => (
                <Link key={s.id} to={`#${s.id}`} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 text-center shadow-sm transition-all hover:border-reiki-olive/50 hover:shadow-md">
                  <span className="font-garamond text-lg font-semibold text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{s.title}</span>
                  <p className="mt-1 font-lato text-sm text-reiki-body">{s.tagline}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {(pathsFromContent.length > 0 ? pathsFromContent : apiServices).map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <section className="bg-white border-y border-reiki-card-border px-4 py-14 md:py-20">
        <LotusSectionIcon />
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-garamond text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            Not sure which <span className="text-reiki-olive">path</span>?
          </h2>
          <p className="mt-4 font-lato text-reiki-body leading-relaxed">
            Many clients start with a single modality and later weave in another. When you get in touch, we can have a short conversation about what you're drawn to. There's no wrong door.
          </p>
          <Link to="/contact" className="mt-8 inline-block rounded-lg border-2 border-reiki-dark px-8 py-3 font-sans text-sm font-semibold text-reiki-dark transition hover:bg-reiki-dark hover:text-white">
            Let's talk
          </Link>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe px-4 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {atAGlanceTitle.split(" ").length > 1 ? (
              <>
                {atAGlanceTitle.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-reiki-olive">{atAGlanceTitle.split(" ").slice(-1)[0]}</span>
              </>
            ) : (
              <span className="text-reiki-olive">{atAGlanceTitle}</span>
            )}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const slug = atAGlanceSlugs[i];
              const post = atAGlancePostsBySlot[i];
              const pathItem = atAGlanceFallbackItems[i];
              if (slug && post) {
                return (
                  <div key={`blog-${post.slug}`} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 shadow-sm">
                    <Link to={`/blog/${post.slug}`} className="block aspect-[4/3] overflow-hidden rounded-xl">
                      <img src={post.image || "/yoga.JPG"} alt="" className="h-full w-full object-cover" />
                    </Link>
                    <h3 className="mt-4 font-garamond text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{post.title}</h3>
                    <p className="mt-1 font-lato text-sm text-reiki-body line-clamp-2">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="mt-4 inline-block font-lato text-sm font-semibold text-reiki-olive hover:underline">Read blog →</Link>
                  </div>
                );
              }
              if (slug && !post) {
                return <div key={`missing-${i}-${slug}`} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 shadow-sm">Blog &quot;{slug}&quot; not found.</div>;
              }
              if (pathItem) {
                return (
                  <div key={pathItem.id} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden rounded-xl">
                      <img src={pathItem.image || "/h2.JPG"} alt="" className="h-full w-full object-cover" />
                    </div>
                    <h3 className="mt-4 font-garamond text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{pathItem.title}</h3>
                    <p className="mt-1 font-lato text-sm text-reiki-body">{pathItem.tagline}</p>
                    <Link to="/blog" className="mt-4 inline-block font-lato text-sm font-semibold text-reiki-olive hover:underline">Read blog →</Link>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-xl italic text-reiki-quote sm:text-2xl" style={{ fontFamily: "Lora" }}>
            “Your healing journey is yours to shape. I'm here to walk it with you.”
          </p>
          <Link to="/contact" className="mt-8 inline-block rounded-lg bg-reiki-dark px-10 py-4 font-sans text-sm font-semibold text-white transition hover:opacity-90">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
