import { useState, useEffect, useCallback } from "react";
import { HiCloudArrowUp } from "react-icons/hi2";
import toast from "react-hot-toast";
import { getAbout, putAbout } from "../../api";
import { ABOUT_FALLBACK } from "../../utils/fallbacks";

function ensureArray(arr, minLength) {
  const a = Array.isArray(arr) ? [...arr] : [];
  while (a.length < minLength) a.push("");
  return a;
}

function ensureValues(arr, minLength) {
  const a = Array.isArray(arr) ? arr.map((v) => ({ title: v?.title ?? "", text: v?.text ?? "" })) : [];
  while (a.length < minLength) a.push({ title: "", text: "" });
  return a;
}

function ensureJourney(arr, minLength) {
  const a = Array.isArray(arr) ? arr.map((j) => ({ year: j?.year ?? "", title: j?.title ?? "", text: j?.text ?? "" })) : [];
  while (a.length < minLength) a.push({ year: "", title: "", text: "" });
  return a;
}

export default function AdminAboutPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const load = useCallback(async () => {
    setLoadError(null);
    setLoading(true);
    try {
      const doc = await getAbout();
      setData({
        name: doc.name ?? "",
        tagline: doc.tagline ?? "",
        introTitle: doc.introTitle ?? "",
        introParagraphs: ensureArray(doc.introParagraphs, 3),
        introCtaText: doc.introCtaText ?? "",
        mission: {
          title: doc.mission?.title ?? "",
          quote: doc.mission?.quote ?? "",
          body: doc.mission?.body ?? "",
        },
        approach: { title: doc.approach?.title ?? "", body: doc.approach?.body ?? "" },
        awaken: {
          title: doc.awaken?.title ?? "",
          paragraphs: ensureArray(doc.awaken?.paragraphs, 2),
          closing: doc.awaken?.closing ?? "",
        },
        vision: doc.vision ?? "",
        trainings: ensureArray(doc.trainings, 4),
        trainingIntro: doc.trainingIntro ?? "",
        trainingSectionTitle: doc.trainingSectionTitle ?? "",
        values: ensureValues(doc.values, 4),
        testimonial: {
          quote: doc.testimonial?.quote ?? "",
          attribution: doc.testimonial?.attribution ?? "",
        },
        testimonialSectionTitle: doc.testimonialSectionTitle ?? "",
        journey: ensureJourney(doc.journey, 3),
        journeySectionTitle: doc.journeySectionTitle ?? "",
        ctaQuote: doc.ctaQuote ?? "",
        ctaBody: doc.ctaBody ?? "",
        ctaButtonLabel: doc.ctaButtonLabel ?? "",
      });
    } catch (err) {
      const msg = err?.message ?? "Failed to load";
      setLoadError(msg);
      toast.error(msg);
      setData({
        name: ABOUT_FALLBACK.name ?? "",
        tagline: ABOUT_FALLBACK.tagline ?? "",
        introTitle: ABOUT_FALLBACK.introTitle ?? "",
        introParagraphs: ensureArray(ABOUT_FALLBACK.introParagraphs, 3),
        introCtaText: ABOUT_FALLBACK.introCtaText ?? "",
        mission: {
          title: ABOUT_FALLBACK.mission?.title ?? "",
          quote: ABOUT_FALLBACK.mission?.quote ?? "",
          body: ABOUT_FALLBACK.mission?.body ?? "",
        },
        approach: { title: ABOUT_FALLBACK.approach?.title ?? "", body: ABOUT_FALLBACK.approach?.body ?? "" },
        awaken: {
          title: ABOUT_FALLBACK.awaken?.title ?? "",
          paragraphs: ensureArray(ABOUT_FALLBACK.awaken?.paragraphs, 2),
          closing: ABOUT_FALLBACK.awaken?.closing ?? "",
        },
        vision: ABOUT_FALLBACK.vision ?? "",
        trainings: ensureArray(ABOUT_FALLBACK.trainings, 4),
        trainingIntro: ABOUT_FALLBACK.trainingIntro ?? "",
        trainingSectionTitle: ABOUT_FALLBACK.trainingSectionTitle ?? "",
        values: ensureValues(ABOUT_FALLBACK.values, 4),
        testimonial: {
          quote: ABOUT_FALLBACK.testimonial?.quote ?? "",
          attribution: ABOUT_FALLBACK.testimonial?.attribution ?? "",
        },
        testimonialSectionTitle: ABOUT_FALLBACK.testimonialSectionTitle ?? "",
        journey: ensureJourney(ABOUT_FALLBACK.journey, 3),
        journeySectionTitle: ABOUT_FALLBACK.journeySectionTitle ?? "",
        ctaQuote: ABOUT_FALLBACK.ctaQuote ?? "",
        ctaBody: ABOUT_FALLBACK.ctaBody ?? "",
        ctaButtonLabel: ABOUT_FALLBACK.ctaButtonLabel ?? "",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (path, value) => {
    setData((prev) => {
      const next = { ...prev };
      if (path === "mission" || path === "approach" || path === "testimonial") {
        next[path] = { ...next[path], ...value };
      } else if (path.startsWith("introParagraphs.")) {
        const i = Number(path.split(".")[1]);
        const arr = [...(next.introParagraphs || [])];
        arr[i] = value;
        next.introParagraphs = arr;
      } else if (path.startsWith("awaken.paragraphs.")) {
        const i = Number(path.split(".")[2]);
        const arr = [...(next.awaken?.paragraphs || [])];
        arr[i] = value;
        next.awaken = { ...next.awaken, paragraphs: arr };
      } else if (path.startsWith("trainings.")) {
        const i = Number(path.split(".")[1]);
        const arr = [...(next.trainings || [])];
        arr[i] = value;
        next.trainings = arr;
      } else if (path.startsWith("values.")) {
        const [_, i, key] = path.split(".");
        const arr = [...(next.values || [])];
        arr[Number(i)] = { ...arr[Number(i)], [key]: value };
        next.values = arr;
      } else if (path.startsWith("journey.")) {
        const [_, i, key] = path.split(".");
        const arr = [...(next.journey || [])];
        arr[Number(i)] = { ...arr[Number(i)], [key]: value };
        next.journey = arr;
      } else {
        next[path] = value;
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!data) return;
    setSaveStatus(null);
    setSaving(true);
    try {
      const body = {
        name: data.name,
        tagline: data.tagline,
        introTitle: data.introTitle,
        introParagraphs: data.introParagraphs.filter(Boolean),
        introCtaText: data.introCtaText,
        mission: data.mission,
        approach: data.approach,
        awaken: {
          title: data.awaken?.title,
          paragraphs: (data.awaken?.paragraphs || []).filter(Boolean),
          closing: data.awaken?.closing,
        },
        vision: data.vision,
        trainings: (data.trainings || []).filter(Boolean),
        trainingIntro: data.trainingIntro,
        trainingSectionTitle: data.trainingSectionTitle,
        values: (data.values || []).filter((v) => v.title || v.text).map((v) => ({ title: v.title, text: v.text })),
        testimonial: data.testimonial,
        testimonialSectionTitle: data.testimonialSectionTitle,
        journey: (data.journey || []).filter((j) => j.year || j.title || j.text),
        journeySectionTitle: data.journeySectionTitle,
        ctaQuote: data.ctaQuote,
        ctaBody: data.ctaBody,
        ctaButtonLabel: data.ctaButtonLabel,
      };
      await putAbout(body);
      setSaveStatus("success");
      toast.success("About page saved successfully");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus("error");
      toast.error(err?.message || "Failed to save About page");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-reiki-card-border bg-white px-4 py-3 text-reiki-body placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-reiki-dark";

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-reiki-olive border-t-transparent" />
        <p className="mt-4 text-sm text-reiki-muted">Loading About content…</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">Edit content</p>
        <h1 className="mt-1 text-2xl text-reiki-dark sm:text-3xl" style={{ fontFamily: "EB Garamond, serif" }}>
          About page
        </h1>
        <p className="mt-1 text-sm text-reiki-muted">Single document for the About page. Changes appear on the live site.</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-reiki-olive px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
          >
            <HiCloudArrowUp className="text-lg" />
            {saving ? "Saving…" : "Save all"}
          </button>
          {saveStatus === "success" && <span className="text-sm font-medium text-green-600">Saved.</span>}
          {saveStatus === "error" && <span className="text-sm font-medium text-red-600">Save failed.</span>}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {loadError && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Could not load from API: {loadError}. Showing defaults. Save to update backend.
          </div>
        )}

        <div className="mx-auto max-w-3xl space-y-10">
          {/* Hero */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Hero</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={data.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input type="text" value={data.tagline} onChange={(e) => update("tagline", e.target.value)} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Intro */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Intro (Hi I'm Layla)</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Intro title</label>
                <input type="text" value={data.introTitle} onChange={(e) => update("introTitle", e.target.value)} className={inputClass} />
              </div>
              {(data.introParagraphs || []).map((p, i) => (
                <div key={i}>
                  <label className={labelClass}>Intro paragraph {i + 1}</label>
                  <textarea rows={3} value={p} onChange={(e) => update(`introParagraphs.${i}`, e.target.value)} className={inputClass} />
                </div>
              ))}
              <div>
                <label className={labelClass}>Intro CTA button text</label>
                <input type="text" value={data.introCtaText} onChange={(e) => update("introCtaText", e.target.value)} className={inputClass} placeholder="Explore my services" />
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Mission</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" value={data.mission?.title} onChange={(e) => update("mission", { ...data.mission, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Quote</label>
                <textarea rows={2} value={data.mission?.quote} onChange={(e) => update("mission", { ...data.mission, quote: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Body</label>
                <textarea rows={4} value={data.mission?.body} onChange={(e) => update("mission", { ...data.mission, body: e.target.value })} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Approach */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Approach & values (intro)</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" value={data.approach?.title} onChange={(e) => update("approach", { ...data.approach, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Body</label>
                <textarea rows={4} value={data.approach?.body} onChange={(e) => update("approach", { ...data.approach, body: e.target.value })} className={inputClass} />
              </div>
            </div>
            <h3 className="mt-6 mb-3 text-sm font-semibold text-reiki-dark">Values (4 cards)</h3>
            <div className="space-y-4">
              {(data.values || []).map((v, i) => (
                <div key={i} className="rounded-xl border border-reiki-card-border bg-reiki-bg-stripe/50 p-4">
                  <input type="text" value={v.title} onChange={(e) => update(`values.${i}.title`, e.target.value)} className={inputClass} placeholder="Value title" />
                  <textarea rows={2} value={v.text} onChange={(e) => update(`values.${i}.text`, e.target.value)} className={`mt-2 ${inputClass}`} placeholder="Value text" />
                </div>
              ))}
            </div>
          </section>

          {/* Awaken */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Awakens</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Title</label>
                <input type="text" value={data.awaken?.title} onChange={(e) => update("awaken", { ...data.awaken, title: e.target.value })} className={inputClass} />
              </div>
              {(data.awaken?.paragraphs || []).map((p, i) => (
                <div key={i}>
                  <label className={labelClass}>Paragraph {i + 1}</label>
                  <textarea rows={3} value={p} onChange={(e) => update(`awaken.paragraphs.${i}`, e.target.value)} className={inputClass} />
                </div>
              ))}
              <div>
                <label className={labelClass}>Closing (bold line)</label>
                <input type="text" value={data.awaken?.closing} onChange={(e) => update("awaken", { ...data.awaken, closing: e.target.value })} className={inputClass} />
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Vision</h2>
            <textarea rows={3} value={data.vision} onChange={(e) => update("vision", e.target.value)} className={inputClass} />
          </section>

          {/* Training */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Training & practice</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Section title</label>
                <input type="text" value={data.trainingSectionTitle} onChange={(e) => update("trainingSectionTitle", e.target.value)} className={inputClass} placeholder="Training & practice" />
              </div>
              <div>
                <label className={labelClass}>Intro paragraph</label>
                <textarea rows={2} value={data.trainingIntro} onChange={(e) => update("trainingIntro", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Training items (one per line)</label>
                <textarea
                  rows={5}
                  value={(data.trainings || []).join("\n")}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      trainings: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                  className={inputClass}
                  placeholder="Shamanic energy medicine&#10;Vitality Qigong&#10;..."
                />
              </div>
            </div>
          </section>

          {/* Journey */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Journey</h2>
            <div className="space-y-2">
              <label className={labelClass}>Section title</label>
              <input type="text" value={data.journeySectionTitle} onChange={(e) => update("journeySectionTitle", e.target.value)} className={inputClass} placeholder="My path" />
            </div>
            <div className="mt-4 space-y-4">
              {(data.journey || []).map((j, i) => (
                <div key={i} className="rounded-xl border border-reiki-card-border bg-reiki-bg-stripe/50 p-4">
                  <input type="text" value={j.year} onChange={(e) => update(`journey.${i}.year`, e.target.value)} className={inputClass} placeholder="Year / phase" />
                  <input type="text" value={j.title} onChange={(e) => update(`journey.${i}.title`, e.target.value)} className={`mt-2 ${inputClass}`} placeholder="Title" />
                  <textarea rows={2} value={j.text} onChange={(e) => update(`journey.${i}.text`, e.target.value)} className={`mt-2 ${inputClass}`} placeholder="Text" />
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Testimonial</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Section title</label>
                <input type="text" value={data.testimonialSectionTitle} onChange={(e) => update("testimonialSectionTitle", e.target.value)} className={inputClass} placeholder="What people are saying" />
              </div>
              <div>
                <label className={labelClass}>Quote</label>
                <textarea rows={5} value={data.testimonial?.quote} onChange={(e) => update("testimonial", { ...data.testimonial, quote: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Attribution</label>
                <input type="text" value={data.testimonial?.attribution} onChange={(e) => update("testimonial", { ...data.testimonial, attribution: e.target.value })} className={inputClass} />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-reiki-dark">Final CTA</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Quote</label>
                <input type="text" value={data.ctaQuote} onChange={(e) => update("ctaQuote", e.target.value)} className={inputClass} placeholder="Create the life you want to live." />
              </div>
              <div>
                <label className={labelClass}>Body</label>
                <input type="text" value={data.ctaBody} onChange={(e) => update("ctaBody", e.target.value)} className={inputClass} placeholder="Ready to take the first step?..." />
              </div>
              <div>
                <label className={labelClass}>Button label</label>
                <input type="text" value={data.ctaButtonLabel} onChange={(e) => update("ctaButtonLabel", e.target.value)} className={inputClass} placeholder="Get in touch" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
