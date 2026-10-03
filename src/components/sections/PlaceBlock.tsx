import { useLocale } from "@/i18n/LocaleContext";
import type { PlaceContent } from "@/content/home";
import ArrowLink from "@/components/ui/ArrowLink";

/**
 * Image and copy side by side, alternating down the page.
 *
 * `reversed` uses `wrap-reverse` rather than `row-reverse` so that when the
 * block stacks on a phone the image still lands above its own copy. With
 * `row-reverse` the stack interleaves and text ends up above the wrong image.
 */
export default function PlaceBlock({ place }: { place: PlaceContent }) {
  const { t } = useLocale();

  const media = (
    <div className="min-w-0 flex-[1_1_420px]">
      <img
        src={place.image}
        alt={t(place.alt)}
        width={1400}
        height={1050}
        loading="lazy"
        decoding="async"
        className="h-[240px] w-full object-cover md:h-[400px]"
      />
    </div>
  );

  const copy = (
    <div className="min-w-0 flex-[1_1_380px]">
      <p className="m-0 mb-2 font-display text-[32px] font-normal leading-none text-gold-numeral md:mb-3.5 md:text-[44px]">
        {place.numeral}
      </p>
      <h3 className="m-0 mb-1.5 font-display text-[27px] font-normal leading-tight text-ink md:mb-2 md:text-[34px]">
        {t(place.name)}
      </h3>
      <p className="m-0 mb-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted md:mb-5 md:text-xs md:tracking-[0.17em]">
        {t(place.eyebrow)}
      </p>
      <p className="m-0 mb-[18px] text-base leading-[1.64] text-body md:mb-[26px] md:text-[17px] md:leading-[1.66]">
        {t(place.description)}
      </p>
      <ArrowLink href="#places">{t(place.cta)}</ArrowLink>
    </div>
  );

  return (
    <div
      className={`container-page flex items-center gap-8 py-8 md:gap-14 md:py-11 ${
        place.reversed ? "flex-wrap-reverse" : "flex-wrap"
      }`}
    >
      {place.reversed ? (
        <>
          {copy}
          {media}
        </>
      ) : (
        <>
          {media}
          {copy}
        </>
      )}
    </div>
  );
}
