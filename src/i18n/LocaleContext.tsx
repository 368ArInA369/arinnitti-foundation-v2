import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_META, LOCALES, type Locale, type T } from "./locales";

interface LocaleContextValue {
  locale: Locale;
  /** Resolve a translated string for the active locale. */
  t: (entry: T) => string;
  /** Path to the same page in another locale, e.g. `/ru` or `/ru/about`. */
  pathFor: (target: Locale, rest?: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Holds the active locale and keeps the document in sync with it.
 *
 * The locale comes from the URL, never from component state — so a page can
 * be linked, bookmarked, shared and indexed in each language. The previous
 * site kept it in React state only, which meant it reset to English on every
 * reload and search engines only ever saw the English copy.
 */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  useEffect(() => {
    const existing = document.head.querySelectorAll("link[data-hreflang]");
    existing.forEach((node) => node.remove());

    const { origin, pathname } = window.location;
    const rest = stripLocale(pathname);

    for (const code of LOCALES) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = LOCALE_META[code].htmlLang;
      link.href = `${origin}/${code}${rest}`;
      link.setAttribute("data-hreflang", "true");
      document.head.appendChild(link);
    }

    const fallback = document.createElement("link");
    fallback.rel = "alternate";
    fallback.hreflang = "x-default";
    fallback.href = `${origin}/${DEFAULT_LOCALE}${rest}`;
    fallback.setAttribute("data-hreflang", "true");
    document.head.appendChild(fallback);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: (entry: T) => entry[locale] ?? entry[DEFAULT_LOCALE],
      pathFor: (target: Locale, rest = "") => `/${target}${rest}`,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) {
    segments.shift();
  }
  return segments.length ? `/${segments.join("/")}` : "";
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside a LocaleProvider");
  return context;
}
