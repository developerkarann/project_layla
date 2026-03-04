import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { useContent, getFieldValue } from "../hooks/useContent";
import { fetchBlogPosts, fetchBlogCategories } from "../store/slices/blogSlice";
import { selectBlogPosts, selectBlogCategories, selectBlogLoading, selectBlogError } from "../store/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";

/** Format API date for display */
function formatPostDate(publishedAt) {
  if (!publishedAt) return "";
  const d = new Date(publishedAt);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function getImage(images, id = "main") {
  const img = images?.find((i) => i.id === id);
  return img?.url ?? null;
}

export default function BlogPage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectBlogPosts);
  const categories = useSelector(selectBlogCategories);
  const loading = useSelector(selectBlogLoading);
  const error = useSelector(selectBlogError);

  const heroContent = useContent("blog", "hero");
  const topicsContent = useContent("blog", "topics");
  const introQuoteContent = useContent("blog", "intro-quote");
  const featuredContent = useContent("blog", "featured");
  const latestContent = useContent("blog", "latest");
  const dividerContent = useContent("blog", "divider");
  const moreContent = useContent("blog", "more");
  const authorContent = useContent("blog", "author");
  const ctaContent = useContent("blog", "cta");

  const heroImage = getImage(heroContent.images, "main") || "/slide1.JPG";
  const scriptName = getFieldValue(heroContent.fields, "scriptName") || "Layla";
  const heroTitle = getFieldValue(heroContent.fields, "title") || "Blog";
  const heroSubtitle = getFieldValue(heroContent.fields, "subtitle") || "Reflections on healing, presence, and the path to inner peace";

  const topicsLabel = getFieldValue(topicsContent.fields, "label") || "Topics we explore";
  const topicsListRaw = getFieldValue(topicsContent.fields, "topicsList") || "";
  const topicsFromContent = useMemo(() => topicsListRaw.split("\n").map((s) => s.trim()).filter(Boolean), [topicsListRaw]);
  const topics = topicsFromContent.length > 0 ? topicsFromContent : categories;

  const introQuote = getFieldValue(introQuoteContent.fields, "quote") || "Words from the heart, for the heart. Here you'll find thoughts on Reiki, mindfulness, third culture life, and the art of coming home to yourself.";

  const featuredLabel = getFieldValue(featuredContent.fields, "label") || "Featured";
  const featuredSlug = (getFieldValue(featuredContent.fields, "featuredSlug") || "").trim();
  const featuredPostTitle = (getFieldValue(featuredContent.fields, "featuredPostTitle") || "").trim();
  const featuredImageOverride = getImage(featuredContent.images, "main") || null;

  const latestTitle = getFieldValue(latestContent.fields, "title") || "Latest stories";
  const latestSlug1 = (getFieldValue(latestContent.fields, "latestSlug1") || "").trim();
  const latestSlug2 = (getFieldValue(latestContent.fields, "latestSlug2") || "").trim();
  const latestPostTitle1 = (getFieldValue(latestContent.fields, "latestPostTitle1") || "").trim();
  const latestPostTitle2 = (getFieldValue(latestContent.fields, "latestPostTitle2") || "").trim();
  const latest1ImageOverride = getImage(latestContent.images, "latest1") || null;
  const latest2ImageOverride = getImage(latestContent.images, "latest2") || null;

  const moreTitle = getFieldValue(moreContent.fields, "title") || "More reflections";
  const moreSlugsRaw = (getFieldValue(moreContent.fields, "moreSlugs") || "").trim();
  const morePostTitlesRaw = getFieldValue(moreContent.fields, "morePostTitles") || "";
  const moreSlugsOrder = useMemo(
    () => moreSlugsRaw.split("\n").map((s) => s.trim()).filter(Boolean),
    [moreSlugsRaw]
  );
  const morePostTitlesOrder = useMemo(
    () => morePostTitlesRaw.split("\n").map((s) => s.trim()).filter(Boolean),
    [morePostTitlesRaw]
  );

  const findBySlug = (slug) => (slug ? posts.find((p) => p.slug === slug) : null);
  const findByTitle = (title) => (title ? posts.find((p) => (p.title || "").trim() === title) : null);

  const featuredPost = useMemo(() => {
    if (!posts.length) return null;
    const post =
      findBySlug(featuredSlug) ||
      findByTitle(featuredPostTitle) ||
      posts[0];
    if (!post) return null;
    return {
      ...post,
      image: featuredImageOverride || post.image || "/yoga.JPG",
    };
  }, [posts, featuredSlug, featuredPostTitle, featuredImageOverride]);

  const latestPosts = useMemo(() => {
    const p1 =
      findBySlug(latestSlug1) ||
      findByTitle(latestPostTitle1) ||
      posts[1];
    const p2 =
      findBySlug(latestSlug2) ||
      findByTitle(latestPostTitle2) ||
      posts[2];
    return [
      p1 ? { ...p1, image: latest1ImageOverride || p1.image || "/yoga.JPG" } : null,
      p2 ? { ...p2, image: latest2ImageOverride || p2.image || "/yoga.JPG" } : null,
    ].filter(Boolean);
  }, [posts, latestSlug1, latestSlug2, latestPostTitle1, latestPostTitle2, latest1ImageOverride, latest2ImageOverride]);

  const morePosts = useMemo(() => {
    if (moreSlugsOrder.length > 0) {
      return moreSlugsOrder.map((slug) => findBySlug(slug)).filter(Boolean);
    }
    if (morePostTitlesOrder.length > 0) {
      return morePostTitlesOrder.map((title) => findByTitle(title)).filter(Boolean);
    }
    const excluded = new Set([featuredPost?.slug].filter(Boolean));
    latestPosts.forEach((p) => { if (p?.slug) excluded.add(p.slug); });
    return posts.filter((p) => !excluded.has(p.slug));
  }, [posts, moreSlugsOrder, morePostTitlesOrder, featuredPost?.slug, latestPosts]);

  const authorTitle = getFieldValue(authorContent.fields, "title") || "Why I write";
  const authorP1 = getFieldValue(authorContent.fields, "paragraph1") || "";
  const authorP2 = getFieldValue(authorContent.fields, "paragraph2") || "";
  const authorP3 = getFieldValue(authorContent.fields, "paragraph3") || "";
  const authorLinkText = getFieldValue(authorContent.fields, "linkText") || "More about me →";
  const authorImage = getImage(authorContent.images, "main") || "/about.JPG";

  const ctaTitle = getFieldValue(ctaContent.fields, "title") || "Stay in the loop";
  const ctaBody = getFieldValue(ctaContent.fields, "body") || "New reflections on healing and presence. No spam, only heart.";
  const ctaButtonText = getFieldValue(ctaContent.fields, "buttonText") || "Get in touch";

  const dividerQuote = getFieldValue(dividerContent.fields, "quote") || "Every moment holds the possibility of peace.";
  const dividerAttribution = getFieldValue(dividerContent.fields, "attribution") || "";

  useEffect(() => {
    dispatch(fetchBlogPosts(true));
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  const renderSectionTitle = (raw) => {
    if (!raw || raw.split(" ").length <= 1) return <span className="text-reiki-olive">{raw || ""}</span>;
    const last = raw.split(" ").pop();
    const before = raw.split(" ").slice(0, -1).join(" ");
    return <>{before} <span className="text-reiki-olive">{last}</span></>;
  };

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load posts. Showing cached or empty list.
        </div>
      )}

      {/* Hero – face-focused on desktop */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] md:min-h-[58vh] flex items-end justify-center overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top md:object-[50%_22%] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-reiki-dark/25 via-reiki-dark/48 to-reiki-dark/72" aria-hidden />
        <div className="relative z-10 w-full max-w-7xl px-4 pb-14 pt-24 sm:pb-20 md:pb-24 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="font-script text-2xl text-white/90 sm:text-3xl" style={{ fontFamily: "Dancing Script" }}>{scriptName}</span>
            <span className="mt-1 block h-px w-12 bg-white/60" aria-hidden />
          </div>
          <h1 className="mt-4 font-garamond text-4xl font-normal text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "EB Garamond" }}>
            {heroTitle}
          </h1>
          <p className="mt-4 font-lato text-base text-white/90 sm:text-lg max-w-xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Topics strip */}
      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <p className="font-lato text-center text-xs font-semibold uppercase tracking-wider text-reiki-muted mb-4">{topicsLabel}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {topics.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-reiki-card-border bg-reiki-section px-4 py-2 font-lato text-sm text-reiki-dark shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Intro quote */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "Lora" }}>
            "{introQuote}"
          </p>
        </div>
      </section>

      {/* Featured post */}
      {loading ? (
        <section className="bg-reiki-bg-stripe px-4 py-12"><p className="font-lato text-reiki-body text-center">Loading posts…</p></section>
      ) : featuredPost ? (
        <section className="bg-reiki-bg-stripe px-4 py-12 md:py-16">
          <LotusSectionIcon />
          <div className="mx-auto max-w-7xl">
            <span className="font-lato text-xs font-semibold uppercase tracking-wider text-reiki-olive">{featuredLabel}</span>
            <article className="mt-4 overflow-hidden rounded-2xl border-2 border-reiki-olive/30 bg-reiki-section shadow-lg md:flex">
              <Link to={`/blog/${featuredPost.slug}`} className="block md:w-1/2 lg:w-[55%] shrink-0 relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-r-none">
                <div className="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[380px]">
                  <img src={featuredPost.image || "/yoga.JPG"} alt="" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-lato text-xs font-medium text-reiki-dark shadow">
                  {featuredPost.category}
                </span>
              </Link>
              <div className="flex flex-col justify-center p-6 sm:p-8 md:w-1/2 lg:w-[45%] rounded-b-2xl md:rounded-r-2xl md:rounded-l-none">
                <span className="font-lato text-sm text-reiki-muted">{formatPostDate(featuredPost.publishedAt)}</span>
                <h2 className="mt-2 font-garamond text-2xl text-reiki-dark sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: "EB Garamond" }}>
                  <Link to={`/blog/${featuredPost.slug}`} className="hover:text-reiki-olive transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-4 font-lato text-reiki-body leading-relaxed sm:text-lg">
                  {featuredPost.excerpt}
                </p>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-6 inline-block self-start rounded-lg bg-reiki-dark px-6 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read more
                </Link>
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {/* Latest two – horizontal cards */}
      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl md:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {renderSectionTitle(latestTitle)}
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-reiki-card-border bg-reiki-section shadow-sm md:flex md:flex-row"
              >
                <Link to={`/blog/${post.slug}`} className="block md:w-[40%] shrink-0 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                  <div className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[220px]">
                    <img src={post.image || "/yoga.JPG"} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="flex flex-col justify-center p-5 sm:p-6 md:w-[60%]">
                  <span className="font-lato text-xs text-reiki-muted">{formatPostDate(post.publishedAt)} · {post.category}</span>
                  <h3 className="mt-1 font-garamond text-lg font-semibold text-reiki-dark sm:text-xl" style={{ fontFamily: "EB Garamond" }}>
                    <Link to={`/blog/${post.slug}`} className="hover:text-reiki-olive transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-lato text-sm text-reiki-body line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} className="mt-3 font-sans text-sm font-semibold text-reiki-dark hover:text-reiki-olive transition-colors">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote / divider */}
      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-10 md:py-14">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center gap-4">
            <span className="text-reiki-olive" aria-hidden>◆</span>
            <p className="font-serif text-center text-lg italic text-reiki-quote sm:text-xl" style={{ fontFamily: "Lora" }}>
              {dividerQuote}
            </p>
            <span className="text-reiki-olive text-sm" aria-hidden>{dividerAttribution}</span>
          </div>
        </div>
      </section>

      {/* More stories grid */}
      <section className="bg-white px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-garamond text-center text-xl text-reiki-dark sm:text-2xl md:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {renderSectionTitle(moreTitle)}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {morePosts.map((post, i) => (
              <article
                key={post.slug}
                className={`flex flex-col overflow-hidden rounded-xl border bg-reiki-section shadow-sm transition-all hover:shadow-md ${i === 0 ? "border-l-4 border-l-reiki-olive border-reiki-card-border" : "border-reiki-card-border"}`}
              >
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-t-xl">
                  <div className="aspect-[4/3]">
                    <img src={post.image || "/yoga.JPG"} alt="" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <span className="font-lato text-xs text-reiki-muted">{formatPostDate(post.publishedAt)} · {post.category}</span>
                  <h3 className="mt-1 font-garamond text-lg font-semibold text-reiki-dark sm:text-xl" style={{ fontFamily: "EB Garamond" }}>
                    <Link to={`/blog/${post.slug}`} className="hover:text-reiki-olive transition-colors line-clamp-2">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 font-lato text-sm text-reiki-body line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-block self-start font-sans text-sm font-semibold text-reiki-dark hover:text-reiki-olive transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {morePosts.length === 0 && !loading && (
            <p className="mt-8 font-lato text-reiki-body text-center">No more posts yet. Check back soon.</p>
          )}
        </div>
      </section>

      {/* About the author / Why I write */}
      <section className="bg-reiki-bg-stripe border-t border-reiki-accent/40 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-reiki-card-border bg-reiki-section shadow-md md:flex">
            <div className="relative w-full shrink-0 aspect-[3/4] min-h-[240px] max-h-[320px] md:max-h-none md:aspect-auto md:h-auto md:w-72 overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-r-none">
              <img src={authorImage} alt="Layla" className="h-full w-full object-cover object-top" />
              <div className="absolute inset-0 bg-reiki-dark/10 md:bg-transparent" aria-hidden />
            </div>
            <div className="p-6 sm:p-8 md:flex-1">
              <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>
                {renderSectionTitle(authorTitle)}
              </h2>
              {authorP1 && <p className="mt-3 font-lato text-reiki-body leading-relaxed">{authorP1}</p>}
              {authorP2 && <p className="mt-3 font-lato text-reiki-body leading-relaxed">{authorP2}</p>}
              {authorP3 && <p className="mt-3 font-lato text-reiki-body leading-relaxed">{authorP3}</p>}
              <Link to="/#about" className="mt-4 inline-block font-sans text-sm font-semibold text-reiki-dark hover:text-reiki-olive transition-colors">
                {authorLinkText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stay in the loop */}
      <section className="bg-white border-t border-reiki-card-border px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>
            {renderSectionTitle(ctaTitle)}
          </h2>
          <p className="mt-3 font-lato text-reiki-body">
            {ctaBody}
          </p>
          <Link
            to="/#contact"
            className="mt-6 inline-block rounded-lg bg-reiki-dark px-8 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90"
          >
            {ctaButtonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
