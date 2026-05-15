# Shopify バックアップデータ

このディレクトリには `scripts/backup-shopify.mjs` が取得した Shopify 上のデータが保存されます。

## ファイル一覧

| ファイル | 内容 |
|---|---|
| `manifest.json` | 取得日時・ストア情報 |
| `shop.json` | ショップ基本情報（店舗名・メール・通貨・タイムゾーン等）|
| `products.json` | 商品情報（バリアント・メタフィールド含む）|
| `products.csv` | 商品情報 CSV（Shopify 標準形式・再インポート可）|
| `collections.json` | コレクション情報 |
| `pages.json` | 固定ページ（メタフィールド含む）|
| `blogs.json` | ブログ・記事情報 |
| `menus.json` | ナビゲーション設定 |
| `policies.json` | ポリシーページ |
| `redirects.json` | URL リダイレクト設定 |
| `metafield-definitions.json` | メタフィールド定義 |
| `metaobject-definitions.json` | メタオブジェクトスキーマ定義（FAQ等の構造） |
| `metaobject-instances.json` | メタオブジェクトデータ（FAQ等の実コンテンツ） |
| `files.json` | 管理画面アップロードファイル一覧（画像・PDFのURL） |
| `shipping-zones.json` | 配送ゾーン・送料設定 |
| `locations.json` | ロケーション（在庫管理場所）|
| `markets.json` | マーケット（国・地域・通貨設定）|
| `script-tags.json` | Script Tags（Google Analytics・GTM 等）|
| `notifications.json` | 通知メールテンプレート |
| `discounts.json` | 割引・価格ルール・クーポンコード |
| `themes.json` | テーマ一覧（ライブ/控えテーマのID）|

## 実行方法

### 一括実行（推奨）

theme pull → データバックアップ → git commit を一括で行います。

```powershell
# web_shopify/ ディレクトリから実行
cd D:\Works\project\KanpoSite\web_shopify

# 検証環境
.\scripts\pre-revision-backup.ps1

# 本番環境
.\scripts\pre-revision-backup.ps1 -Env production
```

> 初回実行時に PowerShell の実行ポリシーエラーが出た場合は、先に以下を一度だけ実行してください:
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```

### 個別実行

データバックアップのみ実行したい場合:

```powershell
cd D:\Works\project\KanpoSite\web_shopify

# 検証環境
node scripts/backup-shopify.mjs

# 本番環境
node scripts/backup-shopify.mjs --env=production
```

theme pull のみ実行したい場合:

```powershell
shopify theme pull --theme 154692485277
```

## 運用ルール

- 大規模改修前に必ず一括実行スクリプトを使って `git commit` してから作業を開始してください。
- 詳細な手順は `docs/運用記録/改修前バックアップ手順.md` を参照してください。
