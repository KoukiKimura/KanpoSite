export type Product = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  ingredients: string[];
  usage: string;
  imageUrl: string;
  stock: number;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: 'youki-tea',
    name: '養気茶',
    nameEn: 'Youki Tea',
    price: 2800,
    description: '気力と活力を補う、滋養豊かなブレンド茶。朝の一杯に最適です。',
    longDescription:
      '「気」とは、生命エネルギーの根本。現代の忙しい日常で消耗しがちな気力を、自然の力で補います。' +
      '黄耆・人参・甘草など、古来より用いられてきた生薬を丁寧にブレンドした養気茶は、' +
      '毎朝の習慣として取り入れることで、穏やかに体の芯から元気を養います。',
    category: '茶葉',
    ingredients: ['黄耆', '人参', '甘草', '白朮', '茯苓', '陳皮'],
    usage: '沸騰したお湯を少し冷ました90℃のお湯でティーバッグを3〜5分蒸らしてください。1日2〜3杯を目安にお召し上がりください。',
    imageUrl: '/images/products/youki-tea.jpg',
    stock: 50,
    featured: true,
  },
  {
    id: 'anmin-socha',
    name: '安眠草茶',
    nameEn: 'Anmin Socha',
    price: 2600,
    description: '心を落ち着かせ、深い眠りへと導くナイトブレンド。就寝前にどうぞ。',
    longDescription:
      '眠れない夜、思考が止まらない夜に。安眠草茶は、古典漢方で「心神安定」に用いられてきた' +
      '生薬を中心に調合しました。酸棗仁・竜眼肉・合歓皮の甘くやさしい香りが、' +
      '緊張した心をほぐし、自然な眠りへといざないます。夜の静かな時間に、ゆっくりとお楽しみください。',
    category: '茶葉',
    ingredients: ['酸棗仁', '竜眼肉', '合歓皮', '夜交藤', '茯神', '甘草'],
    usage: '就寝の30〜60分前に、85℃のお湯でティーバッグを5分蒸らしてください。ゆっくりと香りを楽しみながらお召し上がりください。',
    imageUrl: '/images/products/anmin-socha.jpg',
    stock: 45,
    featured: true,
  },
  {
    id: 'katsuketsu-tea',
    name: '活血茶',
    nameEn: 'Katsuketsu Tea',
    price: 3000,
    description: '血の巡りを整え、体の内側から温める冷え性対策のブレンド。',
    longDescription:
      '手足の冷え、肩こり、くすみ。これらは「血の滞り」が引き起こすと漢方では考えます。' +
      '活血茶は、血行を促進する丹参・川芎に、体を温める桂枝・生姜を加えた、' +
      '特に冷え症でお悩みの方に向けたブレンドです。秋冬の冷える季節はもちろん、' +
      '冷房による夏の冷えにもおすすめします。',
    category: '茶葉',
    ingredients: ['丹参', '川芎', '桂枝', '生姜', '当帰', '紅花'],
    usage: '95℃の熱めのお湯でティーバッグを5分蒸らしてください。食後または入浴前にお召し上がりいただくと効果的です。',
    imageUrl: '/images/products/katsuketsu-tea.jpg',
    stock: 38,
    featured: false,
  },
  {
    id: 'shouka-tea',
    name: '消化助茶',
    nameEn: 'Shouka Tea',
    price: 2400,
    description: '食後の重たさ、胃もたれに。消化を助ける生薬のブレンドティー。',
    longDescription:
      '食べすぎた翌日、胃が重い朝に。消化助茶は、健胃・整腸作用のある生薬を中心に' +
      '組み合わせたブレンドです。山楂子・麦芽の自然な甘みと、陳皮の爽やかな香りが、' +
      '胃腸の働きを穏やかにサポートします。食後のお茶として毎日の習慣にしてください。',
    category: '茶葉',
    ingredients: ['山楂子', '麦芽', '陳皮', '神麹', '砂仁', '甘草'],
    usage: '食後すぐに、90℃のお湯でティーバッグを3〜4分蒸らしてください。温かいうちにお召し上がりください。',
    imageUrl: '/images/products/shouka-tea.jpg',
    stock: 60,
    featured: false,
  },
  {
    id: 'bihada-tea',
    name: '美肌草茶',
    nameEn: 'Bihada Tea',
    price: 3200,
    description: '内側から肌を潤す、美容のための漢方ブレンド。透明感のある肌へ。',
    longDescription:
      '美しい肌は、内側の健康から。美肌草茶は、肌の潤いを補い、透明感を引き出す' +
      '生薬を選び抜いてブレンドしました。白茯苓・薏苡仁・枸杞子の組み合わせは、' +
      '古来より美容に用いられてきた定番処方です。毎日飲み続けることで、' +
      '肌の内側から変化を感じていただけます。',
    category: '茶葉',
    ingredients: ['白茯苓', '薏苡仁', '枸杞子', '桃花', '白芍', '甘草'],
    usage: '90℃のお湯でティーバッグを4〜5分蒸らしてください。1日2杯、継続的なご使用をおすすめします。',
    imageUrl: '/images/products/bihada-tea.jpg',
    stock: 42,
    featured: true,
  },
  {
    id: 'seasonal-set',
    name: '季節の漢方セット',
    nameEn: 'Seasonal Kampo Set',
    price: 8500,
    description: '四季に合わせた3種の茶葉を詰め合わせたギフトセット。大切な方への贈り物に。',
    longDescription:
      '日本の四季は、体の状態にも変化をもたらします。季節の漢方セットは、' +
      'その季節に最適な3種の茶葉を厳選してお届けします。美しい木箱に納めた本セットは、' +
      'ご自身へのご褒美として、また大切な方へのギフトとしても喜ばれています。' +
      '季節ごとに内容が変わるため、年間を通じてお楽しみいただけます。',
    category: 'セット',
    ingredients: ['季節により異なります（商品に同封のリーフレットをご確認ください）'],
    usage: '各茶葉の説明書に従ってお召し上がりください。セットには詳しい飲み方ガイドが付属します。',
    imageUrl: '/images/products/seasonal-set.jpg',
    stock: 20,
    featured: false,
  },
];

export const getFeaturedProducts = (): Product[] =>
  products.filter((p) => p.featured);

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductsByCategory = (category: string): Product[] =>
  category === 'all' ? products : products.filter((p) => p.category === category);

export const categories = ['all', '茶葉', 'セット'] as const;
export type Category = (typeof categories)[number];
