import { useLocale } from "@/i18n/LocaleContext";
import { places, placesHeading } from "@/content/home";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import EvidenceBand from "@/components/sections/EvidenceBand";
import PlaceBlock from "@/components/sections/PlaceBlock";
import Mission from "@/components/sections/Mission";
import SunTribe from "@/components/sections/SunTribe";
import PatronTiers from "@/components/sections/PatronTiers";
import Kicker from "@/components/ui/Kicker";
import SplitWords from "@/components/motion/SplitWords";
import SloganMarquee from "@/components/motion/SloganMarquee";

export default function Home() {
  const { t } = useLocale();

  return (
    <>
      <a href="#main" className="sr-only-focusable z-50 bg-gold-rich px-4 py-2 text-white">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <EvidenceBand />

        <section id="places" className="bg-bone">
          <div className="container-page pb-6 pt-14 md:pb-10 md:pt-24">
            <Kicker className="mb-3.5 md:mb-[18px]">{t(placesHeading.kicker)}</Kicker>
            <SplitWords
              as="h2"
              text={t(placesHeading.title)}
              className="m-0 block max-w-heading font-display text-[36px] font-light leading-[1.08] tracking-[-0.015em] text-ink md:text-[54px]"
            />
          </div>

          {places.map((place) => (
            <PlaceBlock key={place.numeral} place={place} />
          ))}

          <div className="pb-8 md:pb-14" />
        </section>

        <SloganMarquee />
        <Mission />
        <SunTribe />
        <PatronTiers />
      </main>

      <Footer />
    </>
  );
}
