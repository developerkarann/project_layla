const mongoose = require("mongoose");

const techAndHostingSchema = new mongoose.Schema(
  {
    canDevelopLater: { type: String, default: "" },
    audioHosting: { type: String, default: "" },
    transparency: { type: String, default: "" },
  },
  { _id: false }
);

const membershipMetaSchema = new mongoose.Schema(
  {
    techAndHosting: { type: techAndHostingSchema, default: () => ({}) },
    features: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MembershipMeta", membershipMetaSchema);
