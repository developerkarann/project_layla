const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");

router.get("/categories", blogController.getCategories);
router.get("/", blogController.list);
router.get("/:slug", blogController.getBySlug);
router.post("/", blogController.create);
router.put("/:slug", blogController.update);
router.delete("/:slug", blogController.remove);

module.exports = router;
