const Event = require("../models/Event");

async function list(req, res, next) {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const events = await Event.find(query).sort({ date: 1 });
    return res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function upcoming(req, res, next) {
  try {
    const events = await Event.find({ status: "upcoming" }).sort({ date: 1 });
    return res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function past(req, res, next) {
  try {
    const events = await Event.find({ status: "past" }).sort({ date: -1 });
    return res.json({ events });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(event);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const event = await Event.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.json(event);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await Event.findOneAndDelete({ id: req.params.id });
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  upcoming,
  past,
  getById,
  create,
  update,
  remove,
};
