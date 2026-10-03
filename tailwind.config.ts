import type { Config } from "tailwindcss";

/**
 * Design tokens for the Arinnitti Foundation rebuild.
 *
 * Every colour pair used in the UI was measured against WCAG AA
 * (4.5:1 for body text, 3:1 at 24px+). Ratios are noted inline.
 * Re-measure before introducing any new pair.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Grounds */
        bone: "#F8F5EE", // page background
        surface: "#FFFFFF", // raised bands: evidence, patron tiers
        charcoal: "#1E1C19", // dark bands: mission, footer
        "charcoal-raised": "#2A2824", // inputs inside dark bands
        scrim: "#231B12", // base under hero photography

        /* Text on light */
        ink: "#1C1A17", // headings            — 15.95:1 on bone
        body: "#4A443C", // body copy           —  8.83:1 on bone
        muted: "#6B655B", // captions, labels    —  5.30:1 on bone

        /* Text on dark */
        "ink-inverse": "#F8F5EE", // headings    — 15.61:1 on charcoal
        "body-inverse": "#D8D4CA", // body       — 11.49:1 on charcoal
        "muted-inverse": "#A8A298", // secondary

        /*
         * Gold is three values, not one. This is what makes it work on a
         * light ground. The old site used a single #DA950B everywhere,
         * which measures 2.44:1 as text on cream and fails AA.
         */
        gold: {
          deep: "#8C5A10", // links, kickers, rules  — 5.38:1 on bone
          rich: "#7A4E0A", // button fills, white text — 7.19:1
          champagne: "#E8C98A", // DARK GROUNDS ONLY  — 10.65:1 on charcoal
          numeral: "#A87518", // large numerals 32px+ —  3.69:1 on bone
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Archivo", "system-ui", "sans-serif"],
      },
      fontSize: {
        kicker: ["0.719rem", { lineHeight: "1", letterSpacing: "0.3em", fontWeight: "700" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.17em", fontWeight: "700" }],
      },
      maxWidth: {
        container: "1280px",
        hero: "13ch",
        lead: "52ch",
        heading: "18ch",
      },
      borderColor: {
        hairline: "rgba(28, 26, 23, 0.14)",
        "gold-rule": "rgba(140, 90, 16, 0.28)",
        "gold-faint": "rgba(140, 90, 16, 0.32)",
        "on-dark": "rgba(248, 245, 238, 0.16)",
      },
      backgroundImage: {
        /* Functional scrim for legibility over photography, not decoration. */
        "hero-scrim":
          "linear-gradient(to top, rgba(35,27,18,0.94) 2%, rgba(35,27,18,0.6) 45%, rgba(35,27,18,0.25) 100%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
