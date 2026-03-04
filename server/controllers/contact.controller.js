const ContactContent = require("../models/ContactContent");

async function get(req, res, next) {
  try {
    let doc = await ContactContent.findOne();
    if (!doc) {
      doc = await ContactContent.create({});
    }
    return res.json(doc);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    let doc = await ContactContent.findOne();
    if (!doc) {
      doc = await ContactContent.create(req.body);
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
