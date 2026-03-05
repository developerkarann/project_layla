import { useContent, getFieldValue } from "../../hooks/useContent";

const DEFAULT_IMAGE = "/awaken-final.jpg";

export default function AwakenSelfHealing() {
  const { fields, images } = useContent("home", "awaken-self-healing");
  const title = getFieldValue(fields, "title") || "Awakens your powers of self healing";
  const body = getFieldValue(fields, "body") || "Your healing and transformation starts as soon as you become aware and honest with the negative charge a situation awakens in you. I embrace you without judgment where you are.";
  const mainImage = images?.find((i) => i.id === "main")?.url || DEFAULT_IMAGE;
  const firstWord = title.split(" ")[0] || "";
  const rest = title.split(" ").slice(1).join(" ");

  return (
    <section className="flex min-h-screen flex-col bg-reiki-bg-stripe px-4 py-10 md:px-6 md:py-12">
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-40 flex-col justify-center">
        <div className="grid items-center gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 flex justify-center lg:order-1">
            <div className="relative flex items-center justify-center">
              <img
                src={mainImage}
                alt="Awaken your powers"
                className="relative object-cover object-top shadow-lg z-10 h-56 w-56 sm:h-64 sm:w-64 md:h-[380px] md:w-[380px] lg:h-[500px] lg:w-[500px] xl:h-[600px] xl:w-[600px]"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-serif text-xl text-black sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 md:mb-12">
              {firstWord ? <span className="text-reiki-olive">{firstWord}</span> : null}{" "}
              {rest}
            </h2>
            <p className="text-left font-lato text-sm leading-relaxed text-reiki-body sm:text-base md:text-lg mb-3 sm:mb-4">
              {body}
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
