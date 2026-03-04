const ContentSection = require("../models/ContentSection");

const PAGE_SLUGS = [
  "home",
  "about",
  "services",
  "gallery",
  "blog",
  "contact",
  "availability",
  "events",
  "membership",
  "global",
];

/** Virtual sections: nav-only, not stored in content DB. GET returns stub; PUT no-ops. */
const VIRTUAL_SECTIONS = {
  blog: ["all-blogs"],
  events: ["all-events"],
  membership: ["all-membership"],
  contact: ["all-contact"],
};

function isVirtualSection(pageSlug, sectionKey) {
  return VIRTUAL_SECTIONS[pageSlug]?.includes(sectionKey) ?? false;
}

/** Stub response for virtual sections so clients never get 404. */
function virtualSectionStub(pageSlug, sectionKey) {
  return {
    pageSlug,
    sectionKey,
    fields: [
      {
        id: "_notice",
        label: "Notice",
        type: "text",
        value: "This section is managed in the All Blogs view. Use the Blog → All Blogs tab to manage posts.",
      },
    ],
    images: [],
  };
}

async function getPages(req, res, next) {
  try {
    return res.json({ pages: PAGE_SLUGS });
  } catch (err) {
    next(err);
  }
}

async function getSectionsByPage(req, res, next) {
  try {
    const { pageSlug } = req.params;
    const sections = await ContentSection.find({ pageSlug }).sort({
      sectionKey: 1,
    });
    const virtualKeys = VIRTUAL_SECTIONS[pageSlug] ?? [];
    const virtualDocs = virtualKeys.map((sectionKey) => ({
      pageSlug,
      sectionKey,
      fields: virtualSectionStub(pageSlug, sectionKey).fields,
      images: [],
    }));
    const merged = [...sections.map((s) => s.toObject()), ...virtualDocs].sort(
      (a, b) => (a.sectionKey || "").localeCompare(b.sectionKey || "")
    );
    return res.json({ sections: merged });
  } catch (err) {
    next(err);
  }
}

async function getSection(req, res, next) {
  try {
    const { pageSlug, sectionKey } = req.params;
    if (isVirtualSection(pageSlug, sectionKey)) {
      return res.json(virtualSectionStub(pageSlug, sectionKey));
    }
    const section = await ContentSection.findOne({ pageSlug, sectionKey });
    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    return res.json(section);
  } catch (err) {
    next(err);
  }
}

async function upsertSection(req, res, next) {
  try {
    const { pageSlug, sectionKey } = req.params;
    if (isVirtualSection(pageSlug, sectionKey)) {
      return res.json(virtualSectionStub(pageSlug, sectionKey));
    }
    const { fields = [], images = [] } = req.body;
    const section = await ContentSection.findOneAndUpdate(
      { pageSlug, sectionKey },
      { fields, images },
      { new: true, upsert: true, runValidators: true }
    );
    return res.json(section);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPages,
  getSectionsByPage,
  getSection,
  upsertSection,
};
