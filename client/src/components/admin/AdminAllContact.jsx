/**
 * Admin "All Contact": edit every piece of content on ContactPage via sub-tabs.
 * Sub-tabs match page sections: Hero, Intro Quote, Ways to Connect, Send a Message, FAQ, Availability, Office Hours, Social.
 */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchContact, updateContact } from "../../store/slices/contactSlice";
import { selectContact, selectContactLoading } from "../../store/slices/contactSlice";
import { CONTACT_FALLBACK } from "../../utils/fallbacks";

const SUB_TABS = [
  { key: "hero", label: "Hero" },
  { key: "intro-quote", label: "Intro Quote" },
  { key: "ways-to-connect", label: "Ways to Connect" },
  { key: "send-message", label: "Send a Message" },
  { key: "faq", label: "FAQ" },
  { key: "availability", label: "Availability" },
  { key: "office-hours", label: "Office Hours" },
  { key: "social", label: "Social" },
];

const ICON_OPTIONS = [
  { value: "envelope", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "location", label: "Location" },
];

function toPayload(form) {
  return {
    heroImage: form.heroImage ?? undefined,
    heroScriptName: form.heroScriptName ?? undefined,
    heroTitle: form.heroTitle ?? undefined,
    heroSubtitle: form.heroSubtitle ?? undefined,
    introQuote: form.introQuote ?? undefined,
    waysToConnectTitle: form.waysToConnectTitle ?? undefined,
    waysToConnectSubtitle: form.waysToConnectSubtitle ?? undefined,
    contactMethods: form.contactMethods ?? [],
    sendMessageTitle: form.sendMessageTitle ?? undefined,
    sendMessageSubtitle: form.sendMessageSubtitle ?? undefined,
    interestOptions: form.interestOptions ?? [],
    faqSectionTitle: form.faqSectionTitle ?? undefined,
    faq: form.faq ?? [],
    availabilityTitle: form.availabilityTitle ?? undefined,
    availabilityBody: form.availabilityBody ?? undefined,
    availabilityFootnote: form.availabilityFootnote ?? undefined,
    officeHoursTitle: form.officeHoursTitle ?? undefined,
    officeHours: form.officeHours ?? [],
    socialText: form.socialText ?? undefined,
    socialLinks: form.socialLinks ?? [],
  };
}

function formFromContact(contact) {
  const c = contact ?? CONTACT_FALLBACK;
  return {
    heroImage: c.heroImage ?? "",
    heroScriptName: c.heroScriptName ?? "",
    heroTitle: c.heroTitle ?? "",
    heroSubtitle: c.heroSubtitle ?? "",
    introQuote: c.introQuote ?? "",
    waysToConnectTitle: c.waysToConnectTitle ?? "",
    waysToConnectSubtitle: c.waysToConnectSubtitle ?? "",
    contactMethods: Array.isArray(c.contactMethods) ? c.contactMethods : [],
    sendMessageTitle: c.sendMessageTitle ?? "",
    sendMessageSubtitle: c.sendMessageSubtitle ?? "",
    interestOptions: Array.isArray(c.interestOptions) ? c.interestOptions : [],
    faqSectionTitle: c.faqSectionTitle ?? "",
    faq: Array.isArray(c.faq) ? c.faq : [],
    availabilityTitle: c.availabilityTitle ?? "",
    availabilityBody: c.availabilityBody ?? "",
    availabilityFootnote: c.availabilityFootnote ?? "",
    officeHoursTitle: c.officeHoursTitle ?? "",
    officeHours: Array.isArray(c.officeHours) ? c.officeHours : [],
    socialText: c.socialText ?? "",
    socialLinks: Array.isArray(c.socialLinks) ? c.socialLinks : [],
  };
}

export default function AdminAllContact() {
  const dispatch = useDispatch();
  const data = useSelector(selectContact);
  const loading = useSelector(selectContactLoading);
  const contact = data ?? null;

  const [activeTab, setActiveTab] = useState("hero");
  const [form, setForm] = useState(() => formFromContact(CONTACT_FALLBACK));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  useEffect(() => {
    if (contact) setForm(formFromContact(contact));
  }, [contact]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updateContact(toPayload(form))).unwrap();
      toast.success("Contact page saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Failed to save contact page");
    } finally {
      setSaving(false);
    }
  };

  const interestOptionsText = (form.interestOptions || []).join("\n");
  const setInterestOptionsFromText = (raw) =>
    set(
      "interestOptions",
      raw.split("\n").map((s) => s.trim()).filter(Boolean)
    );

  const setContactMethod = (index, field, value) => {
    const next = [...(form.contactMethods || [])];
    if (!next[index]) next[index] = { title: "", description: "", value: "", href: "", iconKey: "envelope" };
    next[index] = { ...next[index], [field]: value };
    set("contactMethods", next);
  };
  const addContactMethod = () => set("contactMethods", [...(form.contactMethods || []), { title: "", description: "", value: "", href: "", iconKey: "envelope" }]);
  const removeContactMethod = (index) => set("contactMethods", (form.contactMethods || []).filter((_, i) => i !== index));

  const setFaqItem = (index, field, value) => {
    const next = [...(form.faq || [])];
    if (!next[index]) next[index] = { q: "", a: "" };
    next[index] = { ...next[index], [field]: value };
    set("faq", next);
  };
  const addFaqItem = () => set("faq", [...(form.faq || []), { q: "", a: "" }]);
  const removeFaqItem = (index) => set("faq", (form.faq || []).filter((_, i) => i !== index));

  const setOfficeHour = (index, field, value) => {
    const next = [...(form.officeHours || [])];
    if (!next[index]) next[index] = { day: "", time: "" };
    next[index] = { ...next[index], [field]: value };
    set("officeHours", next);
  };
  const addOfficeHour = () => set("officeHours", [...(form.officeHours || []), { day: "", time: "" }]);
  const removeOfficeHour = (index) => set("officeHours", (form.officeHours || []).filter((_, i) => i !== index));

  const socialLinks = form.socialLinks || [];
  const setSocialLink = (index, field, value) => {
    const next = [...socialLinks];
    if (!next[index]) next[index] = { platform: "", url: "" };
    next[index] = { ...next[index], [field]: value };
    set("socialLinks", next);
  };
  const addSocialLink = () => set("socialLinks", [...socialLinks, { platform: "", url: "" }]);
  const removeSocialLink = (index) => set("socialLinks", socialLinks.filter((_, i) => i !== index));

  if (loading && !contact) {
    return (
      <div className="flex h-full items-center justify-center bg-page-bg">
        <p className="text-reiki-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">Edit content</p>
        <h1 className="mt-1 text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond, serif" }}>
          Contact › All Contact
        </h1>
        <p className="mt-1 text-sm text-reiki-muted">
          Manage all content for the Contact page. Use the sub-tabs below to edit each section.
        </p>
      </header>

      <div className="shrink-0 border-b border-reiki-card-border bg-white px-4">
        <nav className="flex gap-1 overflow-x-auto py-2" aria-label="Contact sections">
          {SUB_TABS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition ${
                activeTab === key
                  ? "bg-reiki-olive text-white"
                  : "text-reiki-body hover:bg-reiki-accent/20 hover:text-reiki-dark"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
          {activeTab === "hero" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Hero</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Hero image URL</label>
                  <input type="text" value={form.heroImage} onChange={(e) => set("heroImage", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="/slide3.JPG" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Script name (e.g. Layla)</label>
                  <input type="text" value={form.heroScriptName} onChange={(e) => set("heroScriptName", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Title</label>
                  <input type="text" value={form.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Contact" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Subtitle</label>
                  <textarea value={form.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)} rows={2} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" />
                </div>
              </div>
            </section>
          )}

          {activeTab === "intro-quote" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Intro quote</h2>
              <label className="block text-sm font-medium text-reiki-dark mb-1">Quote text</label>
              <textarea value={form.introQuote} onChange={(e) => set("introQuote", e.target.value)} rows={4} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Reaching out takes courage..." />
            </section>
          )}

          {activeTab === "ways-to-connect" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Ways to connect</h2>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Section title</label>
                  <input type="text" value={form.waysToConnectTitle} onChange={(e) => set("waysToConnectTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Ways to connect" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Section subtitle</label>
                  <input type="text" value={form.waysToConnectSubtitle} onChange={(e) => set("waysToConnectSubtitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-reiki-dark">Contact methods</label>
                  <button type="button" onClick={addContactMethod} className="text-sm text-reiki-olive hover:underline">+ Add method</button>
                </div>
                <div className="space-y-4">
                  {(form.contactMethods || []).map((method, i) => (
                    <div key={i} className="rounded-xl border border-reiki-card-border bg-reiki-section/50 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-reiki-dark">Method {i + 1}</span>
                        <button type="button" onClick={() => removeContactMethod(i)} className="text-sm text-reiki-muted hover:text-red-600">Remove</button>
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Title</label>
                        <input type="text" value={method.title ?? ""} onChange={(e) => setContactMethod(i, "title", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" placeholder="Email" />
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Description</label>
                        <textarea value={method.description ?? ""} onChange={(e) => setContactMethod(i, "description", e.target.value)} rows={2} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Value (e.g. email or phone number)</label>
                        <input type="text" value={method.value ?? ""} onChange={(e) => setContactMethod(i, "value", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Link (optional – e.g. mailto: or tel:)</label>
                        <input type="text" value={method.href ?? ""} onChange={(e) => setContactMethod(i, "href", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" placeholder="mailto:hello@example.com" />
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Icon</label>
                        <select value={method.iconKey ?? "envelope"} onChange={(e) => setContactMethod(i, "iconKey", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm">
                          {ICON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "send-message" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Send a message</h2>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Section title</label>
                  <input type="text" value={form.sendMessageTitle} onChange={(e) => set("sendMessageTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Send a message" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Section subtitle</label>
                  <input type="text" value={form.sendMessageSubtitle} onChange={(e) => set("sendMessageSubtitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" />
                </div>
              </div>
              <label className="block text-sm font-medium text-reiki-dark mb-1">Interest options (one per line)</label>
              <textarea value={interestOptionsText} onChange={(e) => setInterestOptionsFromText(e.target.value)} rows={8} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Reiki & Energy Healing&#10;General inquiry" />
            </section>
          )}

          {activeTab === "faq" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Common questions (FAQ)</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-reiki-dark mb-1">Section title</label>
                <input type="text" value={form.faqSectionTitle} onChange={(e) => set("faqSectionTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Common questions" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-reiki-dark">Questions & answers</label>
                  <button type="button" onClick={addFaqItem} className="text-sm text-reiki-olive hover:underline">+ Add question</button>
                </div>
                <div className="space-y-4">
                  {(form.faq || []).map((item, i) => (
                    <div key={i} className="rounded-xl border border-reiki-card-border bg-reiki-section/50 p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-reiki-dark">Question {i + 1}</span>
                        <button type="button" onClick={() => removeFaqItem(i)} className="text-sm text-reiki-muted hover:text-red-600">Remove</button>
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Question</label>
                        <input type="text" value={item.q ?? ""} onChange={(e) => setFaqItem(i, "q", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-reiki-muted mb-0.5">Answer</label>
                        <textarea value={item.a ?? ""} onChange={(e) => setFaqItem(i, "a", e.target.value)} rows={3} className="w-full rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "availability" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Availability</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Section title</label>
                  <input type="text" value={form.availabilityTitle} onChange={(e) => set("availabilityTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Availability" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Body text</label>
                  <textarea value={form.availabilityBody} onChange={(e) => set("availabilityBody", e.target.value)} rows={2} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-reiki-dark mb-1">Footnote (italic below calendar)</label>
                  <input type="text" value={form.availabilityFootnote} onChange={(e) => set("availabilityFootnote", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="All times are flexible by prior arrangement." />
                </div>
              </div>
            </section>
          )}

          {activeTab === "office-hours" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Office hours</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-reiki-dark mb-1">Section title</label>
                <input type="text" value={form.officeHoursTitle} onChange={(e) => set("officeHoursTitle", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Office hours" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-reiki-dark">Opening hours</label>
                  <button type="button" onClick={addOfficeHour} className="text-sm text-reiki-olive hover:underline">+ Add row</button>
                </div>
                <div className="space-y-2">
                  {(form.officeHours || []).map((oh, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input type="text" value={oh.day ?? ""} onChange={(e) => setOfficeHour(i, "day", e.target.value)} placeholder="e.g. Monday – Friday" className="flex-1 rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      <input type="text" value={oh.time ?? ""} onChange={(e) => setOfficeHour(i, "time", e.target.value)} placeholder="e.g. 9:00 – 18:00" className="w-36 rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                      <button type="button" onClick={() => removeOfficeHour(i)} className="text-sm text-reiki-muted hover:text-red-600">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === "social" && (
            <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-reiki-dark mb-4">Social / Follow</h2>
              <div className="space-y-3 mb-4">
                <label className="block text-sm font-medium text-reiki-dark mb-1">Intro text</label>
                <input type="text" value={form.socialText} onChange={(e) => set("socialText", e.target.value)} className="w-full rounded-lg border border-reiki-card-border px-3 py-2 text-sm" placeholder="Follow along for inspiration and updates." />
              </div>
              <label className="block text-sm font-medium text-reiki-dark mb-1">Social links</label>
              <p className="text-xs text-reiki-muted mb-2">Platform: instagram, facebook, x, youtube (for icon). URL: full link.</p>
              <div className="space-y-2">
                {socialLinks.map((link, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="text" value={link.platform || ""} onChange={(e) => setSocialLink(i, "platform", e.target.value)} placeholder="instagram" className="w-28 rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                    <input type="url" value={link.url || ""} onChange={(e) => setSocialLink(i, "url", e.target.value)} placeholder="https://..." className="flex-1 rounded-lg border border-reiki-card-border px-2 py-1.5 text-sm" />
                    <button type="button" onClick={() => removeSocialLink(i)} className="text-reiki-muted hover:text-red-600 text-sm">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addSocialLink} className="text-sm text-reiki-olive hover:underline">+ Add link</button>
              </div>
            </section>
          )}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="rounded-xl bg-reiki-olive px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
              {saving ? "Saving…" : "Save all contact content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
