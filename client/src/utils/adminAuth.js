const STORAGE_KEY = "layla_admin_token";
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getAdminToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    // Support both plain string and JSON with expiry for backwards compatibility
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return raw;
    }
    if (parsed && typeof parsed === "object" && parsed.token) {
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed.token;
    }
    return null;
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  try {
    const payload = {
      token,
      expiresAt: Date.now() + TOKEN_TTL_MS,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export function clearAdminToken() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore storage errors
  }
}

export function hasAdminToken() {
  return !!getAdminToken();
}
