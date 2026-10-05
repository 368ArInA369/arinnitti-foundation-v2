import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * True when the visitor has asked their system for reduced motion.
 *
 * Reads the preference synchronously on first render. This is a client-only
 * app, so there is no server markup to match, and starting at `false` would
 * flash every entrance animation's hidden state at someone who asked for none.
 * Autoplaying footage and scroll-driven motion for someone who has asked for
 * less movement is a real accessibility failure, not a nicety.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const query = window.matchMedia(QUERY);
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
