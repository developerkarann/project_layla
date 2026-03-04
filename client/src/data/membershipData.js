/**
 * Membership: tiers, healing space content, individual products, and tech/hosting notes.
 */

export const MEMBERSHIP_TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: 11,
    period: "month",
    tagline: "Meditations & music",
    description: "Unlimited access to themed meditations and healing music. Your daily dose of calm and clarity.",
    features: [
      "Series of meditations by theme (audio)",
      "Mantras and healing music (audio)",
      "Unlimited streaming & downloads",
      "New content added regularly",
    ],
    cta: "Join Basic",
    highlighted: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 22,
    period: "month",
    tagline: "Adds rituals, recipes & podcasts",
    description: "Everything in Basic, plus clearing rituals, cleansing recipes, and podcasts for deeper practice.",
    features: [
      "Everything in Basic",
      "Recipes for clearing & cleansing (video/audio)",
      "Podcasts (video/audio)",
      "Rituals and guided practices",
      "Unlimited streaming & downloads",
    ],
    cta: "Join Standard",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 33,
    period: "month",
    tagline: "Exclusive live experiences",
    description: "The full experience: exclusive workshops, live Q&A, and small-group calls with direct support.",
    features: [
      "Everything in Standard",
      "Exclusive live workshops",
      "Live Q&A sessions",
      "Small group calls",
      "Priority support",
      "Early access to new content",
    ],
    cta: "Join Premium",
    highlighted: false,
  },
];

/** Healing Space content categories (content created April–August) */
export const HEALING_SPACE_CONTENT = [
  {
    id: "meditations",
    title: "Meditations by theme",
    type: "Audio",
    description: "Guided series organized by intention—sleep, grounding, release, compassion, and more.",
  },
  {
    id: "mantras-music",
    title: "Mantras & healing music",
    type: "Audio",
    description: "Sound journeys, mantras, and instrumental pieces to support your practice.",
  },
  {
    id: "recipes",
    title: "Recipes for clearing & cleansing",
    type: "Video / Audio",
    description: "Rituals and simple practices for clearing energy and cleansing your space.",
  },
  {
    id: "podcasts",
    title: "Podcasts",
    type: "Video / Audio",
    description: "Conversations on healing, identity, and the path to wholeness.",
  },
];

/** Individual products (one-time purchase): audio and video */
export const INDIVIDUAL_PRODUCTS = [
  {
    id: "meditation-course",
    title: "Foundations of Meditation",
    type: "Audio course",
    description: "A step-by-step audio course to build a steady meditation practice.",
    price: "One-time purchase",
  },
  {
    id: "single-meditations",
    title: "Single meditations",
    type: "Audio",
    description: "Individual themed meditations available without a membership.",
    price: "Per track",
  },
  {
    id: "qigong-course",
    title: "Vitality Qigong at home",
    type: "Video course",
    description: "Video course for gentle movement, breath, and energy practice.",
    price: "One-time purchase",
  },
];

/**
 * Technology & hosting: answers to "Can membership be hosted? Developed later?
 * Podbean-like: unlimited access, streaming, size, no hidden future costs."
 */
export const TECH_AND_HOSTING = {
  canDevelopLater:
    "Yes. Membership can be developed in phases. You can launch the site and events first, then add the Healing Space and tiered membership once your material is ready (e.g. from April–August).",
  audioHosting:
    "For audio similar to Podbean—unlimited access, streaming, and storage without surprise future costs—options include: dedicated podcast/audio platforms with clear pricing (e.g. unlimited hosting plans), or self-hosted storage (e.g. S3/Cloudflare R2) with a fixed monthly cost and a member area that streams from your own bucket. Both can be integrated so members log in and stream without extra per-play or storage fees.",
  transparency:
    "We can structure pricing so that your membership fees are the only recurring cost; any hosting or platform fees can be fixed and documented so you have full transparency and no hidden future costs.",
};

/** Features and tools that can support this membership + products setup */
export const MEMBERSHIP_FEATURES = [
  "Member-only area (login, dashboard)",
  "Tiered access (Basic / Standard / Premium) with content gating",
  "Audio & video streaming with unlimited playback for members",
  "Downloads (optional) for offline use",
  "One-time product store (individual meditations, courses)",
  "Recurring billing (monthly membership) with clear renewal and cancel flow",
  "Email integration (welcome, reminders, new content)",
  "Optional: community space (forum or comments) for Premium",
  "Analytics: what content is used most, without invading privacy",
];
