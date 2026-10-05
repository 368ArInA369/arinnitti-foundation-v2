import { useLocale } from "@/i18n/LocaleContext";
import { evidence } from "@/content/home";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";

/**
 * Concrete numbers, placed directly after the hero and before any mission
 * copy. A first-time visitor gets something checkable before being asked to
 * believe anything.
 *
 * Every figure is a placeholder. Do not invent values — see design/README.md.
 * Each figure goes through <CountUp>, which counts up from zero once a real
 * number is in place and leaves a "[X]" placeholder exactly as written.
 */
export default function EvidenceBand() {
  const { t } = useLocale();

  return (
    <section aria-label="What exists today" className="border-b border-hairline bg-surface">
      <div className="container-page py-9 md:py-[54px]">
        <div className="grid grid-cols-2 gap-6 gap-y-6 md:grid-cols-4 md:gap-10">
          {evidence.stats.map((stat, index) => (
            <Reveal
              key={stat.label.en}
              delay={index * 110}
              className={`border-l-2 pl-3.5 md:pl-5 ${index === 0 ? "border-gold-deep" : "border-gold-faint"}`}
            >
              <p className="m-0 font-display text-[38px] font-normal leading-none text-ink md:text-[50px]">
                <CountUp value={stat.figure} />
              </p>
              <p className="m-0 mt-1.5 text-[12.5px] font-semibold text-muted md:mt-2 md:text-[13.5px]">
                {t(stat.label)}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delay={450} className="m-0 mt-5 text-[13px] leading-relaxed text-muted md:mt-[30px] md:text-sm">
          {t(evidence.registration)}
        </Reveal>
      </div>
    </section>
  );
}
