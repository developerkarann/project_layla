const express = require("express");
const router = express.Router();

const contentRoutes = require("./content.routes");
const servicesRoutes = require("./services.routes");
const blogRoutes = require("./blog.routes");
const galleryRoutes = require("./gallery.routes");
const aboutRoutes = require("./about.routes");
const contactRoutes = require("./contact.routes");
const settingsRoutes = require("./settings.routes");
const eventsRoutes = require("./events.routes");
const membershipRoutes = require("./membership.routes");

router.use("/content", contentRoutes);
router.use("/services", servicesRoutes);
router.use("/blog", blogRoutes);
router.use("/gallery", galleryRoutes);
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/settings", settingsRoutes);
router.use("/events", eventsRoutes);
router.use("/membership", membershipRoutes);

module.exports = router;
