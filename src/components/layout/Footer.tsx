import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { LOCALES, LOCALE_META } from "@/i18n/locales";
import { footer } from "@/content/home";
import Mark from "@/components/ui/Mark";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer() {
  const { locale, t, pathFor } = useLocale();

  return (
    <footer id="footer" className="on-dark border-t-2 border-gold-deep bg-charcoal">
      <div className="container-page py-12 md:py-[72px]">
        <div className="mb-10 flex flex-wrap gap-10 md:mb-14 md:gap-12">
          <div className="min-w-0 flex-[1_1_290px]">
            <div className="mb-5 flex items-center gap-3 text-gold-champagne">
              <Mark size={42} />
              <Wordmark inverse />
            </div>
            <p className="m-0 mb-[18px] text-[14.5px] leading-relaxed text-body-inverse">{t(footer.tagline)}</p>
            <p className="m-0 whitespace-pre-line text-[13.5px] leading-[1.75] text-muted-inverse">{footer.legal}</p>
          </div>

          {footer.columns.map((column) => (
            <div key={column.heading.en} className="flex-[0_1_160px]">
              <h2 className="m-0 mb-[15px] text-[11px] font-bold uppercase tracking-[0.2em] text-gold-champagne">
                {t(column.heading)}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                {column.links.map((link) => (
                  <li key={link.label.en}>
                    <a href={link.href} className="text-[14.5px] text-body-inverse no-underline hover:text-ink-inverse">
                      {t(link.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="min-w-0 flex-[1_1_250px]">
            <h2 className="m-0 mb-[15px] text-[11px] font-bold uppercase tracking-[0.2em] text-gold-champagne">
              {t(footer.connectHeading)}
            </h2>
            {/* A real label — the previous site's newsletter field had none,
                so screen readers announced nothing. */}
            <label htmlFor="newsletter-email" className="mb-2.5 block text-[14.5px] leading-snug text-body-inverse">
              {t(footer.newsletterLabel)}
            </label>
            <form
              className="flex max-w-sm gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                /* Wire to the existing Supabase `subscribe` edge function. */
              }}
            >
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 min-w-0 flex-grow rounded-sm border-[1.5px] border-white/30 bg-charcoal-raised px-3 text-base text-ink-inverse placeholder:text-muted-inverse"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-sm bg-gold-champagne px-[18px] text-sm font-bold text-scrim"
              >
                {t(footer.newsletterCta)}
              </button>
            </form>
            <a
              href="https://instagram.com/arinnitti.foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-[14.5px] font-semibold text-gold-champagne underline underline-offset-[3px]"
            >
              @arinnitti.foundation
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3 border-t border-on-dark pt-6">
          <p className="m-0 text-[13px] text-muted-inverse">{t(footer.copyright)}</p>
          <div className="flex items-center gap-2 text-[13px] font-semibold">
            {LOCALES.map((code, index) => (
              <span key={code} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true" className="text-muted-inverse">/</span>}
                <Link
                  to={pathFor(code)}
                  hrefLang={LOCALE_META[code].htmlLang}
                  aria-current={code === locale ? "true" : undefined}
                  className={code === locale ? "text-ink-inverse no-underline" : "text-muted-inverse no-underline"}
                >
                  {LOCALE_META[code].long}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
