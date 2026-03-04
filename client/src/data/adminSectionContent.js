/**
 * Prototype section content for admin panel.
 * Mimics data that would come from the backend: editable text fields and optional images.
 * Only sections listed here with `images` get the "Update image" option in the admin panel.
 */

const defaultFields = (overrides = {}) => [
  { id: "title", label: "Title", type: "text", value: overrides.title ?? "Section title" },
  { id: "subtitle", label: "Subtitle", type: "text", value: overrides.subtitle ?? "" },
  { id: "body", label: "Body / Description", type: "textarea", value: overrides.body ?? "Edit this content in the admin panel. Data will be loaded from the backend." },
];

const withImage = (url, alt = "Section image") => [{ id: "main", url, alt }];
const withImages = (list) => list.map((item, i) => ({ id: item.id ?? `img-${i}`, ...item }));

/**
 * Prototype content keyed by page slug then section key.
 * Each section has: { fields: [...], images?: [...] }.
 * Only include `images` for sections that support image editing.
 */
export const SECTION_CONTENT = {
  home: {
    "hero-slider": {
      fields: [
        { id: "headline", label: "Headline", type: "text", value: "Welcome to Reiki & Holistic Healing" },
        { id: "subline", label: "Subline", type: "text", value: "Discover balance and inner peace" },
        { id: "cta", label: "Button text", type: "text", value: "Explore" },
      ],
      images: withImages([
        { id: "slide1", url: "/slide1.JPG", alt: "Hero slide 1" },
        { id: "slide2", url: "/slide2.JPG", alt: "Hero slide 2" },
      ]),
    },
    "holistic-healing-intro": {
      fields: defaultFields({ title: "Holistic healing for empowered living", body: "Mission and approach intro. Create the life you want to live." }),
    },
    "awaken-self-healing": {
      fields: defaultFields({ title: "Awakens your powers of self healing", body: "Healing and transformation, embracing you without judgment. Trust in yourself and your power." }),
    },
    "about-jane": {
      fields: [
        { id: "title", label: "Title", type: "text", value: "About Jane" },
        { id: "body", label: "Bio", type: "textarea", value: "Practitioner bio and background. Editable from admin." },
      ],
      images: withImage("/about.JPG", "About section"),
    },
    levels: {
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
      images: withImages([
        { id: "card1", url: "/h1.JPG", alt: "Join the Healing Space" },
        { id: "card2", url: "/group.JPG", alt: "Holistic Coaching TCK" },
        { id: "card3", url: "/h2.JPG", alt: "Shamanic Healing" },
        { id: "card4", url: "/h3.JPG", alt: "Vitality Qigong" },
      ]),
    },
    "blog-section": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Pathways to Inner Peace" },
      ],
    },
    "gallery-section": {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Gallery" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "Moments of practice" },
        { id: "videoUrl", label: "Video URL (optional)", type: "text", value: "" },
      ],
      images: withImages([
        { id: "featured", url: "/awaken-final.jpg", alt: "Featured" },
        { id: "img1", url: "/layla2.JPG", alt: "Healing space" },
        { id: "img2", url: "/slide1.JPG", alt: "Reiki practice" },
        { id: "img3", url: "/about.JPG", alt: "Mindful presence" },
        { id: "img4", url: "/slide3.JPG", alt: "Calm healing space" },
        { id: "img5", url: "/main.JPG", alt: "Serene moment" },
        { id: "img6", url: "/slide4.JPG", alt: "Meditation" },
        { id: "img7", url: "/standing.JPG", alt: "Nature and stillness" },
        { id: "img8", url: "/yoga.JPG", alt: "Quiet reflection" },
      ]),
    },
    newsletter: {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Stay in touch" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "Subscribe for updates and inspiration." },
      ],
    },
    testimonial: {
      fields: [
        { id: "sectionTitle", label: "Section heading", type: "text", value: "Words from clients" },
        { id: "quote1", label: "Quote 1", type: "textarea", value: "The healing session I had with Layla was astonishing and the experience is hard to describe in words." },
        { id: "author1", label: "Author 1", type: "text", value: "Paul — Financial Consultant Switzerland" },
        { id: "quote2", label: "Quote 2", type: "textarea", value: "Working with Layla has been transformative. I came in feeling stuck between cultures and left with a clearer sense of who I am." },
        { id: "author2", label: "Author 2", type: "text", value: "Maria — Educator, Berlin" },
        { id: "quote3", label: "Quote 3", type: "textarea", value: "The Vitality Qigong sessions have helped me regain energy and ease in my body. I feel more grounded and at peace. Highly recommend." },
        { id: "author3", label: "Author 3", type: "text", value: "James — Consultant" },
        { id: "quote4", label: "Quote 4", type: "textarea", value: "" },
        { id: "author4", label: "Author 4", type: "text", value: "" },
        { id: "quote5", label: "Quote 5", type: "textarea", value: "" },
        { id: "author5", label: "Author 5", type: "text", value: "" },
      ],
    },
  },
  about: {
    hero: {
      fields: defaultFields({ title: "About Layla", subtitle: "Your journey starts here" }),
      images: withImage("/about-cover-sec.jpg", "About hero"),
    },
    intro: {
      fields: [
        { id: "title", label: "Heading", type: "text", value: "Hi, I'm Layla" },
        { id: "body", label: "Intro paragraphs", type: "textarea", value: "Intro content for the about page." },
      ],
    },
    mission: {
      fields: defaultFields({ title: "My mission", body: "Mission statement and values." }),
    },
    "approach-values": {
      fields: defaultFields({ title: "Approach & Values", body: "How I work and what I stand for." }),
    },
    awaken: {
      fields: defaultFields({ title: "Awakens your powers", body: "Awaken section content." }),
      images: withImage("/awaken-final.jpg", "Awaken image"),
    },
    vision: {
      fields: defaultFields({ title: "Vision", body: "Vision for a harmonious world." }),
    },
    training: {
      fields: defaultFields({ title: "Training & Practice", body: "Background and modalities." }),
    },
    journey: {
      fields: defaultFields({ title: "Journey", body: "Personal journey narrative." }),
    },
    testimonial: {
      fields: [
        { id: "quote", label: "Quote", type: "textarea", value: "Testimonial on about page." },
        { id: "author", label: "Author", type: "text", value: "— Client" },
      ],
      images: withImage("/character.png", "Avatar"),
    },
    cta: {
      fields: defaultFields({ title: "Get in touch", body: "Call to action text." }),
    },
  },
  services: {
    hero: {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Services" },
        { id: "subtitle", label: "Subtitle", type: "textarea", value: "Three paths to wholeness—Shamanic Healing, TCK Holistic Coaching, and Vitality Qigong. Each meets you where you are." },
      ],
      images: withImage("/awaken-final.jpg", "Services hero"),
    },
    "intro-quote": {
      fields: [
        {
          id: "quote",
          label: "Quote",
          type: "textarea",
          value: "Healing is not one size fits all. Whether you are drawn to the depth of shamanic work, the clarity of coaching, or the gentle power of Qigong—there is a path here for you.",
        },
      ],
    },
    "three-paths": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Three paths, one intention" },
        { id: "body", label: "Intro paragraph", type: "textarea", value: "Your wholeness. Each practice is rooted in respect for your autonomy and your inner knowing." },
        // Path 1 – Shamanic Healing
        { id: "path1Id", label: "Path 1 ID (anchor slug)", type: "text", value: "shamanic-healing" },
        { id: "path1Title", label: "Path 1 title", type: "text", value: "Shamanic Healing" },
        { id: "path1Tagline", label: "Path 1 tagline", type: "text", value: "Ancient wisdom for modern transformation" },
        { id: "path1Description", label: "Path 1 description", type: "textarea", value: "Shamanic healing reaches beyond the everyday mind to work with the deeper layers of your being. Through guided journeys, ritual, and the support of ancestral wisdom, we address what holds you back—whether that is old trauma, stuck patterns, or a sense of being disconnected from your path." },
        { id: "path1KeyPoints", label: "Path 1 key points (one per line)", type: "textarea", value: "Bring harmony in your relationships\nFree from traumas\nCultivate joy and peace with yourself\nOpen your heart to greater love\nRealize your life purpose & mission" },
        { id: "path1Quote", label: "Path 1 quote", type: "textarea", value: "The journey inward is the first step toward healing the world we carry inside." },
        { id: "path1WhoItsFor", label: "Path 1 who it's for", type: "textarea", value: "Anyone ready to go beyond talk-based therapy and engage with symbol, story, and the unseen. Especially supportive when you feel called to release the past, reclaim your power, or align with a clearer sense of purpose." },
        { id: "path1Offerings", label: "Path 1 offerings (one per line)", type: "textarea", value: "Mindfulness meditations\nShamanic guided journeys\nHealing music and sound journeys\nEmpowering wisdom & rituals\nPodcasts bridging cultures & identities" },
        // Path 2 – TCK
        { id: "path2Id", label: "Path 2 ID (anchor slug)", type: "text", value: "tck-coaching" },
        { id: "path2Title", label: "Path 2 title", type: "text", value: "TCK Holistic Coaching" },
        { id: "path2Tagline", label: "Path 2 tagline", type: "text", value: "Find home within—wherever you are" },
        { id: "path2Description", label: "Path 2 description", type: "textarea", value: "Third culture kids and global nomads often carry a unique set of gifts and challenges: rich perspectives, adaptability, and at times a deep question of where they belong. This coaching is designed to honor your whole story—every culture, every move, every identity—and help you build a life that feels authentically yours." },
        { id: "path2KeyPoints", label: "Path 2 key points (one per line)", type: "textarea", value: "Bridging cultures: empowerment coaching for global souls\nFind home within: resolve conflicts of dual identities\nAligned across borders: balance expectations with personal growth\nGrow your global roots: reconcile culture differences, harmonize relationships\nBelong beyond: redefine belonging and shape your family values\nFind your voice: cultivate self-expression and authenticity" },
        { id: "path2Quote", label: "Path 2 quote", type: "textarea", value: "You don't have to choose one culture. You get to integrate them all." },
        { id: "path2WhoItsFor", label: "Path 2 who it's for", type: "textarea", value: "TCKs, expats, repats, and anyone who has lived between worlds and wants to make sense of their identity, relationships, and choices without having to choose one box." },
        { id: "path2Offerings", label: "Path 2 offerings (one per line)", type: "textarea", value: "One-to-one coaching sessions\nIdentity and belonging work\nFamily and relationship navigation\nLife transitions and repatriation\nIntegration of multiple cultural narratives" },
        // Path 3 – Vitality Qigong
        { id: "path3Id", label: "Path 3 ID (anchor slug)", type: "text", value: "vitality-qigong" },
        { id: "path3Title", label: "Path 3 title", type: "text", value: "Vitality Qigong" },
        { id: "path3Tagline", label: "Path 3 tagline", type: "text", value: "Restore flow. Restore life." },
        { id: "path3Description", label: "Path 3 description", type: "textarea", value: "Vitality Qigong is a branch of Chinese medicine that uses movement, breath, and intention to support the body's natural ability to heal. Unlike exercise alone, it works with the subtle energy (qi) that animates your systems—helping to clear blockages, strengthen weak areas, and restore a sense of ease and vitality." },
        { id: "path3KeyPoints", label: "Path 3 key points (one per line)", type: "textarea", value: "Restore your health & vitality\nImprove physical mobility & reduce stress\nAchieve emotional & mental balance\nAlign your mind, body & spirit\nAge with serenity" },
        { id: "path3Quote", label: "Path 3 quote", type: "textarea", value: "The body knows how to heal. Sometimes it just needs the right conditions." },
        { id: "path3WhoItsFor", label: "Path 3 who it's for", type: "textarea", value: "Anyone seeking to support their health in a holistic way—whether you are recovering from illness, managing stress, or simply want to feel more alive, grounded, and at peace in your body." },
        { id: "path3Offerings", label: "Path 3 offerings (one per line)", type: "textarea", value: "Gentle movement and breath practices\nEnergy assessment and balancing\nPrescription exercises for your condition\nStress relief and immune support\nLong-term wellness and aging well" },
      ],
      images: withImages([
        { id: "path1", url: "/h2.JPG", alt: "Shamanic healing practice" },
        { id: "path2", url: "/group.JPG", alt: "Holistic coaching for TCKs" },
        { id: "path3", url: "/h3.JPG", alt: "Vitality Qigong practice" },
      ]),
    },
    "how-to-choose": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Not sure which path?" },
        { id: "body", label: "Body", type: "textarea", value: "Many clients start with a single modality and later weave in another. When you get in touch, we can have a short conversation about what you're drawn to. There's no wrong door." },
        { id: "linkText", label: "Button / link text", type: "text", value: "Let's talk" },
      ],
    },
    "at-a-glance": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "At a glance" },
        { id: "blogSlug1", label: "Blog post 1 slug", type: "text", value: "" },
        { id: "blogSlug2", label: "Blog post 2 slug", type: "text", value: "" },
        { id: "blogSlug3", label: "Blog post 3 slug", type: "text", value: "" },
      ],
    },
    cta: {
      fields: [
        { id: "quote", label: "Quote", type: "textarea", value: "Your healing journey is yours to shape. I'm here to walk it with you." },
        { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" },
      ],
    },
  },
  gallery: {
    hero: {
      fields: [
        { id: "scriptName", label: "Script name (e.g. Layla)", type: "text", value: "Layla" },
        { id: "title", label: "Title", type: "text", value: "Gallery" },
        { id: "subtitle", label: "Subtitle", type: "textarea", value: "Moments of peace, presence, and the path of healing" },
      ],
      images: withImage("/layla3.JPG", "Gallery hero"),
    },
    "intro-quote": {
      fields: [
        {
          id: "quote",
          label: "Quote",
          type: "textarea",
          value: "Every moment holds the possibility of peace. These images are glimpses from that journey—spaces, nature, and the quiet practice of coming home to oneself.",
        },
      ],
    },
    "healing-spaces": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Healing Spaces" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "Where inner work meets outer calm" },
      ],
      images: withImages([
        { id: "img1", url: "/layla3.JPG", alt: "Healing space" },
        { id: "img2", url: "/slide1.JPG", alt: "Reiki practice" },
        { id: "img3", url: "/slide3.JPG", alt: "Calm room" },
        { id: "img4", url: "/about.JPG", alt: "Presence" },
        { id: "img5", url: "/main.JPG", alt: "Serene moment" },
      ]),
    },
    "nature-stillness": {
      fields: [
        { id: "label", label: "Small label (uppercase)", type: "text", value: "Moments of calm" },
        { id: "title", label: "Section title", type: "text", value: "Nature & Stillness" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "Finding calm in the world around us" },
      ],
      images: withImages([
        { id: "img1", url: "/IMG_0620.JPG", alt: "Calm in nature" },
        { id: "img2", url: "/IMG_3028.JPG", alt: "Quiet moment" },
        { id: "img3", url: "/IMG_6293.JPG", alt: "Stillness" },
        { id: "img4", url: "/IMG_6330.JPG", alt: "Peaceful presence" },
      ]),
    },
    "practice-presence": {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Practice & Presence" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "The art of showing up—fully and gently" },
      ],
      images: withImages([
        { id: "img1", url: "/slide1.JPG", alt: "Practice" },
        { id: "img2", url: "/slide3.JPG", alt: "Focus" },
        { id: "img3", url: "/service1.JPG", alt: "Energy" },
        { id: "img4", url: "/standing4.JPG", alt: "Flow" },
        { id: "img5", url: "/slide2.JPG", alt: "Presence" },
      ]),
    },
    cta: {
      fields: [
        { id: "quote", label: "Quote", type: "textarea", value: "Every moment holds the possibility of peace." },
        { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" },
      ],
    },
  },
  blog: {
    "all-blogs": {
      // Virtual section: not edited here; AdminAllBlogs is shown instead. Backend returns stub for GET.
      fields: [
        { id: "_notice", label: "Notice", type: "text", value: "Blog posts are managed in the All Blogs view. Use the list above to add, edit, or delete posts." },
      ],
      images: [],
    },
    hero: {
      fields: [
        { id: "scriptName", label: "Script name (e.g. Layla)", type: "text", value: "Layla" },
        { id: "title", label: "Title", type: "text", value: "Blog" },
        { id: "subtitle", label: "Subtitle", type: "textarea", value: "Reflections on healing, presence, and the path to inner peace" },
      ],
      images: withImage("/slide1.JPG", "Blog hero"),
    },
    topics: {
      fields: [
        { id: "label", label: "Strip label", type: "text", value: "Topics we explore" },
        { id: "topicsList", label: "Topics (one per line)", type: "textarea", value: "Mindfulness\nFreedom\nEnergy work\nPractice\nCoaching\nVitality\nResilience" },
      ],
    },
    "intro-quote": {
      fields: [
        {
          id: "quote",
          label: "Quote",
          type: "textarea",
          value: "Words from the heart, for the heart. Here you'll find thoughts on Reiki, mindfulness, third culture life, and the art of coming home to yourself.",
        },
      ],
    },
    featured: {
      fields: [
        { id: "label", label: "Section label", type: "text", value: "Featured" },
        { id: "featuredSlug", label: "Featured blog slug (stable – post still shows when you change title)", type: "text", value: "power-of-mindful-healing" },
        { id: "featuredPostTitle", label: "Or by title (fallback if slug empty)", type: "text", value: "" },
      ],
      images: withImage("/yoga.JPG", "Featured post image (override)"),
    },
    latest: {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Latest stories" },
        { id: "latestSlug1", label: "Latest post 1 slug (stable)", type: "text", value: "finding-home-within-tck-journey" },
        { id: "latestPostTitle1", label: "Or post 1 by title (fallback)", type: "text", value: "" },
        { id: "latestSlug2", label: "Latest post 2 slug (stable)", type: "text", value: "reiki-and-emotional-release" },
        { id: "latestPostTitle2", label: "Or post 2 by title (fallback)", type: "text", value: "" },
      ],
      images: withImages([
        { id: "latest1", url: "/group.JPG", alt: "Latest post 1" },
        { id: "latest2", url: "/slide3.JPG", alt: "Latest post 2" },
      ]),
    },
    divider: {
      fields: [
        { id: "quote", label: "Quote", type: "textarea", value: "Healing is not something we do so much as something we allow." },
        { id: "attribution", label: "Attribution", type: "text", value: "— From the blog" },
      ],
    },
    more: {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "More reflections" },
        { id: "moreSlugs", label: "Blog slugs for More section (one per line – stable when you change titles). Leave empty to show remaining posts.", type: "textarea", value: "cultivating-joy-through-practice\nbridging-cultures-with-compassion\nsound-and-silence-in-healing" },
        { id: "morePostTitles", label: "Or by titles, one per line (fallback)", type: "textarea", value: "" },
      ],
    },
    author: {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Why I write" },
        { id: "paragraph1", label: "Paragraph 1", type: "textarea", value: "This blog is a space where I share what I learn from my clients, my practice, and the journey of bridging cultures and healing. I hope these words meet you where you are and remind you that you are not alone on the path." },
        { id: "paragraph2", label: "Paragraph 2", type: "textarea", value: "Here I write about presence, third-culture identity, and the small shifts that open the door to wholeness. Whether you are new to energy work or deepening a long-standing practice, these reflections are offered with care and respect for your own pace." },
        { id: "paragraph3", label: "Paragraph 3", type: "textarea", value: "This space continues an exploration of rooted awareness, liminal belonging, and the quiet adjustments that invite integration." },
        { id: "linkText", label: "Link text", type: "text", value: "More about me →" },
      ],
      images: withImage("/about.JPG", "Layla"),
    },
    cta: {
      fields: [
        { id: "title", label: "Section title", type: "text", value: "Stay in the loop" },
        { id: "body", label: "Body", type: "textarea", value: "New reflections on healing and presence. No spam, only heart." },
        { id: "buttonText", label: "Button text", type: "text", value: "Get in touch" },
      ],
    },
  },
  contact: {
    "all-contact": {
      fields: [{ id: "_notice", label: "Notice", type: "text", value: "Contact data (methods, FAQ, office hours) is managed in the All Contact view." }],
      images: [],
    },
    hero: {
      fields: defaultFields({ title: "Contact", subtitle: "Get in touch" }),
      images: withImage("/main4.JPG", "Contact hero"),
    },
    "contact-methods": {
      fields: defaultFields({ title: "Contact methods", body: "Email, phone, location." }),
    },
    form: {
      fields: defaultFields({ title: "Send a message", body: "Form intro and interest options." }),
    },
    "how-it-works": {
      fields: defaultFields({ title: "How it works", body: "Process after you reach out." }),
    },
    faq: {
      fields: defaultFields({ title: "FAQ", body: "Frequently asked questions." }),
    },
    office: {
      fields: defaultFields({ title: "Office hours & map", body: "Opening hours and map embed." }),
    },
  },
  availability: {
    intro: {
      fields: [
        { id: "title", label: "Page title", type: "text", value: "Availability" },
        { id: "body", label: "Demo text", type: "textarea", value: "Book a session or view available slots." },
      ],
    },
    calendar: {
      fields: defaultFields({ title: "Calendar & time slots", body: "Calendar settings and copy." }),
    },
  },
  events: {
    "all-events": {
      fields: [{ id: "_notice", label: "Notice", type: "text", value: "Events are managed in the All Events view." }],
      images: [],
    },
    hero: {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Events" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "Circles, workshops, and gatherings—in person and online" },
      ],
      images: withImage("/slide1.JPG", "Events hero"),
    },
    "intro-quote": {
      fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Coming together in circle reminds us we are not alone on the path. Here you can learn, practice, and connect." }],
    },
    upcoming: {
      fields: [
        { id: "label", label: "Label", type: "text", value: "What's on" },
        { id: "title", label: "Title", type: "text", value: "Upcoming events" },
        { id: "empty", label: "Empty message", type: "textarea", value: "New events will be announced soon. Stay in touch via the newsletter or contact." },
      ],
    },
    divider: {
      fields: [{ id: "quote", label: "Quote", type: "textarea", value: "Every gathering leaves a trace. Here are some we've shared." }],
    },
    past: {
      fields: [
        { id: "label", label: "Label", type: "text", value: "Archive" },
        { id: "title", label: "Title", type: "text", value: "Past events" },
      ],
    },
    cta: {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Stay in the loop" },
        { id: "body", label: "Body", type: "textarea", value: "Get notified about new circles, workshops, and online events." },
        { id: "cta", label: "Button text", type: "text", value: "Get in touch" },
      ],
    },
  },
  membership: {
    "all-membership": {
      fields: [{ id: "_notice", label: "Notice", type: "text", value: "Tiers, Healing Space items, and Products are managed in the All Membership view." }],
      images: [],
    },
    hero: {
      fields: [
        { id: "title", label: "Title", type: "text", value: "Membership" },
        { id: "subtitle", label: "Subtitle", type: "text", value: "The Healing Space—meditations, music, rituals, and podcasts. Grow at your own pace with tiered access." },
      ],
      images: withImage("/awaken-final.jpg", "Membership hero"),
    },
    "intro-quote": {
      fields: [{ id: "quote", label: "Quote", type: "textarea", value: "A space where you can return again and again—for a few minutes of stillness or a deeper dive into practice. No pressure, only presence." }],
    },
    "healing-space": {
      fields: [
        { id: "label", label: "Label", type: "text", value: "The Healing Space" },
        { id: "title", label: "Title", type: "text", value: "What's inside" },
        { id: "body", label: "Body", type: "textarea", value: "Content is being created from April to August. The space will include:" },
      ],
    },
    tiers: {
      fields: [
        { id: "label", label: "Label", type: "text", value: "Clear progression" },
        { id: "title", label: "Title", type: "text", value: "Tiered membership" },
        { id: "body", label: "Body", type: "textarea", value: "Choose the level that fits your practice. Upgrade or downgrade anytime." },
      ],
    },
    products: {
      fields: [
        { id: "label", label: "Label", type: "text", value: "One-time purchase" },
        { id: "title", label: "Title", type: "text", value: "Individual products" },
        { id: "body", label: "Body", type: "textarea", value: "Prefer to buy single items? Audio and video courses will be available without a membership." },
      ],
    },
    cta: {
      fields: [
        { id: "quote", label: "Quote", type: "textarea", value: "The Healing Space will meet you where you are. Questions? Let's talk." },
        { id: "cta", label: "Button text", type: "text", value: "Get in touch" },
      ],
    },
  },
  global: {
    header: {
      fields: [
        { id: "siteName", label: "Site name", type: "text", value: "Layla" },
        { id: "tagline", label: "Tagline", type: "text", value: "Reiki & Holistic Healing" },
      ],
      images: withImage("/lotus.png", "Logo"),
    },
    footer: {
      fields: defaultFields({ title: "Footer", body: "Copyright, links, and footer text." }),
    },
    disclaimer: {
      fields: [
        {
          id: "text",
          label: "Disclaimer text",
          type: "textarea",
          value: "Disclaimer: The services, practices, and information shared on this website are for educational and informational purposes only. They are not intended to diagnose, treat, cure, or prevent any medical or psychological condition, nor are they a substitute for professional medical advice, diagnosis, or treatment. Please consult with a licensed healthcare professional for any medical concerns. I am not a licensed medical practitioner or Heilpraktiker in Germany.",
        },
      ],
    },
  },
};

/**
 * Returns prototype content for a section. Use when backend is not connected.
 * @param {string} pageSlug - e.g. 'home', 'about'
 * @param {string} sectionKey - e.g. 'hero', 'holistic-healing-intro'
 * @returns {{ fields: Array<{id, label, type, value}>, images?: Array<{id, url, alt}> }}
 */
export function getSectionContent(pageSlug, sectionKey) {
  const page = SECTION_CONTENT[pageSlug];
  if (!page) {
    return {
      fields: defaultFields({ title: sectionKey, body: `Content for ${sectionKey} (prototype). Backend will supply real data.` }),
    };
  }
  const section = page[sectionKey];
  if (!section) {
    return {
      fields: defaultFields({ title: sectionKey, body: `Content for ${sectionKey} (prototype). Backend will supply real data.` }),
    };
  }
  return {
    fields: section.fields ?? defaultFields(),
    images: section.images,
  };
}
