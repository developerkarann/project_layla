import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import LotusSectionIcon from "../components/LotusSectionIcon";
import { fetchContact } from "../store/slices/contactSlice";
import { selectContact, selectContactLoading, selectContactError } from "../store/slices/contactSlice";
import { CONTACT_FALLBACK } from "../utils/fallbacks";

const CONTACT_ICONS = {
  envelope: FaEnvelope,
  phone: FaPhone,
  location: FaMapMarkerAlt,
};

export default function ContactPage() {
  const dispatch = useDispatch();
  const apiData = useSelector(selectContact);
  const loading = useSelector(selectContactLoading);
  const error = useSelector(selectContactError);
  const contact = apiData ?? CONTACT_FALLBACK;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
    setEmail("");
    setSubject("");
    setInterest("");
    setMessage("");
  }

  const contactMethods = contact.contactMethods ?? [];
  const interestOptions = contact.interestOptions ?? [];
  const faqItems = contact.faq ?? [];
  const officeHours = contact.officeHours ?? [];
  const heroImage = contact.heroImage ?? "/slide3.JPG";
  const heroScriptName = contact.heroScriptName ?? "Layla";
  const heroTitle = contact.heroTitle ?? "Contact";
  const heroSubtitle = contact.heroSubtitle ?? "Every conversation starts with a single step. I'm here when you're ready.";
  const introQuote = contact.introQuote ?? "\"Reaching out takes courage. Whether you're curious about a first session, have a question, or simply want to say hello—this is a safe space.\"";
  const waysTitle = contact.waysToConnectTitle ?? "Ways to connect";
  const waysSubtitle = contact.waysToConnectSubtitle ?? "Choose what feels right for you—email, phone, or the form below.";
  const sendMsgTitle = contact.sendMessageTitle ?? "Send a message";
  const sendMsgSubtitle = contact.sendMessageSubtitle ?? "Fill in the form below and I'll get back to you as soon as I can.";
  const faqTitle = contact.faqSectionTitle ?? "Common questions";
  const availabilityTitle = contact.availabilityTitle ?? "Availability";
  const availabilityBody = contact.availabilityBody ?? "Book a session at a time that suits you. Choose a date and slot in the calendar below.";
  const availabilityFootnote = contact.availabilityFootnote ?? "All times are flexible by prior arrangement.";
  const officeHoursTitle = contact.officeHoursTitle ?? "Office hours";
  const socialText = contact.socialText ?? "Follow along for inspiration and updates.";
  const socialLinks = contact.socialLinks ?? [];

  /** Split section title so last word can be highlighted (e.g. "Ways to connect" → ["Ways to ", "connect"]). */
  function titleParts(str) {
    if (!str || !str.trim()) return ["", ""];
    const lastSpace = str.trim().lastIndexOf(" ");
    if (lastSpace <= 0) return ["", str.trim()];
    return [str.substring(0, lastSpace + 1), str.substring(lastSpace + 1)];
  }

  const socialIconMap = { instagram: FaInstagram, facebook: FaFacebookF, x: FaXTwitter, youtube: FaYoutube };

  return (
    <main className="min-h-screen bg-page-bg">
      {error && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800 text-center">
          Could not load contact info. Showing default.
        </div>
      )}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] flex items-end justify-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_28%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-reiki-dark/20 via-reiki-dark/45 to-reiki-dark/78" aria-hidden />
        <div className="relative z-10 w-full max-w-7xl px-4 pb-16 pt-24 sm:pb-20 md:pb-24 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="font-script text-2xl text-white/90 sm:text-3xl" style={{ fontFamily: "Dancing Script" }}>{heroScriptName}</span>
            <span className="mt-1 block h-px w-12 bg-white/60" aria-hidden />
          </div>
          <h1 className="mt-4 font-garamond text-4xl font-normal text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ fontFamily: "EB Garamond" }}>
            {heroTitle}
          </h1>
          <p className="mt-4 font-lato text-base text-white/90 sm:text-lg md:text-xl max-w-xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-serif text-lg italic text-reiki-quote sm:text-xl md:text-2xl leading-relaxed" style={{ fontFamily: "Lora" }}>
            {introQuote}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16 lg:py-20">
        <LotusSectionIcon />
        <div className="mx-auto max-w-7xl">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {(() => { const [a, b] = titleParts(waysTitle); return <>{a}{b ? <span className="text-reiki-olive">{b}</span> : null}</>; })()}
          </h2>
          <p className="mt-3 font-lato text-center text-reiki-body max-w-2xl mx-auto">
            {waysSubtitle}
          </p>
          {loading ? (
            <p className="mt-8 font-lato text-reiki-body text-center">Loading…</p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
              {contactMethods.map((method) => {
                const Icon = CONTACT_ICONS[method.iconKey];
                return (
                  <div key={method.title} className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 sm:p-8 shadow-sm transition-shadow hover:shadow-md">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-reiki-accent text-xl text-reiki-dark" aria-hidden>
                      {Icon ? <Icon className="text-xl" /> : null}
                    </span>
                    <h3 className="mt-4 font-garamond text-xl text-reiki-dark" style={{ fontFamily: "EB Garamond" }}>{method.title}</h3>
                    <p className="mt-2 font-lato text-sm text-reiki-body">{method.description}</p>
                    {method.href ? (
                      <a href={method.href} className="mt-4 inline-block font-lato text-sm font-semibold text-reiki-dark hover:text-reiki-olive transition-colors">{method.value}</a>
                    ) : (
                      <p className="mt-4 font-lato text-sm font-medium text-reiki-dark">{method.value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section id="contact-message" className="bg-reiki-bg-stripe px-4 py-12 md:py-16 lg:py-20 scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl md:text-4xl" style={{ fontFamily: "EB Garamond" }}>
            {(() => { const [a, b] = titleParts(sendMsgTitle); return <>{a}{b ? <span className="text-reiki-olive">{b}</span> : null}</>; })()}
          </h2>
          <p className="mt-3 font-lato text-center text-reiki-body">{sendMsgSubtitle}</p>
          <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border border-reiki-card-border bg-reiki-section p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="block font-lato text-sm font-medium text-reiki-dark">Name *</label>
                <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-reiki-card-border bg-white px-4 py-3 font-lato text-reiki-text placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-1 focus:ring-reiki-olive" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-lato text-sm font-medium text-reiki-dark">Email *</label>
                <input id="contact-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-reiki-card-border bg-white px-4 py-3 font-lato text-reiki-text placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-1 focus:ring-reiki-olive" placeholder="your@email.com" />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="contact-subject" className="block font-lato text-sm font-medium text-reiki-dark">Subject</label>
              <input id="contact-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-lg border border-reiki-card-border bg-white px-4 py-3 font-lato text-reiki-text placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-1 focus:ring-reiki-olive" placeholder="What is this regarding?" />
            </div>
            <div className="mt-6">
              <label htmlFor="contact-interest" className="block font-lato text-sm font-medium text-reiki-dark">I'm interested in</label>
              <select id="contact-interest" value={interest} onChange={(e) => setInterest(e.target.value)} className="mt-2 w-full rounded-lg border border-reiki-card-border bg-white px-4 py-3 font-lato text-reiki-text focus:border-reiki-olive focus:outline-none focus:ring-1 focus:ring-reiki-olive">
                <option value="">Select an option</option>
                {interestOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <label htmlFor="contact-msg" className="block font-lato text-sm font-medium text-reiki-dark">Message *</label>
              <textarea id="contact-msg" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-lg border border-reiki-card-border bg-white px-4 py-3 font-lato text-reiki-text placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-1 focus:ring-reiki-olive resize-y" placeholder="Tell me a little about what brings you here…" />
            </div>
            <div className="mt-8">
              <button type="submit" className="w-full rounded-lg bg-reiki-dark px-6 py-4 font-sans text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-10">Send message</button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-reiki-bg-stripe border-y border-reiki-accent/40 px-4 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-garamond text-center text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond" }}>
            {(() => { const [a, b] = titleParts(faqTitle); return <>{a}{b ? <span className="text-reiki-olive">{b}</span> : null}</>; })()}
          </h2>
          <div className="mt-10 space-y-3">
            {faqItems.map((item, i) => (
              <div key={i} className="rounded-xl border border-reiki-card-border bg-reiki-section overflow-hidden">
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left font-lato text-reiki-dark hover:bg-reiki-accent/20 transition-colors">
                  <span className="font-medium pr-4">{item.q}</span>
                  <span className="shrink-0 text-reiki-olive">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="border-t border-reiki-card-border px-5 py-4">
                    <p className="font-lato text-sm text-reiki-body leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-reiki-card-border bg-reiki-section p-6 sm:p-8 flex flex-col">
            <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>
              <span className="text-reiki-olive">{availabilityTitle}</span>
            </h2>
            <p className="mt-3 font-lato text-sm text-reiki-body">{availabilityBody}</p>
            <div className="mt-6 flex-1 rounded-xl border border-reiki-card-border bg-white p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="font-lato text-sm font-semibold text-reiki-dark">Calendar</span>
                <span className="font-lato text-xs text-reiki-muted">Demo</span>
              </div>
              <Link to="/availability" className="mt-4 flex w-full items-center justify-center rounded-lg bg-reiki-dark px-4 py-2.5 font-lato text-sm font-semibold text-white transition hover:opacity-90">Choose a slot</Link>
            </div>
            <p className="mt-4 font-lato text-xs text-reiki-muted italic">{availabilityFootnote}</p>
          </div>
        </div>
      </section>

      {officeHours.length > 0 && (
        <section className="bg-reiki-bg-stripe border-t border-reiki-card-border px-4 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-garamond text-xl text-reiki-dark sm:text-2xl" style={{ fontFamily: "EB Garamond" }}>{officeHoursTitle}</h2>
            <ul className="mt-4 space-y-2">
              {officeHours.map((oh, i) => (
                <li key={i} className="flex justify-between font-lato text-reiki-body">
                  <span>{oh.day}</span>
                  <span>{oh.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white px-4 py-12 border-t border-reiki-card-border">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-lato text-reiki-body">{socialText}</p>
          <div className="mt-4 flex justify-center gap-4">
            {socialLinks.map((link) => {
              const Icon = socialIconMap[link.platform];
              const label = link.platform ? link.platform.charAt(0).toUpperCase() + link.platform.slice(1) : "Link";
              if (!link.url) return null;
              return (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-reiki-dark hover:text-reiki-olive transition" aria-label={label}>
                  {Icon ? <Icon className="text-xl" /> : null}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
