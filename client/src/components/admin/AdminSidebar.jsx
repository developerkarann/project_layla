import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiRectangleGroup,
  HiPhoto,
  HiDocumentText,
  HiEnvelope,
  HiCalendar,
  HiGlobeAlt,
  HiChevronDown,
  HiChevronRight,
  HiSparkles,
} from "react-icons/hi2";

const ICONS = {
  Home: HiHome,
  User: HiUser,
  Services: HiRectangleGroup,
  Gallery: HiPhoto,
  Blog: HiDocumentText,
  Contact: HiEnvelope,
  Calendar: HiCalendar,
  Globe: HiGlobeAlt,
  Sparkles: HiSparkles,
};

export default function AdminSidebar({ nav, selectedPage, selectedSection, onSelect, manageLinks = [], isManageRoute, currentPath, onCloseSidebar }) {
  const [expanded, setExpanded] = useState(() => (selectedPage ? [selectedPage] : [nav[0]?.slug]));

  const toggle = (slug) => {
    setExpanded((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-reiki-card-border bg-reiki-section-alt/80 md:w-72 md:min-w-[18rem] lg:w-80">
      {/* Brand strip */}
      <div className="relative flex items-center justify-between border-b border-reiki-card-border bg-reiki-bg-stripe/90 px-4 py-4">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-reiki-olive/40 to-transparent" aria-hidden />
        <Link
          to="/"
          className="flex items-center gap-2 font-script text-xl font-semibold text-reiki-dark sm:text-2xl"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-reiki-olive/20 text-reiki-olive shadow-inner">
            <HiSparkles className="text-lg" />
          </span>
          Layla Admin
        </Link>
        <Link
          to="/"
          className="rounded-lg border border-reiki-card-border bg-white px-3 py-1.5 text-xs font-medium text-reiki-muted transition hover:border-reiki-olive hover:text-reiki-dark hover:bg-reiki-section"
        >
          View site
        </Link>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-reiki-card-border/60">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-reiki-holder-line" aria-hidden />
        <span className="h-1.5 w-1.5 rounded-full bg-reiki-olive/50" aria-hidden />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-reiki-holder-line" aria-hidden />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-reiki-muted">
          Content by page
        </p>
        <ul className="space-y-1">
          {nav.map((item) => {
            const Icon = ICONS[item.icon] || HiDocumentText;
            const isOpen = expanded.includes(item.slug);
            const isSelectedPage = selectedPage === item.slug;

            return (
              <li key={item.slug} className="rounded-xl">
                <button
                  type="button"
                  onClick={() => toggle(item.slug)}
                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                    isSelectedPage
                      ? "bg-reiki-olive/15 text-reiki-dark"
                      : "text-reiki-muted hover:bg-reiki-accent/30 hover:text-reiki-dark"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        isSelectedPage ? "bg-reiki-olive/30 text-reiki-olive" : "bg-reiki-section text-reiki-muted"
                      }`}
                    >
                      <Icon className="text-base" />
                    </span>
                    <span
                      className="font-medium"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {item.page}
                    </span>
                  </span>
                  {isOpen ? (
                    <HiChevronDown className="h-4 w-4 shrink-0 text-reiki-muted" />
                  ) : (
                    <HiChevronRight className="h-4 w-4 shrink-0 text-reiki-muted" />
                  )}
                </button>

                {isOpen && (
                  <ul className="mt-1 space-y-0.5 border-l-2 border-reiki-holder-line/50 ml-5 pl-2 py-1">
                    {item.sections.map((sec) => {
                      const isSelected =
                        selectedPage === item.slug && selectedSection === sec.key;
                      return (
                        <li key={sec.key}>
                          <button
                            type="button"
                            onClick={() => onSelect(item.slug, sec.key)}
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                              isSelected
                                ? "bg-reiki-olive/20 font-medium text-reiki-dark"
                                : "text-reiki-body hover:bg-reiki-accent/20 hover:text-reiki-dark"
                            }`}
                            style={{ fontFamily: "Lato, sans-serif" }}
                          >
                            {sec.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Manage data – list / CRUD for events, blog, services, gallery, membership */}
      {manageLinks.length > 0 && (
        <div className="border-t border-reiki-card-border px-2 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-reiki-muted">Manage data</p>
          <ul className="space-y-0.5">
            {manageLinks.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={onCloseSidebar}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${currentPath === to ? "bg-reiki-olive/20 font-medium text-reiki-dark" : "text-reiki-body hover:bg-reiki-accent/20 hover:text-reiki-dark"}`}
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer hint */}
      <div className="border-t border-reiki-card-border px-4 py-3">
        <p className="text-[10px] text-reiki-muted">
          Edit section content above; manage events, blog, services, gallery, and membership below.
        </p>
      </div>
    </aside>
  );
}
