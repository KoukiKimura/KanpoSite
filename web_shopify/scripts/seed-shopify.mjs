import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const envArg = process.argv.find((a) => a.startsWith('--env='));
const envFile = envArg === '--env=production' ? '.env' : '.env.local';
const envPath = path.join(repoRoot, 'env', 'shopify', envFile);
const apiVersionDefault = '2026-04';

const metafieldDefinitions = [
  {
    ownerType: 'PRODUCT',
    namespace: 'custom',
    key: 'quantity',
    name: '内容量',
    type: 'single_line_text_field',
    description: '商品の内容量・規格を表示します。',
  },
  {
    ownerType: 'PRODUCT',
    namespace: 'custom',
    key: 'ingredients',
    name: '原材料',
    type: 'multi_line_text_field',
    description: '商品詳細に表示する原材料です。',
  },
  {
    ownerType: 'PRODUCT',
    namespace: 'custom',
    key: 'how_to_use',
    name: '飲み方・使い方',
    type: 'multi_line_text_field',
    description: '商品詳細に表示する飲み方・使い方です。',
  },
  {
    ownerType: 'PRODUCT',
    namespace: 'custom',
    key: 'caution',
    name: '注意事項',
    type: 'multi_line_text_field',
    description: '商品詳細に表示する注意事項です。',
  },
  {
    ownerType: 'PRODUCT',
    namespace: 'custom',
    key: 'related_products',
    name: '関連商品',
    type: 'list.product_reference',
    description: '商品詳細に表示する関連商品です。',
  },
  {
    ownerType: 'PAGE',
    namespace: 'custom',
    key: 'access_text',
    name: 'アクセス案内',
    type: 'multi_line_text_field',
    description: '古民家ページのアクセス案内です。',
  },
  {
    ownerType: 'PAGE',
    namespace: 'custom',
    key: 'reservation_url',
    name: '予約URL',
    type: 'url',
    description: '古民家予約用の外部URLです。',
  },
];

const products = [
  {
    handle: 'inutouki-tea-powder',
    title: 'イヌトウキ茶（粉末）',
    type: '粉末',
    price: '2500',
    stock: 30,
    summary: '愛媛県大洲市長浜・喜多灘産のイヌトウキを使った、日々に取り入れやすい粉末タイプのお茶です。',
    description:
      '愛媛県大洲市長浜町（喜多灘・今坊）の畑で大切に育てたイヌトウキ（Angelica shikokiana）を粉末にしたお茶です。イヌトウキはセリ科シシウド属の四国固有種で、自然界では環境省レッドリスト絶滅危惧II類（VU）に指定される希少な植物です。肱川が伊予灘に注ぐ温暖で日照豊富な土地の畑で、野生採取ではなく栽培・継承しています。水またはお湯に溶かしやすく、毎日の一杯として取り入れやすい形です。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '30g',
    ingredients: 'イヌトウキ加工品',
    howToUse: '1日小さじすりきり1杯を目安に、水またはお湯500ccに溶かしてお召し上がりください。',
    caution:
      '本品は医薬品ではありません。体質や服薬状況に不安がある場合は、医師または薬剤師へご相談ください。',
    tags: ['featured', 'new', '粉末', 'イヌトウキ'],
    seoTitle: 'イヌトウキ茶（粉末） | 四国ボタニカ',
    seoDescription:
      'イヌトウキ茶の粉末タイプです。水またはお湯に溶かして飲める日々の一杯としてご案内します。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-product-touki-powder.jpg'),
        alt: 'イヌトウキ茶 粉末の商品画像',
      },
    ],
  },
  {
    handle: 'inutouki-tea-tablets',
    title: 'イヌトウキ茶（錠剤）',
    type: '錠剤',
    price: '3000',
    stock: 30,
    summary: '愛媛県大洲市長浜・喜多灘産の当帰を使った、外出先でも続けやすい錠剤タイプです。',
    description:
      '愛媛県大洲市長浜町（喜多灘・今坊）産のイヌトウキ（四国固有種）を使用した錠剤タイプです。粉末を溶かす手間を少なくし、外出先でも取り入れやすい形です。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '30g',
    ingredients: 'イヌトウキ加工品',
    howToUse: '1日4から6錠を目安に、水またはお湯とともにお召し上がりください。',
    caution:
      '本品は医薬品ではありません。体質に合わない場合は使用をお控えください。',
    tags: ['featured', 'new', '錠剤', 'イヌトウキ'],
    seoTitle: 'イヌトウキ茶（錠剤） | 四国ボタニカ',
    seoDescription:
      'イヌトウキ茶の錠剤タイプです。水またはお湯とともに取り入れられます。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-product-touki-tablets.jpg'),
        alt: 'イヌトウキ茶 錠剤の商品画像',
      },
    ],
  },
  {
    handle: 'inutouki-tea-pills',
    title: 'イヌトウキ茶（丸剤）',
    type: '丸剤',
    price: '3000',
    stock: 30,
    summary: '愛媛県大洲市長浜・喜多灘産の当帰を粒状で取り入れやすくした丸剤タイプです。',
    description:
      '愛媛県大洲市長浜町（喜多灘・今坊）産のイヌトウキ（四国固有種）を使用した丸剤タイプです。粒状で扱いやすく、毎日の一杯や食事の時間にあわせて続けやすい形です。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '30g',
    ingredients: 'イヌトウキ加工品',
    howToUse: '1日4から6錠を目安に、水またはお湯とともにお召し上がりください。',
    caution:
      '本品は医薬品ではありません。体質に合わない場合は使用をお控えください。',
    tags: ['featured', 'new', '丸剤', 'イヌトウキ'],
    seoTitle: 'イヌトウキ茶（丸剤） | 四国ボタニカ',
    seoDescription:
      'イヌトウキ茶の丸剤タイプです。粒状で扱いやすい形です。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-product-touki-pills.jpg'),
        alt: 'イヌトウキ茶 丸剤の商品画像',
      },
    ],
  },
  {
    handle: 'inutouki-tea-leaves',
    title: 'イヌトウキ茶（茶葉）',
    type: 'お茶',
    price: '1500',
    stock: 30,
    summary: '愛媛県大洲市長浜・喜多灘産のイヌトウキ特有の芳香を、ゆっくり蒸らして引き出す茶葉タイプです。',
    description:
      '愛媛県大洲市長浜町（喜多灘・今坊）産のイヌトウキ（四国固有種）を茶葉にした商品です。セリ科植物特有の豊かな芳香が特長で、湯を注いで待つ時間とともに香りを楽しめます。3から5分蒸らしてお召し上がりください。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '40g',
    ingredients: 'イヌトウキ茶葉',
    howToUse: '温めたティーポットに茶葉を入れ、95度程度のお湯を静かに注ぎます。ふたをして3から5分蒸らしてから茶葉を取り出してください。',
    caution:
      '体調や服薬状況により合わない場合があります。通院中、妊娠中、授乳中の方は医師または薬剤師へご相談ください。',
    tags: ['featured', 'new', 'お茶', 'イヌトウキ'],
    seoTitle: 'イヌトウキ茶（茶葉） | 四国ボタニカ',
    seoDescription:
      'イヌトウキ茶の茶葉タイプです。3から5分蒸らして香りを引き出します。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-product-touki-leaves.jpg'),
        alt: 'イヌトウキ茶 茶葉の商品画像',
      },
    ],
  },
  {
    handle: 'inutouki-tea-teabag',
    title: 'イヌトウキ茶（茶葉ティーバッグ）',
    type: 'お茶',
    price: '1500',
    stock: 30,
    summary: '愛媛県大洲市長浜・喜多灘産のイヌトウキを、1袋ずつ手軽に楽しめるティーバッグタイプです。',
    description:
      '愛媛県大洲市長浜町（喜多灘・今坊）産のイヌトウキ（四国固有種）を茶葉ティーバッグにした商品です。1袋ずつ扱える仕様で、セリ科植物特有の香りを手軽に毎日の一杯として楽しめます。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '2g×20袋',
    ingredients: 'イヌトウキ茶葉',
    howToUse: '温めたティーポットに1袋を入れ、95度程度のお湯を静かに注ぎます。ふたをして3から5分蒸らしてからティーバッグを取り出してください。',
    caution:
      '本品は医薬品ではありません。体質に合わない場合は使用をお控えください。',
    tags: ['featured', 'new', 'お茶', 'イヌトウキ'],
    seoTitle: 'イヌトウキ茶（茶葉ティーバッグ） | 四国ボタニカ',
    seoDescription:
      'イヌトウキ茶の茶葉ティーバッグタイプです。1袋ずつ扱いやすい商品です。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-product-touki-teabag.jpg'),
        alt: 'イヌトウキ茶 茶葉ティーバッグの商品画像',
      },
    ],
  },
  {
    handle: 'dokudami-touki-tea',
    title: 'ドクダミとトウキのお茶',
    type: 'お茶',
    price: '1500',
    stock: 30,
    summary: 'ドクダミと、愛媛県大洲市長浜産のイヌトウキ（当帰）を合わせたブレンドハーブティーです。',
    description:
      '昔から暮らしの中で親しまれてきたドクダミと、愛媛県大洲市長浜町（喜多灘・今坊）産のイヌトウキ（当帰）を組み合わせたブレンドハーブティーです。国産原材料100%・無添加でお届けします。香りを楽しむ日々の一杯としてお召し上がりください。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '2g×20袋',
    ingredients: 'ドクダミ、トウキ',
    howToUse: '1袋に熱湯を注ぎ、好みの濃さまで抽出してお召し上がりください。',
    caution:
      '原材料は国産100%、添加物は使用していません。体質や服薬状況に不安がある場合は、医師または薬剤師へご相談ください。',
    tags: ['featured', 'new', 'お茶', 'イヌトウキ'],
    seoTitle: 'ドクダミとトウキのお茶 | 四国ボタニカ',
    seoDescription:
      'ドクダミとトウキを合わせた国産原材料100%のお茶です。1袋ずつ扱いやすいティーバッグです。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-touki-dt.jpg'),
        alt: 'ドクダミとトウキのお茶の商品画像',
      },
    ],
  },
  {
    handle: 'touki-powder',
    title: '当帰粉末',
    type: '粉末',
    price: '3000',
    stock: 20,
    summary: '栽培期間中農薬不使用のヒュウガトウキ茎・葉を粉末にした当帰粉末です。',
    description:
      '栽培期間中は農薬・除草剤・化学肥料を使わずに育てたヒュウガトウキの茎と葉を粉末にした商品です。シシウド属（当帰類）の豊かな植物の香りとともに、食事や飲みもの・白湯に少量ずつ加えやすい形です。食品であり、疾病の診断、治療、予防を目的とするものではありません。',
    quantity: '30g',
    ingredients: 'ヒュウガトウキの茎、ヒュウガトウキの葉',
    howToUse: '少量から、白湯やお茶、食事に混ぜてお召し上がりください。',
    caution:
      '原材料は国産100%、添加物は使用していません。栽培期間中は農薬・除草剤・化学肥料を使っていません。体質に合わない場合は使用をお控えください。',
    tags: ['featured', 'new', '粉末', 'イヌトウキ'],
    seoTitle: '当帰粉末 | 四国ボタニカ',
    seoDescription:
      'ヒュウガトウキの茎と葉を粉末にした当帰粉末です。白湯や食事に少量ずつ加えやすい形です。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-touki-p.jpg'),
        alt: '当帰粉末の商品画像',
      },
    ],
  },
  {
    handle: 'inutouki-seedling',
    title: 'イヌトウキ苗',
    type: '苗',
    price: '0',
    stock: 0,
    summary: '四国の名を学名に冠する日本固有種・環境省絶滅危惧II類のイヌトウキ苗を、予約・問い合わせ品としてご案内します。',
    description:
      'イヌトウキ（Angelica shikokiana Makino）は、四国の名を学名に冠する日本固有のセリ科植物です。環境省レッドリストで絶滅危惧II類（VU）に指定されるほど自然界では希少ですが、愛媛県大洲市長浜の畑で大切に栽培・継承しています。苗から育てることで、植物の背景や栽培の時間を自宅や畑でも体感できます。多年草のため一度根付けば毎年楽しめます。価格、在庫、出荷時期、栽培方法はお問い合わせください。',
    quantity: '1苗から相談',
    ingredients: 'イヌトウキ苗',
    howToUse: '植え付け時期、管理方法、発送可否は個別にご案内します。',
    caution: '予約・問い合わせ品です。カート販売ではなく、お問い合わせ後に条件を確認します。',
    tags: ['featured', 'new', '苗', 'inquiry-only'],
    seoTitle: 'イヌトウキ苗 | 四国ボタニカ',
    seoDescription:
      'Angelica shikokiana Makino のイヌトウキ苗です。価格、在庫、出荷時期、栽培方法はお問い合わせください。',
    images: [
      {
        file: path.join(repoRoot, 'web_shopify', 'assets', 'srs-inutouki-2022.jpg'),
        alt: 'イヌトウキ苗の商品画像',
      },
    ],
  },
];

const collections = [
  {
    handle: 'featured-products',
    title: '注目商品',
    description: '当帰の素材感や産地の背景を感じられる商品です。',
    productHandles: products.map((product) => product.handle),
    imageProductHandle: 'inutouki-tea-powder',
    imageAlt: '四国ボタニカのイヌトウキ関連商品',
    seoTitle: '注目商品 | 四国ボタニカ',
    seoDescription: 'イヌトウキ茶、ドクダミとトウキのお茶、当帰粉末、イヌトウキ苗をまとめた四国ボタニカの注目商品一覧です。',
  },
  {
    handle: 'tea',
    title: 'お茶',
    description: '日々の一杯として楽しめるイヌトウキ茶です。',
    productHandles: ['inutouki-tea-leaves', 'inutouki-tea-teabag', 'dokudami-touki-tea'],
    imageProductHandle: 'inutouki-tea-teabag',
    imageAlt: 'イヌトウキ茶の商品',
    seoTitle: 'お茶 | 四国ボタニカ',
    seoDescription: 'イヌトウキ茶の茶葉、茶葉ティーバッグ、ドクダミとトウキのお茶を掲載します。',
  },
  {
    handle: 'powder',
    title: '粉末',
    description: '飲みものや食事に少量ずつ加えやすい粉末商品です。',
    productHandles: ['inutouki-tea-powder', 'touki-powder'],
    imageProductHandle: 'inutouki-tea-powder',
    imageAlt: 'イヌトウキ茶 粉末の商品',
    seoTitle: '粉末 | 四国ボタニカ',
    seoDescription: 'イヌトウキ茶の粉末と当帰粉末を掲載します。飲みものや食事に少量ずつ加えやすい商品です。',
  },
  {
    handle: 'tablets',
    title: '錠剤',
    description: '水またはお湯とともに取り入れやすい当帰茶の錠剤です。',
    productHandles: ['inutouki-tea-tablets'],
    imageProductHandle: 'inutouki-tea-tablets',
    imageAlt: 'イヌトウキ茶 錠剤の商品',
    seoTitle: '錠剤 | 四国ボタニカ',
    seoDescription: 'イヌトウキ茶の錠剤タイプを掲載します。水またはお湯とともに取り入れやすい商品です。',
  },
  {
    handle: 'pills',
    title: '丸剤',
    description: '粒状で取り入れやすい当帰茶の丸剤です。',
    productHandles: ['inutouki-tea-pills'],
    imageProductHandle: 'inutouki-tea-pills',
    imageAlt: 'イヌトウキ茶 丸剤の商品',
    seoTitle: '丸剤 | 四国ボタニカ',
    seoDescription: 'イヌトウキ茶の丸剤タイプを掲載します。粒状で扱いやすい商品です。',
  },
  {
    handle: 'seedlings',
    title: '苗',
    description: '予約・問い合わせ品としてご案内するイヌトウキ苗です。',
    productHandles: ['inutouki-seedling'],
    imageProductHandle: 'inutouki-seedling',
    imageAlt: 'イヌトウキ苗',
    seoTitle: '苗 | 四国ボタニカ',
    seoDescription: 'Angelica shikokiana Makino のイヌトウキ苗を予約・問い合わせ品としてご案内します。',
  },
];

const pages = [
  {
    handle: 'kominka',
    title: '古民家',
    templateSuffix: 'kominka',
    bodyHtml:
      '<p>愛媛県大洲市長浜町今坊・喜多灘の当帰畑の近くにある古民家で、畑の空気と海に近い集落の時間を過ごす滞在をご案内します。</p><p>喜多灘は、肱川が伊予灘（瀬戸内海）に注ぐ河口域に位置する、年間平均気温約16℃の温暖で日照豊富な土地です。秋から冬の早朝には「肱川あらし」という神秘的な気象現象が見られ、大洲盆地の冷気が霧となって河口へと流れ下ります。こうした豊かな自然環境の中で、四国固有種のイヌトウキ（環境省絶滅危惧II類）を野生採取ではなく栽培・継承しています。</p>',
    seoTitle: '喜多灘の古民家 | 四国ボタニカ',
    seoDescription:
      '愛媛県大洲市長浜町今坊・喜多灘の当帰畑の近くにある古民家の滞在案内です。旧喜多灘小学校周辺のアクセスも掲載しています。',
    metafields: [
      {
        namespace: 'custom',
        key: 'access_text',
        type: 'multi_line_text_field',
        value:
          '〒799-3411 愛媛県大洲市長浜町今坊1154（旧喜多灘小学校・現喜多灘ふれあい広場）周辺です。JR予讃線の喜多灘駅が最寄りですが、施設までは約2.3kmあります。車での来訪や送迎の有無、駐車場所はご予約時に確認します。',
      },
    ],
  },
  {
    handle: 'srs',
    title: '当帰コーナー',
    templateSuffix: 'srs',
    bodyHtml:
      '<p>イヌトウキ、栽培記録、身体データの記録、当帰関連商品の情報をまとめた当帰コーナーです。</p>',
    seoTitle: '当帰コーナー | 四国ボタニカ',
    seoDescription:
      'イヌトウキ、栽培記録、身体データの記録、当帰茶、当帰粉末、苗を紹介する四国ボタニカの当帰コーナーです。',
    metafields: [],
  },
  {
    handle: 'contact',
    title: 'お問い合わせ',
    templateSuffix: 'contact',
    bodyHtml: '<p>商品、古民家、取材や訪問についてのお問い合わせはこちらからお送りください。</p>',
    seoTitle: 'お問い合わせ | 四国ボタニカ',
    seoDescription: '四国ボタニカの商品、古民家、取材や訪問に関するお問い合わせフォームです。',
    metafields: [],
  },
  {
    handle: 'contact-thanks',
    title: 'お問い合わせ受付完了',
    templateSuffix: 'contact-thanks',
    bodyHtml: '<p>お問い合わせを受け付けました。</p>',
    seoTitle: 'お問い合わせ受付完了 | 四国ボタニカ',
    seoDescription: '四国ボタニカへのお問い合わせを受け付けました。',
    metafields: [],
  },
  {
    handle: 'faq',
    title: 'よくある質問',
    templateSuffix: 'faq',
    bodyHtml: '<p>商品や古民家滞在について、事前によくいただく質問をまとめています。</p>',
    seoTitle: 'よくある質問 | 四国ボタニカ',
    seoDescription: '四国ボタニカの商品や古民家滞在について、事前によくいただく質問をまとめたページです。',
    metafields: [],
  },
  {
    handle: 'terms-of-service',
    title: '利用規約',
    templateSuffix: 'terms-of-service',
    bodyHtml:
      '<p>四国ボタニカオンラインストアの利用条件、注文、配送、返品、問い合わせ品、商品情報の取り扱いについて定めます。</p>',
    seoTitle: '利用規約 | 四国ボタニカ',
    seoDescription: '四国ボタニカオンラインストアの利用規約です。注文、配送、返品、問い合わせ品、商品情報の取り扱いについて定めます。',
    metafields: [],
  },
  {
    handle: 'about-us',
    title: 'About Us',
    templateSuffix: 'about-us',
    bodyHtml:
      '<h2>アラン・ペレグリーニ：精神・芸術・大地を紡ぐ道</h2>' +
      '<h3>ブランド名に込めた想い：シコク・ボタニカ</h3>' +
      '<p>「シコク・ボタニカ（Shikoku Botanica）」という名には、私の二つの魂が込められています。「シコク（四国）」は、私が移り住み、人生の拠点として選んだ日本の精神的で豊かな地。そして「ボタニカ（Botanica）」はイタリア語で「植物学」を意味し、私の母国イタリアの伝統への敬意を表しています。この名は、西洋と東洋を薬草の力で結ぶ架け橋となるという、私の決意そのものです。</p>' +
      '<h3>探求の旅：道から根源へ</h3>' +
      '<p>私の道のりは、世界の道の上から始まりました。自転車と徒歩で国境を越え、何千キロもの道を旅する中で、私は「真の豊かさ」は速度ではなく、観察の深さと土地への深い敬意にあることを学びました。その探求心に導かれ、私はイタリアから愛媛の山々へと辿り着きました。ここでの生活は、私の美と真理への探求が、大地を慈しむという新たな形を見出した瞬間でもありました。</p>' +
      '<h3>師から受け継いだ遺産：芸術・人生・規律</h3>' +
      '<p>私の世界観を決定づけたのは、師である藤部吉人氏との出会いでした。彫刻の師としてだけでなく、人生と芸術の導き手として、彼は私を<strong>日本の本草学（薬草学）</strong>の世界へと導いてくれました。石を削る際も、薬草をミリ単位の精度で裁断する際も、すべての所作は「調和」に導かれるべきであるという教えです。</p>' +
      '<p>この規律は、合気道の師範としての私の生き方とも深く共鳴しています。畳の上で培った「和」と「気」の探求は、長浜の研究所へと続いています。私たちが向き合う一枚一葉の当帰には、武道や芸術と同じ、至高の規律と情熱が注がれているのです。</p>' +
      '<h3>長浜の聖地：生命が生まれる場所</h3>' +
      '<p>シコク・ボタニカの核心は、瀬戸内海を望む長浜の山小屋にあります。太陽の光が降り注ぎ、潮風が優しく撫でるこの唯一無二のマイクロクライメイト（微気候）の中で、私はヒュウガトウキと稀少な<strong>イヌトウキ（日本当帰）</strong>を育てています。</p>' +
      '<p>私は「いーえひめ本草研究会」の副会長として、絶滅の危機にあるイヌトウキの保護に人生を捧げています。私たちの哲学は、倫理的かつ科学的です。植物の命を絶やさぬよう根を残し、ミネラル成分が最も豊富な<strong>「葉と茎」</strong>のみを収穫することで、自然との共生を実現しています。</p>' +
      '<h3>ティーの芸術：純粋なオーガニックと至高のブレンド</h3>' +
      '<p>シコク・ボタニカが届けるのは、純粋でオーガニックな心身の調和です。私たちの植物は完全無農薬で育てられ、厳格な規律のもと、すべて手摘みで収穫されています。</p>' +
      '<p>単一品種の純粋さを追求するだけでなく、私は「ドクダミ」や「キバナオウギ（黄花黄耆）」を配合した独自のブレンドも手がけています。これらは五感を満たす「芸術作品」であり、長浜の大地のエネルギーを一杯のティーに凝縮したものです。また、エビスグサの栽培やジャカランダの植樹など、健康と風景の美しさが共鳴する未来を、私はこの地で描き続けています。</p>' +
      '<p><em>Made with love by Alan Pellegrini</em></p>',
    seoTitle: 'About Us | 四国ボタニカ',
    seoDescription: 'アラン・ペレグリーニと四国ボタニカのストーリー。愛媛の長浜から、イヌトウキの守り手として薬草の知恵をお届けします。',
    metafields: [],
  },
];

const redirects = [
  {
    path: '/policies/terms-of-service',
    target: '/pages/terms-of-service',
  },
];

const blog = {
  handle: 'stories',
  title: 'BLOG',
  seoTitle: 'BLOG | 四国ボタニカ',
  seoDescription: '四国ボタニカのBLOGです。四国の植物、薬草、商品づくり、古民家での時間を紹介します。',
  articles: [
    {
      handle: 'satoyama-herbs',
      title: '当帰の背景と日々の記録',
      tags: 'story',
      summary: '当帰の背景と栽培、日々の記録について紹介します。',
      seoTitle: '当帰の背景と日々の記録 | 四国ボタニカBLOG',
      seoDescription: '当帰の背景、栽培、日々の記録について紹介します。',
      imageAlt: '当帰の商品づくりに関わる風景',
      body:
      '<p>当帰は、栽培、素材の香り、日々の記録とあわせて紹介している植物です。商品は食品として、疾病の診断、治療、予防を目的とせず、嗜好品としてご案内しています。</p>',
      image: path.join(repoRoot, 'web_mock', 'public', 'images', 'home', 'field-walk.webp'),
    },
    {
      handle: 'dokudami-touki-tea-routine',
      title: 'ドクダミとトウキのお茶を淹れる',
      tags: 'product',
      summary: 'ドクダミとトウキのお茶の使い方を紹介します。',
      seoTitle: 'ドクダミとトウキのお茶を淹れる | 四国ボタニカBLOG',
      seoDescription: 'ドクダミとトウキのお茶を日々の一杯として取り入れるための淹れ方を紹介します。',
      imageAlt: '朝のお茶を淹れる時間',
      body:
        '<p>ドクダミとトウキのお茶は、湯を注いで好みの濃さまで抽出します。香りを強く出しすぎず、日々続けられる薄さから始めるのがおすすめです。</p>',
      image: path.join(repoRoot, 'web_mock', 'public', 'images', 'home', 'morning-tea.webp'),
    },
    {
      handle: 'kominka-morning',
      title: '古民家で過ごす朝',
      tags: 'kominka',
      summary: '古民家滞在の朝の雰囲気を紹介します。',
      seoTitle: '古民家で過ごす朝 | 四国ボタニカBLOG',
      seoDescription: '喜多灘の当帰畑の近くにある古民家で過ごす朝を紹介します。',
      imageAlt: '古民家近くの朝の畑',
      body:
        '<p>古民家の朝は、喜多灘の畑の空気と木の香りから始まります。派手に整えすぎず、当帰を育てる畑と家の静けさをそのまま受け取れる滞在をご案内しています。</p>',
      image: path.join(repoRoot, 'web_mock', 'public', 'images', 'kominka', 'morning-field.webp'),
    },
  ],
};

function parseEnv(text) {
  const env = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || !line.includes('=')) continue;
    const [name, ...rest] = rawLine.split('=');
    env[name.trim()] = rest.join('=').trim();
  }
  return env;
}

async function loadEnv() {
  return parseEnv(await readFile(envPath, 'utf8'));
}

async function getAccessToken(env) {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: env.SHOPIFY_DEV_CLIENT_ID,
    client_secret: env.SHOPIFY_DEV_CLIENT_SECRET,
  });
  const response = await fetch(`https://${env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });
  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${await response.text()}`);
  }
  const json = await response.json();
  return json.access_token;
}

function makeClient(env, token) {
  const apiVersion = env.SHOPIFY_API_VERSION || apiVersionDefault;
  const adminBase = `https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${apiVersion}`;

  async function rest(method, endpoint, body) {
    const response = await fetch(`${adminBase}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await response.text();
    let json = null;
    if (text) {
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
    }
    if (!response.ok) {
      throw new Error(`${method} ${endpoint} failed: ${response.status} ${text}`);
    }
    return json;
  }

  async function graphql(query, variables = {}) {
    const response = await fetch(`${adminBase}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    });
    const json = await response.json();
    if (!response.ok || json.errors) {
      throw new Error(`GraphQL failed: ${JSON.stringify(json.errors || json)}`);
    }
    return json.data;
  }

  return { rest, graphql };
}

function productImageFiles(product) {
  if (product.images?.length) {
    return product.images.map((image) => image.file).filter((file) => existsSync(file));
  }

  return ['main.webp', 'detail-01.webp', 'detail-02.webp']
    .map((file) => path.join(repoRoot, 'web_mock', 'public', 'images', 'products', product.handle, file))
    .filter((file) => existsSync(file));
}

function productImageAlt(product, file) {
  const customImage = product.images?.find((image) => path.resolve(image.file) === path.resolve(file));
  if (customImage?.alt) return customImage.alt;

  const filename = path.basename(file);
  return product.imageAlts?.[filename] || `${product.title}の商品画像`;
}

function collectionImageFile(collection) {
  if (!collection.imageProductHandle) return null;
  const product = products.find((item) => item.handle === collection.imageProductHandle);
  if (!product) return null;
  return productImageFiles(product)[0] || null;
}

async function imageAttachment(file, alt) {
  const data = await readFile(file);
  return {
    attachment: data.toString('base64'),
    filename: path.basename(file),
    alt,
  };
}

function basenameFromImageSrc(src) {
  try {
    return path.posix.basename(new URL(src).pathname);
  } catch {
    return path.basename(String(src).split('?')[0]);
  }
}

async function getAll(client, endpoint, key) {
  const json = await client.rest('GET', endpoint);
  return json?.[key] || [];
}

function byHandle(items) {
  return new Map(items.map((item) => [item.handle, item]));
}

function productBodyHtml(product) {
  return `<p>${product.summary}</p><p>${product.description}</p>`;
}

async function setMetafield(client, owner, metafield) {
  const endpoint = `/${owner.resource}/${owner.id}/metafields.json`;
  const existing = await client.rest('GET', endpoint);
  const found = existing.metafields?.find(
    (item) => item.namespace === metafield.namespace && item.key === metafield.key,
  );
  if (found) {
    await client.rest('PUT', `/metafields/${found.id}.json`, {
      metafield: { id: found.id, value: metafield.value, type: metafield.type },
    });
    return found.id;
  }
  const created = await client.rest('POST', endpoint, { metafield });
  return created.metafield.id;
}

async function setSeoMetafields(client, owner, item) {
  if (!item.seoTitle && !item.seoDescription) return;
  if (item.seoTitle) {
    await setMetafield(client, owner, {
      namespace: 'global',
      key: 'title_tag',
      type: 'single_line_text_field',
      value: item.seoTitle,
    });
  }
  if (item.seoDescription) {
    await setMetafield(client, owner, {
      namespace: 'global',
      key: 'description_tag',
      type: 'single_line_text_field',
      value: item.seoDescription,
    });
  }
}

async function ensureMetafieldDefinition(client, definition) {
  const existing = await client.graphql(
    `query MetafieldDefinition($ownerType: MetafieldOwnerType!, $namespace: String, $key: String) {
      metafieldDefinitions(ownerType: $ownerType, namespace: $namespace, key: $key, first: 1) {
        nodes { id name namespace key pinnedPosition }
      }
    }`,
    {
      ownerType: definition.ownerType,
      namespace: definition.namespace,
      key: definition.key,
    },
  );
  let saved = existing.metafieldDefinitions.nodes[0];

  if (!saved) {
    const created = await client.graphql(
      `mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition { id name namespace key pinnedPosition }
          userErrors { field message code }
        }
      }`,
      {
        definition: {
          name: definition.name,
          namespace: definition.namespace,
          key: definition.key,
          description: definition.description,
          type: definition.type,
          ownerType: definition.ownerType,
        },
      },
    );
    const errors = created.metafieldDefinitionCreate.userErrors;
    if (errors?.length) throw new Error(`metafieldDefinitionCreate ${definition.namespace}.${definition.key}: ${JSON.stringify(errors)}`);
    saved = created.metafieldDefinitionCreate.createdDefinition;
  }

  if (saved?.id && saved.pinnedPosition == null) {
    const pinned = await client.graphql(
      `mutation PinMetafieldDefinition($definitionId: ID!) {
        metafieldDefinitionPin(definitionId: $definitionId) {
          pinnedDefinition { id name key namespace pinnedPosition }
          userErrors { field message }
        }
      }`,
      { definitionId: saved.id },
    );
    const errors = pinned.metafieldDefinitionPin.userErrors;
    if (errors?.length) throw new Error(`metafieldDefinitionPin ${definition.namespace}.${definition.key}: ${JSON.stringify(errors)}`);
  }

  console.log(`metafield definition ${definition.ownerType} ${definition.namespace}.${definition.key}: ready`);
}

async function ensureMetafieldDefinitions(client) {
  for (const definition of metafieldDefinitions) {
    await ensureMetafieldDefinition(client, definition);
  }
}

async function updateProductImageAlts(client, product, productSeed) {
  for (const image of product.images || []) {
    const filename = basenameFromImageSrc(image.src);
    const alt = productSeed.imageAlts?.[filename] || product.title;
    if (alt && image.alt !== alt) {
      await client.rest('PUT', `/products/${product.id}/images/${image.id}.json`, {
        image: { id: image.id, alt },
      });
    }
  }
}

async function updateCollectionImageAlt(client, collection, alt) {
  if (!alt || !collection.image?.src || collection.image.alt === alt) return collection;
  const updated = await client.rest('PUT', `/custom_collections/${collection.id}.json`, {
    custom_collection: {
      id: collection.id,
      image: {
        src: collection.image.src,
        alt,
      },
    },
  });
  return updated.custom_collection;
}

async function seedProducts(client) {
  const existingProducts = byHandle(await getAll(client, '/products.json?limit=250', 'products'));
  const result = new Map();

  for (const product of products) {
    const images = await Promise.all(
      productImageFiles(product).map((file) => imageAttachment(file, productImageAlt(product, file))),
    );
    let saved = existingProducts.get(product.handle);
    const payload = {
      title: product.title,
      body_html: productBodyHtml(product),
      vendor: '四国ボタニカ',
      product_type: product.type,
      handle: product.handle,
      status: 'active',
      tags: product.tags.join(', '),
      variants: [
        {
          option1: '通常',
          price: product.price,
          inventory_management: 'shopify',
          inventory_policy: 'deny',
          inventory_quantity: product.stock,
          requires_shipping: true,
          taxable: true,
        },
      ],
    };

    if (saved) {
      const updated = await client.rest('PUT', `/products/${saved.id}.json`, {
        product: { id: saved.id, ...payload, variants: undefined },
      });
      saved = updated.product;
      if (!saved.images?.length && images.length > 0) {
        for (const image of images) {
          await client.rest('POST', `/products/${saved.id}/images.json`, { image });
        }
        saved = (await client.rest('GET', `/products/${saved.id}.json`)).product;
      }
      if (saved.variants?.[0]) {
        await client.rest('PUT', `/variants/${saved.variants[0].id}.json`, {
          variant: {
            id: saved.variants[0].id,
            price: product.price,
            inventory_management: 'shopify',
            inventory_policy: 'deny',
          },
        });
      }
    } else {
      const created = await client.rest('POST', '/products.json', {
        product: { ...payload, images },
      });
      saved = created.product;
    }

    await updateProductImageAlts(client, saved, product);

    await setMetafield(client, { resource: 'products', id: saved.id }, {
      namespace: 'custom',
      key: 'quantity',
      type: 'single_line_text_field',
      value: product.quantity,
    });
    await setMetafield(client, { resource: 'products', id: saved.id }, {
      namespace: 'custom',
      key: 'ingredients',
      type: 'multi_line_text_field',
      value: product.ingredients,
    });
    await setMetafield(client, { resource: 'products', id: saved.id }, {
      namespace: 'custom',
      key: 'how_to_use',
      type: 'multi_line_text_field',
      value: product.howToUse,
    });
    await setMetafield(client, { resource: 'products', id: saved.id }, {
      namespace: 'custom',
      key: 'caution',
      type: 'multi_line_text_field',
      value: product.caution,
    });
    await setSeoMetafields(client, { resource: 'products', id: saved.id }, product);

    result.set(product.handle, saved);
    console.log(`product ${saved.handle}: ${existingProducts.has(product.handle) ? 'updated' : 'created'}`);
  }

  return result;
}

async function seedCollections(client, productMap) {
  const existingCollections = byHandle(await getAll(client, '/custom_collections.json?limit=250', 'custom_collections'));
  const existingCollects = await getAll(client, '/collects.json?limit=250', 'collects');
  const result = new Map();

  for (const collection of collections) {
    let saved = existingCollections.get(collection.handle);
    const collectionImagePath = collectionImageFile(collection);
    const collectionImage = collectionImagePath
      ? await imageAttachment(collectionImagePath, collection.imageAlt || collection.title)
      : null;
    const payload = {
      title: collection.title,
      handle: collection.handle,
      body_html: `<p>${collection.description}</p>`,
      published: true,
      sort_order: 'manual',
    };
    if (!saved?.image && collectionImage) {
      payload.image = collectionImage;
    }
    if (saved) {
      saved = (await client.rest('PUT', `/custom_collections/${saved.id}.json`, {
        custom_collection: { id: saved.id, ...payload },
      })).custom_collection;
    } else {
      saved = (await client.rest('POST', '/custom_collections.json', {
        custom_collection: payload,
      })).custom_collection;
    }
    saved = await updateCollectionImageAlt(client, saved, collection.imageAlt);

    for (const handle of collection.productHandles) {
      const product = productMap.get(handle);
      if (!product) continue;
      const exists = existingCollects.some(
        (collect) => Number(collect.product_id) === Number(product.id) && Number(collect.collection_id) === Number(saved.id),
      );
      if (!exists) {
        await client.rest('POST', '/collects.json', {
          collect: { product_id: product.id, collection_id: saved.id },
        });
      }
    }
    await setSeoMetafields(client, { resource: 'custom_collections', id: saved.id }, collection);
    result.set(collection.handle, saved);
    console.log(`collection ${saved.handle}: ${existingCollections.has(collection.handle) ? 'updated' : 'created'}`);
  }

  return result;
}

async function seedPages(client) {
  const existingPages = byHandle(await getAll(client, '/pages.json?limit=250', 'pages'));
  const result = new Map();

  for (const page of pages) {
    let saved = existingPages.get(page.handle);
    const payload = {
      title: page.title,
      handle: page.handle,
      body_html: page.bodyHtml,
      template_suffix: page.templateSuffix,
      published: true,
    };
    if (saved) {
      saved = (await client.rest('PUT', `/pages/${saved.id}.json`, {
        page: { id: saved.id, ...payload },
      })).page;
    } else {
      saved = (await client.rest('POST', '/pages.json', { page: payload })).page;
    }
    for (const metafield of page.metafields) {
      await setMetafield(client, { resource: 'pages', id: saved.id }, metafield);
    }
    await setSeoMetafields(client, { resource: 'pages', id: saved.id }, page);
    result.set(page.handle, saved);
    console.log(`page ${saved.handle}: ${existingPages.has(page.handle) ? 'updated' : 'created'}`);
  }

  return result;
}

async function seedRedirects(client) {
  const existingRedirects = await getAll(client, '/redirects.json?limit=250', 'redirects');

  for (const redirect of redirects) {
    const existing = existingRedirects.find((item) => item.path === redirect.path);
    if (existing) {
      await client.rest('PUT', `/redirects/${existing.id}.json`, {
        redirect: { id: existing.id, path: redirect.path, target: redirect.target },
      });
      console.log(`redirect ${redirect.path}: updated`);
    } else {
      await client.rest('POST', '/redirects.json', {
        redirect: { path: redirect.path, target: redirect.target },
      });
      console.log(`redirect ${redirect.path}: created`);
    }
  }
}

async function seedBlog(client) {
  const existingBlogs = byHandle(await getAll(client, '/blogs.json?limit=250', 'blogs'));
  let savedBlog = existingBlogs.get(blog.handle);
  if (savedBlog) {
    savedBlog = (await client.rest('PUT', `/blogs/${savedBlog.id}.json`, {
      blog: { id: savedBlog.id, title: blog.title, handle: blog.handle },
    })).blog;
  } else {
    savedBlog = (await client.rest('POST', '/blogs.json', {
      blog: { title: blog.title, handle: blog.handle },
    })).blog;
  }
  await setSeoMetafields(client, { resource: 'blogs', id: savedBlog.id }, blog);

  const existingArticles = byHandle(
    await getAll(client, `/blogs/${savedBlog.id}/articles.json?limit=250`, 'articles'),
  );
  for (const article of blog.articles) {
    const image = existsSync(article.image)
      ? {
          attachment: (await readFile(article.image)).toString('base64'),
          filename: path.basename(article.image),
          alt: article.imageAlt || article.title,
        }
      : undefined;
    const payload = {
      title: article.title,
      handle: article.handle,
      body_html: article.body,
      summary_html: `<p>${article.summary}</p>`,
      tags: article.tags,
      author: '四国ボタニカ',
      published: true,
      ...(image ? { image } : {}),
    };
    const existing = existingArticles.get(article.handle);
    let savedArticle;
    if (existing) {
      savedArticle = (await client.rest('PUT', `/blogs/${savedBlog.id}/articles/${existing.id}.json`, {
        article: { id: existing.id, ...payload },
      })).article;
      console.log(`article ${article.handle}: updated`);
    } else {
      savedArticle = (await client.rest('POST', `/blogs/${savedBlog.id}/articles.json`, { article: payload })).article;
      console.log(`article ${article.handle}: created`);
    }
    await setSeoMetafields(
      client,
      { resource: `blogs/${savedBlog.id}/articles`, id: savedArticle.id },
      article,
    );
  }

  console.log(`blog ${savedBlog.handle}: ${existingBlogs.has(blog.handle) ? 'updated' : 'created'}`);
  return savedBlog;
}

function gid(type, id) {
  return `gid://shopify/${type}/${id}`;
}

async function seedMenus(client, pageMap, blogObject) {
  const data = await client.graphql(`
    query ExistingMenus {
      menus(first: 20) {
        nodes { id handle title }
      }
    }
  `);
  const menuMap = byHandle(data.menus.nodes);

  async function upsertMenu(handle, title, items) {
    const existing = menuMap.get(handle);
    if (existing) {
      const result = await client.graphql(
        `mutation UpdateMenu($id: ID!, $title: String!, $handle: String, $items: [MenuItemUpdateInput!]!) {
          menuUpdate(id: $id, title: $title, handle: $handle, items: $items) {
            menu { id handle title }
            userErrors { field message }
          }
        }`,
        { id: existing.id, title, handle, items },
      );
      const errors = result.menuUpdate.userErrors;
      if (errors?.length) throw new Error(`menuUpdate ${handle}: ${JSON.stringify(errors)}`);
      console.log(`menu ${handle}: updated`);
      return result.menuUpdate.menu;
    }
    const result = await client.graphql(
      `mutation CreateMenu($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
        menuCreate(title: $title, handle: $handle, items: $items) {
          menu { id handle title }
          userErrors { field message }
        }
      }`,
      { title, handle, items },
    );
    const errors = result.menuCreate.userErrors;
    if (errors?.length) throw new Error(`menuCreate ${handle}: ${JSON.stringify(errors)}`);
    console.log(`menu ${handle}: created`);
    return result.menuCreate.menu;
  }

  const mainItems = [
    { title: 'トップ', type: 'HTTP', url: '/', items: [] },
    { title: '商品', type: 'CATALOG', url: '/collections/all', items: [] },
    { title: '当帰コーナー', type: 'PAGE', resourceId: gid('Page', pageMap.get('srs').id), url: '/pages/srs', items: [] },
    { title: '古民家', type: 'PAGE', resourceId: gid('Page', pageMap.get('kominka').id), url: '/pages/kominka', items: [] },
    { title: 'BLOG', type: 'BLOG', resourceId: gid('Blog', blogObject.id), url: '/blogs/stories', items: [] },
    { title: 'ABOUT AS', type: 'PAGE', resourceId: gid('Page', pageMap.get('about-us').id), url: '/pages/about-us', items: [] },
    { title: 'お問い合わせ', type: 'PAGE', resourceId: gid('Page', pageMap.get('contact').id), url: '/pages/contact', items: [] },
  ];

  const footerItems = [
    { title: '商品', type: 'CATALOG', url: '/collections/all', items: [] },
    { title: '当帰コーナー', type: 'PAGE', resourceId: gid('Page', pageMap.get('srs').id), url: '/pages/srs', items: [] },
    { title: '古民家', type: 'PAGE', resourceId: gid('Page', pageMap.get('kominka').id), url: '/pages/kominka', items: [] },
    { title: 'BLOG', type: 'BLOG', resourceId: gid('Blog', blogObject.id), url: '/blogs/stories', items: [] },
    { title: 'ABOUT AS', type: 'PAGE', resourceId: gid('Page', pageMap.get('about-us').id), url: '/pages/about-us', items: [] },
    { title: 'FAQ', type: 'PAGE', resourceId: gid('Page', pageMap.get('faq').id), url: '/pages/faq', items: [] },
    { title: 'お問い合わせ', type: 'PAGE', resourceId: gid('Page', pageMap.get('contact').id), url: '/pages/contact', items: [] },
    { title: '利用規約', type: 'PAGE', resourceId: gid('Page', pageMap.get('terms-of-service').id), url: '/pages/terms-of-service', items: [] },
    { title: '配送ポリシー', type: 'HTTP', url: '/policies/shipping-policy', items: [] },
    { title: '返金ポリシー', type: 'HTTP', url: '/policies/refund-policy', items: [] },
    { title: 'プライバシーポリシー', type: 'HTTP', url: '/policies/privacy-policy', items: [] },
  ];

  await upsertMenu('main-menu', 'メインメニュー', mainItems);
  await upsertMenu('footer', 'フッターメニュー', footerItems);
}

async function publishResources(client, productMap, collectionMap) {
  const data = await client.graphql(`
    query Publications {
      publications(first: 20) { nodes { id name } }
    }
  `);
  const onlineStore = data.publications.nodes.find((publication) => publication.name === 'Online Store');
  if (!onlineStore) {
    console.log('publication Online Store: not found');
    return;
  }

  async function publish(id, label) {
    const result = await client.graphql(
      `mutation Publish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          userErrors { field message }
        }
      }`,
      { id, input: [{ publicationId: onlineStore.id }] },
    );
    const errors = result.publishablePublish.userErrors;
    if (errors?.length) {
      console.log(`${label}: publish skipped ${JSON.stringify(errors)}`);
    } else {
      console.log(`${label}: published`);
    }
  }

  for (const product of productMap.values()) {
    await publish(gid('Product', product.id), `product ${product.handle}`);
  }
  for (const collection of collectionMap.values()) {
    await publish(gid('Collection', collection.id), `collection ${collection.handle}`);
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const skipPublish = args.has('--skip-publish');
  const skipProducts = args.has('--skip-products');
  const env = await loadEnv();
  const required = ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_DEV_CLIENT_ID', 'SHOPIFY_DEV_CLIENT_SECRET'];
  for (const key of required) {
    if (!env[key]) throw new Error(`${key} is missing in ${envPath}`);
  }
  const token = await getAccessToken(env);
  const client = makeClient(env, token);
  try {
    await ensureMetafieldDefinitions(client);
  } catch (error) {
    console.log(`metafield definitions: skipped ${error.message}`);
  }
  const productMap = skipProducts ? new Map() : await seedProducts(client);
  const collectionMap = skipProducts ? new Map() : await seedCollections(client, productMap);
  const pageMap = await seedPages(client);
  await seedRedirects(client);
  const blogObject = await seedBlog(client);
  await seedMenus(client, pageMap, blogObject);
  if (skipPublish) {
    console.log('resource publish: skipped (--skip-publish)');
  } else if (skipProducts) {
    console.log('resource publish: skipped (--skip-products)');
  } else {
    await publishResources(client, productMap, collectionMap);
  }
  console.log('Shopify seed completed.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
