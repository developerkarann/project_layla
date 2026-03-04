const Service = require("../models/Service");

async function list(req, res, next) {
  try {
    const publishedOnly = req.query.published !== "false";
    const query = publishedOnly ? { isActive: true } : {};
    const services = await Service.find(query).sort({ order: 1 });
    return res.json({ services });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const service = await Service.findOne({ id: req.params.id });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.json(service);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const service = await Service.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.json(service);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await Service.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Service not found" });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
