const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userMembershipSchema = new mongoose.Schema(
  {
    membershipId: { type: String, default: "" },
    membershipTier: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipTier" },
    startedAt: { type: Date, default: Date.now },
    expiryDate: { type: Date },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: true },
    hasMembership: { type: Boolean, default: false },
    membership: { type: userMembershipSchema, default: () => ({}) },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
);

function resolveMonthsFromPeriod(period) {
  const normalized = String(period || "month").toLowerCase();
  if (normalized === "week" || normalized === "weekly") return 0.25;
  if (normalized === "month" || normalized === "monthly") return 1;
  if (normalized === "quarter" || normalized === "quarterly") return 3;
  if (normalized === "year" || normalized === "yearly" || normalized === "annual") return 12;
  const matched = normalized.match(/(\d+)\s*(week|month|year)/);
  if (!matched) return 1;
  const count = Number(matched[1]) || 1;
  const unit = matched[2];
  if (unit === "week") return count / 4;
  if (unit === "year") return count * 12;
  return count;
}

function addMonths(date, months) {
  const wholeMonths = Math.floor(months);
  const fractionalPart = months - wholeMonths;
  const next = new Date(date);
  if (wholeMonths > 0) next.setMonth(next.getMonth() + wholeMonths);
  if (fractionalPart > 0) next.setDate(next.getDate() + Math.round(fractionalPart * 30));
  return next;
}

userSchema.pre("validate", async function (next) {
  try {
    if (!this.hasMembership) {
      this.membership = {};
      return next();
    }
    if (!this.membership) this.membership = {};
    const hasTierRef = Boolean(this.membership.membershipTier);
    const hasTierId = Boolean(this.membership.membershipId);
    if (!hasTierRef && !hasTierId) return next();
    const MembershipTier = mongoose.models.MembershipTier || mongoose.model("MembershipTier");
    let tier = null;
    if (hasTierRef) {
      tier = await MembershipTier.findById(this.membership.membershipTier).lean();
    }
    if (!tier && hasTierId) {
      tier = await MembershipTier.findOne({ id: this.membership.membershipId }).lean();
      if (tier && !this.membership.membershipTier) {
        this.membership.membershipTier = tier._id;
      }
    }
    if (!tier) return next();
    const startDate = this.membership.startedAt ? new Date(this.membership.startedAt) : new Date();
    this.membership.startedAt = startDate;
    const months = resolveMonthsFromPeriod(tier.period);
    this.membership.expiryDate = addMonths(startDate, months);
    if (!this.membership.membershipId) this.membership.membershipId = tier.id;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function (value) {
  return bcrypt.compare(value, this.password);
};

module.exports = mongoose.model("User", userSchema);