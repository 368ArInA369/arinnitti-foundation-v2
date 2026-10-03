import type { ReactNode } from "react";

/** Text link with a trailing arrow, used to leave each section. */
export default function ArrowLink({
  children,
  href,
  tone = "deep",
}: {
  children: ReactNode;
  href: string;
  tone?: "deep" | "champagne";
}) {
  const color = tone === "deep" ? "text-gold-deep" : "text-gold-champagne";
  const stroke = tone === "deep" ? "#8C5A10" : "#E8C98A";

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 text-[13.5px] font-bold uppercase tracking-[0.08em] no-underline md:text-sm ${color}`}
    >
      {children}
      <svg
        width="17"
        height="11"
        viewBox="0 0 17 11"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        <path d="M0 5.5h15M10.5 1l4.8 4.5-4.8 4.5" />
      </svg>
    </a>
  );
}
