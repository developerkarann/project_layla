const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");

router.get("/", settingsController.getAll);
router.get("/:key", settingsController.getByKey);
router.put("/:key", settingsController.set);

module.exports = router;
