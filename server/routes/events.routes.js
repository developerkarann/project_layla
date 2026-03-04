const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events.controller");

router.get("/upcoming", eventsController.upcoming);
router.get("/past", eventsController.past);
router.get("/", eventsController.list);
router.get("/:id", eventsController.getById);
router.post("/", eventsController.create);
router.put("/:id", eventsController.update);
router.delete("/:id", eventsController.remove);

module.exports = router;
