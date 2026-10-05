import { Fragment, useRef, type CSSProperties } from "react";
import { useScrollProgress } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * A paragraph that lights up word by word as you scroll through it.
 *
 * One scroll value (`--p`) goes on the paragraph; each word knows only its own
 * position (`--i`) and the total (`--n`), and the stylesheet works out its
 * brightness. No per-word JavaScript, and no re-rendering while scrolling.
 *
 * The words dim to 30% at the lowest, never invisible, and are all fully lit
 * before the paragraph leaves the screen. Reduced motion gets plain text.
 *
 * The words stay in the accessibility tree as ordinary text. (An aria-label
 * would not help here: it is not supported on a plain paragraph, so hiding the
 * words behind one would leave a screen reader with nothing to read.)
 */
export default function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollProgress(ref, { start: 0.88, end: 0.4, enabled: !reduced });

  if (reduced) return <p className={className}>{text}</p>;

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="scrub-word" style={{ "--i": index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
