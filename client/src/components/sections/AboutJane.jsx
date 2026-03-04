import { Link } from "react-router-dom";

export default function AboutJane() {
  return (
    <section id="about" className="flex min-h-screen flex-col bg-reiki-bg-stripe px-4 py-8 sm:py-10 md:px-6 md:py-12">
      <div className="mx-auto flex flex-1 max-w-7xl flex-col justify-center w-full">
        <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-94 w-68 shrink-0  md:h-[400px] md:w-[320px] lg:h-[500px] lg:w-[400px] xl:h-[600px] xl:w-[500px]">
              <img
                src="/about.JPG"
                alt="About Layla"
                className="h-full w-full rounded-full object-cover object-top shadow-lg"
              />
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-garamond text-xl leading-tight text-reiki-dark sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 md:mb-10 text-center md:text-left">
              Hi, my name is <span className="text-reiki-olive"> Layla</span>
            </h2>
            <p className="mt-4 sm:mt-6 font-lato text-reiki-dark text-sm leading-relaxed sm:text-base md:text-lg">
              I am a trained practitioner for shamanic energy medicine, Vitality Qigong and life coaching. My work bridges cultures, traditions, religions and identities. It holds unconditional respect of who you are and where you are from. I have studied some of the most integrative systems of healing to offer a unique and holistic approach that is altogether physical, emotional, mental and spiritual.
            </p>
            <p className="mt-4 sm:mt-6 font-lato text-reiki-dark text-sm leading-relaxed sm:text-base md:text-lg">
              The techniques shaping my work reflect an attuned understanding of the complexities of the human life journey, whether it catalyzes a search for meaning and purpose, a desire to connect more deeply and authentically with others, or a need to heal and find peace amidst personal crises and identity struggles in cross-cultural and rapidly changing environments.
            </p>
            <Link to="/about" className="mt-6 inline-block font-lato text-sm font-semibold text-reiki-olive hover:underline">
              Read my full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
