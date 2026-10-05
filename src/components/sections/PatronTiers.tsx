import type { PointerEvent } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { patrons, tiers } from "@/content/home";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";

/** Moves a soft pool of light under the pointer; the overlay itself is in the card. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - box.top}px`);
}

/**
 * Tiers surface on the homepage, so $25 and $100,000 sit on one screen.
 *
 * On the previous site a visitor had to open the hamburger and navigate to a
 * separate 8,245px page to learn that tiers existed at all — and the one-click
 * donation ladder stopped at $500, with nothing between that and $25,000.
 *
 * The three cards rise in one after another, their amounts count up, and a
 * warm light follows the pointer across whichever card it is over.
 */
export default function PatronTiers() {
  const { t } = useLocale();

  return (
    <section id="patrons" className="border-t border-hairline bg-surface">
      <div className="container-page py-14 md:py-24">
        <div className="mb-8 flex flex-wrap items-end gap-6 md:mb-12 md:gap-10">
          <div className="min-w-0 flex-[999_1_460px]">
            <Kicker className="mb-4 md:mb-5">{t(patrons.kicker)}</Kicker>
            <SplitWords
              as="h2"
              text={t(patrons.title)}
              className="m-0 block max-w-[20ch] font-display text-[34px] font-light leading-[1.08] tracking-[-0.015em] text-ink md:text-[50px]"
            />
          </div>
          <Reveal as="p" delay={200} className="m-0 flex-[1_1_300px] text-[15.5px] leading-[1.66] text-muted md:text-base">
            {t(patrons.lead)}
          </Reveal>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-5">
          {tiers.map((tier, index) => (
            <Reveal
              as="article"
              key={tier.label.en}
              delay={index * 140}
              onPointerMove={trackPointer}
              className={`group relative overflow-hidden bg-bone p-6 hover:shadow-[0_18px_44px_-24px_rgba(122,78,10,0.45)] md:p-8 ${
                tier.featured ? "border-[1.5px] border-gold-deep" : "border border-hairline"
              }`}
            >
              <span aria-hidden="true" className="spotlight" />
              <p
                className={`relative m-0 mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] md:text-[11.5px] md:tracking-[0.17em] ${
                  tier.featured ? "text-gold-deep" : "text-muted"
                }`}
              >
                {t(tier.label)}
              </p>
              <p className="relative m-0 mb-3 font-display text-[30px] font-normal leading-none text-ink md:mb-4 md:text-[36px]">
                <CountUp value={tier.amount} />
              </p>
              <p className="relative m-0 mb-5 text-[15px] leading-[1.62] text-body md:mb-[26px] md:text-[15.5px]">
                {t(tier.description)}
              </p>
              <div className="relative">
                <Button href="#patrons" variant={tier.featured ? "outline" : "filled"} block>
                  {t(tier.cta)}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="m-0 text-[13px] text-muted md:text-sm">{t(patrons.note)}</p>
      </div>
    </section>
  );
}
