import { useLocale } from "@/i18n/LocaleContext";
import { hero } from "@/content/home";
import { asset } from "@/lib/asset";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section id="top" className="on-dark relative flex min-h-[560px] items-end overflow-hidden bg-scrim md:min-h-[700px]">
      <img
        src={asset(hero.image)}
        alt={t(hero.alt)}
        width={1600}
        height={954}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Functional scrim for legibility, not decoration — and necessary
          given the source photography is only 852px wide. */}
      <div aria-hidden="true" className="absolute inset-0 bg-hero-scrim" />

      <div className="container-page relative pb-9 md:pb-[76px]">
        <Kicker tone="champagne" className="mb-[18px] md:mb-[26px]">
          {t(hero.kicker)}
        </Kicker>

        <h1 className="m-0 max-w-hero font-display text-[48px] font-light leading-[0.99] tracking-[-0.02em] text-white md:text-[92px] md:leading-[0.98]">
          {t(hero.title)}
        </h1>

        <p className="m-0 mt-5 max-w-lead text-base leading-relaxed text-[#EAE2D4] md:mt-[30px] md:text-[19px]">
          {t(hero.lead)}
        </p>

        <div className="mt-[26px] flex flex-col gap-2.5 md:mt-[38px] md:flex-row md:flex-wrap md:gap-3.5">
          <Button href="#patrons" variant="onPhoto" size="lg" className="w-full md:w-auto">
            {t(hero.primaryCta)}
          </Button>
          <Button href="#places" variant="onPhotoOutline" size="lg" className="w-full md:w-auto">
            {t(hero.secondaryCta)}
          </Button>
        </div>
      </div>
    </section>
  );
}
