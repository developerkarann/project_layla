import HeroSlider from "../components/HeroSlider";
import HolisticHealingIntro from "../components/sections/HolisticHealingIntro";
import AwakenSelfHealing from "../components/sections/AwakenSelfHealing";
import AboutJane from "../components/sections/AboutJane";
import Levels from "../components/sections/Levels";
import Blog from "../components/sections/Blog";
import Gallery from "../components/sections/Gallery";
import Newsletter from "../components/sections/Newsletter";
import Testimonial from "../components/sections/Testimonial";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <HolisticHealingIntro />
      <AwakenSelfHealing />
      <AboutJane />
      <Levels />
      <Blog />
      <Gallery />
      <Newsletter />
      <Testimonial />
    </main>
  );
}
