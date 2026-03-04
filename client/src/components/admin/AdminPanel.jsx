import { useState, useEffect, useCallback } from "react";
import { HiPencil, HiPhoto, HiDocumentText, HiArrowPath, HiCloudArrowUp } from "react-icons/hi2";
import { getSectionContent } from "../../data/adminSectionContent";
import { getSection, putSection } from "../../api/content";
import AdminAllBlogs from "./AdminAllBlogs";
import AdminEvents from "../../pages/admin/AdminEvents";
import AdminAllMembership from "./AdminAllMembership";
import AdminAllContact from "./AdminAllContact";

function mergeWithDefaults(apiSection, prototype) {
  const fields = (apiSection?.fields?.length ? apiSection.fields : prototype?.fields ?? []).map((f) => ({
    id: f.id,
    label: f.label ?? f.id,
    type: f.type ?? "text",
    value: typeof f.value === "string" ? f.value : "",
  }));
  const images = (apiSection?.images?.length ? apiSection.images : prototype?.images ?? []).map((img) => ({
    id: img.id,
    url: img.url ?? "",
    alt: img.alt ?? "",
  }));
  return { fields, images };
}

export default function AdminPanel({ page, pageSlug, section, sectionLabel }) {
  const breadcrumb = [page, sectionLabel].filter(Boolean).join(" › ");

  const [fields, setFields] = useState([]);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState({});
  const [imagePreviewUrls, setImagePreviewUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "success" | "error" | null

  useEffect(() => {
    const next = {};
    Object.entries(imageFiles).forEach(([id, file]) => {
      next[id] = URL.createObjectURL(file);
    });
    setImagePreviewUrls((prev) => {
      Object.values(prev).forEach((url) => URL.revokeObjectURL(url));
      return next;
    });
    return () => Object.values(next).forEach((url) => URL.revokeObjectURL(url));
  }, [imageFiles]);

  const isVirtualSection =
    (pageSlug === "blog" && section === "all-blogs") ||
    (pageSlug === "events" && section === "all-events") ||
    (pageSlug === "membership" && section === "all-membership") ||
    (pageSlug === "contact" && section === "all-contact");

  const loadSection = useCallback(async () => {
    if (!pageSlug || !section) return;
    if (isVirtualSection) {
      setFields([]);
      setImages([]);
      setLoading(false);
      setLoadError(null);
      return;
    }
    const prototype = getSectionContent(pageSlug, section);
    setLoadError(null);
    setLoading(true);
    try {
      const apiSection = await getSection(pageSlug, section);
      const { fields: f, images: imgs } = mergeWithDefaults(apiSection, prototype);
      setFields(f);
      setImages(imgs);
      setImageFiles({});
    } catch (err) {
      setLoadError(err.message || "Failed to load section");
      const { fields: f, images: imgs } = mergeWithDefaults(null, prototype);
      setFields(f);
      setImages(imgs);
    } finally {
      setLoading(false);
    }
  }, [pageSlug, section, isVirtualSection]);

  useEffect(() => {
    loadSection();
  }, [loadSection]);

  const handleFieldChange = (id, value) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  };

  const handleImageChange = (imageId, key, value) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, [key]: value } : img))
    );
  };

  const handleImageFileChange = (imageId, file) => {
    if (!file) return;
    setImageFiles((prev) => ({ ...prev, [imageId]: file }));
  };

  const clearImageUpdate = (imageId) => {
    setImageFiles((prev) => {
      const next = { ...prev };
      delete next[imageId];
      return next;
    });
  };

  const handleSave = async () => {
    if (!pageSlug || !section) return;
    setSaveStatus(null);
    setSaving(true);
    try {
      await putSection(pageSlug, section, {
        fields: fields.map(({ id, label, type, value }) => ({ id, label, type, value })),
        images: images.map(({ id, url, alt }) => ({ id, url, alt })),
      });
      setSaveStatus("success");
      setImageFiles({});
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (isVirtualSection) {
    if (pageSlug === "blog" && section === "all-blogs") return <AdminAllBlogs />;
    if (pageSlug === "events" && section === "all-events") return <AdminEvents />;
    if (pageSlug === "membership" && section === "all-membership") return <AdminAllMembership />;
    if (pageSlug === "contact" && section === "all-contact") return <AdminAllContact />;
  }

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">
          Edit content
        </p>
        <h1
          className="mt-1 text-2xl text-reiki-dark sm:text-3xl"
          style={{ fontFamily: "EB Garamond, serif" }}
        >
          {sectionLabel || "Select a section"}
        </h1>
        {breadcrumb && (
          <p className="mt-1 text-sm text-reiki-muted" style={{ fontFamily: "Lato, sans-serif" }}>
            {breadcrumb}
          </p>
        )}
        {section && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="inline-flex items-center gap-2 rounded-xl bg-reiki-olive px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              <HiCloudArrowUp className="text-lg" />
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saveStatus === "success" && (
              <span className="text-sm font-medium text-green-600">Saved.</span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm font-medium text-red-600">Save failed. Check console.</span>
            )}
          </div>
        )}
      </header>

      <div className="flex-1 overflow-y-auto bg-reiki-bg-stripe/30 p-6">
        {!section ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-reiki-card-border bg-white/80 py-20 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-reiki-accent/50 text-reiki-olive ring-4 ring-reiki-olive/10">
              <HiDocumentText className="text-4xl" />
            </div>
            <p
              className="mt-4 max-w-sm text-lg text-reiki-body"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Choose a page and section from the sidebar to edit its text and images. Changes are saved to the backend and appear on the site.
            </p>
            <div className="mt-6 flex gap-2">
              <span className="h-1 w-1 rounded-full bg-reiki-olive/60" aria-hidden />
              <span className="h-1 w-2 rounded-full bg-reiki-olive/40" aria-hidden />
              <span className="h-1 w-1 rounded-full bg-reiki-olive/60" aria-hidden />
            </div>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-reiki-olive border-t-transparent" />
            <p className="mt-4 text-sm text-reiki-muted">Loading section…</p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {loadError && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Could not load from API: {loadError}. Showing defaults. Save to create/update on backend.
              </div>
            )}
            <div className="rounded-3xl border border-reiki-card-border bg-white shadow-sm overflow-hidden">
              <div className="border-b border-reiki-card-border bg-reiki-bg-stripe/80 px-6 py-4">
                <h2 className="text-lg text-reiki-dark" style={{ fontFamily: "EB Garamond, serif" }}>
                  {sectionLabel}
                </h2>
                <p className="mt-1 text-sm text-reiki-muted">
                  Edit below and click Save changes. Updates appear on the live site.
                </p>
              </div>

              <div className="p-6 space-y-8">
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-reiki-benefit-icon text-reiki-olive">
                      <HiPencil className="text-xl" />
                    </span>
                    <div>
                      <p className="font-medium text-reiki-dark text-sm">Text & headings</p>
                      <p className="text-xs text-reiki-muted">Edit copy and titles</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {fields.map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={`field-${field.id}`}
                          className="mb-1.5 block text-sm font-medium text-reiki-dark"
                          style={{ fontFamily: "Lato, sans-serif" }}
                        >
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={`field-${field.id}`}
                            value={field.value}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            rows={4}
                            className="w-full rounded-xl border border-reiki-card-border bg-white px-4 py-3 text-reiki-body placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/20"
                            style={{ fontFamily: "Lato, sans-serif" }}
                            placeholder={field.label}
                          />
                        ) : (
                          <input
                            id={`field-${field.id}`}
                            type="text"
                            value={field.value}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="w-full rounded-xl border border-reiki-card-border bg-white px-4 py-3 text-reiki-body placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/20"
                            style={{ fontFamily: "Lato, sans-serif" }}
                            placeholder={field.label}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {images.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-reiki-benefit-icon text-reiki-olive">
                        <HiPhoto className="text-xl" />
                      </span>
                      <div>
                        <p className="font-medium text-reiki-dark text-sm">Images</p>
                        <p className="text-xs text-reiki-muted">Edit URL and alt text; save to update on site.</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      {images.map((img) => {
                        const updatedFile = imageFiles[img.id];
                        const previewUrl = imagePreviewUrls[img.id];
                        const displayUrl = previewUrl ?? img.url;
                        return (
                          <div
                            key={img.id}
                            className="rounded-xl border border-reiki-card-border bg-reiki-section/50 overflow-hidden"
                          >
                            <div className="p-4 border-b border-reiki-card-border bg-white/80">
                              <p className="text-sm font-medium text-reiki-dark">{img.id}</p>
                            </div>
                            <div className="p-4 flex flex-col gap-4">
                              <div className="shrink-0 rounded-lg overflow-hidden border border-reiki-card-border bg-reiki-section-alt aspect-video w-full sm:w-48">
                                <img
                                  src={displayUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='%23e5e7eb'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3EImage%3C/text%3E%3C/svg%3E"}
                                  alt={img.alt}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' fill='%23e5e7eb'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3EImage%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                              </div>
                              <div className="grid gap-2">
                                <label className="text-xs font-medium text-reiki-dark">Image URL</label>
                                <input
                                  type="text"
                                  value={img.url}
                                  onChange={(e) => handleImageChange(img.id, "url", e.target.value)}
                                  className="w-full rounded-lg border border-reiki-card-border bg-white px-3 py-2 text-sm"
                                  placeholder="/path/to/image.jpg"
                                />
                                <label className="text-xs font-medium text-reiki-dark">Alt text</label>
                                <input
                                  type="text"
                                  value={img.alt}
                                  onChange={(e) => handleImageChange(img.id, "alt", e.target.value)}
                                  className="w-full rounded-lg border border-reiki-card-border bg-white px-3 py-2 text-sm"
                                  placeholder="Description for accessibility"
                                />
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <label className="inline-flex items-center gap-2 rounded-lg border border-reiki-card-border bg-white px-3 py-2 text-sm font-medium text-reiki-dark shadow-sm cursor-pointer hover:bg-reiki-section transition">
                                  <HiArrowPath className="text-base text-reiki-olive" />
                                  <span>Preview local file</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleImageFileChange(img.id, file);
                                      e.target.value = "";
                                    }}
                                  />
                                </label>
                                {updatedFile && (
                                  <button
                                    type="button"
                                    onClick={() => clearImageUpdate(img.id)}
                                    className="rounded-lg border border-reiki-card-border bg-white px-3 py-2 text-sm text-reiki-muted hover:text-reiki-dark hover:bg-reiki-section transition"
                                  >
                                    Clear preview
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {fields.length === 0 && images.length === 0 && (
                  <div className="rounded-xl border-2 border-dashed border-reiki-holder-line bg-reiki-section-alt/50 p-8 text-center">
                    <p className="text-reiki-body text-sm" style={{ fontFamily: "Lato, sans-serif" }}>
                      No content defined for this section. Add fields in the backend or seed script.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
