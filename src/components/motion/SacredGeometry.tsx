import { useRef, type CSSProperties } from "react";
import { useScrollProgress } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * A flower of life with a ring of rays: nineteen overlapping circles, the
 * geometry the Foundation's own copy calls sacred, drawn as a sun.
 *
 * Each circle is a path whose length is normalised to 1, so "how much of it is
 * drawn" is one number. The scroll value `--p` runs from 0 to 1 as the section
 * passes, and each circle has an offset `--o` so they appear centre first and
 * outwards, like ripples. Colour comes from `currentColor`.
 */
const R = 100;

const circles: { x: number; y: number; o: number }[] = [{ x: 0, y: 0, o: 0 }];
for (let k = 0; k < 6; k++) {
  const a = (k * Math.PI) / 3;
  circles.push({ x: Math.cos(a) * R, y: Math.sin(a) * R, o: 0.12 });
}
for (let k = 0; k < 6; k++) {
  const a = Math.PI / 6 + (k * Math.PI) / 3;
  circles.push({ x: Math.cos(a) * R * Math.sqrt(3), y: Math.sin(a) * R * Math.sqrt(3), o: 0.3 });
}
for (let k = 0; k < 6; k++) {
  const a = (k * Math.PI) / 3;
  circles.push({ x: Math.cos(a) * R * 2, y: Math.sin(a) * R * 2, o: 0.48 });
}

const rays = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2;
  const long = i % 3 === 0;
  const inner = 322;
  const outer = inner + (long ? 54 : 26);
  return {
    x1: Math.cos(a) * inner,
    y1: Math.sin(a) * inner,
    x2: Math.cos(a) * outer,
    y2: Math.sin(a) * outer,
    o: 0.6 + (i / 36) * 0.3,
  };
});

export default function SacredGeometry({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  useScrollProgress(ref, { start: 0.95, end: 0.1, enabled: !reduced });

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="-380 -380 760 760"
      className={`geo ${reduced ? "geo-still" : ""} ${className}`}
    >
      <g className="geo-spin">
        {circles.map((c, i) => (
          <circle key={i} className="geo-line" pathLength={1} cx={c.x} cy={c.y} r={R} style={{ "--o": c.o } as CSSProperties} />
        ))}
        <circle className="geo-line" pathLength={1} cx={0} cy={0} r={R * 3} style={{ "--o": 0.62 } as CSSProperties} />
        <circle className="geo-line" pathLength={1} cx={0} cy={0} r={R * 3.12} style={{ "--o": 0.7 } as CSSProperties} />
        {rays.map((r, i) => (
          <line key={i} className="geo-line" pathLength={1} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} style={{ "--o": r.o } as CSSProperties} />
        ))}
      </g>
    </svg>
  );
}
