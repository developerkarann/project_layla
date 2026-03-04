/**
 * Placeholder for admin CRUD (Blog, Services, Gallery, Membership). Shows current list from Redux; full forms can be added like AdminEvents.
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogPosts } from "../../store/slices/blogSlice";
import { fetchServices } from "../../store/slices/servicesSlice";
import { fetchGalleryGroups } from "../../store/slices/gallerySlice";
import { fetchMembershipData } from "../../store/slices/membershipSlice";

const hooks = {
  blog: {
    title: "Blog posts",
    fetch: fetchBlogPosts,
    list: (s) => s.blog.posts,
    loading: (s) => s.blog.loading,
    label: (item) => item.title ?? item.slug,
  },
  services: {
    title: "Services",
    fetch: () => fetchServices(false),
    list: (s) => s.services.list,
    loading: (s) => s.services.loading,
    label: (item) => item.title,
  },
  gallery: {
    title: "Gallery",
    fetch: fetchGalleryGroups,
    list: (s) => s.gallery.groups,
    loading: (s) => s.gallery.loading,
    label: (item) => item.title || item.key,
  },
  membership: {
    title: "Membership",
    fetch: fetchMembershipData,
    list: (s) => s.membership.tiers,
    loading: (s) => s.membership.loading,
    label: (item) => item.name,
  },
};

export default function AdminManagePlaceholder({ type }) {
  const config = hooks[type];
  const dispatch = useDispatch();
  const list = useSelector(config?.list ?? (() => []));
  const loading = useSelector(config?.loading ?? (() => false));

  useEffect(() => {
    if (config?.fetch) dispatch(config.fetch());
  }, [dispatch, config]);

  const title = config?.title ?? type;
  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <h1 className="text-2xl text-reiki-dark" style={{ fontFamily: "EB Garamond, serif" }}>Manage {title}</h1>
        <p className="mt-1 text-sm text-reiki-muted">Data from API. Add/edit/delete forms can be added (see Events for pattern).</p>
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? <p className="text-reiki-muted">Loading…</p> : (
          <ul className="space-y-2 max-w-2xl">
            {list.map((item) => (
              <li key={item.id ?? item.slug ?? item.key} className="rounded-xl border border-reiki-card-border bg-white px-4 py-3">
                <span className="font-medium text-reiki-dark">{config?.label?.(item) ?? item.title ?? item.name}</span>
              </li>
            ))}
            {list.length === 0 && <p className="text-reiki-muted">No items yet.</p>}
          </ul>
        )}
        <p className="mt-6 text-sm text-reiki-muted">
          <Link to="/admin" className="text-reiki-olive hover:underline">← Back to content sections</Link>
        </p>
      </div>
    </div>
  );
}
