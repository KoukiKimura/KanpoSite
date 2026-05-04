import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const envPath = path.join(repoRoot, 'env', 'shopify', '.env.local');
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
    handle: 'mountain-herb-blend',
    title: '山のハーブブレンド',
    type: 'お茶',
    price: '3200',
    stock: 18,
    summary: '野に立つ草花の香りを静かにまとめた、朝の湯気に似合う定番のお茶です。',
    description:
      '里山で育てた草木の香りを、毎日の一杯として続けやすいよう穏やかに整えました。朝の支度前や畑仕事のあとに、湯気とともに香りを楽しむためのブレンドです。',
    quantity: '30g',
    ingredients: 'カモミール、レモンバーム、ヨモギ、黒文字、柿の葉',
    howToUse: 'ティースプーン1杯を熱湯200mlで3分ほど抽出してください。',
    caution: '高温多湿を避け、開封後は香り移りに注意して保存してください。',
    tags: ['featured', 'お茶'],
    seoTitle: '山のハーブブレンド | 山草のめぐみ',
    seoDescription:
      '里山で育てた草木の香りを穏やかに整えた朝向けのお茶です。毎日の一杯に取り入れやすい定番ブレンドです。',
    imageAlts: {
      'main.webp': '山のハーブブレンドの商品パッケージ',
      'detail-01.webp': '山のハーブブレンドの茶葉',
      'detail-02.webp': '山のハーブブレンドを淹れたお茶',
    },
  },
  {
    handle: 'herbal-powder',
    title: '和漢の養生粉',
    type: '粉薬',
    price: '4200',
    stock: 7,
    summary: '毎日の湯や粥に少量ずつ加えられる、やわらかな香りの和漢粉末です。',
    description:
      '乾かした根や葉を細かく挽き、白湯や粥に混ぜやすい粉末に仕立てました。食事の延長で取り入れられるよう、香りと口当たりを穏やかに整えています。',
    quantity: '45g',
    ingredients: '生姜粉末、陳皮粉末、なつめ粉末、葛粉、ヨモギ粉末',
    howToUse: '小さじ1/2を白湯、粥、スープなどに混ぜてお召し上がりください。',
    caution: '香りが強くなりすぎないよう、少量からお試しください。',
    tags: ['featured', '粉薬'],
    seoTitle: '和漢の養生粉 | 山草のめぐみ',
    seoDescription:
      '白湯や粥に少量ずつ加えられる和漢粉末です。生姜や陳皮などの香りを日々の食事に添えやすく整えました。',
    imageAlts: {
      'main.webp': '和漢の養生粉の商品パッケージ',
      'detail-01.webp': '和漢の養生粉の粉末',
      'detail-02.webp': '和漢の養生粉を食事に添えるイメージ',
    },
  },
  {
    handle: 'seasonal-care-set',
    title: '季節の養生セット',
    type: '養生セット',
    price: '8600',
    stock: 104,
    summary: 'お茶、粉末、手当ての小物を一箱にまとめた、四季の贈りものです。',
    description:
      '季節ごとの整え方を一箱にまとめた養生セットです。朝と夜で使い分けられるお茶、日々の食事に添える粉末、香りの小物を組み合わせています。',
    quantity: '季節により変動',
    ingredients: '朝の茶葉、夜の茶葉、和漢粉、香り小物',
    howToUse: '朝、夜、休憩時に分けて、それぞれの説明に沿って使用してください。',
    caution: '内容は季節により一部変更されます。商品同封の案内をご確認ください。',
    tags: ['featured', '養生セット'],
    seoTitle: '季節の養生セット | 山草のめぐみ',
    seoDescription:
      '季節ごとの整え方を一箱にまとめた養生セットです。お茶、和漢粉、香りの小物を贈りものにも使いやすく組み合わせました。',
    imageAlts: {
      'main.webp': '季節の養生セットの商品パッケージ',
      'detail-01.webp': '季節の養生セットの内容物',
      'detail-02.webp': '季節の養生セットを広げたイメージ',
    },
  },
  {
    handle: 'botanical-tablets',
    title: '草木の養生錠',
    type: '錠剤',
    price: '3800',
    stock: 4,
    summary: '外出先でも取り入れやすいよう、小粒に仕立てた養生用の錠剤です。',
    description:
      '草木の粉末を小粒にまとめ、外出先や忙しい日でも続けやすい形にしました。お茶を淹れる時間が取れない日にも使いやすい養生錠です。',
    quantity: '90粒',
    ingredients: '桑の葉粉末、生姜粉末、山椒粉末、陳皮粉末、霊芝粉末',
    howToUse: '1日3から6粒を目安に、水または白湯でお召し上がりください。',
    caution: '開封後は早めに使用し、乾燥した場所で保管してください。',
    tags: ['featured', '錠剤'],
    seoTitle: '草木の養生錠 | 山草のめぐみ',
    seoDescription:
      '外出先でも取り入れやすい小粒の養生錠です。桑の葉や生姜などの草木粉末を続けやすい形にしました。',
    imageAlts: {
      'main.webp': '草木の養生錠の商品パッケージ',
      'detail-01.webp': '草木の養生錠の粒',
      'detail-02.webp': '草木の養生錠を手に取るイメージ',
    },
  },
  {
    handle: 'night-soil-tea',
    title: '夜のくつろぎ茶',
    type: 'お茶',
    price: '2900',
    stock: 0,
    summary: '灯りを落としたあとの時間に似合う、静かな香りの夜のお茶です。',
    description:
      '一日の終わりに湯気を眺めながら飲める、香りの穏やかな夜のお茶です。ほうじ茶を土台に、花と木の香りをやわらかく重ねています。',
    quantity: '25g',
    ingredients: 'ほうじ茶、ラベンダー、カモミール、桂皮、レモングラス',
    howToUse: 'ティースプーン1杯を熱湯180mlで2から3分ほど抽出してください。',
    caution: '就寝前でも重くなりすぎないよう、薄めの抽出からお試しください。',
    tags: ['featured', 'お茶'],
    seoTitle: '夜のくつろぎ茶 | 山草のめぐみ',
    seoDescription:
      '一日の終わりに似合う、香りの穏やかな夜のお茶です。ほうじ茶を土台に花と木の香りを重ねました。',
    imageAlts: {
      'main.webp': '夜のくつろぎ茶の商品パッケージ',
      'detail-01.webp': '夜のくつろぎ茶の茶葉',
      'detail-02.webp': '夜のくつろぎ茶を淹れたカップ',
    },
  },
];

const collections = [
  {
    handle: 'featured-products',
    title: '注目商品',
    description: 'トップページに表示する商品です。',
    productHandles: products.map((product) => product.handle),
    imageProductHandle: 'mountain-herb-blend',
    imageAlt: '山草のめぐみの注目商品',
    seoTitle: '注目商品 | 山草のめぐみ',
    seoDescription: '山草のめぐみで初期展開するお茶、粉薬、錠剤、養生セットをまとめた注目商品の一覧です。',
  },
  {
    handle: 'tea',
    title: 'お茶',
    description: '湯気と香りを楽しむ、日々の養生茶です。',
    productHandles: ['mountain-herb-blend', 'night-soil-tea'],
    imageProductHandle: 'mountain-herb-blend',
    imageAlt: '山草のめぐみのお茶商品',
    seoTitle: 'お茶 | 山草のめぐみ',
    seoDescription: '里山の草木や香りを楽しむ、山草のめぐみのお茶一覧です。朝と夜の時間に寄り添う商品を掲載します。',
  },
  {
    handle: 'powder',
    title: '粉薬',
    description: '白湯や粥に少量ずつ加えられる和漢粉末です。',
    productHandles: ['herbal-powder'],
    imageProductHandle: 'herbal-powder',
    imageAlt: '山草のめぐみの和漢粉末',
    seoTitle: '粉薬 | 山草のめぐみ',
    seoDescription: '白湯や粥に少量ずつ加えやすい、山草のめぐみの和漢粉末商品を掲載します。',
  },
  {
    handle: 'tablets',
    title: '錠剤',
    description: '外出先でも取り入れやすい小粒の養生品です。',
    productHandles: ['botanical-tablets'],
    imageProductHandle: 'botanical-tablets',
    imageAlt: '山草のめぐみの錠剤商品',
    seoTitle: '錠剤 | 山草のめぐみ',
    seoDescription: '外出先でも取り入れやすい、小粒に仕立てた山草のめぐみの錠剤商品を掲載します。',
  },
  {
    handle: 'care-set',
    title: '養生セット',
    description: '季節の整え方を一箱にまとめたセットです。',
    productHandles: ['seasonal-care-set'],
    imageProductHandle: 'seasonal-care-set',
    imageAlt: '山草のめぐみの養生セット',
    seoTitle: '養生セット | 山草のめぐみ',
    seoDescription: '季節ごとのお茶や和漢粉を一箱にまとめた、山草のめぐみの養生セットを掲載します。',
  },
];

const pages = [
  {
    handle: 'kominka',
    title: '古民家',
    templateSuffix: 'kominka',
    bodyHtml: '<p>畑と山の景色に近い古民家で、湯気のある朝と静かな夜を過ごす滞在を案内します。</p>',
    seoTitle: '古民家 | 山草のめぐみ',
    seoDescription:
      '畑と山の景色に近い古民家で、湯気のある朝と静かな夜を過ごす滞在案内です。予約導線とアクセス情報を掲載します。',
    metafields: [
      {
        namespace: 'custom',
        key: 'access_text',
        type: 'multi_line_text_field',
        value:
          '所在地、駐車場、最寄り駅からの案内は予約確定時に個別にご案内します。古い建物のため、季節により寒暖差があります。',
      },
    ],
  },
  {
    handle: 'contact',
    title: 'お問い合わせ',
    templateSuffix: 'contact',
    bodyHtml: '<p>商品、古民家、取材や訪問についてのお問い合わせはこちらからお送りください。</p>',
    seoTitle: 'お問い合わせ | 山草のめぐみ',
    seoDescription: '山草のめぐみの商品、古民家、取材や訪問に関するお問い合わせフォームです。',
    metafields: [],
  },
  {
    handle: 'faq',
    title: 'よくある質問',
    templateSuffix: 'faq',
    bodyHtml: '<p>商品や古民家滞在について、事前によくいただく質問をまとめます。</p>',
    seoTitle: 'よくある質問 | 山草のめぐみ',
    seoDescription: '山草のめぐみの商品や古民家滞在について、事前によくいただく質問をまとめたページです。',
    metafields: [],
  },
];

const blog = {
  handle: 'stories',
  title: 'BLOG',
  seoTitle: 'BLOG | 山草のめぐみ',
  seoDescription: '山草のめぐみのBLOGです。里山の草木、商品づくり、古民家での時間を紹介します。',
  articles: [
    {
      handle: 'satoyama-herbs',
      title: '里山で草木を育てること',
      tags: 'story',
      summary: '畑、季節、素材づくりの背景を紹介します。',
      seoTitle: '里山で草木を育てること | 山草のめぐみBLOG',
      seoDescription: '山草のめぐみが里山で草木を育て、季節を見ながら素材を整える背景を紹介します。',
      imageAlt: '里山の畑を歩く様子',
      body:
        '<p>山草のめぐみでは、古民家の庭先から続く畑で季節の草木を育てています。仕入れだけに頼らず、土と季節の変化を見ながら素材を整えることを大切にしています。</p>',
      image: path.join(repoRoot, 'web_mock', 'public', 'images', 'home', 'field-walk.webp'),
    },
    {
      handle: 'morning-tea-routine',
      title: '朝のお茶を整える',
      tags: 'product',
      summary: '山のハーブブレンドを朝の習慣にするための案内です。',
      seoTitle: '朝のお茶を整える | 山草のめぐみBLOG',
      seoDescription: '山のハーブブレンドを朝の習慣にするための淹れ方と、湯気を眺める時間の整え方を紹介します。',
      imageAlt: '朝のお茶を淹れる時間',
      body:
        '<p>朝の支度前に、湯を沸かし、茶葉を静かに開かせる時間を作ります。香りを強く出しすぎず、日々続けられる薄さから始めるのがおすすめです。</p>',
      image: path.join(repoRoot, 'web_mock', 'public', 'images', 'home', 'morning-tea.webp'),
    },
    {
      handle: 'kominka-morning',
      title: '古民家で過ごす朝',
      tags: 'kominka',
      summary: '古民家滞在の朝の雰囲気を紹介します。',
      seoTitle: '古民家で過ごす朝 | 山草のめぐみBLOG',
      seoDescription: '畑の空気と木の香りから始まる、山草のめぐみの古民家滞在の朝を紹介します。',
      imageAlt: '古民家近くの朝の畑',
      body:
        '<p>古民家の朝は、畑の空気と木の香りから始まります。派手に整えすぎず、この家に残っていた静けさをそのまま受け取れる滞在を目指しています。</p>',
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

function productImageFiles(handle) {
  return ['main.webp', 'detail-01.webp', 'detail-02.webp']
    .map((file) => path.join(repoRoot, 'web_mock', 'public', 'images', 'products', handle, file))
    .filter((file) => existsSync(file));
}

function productImageAlt(product, file) {
  const filename = path.basename(file);
  return product.imageAlts?.[filename] || `${product.title}の商品画像`;
}

function collectionImageFile(collection) {
  if (!collection.imageProductHandle) return null;
  const file = path.join(
    repoRoot,
    'web_mock',
    'public',
    'images',
    'products',
    collection.imageProductHandle,
    'main.webp',
  );
  return existsSync(file) ? file : null;
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
      productImageFiles(product.handle).map((file) => imageAttachment(file, productImageAlt(product, file))),
    );
    let saved = existingProducts.get(product.handle);
    const payload = {
      title: product.title,
      body_html: productBodyHtml(product),
      vendor: '山草のめぐみ',
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
      author: '山草のめぐみ',
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
    { title: '古民家', type: 'PAGE', resourceId: gid('Page', pageMap.get('kominka').id), url: '/pages/kominka', items: [] },
    { title: 'BLOG', type: 'BLOG', resourceId: gid('Blog', blogObject.id), url: '/blogs/stories', items: [] },
    { title: 'お問い合わせ', type: 'PAGE', resourceId: gid('Page', pageMap.get('contact').id), url: '/pages/contact', items: [] },
  ];

  const footerItems = [
    { title: '商品', type: 'CATALOG', url: '/collections/all', items: [] },
    { title: '古民家', type: 'PAGE', resourceId: gid('Page', pageMap.get('kominka').id), url: '/pages/kominka', items: [] },
    { title: 'BLOG', type: 'BLOG', resourceId: gid('Blog', blogObject.id), url: '/blogs/stories', items: [] },
    { title: 'FAQ', type: 'PAGE', resourceId: gid('Page', pageMap.get('faq').id), url: '/pages/faq', items: [] },
    { title: 'お問い合わせ', type: 'PAGE', resourceId: gid('Page', pageMap.get('contact').id), url: '/pages/contact', items: [] },
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
  const productMap = await seedProducts(client);
  const collectionMap = await seedCollections(client, productMap);
  const pageMap = await seedPages(client);
  const blogObject = await seedBlog(client);
  await seedMenus(client, pageMap, blogObject);
  await publishResources(client, productMap, collectionMap);
  console.log('Shopify seed completed.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
