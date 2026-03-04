/**
 * API client base. All requests go through this so we can change base URL and error handling in one place.
 * In dev, Vite proxies /api to the backend; in production set VITE_API_URL.
 */
const API_BASE = import.meta.env.VITE_API_URL ?? "";

/**
 * Performs a GET request and returns JSON. Returns null on 404.
 * @param {string} path - Path without leading slash (e.g. 'content/home/sections/hero')
 * @returns {Promise<object|null>}
 */
export async function apiGet(path) {
  const res = await fetch(`${API_BASE}/api/${path}`);
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
    headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
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
  const res = await fetch(`${API_BASE}/api/${path}`, { method: "DELETE" });
  if (res.status === 204) return;
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  return res.json();
}
