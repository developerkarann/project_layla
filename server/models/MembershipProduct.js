const mongoose = require("mongoose");

const membershipProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, default: "" },
    description: { type: String, default: "" },
    priceLabel: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipProduct", membershipProductSchema);
