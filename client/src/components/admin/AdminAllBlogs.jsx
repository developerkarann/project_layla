/**
 * Admin "All Blogs" tab: list all blog posts and CRUD with same fields as BlogPage/BlogDetailPage.
 * Featured, Latest Stories, and More Reflections sections map by blog title to these posts.
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  fetchBlogPosts,
  createPost,
  updatePost,
  removePost,
} from "../../store/slices/blogSlice";
import { selectBlogPosts, selectBlogLoading } from "../../store/slices/blogSlice";

function formatPostDate(publishedAt) {
  if (!publishedAt) return "";
  return new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const emptyPost = {
  slug: "",
  title: "",
  excerpt: "",
  image: "",
  publishedAt: "",
  author: "Layla",
  category: "",
  body: "",
  isPublished: true,
};

export default function AdminAllBlogs() {
  const dispatch = useDispatch();
  const posts = useSelector(selectBlogPosts);
  const loading = useSelector(selectBlogLoading);

  const [editingSlug, setEditingSlug] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchBlogPosts(false));
  }, [dispatch]);

  const openNew = () => {
    setEditingSlug(null);
    setAddingNew(true);
    setForm({
      ...emptyPost,
      publishedAt: new Date().toISOString().slice(0, 10),
    });
  };

  const openEdit = (post) => {
    setEditingSlug(post.slug);
    setForm({
      slug: post.slug ?? "",
      title: post.title ?? "",
      excerpt: post.excerpt ?? "",
      image: post.image ?? "",
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 10) : "",
      author: post.author ?? "Layla",
      category: post.category ?? "",
      body: Array.isArray(post.body) ? post.body.join("\n") : (post.body ?? ""),
      isPublished: post.isPublished !== false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        excerpt: form.excerpt.trim(),
        image: form.image.trim() || undefined,
        publishedAt: form.publishedAt ? new Date(form.publishedAt) : new Date(),
        author: form.author.trim() || "Layla",
        category: form.category.trim() || undefined,
        body: form.body
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        isPublished: form.isPublished,
      };
      if (editingSlug) {
        await dispatch(updatePost({ slug: editingSlug, body })).unwrap();
        await dispatch(fetchBlogPosts(false));
        toast.success("Blog post updated successfully");
      } else {
        await dispatch(createPost(body)).unwrap();
        await dispatch(fetchBlogPosts(false));
        toast.success("Blog post created successfully");
      }
      setEditingSlug(null);
      setAddingNew(false);
      setForm(emptyPost);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await dispatch(removePost(slug)).unwrap();
      if (editingSlug === slug) {
        setEditingSlug(null);
        setAddingNew(false);
        setForm(emptyPost);
      }
      toast.success("Blog post deleted");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to delete blog post");
    }
  };

  const showForm = editingSlug != null || addingNew;

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">Edit content</p>
        <h1 className="mt-1 text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond, serif" }}>
          Blog › All Blogs
        </h1>
        <p className="mt-1 text-sm text-reiki-muted">
          Manage all blog posts. Use the same titles here in Featured label, Latest Stories, and More Reflections to show them on the blog page.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-reiki-dark">All blogs</h2>
              <button
                type="button"
                onClick={openNew}
                className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Add blog post
              </button>
            </div>
            {loading ? (
              <p className="text-reiki-muted">Loading…</p>
            ) : (
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li
                    key={post.slug}
                    className="flex items-center justify-between rounded-xl border border-reiki-card-border bg-white px-4 py-3"
                  >
                    <div>
                      <span className="font-medium text-reiki-dark">{post.title}</span>
                      <span className="ml-2 text-xs text-reiki-muted">
                        {post.slug} · {formatPostDate(post.publishedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-reiki-muted hover:text-reiki-olive"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEdit(post)}
                        className="text-sm font-medium text-reiki-olive hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(post.slug)}
                        className="text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
                {posts.length === 0 && <p className="text-reiki-muted">No blog posts yet. Add one above.</p>}
              </ul>
            )}
          </section>

          {showForm && (
            <section className="rounded-3xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">
                {editingSlug ? "Edit blog post" : "New blog post"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={form.slug}
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      placeholder="my-post-slug"
                      className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                      readOnly={!!editingSlug}
                    />
                    {editingSlug && <p className="mt-1 text-xs text-reiki-muted">Slug cannot be changed when editing.</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Excerpt</label>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                    rows={2}
                    className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Image URL</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="/yoga.JPG"
                    className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Published date *</label>
                    <input
                      type="date"
                      required
                      value={form.publishedAt}
                      onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                      className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Author</label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                      className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-reiki-dark mb-1">Category</label>
                    <input
                      type="text"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      placeholder="Mindfulness"
                      className="w-full rounded-lg border border-reiki-card-border px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Body (one paragraph per line) *</label>
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    rows={12}
                    placeholder="First paragraph...&#10;Second paragraph...&#10;Third paragraph..."
                    className="w-full rounded-lg border border-reiki-card-border px-3 py-2 font-mono text-sm"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                      className="rounded border-reiki-card-border"
                    />
                    <span className="text-sm text-reiki-dark">Published</span>
                  </label>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : editingSlug ? "Update post" : "Create post"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingSlug(null); setAddingNew(false); setForm(emptyPost); }}
                    className="text-sm text-reiki-muted hover:text-reiki-dark"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
