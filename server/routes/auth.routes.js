const express = require("express");
const authController = require("../controllers/auth.controller");
const { requireUserAuth } = require("../middleware/userAuth");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", requireUserAuth, authController.logout);
router.post("/events/:eventId/register", requireUserAuth, authController.registerForEvent);
router.get("/me", requireUserAuth, authController.me);

module.exports = router;
