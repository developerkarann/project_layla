const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    order: { type: Number, required: true },
    id: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    image: { type: String, default: "" },
    imageSecondary: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    keyPoints: [{ type: String }],
    offerings: [{ type: String }],
    description: { type: String, default: "" },
    whoItsFor: { type: String, default: "" },
    quote: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
