# Shopify環境ファイル

`env/shopify/.env.local` にShopify接続情報を保存します。このファイルはGit管理しません。

## ファイル

- `.env.local`: 実値入りのローカル秘密ファイル
- `.env.example`: 共有用テンプレート

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
