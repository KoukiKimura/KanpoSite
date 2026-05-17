# web_shopify

Shopify案のローカルテーマソースです。現在はテーマZIPの手動アップロード後、Shopify CLI `theme push` とAdmin API seedスクリプトで更新する運用へ移行しています。

## 位置付け

- `docs/要件定義/サイト要件定義書_Shopify案.md`
- `docs/サイト設計/サイト基本設計書_Shopify案.md`
- `docs/サイト設計/サイト詳細設計書_Shopify案.md`
- `docs/ロードマップ/開発ロードマップ_Shopify案.md`
- `web_mock/`

上記を参照し、Online Store 2.0 の Liquid / JSON templates / sections / snippets / assets 構成で作成しています。

## 構成

```txt
web_shopify/
├── assets/       # CSS, JS, 初期プレビュー用画像
├── config/       # テーマ設定
├── layout/       # 共通HTML
├── locales/      # 翻訳
├── sections/     # Shopifyテーマセクション
├── snippets/     # 再利用部品
└── templates/    # JSON templates
```

## 主要方針

- Shopify標準URLを正規URLにする
- 商品、カート、Checkout、ブログ、問い合わせはShopify標準データと機能を使う
- 古民家予約は外部URLへ誘導する
- 商品補足情報は product metafields を参照する
- トップや古民家の画像・文言はテーマエディタで差し替えられるようにする
- 初期表示用に `web_mock/public/images` 由来のフォールバック画像を `assets/` に入れている
- Shopify CLI認証情報、ストアURL、テーマID、Admin APIトークンは保存しない

## 現在の実装状態

- ライブテーマへの反映は `shopify theme push` で実施済み
- 商品、コレクション、固定ページ、BLOG、記事、メニューは `scripts/seed-shopify.mjs` で初期投入・更新可能
- seedスクリプトは初期SEO title / description、商品・記事・コレクション画像alt、主要metafield定義の作成・pinを補助する
- 共通OGPは商品・記事画像、ShopifyのデフォルトOGP画像、またはテーマasset `home-hero-satoyama.webp` の順で補完する
- 商品一覧は枠なしのグリッド表示
  - 画像上部、商品名と価格を下部に表示
  - 説明文、数量選択、カート追加は一覧では表示しない
  - `NEW` バッジは商品タグ `new`、または公開後60日以内の商品に表示
- トップページの商品セクションはPC/モバイルとも2列表示
  - 画像上部、商品名下部の簡易表示
  - 商品説明とカート追加は表示しない
- BLOGは `BLOG` 表記で統一し、`/blogs/stories` を正規URLにする
- BLOG一覧はテキスト中心の縦並び、詳細画像は本文幅に合わせて制限
- 問い合わせはShopify標準の contact form を利用し、送信後はページ上に受付メッセージを表示する

## 開発コマンド

Shopify CLI が必要です。

```powershell
cd D:\Works\project\KanpoSite\web_shopify

# ストアへログイン
shopify auth login --store {store-name}.myshopify.com

# プレビュー
shopify theme dev --path .

# 構文チェック
shopify theme check --path .

# ZIP化
shopify theme package --path .
```

初回アップロード時は `shopify theme package --path .` で生成したZIPをShopify管理画面へアップロードしました。以後のテーマ更新は、Theme Access tokenを `SHOPIFY_CLI_THEME_TOKEN` として読み込み、ライブテーマへCLI反映します。

```powershell
cd D:\Works\project\KanpoSite\web_shopify

$envFile = Resolve-Path ..\env\shopify\.env.local
$envMap = @{}
Get-Content -LiteralPath $envFile | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -notmatch '=') { return }
  $parts = $_.Split('=', 2)
  $envMap[$parts[0].Trim()] = $parts[1].Trim()
}

$env:SHOPIFY_CLI_THEME_TOKEN = $envMap['SHOPIFY_CLI_THEME_TOKEN']
shopify theme check --path .
shopify theme push --store $envMap['SHOPIFY_STORE_DOMAIN'] --password $envMap['SHOPIFY_CLI_THEME_TOKEN'] --theme $envMap['SHOPIFY_THEME_ID'] --nodelete --allow-live
```

商品・ページ・BLOG・メニューを再同期する場合:

```powershell
cd D:\Works\project\KanpoSite\web_shopify
node scripts\seed-shopify.mjs --env=production
```

> **2026-05-18以降**: 検証環境はクローズしました。seed スクリプト・テーマプッシュは本番環境（`--env=production`）のみ実行します。  
> 検証環境の復活手順は [docs/運用記録/検証環境クローズ記録.md](../docs/運用記録/検証環境クローズ記録.md) を参照してください。

商品にShopify標準の商品カテゴリを設定する場合:

```powershell
cd D:\Works\project\KanpoSite\web_shopify

# 候補カテゴリと現在の商品カテゴリを確認（dry-run）
node scripts\set-product-category.mjs --search="Garden Plants"

# 苗・園芸植物の商品にカテゴリを反映
node scripts\set-product-category.mjs --handles={product-handle} --category=garden-plants --apply

# 食用ハーブ苗の場合
node scripts\set-product-category.mjs --handles={product-handle} --category=herbs --apply
```

苗の一般分類は `Home & Garden > Plants > Indoor & Outdoor Plants > Landscaping & Garden Plants > Garden Plants` を基本候補とします。食用ハーブ苗は `Home & Garden > Plants > Indoor & Outdoor Plants > Culinary Herbs & Plants` を優先します。

## Shopify管理画面で設定・確認するもの

- 商品、コレクション、価格、在庫、バリエーション
- Product category（Shopify標準タクソノミー。苗商品は上記スクリプトまたは管理画面で設定）
- Search engine listing
  - 商品、コレクション、固定ページ、BLOG、記事のSEO title / description
  - URL handle
  - 画像alt
- Product metafields
  - `custom.quantity`
  - `custom.ingredients`
  - `custom.how_to_use`
  - `custom.caution`
  - `custom.related_products`
  - `custom.faqs`
- ブログ `BLOG` / handle `stories`
- 固定ページ `kominka`, `contact`, `faq`
- 古民家予約URL、アクセス、ギャラリー画像
- テーマ設定
  - ロゴ
  - デフォルトOGP画像（未設定時はテーマassetを使用）
  - Organization名・説明
  - 連絡先メール・電話番号・SNS URL
- メニュー、ポリシー、配送、決済、通知先メール、ドメイン、GA4、Search Console

`scripts/seed-shopify.mjs` は上記のうち、商品、コレクション、固定ページ、BLOG、記事、メニュー、商品metafields、主要metafield定義、初期SEO title / description、商品・記事・コレクション画像altの初期投入を補助します。決済、配送、法務、通知先メール、ドメイン、GA4、Search Console、問い合わせの受信確認は管理画面で必ず確認します。

## 注意

このディレクトリはテーマソースのみです。商品・ブログ・ページ本文・ポリシー・ストア画像・注文データはZIPに含まれません。
