import LotusSectionIcon from "../LotusSectionIcon";
import { useContent, getFieldValue } from "../../hooks/useContent";

const FALLBACK_IMAGES = [
  { src: "/layla2.JPG", alt: "Healing space" },
  { src: "/slide1.JPG", alt: "Reiki practice" },
  { src: "/about.JPG", alt: "Mindful presence" },
  { src: "/slide3.JPG", alt: "Calm healing space" },
  { src: "/main.JPG", alt: "Serene moment" },
  { src: "/slide4.JPG", alt: "Meditation" },
  { src: "/standing.JPG", alt: "Nature and stillness" },
  { src: "/yoga.JPG", alt: "Quiet reflection" },
];

function getImage(images, id) {
  const img = images?.find((i) => i.id === id);
  return img ? { url: img.url, alt: img.alt || "" } : null;
}

export default function Gallery() {
  const { fields, images, loading } = useContent("home", "gallery-section");
  const title = getFieldValue(fields, "title") || "Gallery";
  const subtitle = getFieldValue(fields, "subtitle") || "Moments of practice";
  const videoUrl = getFieldValue(fields, "videoUrl") || "";
  const featured = getImage(images, "featured") || { url: "/awaken-final.jpg", alt: "Featured" };
  const gridImages = [1, 2, 3, 4, 5, 6, 7, 8]
    .map((i) => getImage(images, `img${i}`))
    .filter(Boolean);
  const galleryImages = gridImages.length > 0 ? gridImages.map((img) => ({ src: img.url, alt: img.alt })) : FALLBACK_IMAGES;

  return (
    <section id="gallery" className="flex min-h-screen flex-col overflow-visible bg-white px-4 pt-0 pb-10 md:px-6 md:pb-12">
      <LotusSectionIcon />
      <div className="mx-auto flex flex-1 px-4 sm:px-6 md:px-8 lg:px-40 flex-col justify-center w-full ">
        <h2 className="mt-1 font-garamond text-center text-xl text-reiki-dark sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight" style={{ fontFamily: "EB Garamond" }}>
          {title.split(" ").length > 1 ? (
            <>
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-reiki-olive">{title.split(" ").slice(-1)[0]}</span>
            </>
          ) : (
            <span className="text-reiki-olive">{title}</span>
          )}
        </h2>
        <p className="mt-2 font-lato text-center text-sm text-reiki-body sm:text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Featured media: updatable image + optional video */}
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch max-w-4xl mx-auto w-full">
          {videoUrl && (
            <div className="flex-1 min-h-[200px] sm:min-h-[260px] rounded-xl border border-reiki-card-border overflow-hidden bg-reiki-section">
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover"
                poster={featured.url}
                aria-label="Gallery video"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <div
            className={
              (videoUrl ? "flex-1" : "w-full") +
              " min-h-[200px] sm:min-h-[260px] rounded-xl border border-reiki-card-border overflow-hidden bg-reiki-section"
            }
          >
            <img
              src={featured.url}
              alt={featured.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Collage grid – all images editable in admin Home > Gallery Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-fr">
          {galleryImages.map((item, i) => (
            <div
              key={item.src + "-" + i}
              className="group overflow-hidden rounded-xl border border-reiki-card-border bg-reiki-section shadow-sm transition-all duration-300 hover:shadow-md hover:border-reiki-accent/60 min-h-[120px] sm:min-h-[140px]"
            >
              <div className="relative h-full w-full overflow-hidden min-h-[120px] sm:min-h-[140px]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
