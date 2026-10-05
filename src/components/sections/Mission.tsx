import { useLocale } from "@/i18n/LocaleContext";
import { mission } from "@/content/home";
import Kicker from "@/components/ui/Kicker";
import Reveal from "@/components/motion/Reveal";
import SacredGeometry from "@/components/motion/SacredGeometry";
import ScrubText from "@/components/motion/ScrubText";

/**
 * The dark band. Behind the text a flower of life draws itself and slowly
 * turns as the section passes, and the statement lights up word by word as
 * you read down it. The geometry is faint on purpose: it sits behind copy and
 * must not lower its contrast.
 */
export default function Mission() {
  const { t } = useLocale();

  return (
    <section id="mission" className="on-dark relative overflow-hidden bg-charcoal">
      <SacredGeometry className="pointer-events-none absolute -right-[22%] top-1/2 w-[min(125vw,880px)] -translate-y-1/2 text-gold-champagne opacity-[0.34] md:-right-[8%]" />

      <div className="relative mx-auto w-full max-w-[1060px] px-5 py-14 md:px-14 md:py-28">
        <Kicker tone="champagne" className="mb-[18px] md:mb-[26px]">
          {t(mission.kicker)}
        </Kicker>

        <ScrubText
          text={t(mission.statement)}
          className="m-0 mb-6 font-display text-[30px] font-light leading-[1.22] tracking-[-0.012em] text-ink-inverse md:mb-[34px] md:text-[44px]"
        />

        <Reveal as="p" className="m-0 mb-6 max-w-lead text-base leading-[1.7] text-body-inverse md:text-[16.5px]">
          {t(mission.philosophy)}
        </Reveal>
        <Reveal delay={120}>
          <a
            href="#mission"
            className="text-[13.5px] font-bold uppercase tracking-[0.08em] text-gold-champagne underline underline-offset-4 md:text-sm"
          >
            {t(mission.cta)}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
