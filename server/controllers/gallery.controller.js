const GalleryGroup = require("../models/GalleryGroup");

async function listGroups(req, res, next) {
  try {
    const groups = await GalleryGroup.find().sort({ key: 1 });
    return res.json({ groups });
  } catch (err) {
    next(err);
  }
}

async function getGroup(req, res, next) {
  try {
    const group = await GalleryGroup.findOne({ key: req.params.key });
    if (!group) {
      return res.status(404).json({ message: "Gallery group not found" });
    }
    return res.json(group);
  } catch (err) {
    next(err);
  }
}

async function upsertGroup(req, res, next) {
  try {
    const { key } = req.params;
    const { title, images = [] } = req.body;
    const group = await GalleryGroup.findOneAndUpdate(
      { key },
      { title, images },
      { new: true, upsert: true, runValidators: true }
    );
    return res.json(group);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listGroups,
  getGroup,
  upsertGroup,
};
