import { getAdminToken } from "../utils/adminAuth";

/**
 * API client base. All requests go through this so we can change base URL and error handling in one place.
 * - Dev: empty string so Vite proxy forwards /api to backend (see vite.config.js).
 * - Production: use VITE_API_URL if set (e.g. separate API server); otherwise fall back to the deployed backend URL.
 */
const API_BASE =
  import.meta.env.VITE_API_URL != null && import.meta.env.VITE_API_URL !== ""
    ? import.meta.env.VITE_API_URL.replace(/\/$/, "")
    : import.meta.env.DEV
    ? ""
    : "https://project-layla-cghn.vercel.app";

function getHeaders(includeBody = false) {
  const headers = {};
  if (includeBody) headers["Content-Type"] = "application/json";
  const token = getAdminToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

/**
 * Performs a GET request and returns JSON. Returns null on 404.
 * @param {string} path - Path without leading slash (e.g. 'content/home/sections/hero')
 * @returns {Promise<object|null>}
 */
export async function apiGet(path) {
  const res = await fetch(`${API_BASE}/api/${path}`, { headers: getHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}

/**
 * Performs a PUT request with JSON body.
 * @param {string} path
 * @param {object} body
 * @returns {Promise<object>}
 */
export async function apiPut(path, body) {
  const res = await fetch(`${API_BASE}/api/${path}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}

/**
 * Performs a POST request with JSON body.
 * @param {string} path
 * @param {object} body
 * @returns {Promise<object>}
 */
export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}/api/${path}`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}

/**
 * Performs a DELETE request. Returns undefined on success (204).
 * @param {string} path
 */
export async function apiDelete(path) {
  const res = await fetch(`${API_BASE}/api/${path}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) return;
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}
