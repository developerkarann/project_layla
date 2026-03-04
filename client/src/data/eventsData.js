/**
 * Events: upcoming and past.
 * Dates in ISO format for sorting; display formatted in the page.
 */

export const UPCOMING_EVENTS = [
  {
    id: "spring-circle",
    title: "Spring Equinox Healing Circle",
    date: "2026-03-20",
    time: "18:00",
    location: "Online",
    type: "Workshop",
    description: "Join a guided circle to honor the equinox—meditation, intention-setting, and gentle movement to welcome the new season.",
    image: "/slide2.JPG",
    cta: "Register",
  },
  {
    id: "qigong-intro",
    title: "Introduction to Vitality Qigong",
    date: "2026-04-05",
    time: "10:00",
    location: "In person · Berlin",
    type: "Class",
    description: "A gentle introduction to Qigong: breath, posture, and flow. No experience needed.",
    image: "/yoga.JPG",
    cta: "Book your spot",
  },
  {
    id: "tck-talk",
    title: "TCK & Identity: Finding Home Within",
    date: "2026-04-18",
    time: "19:00",
    location: "Online",
    type: "Talk",
    description: "An open conversation about third-culture identity, belonging, and building a life that feels authentically yours.",
    image: "/group.JPG",
    cta: "Join",
  },
];

export const PAST_EVENTS = [
  {
    id: "winter-sound",
    title: "Winter Sound Journey",
    date: "2026-02-15",
    location: "Online",
    type: "Workshop",
    description: "A deep listening experience with healing music and guided meditation for the winter season.",
    image: "/slide5.JPG",
  },
  {
    id: "new-year-intention",
    title: "New Year Intention Setting",
    date: "2026-01-08",
    location: "Online",
    type: "Workshop",
    description: "Reflect on the year past and set clear, heart-centered intentions for the year ahead.",
    image: "/slide6.JPG",
  },
  {
    id: "shamanic-intro",
    title: "Introduction to Shamanic Journeying",
    date: "2025-12-12",
    location: "In person · Berlin",
    type: "Workshop",
    description: "Learn the basics of shamanic journeying—drum, intention, and safe practice.",
    image: "/h2.JPG",
  },
];

/** Format date for display e.g. "20 March 2026" */
export function formatEventDate(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** Format short date e.g. "20 Mar" */
export function formatEventDateShort(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
