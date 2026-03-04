/**
 * Content sections API. Used by AdminPanel and useContent hook.
 * Delegates to central API client (apiGet returns null on 404).
 */
import { apiGet, apiPut } from "./client";

export async function getSection(pageSlug, sectionKey) {
  return apiGet(`content/${encodeURIComponent(pageSlug)}/sections/${encodeURIComponent(sectionKey)}`);
}

export async function putSection(pageSlug, sectionKey, body) {
  return apiPut(`content/${encodeURIComponent(pageSlug)}/sections/${encodeURIComponent(sectionKey)}`, body);
}
