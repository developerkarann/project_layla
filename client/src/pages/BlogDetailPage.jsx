import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPostBySlug } from "../store/slices/blogSlice";
import { selectCurrentPost, selectBlogLoading } from "../store/slices/blogSlice";

const AUTHOR_IMAGE = "/about.JPG";

function readingTime(body) {
  if (!body?.length) return 1;
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatPostDate(publishedAt) {
  if (!publishedAt) return "";
  return new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectCurrentPost);
  const loading = useSelector(selectBlogLoading);

  useEffect(() => {
    if (slug) dispatch(fetchBlogPostBySlug({ slug }));
  }, [dispatch, slug]);

  if (loading && !post) {
    return (
      <main className="min-h-screen bg-page-bg flex items-center justify-center">
        <p className="font-lato text-reiki-muted">Loading…</p>
      </main>
    );
  }

  if (!slug || (!loading && !post)) {
    return (
      <main className="min-h-screen bg-page-bg flex flex-col items-center justify-center px-4">
        <h1 className="font-garamond text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>Post not found</h1>
        <Link to="/blog" className="mt-4 text-reiki-olive hover:underline">← Back to Blog</Link>
      </main>
    );
  }

  const mins = readingTime(post.body);
  const pullQuote = post.body?.[1] ?? post.body?.[0] ?? "";

  return (
    <main className="min-h-screen bg-page-bg">
      <div className="border-b border-reiki-card-border bg-reiki-section">
        <div className="mx-auto max-w-3xl px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <Link to="/blog" className="inline-flex items-center gap-2 font-lato text-sm text-reiki-muted hover:text-reiki-dark transition-colors">← Back to Blog</Link>
          <span className="font-lato text-xs text-reiki-muted">{mins} min read</span>
        </div>
      </div>

      <section className="relative aspect-[21/9] sm:aspect-[3/1] max-h-[55vh] w-full overflow-hidden bg-reiki-section">
        <img src={post.image || "/yoga.JPG"} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-reiki-dark/60 via-reiki-dark/20 to-transparent" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <span className="font-lato text-xs text-white/80 uppercase tracking-wider">{post.category}</span>
          <h1 className="mt-1 font-garamond text-2xl text-white drop-shadow sm:text-3xl md:text-4xl lg:text-5xl leading-tight" style={{ fontFamily: "EB Garamond" }}>{post.title}</h1>
          <p className="mt-2 font-lato text-sm text-white/90">By {post.author || "Layla"} · {formatPostDate(post.publishedAt)}</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <div className="space-y-6 border-t border-reiki-card-border pt-8">
          {(post.body || []).map((paragraph, i) => (
            <p key={i} className="font-lato text-reiki-text leading-relaxed sm:text-lg">{paragraph}</p>
          ))}
        </div>

        {pullQuote && (
          <aside className="my-10 sm:my-12 rounded-2xl border-l-4 border-reiki-olive bg-reiki-bg-stripe px-6 py-6 sm:px-8 sm:py-8">
            <p className="font-serif text-lg italic text-reiki-quote sm:text-xl leading-relaxed" style={{ fontFamily: "Lora" }}>"{pullQuote}"</p>
          </aside>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-reiki-card-border bg-reiki-section p-6">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-reiki-accent">
            <img src={AUTHOR_IMAGE} alt={post.author || "Layla"} className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <p className="font-lato font-semibold text-reiki-dark">{post.author || "Layla"}</p>
            <p className="font-lato text-sm text-reiki-body">Writer & practitioner</p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-reiki-card-border">
          <Link to="/blog" className="inline-flex items-center gap-2 font-lato text-sm font-semibold text-reiki-olive hover:underline">← Back to Blog</Link>
        </div>
      </article>
    </main>
  );
}

