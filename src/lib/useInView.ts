import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Shrinks the trigger area; the default waits until the element is a little way up the screen. */
  rootMargin?: string;
  /** Stay revealed after the first time. Default true. */
  once?: boolean;
}

/**
 * Becomes true when the element scrolls into view.
 *
 * Returns the ref to attach and the flag. Used for entrance animations, where
 * `once` is what you want: content that has appeared should not hide again
 * when you scroll back up.
 */
export function useInView<E extends Element>({
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<E>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    /* Very old browsers: show everything rather than leave it hidden. */
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}
