export const LOCALES = ["en", "ru", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Translated string, one entry per locale. */
export type T = Record<Locale, string>;

export const LOCALE_META: Record<Locale, { short: string; long: string; htmlLang: string }> = {
  en: { short: "EN", long: "English", htmlLang: "en" },
  ru: { short: "RU", long: "Русский", htmlLang: "ru" },
  es: { short: "ES", long: "Español", htmlLang: "es" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

/**
 * Best match from the browser's preferred languages, falling back to English.
 * Only consulted when the visitor lands without a locale in the path.
 */
export function detectLocale(preferred: readonly string[]): Locale {
  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}
