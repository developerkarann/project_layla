import { useState, useEffect, useCallback } from "react";
import { getSection } from "../api/content";
import { getSectionContent } from "../data/adminSectionContent";

/**
 * Fetches section content from API with fallback to static defaults.
 * Use this so frontend pages can show admin-edited content dynamically.
 * @param {string} pageSlug - e.g. 'home', 'about', 'global'
 * @param {string} sectionKey - e.g. 'hero', 'disclaimer'
 * @returns {{ fields: Array, images: Array, loading: boolean, error: string | null }}
 */
export function useContent(pageSlug, sectionKey) {
  const [data, setData] = useState({
    fields: [],
    images: [],
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    if (!pageSlug || !sectionKey) {
      setData({ fields: [], images: [], loading: false, error: null });
      return;
    }
    const fallback = getSectionContent(pageSlug, sectionKey);
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const section = await getSection(pageSlug, sectionKey);
      setData({
        fields: section?.fields ?? fallback?.fields ?? [],
        images: section?.images ?? fallback?.images ?? [],
        loading: false,
        error: null,
      });
    } catch {
      setData({
        fields: fallback?.fields ?? [],
        images: fallback?.images ?? [],
        loading: false,
        error: null,
      });
    }
  }, [pageSlug, sectionKey]);

  useEffect(() => {
    load();
  }, [load]);

  return data;
}

/**
 * Get a single field value by id from section content.
 * @param {Array} fields - fields array from useContent
 * @param {string} fieldId - e.g. 'text', 'title'
 * @returns {string}
 */
export function getFieldValue(fields, fieldId) {
  const field = fields?.find((f) => f.id === fieldId);
  return field?.value ?? "";
}
