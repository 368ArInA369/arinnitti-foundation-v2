import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/*
 * Opacity-based variants only. A wipe (`clip-path`) must not be used here: the
 * element being watched would be clipped to nothing and never count as visible.
 * ParallaxImage shows how to wipe safely, with a separate observed frame.
 */
type Variant = "up" | "fade";

interface Props extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  as?: ElementType;
  variant?: Variant;
  /** Milliseconds to wait after entering view. Use it to stagger siblings. */
  delay?: number;
  children: ReactNode;
}

/**
 * Fades or wipes its children in the first time they scroll into view.
 *
 * Visitors who prefer reduced motion get the plain element, with none of the
 * classes that hide it, so nothing is ever left invisible for them.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLElement>();

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
