# Arinnitti Foundation — v2

A rebuild of [arinnitti.foundation](https://arinnitti.foundation), kept in a
separate repository so the two can run side by side and be compared live.

This is front-end only. The existing Supabase functions, Stripe links and
redirect map stay where they are.

## Run it

```sh
npm install
npm run dev      # http://127.0.0.1:5190
```

```sh
npm run build        # typecheck + production build
npm run typecheck    # types only
```

## Deploy (GitHub Pages)

Live at **https://368arina369.github.io/arinnitti-foundation-v2/**

One-time setup, both in the repository's own settings:

1. **Settings → General → Danger Zone → Change visibility → Public.**
   GitHub Pages needs a public repo on the free plan.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**

After that, every push to `main` builds and deploys through
`.github/workflows/deploy.yml`. Watch it under the Actions tab.

### What a subpath deploy requires

Pages serves this from `/arinnitti-foundation-v2/`, not from the domain root,
and it has no server-side rewrite rules. Four things follow from that:

- **`vite.config.ts`** sets `base` to `/arinnitti-foundation-v2/`, so built
  asset URLs carry the prefix. Override it with `BASE_PATH=/` when deploying
  somewhere that serves from root.
- **`src/main.tsx`** passes that same base to the router's `basename`, so
  `/arinnitti-foundation-v2/ru` resolves instead of 404ing.
- **`src/lib/asset.ts`** prefixes images from `public/`. A bare
  `/images/aerial.webp` would miss the subpath; `asset()` resolves it against
  `import.meta.env.BASE_URL`. Use it for anything you add to `public/`.
- **`scripts/spa-fallback.mjs`** copies `index.html` to `404.html` after each
  build. Pages serves `404.html` for unmatched paths, so a direct hit on
  `/ru` or `/es` boots the app and the router reads the real URL.

  The response status is genuinely 404, which is fine for a comparison build
  but would want a real host — or prerendering — if this ever became the
  primary site.

### Inert files kept for portability

`wrangler.jsonc`, `public/_redirects` and `public/_headers` do nothing on
GitHub Pages. They are left in place so the project can move to Cloudflare,
Netlify or your own server without redoing the routing work. If you move to a
root-served host, set `BASE_PATH=/` at build time.

`.node-version` pins the build to Node 20.

## What's built

The homepage, complete, in English, Russian and Spanish, plus the design system
it rests on. Other pages are not built yet.

## The design

Editorial layout on a warm bone ground, with the Foundation's gold as the
accent. Fraunces for display, Archivo for body.

Tokens live in `tailwind.config.ts`, with the measured contrast ratio written
beside each colour. Use them; don't hard-code hex values in components.

### Gold is three values, not one

This is the part that is easy to get wrong.

| Token | Value | Use | Contrast |
| --- | --- | --- | --- |
| `gold-deep` | `#8C5A10` | Links, kickers, rules, borders on light grounds | 5.38:1 on bone |
| `gold-rich` | `#7A4E0A` | Solid button fills, white text on top | 7.19:1 |
| `gold-champagne` | `#E8C98A` | **Dark grounds and photography only** | 10.65:1 on charcoal |
| `gold-numeral` | `#A87518` | Large decorative numerals, 32px+ only | 3.69:1 |

`gold-champagne` on the bone ground measures about 1.3:1 and disappears. If you
want gold text on a light background the answer is always `gold-deep`.

For reference, the live site uses a single `#DA950B` everywhere, which measures
**2.44:1** as text on cream. Its primary button — white on a gold gradient —
measures between **1.57:1** and **3.32:1** depending on where you sample it.

`#B8862B` was tried for the numerals and rejected at 2.97:1, three hundredths
under the 3:1 large-text threshold. Noted so nobody re-derives it.

## What this fixes

- **Navigation is visible.** The live site hides all 11 pages behind a hamburger
  at every width including 1440px, and its footer carries no page links at all.
- **Language is in the URL.** `/en`, `/ru`, `/es`, with `hreflang` and a correct
  `<html lang>`. The live site keeps language in React state, so it resets to
  English on every reload, can't be linked to, and is only ever indexed in
  English — roughly two thirds of the translation work is unreachable.
- **Evidence before mission.** Concrete numbers sit directly under the hero,
  before any copy asking you to believe something.
- **Patron tiers on the homepage.** $25 and $100,000 on one screen. On the live
  site the one-click ladder stops at $500 and the next step is $25,000 behind an
  inquiry form on a separate 8,245px page.
- **A real footer** with a sitemap, legal entity, registration and policy links.
- **Accessibility**: skip link, Escape closes the menu, labelled inputs, 44px
  tap targets, visible focus rings. All absent or broken on the live site.
- **Images are WebP.** The eight used here went from ~11 MB to 1.2 MB (−89%).

## Placeholders — do not invent these

Text in `[SQUARE BRACKETS]` is a fact nobody has supplied:

`[LEGAL ENTITY NAME]` · `[STREET ADDRESS]` · `[CITY, COUNTRY]` · `[NUMBER]`
(registration) · `[COUNTRY]` · `[YEAR]` (founded) · `[X]` (hectares, people
hosted, structures completed, % of donations to programmes)

Plus the Quantum Cacao block: its eyebrow and description are placeholders in
all three languages, and `image` is `null`. Its page at
<https://crx.travel/ru/paradise/quantum-cacao> was unreachable from the
environment this was built in, so nothing was transcribed and nothing invented.
Until a photo exists the block renders a labelled placeholder panel rather than
borrowing another place's image.

They are left visible on purpose. The live site makes no verifiable claim
anywhere — no registration, no governance, no financials, no impact figures —
and that gap costs more donations than any visual choice in this repo.

## Translations

Copy reused from the existing site is marked `reused` in `src/content/home.ts`
and was written by the Foundation. Strings written for this redesign are marked
`new`; their Russian and Spanish are machine translations and need a native
speaker. See `TRANSLATION-REVIEW.md`.

## Structure

```
src/
  i18n/            locale type, context, hreflang + <html lang> handling
  content/home.ts  all homepage copy, trilingual, with provenance notes
  components/
    layout/        Header, Footer
    ui/            Kicker, Button, ArrowLink, Mark, Wordmark
    sections/      Hero, EvidenceBand, PlaceBlock, Mission, SunTribe, PatronTiers
  pages/Home.tsx
```

## Known constraints

- **Photography is low resolution.** The Costa Rica images are video
  screengrabs — the aerial is 852×508, the garden 1013×761. They hold at the
  sizes used here, but a full-bleed desktop hero wants ~2560px. Worth a reshoot.
- The newsletter form is not wired up. Point it at the existing Supabase
  `subscribe` edge function.
- Donate buttons are anchors, not checkout. Wire to the existing Stripe links,
  and add custom-amount and monthly options — neither exists today.
