import { useEffect } from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useContent, getFieldValue } from "../../hooks/useContent";
import { fetchSettings } from "../../store/slices/settingsSlice";
import { selectSettings } from "../../store/slices/settingsSlice";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Membership", href: "/membership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book a session", href: "/availability" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/laylanur.co?igsh=djc5dXV5aWp3emw2", label: "Instagram", Icon: FaInstagram },
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://youtube.com", label: "YouTube", Icon: FaYoutube },
  { href: "https://t.me", label: "Telegram", Icon: FaTelegram },
];

const DEFAULT_DISCLAIMER =
  "Disclaimer: The services, practices, and information shared on this website are for educational and informational purposes only. They are not intended to diagnose, treat, cure, or prevent any medical or psychological condition, nor are they a substitute for professional medical advice, diagnosis, or treatment. Please consult with a licensed healthcare professional for any medical concerns. I am not a licensed medical practitioner or Heilpraktiker in Germany.";

export default function Footer() {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const footerSettings = settings?.footer ?? {};
  const visionText = footerSettings.visionText ?? "I dream of a world where we all live together in harmony, where our hearts are so free that our whole being opens to a joyful, purposeful and accomplished path";
  const copyrightText = footerSettings.copyrightText ?? "© 2026 REIKI | All Rights Reserved";
  const siteName = footerSettings.siteName ?? "Layla";

  const { fields, loading } = useContent("global", "disclaimer");
  const disclaimerText = loading ? DEFAULT_DISCLAIMER : (getFieldValue(fields, "text") || DEFAULT_DISCLAIMER);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  return (
    <footer id="contact" className="bg-reiki-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 md:px-6 md:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand + description */}
          <div className="space-y-4 sm:space-y-5">
            <a href="/" className="font-script text-2xl font-semibold sm:text-3xl md:text-4xl">
              {siteName}
            </a>
            <p className="text-sm sm:text-base leading-relaxed text-white/90">
              {visionText}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white sm:text-base">
              Links
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-base text-white/90 hover:text-white sm:text-lg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white sm:text-base">
              Contact Us
            </h3>
            <address className="mt-5 space-y-2 text-base not-italic text-white/90 sm:text-lg">
              <p>Addition Street 2, 84</p>
              <p>
                <a href="mailto:E-mail@mail.com" className="hover:text-white">
                  E-mail@mail.com
                </a>
              </p>
              <p>
                <a href="tel:+123457890" className="hover:text-white">
                  +1 2345 7890
                </a>
              </p>
            </address>
            <div className="mt-5">
              <span className="block text-sm font-semibold uppercase tracking-wider text-white/95 sm:text-base mb-3">Follow</span>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white transition hover:border-white hover:bg-white/20"
                    aria-label={label}
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 px-4 py-5 text-center">
        <p className="text-xs sm:text-sm text-white/75 max-w-4xl mx-auto leading-relaxed">
          {disclaimerText}
        </p>
        <p className="mt-4 text-base text-white/80 sm:text-lg">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}
