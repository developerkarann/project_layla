const mongoose = require("mongoose");

const membershipTierSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, default: "month" },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    cta: { type: String, default: "" },
    highlighted: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipTier", membershipTierSchema);
