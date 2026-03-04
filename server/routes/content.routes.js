const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");

router.get("/pages", contentController.getPages);
router.get("/:pageSlug/sections", contentController.getSectionsByPage);
router.get("/:pageSlug/sections/:sectionKey", contentController.getSection);
router.put("/:pageSlug/sections/:sectionKey", contentController.upsertSection);

module.exports = router;
