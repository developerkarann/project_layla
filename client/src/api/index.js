/**
 * Central API module. All backend calls go through these functions.
 * Use with Redux thunks or directly in components.
 */
import { apiGet, apiPut, apiPost, apiDelete } from "./client";

// --- Content sections (page/section editable blocks) ---
export async function getContentSection(pageSlug, sectionKey) {
  return apiGet(`content/${encodeURIComponent(pageSlug)}/sections/${encodeURIComponent(sectionKey)}`);
}

export async function putContentSection(pageSlug, sectionKey, body) {
  return apiPut(`content/${encodeURIComponent(pageSlug)}/sections/${encodeURIComponent(sectionKey)}`, body);
}

// --- About (single document) ---
export async function getAbout() {
  return apiGet("about");
}

export async function putAbout(body) {
  return apiPut("about", body);
}

// --- Contact (single document) ---
export async function getContact() {
  return apiGet("contact");
}

export async function putContact(body) {
  return apiPut("contact", body);
}

// --- Services ---
export async function getServices(publishedOnly = true) {
  const q = publishedOnly ? "" : "?published=false";
  return apiGet(`services${q}`);
}

export async function getServiceById(id) {
  return apiGet(`services/${encodeURIComponent(id)}`);
}

export async function createService(body) {
  return apiPost("services", body);
}

export async function updateService(id, body) {
  return apiPut(`services/${encodeURIComponent(id)}`, body);
}

export async function deleteService(id) {
  return apiDelete(`services/${encodeURIComponent(id)}`);
}

// --- Blog ---
export async function getBlogPosts(publishedOnly = true) {
  const q = publishedOnly ? "" : "?published=false";
  return apiGet(`blog${q}`);
}

export async function getBlogCategories() {
  return apiGet("blog/categories");
}

export async function getBlogPostBySlug(slug, includeUnpublished = false) {
  const q = includeUnpublished ? "?published=false" : "";
  return apiGet(`blog/${encodeURIComponent(slug)}${q}`);
}

export async function createBlogPost(body) {
  return apiPost("blog", body);
}

export async function updateBlogPost(slug, body) {
  return apiPut(`blog/${encodeURIComponent(slug)}`, body);
}

export async function deleteBlogPost(slug) {
  return apiDelete(`blog/${encodeURIComponent(slug)}`);
}

// --- Gallery ---
export async function getGalleryGroups() {
  return apiGet("gallery/groups");
}

export async function getGalleryGroup(key) {
  return apiGet(`gallery/groups/${encodeURIComponent(key)}`);
}

export async function upsertGalleryGroup(key, body) {
  return apiPut(`gallery/groups/${encodeURIComponent(key)}`, body);
}

// --- Events ---
export async function getEvents(status) {
  const q = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiGet(`events${q}`);
}

export async function getUpcomingEvents() {
  return apiGet("events/upcoming");
}

export async function getPastEvents() {
  return apiGet("events/past");
}

export async function getEventById(id) {
  return apiGet(`events/${encodeURIComponent(id)}`);
}

export async function createEvent(body) {
  return apiPost("events", body);
}

export async function updateEvent(id, body) {
  return apiPut(`events/${encodeURIComponent(id)}`, body);
}

export async function deleteEvent(id) {
  return apiDelete(`events/${encodeURIComponent(id)}`);
}

// --- Membership ---
export async function getMembershipTiers() {
  return apiGet("membership/tiers");
}

export async function getMembershipTierById(id) {
  return apiGet(`membership/tiers/${encodeURIComponent(id)}`);
}

export async function createMembershipTier(body) {
  return apiPost("membership/tiers", body);
}

export async function updateMembershipTier(id, body) {
  return apiPut(`membership/tiers/${encodeURIComponent(id)}`, body);
}

export async function deleteMembershipTier(id) {
  return apiDelete(`membership/tiers/${encodeURIComponent(id)}`);
}

export async function getHealingSpaceItems() {
  return apiGet("membership/healing-space");
}

export async function getHealingSpaceItemById(id) {
  return apiGet(`membership/healing-space/${encodeURIComponent(id)}`);
}

export async function createHealingSpaceItem(body) {
  return apiPost("membership/healing-space", body);
}

export async function updateHealingSpaceItem(id, body) {
  return apiPut(`membership/healing-space/${encodeURIComponent(id)}`, body);
}

export async function deleteHealingSpaceItem(id) {
  return apiDelete(`membership/healing-space/${encodeURIComponent(id)}`);
}

export async function getMembershipProducts() {
  return apiGet("membership/products");
}

export async function getMembershipProductById(id) {
  return apiGet(`membership/products/${encodeURIComponent(id)}`);
}

export async function createMembershipProduct(body) {
  return apiPost("membership/products", body);
}

export async function updateMembershipProduct(id, body) {
  return apiPut(`membership/products/${encodeURIComponent(id)}`, body);
}

export async function deleteMembershipProduct(id) {
  return apiDelete(`membership/products/${encodeURIComponent(id)}`);
}

export async function getMembershipMeta() {
  return apiGet("membership/meta");
}

export async function updateMembershipMeta(body) {
  return apiPut("membership/meta", body);
}

// --- Settings (key-value, e.g. header, footer, availability) ---
export async function getSettings() {
  return apiGet("settings");
}

export async function getSettingByKey(key) {
  return apiGet(`settings/${encodeURIComponent(key)}`);
}

export async function setSetting(key, value) {
  return apiPut(`settings/${encodeURIComponent(key)}`, { value });
}
