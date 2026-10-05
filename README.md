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
- **The hero is video.** A brand animation — a hand raising an orb that forms
  into the sun wheel over a jungle sunrise. The 2560×1440 source was 11.3 MB at
  19.6 Mbps; shipped as a 1.2 MB VP9 WebM with a 1.9 MB H.264 MP4 fallback,
  audio stripped, plus a 0.2 MB poster.

  It autoplays muted once and holds its final frame — it does not loop, because
  the animation resolves to the logo and restarting from the sunrise reads as a
  glitch. Add `loop` to the `<video>` in `src/components/sections/Hero.tsx` if
  you want it cycling.

  Visitors who have asked their system for reduced motion get the poster frame
  instead, with no video element at all.

## Motion

The page moves in one idea: a sunrise. Gold lines draw, words rise out of a
mask, and light arrives as you scroll. Nothing loops except the sun wheel
turning once every 48 seconds, and nothing plays that is not either triggered by
scrolling or finished within two seconds of arriving.

| Where | What it does |
| --- | --- |
| Header | A gold line along the bottom grows with how far down the page you are; the sun-wheel mark turns one and a half times over the whole page |
| Hero | The headline rises word by word. The footage drifts and zooms as you scroll away while the copy lifts and fades. A thin line falls beside it |
| Every kicker | The gold rule draws out, then the label follows |
| Evidence band | Figures count up from zero once they are real numbers. `[X]` placeholders are left exactly as written |
| Places | Each photograph wipes in from the side it sits on, settles from a zoom, then drifts against the scroll. The copy follows line by line |
| Slogan band | "Heaven on Earth" in three languages, one row sliding left and one right with the scroll position |
| Mission | A flower of life draws itself outward from the centre and turns as the band passes. The statement lights up word by word as you read it |
| Sun Tribe | The portrait wipes in; the sun wheel turns slowly behind its corner |
| Patron tiers | The cards rise in turn, amounts count up, and warm light follows the pointer across the card |
| Buttons | A band of light crosses on hover and keyboard focus |

### How it is built

No animation library. Four small pieces carry all of it:

- `src/lib/scroll.ts` — one scroll listener for the whole page, reading layout
  first and writing styles second each frame. Components get a scroll value as
  a CSS custom property (`--p`, `--hp`, `--page-p`), so scrolling never
  re-renders React; the stylesheet turns the value into movement with `calc()`.
- `src/lib/useInView.ts` — the entrance trigger.
- `src/components/motion/` — `Reveal`, `SplitWords`, `ParallaxImage`,
  `CountUp`, `ScrubText`, `SacredGeometry`, `SloganMarquee`.
- The "Motion" block at the bottom of `src/index.css`. It is plain CSS outside
  any `@layer` on purpose: some class names are assembled in code
  (`reveal-${variant}`), which Tailwind's scanner cannot see, and a layered rule
  would be purged as unused.

### Reduced motion

Visitors who ask their system for reduced motion get none of it. The components
render plain elements with none of the classes that hide things, so nothing is
ever left invisible for them. The hero shows its poster frame, as before. The
check is read synchronously on first render, so there is no flash of the hidden
starting state.

### Two rules to keep when adding more

1. **Never watch an element that is clipped to nothing.** An observer measures
   the visible part of the element it watches. A `clip-path` wipe on that same
   element means it never counts as visible, so it never reveals. Watch an outer
   frame and wipe an inner layer, as `ParallaxImage` does.
2. **Keep text readable at rest.** Words that light up with scroll never fall
   below 30% opacity and are all fully lit before the paragraph leaves the
   screen; the pointer spotlight on the patron cards is pale enough to keep the
   muted labels above 4.5:1.

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
