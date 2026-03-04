import { Link } from "react-router-dom";
import LotusSectionIcon from "../LotusSectionIcon";
import { useContent, getFieldValue } from "../../hooks/useContent";

function buildLevelsFromSection(fields, images) {
  const getField = (id) => getFieldValue(fields, id) ?? "";
  const getImage = (id) => images?.find((i) => i.id === id)?.url ?? "";
  return [
    { title: getField("card1Title"), img: getImage("card1"), list: (getField("card1List") || "").split("\n").filter(Boolean).map((s) => s.trim()) },
    { title: getField("card2Title"), img: getImage("card2"), list: (getField("card2List") || "").split("\n").filter(Boolean).map((s) => s.trim()) },
    { title: getField("card3Title"), img: getImage("card3"), list: (getField("card3List") || "").split("\n").filter(Boolean).map((s) => s.trim()) },
    { title: getField("card4Title"), img: getImage("card4"), list: (getField("card4List") || "").split("\n").filter(Boolean).map((s) => s.trim()) },
  ].filter((card) => card.title || card.list.length > 0);
}

function BenefitIcon() {
  return (
    <span
      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-reiki-benefit-icon"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5 text-reiki-dark"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function BenefitItem({ text }) {
  return (
    <li className="flex gap-3 sm:gap-5 md:gap-7 text-left px-2 sm:px-4 md:px-5" style={{ fontFamily: "Lato" }}>
      <BenefitIcon />
      <span
        className="font-lato text-reiki-dark text-sm sm:text-base leading-relaxed"
        style={{ fontFamily: "Lato" }}
      >
        {text}
      </span>
    </li>
  );
}
function CardTreeBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
      aria-hidden
    >
      <div
        className="absolute inset-0 bg-bottom bg-no-repeat opacity-[0.14]"
        style={{
          backgroundImage: "url(/tree.png)",
          backgroundSize: "contain",
          backgroundPosition: "bottom center",
        }}
      />
    </div>
  );
}

export default function Levels() {
  const { fields, images, loading } = useContent("home", "levels");
  const sectionTitle = getFieldValue(fields, "sectionTitle") || "Healing Practices";
  const linkText = getFieldValue(fields, "linkText") || "Explore all services →";
  const levels = buildLevelsFromSection(fields, images);

  if (loading && levels.length === 0) {
    return (
      <section id="levels" className="flex min-h-screen flex-col overflow-visible bg-white px-4 pt-0 pb-10 md:px-6 md:pb-12">
        <LotusSectionIcon />
        <div className="mx-auto flex flex-1 items-center justify-center px-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-reiki-olive border-t-transparent" />
        </div>
      </section>
    );
  }

  const displayLevels = levels.length > 0 ? levels : [
    { title: "Join the Healing Space", img: "/h1.JPG", list: ["Mindfulness Meditations", "Shamanic Guided Journeys", "Healing Music and Sound Journeys", "Empowering Wisdom & Rituals", "Podcasts Bridging Cultures & Identities"] },
    { title: "Holistic Coaching – TCK", img: "/group.JPG", list: ["Bridging Cultures: Empowerment Coaching for Global Souls", "Find Home Within: Resolve Conflicts of Dual Identities", "Aligned Across Borders: Balance Expectations with Personal Growth", "Belong Beyond: Redefine Belonging and Shape your Family Values"] },
    { title: "Shamanic Healing", img: "/h2.JPG", list: ["Bring Harmony in your Relationships", "Free from Traumas", "Cultivate Joy and Peace with Yourself", "Open your Heart to Greater Love", "Realize your Life Purpose & Mission"] },
    { title: "Vitality Qigong", img: "/h3.JPG", list: ["Restore your Health & Vitality", "Improve Physical Mobility & Reduce Stress", "Achieve Emotional & Mental Balance", "Align Your Mind, Body & Spirit", "Age with Serenity"] },
  ];

  return (
    <section id="levels" className="flex min-h-screen flex-col overflow-visible bg-white px-4 pt-0 pb-10 md:px-6 md:pb-12">
      <LotusSectionIcon />
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-0 flex-col justify-center w-full ">
        <h2 className="font-garamond text-center text-xl text-reiki-dark sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'EB Garamond' }}>
          {sectionTitle}
        </h2>
        <p className="mt-2 text-center">
          <Link to="/services" className="font-lato text-sm font-semibold text-reiki-olive hover:underline">
            {linkText}
          </Link>
        </p>
        <div style={{ gap: '60px' }} className="mt-6 sm:mt-8 md:mt-10 grid gap-6 sm:gap-10 md:gap-15 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayLevels.map((level) => (
            <article
              key={level.title}
              style={{
                backgroundImage: `url(${level.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                fontFamily: 'Lato',
              }}
              className="relative flex flex-col rounded-xl border border-reiki-card-border overflow-hidden min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[520px] w-full min-w-0 bg-cover bg-center bg-no-repeat justify-center items-center gap-0 p-4 sm:p-5 lg:min-w-0"
            >
              {/* Very light edge vignette only – image stays vivid across the card */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 50%, rgba(58,79,63,0.06) 100%)',
                }}
                aria-hidden
              />
              <CardTreeBackground />
              {/* Glass panel: only this area gets frosted; rest of card shows full image */}
              <div
                className="relative z-10 w-full max-w-full sm:max-w-[380px] lg:max-w-[420px] rounded-xl sm:rounded-2xl px-4 py-5 sm:px-6 sm:py-7 flex flex-col items-center gap-4 sm:gap-6 border border-white/50 shadow-[0_8px_32px_rgba(58,79,63,0.15),inset_0_1px_0_rgba(255,255,255,0.7)]"
                style={{
                  background: 'rgba(248,253,247,0.82)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-reiki-dark text-center" style={{ fontFamily: 'Garamond' }}>
                  {level.title}
                </h3>
                <ul className="space-y-4 sm:space-y-6 md:space-y-8 w-full">
                  {level.list.map((text, i) => (
                    <BenefitItem key={i} text={text} />
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-2 inline-block rounded-lg px-8 py-3 font-sans text-sm font-semibold text-white transition hover:opacity-90 bg-reiki-dark shadow-md"
                >
                  Send Enquiry
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
