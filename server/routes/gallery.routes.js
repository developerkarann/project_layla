const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/gallery.controller");

router.get("/groups", galleryController.listGroups);
router.get("/groups/:key", galleryController.getGroup);
router.put("/groups/:key", galleryController.upsertGroup);

module.exports = router;
