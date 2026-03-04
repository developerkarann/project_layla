const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, default: "" },
    location: { type: String, default: "" },
    type: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    cta: { type: String, default: "" },
    status: { type: String, enum: ["upcoming", "past"], default: "upcoming" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
