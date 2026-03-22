const USER_TOKEN_KEY = "user_token";
const USER_PROFILE_KEY = "user_profile";

export function setUserToken(token) {
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export function getUserToken() {
  return localStorage.getItem(USER_TOKEN_KEY);
}

export function clearUserToken() {
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function isUserLoggedIn() {
  return !!getUserToken();
}

export function setUserProfile(profile) {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export function getUserProfile() {
  const raw = localStorage.getItem(USER_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearUserProfile() {
  localStorage.removeItem(USER_PROFILE_KEY);
}
