const crypto = require("crypto");

/** In-memory store: token -> expiry timestamp. Cleared on server restart. */
const tokenStore = new Map();

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function createToken() {
  const token = crypto.randomBytes(32).toString("hex");
  tokenStore.set(token, Date.now() + TOKEN_TTL_MS);
  return token;
}

function isValidToken(token) {
  if (!token || typeof token !== "string") return false;
  const expiry = tokenStore.get(token);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    tokenStore.delete(token);
    return false;
  }
  return true;
}

/**
 * Middleware: allow GET and admin login/verify; for all other requests require valid Bearer token.
 * Mount this on the API router so path is relative to /api (e.g. "content/...", "admin/login").
 */
function requireAdminAuth(req, res, next) {
  const path = req.path.replace(/^\//, "");
  const method = req.method;

  // Allow GET (read-only) everywhere
  if (method === "GET") return next();

  // Allow POST /api/admin/login and GET /api/admin/verify without token
  if (path === "admin/login" && method === "POST") return next();
  if (path === "admin/verify" && method === "GET") return next();

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!isValidToken(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

module.exports = {
  createToken,
  isValidToken,
  requireAdminAuth,
};
