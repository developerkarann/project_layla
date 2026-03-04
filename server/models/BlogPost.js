const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    image: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    author: { type: String, default: "Layla" },
    category: { type: String, default: "" },
    body: [{ type: String }],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
