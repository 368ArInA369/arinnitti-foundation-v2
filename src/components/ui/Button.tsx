import type { ReactNode } from "react";

type Variant = "filled" | "outline" | "onPhoto" | "onPhotoOutline" | "champagne";
type Size = "lg" | "md" | "sm";

const VARIANTS: Record<Variant, string> = {
  /* 7.19:1 — white on rich gold */
  filled: "bg-gold-rich text-white hover:bg-[#5E3A06]",
  /* 5.38:1 — deep gold on bone */
  outline: "border-[1.5px] border-gold-deep text-gold-deep hover:bg-gold-deep hover:text-white",
  /* over photography: champagne fill, dark label */
  onPhoto: "bg-gold-champagne text-scrim hover:bg-[#F0D7A4]",
  onPhotoOutline: "border-[1.5px] border-white/55 text-white hover:bg-white/10",
  /* on charcoal bands */
  champagne: "bg-gold-champagne text-scrim hover:bg-[#F0D7A4]",
};

/* Every size clears the 44px minimum tap target. */
const SIZES: Record<Size, string> = {
  lg: "h-[54px] px-8",
  md: "h-12 px-6",
  sm: "h-11 px-6",
};

interface Props {
  children: ReactNode;
  href: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
}

/**
 * `btn-shine` (see index.css) sweeps a band of light across the button on
 * hover and keyboard focus. It is a decorative overlay with no pointer events
 * and never changes the label or fill colours the contrast ratios above rely on.
 */
export default function Button({
  children,
  href,
  variant = "filled",
  size = "md",
  block = false,
  className = "",
}: Props) {
  return (
    <a
      href={href}
      className={[
        "btn-shine inline-flex items-center justify-center rounded-full text-[13.5px] font-bold uppercase tracking-[0.1em] no-underline transition duration-300 hover:-translate-y-0.5",
        VARIANTS[variant],
        SIZES[size],
        block ? "flex w-full" : "",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
