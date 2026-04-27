export type MockFaq = {
  question: string;
  answer: string;
};

export type MockImage = {
  src: string;
  alt: string;
};

function getMockBasePath() {
  const siteUrl = process.env.NEXT_PUBLIC_MOCK_SITE_URL ?? '';

  if (!siteUrl) {
    return '';
  }

  try {
    const pathname = new URL(siteUrl).pathname.replace(/\/$/, '');
    return pathname && pathname !== '/' ? pathname : '';
  } catch {
    return '';
  }
}

function withMockBasePath(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  const basePath = getMockBasePath();
  return basePath ? `${basePath}${path}` : path;
}

export type MockProduct = {
  slug: string;
  category: string;
  name: string;
  priceLabel: string;
  summary: string;
  story: string;
  notes: string[];
  faq: MockFaq[];
  mainImage: MockImage;
  detailImages: MockImage[];
  palette: {
    from: string;
    to: string;
  };
};

export const mockSite = {
  brandJa: '山草のめぐみ',
  brandEn: 'Sansou no Megumi',
  mockLabel: '里山で養う漢方と暮らし',
  referenceDesign: 'https://www.roccadeifiori.eu/en/the-company/',
  mockDeployReference:
    process.env.NEXT_PUBLIC_MOCK_DEPLOY_URL ??
    'https://pengin24.conohawing.com/site_mock',
  contact: {
    email: 'xxx@example.com',
    phone: '000-0000-0000',
    lineUrl: 'https://line.me/ja/',
    facebookUrl: 'https://www.facebook.com/',
    instagramUrl: 'https://www.instagram.com/',
  },
};

export const mockProducts: MockProduct[] = [
  {
    slug: 'mountain-herb-blend',
    category: 'お茶',
    name: '山のハーブブレンド',
    priceLabel: '¥3,200',
    summary:
      '野に立つ草花の香りを静かにまとめた、朝の湯気に似合う定番のお茶です。',
    story:
      '春から秋にかけて畑で育てた葉と花を手で選り分け、香りの立ち上がりが穏やかになるよう少量ずつ仕上げています。土の匂いが残る古民家の台所で、最初の一杯として飲んでいただきたいお茶です。',
    notes: ['内容量 30g', '朝の時間に合う軽やかな風味', '陶器の急須でゆっくり抽出'],
    mainImage: {
      src: withMockBasePath('/images/products/mountain-herb-blend/main.webp'),
      alt: '山のハーブブレンドのメイン画像',
    },
    detailImages: [
      {
        src: withMockBasePath('/images/products/mountain-herb-blend/detail-01.webp'),
        alt: '山のハーブブレンドの茶葉イメージ',
      },
      {
        src: withMockBasePath('/images/products/mountain-herb-blend/detail-02.webp'),
        alt: '山のハーブブレンドの抽出シーン',
      },
    ],
    faq: [
      {
        question: 'どんな時間に合いますか。',
        answer:
          '朝の支度前や、畑仕事から戻ったあとのひと息に合うように仕立てています。香りは軽く、あと口はすっきりしています。',
      },
      {
        question: '味わいの特徴は何ですか。',
        answer:
          '草の青さを残しながら、花の香りがやわらかく立つように調整しています。食後にも重くなりません。',
      },
    ],
    palette: {
      from: '#4c5d43',
      to: '#b49870',
    },
  },
  {
    slug: 'herbal-powder',
    category: '粉薬',
    name: '和漢の養生粉',
    priceLabel: '¥4,200',
    summary:
      '毎日の湯や粥に少量ずつ加えられる、やわらかな香りの和漢粉末です。',
    story:
      '乾かした根と葉を細かく挽き、食事の延長で取り入れられるよう口当たりを整えています。古民家では朝粥や白湯に溶かし、季節の変わり目の養生として使う想定です。',
    notes: ['内容量 45g', '白湯や粥に溶かして使う想定', '香りを強くしすぎない配合'],
    mainImage: {
      src: withMockBasePath('/images/products/herbal-powder/main.webp'),
      alt: '和漢の養生粉のメイン画像',
    },
    detailImages: [
      {
        src: withMockBasePath('/images/products/herbal-powder/detail-01.webp'),
        alt: '和漢の養生粉の粉末イメージ',
      },
      {
        src: withMockBasePath('/images/products/herbal-powder/detail-02.webp'),
        alt: '和漢の養生粉の使用シーン',
      },
    ],
    faq: [
      {
        question: 'どのように取り入れますか。',
        answer:
          '朝の白湯や粥に少量を溶かし、香りを楽しみながらゆっくり飲む使い方を想定しています。',
      },
      {
        question: '味の強さはありますか。',
        answer:
          '日々の食事に寄り添うよう、薬草感を強く出しすぎず、やわらかい後味に整えています。',
      },
    ],
    palette: {
      from: '#6e644c',
      to: '#cdb28f',
    },
  },
  {
    slug: 'seasonal-care-set',
    category: '養生セット',
    name: '季節の養生セット',
    priceLabel: '¥8,600',
    summary:
      'お茶、粉末、手当ての小物を一箱にまとめた、四季の贈りものです。',
    story:
      '季節の変わり目に合わせて、畑で採れる素材の組み合わせを少しずつ変えています。贈りものとしても、自分の暮らしを整える箱としても、静かな存在感が出るようにまとめています。',
    notes: ['季節ごとに内容が一部変わる想定', '贈答用の包みも用意', '箱を開けた瞬間の見え方を重視'],
    mainImage: {
      src: withMockBasePath('/images/products/seasonal-care-set/main.webp'),
      alt: '季節の養生セットのメイン画像',
    },
    detailImages: [
      {
        src: withMockBasePath('/images/products/seasonal-care-set/detail-01.webp'),
        alt: '季節の養生セットの同梱イメージ',
      },
      {
        src: withMockBasePath('/images/products/seasonal-care-set/detail-02.webp'),
        alt: '季節の養生セットの使用シーン',
      },
    ],
    faq: [
      {
        question: '贈りものとして使えますか。',
        answer:
          '季節の挨拶や、からだを気づかう気持ちを伝える贈りものとして使えるよう、箱の見え方も含めて整えています。',
      },
      {
        question: '内容は固定ですか。',
        answer:
          '基本構成は保ちつつ、その時期に採れた素材に合わせて一部が変わる想定です。',
      },
    ],
    palette: {
      from: '#6b7854',
      to: '#d3b58b',
    },
  },
  {
    slug: 'botanical-tablets',
    category: '錠剤',
    name: '草木の養生錠',
    priceLabel: '¥3,800',
    summary:
      '外出先でも取り入れやすいよう、小粒に仕立てた養生用の錠剤です。',
    story:
      '畑で育てた葉や根を乾かし、持ち運びやすい形にまとめています。旅先や仕事の合間でも、湯を沸かせない日につづけやすいよう、穏やかな輪郭で仕上げた商品を想定しています。',
    notes: ['内容量 90粒', '携帯しやすい小瓶入り', '毎日少しずつ続ける設計'],
    mainImage: {
      src: withMockBasePath('/images/products/botanical-tablets/main.webp'),
      alt: '草木の養生錠のメイン画像',
    },
    detailImages: [
      {
        src: withMockBasePath('/images/products/botanical-tablets/detail-01.webp'),
        alt: '草木の養生錠の粒イメージ',
      },
      {
        src: withMockBasePath('/images/products/botanical-tablets/detail-02.webp'),
        alt: '草木の養生錠の携帯シーン',
      },
    ],
    faq: [
      {
        question: 'どんな場面に向いていますか。',
        answer:
          '外出が続く日や、湯を沸かす余裕がない日でも、普段の養生を途切れさせたくない方に向けた設計です。',
      },
      {
        question: '錠剤でも香りは感じますか。',
        answer:
          'お茶ほどではありませんが、袋を開けたときに草木の香りがやわらかく残るよう整えています。',
      },
    ],
    palette: {
      from: '#59604d',
      to: '#b89c77',
    },
  },
  {
    slug: 'night-soil-tea',
    category: 'お茶',
    name: '夜のくつろぎ茶',
    priceLabel: '¥2,900',
    summary:
      '灯りを落としたあとに似合う、静かな香りの夜のお茶です。',
    story:
      '強い香りではなく、湯気の奥に草と木の気配が残るようにまとめています。本を開く前や、湯上がりの部屋で過ごす時間に、呼吸をゆるめる一杯として用意したいお茶です。',
    notes: ['内容量 25g', '夜の読書や湯上がり向け', 'やわらかな香りで後味は軽め'],
    mainImage: {
      src: withMockBasePath('/images/products/night-soil-tea/main.webp'),
      alt: '夜のくつろぎ茶のメイン画像',
    },
    detailImages: [
      {
        src: withMockBasePath('/images/products/night-soil-tea/detail-01.webp'),
        alt: '夜のくつろぎ茶の茶葉イメージ',
      },
      {
        src: withMockBasePath('/images/products/night-soil-tea/detail-02.webp'),
        alt: '夜のくつろぎ茶の飲用シーン',
      },
    ],
    faq: [
      {
        question: '夜向けのお茶としてどんな印象ですか。',
        answer:
          '一日の終わりに部屋の明かりを少し落としたときでも、強すぎず、静かに寄り添う香りを目指しています。',
      },
    ],
    palette: {
      from: '#2d3428',
      to: '#907055',
    },
  },
];

export const mockHomeImages = {
  hero: {
    src: withMockBasePath('/images/home/hero-satoyama.webp'),
    alt: '里山の風景と古民家を見せるトップ画像',
  },
  guestRoom: {
    src: withMockBasePath('/images/home/kominka-guest-room.webp'),
    alt: '古民家の客室イメージ',
  },
  fieldWalk: {
    src: withMockBasePath('/images/home/field-walk.webp'),
    alt: '畑を歩くシーンのイメージ',
  },
  morningTea: {
    src: withMockBasePath('/images/home/morning-tea.webp'),
    alt: '朝のお茶時間のイメージ',
  },
};

export const mockKominka = {
  title: '古民家滞在',
  lead:
    '築年数を重ねた古民家で、畑の景色と湯気のある朝を味わう滞在を想定しています。',
  images: {
    hero: {
      src: withMockBasePath('/images/kominka/hero-stay.webp'),
      alt: '古民家滞在ページのメイン画像',
    },
    livingRoom: {
      src: withMockBasePath('/images/kominka/living-room.webp'),
      alt: '古民家の居間イメージ',
    },
    morningField: {
      src: withMockBasePath('/images/kominka/morning-field.webp'),
      alt: '古民家近くの朝の景色イメージ',
    },
  },
  gallery: [
    {
      src: withMockBasePath('/images/kominka/hero-stay.webp'),
      alt: '古民家の外観と庭先の景色',
    },
    {
      src: withMockBasePath('/images/home/kominka-guest-room.webp'),
      alt: '古民家の客室',
    },
    {
      src: withMockBasePath('/images/kominka/living-room.webp'),
      alt: '古民家の居間',
    },
    {
      src: withMockBasePath('/images/home/field-walk.webp'),
      alt: '古民家から畑へ向かう散歩道',
    },
    {
      src: withMockBasePath('/images/home/morning-tea.webp'),
      alt: '古民家での朝のお茶時間',
    },
    {
      src: withMockBasePath('/images/kominka/morning-field.webp'),
      alt: '朝の畑と里山の景色',
    },
    {
      src: withMockBasePath('/images/home/hero-satoyama.webp'),
      alt: '里山に佇む古民家の印象',
    },
  ],
  highlights: [
    '土間と木の質感を残した静かな客室',
    '庭先から畑へつながる朝の散歩道',
    '薪の香りとお茶の湯気が似合う夜の時間',
  ],
  schedule: [
    '15:00 チェックイン',
    '17:30 畑と里山の散歩',
    '19:00 季節の夕食またはお茶の時間',
    '翌朝 古民家の縁側で朝の一服',
  ],
};

export const mockContactTopics = [
  '商品について',
  '古民家について',
  '取材・掲載について',
  'その他',
];

export const productCategories = ['すべて', 'お茶', '粉薬', '錠剤', '養生セット'];

export function getProductBySlug(slug: string) {
  return mockProducts.find((product) => product.slug === slug);
}
