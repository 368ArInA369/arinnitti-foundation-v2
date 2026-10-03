import { useLocale } from "@/i18n/LocaleContext";
import { mission } from "@/content/home";
import Kicker from "@/components/ui/Kicker";

export default function Mission() {
  const { t } = useLocale();

  return (
    <section id="mission" className="on-dark bg-charcoal">
      <div className="mx-auto w-full max-w-[1060px] px-5 py-14 md:px-14 md:py-24">
        <Kicker tone="champagne" className="mb-[18px] md:mb-[26px]">
          {t(mission.kicker)}
        </Kicker>

        <p className="m-0 mb-6 font-display text-[30px] font-light leading-[1.22] tracking-[-0.012em] text-ink-inverse md:mb-[34px] md:text-[44px]">
          {t(mission.statement)}
        </p>

        <p className="m-0 mb-6 max-w-lead text-base leading-[1.7] text-body-inverse md:text-[16.5px]">
          {t(mission.philosophy)}
        </p>
        <a
          href="#mission"
          className="text-[13.5px] font-bold uppercase tracking-[0.08em] text-gold-champagne underline underline-offset-4 md:text-sm"
        >
          {t(mission.cta)}
        </a>
      </div>
    </section>
  );
}
