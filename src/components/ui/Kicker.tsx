import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Gold hairline plus a tracked uppercase label.
 *
 * This pairing is the design's recurring signature — the rule and the label
 * always travel together. `tone` picks the gold: `deep` reads on light
 * grounds, `champagne` on charcoal and over photography. Champagne on a light
 * ground measures about 1.3:1 and disappears, so the two are not
 * interchangeable.
 *
 * When it scrolls into view the rule draws out from the left and the label
 * follows it. Reduced motion gets it fully drawn from the start.
 */
export default function Kicker({
  children,
  tone = "deep",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "deep" | "champagne";
  className?: string;
}) {
  const color = tone === "deep" ? "text-gold-deep" : "text-gold-champagne";
  const rule = tone === "deep" ? "bg-gold-deep" : "bg-gold-champagne";

  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.6, rootMargin: "0px" });
  const motion = reduced ? "" : "kicker";

  return (
    <div ref={ref} className={`flex items-center gap-3.5 ${motion} ${inView ? "is-in" : ""} ${className}`}>
      <span aria-hidden="true" className={`h-px w-8 md:w-[46px] ${rule} ${reduced ? "" : "kicker-rule"}`} />
      <p
        className={`m-0 text-[10px] font-bold uppercase tracking-[0.18em] md:text-[11.5px] md:tracking-[0.3em] ${color} ${
          reduced ? "" : "kicker-text"
        }`}
      >
        {children}
      </p>
    </div>
  );
}
