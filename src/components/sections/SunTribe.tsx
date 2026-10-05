import { useLocale } from "@/i18n/LocaleContext";
import { tribe } from "@/content/home";
import { asset } from "@/lib/asset";
import Kicker from "@/components/ui/Kicker";
import ArrowLink from "@/components/ui/ArrowLink";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";

export default function SunTribe() {
  const { t } = useLocale();

  return (
    <section id="tribe" className="overflow-hidden bg-bone">
      <div className="container-page flex flex-wrap items-center gap-8 py-14 md:gap-14 md:py-24">
        <div className="relative min-w-0 flex-[1_1_360px]">
          {/* The sun wheel turns slowly behind the portrait, showing at its corner. */}
          <img
            src={asset("/images/wheel.webp")}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -top-14 h-[240px] w-[240px] animate-spin-slow opacity-25 md:-left-20 md:-top-20 md:h-[360px] md:w-[360px]"
          />
          <ParallaxImage
            src={asset(tribe.image)}
            alt={t(tribe.alt)}
            width={1000}
            height={1442}
            from="up"
            strength={11}
            className="relative h-[320px] w-full md:h-[470px]"
          />
        </div>

        <div className="min-w-0 flex-[1_1_420px]">
          <Kicker className="mb-4 md:mb-5">{t(tribe.kicker)}</Kicker>
          <SplitWords
            as="h2"
            text={t(tribe.title)}
            className="m-0 mb-5 block font-display text-[34px] font-light leading-[1.1] tracking-[-0.015em] text-ink md:mb-6 md:text-[46px]"
          />
          <Reveal as="p" delay={150} className="m-0 mb-6 text-base leading-[1.68] text-body md:mb-[30px] md:text-[17.5px]">
            {t(tribe.body)}
          </Reveal>
          <Reveal delay={260}>
            <ArrowLink href="#tribe">{t(tribe.cta)}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
