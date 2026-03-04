import LotusSectionIcon from "../LotusSectionIcon";



export default function HolisticHealingIntro() {
  return (
    <section
      id="what-is-reiki"
      className="flex md:min-h-screen flex-col overflow-visible bg-white px-4 pt-0 pb-10 md:px-6 md:pb-12"
    >
      <LotusSectionIcon />
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-20 flex-col items-stretch gap-8 sm:gap-10 lg:gap-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-6">
        <div className="text-center lg:text-left font-sans flex flex-col items-center lg:items-start">
          <h2 className="leading-tight font-garamond">
            <span className="block text-2xl font-normal sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3">
              Holistic  <span className="text-reiki-olive">healing</span> for
            </span>
            <span className="block text-2xl font-normal sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3">
              empowered living
            </span>
          </h2>
          <p className="font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mt-4 xl:text-2xl md:mt-5">
            Create the life you want to live !
          </p>
          <a href="/about" className="relative mt-6 sm:mt-8 inline-block rounded px-6 py-2.5 sm:px-8 sm:py-3 font-sans text-sm sm:text-base font-semibold text-white transition hover:opacity-90 bg-reiki-dark">
            Learn more
          </a>
        </div>
        <div className="max-w-xl lg:max-w-none">
          <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4">
            My mission is to ignite self-empowerment and self-healing through quantum shifts of consciousness. I believe in the ripple effect of all things: one deep positive change in a person can create boundless positive outcome far beyond this one person
          </p>
          <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4" >
            My approach to achieve this goal is rooted in the consideration that you are a conscious and intelligent being with infinite potential and powers. My ethics and values are founded on the respect of your free choice and inner knowing of what is good for you. On that basis, it is a privilege to accompany you and witness your blossoming, your joy, your victories but also help you overcome sorrows, loss, hurts and transcend struggles.
          </p>
        </div>
      </div>
    </section>
  );
}
