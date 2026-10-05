import { useRef } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { hero } from "@/content/home";
import { asset } from "@/lib/asset";
import { useScrollProgress } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";

export default function Hero() {
  const { t } = useLocale();
  const reducedMotion = usePrefersReducedMotion();

  /*
   * `--hp` is how far the hero has scrolled away, 0 to 1. The footage drifts
   * down and zooms slowly while the copy lifts and fades, so the page seems to
   * move through the scene instead of sliding over it.
   */
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref, { start: 0, end: 0, name: "--hp", enabled: !reducedMotion });

  return (
    <section
      ref={ref}
      id="top"
      className="on-dark relative flex min-h-[560px] items-end overflow-hidden bg-scrim md:min-h-[700px]"
    >
      <div className={`absolute inset-0 ${reducedMotion ? "" : "hero-media"}`}>
        {reducedMotion ? (
          /* Same frame the video opens on, held still. */
          <img
            src={asset(hero.poster)}
            alt={t(hero.alt)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={asset(hero.poster)}
            aria-label={t(hero.alt)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {/* WebM first: browsers that support VP9 take the 1.2 MB file
                rather than the 1.9 MB MP4. */}
            <source src={asset(hero.videoWebm)} type="video/webm" />
            <source src={asset(hero.videoMp4)} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Functional scrim for legibility, not decoration. */}
      <div aria-hidden="true" className="absolute inset-0 bg-hero-scrim" />

      <div className={`container-page relative pb-9 md:pb-[76px] ${reducedMotion ? "" : "hero-content"}`}>
        <Kicker tone="champagne" className="mb-[18px] md:mb-[26px]">
          {t(hero.kicker)}
        </Kicker>

        <SplitWords
          as="h1"
          text={t(hero.title)}
          delay={350}
          step={70}
          className="m-0 max-w-hero font-display text-[48px] font-light leading-[0.99] tracking-[-0.02em] text-white md:text-[92px] md:leading-[0.98]"
        />

        <Reveal as="p" delay={1000} className="m-0 mt-5 max-w-lead text-base leading-relaxed text-[#EAE2D4] md:mt-[30px] md:text-[19px]">
          {t(hero.lead)}
        </Reveal>

        <Reveal
          delay={1200}
          className="mt-[26px] flex flex-col gap-2.5 md:mt-[38px] md:flex-row md:flex-wrap md:gap-3.5"
        >
          <Button href="#patrons" variant="onPhoto" size="lg" className="w-full md:w-auto">
            {t(hero.primaryCta)}
          </Button>
          <Button href="#places" variant="onPhotoOutline" size="lg" className="w-full md:w-auto">
            {t(hero.secondaryCta)}
          </Button>
        </Reveal>
      </div>

      {/* A thin line that keeps falling, pointing at what is below. */}
      {!reducedMotion && <div aria-hidden="true" className="scroll-cue hidden md:block" />}
    </section>
  );
}
