/**
 * Seed script: populates MongoDB with initial content so the site can run from the API.
 * Data is aligned with frontend dummy data in client/src/data:
 *   - aboutData.js → aboutContent, testimonial section
 *   - blogPosts.js → blogPosts
 *   - servicesData.js → services
 *   - eventsData.js → eventsSeed (upcoming + past)
 *   - membershipData.js → membershipTiersSeed, healingSpaceSeed, membershipProductsSeed, membershipMetaSeed
 *   - adminSectionContent.js → contentSections (all pages/sections)
 * Run from server dir: node scripts/seed.js  (or from project root: node server/scripts/seed.js)
 * Requires: MONGODB_URI in server/.env or defaults to mongodb://127.0.0.1:27017/layla
 */
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const ContentSection = require("../models/ContentSection");
const Service = require("../models/Service");
const BlogPost = require("../models/BlogPost");
const GalleryGroup = require("../models/GalleryGroup");
const AboutContent = require("../models/AboutContent");
const ContactContent = require("../models/ContactContent");
const SiteSetting = require("../models/SiteSetting");
const Event = require("../models/Event");
const MembershipTier = require("../models/MembershipTier");
const HealingSpaceItem = require("../models/HealingSpaceItem");
const MembershipProduct = require("../models/MembershipProduct");
const MembershipMeta = require("../models/MembershipMeta");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/layla";

const contentSections = [
  // Home sections – exact copy from client/src/pages/HomePage.jsx and its section components
  {
    pageSlug: "home",
    sectionKey: "hero-slider",
    fields: [
      { id: "headline", label: "Headline", type: "text", value: "" },
      { id: "subline", label: "Subline", type: "text", value: "" },
      { id: "cta", label: "Button text", type: "text", value: "" },
    ],
    images: [
      { id: "slide1", url: "/slide1.JPG", alt: "Reiki practitioner using a pendulum during a healing session" },
      { id: "slide2", url: "/slide2.JPG", alt: "Woman meditating with hands near head in a serene room" },
      { id: "slide3", url: "/slide3.JPG", alt: "Calm healing space with natural light" },
      { id: "slide4", url: "/slide4.JPG", alt: "Calm healing space with natural light" },
      { id: "slide5", url: "/slide5.JPG", alt: "Calm healing space with natural light" },
      { id: "slide6", url: "/slide6.JPG", alt: "Calm healing space with natural light" },
      { id: "slide7", url: "/slide7.JPG", alt: "Calm healing space with natural light" },
      { id: "slide8", url: "/slide8.JPG", alt: "Calm healing space with natural light" },
      { id: "slide9", url: "/slide9.JPG", alt: "Calm healing space with natural light" },
    ],
  },
  {
    pageSlug: "home",
    sectionKey: "holistic-healing-intro",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Holistic healing for empowered living" },
      { id: "body", label: "Body / CTA line", type: "textarea", value: "Create the life you want to live !" },
      { id: "cta", label: "Button text", type: "text", value: "Learn more" },
      { id: "missionParagraph", label: "Mission paragraph", type: "textarea", value: "My mission is to ignite self-empowerment and self-healing through quantum shifts of consciousness. I believe in the ripple effect of all things: one deep positive change in a person can create boundless positive outcome far beyond this one person" },
      { id: "approachParagraph", label: "Approach paragraph", type: "textarea", value: "My approach to achieve this goal is rooted in the consideration that you are a conscious and intelligent being with infinite potential and powers. My ethics and values are founded on the respect of your free choice and inner knowing of what is good for you. On that basis, it is a privilege to accompany you and witness your blossoming, your joy, your victories but also help you overcome sorrows, loss, hurts and transcend struggles." },
    ],
    images: [],
  },
  {
    pageSlug: "home",
    sectionKey: "awaken-self-healing",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Awakens your powers of self healing" },
      { id: "paragraph1", label: "Paragraph 1", type: "textarea", value: "Your healing and transformation starts as soon as you become aware and honest with the negative charge a situation awakens in you. I embrace you without judgment where you are, whatever life challenges you face, and however they show up through longings, dilemnas, relationship issues, separation, loss, emotional overwhelm, feeling stuck or lost. Facing problems is not a problem. It is a part of the life journey." },
      { id: "paragraph2", label: "Paragraph 2", type: "textarea", value: "The experience is here to teach how to respond to situations so it serves your higher good and positive alignment. The magic is to learn to utilize these energies in your favor rather than against yourself." },
      { id: "closing", label: "Closing (bold)", type: "textarea", value: "Trust in yourself and in your power to create the life you want to live." },
    ],
    images: [{ id: "main", url: "/awaken-final.jpg", alt: "Awaken your powers" }],
  },
  {
    pageSlug: "home",
    sectionKey: "about-jane",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Hi, my name is Layla" },
      { id: "body", label: "Bio paragraph 1", type: "textarea", value: "I am a trained practitioner for shamanic energy medicine, Vitality Qigong and life coaching. My work bridges cultures, traditions, religions and identities. It holds unconditional respect of who you are and where you are from. I have studied some of the most integrative systems of healing to offer a unique and holistic approach that is altogether physical, emotional, mental and spiritual." },
      { id: "body2", label: "Bio paragraph 2", type: "textarea", value: "The techniques shaping my work reflect an attuned understanding of the complexities of the human life journey, whether it catalyzes a search for meaning and purpose, a desire to connect more deeply and authentically with others, or a need to heal and find peace amidst personal crises and identity struggles in cross-cultural and rapidly changing environments." },
      { id: "cta", label: "Link text", type: "text", value: "Read my full story →" },
    ],
    images: [{ id: "main", url: "/about.JPG", alt: "About Layla" }],
  },
  {
    pageSlug: "home",
    sectionKey: "levels",
    fields: [
      { id: "sectionTitle", label: "Section title", type: "text", value: "Healing Practices" },
      { id: "linkText", label: "Link text (e.g. Explore all services →)", type: "text", value: "Explore all services →" },
      { id: "card1Title", label: "Card 1 title", type: "text", value: "Join the Healing Space" },
      { id: "card1List", label: "Card 1 list (one per line)", type: "textarea", value: "Mindfulness Meditations\nShamanic Guided Journeys\nHealing Music and Sound Journeys\nEmpowering Wisdom & Rituals\nPodcasts Bridging Cultures & Identities" },
      { id: "card2Title", label: "Card 2 title", type: "text", value: "Holistic Coaching – TCK" },
      { id: "card2List", label: "Card 2 list (one per line)", type: "textarea", value: "Bridging Cultures: Empowerment Coaching for Global Souls\nFind Home Within: Resolve Conflicts of Dual Identities\nAligned Across Borders: Balance Expectations with Personal Growth\nBelong Beyond: Redefine Belonging and Shape your Family Values" },
      { id: "card3Title", label: "Card 3 title", type: "text", value: "Shamanic Healing" },
      { id: "card3List", label: "Card 3 list (one per line)", type: "textarea", value: "Bring Harmony in your Relationships\nFree from Traumas\nCultivate Joy and Peace with Yourself\nOpen your Heart to Greater Love\nRealize your Life Purpose & Mission" },
      { id: "card4Title", label: "Card 4 title", type: "text", value: "Vitality Qigong" },
      { id: "card4List", label: "Card 4 list (one per line)", type: "textarea", value: "Restore your Health & Vitality\nImprove Physical Mobility & Reduce Stress\nAchieve Emotional & Mental Balance\nAlign Your Mind, Body & Spirit\nAge with Serenity" },
    ],
    images: [
      { id: "card1", url: "/h1.JPG", alt: "Join the Healing Space" },
      { id: "card2", url: "/group.JPG", alt: "Holistic Coaching TCK" },
      { id: "card3", url: "/h2.JPG", alt: "Shamanic Healing" },
      { id: "card4", url: "/h3.JPG", alt: "Vitality Qigong" },
    ],
  },
  {
    pageSlug: "home",
    sectionKey: "blog-section",
    fields: [
      { id: "title", label: "Section title", type: "text", value: "Pathways to Inner Peace" },
    ],
    images: [],
  },
  {
    pageSlug: "home",
    sectionKey: "gallery-section",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Gallery" },
      { id: "subtitle", label: "Subtitle", type: "text", value: "Moments of practice" },
      { id: "videoUrl", label: "Video URL (optional)", type: "text", value: "" },
    ],
    images: [
      { id: "featured", url: "/awaken-final.jpg", alt: "Featured" },
      { id: "img1", url: "/layla2.JPG", alt: "Healing space" },
      { id: "img2", url: "/slide1.JPG", alt: "Reiki practice" },
      { id: "img3", url: "/about.JPG", alt: "Mindful presence" },
      { id: "img4", url: "/slide3.JPG", alt: "Calm healing space" },
      { id: "img5", url: "/main.JPG", alt: "Serene moment" },
      { id: "img6", url: "/slide4.JPG", alt: "Meditation" },
      { id: "img7", url: "/standing.JPG", alt: "Nature and stillness" },
      { id: "img8", url: "/yoga.JPG", alt: "Quiet reflection" },
    ],
  },
  {
    pageSlug: "home",
    sectionKey: "newsletter",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Subscribe to our newsletter & be informed about news and offers" },
      { id: "subtitle", label: "Subtitle", type: "text", value: "" },
    ],
    images: [],
  },
  {
    pageSlug: "home",
    sectionKey: "testimonial",
    fields: [
      { id: "sectionTitle", label: "Section heading", type: "text", value: "Words from clients" },
      { id: "quote1", label: "Quote 1", type: "textarea", value: "The healing session I had with Layla was astonishing and the experience is hard to describe in words. During the session I was able to get rid of a lot of mental and physical baggage and tension. I even shed a few tears without feeling any sadness. Layla gave me a very good and trusting feeling right from the start, which enabled me to let myself go. At the end of the session, Layla gave her assessment of my current situation and brought back an experience from my past that was spot on – all in all it was an amazing, almost surreal experience." },
      { id: "author1", label: "Author 1", type: "text", value: "Paul — Financial Consultant Switzerland" },
      { id: "quote2", label: "Quote 2", type: "textarea", value: "Working with Layla has been transformative. I came in feeling stuck between cultures and left with a clearer sense of who I am. Her approach is gentle yet powerful." },
      { id: "author2", label: "Author 2", type: "text", value: "Maria — Educator, Berlin" },
      { id: "quote3", label: "Quote 3", type: "textarea", value: "The Vitality Qigong sessions have helped me regain energy and ease in my body. I feel more grounded and at peace. Highly recommend." },
      { id: "author3", label: "Author 3", type: "text", value: "James — Consultant" },
    ],
    images: [],
  },
  {
    pageSlug: "global",
    sectionKey: "header",
    fields: [
      { id: "siteName", label: "Site name", type: "text", value: "Layla" },
      { id: "tagline", label: "Tagline", type: "text", value: "Reiki & Holistic Healing" },
    ],
    images: [{ id: "main", url: "/lotus.png", alt: "Logo" }],
  },
  {
    pageSlug: "global",
    sectionKey: "footer",
    fields: [
      { id: "title", label: "Title", type: "text", value: "Footer" },
      { id: "subtitle", label: "Subtitle", type: "text", value: "" },
      { id: "body", label: "Body / Description", type: "textarea", value: "Copyright, links, and footer text." },
    ],
    images: [],
  },
  {
    pageSlug: "global",
    sectionKey: "disclaimer",
    fields: [
      {
        id: "text",
        label: "Disclaimer text",
        type: "textarea",
        value: "Disclaimer: The services, practices, and information shared on this website are for educational and informational purposes only. They are not intended to diagnose, treat, cure, or prevent any medical or psychological condition, nor are they a substitute for professional medical advice, diagnosis, or treatment. Please consult with a licensed healthcare professional for any medical concerns. I am not a licensed medical practitioner or Heilpraktiker in Germany.",
      },
    ],
    images: [],
  },
  // About page – aligned with client/src/data/adminSectionContent.js
  { pageSlug: "about", sectionKey: "hero", fields: [{ id: "title", label: "Title", type: "text", value: "About Layla" }, { id: "subtitle", label: "Subtitle", type: "text", value: "Your journey starts here" }], images: [{ id: "main", url: "/about-cover-sec.jpg", alt: "About hero" }] },
  { pageSlug: "about", sectionKey: "intro", fields: [{ id: "title", label: "Heading", type: "text", value: "Hi, I'm Layla" }, { id: "body", label: "Intro paragraphs", type: "textarea", value: "Intro content for the about page." }], images: [] },
  { pageSlug: "about", sectionKey: "mission", fields: [{ id: "title", label: "Title", type: "text", value: "My mission" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Mission statement and values." }], images: [] },
  { pageSlug: "about", sectionKey: "approach-values", fields: [{ id: "title", label: "Title", type: "text", value: "Approach & Values" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "How I work and what I stand for." }], images: [] },
  { pageSlug: "about", sectionKey: "awaken", fields: [{ id: "title", label: "Title", type: "text", value: "Awakens your powers" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Awaken section content." }], images: [{ id: "main", url: "/awaken-final.jpg", alt: "Awaken image" }] },
  { pageSlug: "about", sectionKey: "vision", fields: [{ id: "title", label: "Title", type: "text", value: "Vision" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Vision for a harmonious world." }], images: [] },
  { pageSlug: "about", sectionKey: "training", fields: [{ id: "title", label: "Title", type: "text", value: "Training & Practice" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Background and modalities." }], images: [] },
  { pageSlug: "about", sectionKey: "journey", fields: [{ id: "title", label: "Title", type: "text", value: "Journey" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Personal journey narrative." }], images: [] },
  { pageSlug: "about", sectionKey: "testimonial", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Testimonial on about page." }, { id: "author", label: "Author", type: "text", value: "— Client" }], images: [{ id: "main", url: "/character.png", alt: "Avatar" }] },
  { pageSlug: "about", sectionKey: "cta", fields: [{ id: "title", label: "Title", type: "text", value: "Get in touch" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Call to action text." }], images: [] },
  // Services page – aligned with client/src/pages/ServicesPage.jsx (every field and image)
  { pageSlug: "services", sectionKey: "hero", fields: [{ id: "title", label: "Title", type: "text", value: "Services" }, { id: "subtitle", label: "Subtitle", type: "textarea", value: "Three paths to wholeness—Shamanic Healing, TCK Holistic Coaching, and Vitality Qigong. Each meets you where you are." }], images: [{ id: "main", url: "/awaken-final.jpg", alt: "Services hero" }] },
  { pageSlug: "services", sectionKey: "intro-quote", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Healing is not one size fits all. Whether you are drawn to the depth of shamanic work, the clarity of coaching, or the gentle power of Qigong—there is a path here for you." }], images: [] },
  {
    pageSlug: "services",
    sectionKey: "three-paths",
    fields: [
      { id: "title", label: "Section title", type: "text", value: "Three paths, one intention" },
      { id: "body", label: "Intro paragraph", type: "textarea", value: "Your wholeness. Each practice is rooted in respect for your autonomy and your inner knowing." },
      { id: "path1Id", label: "Path 1 ID (anchor slug)", type: "text", value: "shamanic-healing" },
      { id: "path1Title", label: "Path 1 title", type: "text", value: "Shamanic Healing" },
      { id: "path1Tagline", label: "Path 1 tagline", type: "text", value: "Ancient wisdom for modern transformation" },
      { id: "path1Description", label: "Path 1 description", type: "textarea", value: "Shamanic healing reaches beyond the everyday mind to work with the deeper layers of your being. Through guided journeys, ritual, and the support of ancestral wisdom, we address what holds you back—whether that is old trauma, stuck patterns, or a sense of being disconnected from your path." },
      { id: "path1KeyPoints", label: "Path 1 key points (one per line)", type: "textarea", value: "Bring harmony in your relationships\nFree from traumas\nCultivate joy and peace with yourself\nOpen your heart to greater love\nRealize your life purpose & mission" },
      { id: "path1Quote", label: "Path 1 quote", type: "textarea", value: "The journey inward is the first step toward healing the world we carry inside." },
      { id: "path1WhoItsFor", label: "Path 1 who it's for", type: "textarea", value: "Anyone ready to go beyond talk-based therapy and engage with symbol, story, and the unseen. Especially supportive when you feel called to release the past, reclaim your power, or align with a clearer sense of purpose." },
      { id: "path1Offerings", label: "Path 1 offerings (one per line)", type: "textarea", value: "Mindfulness meditations\nShamanic guided journeys\nHealing music and sound journeys\nEmpowering wisdom & rituals\nPodcasts bridging cultures & identities" },
      { id: "path2Id", label: "Path 2 ID (anchor slug)", type: "text", value: "tck-coaching" },
      { id: "path2Title", label: "Path 2 title", type: "text", value: "TCK Holistic Coaching" },
      { id: "path2Tagline", label: "Path 2 tagline", type: "text", value: "Find home within—wherever you are" },
      { id: "path2Description", label: "Path 2 description", type: "textarea", value: "Third culture kids and global nomads often carry a unique set of gifts and challenges: rich perspectives, adaptability, and at times a deep question of where they belong. This coaching is designed to honor your whole story—every culture, every move, every identity—and help you build a life that feels authentically yours." },
      { id: "path2KeyPoints", label: "Path 2 key points (one per line)", type: "textarea", value: "Bridging cultures: empowerment coaching for global souls\nFind home within: resolve conflicts of dual identities\nAligned across borders: balance expectations with personal growth\nGrow your global roots: reconcile culture differences, harmonize relationships\nBelong beyond: redefine belonging and shape your family values\nFind your voice: cultivate self-expression and authenticity" },
      { id: "path2Quote", label: "Path 2 quote", type: "textarea", value: "You don't have to choose one culture. You get to integrate them all." },
      { id: "path2WhoItsFor", label: "Path 2 who it's for", type: "textarea", value: "TCKs, expats, repats, and anyone who has lived between worlds and wants to make sense of their identity, relationships, and choices without having to choose one box." },
      { id: "path2Offerings", label: "Path 2 offerings (one per line)", type: "textarea", value: "One-to-one coaching sessions\nIdentity and belonging work\nFamily and relationship navigation\nLife transitions and repatriation\nIntegration of multiple cultural narratives" },
      { id: "path3Id", label: "Path 3 ID (anchor slug)", type: "text", value: "vitality-qigong" },
      { id: "path3Title", label: "Path 3 title", type: "text", value: "Vitality Qigong" },
      { id: "path3Tagline", label: "Path 3 tagline", type: "text", value: "Restore flow. Restore life." },
      { id: "path3Description", label: "Path 3 description", type: "textarea", value: "Vitality Qigong is a branch of Chinese medicine that uses movement, breath, and intention to support the body's natural ability to heal. Unlike exercise alone, it works with the subtle energy (qi) that animates your systems—helping to clear blockages, strengthen weak areas, and restore a sense of ease and vitality." },
      { id: "path3KeyPoints", label: "Path 3 key points (one per line)", type: "textarea", value: "Restore your health & vitality\nImprove physical mobility & reduce stress\nAchieve emotional & mental balance\nAlign your mind, body & spirit\nAge with serenity" },
      { id: "path3Quote", label: "Path 3 quote", type: "textarea", value: "The body knows how to heal. Sometimes it just needs the right conditions." },
      { id: "path3WhoItsFor", label: "Path 3 who it's for", type: "textarea", value: "Anyone seeking to support their health in a holistic way—whether you are recovering from illness, managing stress, or simply want to feel more alive, grounded, and at peace in your body." },
      { id: "path3Offerings", label: "Path 3 offerings (one per line)", type: "textarea", value: "Gentle movement and breath practices\nEnergy assessment and balancing\nPrescription exercises for your condition\nStress relief and immune support\nLong-term wellness and aging well" },
    ],
    images: [
      { id: "path1", url: "/h2.JPG", alt: "Shamanic healing practice" },
      { id: "path2", url: "/group.JPG", alt: "Holistic coaching for TCKs" },
      { id: "path3", url: "/h3.JPG", alt: "Vitality Qigong practice" },
    ],
  },
  { pageSlug: "services", sectionKey: "how-to-choose", fields: [{ id: "title", label: "Section title", type: "text", value: "Not sure which path?" }, { id: "body", label: "Body", type: "textarea", value: "Many clients start with a single modality and later weave in another. When you get in touch, we can have a short conversation about what you're drawn to. There's no wrong door." }, { id: "linkText", label: "Button / link text", type: "text", value: "Let's talk" }], images: [] },
  { pageSlug: "services", sectionKey: "at-a-glance", fields: [{ id: "title", label: "Section title", type: "text", value: "At a glance" }, { id: "blogSlug1", label: "Blog post 1 slug", type: "text", value: "" }, { id: "blogSlug2", label: "Blog post 2 slug", type: "text", value: "" }, { id: "blogSlug3", label: "Blog post 3 slug", type: "text", value: "" }], images: [] },
  { pageSlug: "services", sectionKey: "cta", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Your healing journey is yours to shape. I'm here to walk it with you." }, { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" }], images: [] },
  // Gallery page
  // Gallery page – structure matches Admin Dashboard > Gallery sections and attached design
  { pageSlug: "gallery", sectionKey: "hero", fields: [{ id: "scriptName", label: "Script name (e.g. Layla)", type: "text", value: "Layla" }, { id: "title", label: "Title", type: "text", value: "Gallery" }, { id: "subtitle", label: "Subtitle", type: "textarea", value: "Moments of peace, presence, and the path of healing" }], images: [{ id: "main", url: "/layla3.JPG", alt: "Gallery hero" }] },
  { pageSlug: "gallery", sectionKey: "intro-quote", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Every moment holds the possibility of peace. These images are glimpses from that journey—spaces, nature, and the quiet practice of coming home to oneself." }], images: [] },
  { pageSlug: "gallery", sectionKey: "healing-spaces", fields: [{ id: "title", label: "Section title", type: "text", value: "Healing Spaces" }, { id: "subtitle", label: "Subtitle", type: "text", value: "Where inner work meets outer calm" }], images: [{ id: "img1", url: "/layla3.JPG", alt: "Healing space" }, { id: "img2", url: "/slide1.JPG", alt: "Reiki practice" }, { id: "img3", url: "/slide3.JPG", alt: "Calm room" }, { id: "img4", url: "/about.JPG", alt: "Presence" }, { id: "img5", url: "/main.JPG", alt: "Serene moment" }] },
  { pageSlug: "gallery", sectionKey: "nature-stillness", fields: [{ id: "label", label: "Small label (uppercase)", type: "text", value: "Moments of calm" }, { id: "title", label: "Section title", type: "text", value: "Nature & Stillness" }, { id: "subtitle", label: "Subtitle", type: "text", value: "Finding calm in the world around us" }], images: [{ id: "img1", url: "/IMG_0620.JPG", alt: "Calm in nature" }, { id: "img2", url: "/IMG_3028.JPG", alt: "Quiet moment" }, { id: "img3", url: "/IMG_6293.JPG", alt: "Stillness" }, { id: "img4", url: "/IMG_6330.JPG", alt: "Peaceful presence" }] },
  { pageSlug: "gallery", sectionKey: "practice-presence", fields: [{ id: "title", label: "Section title", type: "text", value: "Practice & Presence" }, { id: "subtitle", label: "Subtitle", type: "text", value: "The art of showing up—fully and gently" }], images: [{ id: "img1", url: "/slide1.JPG", alt: "Practice" }, { id: "img2", url: "/slide3.JPG", alt: "Focus" }, { id: "img3", url: "/service1.JPG", alt: "Energy" }, { id: "img4", url: "/standing4.JPG", alt: "Flow" }, { id: "img5", url: "/slide2.JPG", alt: "Presence" }] },
  { pageSlug: "gallery", sectionKey: "cta", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Every moment holds the possibility of peace." }, { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" }], images: [] },
  // Blog page
  // Blog page – structure matches Admin Dashboard > Blog and attached design
  { pageSlug: "blog", sectionKey: "hero", fields: [{ id: "scriptName", label: "Script name (e.g. Layla)", type: "text", value: "Layla" }, { id: "title", label: "Title", type: "text", value: "Blog" }, { id: "subtitle", label: "Subtitle", type: "textarea", value: "Reflections on healing, presence, and the path to inner peace" }], images: [{ id: "main", url: "/slide1.JPG", alt: "Blog hero" }] },
  { pageSlug: "blog", sectionKey: "topics", fields: [{ id: "label", label: "Strip label", type: "text", value: "Topics we explore" }, { id: "topicsList", label: "Topics (one per line)", type: "textarea", value: "Mindfulness\nFreedom\nEnergy work\nPractice\nCoaching\nVitality\nResilience" }], images: [] },
  { pageSlug: "blog", sectionKey: "intro-quote", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Words from the heart, for the heart. Here you'll find thoughts on Reiki, mindfulness, third culture life, and the art of coming home to yourself." }], images: [] },
  { pageSlug: "blog", sectionKey: "featured", fields: [{ id: "label", label: "Section label", type: "text", value: "Featured" }, { id: "featuredSlug", label: "Featured blog slug (stable – post still shows when you change title)", type: "text", value: "power-of-mindful-healing" }, { id: "featuredPostTitle", label: "Or by title (fallback if slug empty)", type: "text", value: "" }], images: [{ id: "main", url: "/yoga.JPG", alt: "Featured post image (override)" }] },
  { pageSlug: "blog", sectionKey: "latest", fields: [{ id: "title", label: "Section title", type: "text", value: "Latest stories" }, { id: "latestSlug1", label: "Latest post 1 slug (stable)", type: "text", value: "finding-home-within-tck-journey" }, { id: "latestPostTitle1", label: "Or post 1 by title (fallback)", type: "text", value: "" }, { id: "latestSlug2", label: "Latest post 2 slug (stable)", type: "text", value: "reiki-and-emotional-release" }, { id: "latestPostTitle2", label: "Or post 2 by title (fallback)", type: "text", value: "" }], images: [{ id: "latest1", url: "/group.JPG", alt: "Latest post 1" }, { id: "latest2", url: "/slide3.JPG", alt: "Latest post 2" }] },
  { pageSlug: "blog", sectionKey: "divider", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Healing is not something we do so much as something we allow." }, { id: "attribution", label: "Attribution", type: "text", value: "— From the blog" }], images: [] },
  { pageSlug: "blog", sectionKey: "more", fields: [{ id: "title", label: "Section title", type: "text", value: "More reflections" }, { id: "moreSlugs", label: "Blog slugs for More section (one per line – stable when you change titles)", type: "textarea", value: "cultivating-joy-through-practice\nbridging-cultures-with-compassion\nsound-and-silence-in-healing" }, { id: "morePostTitles", label: "Or by titles, one per line (fallback)", type: "textarea", value: "" }], images: [] },
  { pageSlug: "blog", sectionKey: "author", fields: [{ id: "title", label: "Section title", type: "text", value: "Why I write" }, { id: "paragraph1", label: "Paragraph 1", type: "textarea", value: "This blog is a space where I share what I learn from my clients, my practice, and the journey of bridging cultures and healing. I hope these words meet you where you are and remind you that you are not alone on the path." }, { id: "paragraph2", label: "Paragraph 2", type: "textarea", value: "Here I write about presence, third-culture identity, and the small shifts that open the door to wholeness. Whether you are new to energy work or deepening a long-standing practice, these reflections are offered with care and respect for your own pace." }, { id: "paragraph3", label: "Paragraph 3", type: "textarea", value: "This space continues an exploration of rooted awareness, liminal belonging, and the quiet adjustments that invite integration." }, { id: "linkText", label: "Link text", type: "text", value: "More about me →" }], images: [{ id: "main", url: "/about.JPG", alt: "Layla" }] },
  { pageSlug: "blog", sectionKey: "cta", fields: [{ id: "title", label: "Section title", type: "text", value: "Stay in the loop" }, { id: "body", label: "Body", type: "textarea", value: "New reflections on healing and presence. No spam, only heart." }, { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" }], images: [] },
  // Contact page
  { pageSlug: "contact", sectionKey: "hero", fields: [{ id: "title", label: "Title", type: "text", value: "Contact" }, { id: "subtitle", label: "Subtitle", type: "text", value: "Get in touch" }], images: [{ id: "main", url: "/main4.JPG", alt: "Contact hero" }] },
  { pageSlug: "contact", sectionKey: "contact-methods", fields: [{ id: "title", label: "Title", type: "text", value: "Contact methods" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Email, phone, location." }], images: [] },
  { pageSlug: "contact", sectionKey: "form", fields: [{ id: "title", label: "Title", type: "text", value: "Send a message" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Form intro and interest options." }], images: [] },
  { pageSlug: "contact", sectionKey: "how-it-works", fields: [{ id: "title", label: "Title", type: "text", value: "How it works" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Process after you reach out." }], images: [] },
  { pageSlug: "contact", sectionKey: "faq", fields: [{ id: "title", label: "Title", type: "text", value: "FAQ" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Frequently asked questions." }], images: [] },
  { pageSlug: "contact", sectionKey: "office", fields: [{ id: "title", label: "Title", type: "text", value: "Office hours & map" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Opening hours and map embed." }], images: [] },
  // Availability page
  { pageSlug: "availability", sectionKey: "intro", fields: [{ id: "title", label: "Page title", type: "text", value: "Availability" }, { id: "body", label: "Demo text", type: "textarea", value: "Book a session or view available slots." }], images: [] },
  { pageSlug: "availability", sectionKey: "calendar", fields: [{ id: "title", label: "Title", type: "text", value: "Calendar & time slots" }, { id: "subtitle", label: "Subtitle", type: "text", value: "" }, { id: "body", label: "Body / Description", type: "textarea", value: "Calendar settings and copy." }], images: [] },
  // Events page – section titles and copy (dynamic)
  { pageSlug: "events", sectionKey: "hero", fields: [{ id: "title", label: "Title", type: "text", value: "Events" }, { id: "subtitle", label: "Subtitle", type: "text", value: "Circles, workshops, and gatherings—in person and online" }], images: [{ id: "main", url: "/slide1.JPG", alt: "Events hero" }] },
  { pageSlug: "events", sectionKey: "intro-quote", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Coming together in circle reminds us we are not alone on the path. Here you can learn, practice, and connect." }], images: [] },
  { pageSlug: "events", sectionKey: "upcoming", fields: [{ id: "label", label: "Label", type: "text", value: "What's on" }, { id: "title", label: "Title", type: "text", value: "Upcoming events" }, { id: "empty", label: "Empty message", type: "textarea", value: "New events will be announced soon. Stay in touch via the newsletter or contact." }], images: [] },
  { pageSlug: "events", sectionKey: "divider", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Every gathering leaves a trace. Here are some we've shared." }], images: [] },
  { pageSlug: "events", sectionKey: "past", fields: [{ id: "label", label: "Label", type: "text", value: "Archive" }, { id: "title", label: "Title", type: "text", value: "Past events" }], images: [] },
  { pageSlug: "events", sectionKey: "cta", fields: [{ id: "title", label: "Title", type: "text", value: "Stay in the loop" }, { id: "body", label: "Body", type: "textarea", value: "Get notified about new circles, workshops, and online events." }, { id: "cta", label: "Button text", type: "text", value: "Get in touch" }], images: [] },
  // Membership page – section titles and copy (dynamic)
  { pageSlug: "membership", sectionKey: "hero", fields: [{ id: "title", label: "Title", type: "text", value: "Membership" }, { id: "subtitle", label: "Subtitle", type: "text", value: "The Healing Space—meditations, music, rituals, and podcasts. Grow at your own pace with tiered access." }], images: [{ id: "main", url: "/awaken-final.jpg", alt: "Membership hero" }] },
  { pageSlug: "membership", sectionKey: "intro-quote", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "A space where you can return again and again—for a few minutes of stillness or a deeper dive into practice. No pressure, only presence." }], images: [] },
  { pageSlug: "membership", sectionKey: "healing-space", fields: [{ id: "label", label: "Label", type: "text", value: "The Healing Space" }, { id: "title", label: "Title", type: "text", value: "What's inside" }, { id: "body", label: "Body", type: "textarea", value: "Content is being created from April to August. The space will include:" }], images: [] },
  { pageSlug: "membership", sectionKey: "tiers", fields: [{ id: "label", label: "Label", type: "text", value: "Clear progression" }, { id: "title", label: "Title", type: "text", value: "Tiered membership" }, { id: "body", label: "Body", type: "textarea", value: "Choose the level that fits your practice. Upgrade or downgrade anytime." }], images: [] },
  { pageSlug: "membership", sectionKey: "products", fields: [{ id: "label", label: "Label", type: "text", value: "One-time purchase" }, { id: "title", label: "Title", type: "text", value: "Individual products" }, { id: "body", label: "Body", type: "textarea", value: "Prefer to buy single items? Audio and video courses will be available without a membership." }], images: [] },
  { pageSlug: "membership", sectionKey: "cta", fields: [{ id: "quote", label: "Quote", type: "textarea", value: "The Healing Space will meet you where you are. Questions? Let's talk." }, { id: "cta", label: "Button text", type: "text", value: "Get in touch" }], images: [] },
];

// Services – aligned with client/src/data/servicesData.js (SERVICES)
const services = [
  {
    order: 1,
    id: "shamanic-healing",
    title: "Shamanic Healing",
    tagline: "Ancient wisdom for modern transformation",
    image: "/h2.JPG",
    imageSecondary: "/slide1.JPG",
    imageAlt: "Shamanic healing practice",
    keyPoints: [
      "Bring harmony in your relationships",
      "Free from traumas",
      "Cultivate joy and peace with yourself",
      "Open your heart to greater love",
      "Realize your life purpose & mission",
    ],
    offerings: [
      "Mindfulness meditations",
      "Shamanic guided journeys",
      "Healing music and sound journeys",
      "Empowering wisdom & rituals",
      "Podcasts bridging cultures & identities",
    ],
    description: "Shamanic healing reaches beyond the everyday mind to work with the deeper layers of your being. Through guided journeys, ritual, and the support of ancestral wisdom, we address what holds you back—whether that is old trauma, stuck patterns, or a sense of being disconnected from your path.",
    whoItsFor: "Anyone ready to go beyond talk-based therapy and engage with symbol, story, and the unseen. Especially supportive when you feel called to release the past, reclaim your power, or align with a clearer sense of purpose.",
    quote: "The journey inward is the first step toward healing the world we carry inside.",
    isActive: true,
  },
  {
    order: 2,
    id: "tck-coaching",
    title: "TCK Holistic Coaching",
    tagline: "Find home within—wherever you are",
    image: "/group.JPG",
    imageSecondary: "/main2.JPG",
    imageAlt: "Holistic coaching for TCKs",
    keyPoints: [
      "Bridging cultures: empowerment coaching for global souls",
      "Find home within: resolve conflicts of dual identities",
      "Aligned across borders: balance expectations with personal growth",
      "Grow your global roots: reconcile culture differences, harmonize relationships",
      "Belong beyond: redefine belonging and shape your family values",
      "Find your voice: cultivate self-expression and authenticity",
    ],
    offerings: [
      "One-to-one coaching sessions",
      "Identity and belonging work",
      "Family and relationship navigation",
      "Life transitions and repatriation",
      "Integration of multiple cultural narratives",
    ],
    description: "Third culture kids and global nomads often carry a unique set of gifts and challenges: rich perspectives, adaptability, and at times a deep question of where they belong. This coaching is designed to honor your whole story—every culture, every move, every identity—and help you build a life that feels authentically yours.",
    whoItsFor: "TCKs, expats, repats, and anyone who has lived between worlds and wants to make sense of their identity, relationships, and choices without having to choose one box.",
    quote: "You don't have to choose one culture. You get to integrate them all.",
    isActive: true,
  },
  {
    order: 3,
    id: "vitality-qigong",
    title: "Vitality Qigong",
    tagline: "Restore flow. Restore life.",
    image: "/h3.JPG",
    imageSecondary: "/yoga.JPG",
    imageAlt: "Vitality Qigong practice",
    keyPoints: [
      "Restore your health & vitality",
      "Improve physical mobility & reduce stress",
      "Achieve emotional & mental balance",
      "Align your mind, body & spirit",
      "Age with serenity",
    ],
    offerings: [
      "Gentle movement and breath practices",
      "Energy assessment and balancing",
      "Prescription exercises for your condition",
      "Stress relief and immune support",
      "Long-term wellness and aging well",
    ],
    description: "Vitality Qigong is a branch of Chinese medicine that uses movement, breath, and intention to support the body's natural ability to heal. Unlike exercise alone, it works with the subtle energy (qi) that animates your systems—helping to clear blockages, strengthen weak areas, and restore a sense of ease and vitality.",
    whoItsFor: "Anyone seeking to support their health in a holistic way—whether you are recovering from illness, managing stress, or simply want to feel more alive, grounded, and at peace in your body.",
    quote: "The body knows how to heal. Sometimes it just needs the right conditions.",
    isActive: true,
  },
];

// Blog posts – aligned with client/src/data/blogPosts.js (BLOG_POSTS)
const blogPosts = [
  {
    slug: "power-of-mindful-healing",
    title: "The Power of Mindful Healing",
    excerpt: "Discover how mindfulness and energy healing can work together to restore balance and bring peace to your daily life.",
    image: "/yoga.JPG",
    publishedAt: new Date("2026-03-15"),
    author: "Layla",
    category: "Mindfulness",
    body: [
      "Mindfulness and energy healing are not separate paths—they are two strands of the same thread. When we bring mindful awareness to our body and breath, we create space for the subtle energies that Reiki and other practices work with to flow more freely.",
      "In my practice, I have seen again and again how a few minutes of simple grounding—feet on the earth, breath in the belly—can soften resistance and allow a session to go deeper. The mind stops chasing the past or future and begins to rest in the present. From that place, healing is not something we \"do\" so much as something we allow.",
      "I invite you to experiment: before your next moment of intentional rest or healing, pause. Feel the weight of your body. Notice the air moving in and out. Then let the practice unfold from there. You may find that the quality of presence you bring matters as much as any technique.",
    ],
    isPublished: true,
  },
  {
    slug: "finding-home-within-tck-journey",
    title: "Finding Home Within: A TCK Journey",
    excerpt: "Exploring identity, belonging, and the unique path of third culture individuals toward self-acceptance and growth.",
    image: "/group.JPG",
    publishedAt: new Date("2026-03-08"),
    author: "Layla",
    category: "Third Culture",
    body: [
      "Third culture kids—those who grow up between worlds—often carry a deep question: Where do I belong? The answer, I have come to believe, is not a single place or culture, but a capacity to feel at home within yourself.",
      "Healing work with TCKs often touches on themes of rootlessness, loyalty to multiple cultures, and the grief of never fully \"fitting\" anywhere. These are not problems to be fixed; they are doorways. When we honor the complexity of your story instead of forcing it into one box, something shifts. You begin to carry home inside you.",
      "My own journey as someone who bridges cultures has taught me that belonging is not about geography. It is about being seen, and learning to see yourself with compassion. However scattered or mixed your roots feel, there is a place in you that is already whole.",
    ],
    isPublished: true,
  },
  {
    slug: "reiki-and-emotional-release",
    title: "Reiki and Emotional Release",
    excerpt: "Understanding how Reiki supports the release of stored emotions and supports your journey to emotional freedom.",
    image: "/slide3.JPG",
    publishedAt: new Date("2026-03-01"),
    author: "Layla",
    category: "Reiki",
    body: [
      "Emotions are energy. When we experience trauma, loss, or prolonged stress, that energy can become stuck in the body. Reiki works with the subtle energy field to gently encourage flow—and where energy moves again, old feelings often surface to be acknowledged and released.",
      "This does not mean that Reiki \"makes\" you emotional. It means it creates a safe container in which whatever is ready to surface can do so. Tears, sighs, memories, or simply a sense of lightness are all part of the same process: the body and spirit letting go of what no longer serves.",
      "If you have been carrying something for a long time, know that release can be gentle. You set the pace. Reiki meets you where you are and supports your system to do what it already knows how to do—heal.",
    ],
    isPublished: true,
  },
  {
    slug: "cultivating-joy-through-practice",
    title: "Cultivating Joy Through Practice",
    excerpt: "Simple rituals and practices to invite more joy, presence, and alignment into your mind, body, and spirit.",
    image: "/main.JPG",
    publishedAt: new Date("2026-02-22"),
    author: "Layla",
    category: "Practice",
    body: [
      "Joy is not something we wait for—it is something we cultivate. Small, daily practices can create a foundation of well-being that makes it easier to feel alive, present, and open to life.",
      "Morning gratitude, a few minutes of breathwork, or simply placing your hand on your heart and naming one thing you appreciate about yourself can shift the tone of your day. These are not grand gestures; they are gentle invitations to your nervous system that it is safe to soften.",
      "Over time, these practices build a kind of inner sanctuary. When difficulty comes—and it will—you have a place to return to. Joy then becomes less about peak moments and more about a steady, quiet sense that life is worth living.",
    ],
    isPublished: true,
  },
  {
    slug: "bridging-cultures-with-compassion",
    title: "Bridging Cultures with Compassion",
    excerpt: "How holistic coaching can help you honor multiple cultures and create a life that feels authentically yours.",
    image: "/about.JPG",
    publishedAt: new Date("2026-02-15"),
    author: "Layla",
    category: "Coaching",
    body: [
      "Living between cultures can feel like a constant negotiation. You may have learned to code-switch, to fit in here and there—but at some point, the question arises: Who am I when I am not performing? What do I actually want?",
      "Holistic coaching in this context is not about choosing one identity over another. It is about creating space to explore all the parts of you—the languages, the values, the loyalties—and finding a way of life that honors your whole story.",
      "Compassion is the key. So often we judge ourselves for not being \"enough\" of one thing or another. When we replace that judgment with curiosity and kindness, we can begin to design a life that feels true, not just acceptable.",
    ],
    isPublished: true,
  },
  {
    slug: "sound-and-silence-in-healing",
    title: "Sound and Silence in Healing",
    excerpt: "The role of healing music, guided journeys, and quiet reflection in deepening your connection to yourself.",
    image: "/equipment.JPG",
    publishedAt: new Date("2026-02-08"),
    author: "Layla",
    category: "Healing",
    body: [
      "Sound can carry us into states of deep relaxation and openness. Whether it is the resonance of a singing bowl, the rhythm of a drum, or the stillness between notes, our nervous system responds. In my sessions, I often weave in sound as a way to support the body to let go and the mind to settle.",
      "Equally important is silence. After sound, after words, there is often a space where something deeper can be heard—the inner voice, the breath, the subtle shift of energy. Learning to rest in that silence is itself a practice.",
      "Together, sound and silence mirror the rhythm of life: expression and rest, movement and stillness. When we allow both, we create conditions for healing that go beyond any single technique.",
    ],
    isPublished: true,
  },
  {
    slug: "shamanic-healing-ancient-wisdom",
    title: "Shamanic Healing: Ancient Wisdom for Modern Transformation",
    excerpt: "Explore how shamanic healing can help you release old stories, reconnect with your deeper self, and step into a more aligned life.",
    image: "/h2.JPG",
    publishedAt: new Date("2026-03-20"),
    author: "Layla",
    category: "Shamanic Healing",
    body: [
      "Shamanic healing is one of the oldest forms of healing on the planet, yet its wisdom speaks directly to our modern lives. Beneath the noise of daily demands, there is a deeper layer of being—made of stories, symbols, memories, and patterns that shape how we move through the world. Shamanic work invites us into that layer with intention and respect.",
      "In session, we may work with guided journeys, ritual, and connection to compassionate helping spirits or ancestral wisdom. Rather than analyzing your experiences only with the thinking mind, we enter a more imaginal, felt space. There, you can meet the parts of yourself that have been exiled, silenced, or weighed down by old trauma and expectation.",
      "Ancient wisdom does not mean escaping your life. It means seeing your life from a wider perspective—one where you are not broken, but in process. By honoring what your soul is asking for now, you can release what no longer serves you, reclaim your power, and move toward relationships, work, and daily rhythms that feel more true.",
      "If you feel drawn to shamanic healing, trust that impulse. It is often a sign that some deeper part of you is ready to be seen, heard, and welcomed home.",
    ],
    isPublished: true,
  },
  {
    slug: "tck-holistic-coaching-find-home-within",
    title: "TCK Holistic Coaching: Finding Home Within, Wherever You Are",
    excerpt: "For third culture kids and global souls who long for a sense of rootedness without having to choose just one place or identity.",
    image: "/group.JPG",
    publishedAt: new Date("2026-03-22"),
    author: "Layla",
    category: "Holistic Coaching",
    body: [
      "To grow up between cultures is to live in motion. Airports, new schools, shifting expectations—these experiences can create incredible adaptability, but they can also leave a quiet ache: Where do I truly belong? TCK holistic coaching is a space to bring that question into the light.",
      "In our work together, we explore the many layers of your story: the homes you have had, the languages you speak, the loyalties you hold, and the identities you have tried on to stay safe or be accepted. Instead of asking you to simplify or choose one box, we honor the complexity. Your multiplicity is not a problem—it is a resource.",
      "Coaching sessions weave together reflective conversation, somatic awareness, and practical tools for navigating relationships, work, and life transitions. We look at the patterns that keep you feeling split or \"too much\" and gently loosen them, so you can begin to feel more at home in your own body and choices.",
      "Finding home within does not mean you stop loving the cultures and people that shaped you. It means you carry them in a way that feels integrated, grounded, and kind to yourself—no matter where in the world you are.",
    ],
    isPublished: true,
  },
  {
    slug: "vitality-qigong-restore-flow-restore-life",
    title: "Vitality Qigong: Restore Flow, Restore Life",
    excerpt: "Discover how gentle movement, breath, and intention can support your body's natural ability to heal and help you feel more alive.",
    image: "/h3.JPG",
    publishedAt: new Date("2026-03-25"),
    author: "Layla",
    category: "Qigong",
    body: [
      "Vitality Qigong comes from a long lineage of Chinese medicine, where health is understood as the free flow of qi—life energy—through the body. When that flow is disrupted by stress, illness, or long-term tension, we may feel tired, anxious, or disconnected from our own bodies.",
      "Unlike intense exercise, Qigong uses gentle, repetitive movements, coordinated with breath and mindful attention. These practices are accessible to many different bodies and can be adapted to meet you exactly where you are. Over time, they help release stagnation, strengthen what feels depleted, and invite a sense of ease back into your system.",
      "In sessions and classes, we move slowly enough for you to feel what is happening inside: the warmth in your hands, the softening of your shoulders, the way your breath begins to deepen. This awareness is part of the medicine. As you learn to listen to your body with curiosity instead of criticism, your nervous system can shift out of constant survival mode.",
      "Restoring flow is not only about physical health. It is about remembering that you are allowed to feel supported, connected, and alive in your own skin. Qigong offers a path back to that remembering—one breath, one movement, one moment at a time.",
    ],
    isPublished: true,
  },
];

const galleryGroups = [
  {
    key: "healing-spaces",
    title: "Healing Spaces",
    images: [
      { src: "/layla3.JPG", alt: "Healing space", order: 0 },
      { src: "/slide1.JPG", alt: "Reiki practice", order: 1 },
      { src: "/slide3.JPG", alt: "Calm room", order: 2 },
    ],
  },
  {
    key: "nature-stillness",
    title: "Nature & Stillness",
    images: [
      { src: "/IMG_0620.JPG", alt: "Calm in nature", order: 0 },
      { src: "/IMG_3028.JPG", alt: "Quiet moment", order: 1 },
    ],
  },
  {
    key: "practice-presence",
    title: "Practice & Presence",
    images: [
      { src: "/slide1.JPG", alt: "Practice", order: 0 },
      { src: "/slide3.JPG", alt: "Focus", order: 1 },
    ],
  },
];

// About content – aligned with client/src/pages/AboutPage.jsx (single document for GET/PUT /about)
const aboutContent = {
  name: "Layla",
  tagline: "Holistic healing for empowered living",
  introTitle: "Hi, my name is Layla",
  introParagraphs: [
    "I am a trained practitioner for shamanic energy medicine, Vitality Qigong, and life coaching. My work bridges cultures, traditions, religions, and identities. It holds unconditional respect for who you are and where you are from.",
    "I have studied some of the most integrative systems of healing to offer a unique and holistic approach that is altogether physical, emotional, mental, and spiritual.",
    "The techniques shaping my work reflect an attuned understanding of the complexities of the human life journey—whether it catalyzes a search for meaning and purpose, a desire to connect more deeply and authentically with others, or a need to heal and find peace amidst personal crises and identity struggles in cross-cultural and rapidly changing environments.",
  ],
  introCtaText: "Explore my services",
  mission: {
    title: "My mission",
    quote: "My mission is to ignite self-empowerment and self-healing through quantum shifts of consciousness.",
    body: "I believe in the ripple effect of all things: one deep positive change in a person can create boundless positive outcome far beyond this one person. My approach is rooted in the consideration that you are a conscious and intelligent being with infinite potential and powers.",
  },
  approach: {
    title: "My approach",
    body: "My ethics and values are founded on the respect of your free choice and inner knowing of what is good for you. On that basis, it is a privilege to accompany you and witness your blossoming, your joy, your victories—and also to help you overcome sorrows, loss, hurts, and transcend struggles. Love and freedom are at the center of my practice.",
  },
  awaken: {
    title: "Awakens your powers of self healing",
    paragraphs: [
      "Your healing and transformation starts as soon as you become aware and honest with the negative charge a situation awakens in you. I embrace you without judgment where you are, whatever life challenges you face—whether they show up through longings, dilemmas, relationship issues, separation, loss, emotional overwhelm, or feeling stuck or lost. Facing problems is not a problem. It is part of the life journey.",
      "The experience is here to teach how to respond to situations so it serves your higher good and positive alignment. The magic is to learn to utilize these energies in your favor rather than against yourself.",
    ],
    closing: "Trust in yourself and in your power to create the life you want to live.",
  },
  vision: "I dream of a world where we all live together in harmony, where our hearts are so free that our whole being opens to a joyful, purposeful and accomplished path.",
  trainings: [
    "Shamanic energy medicine",
    "Vitality Qigong",
    "Life coaching & holistic coaching",
    "Bridging cultures & TCK support",
  ],
  trainingIntro: "My work is grounded in formal training and ongoing study across traditions that honor the whole person.",
  trainingSectionTitle: "Training & practice",
  values: [
    { title: "Respect", text: "Unconditional respect for who you are and where you are from. Your background, beliefs, and identity are honoured in every session, creating a foundation of safety and trust so you can open up fully." },
    { title: "Choice", text: "Your free choice and inner knowing guide the work we do together. I support your autonomy at every step—you decide what to explore, when to pause, and how far to go. Your intuition leads; I walk beside you." },
    { title: "Wholeness", text: "Physical, emotional, mental, and spiritual dimensions are all welcome. Healing is not limited to one layer; we attend to your whole being so that change can ripple through body, heart, mind, and spirit." },
    { title: "Presence", text: "I meet you where you are—no judgment, only space to heal and grow. Whatever you bring into the room is held with care. You are seen, heard, and accepted exactly as you are in this moment." },
  ],
  testimonial: {
    quote: "The healing session I had with Layla was astonishing and the experience is hard to describe in words. During the session I was able to get rid of a lot of mental and physical baggage and tension. I even shed a few tears without feeling any sadness. Layla gave me a very good and trusting feeling right from the start, which enabled me to let myself go. At the end of the session, Layla gave her assessment of my current situation and brought back an experience from my past that was spot on – all in all it was an amazing, almost surreal experience.",
    attribution: "Paul — Financial Consultant Switzerland",
  },
  testimonialSectionTitle: "What people are saying",
  journey: [
    { year: "Early path", title: "Across cultures", text: "Growing up between worlds sparked a lifelong interest in identity, belonging, and the many ways we heal." },
    { year: "Training", title: "Integrative systems", text: "Formal training in shamanic energy medicine, Vitality Qigong, and life coaching—each adding a layer to a holistic practice." },
    { year: "Today", title: "Practice & teaching", text: "Working with individuals and groups, bridging traditions and cultures in service of wholeness and empowerment." },
  ],
  journeySectionTitle: "My path",
  ctaQuote: "Create the life you want to live.",
  ctaBody: "Ready to take the first step? I'd be honored to walk alongside you.",
  ctaButtonLabel: "Get in touch",
};

const contactContent = {
  heroImage: "/slide3.JPG",
  heroScriptName: "Layla",
  heroTitle: "Contact",
  heroSubtitle: "Every conversation starts with a single step. I'm here when you're ready.",
  introQuote: "\"Reaching out takes courage. Whether you're curious about a first session, have a question, or simply want to say hello—this is a safe space.\"",
  waysToConnectTitle: "Ways to connect",
  waysToConnectSubtitle: "Choose what feels right for you—email, phone, or the form below.",
  contactMethods: [
    { title: "Email", description: "For inquiries, bookings, or a first hello.", value: "E-mail@mail.com", href: "mailto:E-mail@mail.com", iconKey: "envelope" },
    { title: "Phone", description: "Prefer to talk? Leave a message and I'll call back.", value: "+1 234 567 8900", href: "tel:+12345678900", iconKey: "phone" },
    { title: "Location", description: "In-person sessions by appointment.", value: "Addition Street 2, 84", href: null, iconKey: "location" },
  ],
  sendMessageTitle: "Send a message",
  sendMessageSubtitle: "Fill in the form below and I'll get back to you as soon as I can.",
  interestOptions: [
    "Reiki & Energy Healing",
    "Holistic Coaching",
    "TCK & Cross-Cultural Support",
    "Shamanic Healing",
    "Vitality Qigong",
    "General inquiry",
  ],
  faqSectionTitle: "Common questions",
  faq: [
    { q: "How soon will I hear back?", a: "I aim to respond within 24–48 hours." },
    { q: "Do you offer online sessions?", a: "Yes. Many sessions can be held online via video call." },
  ],
  availabilityTitle: "Availability",
  availabilityBody: "Book a session at a time that suits you. Choose a date and slot in the calendar below.",
  availabilityFootnote: "All times are flexible by prior arrangement.",
  officeHoursTitle: "Office hours",
  officeHours: [
    { day: "Monday – Friday", time: "9:00 – 18:00" },
    { day: "Saturday", time: "By appointment" },
    { day: "Sunday", time: "Closed" },
  ],
  socialText: "Follow along for inspiration and updates.",
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/laylanur.co" },
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "x", url: "https://x.com" },
    { platform: "youtube", url: "https://youtube.com" },
  ],
};

const siteSettings = [
  { key: "header", value: { siteName: "Layla", tagline: "Reiki & Holistic Healing", logoUrl: "/lotus.png", phone: "+1 234 567 8900", ctaLabel: "Get in touch" } },
  { key: "footer", value: { siteName: "Layla", visionText: "I dream of a world where we all live together in harmony...", copyrightText: "© 2026 REIKI | All Rights Reserved" } },
  { key: "availability", value: { pageTitle: "Choose a time", introText: "Select a date and slot below. This is a demo and does not submit a real booking.", monthLabel: "February 2026", timeSlots: ["9:00 AM", "9:30 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"] } },
];

const eventsSeed = [
  { id: "spring-circle", title: "Spring Equinox Healing Circle", date: new Date("2026-03-20"), time: "18:00", location: "Online", type: "Workshop", description: "Join a guided circle to honor the equinox—meditation, intention-setting, and gentle movement to welcome the new season.", image: "/slide2.JPG", cta: "Register", status: "upcoming" },
  { id: "qigong-intro", title: "Introduction to Vitality Qigong", date: new Date("2026-04-05"), time: "10:00", location: "In person · Berlin", type: "Class", description: "A gentle introduction to Qigong: breath, posture, and flow. No experience needed.", image: "/yoga.JPG", cta: "Book your spot", status: "upcoming" },
  { id: "tck-talk", title: "TCK & Identity: Finding Home Within", date: new Date("2026-04-18"), time: "19:00", location: "Online", type: "Talk", description: "An open conversation about third-culture identity, belonging, and building a life that feels authentically yours.", image: "/group.JPG", cta: "Join", status: "upcoming" },
  { id: "winter-sound", title: "Winter Sound Journey", date: new Date("2026-02-15"), location: "Online", type: "Workshop", description: "A deep listening experience with healing music and guided meditation for the winter season.", image: "/slide5.JPG", status: "past" },
  { id: "new-year-intention", title: "New Year Intention Setting", date: new Date("2026-01-08"), location: "Online", type: "Workshop", description: "Reflect on the year past and set clear, heart-centered intentions for the year ahead.", image: "/slide6.JPG", status: "past" },
  { id: "shamanic-intro", title: "Introduction to Shamanic Journeying", date: new Date("2025-12-12"), location: "In person · Berlin", type: "Workshop", description: "Learn the basics of shamanic journeying—drum, intention, and safe practice.", image: "/h2.JPG", status: "past" },
];

const membershipTiersSeed = [
  { id: "basic", name: "Basic", price: 11, period: "month", tagline: "Meditations & music", description: "Unlimited access to themed meditations and healing music. Your daily dose of calm and clarity.", features: ["Series of meditations by theme (audio)", "Mantras and healing music (audio)", "Unlimited streaming & downloads", "New content added regularly"], cta: "Join Basic", highlighted: false, order: 1 },
  { id: "standard", name: "Standard", price: 22, period: "month", tagline: "Adds rituals, recipes & podcasts", description: "Everything in Basic, plus clearing rituals, cleansing recipes, and podcasts for deeper practice.", features: ["Everything in Basic", "Recipes for clearing & cleansing (video/audio)", "Podcasts (video/audio)", "Rituals and guided practices", "Unlimited streaming & downloads"], cta: "Join Standard", highlighted: true, order: 2 },
  { id: "premium", name: "Premium", price: 33, period: "month", tagline: "Exclusive live experiences", description: "The full experience: exclusive workshops, live Q&A, and small-group calls with direct support.", features: ["Everything in Standard", "Exclusive live workshops", "Live Q&A sessions", "Small group calls", "Priority support", "Early access to new content"], cta: "Join Premium", highlighted: false, order: 3 },
];

const healingSpaceSeed = [
  { id: "meditations", title: "Meditations by theme", type: "Audio", description: "Guided series organized by intention—sleep, grounding, release, compassion, and more.", order: 1 },
  { id: "mantras-music", title: "Mantras & healing music", type: "Audio", description: "Sound journeys, mantras, and instrumental pieces to support your practice.", order: 2 },
  { id: "recipes", title: "Recipes for clearing & cleansing", type: "Video / Audio", description: "Rituals and simple practices for clearing energy and cleansing your space.", order: 3 },
  { id: "podcasts", title: "Podcasts", type: "Video / Audio", description: "Conversations on healing, identity, and the path to wholeness.", order: 4 },
];

const membershipProductsSeed = [
  { id: "meditation-course", title: "Foundations of Meditation", type: "Audio course", description: "A step-by-step audio course to build a steady meditation practice.", priceLabel: "One-time purchase", order: 1 },
  { id: "single-meditations", title: "Single meditations", type: "Audio", description: "Individual themed meditations available without a membership.", priceLabel: "Per track", order: 2 },
  { id: "qigong-course", title: "Vitality Qigong at home", type: "Video course", description: "Video course for gentle movement, breath, and energy practice.", priceLabel: "One-time purchase", order: 3 },
];

const membershipMetaSeed = {
  techAndHosting: {
    canDevelopLater: "Yes. Membership can be developed in phases. You can launch the site and events first, then add the Healing Space and tiered membership once your material is ready (e.g. from April–August).",
    audioHosting: "For audio similar to Podbean—unlimited access, streaming, and storage without surprise future costs—options include: dedicated podcast/audio platforms with clear pricing (e.g. unlimited hosting plans), or self-hosted storage (e.g. S3/Cloudflare R2) with a fixed monthly cost and a member area that streams from your own bucket.",
    transparency: "We can structure pricing so that your membership fees are the only recurring cost; any hosting or platform fees can be fixed and documented so you have full transparency and no hidden future costs.",
  },
  features: [
    "Member-only area (login, dashboard)",
    "Tiered access (Basic / Standard / Premium) with content gating",
    "Audio & video streaming with unlimited playback for members",
    "Downloads (optional) for offline use",
    "One-time product store (individual meditations, courses)",
    "Recurring billing (monthly membership) with clear renewal and cancel flow",
    "Email integration (welcome, reminders, new content)",
    "Optional: community space (forum or comments) for Premium",
    "Analytics: what content is used most, without invading privacy",
  ],
};

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  await ContentSection.deleteMany({});
  await ContentSection.insertMany(contentSections);
  console.log("ContentSection: seeded", contentSections.length, "sections");

  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log("Service: seeded", services.length);

  await BlogPost.deleteMany({});
  await BlogPost.insertMany(blogPosts);
  console.log("BlogPost: seeded", blogPosts.length);

  await GalleryGroup.deleteMany({});
  await GalleryGroup.insertMany(galleryGroups);
  console.log("GalleryGroup: seeded", galleryGroups.length);

  await AboutContent.deleteMany({});
  await AboutContent.create(aboutContent);
  console.log("AboutContent: seeded 1 doc");

  await ContactContent.deleteMany({});
  await ContactContent.create(contactContent);
  console.log("ContactContent: seeded 1 doc");

  for (const s of siteSettings) {
    await SiteSetting.findOneAndUpdate({ key: s.key }, { value: s.value }, { upsert: true });
  }
  console.log("SiteSetting: seeded", siteSettings.length, "keys");

  await Event.deleteMany({});
  await Event.insertMany(eventsSeed);
  console.log("Event: seeded", eventsSeed.length);

  await MembershipTier.deleteMany({});
  await MembershipTier.insertMany(membershipTiersSeed);
  console.log("MembershipTier: seeded", membershipTiersSeed.length);

  await HealingSpaceItem.deleteMany({});
  await HealingSpaceItem.insertMany(healingSpaceSeed);
  console.log("HealingSpaceItem: seeded", healingSpaceSeed.length);

  await MembershipProduct.deleteMany({});
  await MembershipProduct.insertMany(membershipProductsSeed);
  console.log("MembershipProduct: seeded", membershipProductsSeed.length);

  await MembershipMeta.deleteMany({});
  await MembershipMeta.create(membershipMetaSeed);
  console.log("MembershipMeta: seeded 1 doc");

  await mongoose.disconnect();
  console.log("Seed complete. Disconnected.");
}

seed().catch((err) => {
  console.error("Seed failed:", err.message || err);
  if (err.message && err.message.includes("ECONNREFUSED")) {
    console.error(
      "Tip: Ensure MongoDB is reachable. If using Atlas, set MONGODB_URI in server/.env. If local, start MongoDB (e.g. mongod)."
    );
  }
  process.exit(1);
});
