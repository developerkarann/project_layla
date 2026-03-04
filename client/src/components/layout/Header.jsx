import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../store/slices/settingsSlice";
import { selectSettings } from "../../store/slices/settingsSlice";

const NAV_LINKS = [
  { label: "HOME", to: "/" },
  { label: "ABOUT", to: "/about" },
  { label: "SERVICES", to: "/services" },
  { label: "EVENTS", to: "/events" },
  { label: "MEMBERSHIP", to: "/membership" },
  { label: "BLOG", to: "/blog" },
  { label: "GALLERY", to: "/gallery" },
  { label: "CONTACT", to: "/contact" },
];

export default function Header() {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const header = settings?.header ?? {};
  const siteName = header.siteName ?? "Layla";
  const phone = header.phone ?? "+1 234 567 8900";
  const ctaLabel = header.ctaLabel ?? "Get in touch";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    if (to === "/about") return pathname === "/about";
    if (to === "/gallery") return pathname === "/gallery";
    if (to === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    if (to === "/contact") return pathname === "/contact";
    if (to === "/services") return pathname === "/services";
    if (to === "/events") return pathname === "/events";
    if (to === "/membership") return pathname === "/membership";
    return false;
  };

  return (
    <header className="top-0 z-50 w-full border-b border-l border-reiki-accent/60 bg-reiki-bg-stripe">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-4" />

        <Link
          to="/"
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center font-script text-xl font-semibold text-reiki-dark sm:text-3xl md:text-4xl"
        >
          {siteName}
          <span className="mt-0.5 block h-px w-8 bg-reiki-dark/40" aria-hidden />
        </Link>

        <div className="flex items-center gap-3">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="hidden text-sm text-reiki-dark sm:block">
            {phone}
          </a>
          <Link
            to="/contact"
            className="hidden rounded bg-reiki-dark px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 sm:block"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-reiki-dark" />
            <span className="block h-0.5 w-5 bg-reiki-dark" />
            <span className="block h-0.5 w-5 bg-reiki-dark" />
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-reiki-accent/40 md:block">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`text-sm font-medium uppercase tracking-wide text-reiki-muted hover:text-reiki-dark ${isActive(to) ? "border-b border-reiki-dark font-semibold text-reiki-dark" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-reiki-accent/40 bg-reiki-bg-stripe px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 text-sm font-medium uppercase text-reiki-dark ${isActive(to) ? "font-semibold" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
