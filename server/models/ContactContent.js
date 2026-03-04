const mongoose = require("mongoose");

const contactMethodSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    value: String,
    href: String,
    iconKey: String,
  },
  { _id: false }
);

const faqItemSchema = new mongoose.Schema(
  { q: String, a: String },
  { _id: false }
);

const officeHourSchema = new mongoose.Schema(
  { day: String, time: String },
  { _id: false }
);

const socialLinkSchema = new mongoose.Schema(
  { platform: String, url: String },
  { _id: false }
);

const contactContentSchema = new mongoose.Schema(
  {
    // Hero
    heroImage: String,
    heroScriptName: String,
    heroTitle: String,
    heroSubtitle: String,
    // Intro quote
    introQuote: String,
    // Ways to connect section
    waysToConnectTitle: String,
    waysToConnectSubtitle: String,
    contactMethods: {
      type: [contactMethodSchema],
      default: [],
    },
    // Send a message section
    sendMessageTitle: String,
    sendMessageSubtitle: String,
    interestOptions: [String],
    // FAQ section
    faqSectionTitle: String,
    faq: {
      type: [faqItemSchema],
      default: [],
    },
    // Availability section
    availabilityTitle: String,
    availabilityBody: String,
    availabilityFootnote: String,
    // Office hours section
    officeHoursTitle: String,
    officeHours: {
      type: [officeHourSchema],
      default: [],
    },
    // Social / Follow section
    socialText: String,
    socialLinks: {
      type: [socialLinkSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactContent", contactContentSchema);
