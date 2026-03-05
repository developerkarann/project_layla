const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { createToken, isValidToken } = require("../middleware/adminAuth");
const SiteSetting = require("../models/SiteSetting");

const ADMIN_PASSWORD_KEY = "adminPasswordHash";
const FALLBACK_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "layla@admin";
const BCRYPT_ROUNDS = 10;

async function getOrInitPasswordHash() {
  let setting = await SiteSetting.findOne({ key: ADMIN_PASSWORD_KEY });
  if (setting && typeof setting.value === "string") {
    return setting.value;
  }
  const hash = await bcrypt.hash(FALLBACK_ADMIN_PASSWORD, BCRYPT_ROUNDS);
  setting = await SiteSetting.findOneAndUpdate(
    { key: ADMIN_PASSWORD_KEY },
    { value: hash },
    { new: true, upsert: true }
  );
  return setting.value;
}

/** POST /api/admin/login - body: { password }. Returns { token } or 401. */
router.post("/login", async (req, res, next) => {
  try {
    const { password } = req.body || {};
    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ message: "Password is required" });
    }
    const hash = await getOrInitPasswordHash();
    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = createToken();
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

/** PUT /api/admin/password - change admin password (requires valid token). */
router.put("/password", async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body || {};
    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "New password must be at least 8 characters long" });
    }
    const hash = await getOrInitPasswordHash();
    const ok = await bcrypt.compare(currentPassword || "", hash);
    if (!ok) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const newHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await SiteSetting.findOneAndUpdate(
      { key: ADMIN_PASSWORD_KEY },
      { value: newHash },
      { new: true, upsert: true }
    );
    res.json({ message: "Admin password updated" });
  } catch (err) {
    next(err);
  }
});

/** GET /api/admin/verify - header: Authorization: Bearer <token>. Returns 200 if valid, 401 otherwise. */
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!isValidToken(token)) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ ok: true });
});

module.exports = router;
