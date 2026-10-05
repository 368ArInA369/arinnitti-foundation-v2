import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/i18n/LocaleContext";
import { LOCALES, LOCALE_META } from "@/i18n/locales";
import { donate, nav } from "@/content/home";
import { clamp, subscribeToScroll } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import Mark from "@/components/ui/Mark";
import Wordmark from "@/components/ui/Wordmark";

export default function Header() {
  const { locale, t, pathFor } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  /*
   * How far down the page the reader is, 0 to 1, published as `--page-p` on
   * the root element. The gold line under the header grows with it and the
   * sun-wheel mark turns with it. Skipped entirely for reduced motion.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const root = document.documentElement;
    let last = -1;
    const unsubscribe = subscribeToScroll(() => {
      const scrollable = root.scrollHeight - window.innerHeight;
      const value = scrollable > 0 ? clamp(window.scrollY / scrollable) : 0;
      if (Math.abs(value - last) < 0.0005) return undefined;
      last = value;
      return () => root.style.setProperty("--page-p", value.toFixed(4));
    });
    return () => {
      unsubscribe();
      root.style.removeProperty("--page-p");
    };
  }, [reducedMotion]);

  /* Escape closes the menu and returns focus to the toggle. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-gold-rule bg-bone">
      <div className="container-page flex h-[66px] items-center justify-between gap-8 md:h-[82px]">
        <Link to={pathFor(locale)} className="flex shrink-0 items-center gap-2.5 text-gold-deep no-underline md:gap-3">
          <Mark size={30} className="page-spin md:hidden" />
          <Mark size={38} className="page-spin hidden md:block" />
          <Wordmark />
        </Link>

        {/* Desktop navigation. The previous site hid all 11 pages behind a
            hamburger at every width, including 1440px. */}
        <nav aria-label="Main" className="hidden flex-grow lg:block">
          <ul className="m-0 flex list-none flex-wrap gap-[30px] p-0">
            {nav.map((item, index) => (
              <li key={item.label.en}>
                <a href={item.href} className="flex items-baseline gap-[7px] no-underline">
                  <span className="text-[10.5px] font-bold text-gold-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-body">{t(item.label)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3 md:gap-[18px]">
          <div className="hidden items-center gap-[7px] text-[12.5px] font-semibold md:flex">
            {LOCALES.map((code, index) => (
              <span key={code} className="flex items-center gap-[7px]">
                {index > 0 && <span aria-hidden="true" className="text-muted">/</span>}
                <Link
                  to={pathFor(code)}
                  hrefLang={LOCALE_META[code].htmlLang}
                  aria-current={code === locale ? "true" : undefined}
                  className={
                    code === locale
                      ? "border-b-2 border-gold-deep pb-0.5 text-ink no-underline"
                      : "text-muted no-underline hover:text-ink"
                  }
                >
                  {LOCALE_META[code].short}
                </Link>
              </span>
            ))}
          </div>

          <a
            href="#patrons"
            className="inline-flex h-10 items-center rounded-full bg-gold-rich px-4 text-xs font-bold uppercase tracking-[0.08em] text-white no-underline transition-colors hover:bg-[#5E3A06] md:h-11 md:px-6 md:text-[13.5px] md:tracking-[0.1em]"
          >
            {t(donate)}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-hairline lg:hidden"
          >
            {menuOpen ? (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="#1C1A17" strokeWidth="1.8" aria-hidden="true">
                <path d="M1 1l15 15M16 1L1 16" />
              </svg>
            ) : (
              <svg width="19" height="13" viewBox="0 0 19 13" fill="none" stroke="#1C1A17" strokeWidth="1.8" aria-hidden="true">
                <path d="M0 1h19M0 6.5h19M0 12h19" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Reading progress: a gold line along the header's lower edge. */}
      {!reducedMotion && <div aria-hidden="true" className="page-progress" />}

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-hairline bg-bone lg:hidden">
          <nav aria-label="Mobile" className="container-page py-6">
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {nav.map((item, index) => (
                <li key={item.label.en}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-3 py-3 no-underline"
                  >
                    <span className="text-[10.5px] font-bold text-gold-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-normal text-ink">{t(item.label)}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 border-t border-hairline pt-6 text-sm font-semibold">
              {LOCALES.map((code, index) => (
                <span key={code} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true" className="text-muted">/</span>}
                  <Link
                    to={pathFor(code)}
                    hrefLang={LOCALE_META[code].htmlLang}
                    aria-current={code === locale ? "true" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={code === locale ? "text-ink no-underline" : "text-muted no-underline"}
                  >
                    {LOCALE_META[code].long}
                  </Link>
                </span>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
