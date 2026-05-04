/**
 * web FTP デプロイスクリプト
 * 接続情報は ../env/.env.deploy から読み込みます
 */
import FtpDeploy from 'ftp-deploy';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── env ファイルを読み込む ───────────────────────────────────────────────────
const envPath = resolve(__dirname, '../../env/.env.deploy');
let envContent;
try {
  envContent = readFileSync(envPath, 'utf-8');
} catch {
  console.error(`[deploy] env ファイルが見つかりません: ${envPath}`);
  console.error('[deploy] env/.env.deploy を作成してから再実行してください。');
  process.exit(1);
}

const env = {};
for (const line of envContent.split(/\r?\n/)) {
  const match = line.match(/^([A-Z_]+)=(.+)$/);
  if (match) env[match[1]] = match[2].trim();
}

const required = ['DEPLOY_FTP_HOST', 'DEPLOY_FTP_USER', 'DEPLOY_FTP_PASSWORD', 'DEPLOY_REMOTE_DIR'];
for (const key of required) {
  if (!env[key]) {
    console.error(`[deploy] 必須変数 ${key} が env/.env.deploy に設定されていません。`);
    process.exit(1);
  }
}

// ─── FTP デプロイ ─────────────────────────────────────────────────────────────
const ftpDeploy = new FtpDeploy();

const config = {
  user:        env.DEPLOY_FTP_USER,
  password:    env.DEPLOY_FTP_PASSWORD,
  host:        env.DEPLOY_FTP_HOST,
  port:        parseInt(env.DEPLOY_FTP_PORT ?? '21', 10),
  localRoot:   resolve(__dirname, '../out'),
  remoteRoot:  env.DEPLOY_REMOTE_DIR,
  include:     ['*', '**/*'],
  deleteRemote: false,
  forcePasv:   true,
};

console.log(`[deploy] アップロード先: ${config.host}${config.remoteRoot}`);

ftpDeploy.on('uploaded', ({ filename, transferredFileCount, totalFilesCount }) => {
  process.stdout.write(`\r[deploy] ${transferredFileCount}/${totalFilesCount} ${filename}`);
});

ftpDeploy.on('upload-error', ({ filename, err }) => {
  console.error(`\n[deploy] エラー: ${filename} — ${err.message}`);
});

try {
  await ftpDeploy.deploy(config);
  console.log('\n[deploy] 完了');
  if (env.DEPLOY_SITE_URL) {
    console.log(`[deploy] 公開 URL: ${env.DEPLOY_SITE_URL}`);
  }
} catch (err) {
  console.error(`\n[deploy] デプロイ失敗: ${err.message}`);
  process.exit(1);
}
