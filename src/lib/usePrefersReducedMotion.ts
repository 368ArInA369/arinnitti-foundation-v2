import { useEffect, useState } from "react";

/**
 * True when the visitor has asked their system for reduced motion.
 *
 * Starts false so the server-rendered and first-paint markup match, then
 * corrects on mount. Autoplaying footage for someone who has asked for less
 * movement is a real accessibility failure, not a nicety.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
