import { useLocale } from "@/i18n/LocaleContext";
import { tribe } from "@/content/home";
import Kicker from "@/components/ui/Kicker";
import ArrowLink from "@/components/ui/ArrowLink";

export default function SunTribe() {
  const { t } = useLocale();

  return (
    <section id="tribe" className="bg-bone">
      <div className="container-page flex flex-wrap items-center gap-8 py-14 md:gap-14 md:py-24">
        <div className="min-w-0 flex-[1_1_360px]">
          <img
            src={tribe.image}
            alt={t(tribe.alt)}
            width={1000}
            height={1442}
            loading="lazy"
            decoding="async"
            className="h-[320px] w-full object-cover md:h-[470px]"
          />
        </div>

        <div className="min-w-0 flex-[1_1_420px]">
          <Kicker className="mb-4 md:mb-5">{t(tribe.kicker)}</Kicker>
          <h2 className="m-0 mb-5 font-display text-[34px] font-light leading-[1.1] tracking-[-0.015em] text-ink md:mb-6 md:text-[46px]">
            {t(tribe.title)}
          </h2>
          <p className="m-0 mb-6 text-base leading-[1.68] text-body md:mb-[30px] md:text-[17.5px]">
            {t(tribe.body)}
          </p>
          <ArrowLink href="#tribe">{t(tribe.cta)}</ArrowLink>
        </div>
      </div>
    </section>
  );
}
