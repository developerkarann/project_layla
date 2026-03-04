/**
 * Fallback data when API is unavailable or not yet loaded. Keeps UI stable and allows offline/seed-first experience.
 */

/** Matches seed.js aboutContent and AboutPage.jsx. Used when API is down or not loaded. */
export const ABOUT_FALLBACK = {
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

export const CONTACT_FALLBACK = {
  heroImage: "/slide3.JPG",
  heroScriptName: "Layla",
  heroTitle: "Contact",
  heroSubtitle: "Every conversation starts with a single step. I'm here when you're ready.",
  introQuote: "\"Reaching out takes courage. Whether you're curious about a first session, have a question, or simply want to say hello—this is a safe space.\"",
  waysToConnectTitle: "Ways to connect",
  waysToConnectSubtitle: "Choose what feels right for you—email, phone, or the form below.",
  contactMethods: [],
  sendMessageTitle: "Send a message",
  sendMessageSubtitle: "Fill in the form below and I'll get back to you as soon as I can.",
  interestOptions: [],
  faqSectionTitle: "Common questions",
  faq: [],
  availabilityTitle: "Availability",
  availabilityBody: "Book a session at a time that suits you. Choose a date and slot in the calendar below.",
  availabilityFootnote: "All times are flexible by prior arrangement.",
  officeHoursTitle: "Office hours",
  officeHours: [],
  socialText: "Follow along for inspiration and updates.",
  socialLinks: [
    { platform: "instagram", url: "https://www.instagram.com/laylanur.co" },
    { platform: "facebook", url: "https://facebook.com" },
    { platform: "x", url: "https://x.com" },
    { platform: "youtube", url: "https://youtube.com" },
  ],
};

/** Format event date for display (API may return Date or ISO string). */
export function formatEventDate(isoOrDate) {
  const d = new Date(isoOrDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Format short date e.g. "20 Mar" */
export function formatEventDateShort(isoOrDate) {
  const d = new Date(isoOrDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
