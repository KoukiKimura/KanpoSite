export type MockIngredientEntry = {
  name: string;
  botanical: string;
  part: string;
  origin: string;
  note: string;
};

export type MockLabelRow = {
  label: string;
  value: string;
};

export type MockIngredientPage = {
  lead: string;
  summary: string;
  labelRows: MockLabelRow[];
  entries: MockIngredientEntry[];
};

export const mockIngredientPages: Record<string, MockIngredientPage> = {
  'mountain-herb-blend': {
    lead:
      '朝の湯気に似合う山のハーブブレンドです。やわらかな香りが出るよう、葉・花・枝を静かな配合でまとめています。',
    summary:
      '渋みを立てすぎず、畑と里山の気配がそのまま残るように整えた茶葉構成です。軽い甘みと木の香りが後に残る設計です。',
    labelRows: [
      { label: '商品名', value: '山のハーブブレンド' },
      { label: '形状', value: '茶葉' },
      { label: '内容量', value: '30g' },
      {
        label: '原材料名',
        value: 'カモミール、レモンバーム、ヨモギ、黒文字、柿の葉',
      },
      { label: '保存方法', value: '高温多湿を避け、香りの移りに注意して保存' },
      { label: '飲み方', value: 'ティースプーン1杯を熱湯200mlで3分抽出' },
    ],
    entries: [
      {
        name: 'カモミール',
        botanical: 'Matricaria chamomilla',
        part: '花',
        origin: '北海道',
        note: '全体の香りを丸くまとめる、やわらかな甘みの芯です。',
      },
      {
        name: 'レモンバーム',
        botanical: 'Melissa officinalis',
        part: '葉',
        origin: '滋賀県',
        note: '立ち上がりに軽さを出し、後味を澄ませるために配合しています。',
      },
      {
        name: 'ヨモギ',
        botanical: 'Artemisia princeps',
        part: '葉',
        origin: '徳島県',
        note: '野の香りを残す軸として、ごく穏やかな比率で整えています。',
      },
      {
        name: '黒文字',
        botanical: 'Lindera umbellata',
        part: '枝葉',
        origin: '高知県',
        note: '木の香りを足し、湯気に奥行きを持たせる役割です。',
      },
      {
        name: '柿の葉',
        botanical: 'Diospyros kaki',
        part: '葉',
        origin: '奈良県',
        note: '余韻をすっきり整え、日常のお茶として続けやすくしています。',
      },
    ],
  },
  'herbal-powder': {
    lead:
      '白湯や粥に合わせやすい和漢の養生粉です。日々の台所で少量ずつ続けられるよう、口当たりを穏やかに整えています。',
    summary:
      '香りが強く出すぎる素材は細かく配分し、粉のままでも扱いやすい軽さを優先しています。朝の湯や食事に溶け込む設計です。',
    labelRows: [
      { label: '商品名', value: '和漢の養生粉' },
      { label: '形状', value: '粉末' },
      { label: '内容量', value: '45g' },
      {
        label: '原材料名',
        value: '生姜粉末、陳皮粉末、なつめ粉末、葛粉、ヨモギ粉末',
      },
      { label: '保存方法', value: '開封後は密閉し、乾燥した冷暗所で保存' },
      { label: '使用目安', value: '小さじ1/2を白湯、粥、スープなどへ' },
    ],
    entries: [
      {
        name: '生姜',
        botanical: 'Zingiber officinale',
        part: '根茎',
        origin: '高知県',
        note: '立ち上がりの香りを作り、粉全体の輪郭を引き締めます。',
      },
      {
        name: '陳皮',
        botanical: 'Citrus reticulata',
        part: '果皮',
        origin: '和歌山県',
        note: '柑橘の軽い余韻を添え、食事に合わせやすくしています。',
      },
      {
        name: 'なつめ',
        botanical: 'Ziziphus jujuba',
        part: '果実',
        origin: '長野県',
        note: 'やさしい甘みを加え、継続しやすい味わいへ整えます。',
      },
      {
        name: '葛',
        botanical: 'Pueraria montana var. lobata',
        part: '根',
        origin: '奈良県',
        note: '粉のなじみをよくし、湯や粥へ溶かしたときのまとまりを作ります。',
      },
      {
        name: 'ヨモギ',
        botanical: 'Artemisia princeps',
        part: '葉',
        origin: '徳島県',
        note: '野の香りを少し残し、和漢らしい気配を支える素材です。',
      },
    ],
  },
  'seasonal-care-set': {
    lead:
      '季節ごとの整え方をひと箱にまとめた養生セットです。朝と夜で使い分けられるよう、お茶と粉末を中心に構成しています。',
    summary:
      '贈りものとしても扱いやすいよう、香り・使い方・量感のバランスを揃えています。箱を開けたときに季節の空気が伝わる設計です。',
    labelRows: [
      { label: '商品名', value: '季節の養生セット' },
      { label: '形状', value: 'セット品' },
      { label: '内容量', value: '茶葉2種、粉末1種、香包1点' },
      {
        label: '同梱内容',
        value: '朝の茶葉、夜のお茶、和漢の養生粉、季節の香包',
      },
      { label: '保存方法', value: '直射日光を避け、涼しい場所で保管' },
      { label: '使用目安', value: '朝・夜・休息時に分けて使用' },
    ],
    entries: [
      {
        name: '朝の茶葉',
        botanical: 'Blend for morning',
        part: '茶葉',
        origin: '滋賀県ほか',
        note: '朝の目覚めに合わせた軽い香りの茶葉です。',
      },
      {
        name: '夜のお茶',
        botanical: 'Blend for night',
        part: '茶葉',
        origin: '静岡県ほか',
        note: '灯りを落とす時間に合わせた穏やかなブレンドです。',
      },
      {
        name: '和漢の養生粉',
        botanical: 'Daily herbal powder',
        part: '粉末',
        origin: '高知県ほか',
        note: '白湯や粥に混ぜやすいよう微粉末に整えています。',
      },
      {
        name: '香包',
        botanical: 'Seasonal sachet',
        part: '乾燥葉・花',
        origin: '奈良県ほか',
        note: '箱を開けた瞬間の空気を整えるための季節の香りです。',
      },
    ],
  },
  'botanical-tablets': {
    lead:
      '外出先でも取り入れやすいよう整えた養生錠です。小粒で飲みやすく、日々の持ち歩きに向くよう配合を組んでいます。',
    summary:
      '錠剤化しても香りが重くなりすぎないよう、葉・根・果皮の比率を細かく調整しています。朝と昼の切り替えに使いやすい設計です。',
    labelRows: [
      { label: '商品名', value: '草木の養生錠' },
      { label: '形状', value: '錠剤' },
      { label: '内容量', value: '90粒' },
      {
        label: '原材料名',
        value: '桑の葉粉末、生姜粉末、山椒粉末、陳皮粉末、霊芝粉末',
      },
      { label: '保存方法', value: '乾燥剤入りのまま保管し、開封後は早めに使用' },
      { label: '使用目安', value: '1日3〜6粒を目安に水または白湯で' },
    ],
    entries: [
      {
        name: '桑の葉',
        botanical: 'Morus alba',
        part: '葉',
        origin: '埼玉県',
        note: '全体の基調になる葉の香りを作り、穏やかな青みを残します。',
      },
      {
        name: '生姜',
        botanical: 'Zingiber officinale',
        part: '根茎',
        origin: '高知県',
        note: '輪郭を締め、朝の切り替えに向く軽い刺激を添えます。',
      },
      {
        name: '山椒',
        botanical: 'Zanthoxylum piperitum',
        part: '果皮',
        origin: '和歌山県',
        note: '粒の後味に細い香りを残すため、ごく少量を配合しています。',
      },
      {
        name: '陳皮',
        botanical: 'Citrus reticulata',
        part: '果皮',
        origin: '和歌山県',
        note: '飲み込んだあとに残る香りを軽くし、継続しやすくしています。',
      },
      {
        name: '霊芝',
        botanical: 'Ganoderma lucidum',
        part: '子実体',
        origin: '長野県',
        note: '全体の密度を作るために、微量で落ち着いた苦みを加えています。',
      },
    ],
  },
  'night-soil-tea': {
    lead:
      '夜の湯気に似合う、静かな香りのお茶です。灯りを落としたあとにも重くなりすぎないよう、花と葉を中心にまとめています。',
    summary:
      'ほうじ茶の香ばしさを土台に、やさしい花の香りと豆の余韻を重ねています。休息前の一杯として飲みやすい配合です。',
    labelRows: [
      { label: '商品名', value: '夜のくつろぎ茶' },
      { label: '形状', value: '茶葉' },
      { label: '内容量', value: '25g' },
      {
        label: '原材料名',
        value: 'ほうじ茶、ラベンダー、カモミール、黒豆、レモングラス',
      },
      { label: '保存方法', value: '香りが飛びやすいため、密閉して保存' },
      { label: '飲み方', value: 'ティースプーン1杯を熱湯180mlで2〜3分抽出' },
    ],
    entries: [
      {
        name: 'ほうじ茶',
        botanical: 'Camellia sinensis',
        part: '葉',
        origin: '静岡県',
        note: '全体の土台になる香ばしさを作り、夜の一杯らしい落ち着きを出します。',
      },
      {
        name: 'ラベンダー',
        botanical: 'Lavandula angustifolia',
        part: '花',
        origin: '北海道',
        note: '香りの輪郭をやわらかく引き上げるために少量配合しています。',
      },
      {
        name: 'カモミール',
        botanical: 'Matricaria chamomilla',
        part: '花',
        origin: '北海道',
        note: '夜の湯気に合うやわらかな甘みを支えています。',
      },
      {
        name: '黒豆',
        botanical: 'Glycine max',
        part: '種子',
        origin: '兵庫県',
        note: '香ばしい余韻を残し、飲み口に丸さを加えます。',
      },
      {
        name: 'レモングラス',
        botanical: 'Cymbopogon citratus',
        part: '葉',
        origin: '熊本県',
        note: '後味を重くしないための細い香りとして使っています。',
      },
    ],
  },
};

export function getIngredientPageBySlug(slug: string) {
  return mockIngredientPages[slug];
}
