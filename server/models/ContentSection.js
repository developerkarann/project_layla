const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: String,
    type: { type: String, enum: ["text", "textarea"], default: "text" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const imageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { _id: false }
);

const contentSectionSchema = new mongoose.Schema(
  {
    pageSlug: { type: String, required: true },
    sectionKey: { type: String, required: true },
    fields: {
      type: [fieldSchema],
      default: [],
    },
    images: {
      type: [imageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContentSection", contentSectionSchema);
