const STORAGE_KEY = "layla_admin_token";

export function getAdminToken() {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  try {
    sessionStorage.setItem(STORAGE_KEY, token);
  } catch {}
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function hasAdminToken() {
  return !!getAdminToken();
}
