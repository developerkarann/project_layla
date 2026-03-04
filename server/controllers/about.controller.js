const AboutContent = require("../models/AboutContent");

async function get(req, res, next) {
  try {
    let doc = await AboutContent.findOne();
    if (!doc) {
      doc = await AboutContent.create({});
    }
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    let doc = await AboutContent.findOne();
    if (!doc) {
      doc = await AboutContent.create(req.body);
      return res.status(201).json(doc);
    }
    Object.assign(doc, req.body);
    await doc.save();
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}

module.exports = { get, update };
