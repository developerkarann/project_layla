const User = require("../models/user");
const Event = require("../models/Event");
const { signUserToken, revokeUserToken } = require("../middleware/userAuth");

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
    hasMembership: user.hasMembership,
    membership: user.membership,
    events: user.events,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function register(req, res, next) {
  try {
    const { name, email, phone, password } = req.body || {};
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "name, email, phone and password are required" });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ message: "password must be at least 8 characters" });
    }
    const normalizedEmail = String(email).toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "email already in use" });
    }
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      phone: String(phone).trim(),
      password: String(password),
      role: "user",
      isActive: true,
    });
    const token = signUserToken(user);
    return res.status(201).json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }
    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    const ok = await user.comparePassword(String(password));
    if (!ok || !user.isActive) return res.status(401).json({ message: "invalid credentials" });
    const token = signUserToken(user);
    return res.json({ token, user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = req.user;
    await user.populate([
      { path: "membership.membershipTier" },
      { path: "events", options: { sort: { date: 1 } } },
    ]);
    return res.json({ user: sanitizeUser(user) });
  } catch (error) {
    return next(error);
  }
}

async function logout(req, res, next) {
  try {
    revokeUserToken(req.auth?.token, req.auth?.payload);
    return res.json({ message: "logout successful" });
  } catch (error) {
    return next(error);
  }
}

async function registerForEvent(req, res, next) {
  try {
    const event = await Event.findOne({ id: req.params.eventId });
    if (!event) return res.status(404).json({ message: "event not found" });
    if (event.status !== "upcoming") {
      return res.status(400).json({ message: "registration allowed only for upcoming events" });
    }
    const userId = String(req.user._id);
    const alreadyRegistered = (req.user.events || []).some(
      (eventId) => String(eventId) === String(event._id)
    );
    if (!alreadyRegistered) {
      await User.findByIdAndUpdate(userId, { $addToSet: { events: event._id } });
    }
    const updatedUser = await User.findById(userId);
    await updatedUser.populate([
      { path: "membership.membershipTier" },
      { path: "events", options: { sort: { date: 1 } } },
    ]);
    return res.json({
      message: alreadyRegistered ? "already registered for this event" : "event registration successful",
      alreadyRegistered,
      event,
      user: sanitizeUser(updatedUser),
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { register, login, me, logout, registerForEvent };
