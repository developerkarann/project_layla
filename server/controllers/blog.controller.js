const BlogPost = require("../models/BlogPost");

async function list(req, res, next) {
  try {
    const publishedOnly = req.query.published !== "false";
    const query = publishedOnly ? { isPublished: true } : {};
    const posts = await BlogPost.find(query).sort({ publishedAt: -1 }).lean();
    return res.json({ posts });
  } catch (err) {
    next(err);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await BlogPost.distinct("category", {
      isPublished: true,
    });
    return res.json({ categories: categories.filter(Boolean) });
  } catch (err) {
    next(err);
  }
}

async function getBySlug(req, res, next) {
  try {
    const includeUnpublished = req.query.published === "false";
    const query = { slug: req.params.slug };
    if (!includeUnpublished) query.isPublished = true;
    const post = await BlogPost.findOne(query);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const post = await BlogPost.create(req.body);
    return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true, lean: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await BlogPost.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  list,
  getCategories,
  getBySlug,
  create,
  update,
  remove,
};
