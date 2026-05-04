# web_mock

依頼者レビュー用の静的モックアプリです。

## 役割

- フェーズ1からフェーズ2のデザイン確認
- ダミーデータだけで主要導線を確認
- 承認済み UI を `web/` へ移植する前段

初期リリースでは下書き確認用 `preview/` 別アプリは作成せず、`web/` は本実装用、`web_mock/` は依頼者レビュー用として用途を分けます。`preview/` は将来 `microCMS` 移行時に再検討します。

## 現在の最小構成

- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/kominka`
- `/contact`

## 現在の確認機能

- 商品一覧とトップの商品画像から商品詳細へ遷移
- 商品一覧・商品詳細で数量を指定してカート追加
- 数量指定は在庫数を上限とし、選択肢は最大 9 個まで
- 商品ごとに「在庫あり / 在庫なし」を表示
- ヘッダー右側にカートアイコンのみの導線を表示
- カート内商品数をアイコン上のバッジに表示し、100 点以上は `99+`
- `/cart` で明細、数量変更、削除、小計、空カート導線を確認

カート機能はレビュー用の仮実装です。`localStorage` にダミー商品 slug と数量だけを保持し、決済・注文・外部サービス連携は行いません。

## デザイン参照

- 参考: `https://www.roccadeifiori.eu/en/the-company/`
- 取り込む要素: 大きなヒーロー、広い余白、セリフ体見出し、土色と深緑の配色
- 取り込まない要素: 実画像依存の演出、実データ接続、実送信
- 現在の基準テーマカラー: `MOSS`

`MOSS` は現時点のレビュー基準です。後ほど色調を変更する可能性があるため、色名と CSS 変数は固定仕様ではなく暫定値として扱います。

## 開発メモ

- `Next.js App Router`
- `output: 'export'`
- `robots.txt` は `Disallow: /`
- metadata でも `noindex` を付与
- ダミーデータは `src/lib/mock/site.ts`
- カート状態は `src/components/cart/CartProvider.tsx` で管理
- カートアイコンは `public/images/ui/cart-icon.png`

## 環境参照

- モック公開 URL は `env/.env.mock.deploy` の `DEPLOY_SITE_URL` を参照
- `web_mock/` 自体の確認 URL は `env/web_mock/.env.review` で管理

---

## コマンド一覧

### セットアップ（初回）

```bash
# web_mock ディレクトリに移動
cd web_mock

# 依存パッケージをインストール
npm install

# 環境ファイルをコピー（.env.local として配置）
# Windows (PowerShell)
Copy-Item ..\env\web_mock\.env.review .env.local
# Mac / Linux
# cp ../env/web_mock/.env.review .env.local
```

### 開発サーバー起動

```bash
cd web_mock
npm run dev
# → http://localhost:3000 で確認
```

### ビルド（静的エクスポート）

```bash
cd web_mock
npm run build
# → out/ ディレクトリに静的ファイルが生成されます
```

> `.env.local` が配置済みであることを確認してから実行してください。  
> `NEXT_PUBLIC_MOCK_SITE_URL` が設定されることで `basePath`（`/site_mock`）が自動設定されます。

### コードチェック

```bash
cd web_mock
npm run lint
```

### ConoHa WING へのデプロイ

```bash
cd web_mock
npm run deploy
```

`npm run deploy` は **ビルド（`next build`）→ FTP アップロード** を一括実行します。  
接続情報は `env/.env.mock.deploy` から自動で読み込まれます。

| 項目 | 参照する変数 |
|---|---|
| FTP ホスト | `DEPLOY_FTP_HOST` |
| FTP ユーザー | `DEPLOY_FTP_USER` |
| FTP パスワード | `DEPLOY_FTP_PASSWORD` |
| FTP ポート | `DEPLOY_FTP_PORT`（デフォルト: 21） |
| アップロード先ディレクトリ | `DEPLOY_REMOTE_DIR` |
| デプロイ後の公開 URL | `DEPLOY_SITE_URL` |

> アップロードに失敗する場合は `env/.env.mock.deploy` の各変数が正しく設定されているか確認してください。

### 一連の作業フロー

```bash
# 1. セットアップ（初回のみ）
cd web_mock
npm install
Copy-Item ..\env\web_mock\.env.review .env.local   # PowerShell

# 2. 開発・確認
npm run dev

# 3. ビルド & デプロイ
npm run deploy
# → ビルド完了後、FTP で ConoHa WING に自動アップロード
# → 公開 URL は DEPLOY_SITE_URL（env/.env.mock.deploy 参照）
```
