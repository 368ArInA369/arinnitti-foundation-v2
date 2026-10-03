export default function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className="block">
      <span
        className={`block font-display text-base font-medium tracking-[0.22em] md:text-xl md:tracking-[0.26em] ${
          inverse ? "text-ink-inverse" : "text-ink"
        }`}
      >
        ARINNITTI
      </span>
      <span
        className={`mt-0.5 block text-[10px] font-semibold tracking-[0.2em] md:text-[11px] md:tracking-[0.26em] ${
          inverse ? "text-muted-inverse" : "text-muted"
        }`}
      >
        FOUNDATION
      </span>
    </span>
  );
}
