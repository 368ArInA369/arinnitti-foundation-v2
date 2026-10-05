import { useEffect, type RefObject } from "react";

/**
 * One scroll listener for the whole page.
 *
 * Every scroll-linked effect (parallax, the progress bar, text that lights up
 * as you read it) subscribes here instead of adding its own listener. Each
 * frame runs in two passes: all the reads first, then all the writes. Reading
 * layout and writing styles in alternation forces the browser to recalculate
 * layout once per element; batching them keeps it to once per frame.
 */
type Write = () => void;
type Read = () => Write | undefined;

const subscribers = new Set<Read>();
let frame = 0;
let bound = false;

function run() {
  frame = 0;
  const writes: Write[] = [];
  subscribers.forEach((read) => {
    const write = read();
    if (write) writes.push(write);
  });
  writes.forEach((write) => write());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(run);
}

function bind() {
  if (bound) return;
  bound = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

/** Run `read` on every scroll frame. It may return a function that writes. */
export function subscribeToScroll(read: Read): () => void {
  subscribers.add(read);
  bind();
  schedule();
  return () => {
    subscribers.delete(read);
  };
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

interface ProgressOptions {
  /** Viewport fraction (0 top, 1 bottom) where the element's top edge starts the effect. Default 1. */
  start?: number;
  /** Viewport fraction where the element's bottom edge finishes it. Default 0. */
  end?: number;
  /** CSS custom property that receives the 0 to 1 value. Default `--p`. */
  name?: string;
  enabled?: boolean;
}

/**
 * Writes how far an element has travelled through the viewport to a CSS
 * custom property on that element, as a number from 0 to 1.
 *
 * It sets a variable rather than React state, so scrolling never re-renders
 * anything; the stylesheet does the rest with `calc(var(--p) * ...)`.
 *
 * With the defaults, 0 means the element's top has just entered at the bottom
 * of the screen and 1 means its bottom has just left at the top. For a hero
 * that starts at the top of the page, use `{ start: 0, end: 0 }`.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | SVGElement | null>,
  { start = 1, end = 0, name = "--p", enabled = true }: ProgressOptions = {},
) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let last = -1;
    return subscribeToScroll(() => {
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      const span = viewport * (start - end) + rect.height;
      const value = span > 0 ? clamp((viewport * start - rect.top) / span) : 0;
      if (Math.abs(value - last) < 0.0005) return undefined;
      last = value;
      return () => element.style.setProperty(name, value.toFixed(4));
    });
  }, [ref, start, end, name, enabled]);
}
