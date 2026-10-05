import type { T } from "@/i18n/locales";

/**
 * Homepage copy, trilingual.
 *
 * PROVENANCE — this matters for review:
 *
 * · Strings marked `reused` are lifted verbatim from the existing site's
 *   translation corpus (src/content/translations.ts and src/pages/Index.tsx).
 *   They were written and reviewed by the Foundation. Do not rewrite them.
 *
 * · Strings marked `new` were written for this redesign, so their Russian and
 *   Spanish are machine translations and HAVE NOT been checked by a native
 *   speaker. They are flagged individually below and listed in
 *   design/TRANSLATION-REVIEW.md. Get them reviewed before this goes live.
 *
 * Text in [SQUARE BRACKETS] is a fact nobody has supplied yet. It is left
 * visible on purpose rather than invented — see design/README.md.
 */

export interface PlaceContent {
  numeral: string;
  name: T;
  eyebrow: T;
  description: T;
  cta: T;
  /** Null until a photograph of the place exists; renders a labelled placeholder. */
  image: string | null;
  alt: T;
  reversed?: boolean;
  /** External destination, opened in a new tab. Omit for an internal link. */
  href?: string;
}

export interface TierContent {
  label: T;
  amount: string;
  description: T;
  cta: T;
  featured?: boolean;
}

/* ---------------------------------------------------------------- header */

export const nav: { label: T; href: string }[] = [
  { label: { en: "Foundation", ru: "Фонд", es: "Fundación" }, href: "#places" }, // reused
  { label: { en: "Places", ru: "Места", es: "Lugares" }, href: "#places" }, // new
  { label: { en: "Patrons", ru: "Меценаты", es: "Mecenas" }, href: "#patrons" }, // new
  { label: { en: "Sun Tribe", ru: "Племя Солнца", es: "La Tribu del Sol" }, href: "#tribe" }, // reused
  { label: { en: "Press", ru: "Пресса", es: "Prensa" }, href: "#footer" }, // reused
];

export const donate: T = { en: "Donate", ru: "Поддержать", es: "Donar" }; // reused

/* ------------------------------------------------------------------ hero */

export const hero = {
  // new — RU/ES need native review
  kicker: {
    en: "Puntarenas, Costa Rica · Est. [YEAR]",
    ru: "Пунтаренас, Коста-Рика · Основан в [YEAR]",
    es: "Puntarenas, Costa Rica · Fundada en [YEAR]",
  } as T,
  /*
   * reused — this is the Foundation's own slogan, lifted from the existing
   * site's approved copy. "HEAVEN ON EARTH" / "РАЙ НА ЗЕМЛЕ" /
   * "EL CIELO EN LA TIERRA" and "One Paradise at a Time" / "Один Рай за раз" /
   * "Un Paraíso a la vez" are both verbatim; only the comma joining them is new.
   * Set in sentence case rather than the original's all-caps, to suit the
   * display face at 92px.
   *
   * The gaps after the comma in `en` and `ru` are NON-BREAKING SPACES (U+00A0),
   * invisible in an editor but load-bearing: they stop the line breaking
   * between "one" and "paradise" (and "один"/"Рай"), which otherwise leaves a
   * single orphaned word at the end of the first line. Spanish breaks at the
   * comma on its own and needs none. Keep them if you edit this copy.
   */
  title: {
    en: "Heaven on Earth, one paradise at a time",
    ru: "Рай на Земле, один Рай за раз",
    es: "El Cielo en la Tierra, un Paraíso a la vez",
  } as T,
  // new — RU/ES need native review
  lead: {
    en: "Three places in Costa Rica — land, buildings and a community of people who live there.",
    ru: "Три места в Коста-Рике — земля, постройки и сообщество людей, которые там живут.",
    es: "Tres lugares en Costa Rica — tierra, edificios y una comunidad de personas que viven allí.",
  } as T,
  // new — RU/ES need native review
  primaryCta: { en: "Support the work", ru: "Поддержать работу", es: "Apoya el trabajo" } as T,
  // new — RU/ES need native review
  secondaryCta: { en: "See the places", ru: "Посмотреть места", es: "Ver los lugares" } as T,
  /*
   * Hero footage. WebM is listed first so browsers that support VP9 take the
   * smaller file; the MP4 is the fallback. The poster is the video's own first
   * frame, so there is no visible jump when playback starts, and it is what
   * visitors who prefer reduced motion see instead of the video.
   */
  videoWebm: "/video/hero.webm",
  videoMp4: "/video/hero.mp4",
  poster: "/images/hero-poster.webp",
  // new — RU/ES need native review
  alt: {
    en: "A hand raised at sunrise over forested mountains, holding a glowing sphere that forms into the Arinnitti sun wheel",
    ru: "Рука, поднятая на рассвете над лесистыми горами, держит светящуюся сферу, которая превращается в солнечное колесо Ариннитти",
    es: "Una mano alzada al amanecer sobre montañas boscosas, sosteniendo una esfera luminosa que se convierte en la rueda solar de Arinnitti",
  } as T,
};

/*
 * The slogan on its own, for the scrolling band between the places and the
 * mission. reused — "HEAVEN ON EARTH" / "РАЙ НА ЗЕМЛЕ" / "EL CIELO EN LA TIERRA"
 * are the Foundation's own words, the same ones the hero title opens with (see
 * the note on `hero.title`); only the capitalisation differs. The band shows
 * all three languages at once whichever one the page is in.
 */
export const slogan: T = {
  en: "Heaven on Earth",
  ru: "Рай на Земле",
  es: "El Cielo en la Tierra",
};

/* -------------------------------------------------------------- evidence */

export const evidence = {
  // new — RU/ES need native review
  registration: {
    en: "Registered as [LEGAL ENTITY NAME] in [COUNTRY], reg. no. [NUMBER].",
    ru: "Зарегистрирован как [LEGAL ENTITY NAME] в [COUNTRY], рег. № [NUMBER].",
    es: "Registrada como [LEGAL ENTITY NAME] en [COUNTRY], núm. de registro [NUMBER].",
  } as T,
  // All figures are placeholders. Do not invent values.
  stats: [
    {
      figure: "[X]",
      label: {
        en: "hectares under stewardship",
        ru: "гектаров под опекой",
        es: "hectáreas bajo custodia",
      },
    },
    {
      figure: "[X]",
      label: {
        en: "people hosted since [YEAR]",
        ru: "человек приняли с [YEAR] года",
        es: "personas acogidas desde [YEAR]",
      },
    },
    {
      figure: "[X]",
      label: {
        en: "structures completed",
        ru: "построек завершено",
        es: "estructuras completadas",
      },
    },
    {
      figure: "[X]%",
      label: {
        en: "of donations to programmes",
        ru: "пожертвований идёт на программы",
        es: "de las donaciones a programas",
      },
    },
  ] as { figure: string; label: T }[],
};

/* ---------------------------------------------------------------- places */

export const placesHeading = {
  // new — RU/ES need native review
  kicker: { en: "The places", ru: "Места", es: "Los lugares" } as T,
  title: {
    en: "Three sites, one intention",
    ru: "Три места, одно намерение",
    es: "Tres sitios, una intención",
  } as T,
};

export const places: PlaceContent[] = [
  {
    numeral: "01",
    // reused
    name: { en: "The Arinnitti Ark", ru: "Ковчег Ариннитти", es: "El Arca Arinnitti" },
    // new — RU/ES need native review
    eyebrow: {
      en: "Regenerative living model",
      ru: "Регенеративная модель жизни",
      es: "Modelo de vida regenerativa",
    },
    // reused
    description: {
      en: "The Arinnitti Ark is a regenerative living model in Costa Rica with humanity and nature at the heart.",
      ru: "Ковчег Ариннитти — это регенеративная модель жизни в Коста-Рике с человечеством и природой в основе.",
      es: "El Arca Arinnitti es un modelo de vida regenerativa en Costa Rica con la humanidad y la naturaleza en el corazón.",
    },
    // new — RU/ES need native review
    cta: { en: "Visit the Ark", ru: "Посетить Ковчег", es: "Visitar el Arca" },
    image: "/images/garden.webp",
    alt: {
      en: "A stone path winding through dense tropical planting at the Arinnitti Ark",
      ru: "Каменная дорожка, вьющаяся среди густой тропической растительности в Ковчеге Ариннитти",
      es: "Un sendero de piedra que serpentea entre densa vegetación tropical en el Arca Arinnitti",
    },
  },
  {
    numeral: "02",
    // reused
    name: { en: "Castillo del Sol", ru: "Замок Солнца", es: "Castillo del Sol" },
    // new — RU/ES need native review
    eyebrow: {
      en: "Eco-community retreat",
      ru: "Эко-сообщество и ретрит",
      es: "Retiro eco-comunitario",
    },
    // reused
    description: {
      en: "Castillo Del Sol is an eco-community retreat in Costa Rica focused on art, education, culture, and healing.",
      ru: "Замок Солнца — это эко-сообщество в Коста-Рике, посвящённое искусству, образованию, культуре и исцелению.",
      es: "Castillo Del Sol es un retiro eco-comunitario en Costa Rica enfocado en arte, educación, cultura y sanación.",
    },
    // new — RU/ES need native review
    cta: { en: "Tour the Castillo", ru: "Посмотреть Замок", es: "Recorrer el Castillo" },
    image: "/images/helipad.webp",
    alt: {
      en: "The hillside grounds and helipad at Castillo del Sol",
      ru: "Территория на склоне холма и вертолётная площадка у Замка Солнца",
      es: "Los terrenos en la ladera y el helipuerto del Castillo del Sol",
    },
    reversed: true,
  },
  {
    numeral: "03",
    /*
     * The third paradise. Its own page lives at
     * https://crx.travel/ru/paradise/quantum-cacao
     *
     * Everything bracketed below is a placeholder: that page could not be
     * reached from the environment this was built in, so none of its copy has
     * been transcribed and none has been invented. Replace the eyebrow and
     * description with the real text, in all three languages, and set `image`
     * to a photograph once one is available.
     */
    name: { en: "Quantum Cacao", ru: "Quantum Cacao", es: "Quantum Cacao" },
    eyebrow: {
      en: "[WHAT KIND OF PLACE]",
      ru: "[ЧТО ЭТО ЗА МЕСТО]",
      es: "[QUÉ TIPO DE LUGAR]",
    },
    description: {
      en: "[One or two sentences on what Quantum Cacao is and what happens there — the same length as the two places above.]",
      ru: "[Одно-два предложения о том, что такое Quantum Cacao и что там происходит — той же длины, что и описания выше.]",
      es: "[Una o dos frases sobre qué es Quantum Cacao y qué ocurre allí — de la misma extensión que los lugares anteriores.]",
    },
    cta: { en: "Visit Quantum Cacao", ru: "Посетить Quantum Cacao", es: "Visitar Quantum Cacao" },
    href: "https://crx.travel/ru/paradise/quantum-cacao",
    image: null,
    alt: {
      en: "Quantum Cacao",
      ru: "Quantum Cacao",
      es: "Quantum Cacao",
    },
  },
];

/* --------------------------------------------------------------- mission */

export const mission = {
  // reused
  kicker: { en: "Our Mission", ru: "Наша миссия", es: "Nuestra Misión" } as T,
  // reused
  statement: {
    en: "The Arinnitti Foundation creates spaces for conscious living, spiritual evolution, and cultural renaissance. We build living models of Paradise on Earth — places where nature, art, and the human spirit unite as one.",
    ru: "Фонд Ариннитти создаёт пространства для осознанной жизни, духовного развития и культурного возрождения. Мы строим живые модели Рая на Земле — места, где природа, искусство и человеческий дух соединяются в единое целое.",
    es: "La Fundación Arinnitti crea espacios para la vida consciente, la evolución espiritual y el renacimiento cultural. Construimos modelos vivos del Paraíso en la Tierra — lugares donde la naturaleza, el arte y el espíritu humano se unen como uno.",
  } as T,
  // reused
  philosophy: {
    en: "Our philosophy is rooted in the return to sacred knowledge, harmony with nature, and the creative power of the feminine principle. Every project of the foundation is a step toward a new civilization built on beauty, truth, and love.",
    ru: "Наша философия основана на возвращении к сакральным знаниям, гармонии с природой и созидательной силе женского начала. Каждый проект фонда — это шаг к новой цивилизации, построенной на красоте, истине и любви.",
    es: "Nuestra filosofía se basa en el regreso al conocimiento sagrado, la armonía con la naturaleza y el poder creativo del principio femenino. Cada proyecto de la fundación es un paso hacia una nueva civilización construida sobre la belleza, la verdad y el amor.",
  } as T,
  // reused
  cta: {
    en: "Read more about the mission",
    ru: "Подробнее о миссии",
    es: "Más sobre la misión",
  } as T,
};

/* ------------------------------------------------------------- sun tribe */

export const tribe = {
  // reused
  kicker: { en: "The Sun Tribe", ru: "Племя Солнца", es: "La Tribu del Sol" } as T,
  // new heading, drawn from the reused paragraph below
  title: {
    en: "This is not just a community. This is a Tribe.",
    ru: "Это не просто сообщество. Это Племя.",
    es: "Esto no es solo una comunidad. Es una Tribu.",
  } as T,
  // reused
  body: {
    en: "A tribe of creators — artists, musicians, composers, actors, directors. We are united by one intention — to create Paradise on Earth.",
    ru: "Племя творцов — художников, музыкантов, композиторов, актёров, режиссёров. Нас объединяет одно намерение — создать Рай на Земле.",
    es: "Una tribu de creadores — artistas, músicos, compositores, actores, directores. Nos une una sola intención — crear el Paraíso en la Tierra.",
  } as T,
  // new — RU/ES need native review
  cta: {
    en: "Meet the founder",
    ru: "Познакомиться с основательницей",
    es: "Conocer a la fundadora",
  } as T,
  image: "/images/tribe.webp",
  alt: {
    en: "Members of the Sun Tribe gathered together in Costa Rica",
    ru: "Участники Племени Солнца вместе в Коста-Рике",
    es: "Miembros de la Tribu del Sol reunidos en Costa Rica",
  } as T,
};

/* --------------------------------------------------------------- patrons */

export const patrons = {
  // new — RU/ES need native review
  kicker: { en: "Support the work", ru: "Поддержать работу", es: "Apoya el trabajo" } as T,
  // new — RU/ES need native review
  title: {
    en: "Every gift becomes something you can stand in",
    ru: "Каждый дар становится тем, внутри чего можно стоять",
    es: "Cada donación se convierte en algo en lo que puedes estar",
  } as T,
  // new — RU/ES need native review
  lead: {
    en: "Give once or monthly, at any amount. Gifts above $25,000 enter the patron tiers, where your contribution is tied to a named part of the build.",
    ru: "Разово или ежемесячно, на любую сумму. Дары свыше $25 000 переходят в уровни меценатов, где ваш вклад связан с конкретной частью строительства.",
    es: "Una vez o cada mes, por cualquier importe. Las donaciones superiores a $25 000 acceden a los niveles de mecenazgo, donde tu aportación se vincula a una parte concreta de la obra.",
  } as T,
  // new — RU/ES need native review
  note: {
    en: "Payments handled by Stripe.",
    ru: "Платежи обрабатывает Stripe.",
    es: "Pagos gestionados por Stripe.",
  } as T,
};

export const tiers: TierContent[] = [
  {
    // new — RU/ES need native review
    label: { en: "Give", ru: "Пожертвовать", es: "Donar" },
    amount: "$25 — $5,000",
    description: {
      en: "One-time or monthly. Any amount you choose, receipted for tax deduction where applicable.",
      ru: "Разово или ежемесячно. Любая сумма на ваш выбор, с квитанцией для налогового вычета, где это применимо.",
      es: "Una vez o cada mes. El importe que elijas, con recibo para deducción fiscal cuando corresponda.",
    },
    cta: { en: "Donate now", ru: "Пожертвовать", es: "Donar ahora" },
  },
  {
    // reused tier name
    label: { en: "Golden Creator", ru: "Золотой Творец", es: "Creador Dorado" },
    amount: "$25,000 +",
    description: {
      en: "You create something tangible. Dedicate a stained-glass work, a mosaic or a design element that carries your name.",
      ru: "Вы создаёте нечто осязаемое. Посвятите витраж, мозаику или элемент дизайна, который будет носить ваше имя.",
      es: "Creas algo tangible. Dedica una vidriera, un mosaico o un elemento de diseño que lleve tu nombre.",
    },
    cta: { en: "Compare tiers", ru: "Сравнить уровни", es: "Comparar niveles" },
    featured: true,
  },
  {
    // reused tier name
    label: { en: "Founding Guardian", ru: "Хранитель-основатель", es: "Guardián Fundador" },
    amount: "$100,000 +",
    description: {
      en: "You become part of the architecture of the place. Private counsel with the founder and a permanent role in the vision.",
      ru: "Вы становитесь частью архитектуры этого места. Личные встречи с основательницей и постоянная роль в видении.",
      es: "Te conviertes en parte de la arquitectura del lugar. Consejo privado con la fundadora y un papel permanente en la visión.",
    },
    cta: {
      en: "Arrange a conversation",
      ru: "Договориться о встрече",
      es: "Concertar una conversación",
    },
  },
];

/* ---------------------------------------------------------------- footer */

export const footer = {
  tagline: {
    en: "Building living models of paradise in Costa Rica and beyond.",
    ru: "Создаём живые модели рая в Коста-Рике и за её пределами.",
    es: "Construimos modelos vivos del paraíso en Costa Rica y más allá.",
  } as T,
  legal: "[LEGAL ENTITY NAME]\n[STREET ADDRESS]\n[CITY, COUNTRY]\nReg. no. [NUMBER]",
  copyright: {
    en: "© 2026 [LEGAL ENTITY NAME]. All rights reserved.",
    ru: "© 2026 [LEGAL ENTITY NAME]. Все права защищены.",
    es: "© 2026 [LEGAL ENTITY NAME]. Todos los derechos reservados.",
  } as T,
  newsletterLabel: {
    en: "Occasional letters from the Foundation.",
    ru: "Редкие письма от Фонда.",
    es: "Cartas ocasionales de la Fundación.",
  } as T,
  newsletterCta: { en: "Join", ru: "Подписаться", es: "Unirse" } as T,
  columns: [
    {
      heading: { en: "Foundation", ru: "Фонд", es: "Fundación" } as T,
      links: [
        { label: { en: "About us", ru: "О нас", es: "Sobre nosotros" }, href: "#mission" },
        { label: { en: "Our mission", ru: "Наша миссия", es: "Nuestra misión" }, href: "#mission" },
        { label: { en: "Origin myth", ru: "Миф о рождении", es: "Mito de origen" }, href: "#places" },
        { label: { en: "Magic Spiral", ru: "Волшебная Спираль", es: "Espiral Mágica" }, href: "#places" },
        { label: { en: "Sun Tribe", ru: "Племя Солнца", es: "La Tribu del Sol" }, href: "#tribe" },
      ],
    },
    {
      heading: { en: "Get involved", ru: "Участвовать", es: "Participar" } as T,
      links: [
        { label: { en: "Donate", ru: "Поддержать", es: "Donar" }, href: "#patrons" },
        { label: { en: "Patron tiers", ru: "Уровни меценатов", es: "Niveles de mecenazgo" }, href: "#patrons" },
        { label: { en: "Become a partner", ru: "Стать партнёром", es: "Ser Socio" }, href: "#patrons" },
        { label: { en: "Volunteer", ru: "Волонтёрство", es: "Voluntariado" }, href: "#footer" },
        { label: { en: "Careers", ru: "Вакансии", es: "Carreras" }, href: "#footer" },
      ],
    },
    {
      /*
       * This column is not optional. The current site runs a cookie consent
       * banner and links to no privacy or cookie policy anywhere — there are
       * no links in that component at all. In the EU that is a compliance
       * problem, not a content gap.
       */
      heading: { en: "Transparency", ru: "Прозрачность", es: "Transparencia" } as T,
      links: [
        { label: { en: "Privacy policy", ru: "Политика конфиденциальности", es: "Política de privacidad" }, href: "#footer" },
        { label: { en: "Cookie policy", ru: "Политика cookie", es: "Política de cookies" }, href: "#footer" },
        { label: { en: "Terms", ru: "Условия", es: "Términos" }, href: "#footer" },
      ],
    },
  ] as { heading: T; links: { label: T; href: string }[] }[],
  connectHeading: {
    en: "Stay connected",
    ru: "Оставайтесь на связи",
    es: "Mantente en contacto",
  } as T,
};
