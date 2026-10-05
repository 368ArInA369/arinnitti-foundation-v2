import { Fragment, type CSSProperties, type ElementType } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  /** Milliseconds before the first word starts rising. */
  delay?: number;
  /** Milliseconds between one word and the next. */
  step?: number;
}

/**
 * A heading whose words rise out of a mask, one after another.
 *
 * It splits on ordinary spaces only. Some of the hero copy joins words with
 * non-breaking spaces (U+00A0) on purpose, to stop a line ending on an orphan;
 * those stay together as one unit and rise as one.
 *
 * The words are left in the accessibility tree as ordinary inline text, with
 * a real space between each, so a screen reader reads the heading as a
 * sentence. Hiding them behind an aria-label would be fragile: labels are
 * ignored on some elements this is used with.
 */
export default function SplitWords({ text, as: Tag = "span", className = "", delay = 0, step = 55 }: Props) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={`split ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms`, "--s": `${step}ms` } as CSSProperties}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="split-word">
            <span style={{ "--i": index } as CSSProperties}>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
