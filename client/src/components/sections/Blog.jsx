import { Link } from "react-router-dom";
import LotusSectionIcon from "../LotusSectionIcon";
import { BLOG_POSTS } from "../../data/blogPosts";
import { useContent, getFieldValue } from "../../hooks/useContent";

export default function Blog() {
  const { fields } = useContent("home", "blog-section");
  const titleRaw = getFieldValue(fields, "title") || "Pathways to Inner Peace";
  const lastWord = titleRaw.split(" ").pop();
  const titleBefore = titleRaw.split(" ").slice(0, -1).join(" ");

  return (
    <section id="blog" className="flex min-h-screen flex-col overflow-visible bg-reiki-bg-stripe px-4 pt-0 pb-10 md:px-6 md:pb-12">
      <LotusSectionIcon />
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-40 flex-col justify-center w-full">
        <h2 className="mt-1 font-garamond text-center text-xl text-reiki-dark sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight" style={{ fontFamily: "EB Garamond" }}>
          {titleBefore ? (
            <>
              {titleBefore} <span className="text-reiki-olive">{lastWord}</span>
            </>
          ) : (
            <span className="text-reiki-olive">{lastWord || "Peace"}</span>
          )}
        </h2>
        <div className="mt-6 sm:mt-8 md:mt-10 grid gap-6 sm:gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-reiki-card-border bg-reiki-section shadow-md transition-shadow hover:shadow-lg"
            >
              <Link to={`/blog/${post.slug}`} className="block overflow-hidden rounded-t-xl">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-garamond text-lg font-semibold text-reiki-dark sm:text-xl" style={{ fontFamily: "EB Garamond" }}>
                  <Link to={`/blog/${post.slug}`} className="hover:text-reiki-olive transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 font-lato text-sm leading-relaxed text-reiki-body sm:text-base">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-4 inline-block self-start rounded-lg bg-reiki-dark px-6 py-2.5 font-sans text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/blog"
            className="inline-block font-lato text-sm font-semibold text-reiki-dark hover:text-reiki-olive transition-colors"
          >
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
