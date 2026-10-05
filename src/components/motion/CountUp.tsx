import { useEffect, useMemo, useState } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Splits "$25 — $5,000" into ["$", "25", " — $", "5,000", ""]; numbers sit at odd indexes. */
const NUMBER = /(\d[\d,]*(?:\.\d+)?)/;

function format(token: string, progress: number): string {
  const decimals = (token.split(".")[1] ?? "").length;
  const value = parseFloat(token.replace(/,/g, "")) * progress;
  return token.includes(",")
    ? value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toFixed(decimals);
}

/**
 * Counts every number in the string up from zero when it scrolls into view.
 *
 * A string with no digits, such as the "[X]" placeholders still standing in
 * for real figures, is shown as it is. Nothing is invented: the day a real
 * number replaces a placeholder in `content/home.ts`, it starts counting.
 */
export default function CountUp({ value, duration = 1700 }: { value: string; duration?: number }) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6, rootMargin: "0px" });
  const [progress, setProgress] = useState(0);
  const parts = useMemo(() => value.split(NUMBER), [value]);
  const animated = parts.length > 1 && !reduced;

  useEffect(() => {
    if (!animated || !inView) return;
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration);
      setProgress(1 - Math.pow(1 - t, 4));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated, inView, duration]);

  if (!animated) return <>{value}</>;

  const shown = parts.map((part, index) => (index % 2 === 1 ? format(part, progress) : part)).join("");

  return (
    <span ref={ref} aria-label={value} className="tabular-nums">
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
