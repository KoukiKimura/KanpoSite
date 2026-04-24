# KanpoSite - プロジェクト構成ガイド

## プロジェクト概要

**KanpoSite** は、漢方オリジナルブランド「山草の恵み」の公式サイトリポジトリです。
ブランドの世界観、商品導線、畑・古民家の紹介、将来的な読み物・宿泊導線を扱うブランドサイトとして構築します。

| 項目 | 現状 |
|---|---|
| ブランド名 | 山草の恵み |
| サイト種別 | ブランドサイト + 外部EC導線 |
| 公開想定 | ConoHa WING への静的ファイル配置 |
| 本実装 | `web/` |
| レビュー用モック | `web_mock/` |
| フロントエンド | Next.js App Router / React / TypeScript / Tailwind CSS |
| 出力方式 | Static Export（`output: 'export'`） |
| データ管理 | 現状は静的データ。将来 `DecapCMS`、`microCMS`、`Shopify` を検討 |
| API | `api/` は将来API予約領域。問い合わせAPIは未実装 |

---

## 現在のフォルダ構成

```txt
KanpoSite/
├── .github/
│   └── copilot-instructions.md
├── api/
│   └── .gitkeep
├── docs/
│   ├── README.md
│   ├── TODO_開発ロードマップ.md
│   ├── TODO_web_mock実装ロードマップ.md
│   ├── 要件定義/
│   │   └── サイト要件定義書.md
│   ├── サイト設計/
│   │   ├── サイト基本設計書.md
│   │   └── サイト詳細設計書.md
│   ├── レビュー/
│   └── 運用記録/
├── env/
│   ├── .env.deploy
│   ├── .env.mock.deploy
│   └── web_mock/
│       ├── .env.review
│       └── README.md
├── sample/
│   └── .gitkeep
├── web/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── web_mock/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── work/
│   ├── web_mock/
│   └── 調査メモ・TODO類
├── AGENT.md
└── README.md
```

生成物・依存関係として `web/.next/`、`web/out/`、`web/node_modules/`、`web_mock/.next/`、`web_mock/out/`、`web_mock/node_modules/` が存在する場合があります。編集時の正本は `src/`、設定ファイル、ドキュメントです。

---

## フォルダの役割

| フォルダ | 役割 |
|---|---|
| `.github/` | GitHub Copilot 等の開発支援向け設定。現状 `copilot-instructions.md` は空 |
| `api/` | 将来API予約領域。現状は `.gitkeep` のみ |
| `docs/` | 要件定義、設計書、レビュー、運用記録、ロードマップ |
| `env/` | デプロイ・レビュー用の環境設定ファイル置き場。秘密情報はGit管理しない |
| `sample/` | 参考実装・試作用の予約領域 |
| `web/` | 公開サイト本体。ConoHa WING へ静的エクスポートして配置する想定 |
| `web_mock/` | 依頼者レビュー用の静的モック。画像素材とダミーデータを含む |
| `work/` | 調査メモ、作業ログ、SEO TODO、画像配置資料など |

`contact-api/` は現在の実フォルダには存在しません。問い合わせAPIを実装する場合は、`api/` 配下で扱うか、新規フォルダを作るかを設計書とREADMEで確定してから追加します。

---

## ブランチ運用

現時点の基本ブランチは `main` です。README では将来の運用として以下の構成を想定しています。

```txt
main
└── develop
    └── feature/<topic>
```

| ブランチ | 用途 |
|---|---|
| `main` | 本番リリース・納品基準 |
| `develop` | 開発統合 |
| `feature/<topic>` | 個別機能開発 |

運用ルール:

- 現状 `main` しかない場合は、追加ブランチ運用を始めるタイミングで `develop` と `feature/*` を作る
- ユーザー影響のある仕様変更は、コードだけでなく設計書も同時に更新する
- ルーティング、フォルダ構成、外部サービス方針を変更した場合は `README.md`、`AGENT.md`、関連する `docs/` を追従させる

---

## 命名・記述ルール

- ドキュメント、設計書、作業メモは日本語ファイル名を基本とする
- 実装コード、ディレクトリ名、ルートセグメント、コンポーネント名は英語を基本とする
- 画面上の文言は日本語を基本とし、必要に応じて英語サブコピーを添える
- プレースホルダー値（`○○`、`準備中`、仮URL、仮住所）は意図的に残っている場合があるため、差し替え時は関連ページを横断して更新する
- `.env*`、デプロイ先URL、メールアドレス、APIキーなどの扱いは `env/` と各アプリの `.gitignore` を確認してから変更する

---

## 技術スタック

`web/` と `web_mock/` は同じ基本スタックです。

| パッケージ | 現在の指定 |
|---|---|
| `next` | `15.5.15` |
| `react` / `react-dom` | `^18.3.0` |
| `typescript` | `^5.4.5` |
| `tailwindcss` | `^3.4.4` |
| `eslint` | `^8.57.0` |
| `eslint-config-next` | `15.5.15` |

主なコマンド:

```bash
cd web
npm run dev
npm run build
npm run lint
```

```bash
cd web_mock
npm run dev
npm run build
npm run lint
```

`npm run build` は Static Export 用の `out/` を生成します。ConoHa WING へ配置する対象は `out/` の中身です。

---

## Static Export 方針

`web/next.config.mjs` と `web_mock/next.config.mjs` は次の方針です。

- `output: 'export'`
- `trailingSlash: true`
- `images.unoptimized: true`

`web_mock/next.config.mjs` は `NEXT_PUBLIC_MOCK_SITE_URL` のパス部分から `basePath` を自動設定します。

実装時の注意:

- 公開サイトでは SSR / ISR / `revalidate` / Server Actions / Route Handlers を前提にしない
- 動的ルートは `generateStaticParams` で静的生成する
- `next/image` のサーバー最適化に依存しない
- データ更新は再ビルド + 再デプロイで反映する
- 問い合わせフォームの実送信は未実装。実装時は外部APIまたは `api/` 側の方針を先に確定する

---

## `web/` の構成

```txt
web/
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── concept/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── farm/page.tsx
│   │   ├── kominka/page.tsx
│   │   ├── legal/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── ProductCard.tsx
│   │       └── SectionTitle.tsx
│   └── lib/
│       └── dummy-data.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

現在実装されている公開サイトの主なルート:

| ルート | 内容 |
|---|---|
| `/` | トップページ |
| `/about` | ブランド紹介 |
| `/concept` | コンセプト |
| `/farm` | 畑紹介 |
| `/kominka` | 古民家紹介 |
| `/contact` | お問い合わせ |
| `/products` | 商品一覧 |
| `/products/[slug]` | 商品詳細 |
| `/legal` | 特定商取引法に基づく表記 |
| `/privacy` | プライバシーポリシー |
| `/terms` | 利用規約 |

現状のデータ正本は `web/src/lib/dummy-data.ts` です。`BASE`、`DecapCMS`、`microCMS`、`Shopify` との実接続はまだ前提にしません。

---

## `web_mock/` の構成

```txt
web_mock/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── home/
│       ├── kominka/
│       └── products/
├── src/
│   ├── app/
│   │   ├── contact/page.tsx
│   │   ├── kominka/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   ├── products/[slug]/ingredients/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   └── lib/
│       └── mock/
│           ├── productIngredients.ts
│           └── site.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

現在実装されているモックの主なルート:

| ルート | 内容 |
|---|---|
| `/` | モックトップ |
| `/products` | 商品一覧 |
| `/products/[slug]` | 商品詳細 |
| `/products/[slug]/ingredients` | 商品成分詳細 |
| `/kominka` | 古民家紹介 |
| `/contact` | お問い合わせ |

`web_mock/` の方針:

- 依頼者レビュー用の静的モックとして扱う
- ダミーデータ固定で、実CMS、実EC、実問い合わせAPIには接続しない
- `robots.txt` は `Disallow: /`、metadata でも `noindex` を付与する
- 確認URLは `env/web_mock/.env.review` と `NEXT_PUBLIC_MOCK_SITE_URL` で管理する
- 承認済みUIやコピーを `web/` へ移植する場合は、静的データとルーティングの差分も確認する

---

## データ責務

| 領域 | 現状 | 将来方針 |
|---|---|---|
| 商品データ | `web/src/lib/dummy-data.ts`、`web_mock/src/lib/mock/site.ts` | `BASE` 外部リンク導線、将来 `Shopify` 検討 |
| 商品成分データ | `web_mock/src/lib/mock/productIngredients.ts` | 本実装へ移植する場合は `web/` 側のデータ設計を追加 |
| 本文コンテンツ | 静的TSX・静的データ | 将来 `microCMS` などへ移行可能な構造を検討 |
| SEO補助情報 | 現状はコード・metadata中心 | 初期方針として `DecapCMS` をSEO補助情報専用にする案あり |
| 問い合わせ | 画面のみ。実送信未実装 | ConoHa WING + PHP / SMTP、または別APIを設計後に実装 |
| レビュー用URL | `env/` 配下の環境ファイル | 秘密情報を含めず、用途別に管理 |

運用前提:

- 商品価格、在庫、決済、配送、返品、特商法などのEC運用条件は、実EC接続後はEC側を正本にする
- 初期実装ではサイト内カート・チェックアウトを持たず、購入は外部EC導線を基本にする
- 法務ページは表示内容と最終確認日を明確にし、EC側の正本と矛盾させない
- 将来サービス連携を追加する場合は、要件定義書、基本設計書、詳細設計書、README、AGENT.md を同時に更新する

---

## ドキュメント管理

| ドキュメント | パス |
|---|---|
| docs 管理ルール | `docs/README.md` |
| 要件定義書 | `docs/要件定義/サイト要件定義書.md` |
| 基本設計書 | `docs/サイト設計/サイト基本設計書.md` |
| 詳細設計書 | `docs/サイト設計/サイト詳細設計書.md` |
| 開発ロードマップ | `docs/TODO_開発ロードマップ.md` |
| web_mock 実装ロードマップ | `docs/TODO_web_mock実装ロードマップ.md` |
| レビュー記録 | `docs/レビュー/` |
| 運用記録 | `docs/運用記録/` |
| 調査・作業メモ | `work/` |

ドキュメント運用:

- `docs/` 直下には `README.md` と `TODO_*.md` 以外を置かない
- 要件定義、設計、レビュー、運用記録はサブディレクトリに置く
- 設計書には版数、作成日、最終更新日、ステータスを記載する
- レビュー結果は `docs/レビュー/` に `{対象ドキュメント名}_レビュー_{YYYYMMDDHHMMSS}.md` 形式で出力する
- `work/` は調査メモや一時的な検討資料の置き場。正本化する内容は `docs/` に移す

---

## 実装時の判断基準

- ブランド・体験の意図は要件定義書と設計書を優先する
- 現在の構成、ルート、依存バージョンは実コードを確認する
- `web/` は公開サイト、`web_mock/` はレビュー用モックとして用途を混ぜない
- Static Export と ConoHa WING 配置に反する実装は避ける
- ユーザーが触っている未コミット変更は戻さず、必要な範囲だけ編集する
- 差分が見つかった場合は片方に寄せるだけで終わらせず、正本に合わせて関連ドキュメントも更新する

---

*以上*
