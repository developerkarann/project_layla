const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about.controller");

router.get("/", aboutController.get);
router.put("/", aboutController.update);

module.exports = router;
