import { useContent, getFieldValue } from "../../hooks/useContent";
import LotusSectionIcon from "../LotusSectionIcon";

export default function HolisticHealingIntro() {
  const { fields } = useContent("home", "holistic-healing-intro");
  const title = getFieldValue(fields, "title") || "Holistic healing for empowered living";
  const body = getFieldValue(fields, "body") || "Create the life you want to live.";
  const lastWord = title.split(" ").pop();
  const titleStart = title.split(" ").slice(0, -1).join(" ");

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
              {titleStart}{" "}
              {lastWord ? <span className="text-reiki-olive">{lastWord}</span> : null}
            </span>
          </h2>
          <p className="font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mt-4 xl:text-2xl md:mt-5">
            {body}
          </p>
          <a href="/about" className="relative mt-6 sm:mt-8 inline-block rounded px-6 py-2.5 sm:px-8 sm:py-3 font-sans text-sm sm:text-base font-semibold text-white transition hover:opacity-90 bg-reiki-dark">
            Learn more
          </a>
        </div>
        <div className="max-w-xl lg:max-w-none">
          <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
