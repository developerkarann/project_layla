const SiteSetting = require("../models/SiteSetting");

async function getAll(req, res, next) {
  try {
    const settings = await SiteSetting.find();
    const map = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });
    return res.json(map);
  } catch (err) {
    next(err);
  }
}

async function getByKey(req, res, next) {
  try {
    const setting = await SiteSetting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    return res.json({ key: setting.key, value: setting.value });
  } catch (err) {
    next(err);
  }
}

async function set(req, res, next) {
  try {
    const { key } = req.params;
    const { value } = req.body;
    if (value === undefined) {
      return res.status(400).json({ message: "Body must include value" });
    }
    const setting = await SiteSetting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true, runValidators: true }
    );
    return res.json({ key: setting.key, value: setting.value });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getByKey,
  set,
};
