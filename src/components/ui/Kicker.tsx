/**
 * Gold hairline plus a tracked uppercase label.
 *
 * This pairing is the design's recurring signature — the rule and the label
 * always travel together. `tone` picks the gold: `deep` reads on light
 * grounds, `champagne` on charcoal and over photography. Champagne on a light
 * ground measures about 1.3:1 and disappears, so the two are not
 * interchangeable.
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

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <span aria-hidden="true" className={`h-px w-8 md:w-[46px] ${rule}`} />
      <p className={`m-0 text-[10px] font-bold uppercase tracking-[0.18em] md:text-[11.5px] md:tracking-[0.3em] ${color}`}>
        {children}
      </p>
    </div>
  );
}
