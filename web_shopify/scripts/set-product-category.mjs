import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const envPath = path.join(repoRoot, 'env', 'shopify', '.env.local');
const apiVersionDefault = '2026-04';

const categoryShortcuts = {
  plants: {
    id: 'gid://shopify/TaxonomyCategory/hg-17-3',
    label: 'Home & Garden > Plants > Indoor & Outdoor Plants',
  },
  'garden-plants': {
    id: 'gid://shopify/TaxonomyCategory/hg-17-3-3-1',
    label: 'Home & Garden > Plants > Indoor & Outdoor Plants > Landscaping & Garden Plants > Garden Plants',
  },
  herbs: {
    id: 'gid://shopify/TaxonomyCategory/hg-17-3-2',
    label: 'Home & Garden > Plants > Indoor & Outdoor Plants > Culinary Herbs & Plants',
  },
  bushes: {
    id: 'gid://shopify/TaxonomyCategory/hg-17-3-1-1',
    label: 'Home & Garden > Plants > Indoor & Outdoor Plants > Bushes & Shrubs > Bushes',
  },
  'potted-houseplants': {
    id: 'gid://shopify/TaxonomyCategory/hg-17-3-4',
    label: 'Home & Garden > Plants > Indoor & Outdoor Plants > Potted Houseplants',
  },
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

function parseArgs(argv) {
  const args = {
    handles: [],
    search: '',
    category: '',
    apply: false,
    all: false,
  };

  for (const arg of argv) {
    if (arg === '--apply') {
      args.apply = true;
    } else if (arg === '--all') {
      args.all = true;
    } else if (arg.startsWith('--handles=')) {
      args.handles = arg
        .slice('--handles='.length)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    } else if (arg.startsWith('--search=')) {
      args.search = arg.slice('--search='.length).trim();
    } else if (arg.startsWith('--category=')) {
      args.category = arg.slice('--category='.length).trim();
    }
  }

  return args;
}

async function getAccessToken(env) {
  if (env.SHOPIFY_ADMIN_ACCESS_TOKEN) return env.SHOPIFY_ADMIN_ACCESS_TOKEN;

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

  return { graphql };
}

async function searchTaxonomyCategories(client, search) {
  const data = await client.graphql(
    `query TaxonomyCategories($search: String!) {
      taxonomy {
        categories(first: 20, search: $search) {
          nodes {
            id
            name
            fullName
            isLeaf
          }
        }
      }
    }`,
    { search },
  );
  return data.taxonomy.categories.nodes;
}

async function getProducts(client, handles) {
  const query = handles.length ? handles.map((handle) => `handle:${handle}`).join(' OR ') : '';
  const data = await client.graphql(
    `query Products($query: String) {
      products(first: 100, query: $query, sortKey: TITLE) {
        nodes {
          id
          title
          handle
          productType
          category {
            id
            name
            fullName
          }
        }
      }
    }`,
    { query },
  );
  return data.products.nodes;
}

async function updateProductCategory(client, product, categoryId) {
  const data = await client.graphql(
    `mutation UpdateProductCategory($product: ProductUpdateInput!) {
      productUpdate(product: $product) {
        product {
          id
          title
          handle
          category {
            id
            name
            fullName
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      product: {
        id: product.id,
        category: categoryId,
      },
    },
  );
  const errors = data.productUpdate.userErrors || [];
  if (errors.length) {
    throw new Error(`${product.handle}: ${JSON.stringify(errors)}`);
  }
  return data.productUpdate.product;
}

function printProducts(products) {
  if (!products.length) {
    console.log('No products matched.');
    return;
  }

  for (const product of products) {
    const category = product.category?.fullName || '(uncategorized)';
    console.log(`${product.handle} | ${product.title} | type=${product.productType || '(none)'} | category=${category}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = await loadEnv();
  const required = ['SHOPIFY_STORE_DOMAIN'];
  if (!env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
    required.push('SHOPIFY_DEV_CLIENT_ID', 'SHOPIFY_DEV_CLIENT_SECRET');
  }
  for (const key of required) {
    if (!env[key]) throw new Error(`${key} is missing in ${envPath}`);
  }

  const token = await getAccessToken(env);
  const client = makeClient(env, token);

  if (args.search) {
    const categories = await searchTaxonomyCategories(client, args.search);
    console.log(`Taxonomy search: ${args.search}`);
    for (const category of categories) {
      console.log(`${category.id} | ${category.fullName} | leaf=${category.isLeaf}`);
    }
    console.log('');
  }

  const products = await getProducts(client, args.handles);
  console.log('Products:');
  printProducts(products);

  if (!args.category) return;

  const shortcut = categoryShortcuts[args.category];
  const categoryId = shortcut?.id || args.category;
  console.log('');
  console.log(`Target category: ${shortcut ? `${shortcut.label} (${categoryId})` : categoryId}`);

  if (!args.apply) {
    console.log('Dry run only. Add --apply to update matched products.');
    return;
  }

  if (!args.handles.length && !args.all) {
    throw new Error('Refusing to update every product. Pass --handles=... or --all.');
  }

  for (const product of products) {
    const updated = await updateProductCategory(client, product, categoryId);
    console.log(`updated ${updated.handle}: ${updated.category?.fullName || updated.category?.id}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
