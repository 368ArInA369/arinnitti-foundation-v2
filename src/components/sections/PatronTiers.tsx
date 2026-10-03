import { useLocale } from "@/i18n/LocaleContext";
import { patrons, tiers } from "@/content/home";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";

/**
 * Tiers surface on the homepage, so $25 and $100,000 sit on one screen.
 *
 * On the previous site a visitor had to open the hamburger and navigate to a
 * separate 8,245px page to learn that tiers existed at all — and the one-click
 * donation ladder stopped at $500, with nothing between that and $25,000.
 */
export default function PatronTiers() {
  const { t } = useLocale();

  return (
    <section id="patrons" className="border-t border-hairline bg-surface">
      <div className="container-page py-14 md:py-24">
        <div className="mb-8 flex flex-wrap items-end gap-6 md:mb-12 md:gap-10">
          <div className="min-w-0 flex-[999_1_460px]">
            <Kicker className="mb-4 md:mb-5">{t(patrons.kicker)}</Kicker>
            <h2 className="m-0 max-w-[20ch] font-display text-[34px] font-light leading-[1.08] tracking-[-0.015em] text-ink md:text-[50px]">
              {t(patrons.title)}
            </h2>
          </div>
          <p className="m-0 flex-[1_1_300px] text-[15.5px] leading-[1.66] text-muted md:text-base">
            {t(patrons.lead)}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-5">
          {tiers.map((tier) => (
            <article
              key={tier.label.en}
              className={`bg-bone p-6 md:p-8 ${
                tier.featured ? "border-[1.5px] border-gold-deep" : "border border-hairline"
              }`}
            >
              <p
                className={`m-0 mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] md:text-[11.5px] md:tracking-[0.17em] ${
                  tier.featured ? "text-gold-deep" : "text-muted"
                }`}
              >
                {t(tier.label)}
              </p>
              <p className="m-0 mb-3 font-display text-[30px] font-normal leading-none text-ink md:mb-4 md:text-[36px]">
                {tier.amount}
              </p>
              <p className="m-0 mb-5 text-[15px] leading-[1.62] text-body md:mb-[26px] md:text-[15.5px]">
                {t(tier.description)}
              </p>
              <Button href="#patrons" variant={tier.featured ? "outline" : "filled"} block>
                {t(tier.cta)}
              </Button>
            </article>
          ))}
        </div>

        <p className="m-0 text-[13px] text-muted md:text-sm">
          {t(patrons.note)}{" "}
          <a href="#footer" className="text-gold-deep underline underline-offset-[3px]">
            {t(patrons.noteLink)}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
