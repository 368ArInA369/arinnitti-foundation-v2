import { useRef } from "react";
import { slogan } from "@/content/home";
import { LOCALES } from "@/i18n/locales";
import { useScrollProgress } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import Mark from "@/components/ui/Mark";

/**
 * The Foundation's slogan in all three languages, set huge and moved by the
 * scroll: one row drifts left as you scroll down, the next drifts right.
 *
 * Tied to scroll position rather than a timer, so it never moves on its own
 * and stops the moment you do. It repeats text the hero already carries, so it
 * is hidden from assistive technology. Reduced motion gets one still row.
 */
function Row({ direction, outlineFirst }: { direction: "left" | "right"; outlineFirst: boolean }) {
  const phrases = LOCALES.map((code) => ({ code, text: slogan[code] }));
  /* Repeated so the row is always wider than the screen, whichever way it has moved. */
  const run = [...phrases, ...phrases, ...phrases];

  return (
    <div className={`marquee-track marquee-${direction} flex w-max items-center gap-8 md:gap-14`}>
      {run.map((item, index) => {
        const outlined = (index % 2 === 0) === outlineFirst;
        return (
          <span key={`${item.code}-${index}`} className="flex items-center gap-8 md:gap-14">
            <span
              lang={item.code}
              className={`whitespace-nowrap font-display text-[64px] font-light leading-none tracking-[-0.02em] md:text-[140px] ${
                outlined ? "text-transparent [-webkit-text-stroke:1.5px_theme(colors.gold.deep)]" : "text-ink"
              }`}
            >
              {item.text}
            </span>
            <Mark size={56} className="animate-spin-slow opacity-80" />
          </span>
        );
      })}
    </div>
  );
}

export default function SloganMarquee() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, { start: 1, end: 0, enabled: !reduced });

  return (
    <div ref={ref} aria-hidden="true" className="overflow-hidden border-y border-gold-rule bg-bone py-8 md:py-14">
      <Row direction="left" outlineFirst={false} />
      {!reduced && (
        <div className="mt-2 md:mt-4">
          <Row direction="right" outlineFirst />
        </div>
      )}
    </div>
  );
}
