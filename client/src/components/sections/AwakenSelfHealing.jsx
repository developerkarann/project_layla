const RIGHT_LIST = [
  "Bring Harmony in your Relationships.",
  "Cultivate Joy and Peace with Yourself.",
  "Open your Heart to Greater Love.",
  "Realize your Life Purpose & Mission",
  "Free from Traumas.",
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
    <li className="flex gap-7 text-left px-5" style={{ fontFamily: "Lato" }}>
      <BenefitIcon />
      <span
        className="font-lato text-reiki-dark text-lg leading-relaxed"
        style={{ fontFamily: "Lato" }}
      >
        {text}
      </span>
    </li>
  );
}

export default function AwakenSelfHealing() {
  return (
    <section className="flex min-h-screen flex-col bg-reiki-bg-stripe px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-40 flex-col justify-center">
        <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 flex justify-center lg:order-1">
            <div className="relative flex items-center justify-center">
              <div className="" />
              <img
                src="/awaken-final.jpg"
                alt="Awaken your powers"
                className="relative object-cover object-top shadow-lg z-10 h-56 w-56 sm:h-64 sm:w-64 md:h-[380px] md:w-[380px] lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            {/* <h2 className="font-serif text-2xl text-black md:text-6xl mb-15">
              Join the <span className="text-reiki-olive"> Healing </span> Space
            </h2> */}
            <h2 className="font-serif text-xl text-black sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 md:mb-12">
              <span className="text-reiki-olive">Awakens</span> your powers of  self healing
            </h2>
            {/* <ul className="mt-4 space-y-10">
              {RIGHT_LIST.map((text, i) => (
                <BenefitItem key={i} text={text} />
              ))}
            </ul> */}
            <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4">

              Your healing and transformation starts as soon as you become aware and honest with the negative charge a situation awakens in you. I embrace you without judgment where you are, whatever life challenges you face, and however they show up through longings, dilemnas, relationship issues, separation, loss, emotional overwhelm, feeling stuck or lost. Facing problems is not a problem. It is a part of the life journey.
            </p>
            <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4">
              The experience is here to teach how to respond to situations so it serves your higher good and positive alignment. The magic is to learn to utilize these energies in your favor rather than against yourself.
            </p>
            <p className="text-left font-lato text-sm leading-relaxed text-reiki-dark font-bold sm:text-base md:text-lg mb-3 sm:mb-4">
              Trust in yourself and in your power to create the life you want to live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
