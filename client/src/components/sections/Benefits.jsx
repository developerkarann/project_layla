import LotusSectionIcon from "../LotusSectionIcon";

const LEFT_BENEFITS = [
  "Bridging Cultures: Empowerment Coaching for Global Souls.",
  "Find Home Within: Resolve Conflicts of Dual Identities.",
  "Aligned Across Borders: Balance Expectations with Personal Growth.",
];

const RIGHT_BENEFITS = [

  "Grow your Global Roots : Reconcile Cultures Differences, Harmonize Relationships.",
  "Belong Beyond : Redefine Belonging and Shape your Family Values.",
  "Find Your Voice: Cultivate Self-Expression and Authenticity."
];

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
    <li className="flex gap-3 sm:gap-5 md:gap-7 text-left px-2 sm:px-4 md:px-5" style={{ fontFamily: 'Lato' }}>
      <BenefitIcon />
      <span className="font-lato text-reiki-dark text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'Lato' }}>
        {text}
      </span>
    </li>
  );
}

export default function Benefits() {
  return (
    <section id="benefits" className="flex min-h-screen flex-col overflow-visible bg-white px-4 pt-0 pb-10 md:px-6 md:pb-12">
      <LotusSectionIcon />
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-40 flex-col justify-center">
        {/* Optional category label – subtle */}
        <h2 className="mt-1 text-center text-xl leading-tight text-reiki-dark sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-garamond" style={{ fontFamily: 'EB Garamond' }}>
          <span>
            Holistic Coaching for Third Culture Kids (TCKs)
          </span>

        </h2>
        {/* Tree structure: left column | central arched image | right column */}
        <div className="mt-6 sm:mt-8 md:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-10 lg:items-start ">
          {/* Left benefits column – same structure as right */}
          <ul className="space-y-6 sm:space-y-8 md:space-y-10 lg:pt-32">
            {LEFT_BENEFITS.map((text, i) => (
              <BenefitItem key={i} text={text} />
            ))}
          </ul>
          {/* Central arched image */}
          <div className="flex justify-center order-first lg:order-none">
            <div className="relative w-full max-w-sm mx-auto lg:max-w-none overflow-hidden">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-t-[8rem] sm:rounded-t-[10rem] md:rounded-t-[12rem] lg:rounded-t-[13rem] bg-reiki-section-alt shadow-md">
                <img
                  src="/main2.JPG"
                  alt="Layla Choug "
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Right benefits column – mirror of left */}
          <ul className="space-y-6 sm:space-y-8 md:space-y-10 lg:pt-32">
            {RIGHT_BENEFITS.map((text, i) => (
              <BenefitItem key={i} text={text} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
