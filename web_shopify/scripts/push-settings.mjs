/**
 * settings_data.json のみを Shopify テーマに直接アップロードするスクリプト
 * Usage: node scripts/push-settings.mjs [--env=production]
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const envArg = process.argv.find((a) => a.startsWith('--env='));
const envFile = envArg === '--env=production' ? '.env' : '.env.local';
const envPath = path.join(repoRoot, 'env', 'shopify', envFile);

function parseEnv(text) {
  return Object.fromEntries(
    text.split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => l.split('=').map((s) => s.trim()))
      .filter(([k]) => k)
      .map(([k, ...v]) => [k, v.join('=').replace(/^["']|["']$/g, '')])
  );
}

async function main() {
  const env = parseEnv(await readFile(envPath, 'utf8'));

  // アクセストークン取得
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: env.SHOPIFY_DEV_CLIENT_ID,
    client_secret: env.SHOPIFY_DEV_CLIENT_SECRET,
  });
  const tokenRes = await fetch(
    `https://${env.SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`,
    { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params }
  );
  if (!tokenRes.ok) throw new Error(`Token error: ${tokenRes.status} ${await tokenRes.text()}`);
  const { access_token: token } = await tokenRes.json();
  console.log('✓ アクセストークン取得');

  // settings_data.json を読み込んでアップロード
  const themeId = env.SHOPIFY_THEME_ID;
  const apiVersion = env.SHOPIFY_API_VERSION || '2026-04';
  const fileContent = await readFile(path.join(__dirname, '..', 'config', 'settings_data.json'), 'utf8');
  const base64 = Buffer.from(fileContent, 'utf8').toString('base64');

  const assetRes = await fetch(
    `https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${apiVersion}/themes/${themeId}/assets.json`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ asset: { key: 'config/settings_data.json', attachment: base64 } }),
    }
  );
  if (!assetRes.ok) {
    const text = await assetRes.text();
    throw new Error(`Upload error: ${assetRes.status} ${text}`);
  }
  const { asset } = await assetRes.json();
  console.log(`✓ settings_data.json アップロード完了 (updated_at: ${asset.updated_at})`);
}

main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
