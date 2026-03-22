const jwt = require("jsonwebtoken");
const User = require("../models/user");
const revokedTokenStore = new Map();

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    const error = new Error("JWT_SECRET must be set and at least 32 characters");
    error.statusCode = 500;
    throw error;
  }
  return secret;
}

function signUserToken(user) {
  return jwt.sign(
    { sub: String(user._id), role: user.role, email: user.email },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function extractBearerToken(authorizationHeader) {
  const value = authorizationHeader || "";
  return value.startsWith("Bearer ") ? value.slice(7) : "";
}

function isTokenRevoked(token) {
  const expiresAt = revokedTokenStore.get(token);
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    revokedTokenStore.delete(token);
    return false;
  }
  return true;
}

function revokeUserToken(token, payload) {
  if (!token || !payload || typeof payload.exp !== "number") return;
  revokedTokenStore.set(token, payload.exp * 1000);
}

async function requireUserAuth(req, res, next) {
  try {
    const token = extractBearerToken(req.headers.authorization);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (isTokenRevoked(token)) return res.status(401).json({ message: "Unauthorized" });
    const payload = jwt.verify(token, getJwtSecret());
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    req.auth = { token, payload };
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return next(error);
  }
}

module.exports = { signUserToken, requireUserAuth, revokeUserToken };
