const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membership.controller");

// Tiers
router.get("/tiers", membershipController.listTiers);
router.get("/tiers/:id", membershipController.getTierById);
router.post("/tiers", membershipController.createTier);
router.put("/tiers/:id", membershipController.updateTier);
router.delete("/tiers/:id", membershipController.removeTier);

// Healing Space
router.get("/healing-space", membershipController.listHealingSpace);
router.get("/healing-space/:id", membershipController.getHealingSpaceById);
router.post("/healing-space", membershipController.createHealingSpace);
router.put("/healing-space/:id", membershipController.updateHealingSpace);
router.delete("/healing-space/:id", membershipController.removeHealingSpace);

// Products
router.get("/products", membershipController.listProducts);
router.get("/products/:id", membershipController.getProductById);
router.post("/products", membershipController.createProduct);
router.put("/products/:id", membershipController.updateProduct);
router.delete("/products/:id", membershipController.removeProduct);

// Meta
router.get("/meta", membershipController.getMeta);
router.put("/meta", membershipController.updateMeta);

module.exports = router;
