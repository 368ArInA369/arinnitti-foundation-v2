import type { CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import { useScrollProgress } from "@/lib/scroll";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Sizes the frame: give it a height, e.g. `h-[240px] md:h-[400px]`. */
  className?: string;
  /** The edge the wipe starts from when the image first appears. */
  from?: "left" | "right" | "up";
  /** How far the photograph drifts inside its frame, as a percentage of its height. */
  strength?: number;
}

/**
 * A photograph that is wiped in, settles from a slight zoom, and then drifts
 * against the scroll so it seems to sit behind its frame.
 *
 * The image is drawn 18% larger than the frame so its edges never show while
 * it drifts. Reduced motion gets the plain image at its normal size.
 */
export default function ParallaxImage({ src, alt, width, height, className = "", from = "left", strength = 9 }: Props) {
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.12 });
  useScrollProgress(ref, { enabled: !reduced });

  if (reduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  /*
   * Two layers on purpose. The outer frame is what the observer watches and
   * what clips the drifting photograph; the inner layer is what gets wiped.
   * An observer measures the visible part of whatever it watches, so watching
   * the layer that is clipped to nothing would mean it never fires and the
   * photograph never appears.
   */
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div className={`reveal reveal-clip-${from} ${inView ? "is-in" : ""} h-full w-full`}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="parallax-img h-full w-full object-cover"
          style={{ "--k": strength } as CSSProperties}
        />
      </div>
    </div>
  );
}
