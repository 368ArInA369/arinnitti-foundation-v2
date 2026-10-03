import { asset } from "@/lib/asset";

/**
 * The Foundation's sun-wheel mark.
 *
 * Bundled from the original project's artwork and served locally. The old site
 * loads its logo from an absolute production URL, so it breaks on previews,
 * staging and offline — this does not.
 *
 * The gold has enough contrast against both the bone and charcoal grounds, so
 * one file serves every placement; there is no light/dark variant to choose.
 */
export default function Mark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={asset("/images/wheel.webp")}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
