const MembershipTier = require("../models/MembershipTier");
const HealingSpaceItem = require("../models/HealingSpaceItem");
const MembershipProduct = require("../models/MembershipProduct");
const MembershipMeta = require("../models/MembershipMeta");

// --- Tiers ---
async function listTiers(req, res, next) {
  try {
    const tiers = await MembershipTier.find().sort({ order: 1 });
    return res.json({ tiers });
  } catch (err) {
    next(err);
  }
}

async function getTierById(req, res, next) {
  try {
    const tier = await MembershipTier.findOne({ id: req.params.id });
    if (!tier) return res.status(404).json({ message: "Tier not found" });
    return res.json(tier);
  } catch (err) {
    next(err);
  }
}

async function createTier(req, res, next) {
  try {
    const tier = await MembershipTier.create(req.body);
    return res.status(201).json(tier);
  } catch (err) {
    next(err);
  }
}

async function updateTier(req, res, next) {
  try {
    const tier = await MembershipTier.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!tier) return res.status(404).json({ message: "Tier not found" });
    return res.json(tier);
  } catch (err) {
    next(err);
  }
}

async function removeTier(req, res, next) {
  try {
    const deleted = await MembershipTier.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Tier not found" });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// --- Healing Space ---
async function listHealingSpace(req, res, next) {
  try {
    const items = await HealingSpaceItem.find().sort({ order: 1 });
    return res.json({ items });
  } catch (err) {
    next(err);
  }
}

async function getHealingSpaceById(req, res, next) {
  try {
    const item = await HealingSpaceItem.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ message: "Healing space item not found" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

async function createHealingSpace(req, res, next) {
  try {
    const item = await HealingSpaceItem.create(req.body);
    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function updateHealingSpace(req, res, next) {
  try {
    const item = await HealingSpaceItem.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Healing space item not found" });
    return res.json(item);
  } catch (err) {
    next(err);
  }
}

async function removeHealingSpace(req, res, next) {
  try {
    const deleted = await HealingSpaceItem.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Healing space item not found" });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// --- Products ---
async function listProducts(req, res, next) {
  try {
    const products = await MembershipProduct.find().sort({ order: 1 });
    return res.json({ products });
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await MembershipProduct.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await MembershipProduct.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await MembershipProduct.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (err) {
    next(err);
  }
}

async function removeProduct(req, res, next) {
  try {
    const deleted = await MembershipProduct.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

// --- Meta ---
async function getMeta(req, res, next) {
  try {
    let doc = await MembershipMeta.findOne();
    if (!doc) doc = await MembershipMeta.create({});
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}

async function updateMeta(req, res, next) {
  try {
    let doc = await MembershipMeta.findOne();
    if (!doc) {
      doc = await MembershipMeta.create(req.body);
      return res.status(201).json(doc);
    }
    if (req.body.techAndHosting != null) doc.techAndHosting = req.body.techAndHosting;
    if (req.body.features != null) doc.features = req.body.features;
    await doc.save();
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listTiers,
  getTierById,
  createTier,
  updateTier,
  removeTier,
  listHealingSpace,
  getHealingSpaceById,
  createHealingSpace,
  updateHealingSpace,
  removeHealingSpace,
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
  getMeta,
  updateMeta,
};
