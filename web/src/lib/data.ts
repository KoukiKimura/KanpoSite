/**
 * Shopify 商品データ（Shopify Admin API で確認した実データに準拠）
 * カート機能は Shopify チェックアウト URL 方式で実装
 */

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export type Product = {
  id: string;
  /** Shopify Product handle と一致 */
  handle: string;
  /** Shopify ProductVariant の数値 ID（チェックアウト URL 生成に使用） */
  variantId: string;
  name: string;
  nameEn: string;
  price: number;
  /** 一行キャッチコピー */
  summary: string;
  description: string;
  longDescription: string;
  /** Shopify Collection handle と一致 */
  collectionHandles: string[];
  ingredients: string[];
  usage: string;
  /** メイン商品画像 */
  imageUrl: string;
  /** サブ画像（詳細ページ用） */
  detailImages: string[];
  /** PhotoPanel のグラデーション色 */
  palette: { from: string; to: string };
  stock: number;
  availableForSale: boolean;
  featured: boolean;
};

export type ProductCollection = {
  handle: string;
  title: string;
  description: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** blogCategory.slug と一致させる */
  category: string;
  publishedAt: string;
  /** 将来 Notion Block から変換した本文に置き換える */
  body: string;
  imageUrl: string;
};

export type BlogCategory = {
  slug: string;
  label: string;
};

// ---------------------------------------------------------------------------
// 商品コレクション（Shopify collections と一致）
// ---------------------------------------------------------------------------

export const productCollections: ProductCollection[] = [
  {
    handle: 'tea',
    title: 'お茶',
    description: '野の香りをそのまま湯気にのせる、朝と夜のためのお茶です。',
  },
  {
    handle: 'powder',
    title: '粉薬',
    description: '白湯や食事に合わせやすく、毎日の台所で続けやすい形に整えています。',
  },
  {
    handle: 'tablets',
    title: '錠剤',
    description: '外出先でも取り入れやすいよう、小さく整えた持ち歩き用の形です。',
  },
  {
    handle: 'care-set',
    title: '養生セット',
    description: '季節の整え方を一箱にまとめた、贈りものにもなる養生セットです。',
  },
];

// ---------------------------------------------------------------------------
// 商品データ（Shopify 実データ準拠）
// ---------------------------------------------------------------------------

export const products: Product[] = [
  {
    id: 'mountain-herb-blend',
    handle: 'mountain-herb-blend',
    variantId: '47876482400413',
    name: '山のハーブブレンド',
    nameEn: 'Mountain Herb Blend',
    price: 3200,
    summary: '野に立つ草花の香りを静かにまとめた、朝の湯気に似合う定番のお茶です。',
    description: '里山で育てた草木の香りを、毎日の一杯として続けやすいよう穏やかに整えました。',
    longDescription:
      '春から秋にかけて畑で育てた葉と花を手で選り分け、香りの立ち上がりが穏やかになるよう少量ずつ仕上げています。' +
      '土の匂いが残る古民家の台所で、最初の一杯として飲んでいただきたいお茶です。',
    collectionHandles: ['tea'],
    ingredients: ['カモミール', 'レモンバーム', 'ヨモギ', '黒文字', '柿の葉'],
    usage: 'ティースプーン1杯を熱湯200mlで3分ほど抽出してください。朝の支度前や畑仕事のあとにどうぞ。',
    imageUrl: '/images/products/mountain-herb-blend/main.webp',
    detailImages: [
      '/images/products/mountain-herb-blend/detail-01.webp',
      '/images/products/mountain-herb-blend/detail-02.webp',
    ],
    palette: { from: '#4c5d43', to: '#b49870' },
    stock: 18,
    availableForSale: true,
    featured: true,
  },
  {
    id: 'herbal-powder',
    handle: 'herbal-powder',
    variantId: '47876482433181',
    name: '和漢の養生粉',
    nameEn: 'Herbal Powder',
    price: 4200,
    summary: '毎日の湯や粥に少量ずつ加えられる、やわらかな香りの和漢粉末です。',
    description: '乾かした根や葉を細かく挽き、白湯や粥に混ぜやすい粉末に仕立てました。',
    longDescription:
      '食事の延長で取り入れられるよう、香りと口当たりを穏やかに整えています。' +
      '朝粥や白湯に溶かし、季節の変わり目の養生として使うのがおすすめです。',
    collectionHandles: ['powder'],
    ingredients: ['生姜粉末', '陳皮粉末', 'なつめ粉末', '葛粉', 'ヨモギ粉末'],
    usage: '小さじ1/2を白湯、粥、スープなどに混ぜてお召し上がりください。少量からお試しください。',
    imageUrl: '/images/products/herbal-powder/main.webp',
    detailImages: [
      '/images/products/herbal-powder/detail-01.webp',
      '/images/products/herbal-powder/detail-02.webp',
    ],
    palette: { from: '#6e644c', to: '#cdb28f' },
    stock: 7,
    availableForSale: true,
    featured: true,
  },
  {
    id: 'seasonal-care-set',
    handle: 'seasonal-care-set',
    variantId: '47876482465949',
    name: '季節の養生セット',
    nameEn: 'Seasonal Care Set',
    price: 8600,
    summary: 'お茶、粉末、手当ての小物を一箱にまとめた、四季の贈りものです。',
    description: '季節ごとの整え方を一箱にまとめた養生セットです。',
    longDescription:
      '朝と夜で使い分けられるお茶、日々の食事に添える粉末、香りの小物を組み合わせています。' +
      '季節ごとに内容が一部変わるため、通年を通じてお楽しみいただけます。贈答用の包みもご用意します。',
    collectionHandles: ['care-set'],
    ingredients: ['朝の茶葉', '夜の茶葉', '和漢粉末', '香り小物'],
    usage: '朝、夜、休憩時に分けて、それぞれの説明に沿って使用してください。',
    imageUrl: '/images/products/seasonal-care-set/main.webp',
    detailImages: [
      '/images/products/seasonal-care-set/detail-01.webp',
      '/images/products/seasonal-care-set/detail-02.webp',
    ],
    palette: { from: '#5a4e3c', to: '#d4b896' },
    stock: 104,
    availableForSale: true,
    featured: true,
  },
  {
    id: 'botanical-tablets',
    handle: 'botanical-tablets',
    variantId: '47876482564253',
    name: '草木の養生錠',
    nameEn: 'Botanical Tablets',
    price: 3800,
    summary: '外出先でも取り入れやすいよう、小粒に仕立てた養生用の錠剤です。',
    description: '草木の粉末を小粒にまとめ、外出先や忙しい日でも続けやすい形にしました。',
    longDescription:
      'お茶を淹れる時間が取れない日にも使いやすい養生錠です。' +
      '桑の葉・生姜・山椒・陳皮・霊芝を配合し、日々の体調管理をサポートします。',
    collectionHandles: ['tablets'],
    ingredients: ['桑の葉粉末', '生姜粉末', '山椒粉末', '陳皮粉末', '霊芝粉末'],
    usage: '1日3〜6粒を目安に、水または白湯でお召し上がりください。開封後は早めに使用してください。',
    imageUrl: '/images/products/botanical-tablets/main.webp',
    detailImages: [
      '/images/products/botanical-tablets/detail-01.webp',
      '/images/products/botanical-tablets/detail-02.webp',
    ],
    palette: { from: '#3e4e38', to: '#a0956c' },
    stock: 4,
    availableForSale: true,
    featured: true,
  },
  {
    id: 'night-soil-tea',
    handle: 'night-soil-tea',
    variantId: '47876482728093',
    name: '夜のくつろぎ茶',
    nameEn: 'Night Soil Tea',
    price: 2900,
    summary: '灯りを落としたあとの時間に似合う、静かな香りの夜のお茶です。',
    description: '一日の終わりに湯気を眺めながら飲める、香りの穏やかな夜のお茶です。',
    longDescription:
      'ほうじ茶を土台に、ラベンダー・カモミール・桂皮・レモングラスの香りをやわらかく重ねています。' +
      '就寝前でも重くなりすぎないよう、薄めの抽出からお試しください。',
    collectionHandles: ['tea'],
    ingredients: ['ほうじ茶', 'ラベンダー', 'カモミール', '桂皮', 'レモングラス'],
    usage: 'ティースプーン1杯を熱湯180mlで2〜3分ほど抽出してください。就寝の30分前ごろにどうぞ。',
    imageUrl: '/images/products/night-soil-tea/main.webp',
    detailImages: [
      '/images/products/night-soil-tea/detail-01.webp',
      '/images/products/night-soil-tea/detail-02.webp',
    ],
    palette: { from: '#2e3d42', to: '#8a7a68' },
    stock: 0,
    availableForSale: false,
    featured: false,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getProductByHandle = (handle: string): Product | undefined =>
  products.find((p) => p.handle === handle);

export const getProductsByCollection = (handle: string): Product[] =>
  products.filter((p) => p.collectionHandles.includes(handle));

export const getCollectionByHandle = (handle: string): ProductCollection | undefined =>
  productCollections.find((c) => c.handle === handle);

// ---------------------------------------------------------------------------
// ブログカテゴリ
// ---------------------------------------------------------------------------

export const blogCategories: BlogCategory[] = [
  { slug: 'news', label: 'お知らせ' },
  { slug: 'recipe', label: 'レシピ' },
  { slug: 'story', label: '読み物' },
  { slug: 'farm', label: '畑だより' },
];

export const getBlogCategoryBySlug = (slug: string): BlogCategory | undefined =>
  blogCategories.find((c) => c.slug === slug);

// ---------------------------------------------------------------------------
// ブログ記事（仮データ）
// ---------------------------------------------------------------------------

export const blogPosts: BlogPost[] = [
  {
    slug: 'website-renewal',
    title: 'ウェブサイトをリニューアルしました',
    excerpt: '四国ボタニカの公式サイトをリニューアルいたしました。新しいデザインで、より見やすく・使いやすくなっています。',
    category: 'news',
    publishedAt: '2026-04-20',
    body: `四国ボタニカの公式サイトをリニューアルいたしました。

今回のリニューアルでは、商品情報や畑のご紹介をより見やすい形に整えました。
また、古民家の宿泊導線やブログ機能も充実させています。

引き続き、四国ボタニカをよろしくお願いいたします。`,
    imageUrl: '/images/blog/website-renewal.jpg',
  },
  {
    slug: 'summer-limited-seiry-o-socha',
    title: '夏季限定「清涼草茶」を7月より発売予定',
    excerpt: '暑い夏を涼やかに過ごすための期間限定ブレンドを準備中です。ぺパーミントと菊花をベースにした爽やかな一杯。',
    category: 'news',
    publishedAt: '2026-04-15',
    body: `暑い夏に向けて、季節限定の「清涼草茶」を準備しています。

ペパーミントと菊花をベースに、薄荷・金銀花を加えた爽やかなブレンドです。
体の余分な熱を冷ます効果のある生薬を丁寧に組み合わせました。

7月の発売に向けて、詳細は近日公開予定です。どうぞお楽しみに。`,
    imageUrl: '/images/blog/summer-tea.jpg',
  },
  {
    slug: 'field-walk-spring-2026',
    title: '畑の見学会を開催しました（春2026）',
    excerpt: '4月の畑見学会の様子をレポートします。春の山草がどのように育っているかをご紹介します。',
    category: 'farm',
    publishedAt: '2026-04-10',
    body: `先日、畑の見学会を開催いたしました。

春の陽気のなか、黄耆や当帰の新芽が顔を出し始めています。
今年は例年より暖かく、生育の順調な様子です。

ご参加いただいたみなさん、ありがとうございました。
次回の見学会は秋を予定しています。`,
    imageUrl: '/images/blog/field-walk.jpg',
  },
  {
    slug: 'how-to-brew-youki-tea',
    title: '養気茶の美味しい淹れ方',
    excerpt: '養気茶を最大限に楽しむためのポイントをご紹介します。温度と蒸らし時間がとても大切です。',
    category: 'recipe',
    publishedAt: '2026-03-25',
    body: `養気茶を美味しく淹れるためのポイントをご紹介します。

**お湯の温度は90℃が目安**

沸騰したお湯を少し冷ましてからティーバッグを入れてください。
熱すぎると生薬の有効成分が変質することがあります。

**蒸らし時間は3〜5分**

蓋をして3〜5分蒸らすことで、生薬のエキスがしっかり出ます。
好みに合わせて調整してみてください。

毎朝の習慣として取り入れることで、穏やかに体の芯から元気を養います。`,
    imageUrl: '/images/blog/brew-tea.jpg',
  },
  {
    slug: 'kominka-opening',
    title: '古民家の宿「ボタニカ庵」開業のご案内',
    excerpt: '畑に隣接した古民家を1棟貸し宿として開業する準備を進めています。自然の中でゆっくりとした時間をお過ごしください。',
    category: 'news',
    publishedAt: '2026-03-15',
    body: `このたび、畑に隣接した古民家を1棟貸し宿として開業する準備を進めております。

土間から縁側へ、縁側から畑の景色へ。
派手に整えすぎず、この家に残っていた静けさをそのまま宿にしました。

漢方茶の朝食セット付きプランなど、四国ボタニカらしい宿泊体験をご提供する予定です。
詳細は準備が整い次第、こちらのサイトでご案内いたします。`,
    imageUrl: '/images/blog/kominka.jpg',
  },
  {
    slug: 'kampo-basics-qi',
    title: '漢方の基礎：「気」とは何か',
    excerpt: '漢方の根本概念のひとつ「気」について、現代の日常に置き換えながらわかりやすくご説明します。',
    category: 'story',
    publishedAt: '2026-03-01',
    body: `漢方の世界では、体の状態を「気・血・水」の3つの要素で考えます。

今回はその中でも特に重要な「気」についてお話しします。

**「気」は生命エネルギーの根本**

「気」とは、目には見えない生命の活動エネルギーのこと。
疲れやすい、やる気が出ない、声が小さくなった…これらは「気虚（ききょ）」のサインかもしれません。

**日常で「気」を養うには**

十分な睡眠、バランスのよい食事に加えて、気を補う生薬を取り入れることが効果的です。
養気茶に含まれる黄耆・人参は、古来より「補気薬」の代表格として親しまれています。`,
    imageUrl: '/images/blog/kampo-basics.jpg',
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getBlogPostsByCategory = (category: string): BlogPost[] =>
  blogPosts.filter((p) => p.category === category);

export const getLatestBlogPosts = (limit = 3): BlogPost[] =>
  [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

export const getNewsPosts = (limit = 5): BlogPost[] =>
  getBlogPostsByCategory('news')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
};
