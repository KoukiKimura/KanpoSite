# KanpoSite — 山草の恵み 公式サイト

漢方オリジナルブランド「山草の恵み」の公式サイトリポジトリです。  
ブランドの世界観と商品価値を伝えつつ、商品販売と将来的な宿泊導線を持つ公式サイトを構築します。

---

## プロジェクト概要

| 項目 | 内容 |
|---|---|
| ブランド名 | 山草の恵み |
| サイト種別 | Shopify Online Store |
| 主な目的 | ブランド認知・商品販売導線・古民家紹介 |
| 対象ユーザー | 健康意識の高い30〜60代、自然・和のライフスタイルに関心のある層 |
| ホスティング想定 | Shopify |

---

## ディレクトリ構成

```
KanpoSite/
├── README.md             # このファイル
├── docs/                 # ドキュメント（日本語ファイル名）
│   ├── README.md
│   ├── 要件定義/
│   │   └── サイト要件定義書.md
│   ├── サイト設計/
│   │   ├── サイト基本設計書.md
│   │   └── サイト詳細設計書.md
│   ├── レビュー/
│   └── 運用記録/
├── env/                  # 環境設定ファイル
├── api/                  # 将来API予約領域
├── sample/               # 参考実装・試作
├── web_shopify/          # 正規Shopifyテーマ実装（Liquid / JSON templates）
├── web/                  # 旧Next.js実装・検証用
│   ├── src/
│   │   ├── app/          # ページ (App Router)
│   │   ├── components/   # UIコンポーネント
│   │   └── lib/          # ユーティリティ・データ
│   └── ...
├── web_mock/             # 依頼者レビュー用の静的モック
├── contact-api/          # 問い合わせAPI（実装時に作成）
└── work/                 # 調査メモ・作業ログ
    ├── 調査メモ_機能提案.md
    └── TODO_SEO対策.md
```

---

## セットアップ手順

### 前提条件
- Node.js 18.x 以上
- npm 9.x 以上

### Shopifyテーマ開発

Shopifyテーマの正規ソースは `web_shopify/` です。

```bash
cd web_shopify
shopify theme check --path .
shopify theme dev --path .
shopify theme package --path .
```

商品・コレクション・固定ページ・BLOG・メニューの初期投入や更新補助は、必要に応じて以下を実行します。

```bash
cd web_shopify
node scripts/seed-shopify.mjs
```

詳細は [web_shopify/README.md](web_shopify/README.md) を参照してください。

### 旧Next.js実装

```bash
cd web
npm install
npm run build
```

`web/` は旧Next.js実装・検証用です。公開の正規実装は `web_shopify/` です。

---

### web_mock（依頼者レビュー用モック）

#### セットアップ（初回）

```bash
cd web_mock
npm install

# 環境ファイルをコピー
# Windows (PowerShell)
Copy-Item ..\env\web_mock\.env.review .env.local
# Mac / Linux
# cp ../env/web_mock/.env.review .env.local
```

#### 開発サーバー起動

```bash
cd web_mock
npm run dev
# → http://localhost:3000
```

#### ビルド（静的エクスポート）

```bash
cd web_mock
npm run build
# → web_mock/out/ に静的ファイルが生成されます
```

#### ConoHa WING へのデプロイ

```bash
cd web_mock
npm run deploy
```

ビルドと FTP アップロードを一括実行します。接続情報は `env/.env.mock.deploy` から自動で読み込まれます。
詳細は [web_mock/README.md](web_mock/README.md) を参照してください。

#### 一連の作業フロー

```bash
cd web_mock
npm install                                        # 初回のみ
Copy-Item ..\env\web_mock\.env.review .env.local  # 初回のみ（PowerShell）
npm run dev                                        # ローカル確認
npm run deploy                                     # ビルド & デプロイ
```

> 詳細は [web_mock/README.md](web_mock/README.md) を参照してください。

---

## 開発方針

- **正規実装**: Shopify Online Store 2.0 テーマ（`web_shopify/`）
- **テーマ開発**: Liquid / JSON templates / sections / CSS / JavaScript
- **CMS / EC**: Shopifyの商品、コレクション、ブログ、固定ページ、ポリシーを正本にする
- **モック**: `web_mock/` はShopifyテーマへ移植するUIレビュー用として扱う
- **デザイン方針**: 自然・和・上質感。余白を活かした落ち着いたレイアウト
- **カラーパレット**: 現在の基準テーマは `MOSS`。深い緑、生成り、土、和の自然色を基調とし、後続レビューで変更可能な暫定値として扱う
- **将来拡張**: 宿泊予約機能、多言語対応、必要に応じたShopifyアプリ連携

### ブランチ戦略
- `main`: 本番リリース用
- `develop`: 開発統合ブランチ
- `feature/xxx`: 機能開発ブランチ

---

## ドキュメント参照先

| ドキュメント | パス |
|---|---|
| サイト要件定義書 | [docs/要件定義/サイト要件定義書_Shopify案.md](docs/要件定義/サイト要件定義書_Shopify案.md) |
| サイト基本設計書 | [docs/サイト設計/サイト基本設計書_Shopify案.md](docs/サイト設計/サイト基本設計書_Shopify案.md) |
| サイト詳細設計書 | [docs/サイト設計/サイト詳細設計書_Shopify案.md](docs/サイト設計/サイト詳細設計書_Shopify案.md) |
| 開発ロードマップ | [docs/ロードマップ/開発ロードマップ_Shopify案.md](docs/ロードマップ/開発ロードマップ_Shopify案.md) |
| オリジナル案アーカイブ | [docs/archive/オリジナル案/README.md](docs/archive/オリジナル案/README.md) |
| 機能提案メモ | [work/調査メモ_機能提案.md](work/調査メモ_機能提案.md) |
| SEO対策TODO | [work/TODO_SEO対策.md](work/TODO_SEO対策.md) |

---

## 現在の実装状況

- [x] リポジトリ初期構成
- [x] ドキュメント雛形（要件定義書・設計書・SEO TODO等）
- [x] フロントエンド雛形（Next.js + Tailwind CSS）
  - [x] トップページ
  - [x] 商品一覧ページ
  - [x] 商品詳細ページ
  - [x] カートページ（`web_mock/` レビュー用）
  - [x] ブランド紹介ページ
  - [x] 畑紹介ページ
  - [x] 古民家紹介ページ
  - [x] お問い合わせページ
  - [x] 法的ページ（特定商取引法・プライバシーポリシー・利用規約）
  - [x] 共通レイアウト（ヘッダー・フッター）
  - [x] ダミー商品データ
  - [x] 商品画像クリック遷移、数量指定、在庫表示、カート件数バッジ（`web_mock/` レビュー用）
- [ ] 実画像・コンテンツの差し替え
- [ ] Shopify正本データ・運用設定の公開前確認
- [ ] お問い合わせフォーム送信機能（将来実装）
- [ ] 宿泊予約機能（将来実装）
- [ ] SEO対策（work/TODO_SEO対策.md 参照）
- [ ] 多言語対応（将来実装）

---

## ライセンス

Copyright © 山草の恵み. All rights reserved.
