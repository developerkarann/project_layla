const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  { title: String, quote: String, body: String },
  { _id: false }
);

const approachSchema = new mongoose.Schema(
  { title: String, body: String },
  { _id: false }
);

const awakenSchema = new mongoose.Schema(
  {
    title: String,
    paragraphs: [String],
    closing: String,
  },
  { _id: false }
);

const valueSchema = new mongoose.Schema(
  { title: String, text: String },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  { quote: String, attribution: String },
  { _id: false }
);

const journeyItemSchema = new mongoose.Schema(
  { year: String, title: String, text: String },
  { _id: false }
);

const aboutContentSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Layla" },
    tagline: { type: String, default: "" },
    introTitle: { type: String, default: "" },
    introParagraphs: [String],
    introCtaText: { type: String, default: "" },
    mission: { type: missionSchema, default: () => ({}) },
    approach: { type: approachSchema, default: () => ({}) },
    awaken: { type: awakenSchema, default: () => ({}) },
    vision: { type: String, default: "" },
    trainings: [String],
    trainingIntro: { type: String, default: "" },
    trainingSectionTitle: { type: String, default: "" },
    values: [valueSchema],
    testimonial: { type: testimonialSchema, default: () => ({}) },
    testimonialSectionTitle: { type: String, default: "" },
    journey: [journeyItemSchema],
    journeySectionTitle: { type: String, default: "" },
    ctaQuote: { type: String, default: "" },
    ctaBody: { type: String, default: "" },
    ctaButtonLabel: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutContent", aboutContentSchema);
