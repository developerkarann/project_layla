const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const galleryGroupSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    title: { type: String, default: "" },
    images: {
      type: [galleryImageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryGroup", galleryGroupSchema);
