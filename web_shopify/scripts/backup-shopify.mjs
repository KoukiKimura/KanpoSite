/**
 * backup-shopify.mjs
 *
 * Shopify 管理画面から変更可能な全情報を Admin API 経由で取得し、
 * web_shopify/backup/ に保存します。
 *
 * 改修前に必ず実行し、git commit してからテーマ修正に着手してください。
 *
 * 使い方:
 *   node scripts/backup-shopify.mjs             # 検証環境 (.env.local)
 *   node scripts/backup-shopify.mjs --env=production  # 本番環境 (.env)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const envArg = process.argv.find((a) => a.startsWith('--env='));
const envFile = envArg === '--env=production' ? '.env' : '.env.local';
const envPath = path.join(repoRoot, 'env', 'shopify', envFile);
const apiVersionDefault = '2026-04';
const backupDir = path.join(__dirname, '..', 'backup');

// ─── ユーティリティ ───────────────────────────────────────────────

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
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`${method} ${endpoint} failed: ${response.status} ${text}`);
    }
    return response.json();
  }

  /** ページネーション付き全件取得 */
  async function fetchAll(endpoint, resourceKey) {
    const results = [];
    let url = `${adminBase}${endpoint}`;
    while (url) {
      const response = await fetch(url, {
        headers: { 'X-Shopify-Access-Token': token },
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`GET ${url} failed: ${response.status} ${text}`);
      }
      const json = await response.json();
      results.push(...(json[resourceKey] ?? []));

      // Link ヘッダーから次ページURLを取得
      const link = response.headers.get('link') ?? '';
      const nextMatch = link.match(/<([^>]+)>;\s*rel="next"/);
      url = nextMatch ? nextMatch[1] : null;
    }
    return results;
  }

  return { rest, fetchAll };
}

// ─── CSV 生成 ────────────────────────────────────────────────────

/** 値を CSV セル用にエスケープ */
function csvCell(value) {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function csvRow(values) {
  return values.map(csvCell).join(',');
}

/**
 * Shopify 標準エクスポートと互換性のある商品 CSV を生成します。
 * 管理画面の「商品管理 → エクスポート」と同等のフォーマットです。
 */
function buildProductsCsv(products) {
  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Product Category',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Option2 Name',
    'Option2 Value',
    'Variant SKU',
    'Variant Grams',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Variant Barcode',
    'Image Src',
    'Image Position',
    'Image Alt Text',
    'SEO Title',
    'SEO Description',
    'Status',
  ];

  const rows = [headers.join(',')];

  for (const product of products) {
    const variants = product.variants ?? [];
    const images = product.images ?? [];
    const options = product.options ?? [];
    const isFirstProduct = true;

    variants.forEach((variant, vIdx) => {
      const image = images.find((img) => img.id === variant.image_id) ?? images[vIdx] ?? images[0] ?? null;
      const isFirstVariant = vIdx === 0;

      rows.push(
        csvRow([
          isFirstVariant ? product.handle : '',
          isFirstVariant ? product.title : '',
          isFirstVariant ? product.body_html : '',
          isFirstVariant ? product.vendor : '',
          isFirstVariant ? (product.product_type ?? '') : '',
          isFirstVariant ? (product.product_type ?? '') : '',
          isFirstVariant ? (product.tags ?? '') : '',
          isFirstVariant ? (product.status === 'active' ? 'true' : 'false') : '',
          isFirstVariant ? (options[0]?.name ?? '') : '',
          variant.option1 ?? '',
          isFirstVariant ? (options[1]?.name ?? '') : '',
          variant.option2 ?? '',
          variant.sku ?? '',
          variant.grams ?? 0,
          variant.inventory_management ?? 'shopify',
          variant.inventory_quantity ?? 0,
          variant.inventory_policy ?? 'deny',
          variant.fulfillment_service ?? 'manual',
          variant.price ?? '0',
          variant.compare_at_price ?? '',
          variant.requires_shipping ? 'true' : 'false',
          variant.taxable ? 'true' : 'false',
          variant.barcode ?? '',
          image?.src ?? '',
          image?.position ?? '',
          image?.alt ?? '',
          isFirstVariant ? (product.seo_title ?? product.title ?? '') : '',
          isFirstVariant ? (product.seo_description ?? '') : '',
          isFirstVariant ? (product.status ?? 'active') : '',
        ])
      );
    });

    // バリアントに紐づかない追加画像の行を追加
    if (images.length > 1) {
      images.slice(1).forEach((img) => {
        rows.push(
          csvRow([
            product.handle,
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            img.src,
            img.position,
            img.alt ?? '',
            '', '', '',
          ])
        );
      });
    }
  }

  return rows.join('\n');
}

// ─── ファイル保存 ─────────────────────────────────────────────────

async function saveJson(filename, data) {
  const filepath = path.join(backupDir, filename);
  await writeFile(filepath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  ✓ ${filename} (${Array.isArray(data) ? data.length + '件' : 'saved'})`);
}

async function saveCsv(filename, content) {
  const filepath = path.join(backupDir, filename);
  await writeFile(filepath, content, 'utf8');
  const lineCount = content.split('\n').length - 1; // ヘッダー除く
  console.log(`  ✓ ${filename} (${lineCount}行)`);
}

// ─── 各データ取得関数 ─────────────────────────────────────────────

async function backupProducts(client) {
  console.log('\n[商品 / Products]');
  // 商品一覧（バリアント・画像・オプション含む）
  const products = await client.fetchAll('/products.json?limit=250&fields=id,handle,title,body_html,vendor,product_type,tags,status,published_at,options,variants,images,seo_title,seo_description', 'products');

  // 各商品のメタフィールドを取得
  const productsWithMeta = await Promise.all(
    products.map(async (product) => {
      const metaRes = await client.rest('GET', `/products/${product.id}/metafields.json?limit=250`);
      return { ...product, metafields: metaRes.metafields ?? [] };
    })
  );

  await saveJson('products.json', productsWithMeta);
  await saveCsv('products.csv', buildProductsCsv(productsWithMeta));
}

async function backupCollections(client) {
  console.log('\n[コレクション / Collections]');
  const customs = await client.fetchAll('/custom_collections.json?limit=250', 'custom_collections');
  const smarts = await client.fetchAll('/smart_collections.json?limit=250', 'smart_collections');

  // 各コレクションにメタフィールドを付加
  const addMeta = async (col, type) => {
    const metaRes = await client.rest('GET', `/${type}/${col.id}/metafields.json?limit=250`);
    return { ...col, _type: type, metafields: metaRes.metafields ?? [] };
  };

  const allCollections = [
    ...(await Promise.all(customs.map((c) => addMeta(c, 'custom_collections')))),
    ...(await Promise.all(smarts.map((c) => addMeta(c, 'smart_collections')))),
  ];

  await saveJson('collections.json', allCollections);
  console.log(`  ✓ collections.json (カスタム: ${customs.length}件, スマート: ${smarts.length}件)`);
}

async function backupPages(client) {
  console.log('\n[固定ページ / Pages]');
  const pages = await client.fetchAll('/pages.json?limit=250', 'pages');

  const pagesWithMeta = await Promise.all(
    pages.map(async (page) => {
      const metaRes = await client.rest('GET', `/pages/${page.id}/metafields.json?limit=250`);
      return { ...page, metafields: metaRes.metafields ?? [] };
    })
  );

  await saveJson('pages.json', pagesWithMeta);
}

async function backupBlogs(client) {
  console.log('\n[ブログ / Blogs & Articles]');
  const blogs = await client.fetchAll('/blogs.json?limit=250', 'blogs');

  const blogsWithArticles = await Promise.all(
    blogs.map(async (blog) => {
      const articles = await client.fetchAll(
        `/blogs/${blog.id}/articles.json?limit=250`,
        'articles'
      );
      const articlesWithMeta = await Promise.all(
        articles.map(async (article) => {
          const metaRes = await client.rest(
            'GET',
            `/blogs/${blog.id}/articles/${article.id}/metafields.json?limit=250`
          );
          return { ...article, metafields: metaRes.metafields ?? [] };
        })
      );
      return { ...blog, articles: articlesWithMeta };
    })
  );

  await saveJson('blogs.json', blogsWithArticles);
  const articleCount = blogsWithArticles.reduce((n, b) => n + b.articles.length, 0);
  console.log(`  ✓ blogs.json (ブログ: ${blogs.length}件, 記事: ${articleCount}件)`);
}

async function backupMenus(client) {
  console.log('\n[ナビゲーション / Menus]');
  const res = await client.rest('GET', '/menus.json');
  await saveJson('menus.json', res.menus ?? []);
}

async function backupPolicies(client) {
  console.log('\n[ポリシー / Policies]');
  const res = await client.rest('GET', '/policies.json');
  await saveJson('policies.json', res.policies ?? []);
}

async function backupRedirects(client) {
  console.log('\n[リダイレクト / Redirects]');
  const redirects = await client.fetchAll('/redirects.json?limit=250', 'redirects');
  await saveJson('redirects.json', redirects);
}

async function backupMetafieldDefinitions(client) {
  console.log('\n[メタフィールド定義 / Metafield Definitions]');
  // GraphQL Admin API で取得
  const apiVersion = apiVersionDefault;
  const query = `
    query {
      metafieldDefinitions(ownerType: PRODUCT, first: 100) {
        nodes { id namespace key name type { name } description }
      }
      pageDefinitions: metafieldDefinitions(ownerType: PAGE, first: 100) {
        nodes { id namespace key name type { name } description }
      }
      articleDefinitions: metafieldDefinitions(ownerType: ARTICLE, first: 100) {
        nodes { id namespace key name type { name } description }
      }
      collectionDefinitions: metafieldDefinitions(ownerType: COLLECTION, first: 100) {
        nodes { id namespace key name type { name } description }
      }
    }
  `;

  // Admin GraphQL エンドポイントは REST と認証が同じ
  const env = await loadEnv();
  const token = client._token;
  const graphqlRes = await fetch(
    `https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    }
  );

  if (graphqlRes.ok) {
    const data = await graphqlRes.json();
    const definitions = {
      product: data.data?.metafieldDefinitions?.nodes ?? [],
      page: data.data?.pageDefinitions?.nodes ?? [],
      article: data.data?.articleDefinitions?.nodes ?? [],
      collection: data.data?.collectionDefinitions?.nodes ?? [],
    };
    await saveJson('metafield-definitions.json', definitions);
  } else {
    console.warn('  ⚠ メタフィールド定義の取得に失敗しました（GraphQL権限が必要）');
  }
}

async function backupShop(client) {
  console.log('\n[ショップ基本情報 / Shop]');
  const res = await client.rest('GET', '/shop.json');
  await saveJson('shop.json', res.shop ?? res);
}

async function backupShippingZones(client) {
  console.log('\n[配送ゾーン / Shipping Zones]');
  const res = await client.rest('GET', '/shipping_zones.json');
  await saveJson('shipping-zones.json', res.shipping_zones ?? []);
}

async function backupLocations(client) {
  console.log('\n[ロケーション / Locations]');
  const locations = await client.fetchAll('/locations.json?limit=250', 'locations');
  await saveJson('locations.json', locations);
}

async function backupScriptTags(client) {
  console.log('\n[Script Tags]');
  const tags = await client.fetchAll('/script_tags.json?limit=250', 'script_tags');
  await saveJson('script-tags.json', tags);
}

async function backupNotifications(client) {
  console.log('\n[通知メールテンプレート / Notifications]');
  const res = await client.rest('GET', '/notifications.json');
  await saveJson('notifications.json', res.notifications ?? []);
}

async function backupDiscounts(client) {
  console.log('\n[割引・価格ルール / Price Rules & Discount Codes]');
  const priceRules = await client.fetchAll('/price_rules.json?limit=250', 'price_rules');

  // 各 price rule の discount codes を取得
  const withCodes = await Promise.all(
    priceRules.map(async (rule) => {
      const codesRes = await client.rest('GET', `/price_rules/${rule.id}/discount_codes.json?limit=250`);
      return { ...rule, discount_codes: codesRes.discount_codes ?? [] };
    })
  );

  await saveJson('discounts.json', withCodes);
  const codeCount = withCodes.reduce((n, r) => n + r.discount_codes.length, 0);
  console.log(`  ✓ discounts.json (価格ルール: ${priceRules.length}件, コード: ${codeCount}件)`);
}

async function backupThemes(client) {
  console.log('\n[テーマ一覧 / Themes]');
  const res = await client.rest('GET', '/themes.json');
  await saveJson('themes.json', res.themes ?? []);
}

async function backupMarkets(client) {
  console.log('\n[マーケット / Markets]');
  const res = await client.rest('GET', '/markets.json');
  await saveJson('markets.json', res.markets ?? []);
}

/**
 * GraphQL ヘルパー（backupMetafieldDefinitions と同じ認証方式）
 */
async function adminGraphQL(env, token, query, variables) {
  const apiVersion = env.SHOPIFY_API_VERSION || apiVersionDefault;
  const res = await fetch(
    `https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${apiVersion}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GraphQL request failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function backupMetaobjects(client) {
  console.log('\n[メタオブジェクト / Metaobjects]');
  const env = await loadEnv();
  const token = client._token;

  // まず全定義を取得
  const defsQuery = `
    query {
      metaobjectDefinitions(first: 100) {
        nodes {
          id type name
          fieldDefinitions { key name type { name } }
        }
      }
    }
  `;
  const defsData = await adminGraphQL(env, token, defsQuery);
  const definitions = defsData.data?.metaobjectDefinitions?.nodes ?? [];
  await saveJson('metaobject-definitions.json', definitions);
  console.log(`  ✓ metaobject-definitions.json (${definitions.length}件)`);

  // 各定義のインスタンスを取得
  const instancesQuery = `
    query MetaobjectsByType($type: String!, $after: String) {
      metaobjects(type: $type, first: 250, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id handle type
          fields { key value }
          updatedAt
        }
      }
    }
  `;

  const allInstances = {};
  let totalCount = 0;

  for (const def of definitions) {
    const instances = [];
    let after = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const data = await adminGraphQL(env, token, instancesQuery, { type: def.type, after });
      const page = data.data?.metaobjects;
      instances.push(...(page?.nodes ?? []));
      hasNextPage = page?.pageInfo?.hasNextPage ?? false;
      after = page?.pageInfo?.endCursor ?? null;
    }

    allInstances[def.type] = instances;
    totalCount += instances.length;
  }

  await saveJson('metaobject-instances.json', allInstances);
  console.log(`  ✓ metaobject-instances.json (タイプ: ${definitions.length}種, データ: ${totalCount}件)`);
}

async function backupFiles(client) {
  console.log('\n[アップロードファイル / Files]');
  const env = await loadEnv();
  const token = client._token;

  const query = `
    query Files($after: String) {
      files(first: 250, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          ... on MediaImage {
            id alt createdAt updatedAt
            image { url width height }
          }
          ... on GenericFile {
            id alt url createdAt updatedAt
          }
          ... on Video {
            id alt createdAt updatedAt
            sources { url mimeType }
          }
        }
      }
    }
  `;

  const files = [];
  let after = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await adminGraphQL(env, token, query, { after });
    const page = data.data?.files;
    files.push(...(page?.nodes ?? []));
    hasNextPage = page?.pageInfo?.hasNextPage ?? false;
    after = page?.pageInfo?.endCursor ?? null;
  }

  await saveJson('files.json', files);
  console.log(`  ✓ files.json (${files.length}件)`);
}

async function writeManifest(env) {
  const manifest = {
    fetchedAt: new Date().toISOString(),
    store: env.SHOPIFY_STORE_DOMAIN,
    environment: envArg === '--env=production' ? 'production' : 'local',
    files: [
      'shop.json',
      'products.json',
      'products.csv',
      'collections.json',
      'pages.json',
      'blogs.json',
      'menus.json',
      'policies.json',
      'redirects.json',
      'metafield-definitions.json',
      'metaobject-definitions.json',
      'metaobject-instances.json',
      'files.json',
      'shipping-zones.json',
      'locations.json',
      'markets.json',
      'script-tags.json',
      'notifications.json',
      'discounts.json',
      'themes.json',
    ],
  };
  await saveJson('manifest.json', manifest);
}

// ─── メイン ──────────────────────────────────────────────────────

async function main() {
  console.log('=== Shopify バックアップ開始 ===');
  console.log(`環境ファイル: ${envFile}`);

  const env = await loadEnv();
  const token = await getAccessToken(env);
  const client = makeClient(env, token);
  client._token = token; // GraphQL 用に保持

  await mkdir(backupDir, { recursive: true });

  const skipped = [];

  async function run(label, fn) {
    try {
      await fn();
    } catch (err) {
      console.warn(`  ⚠ ${label} をスキップ: ${err.message.split('\n')[0]}`);
      skipped.push(label);
    }
  }

  await run('shop',                    () => backupShop(client));
  await run('products',                () => backupProducts(client));
  await run('collections',             () => backupCollections(client));
  await run('pages',                   () => backupPages(client));
  await run('blogs',                   () => backupBlogs(client));
  await run('menus',                   () => backupMenus(client));
  await run('policies',                () => backupPolicies(client));
  await run('redirects',               () => backupRedirects(client));
  await run('metafield-definitions',   () => backupMetafieldDefinitions(client));
  await run('shipping-zones',          () => backupShippingZones(client));
  await run('locations',               () => backupLocations(client));
  await run('script-tags',             () => backupScriptTags(client));
  await run('notifications',           () => backupNotifications(client));
  await run('discounts',               () => backupDiscounts(client));
  await run('themes',                  () => backupThemes(client));
  await run('markets',                 () => backupMarkets(client));
  await run('metaobjects',             () => backupMetaobjects(client));
  await run('files',                   () => backupFiles(client));
  await writeManifest(env);

  console.log('\n=== バックアップ完了 ===');
  console.log(`保存先: web_shopify/backup/`);
  if (skipped.length > 0) {
    console.log(`\n⚠ 権限不足でスキップされた項目 (API スコープを確認してください):`);
    skipped.forEach((s) => console.log(`  - ${s}`));
  }
  console.log('\n次のステップ: git add web_shopify/backup/ && git commit -m "backup: 改修前スナップショット"');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
