# Shopify環境ファイル

`env/shopify/.env` にShopify本番接続情報を保存します。このファイルはGit管理しません。

> **検証環境について**: 2026-05-18 に検証Shopifyストアをクローズしました。  
> `.env.local` はアーカイブ注記付きで値を保持しています。復活手順は [docs/運用記録/検証環境クローズ記録.md](../../docs/運用記録/検証環境クローズ記録.md) を参照してください。

## ファイル

| ファイル | 用途 | 状態 |
|---|---|---|
| `.env` | **本番環境**用シークレット。実値入り。Git管理しない | **稼働中** |
| `.env.local` | **検証環境**用シークレット。実値入り。Git管理しない | **休止中（アーカイブ）** |
| `.env.example` | 共有用テンプレート。値は空欄のままGit管理する | — |

## 主な変数

| 変数 | 用途 |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `{store}.myshopify.com` 形式のストアドメイン |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront / Catalog API用トークン |
| `SHOPIFY_CATALOG_API_KEY` | Dev Dashboard上のCatalog APIキーを保持する別名 |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | 固定Admin API tokenを使う場合の予備枠。現行seedでは未使用 |
| `SHOPIFY_DEV_CLIENT_ID` | Dev DashboardアプリのClient ID。Client credentials grantでAdmin API access tokenを取得する場合に使用 |
| `SHOPIFY_DEV_CLIENT_SECRET` | Dev DashboardアプリのClient secret。秘密値として管理 |
| `SHOPIFY_THEME_ACCESS_DEVELOPER_NAME` | Theme Accessで発行した開発者名の控え |
| `SHOPIFY_THEME_ACCESS_DEVELOPER_EMAIL` | Theme Accessで発行した開発者メールアドレスの控え |
| `SHOPIFY_THEME_ACCESS_PASSWORD` | Theme Accessで発行したテーマ操作用パスワード |
| `SHOPIFY_CLI_THEME_TOKEN` | Theme Access appまたはAdmin API tokenでCLIテーマ操作を行う場合に使用 |
| `SHOPIFY_THEME_ID` | 反映先テーマID |

Storefront / Catalog APIキーはフロント向けに使える種類のトークンでも、このリポジトリでは秘密ファイル扱いにします。Admin API access tokenとClient secretは権限が強いため、ブラウザへ公開しないでください。

Theme Accessのパスワードは、Shopify CLIが参照する `SHOPIFY_CLI_THEME_TOKEN` にも同じ値を設定します。

## 現行運用

- テーマ反映: `SHOPIFY_STORE_DOMAIN`、`SHOPIFY_THEME_ID`、`SHOPIFY_CLI_THEME_TOKEN` を使って `shopify theme push` を実行します。
- データ投入: `SHOPIFY_DEV_CLIENT_ID` と `SHOPIFY_DEV_CLIENT_SECRET` で実行時にAdmin API access tokenを取得し、`web_shopify/scripts/seed-shopify.mjs` を実行します。商品・コレクション・固定ページ・BLOG・メニューに加え、主要metafield定義、SEO title / description、商品・記事・コレクション画像altの初期投入を補助します。
- `SHOPIFY_STORE_DOMAIN` はAPI/Theme Access用の `{store}.myshopify.com` ドメインを指定します。ストアフロントのプライマリ表示ドメインとは異なる場合があります。

> **2026-05-18以降**: 検証環境クローズにより、操作対象は本番環境のみです。

## 環境切り替え

> **現在の状態**: 検証環境は休止中です。本番環境のみ稼働中です。  
> 検証環境の復活手順は [docs/運用記録/検証環境クローズ記録.md](../../docs/運用記録/検証環境クローズ記録.md) を参照。

`shopify theme push` などを実行する際は、使用する環境ファイルを明示して操作します。

| 操作対象 | 使用ファイル | 状態 |
|---|---|---|
| 本番環境 | `.env` | **稼働中** |
| 検証環境 | `.env.local` | **休止中** |

スクリプト・CLIコマンド実行前に、`SHOPIFY_STORE_DOMAIN` と `SHOPIFY_THEME_ID` が意図した環境のものであることを確認してください。

### theme push

```bash
# 本番環境
$env:SHOPIFY_CLI_THEME_TOKEN="<本番トークン>"; shopify theme push --store=7jcarb-ee.myshopify.com --theme=182392586527

# 検証環境（休止中。復活後に使用）
# $env:SHOPIFY_CLI_THEME_TOKEN="<検証トークン>"; shopify theme push --store=<検証ドメイン> --theme=<検証THEME_ID>
```

### seed / update-policies / set-product-category

`--env=production` を付けると `env/shopify/.env`（本番）を読み込みます。省略時は `.env.local`（検証）を使います。

```bash
# 本番環境
node web_shopify/scripts/seed-shopify.mjs --env=production
node web_shopify/scripts/update-policies.mjs --env=production
node web_shopify/scripts/set-product-category.mjs --env=production

# 検証環境（休止中。復活後に使用）
# node web_shopify/scripts/seed-shopify.mjs
```
