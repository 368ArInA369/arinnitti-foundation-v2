/**
 * Sacred-geometry mark, drawn inline.
 *
 * Deliberately not an <img>: the previous site loaded its logo from an
 * absolute production URL, so it broke on previews, staging and offline.
 * Inline SVG costs no request and inherits colour.
 */
export default function Mark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      className={className}
    >
      <circle cx="16" cy="16" r="6.2" />
      <circle cx="16" cy="16" r="11.4" strokeDasharray="2.4 3.4" />
      <path d="M16 1.6v4M16 26.4v4M1.6 16h4M26.4 16h4" />
    </svg>
  );
}
