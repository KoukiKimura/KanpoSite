import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const envArg = process.argv.find((a) => a.startsWith('--env='));
const envFile = envArg === '--env=production' ? '.env' : '.env.local';
const envPath = path.join(repoRoot, 'env', 'shopify', envFile);
const snippetDir = path.join(repoRoot, 'web_shopify', 'snippets');
const apiVersionDefault = '2026-04';

const policies = [
  {
    key: 'refund',
    type: 'REFUND_POLICY',
    label: '返金ポリシー',
    snippet: 'policy-content-refund.liquid',
  },
  {
    key: 'shipping',
    type: 'SHIPPING_POLICY',
    label: '配送ポリシー',
    snippet: 'policy-content-shipping.liquid',
  },
  {
    key: 'privacy',
    type: 'PRIVACY_POLICY',
    label: 'プライバシーポリシー',
    snippet: 'policy-content-privacy.liquid',
  },
  {
    key: 'terms',
    type: 'TERMS_OF_SERVICE',
    label: '利用規約',
    snippet: 'policy-content-terms.liquid',
  },
  {
    key: 'legal',
    type: 'LEGAL_NOTICE',
    label: '特定商取引法に基づく表記',
    snippet: 'policy-content-legal-notice.liquid',
    draftGuard: true,
  },
];

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
    apply: false,
    includeDraftLegalNotice: false,
    only: new Set(),
  };

  for (const arg of argv) {
    if (arg === '--apply') {
      args.apply = true;
    } else if (arg === '--include-draft-legal-notice') {
      args.includeDraftLegalNotice = true;
    } else if (arg.startsWith('--only=')) {
      for (const item of arg.slice('--only='.length).split(',')) {
        if (item.trim()) args.only.add(item.trim());
      }
    }
  }

  return args;
}

function requireEnv(env, keys) {
  for (const key of keys) {
    if (!env[key]) throw new Error(`${key} is missing in ${envPath}`);
  }
}

function tokenHasScope(tokenInfo, requiredScope) {
  if (!tokenInfo.scope || tokenInfo.scope === '(stored token)') return true;
  return tokenInfo.scope.split(',').map((scope) => scope.trim()).includes(requiredScope);
}

async function getAdminAccessToken(env) {
  if (env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
    return {
      token: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      source: 'SHOPIFY_ADMIN_ACCESS_TOKEN',
      scope: '(stored token)',
      expiresIn: null,
    };
  }

  requireEnv(env, ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_DEV_CLIENT_ID', 'SHOPIFY_DEV_CLIENT_SECRET']);

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

  const text = await response.text();
  let json = {};
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      json = { raw: text };
    }
  }

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status} ${JSON.stringify(json)}`);
  }

  return {
    token: json.access_token,
    source: 'client_credentials',
    scope: json.scope || '',
    expiresIn: json.expires_in || null,
  };
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

async function renderPolicyBody(env, policy) {
  const filePath = path.join(snippetDir, policy.snippet);
  let body = await readFile(filePath, 'utf8');
  const publicUrl = env.SHOPIFY_PUBLIC_STORE_URL || `https://${env.SHOPIFY_STORE_DOMAIN}`;
  body = body.replaceAll('{{ shop.url }}', publicUrl);
  body = body.trim();

  if (policy.draftGuard && body.includes('差し替え必須')) {
    return { body, hasDraftText: true };
  }

  return { body, hasDraftText: false };
}

async function updatePolicy(client, policy, body) {
  const data = await client.graphql(
    `mutation UpdateShopPolicy($shopPolicy: ShopPolicyInput!) {
      shopPolicyUpdate(shopPolicy: $shopPolicy) {
        shopPolicy {
          type
          title
          url
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      shopPolicy: {
        type: policy.type,
        body,
      },
    },
  );

  const errors = data.shopPolicyUpdate.userErrors || [];
  if (errors.length) {
    throw new Error(`${policy.label}: ${JSON.stringify(errors)}`);
  }

  return data.shopPolicyUpdate.shopPolicy;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const env = await loadEnv();
  requireEnv(env, ['SHOPIFY_STORE_DOMAIN']);

  const tokenInfo = await getAdminAccessToken(env);
  const client = makeClient(env, tokenInfo.token);

  console.log(`Admin token source: ${tokenInfo.source}`);
  if (tokenInfo.expiresIn) console.log(`Token expires in: ${tokenInfo.expiresIn} seconds`);
  if (tokenInfo.scope) console.log(`Token scopes: ${tokenInfo.scope}`);
  console.log(args.apply ? 'Mode: apply' : 'Mode: dry-run. Add --apply to update policies.');

  if (args.apply && !tokenHasScope(tokenInfo, 'write_legal_policies')) {
    throw new Error('Missing Admin API scope: write_legal_policies. Add it in the Dev Dashboard app, reinstall the app, then run again.');
  }

  const targetPolicies = policies.filter((policy) => !args.only.size || args.only.has(policy.key));
  if (!targetPolicies.length) throw new Error('No policies matched. Use --only=refund,shipping,privacy,terms,legal');

  for (const policy of targetPolicies) {
    const { body, hasDraftText } = await renderPolicyBody(env, policy);

    if (hasDraftText && !args.includeDraftLegalNotice) {
      console.log(`${policy.label}: skipped draft legal notice. Edit the snippet or pass --include-draft-legal-notice.`);
      continue;
    }

    if (!args.apply) {
      console.log(`${policy.label}: ready (${body.length} chars)`);
      continue;
    }

    const updated = await updatePolicy(client, policy, body);
    console.log(`${policy.label}: updated ${updated.url || updated.type}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
