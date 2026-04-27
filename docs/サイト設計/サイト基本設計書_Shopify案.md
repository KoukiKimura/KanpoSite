# サイト基本設計書_Shopify案

| 項目 | 内容 |
|---|---|
| ドキュメント名 | サイト基本設計書_Shopify案 |
| バージョン | 1.0.1 |
| 作成日 | 2026-04-27 |
| 最終更新日 | 2026-04-27 |
| ステータス | 初版（セルフレビュー済）|
| 参照要件 | `docs/要件定義/サイト要件定義書_Shopify案.md` v1.2.0 |
| 参照ロードマップ | `docs/ロードマップ/開発ロードマップ_Shopify案.md` v1.2.0 |
| 参照設計 | `docs/サイト設計/サイト基本設計書.md` v1.5.1（オリジナル案）|

---

## 1. 基本方針

### 1.1 設計前提

- 本設計は `docs/要件定義/サイト要件定義書_Shopify案.md` v1.2.0 を上位要件とし、開発進行は `docs/ロードマップ/開発ロードマップ_Shopify案.md` の現行状態に従う
- 公開サイト、商品管理、決済、ブログ、問い合わせ、法務ページを Shopify に集約し、独自の Next.js 公開サイト・ConoHa 静的配信・外部ECリンク運用は採用しない
- Shopify 案は「ノーコードでワンクリック生成する案」ではなく、「AI 支援で Liquid / CSS / JSON sections を作成し、Shopify CLI でテーマへ反映する半自動開発案」として位置づける
- 商品・配送・決済・アプリ設定などは人間による管理画面確認を必須とし、完全自動サイト生成は要件に含めない
- デザインは `web_mock/` のトップ、商品、古民家、問い合わせ、ブログの見た目を可能な範囲で再現することを目標とするが、Shopify テーマ・Checkout・アプリ制約により完全一致は保証しない
- Shopify CLI、Admin API 利用時の認証情報はローカル環境または CI の秘密情報として管理し、テーマコードやリポジトリに埋め込まない
- AI 生成コードはそのまま本番反映せず、テーマ構造・Liquid 構文・モバイル表示・アクセシビリティ・SEO・Checkout 導線への影響を確認してから反映する

### 1.2 システム構成概要

```txt
利用者ブラウザ
  ↓
Shopify Online Store（CDN 配信 / HTTPS）
  ├─ Shopify テーマ（Liquid / JSON templates / sections / assets）
  ├─ Shopify Products / Collections / Cart / Checkout
  ├─ Shopify Blogs / Blog posts
  ├─ Shopify Pages（古民家、法務等）
  ├─ Shopify Policies（配送・返品・特商法）
  └─ Shopify 標準 contact template（問い合わせ）

テーマ開発
  ↓
ローカル（Shopify CLI）
  ├─ shopify theme pull   ：テーマソース取得
  ├─ shopify theme dev    ：プレビュー確認
  └─ shopify theme push   ：ストアへ反映

AI 支援
  └─ Liquid / HTML / CSS / JavaScript / JSON sections の生成・修正補助

Shopify 管理画面 / Shopify アプリ
  ├─ 商品登録、ブログ投稿、固定ページ更新（PC / スマホ）
  └─ 注文確認、配送、決済、アプリ管理
```

### 1.3 システム責務

| レイヤー | 主な責務 |
|---|---|
| Shopify テーマ | 画面描画、ルーティング（Shopify URL）、HTML 生成、SEO メタデータ、OGP、構造化データ、内部リンク |
| Shopify Products / Collections | 商品主データ、価格、在庫、カテゴリ、販売状態の正本 |
| Product metafields / Metaobjects | 商品補足情報（原材料、飲み方、注意事項、内容量、FAQ）、古民家情報（予約URL、写真、アクセス）|
| Shopify Cart / Checkout | カート・チェックアウト・決済・注文処理 |
| Shopify Blogs | ブログ一覧・詳細。スマホからの投稿・編集対象 |
| Shopify Pages | 古民家ページ、その他固定ページ |
| Shopify Policies | 配送・返品・特商法・プライバシー等の法務 |
| Shopify 標準 contact template | 問い合わせフォーム受付・通知 |
| Theme settings / JSON templates | 管理画面から編集できるテーマ設定・セクション構成 |

### 1.4 Shopify テーマ開発方針

| 項目 | 方針 |
|---|---|
| テーマベース | Online Store 2.0 対応テーマ（Dawn / Horizon 系 / 有料テーマから選定）|
| テーマ管理 | ローカルで Shopify CLI を用いて管理し、Git リポジトリで差分管理する |
| 編集対象 | Liquid テンプレート、JSON templates、sections、snippets、assets（CSS / JS）|
| AI 活用 | Liquid、HTML、CSS、JavaScript、JSON sections の生成・修正補助に AI を活用する |
| レビュー必須 | AI 生成コード・Shopify CLI 反映前に、Liquid 構文・レスポンシブ表示・アクセシビリティ・SEO・Checkout 導線を確認する |
| テーマエディタ | 管理画面で非開発者が画像・見出し・CTA を更新できるよう、section の schema 設定を整備する |
| 差分管理 | カスタム section を増やしすぎず、テーマ更新時の差分管理を可能にする構成にする |

### 1.5 現行開発フェーズ

2026-04-27 時点では「フェーズ0: Shopify 採用判断」が未着手である。Shopify プラン・決済・配送・モック再現範囲・URL/SEO 方針・AI 活用範囲・完全自動化しない範囲の判断を経て、フェーズ1以降へ進む。

---

## 2. サイトマップ

```txt
/ （トップページ）
├── /collections/all （商品一覧）
├── /collections/{handle} （商品カテゴリ一覧）
├── /products/{handle} （商品詳細）
├── /cart （カート）
├── /pages/kominka （古民家紹介）
├── /pages/contact （お問い合わせ）
├── /blogs/stories （ブログ一覧）
│   └── /blogs/stories/{article-handle} （ブログ詳細）
├── /policies/* または /pages/* （法務・配送・返品）
│   ├── 特定商取引法
│   ├── プライバシーポリシー
│   ├── 配送情報
│   └── 返品・交換
├── /search （検索）※任意
├── /pages/about （ブランド紹介）※任意追加
├── /pages/farm （畑紹介）※任意追加
└── /pages/faq （FAQ）※任意追加
```

追加ページ（スコープ調整）:

- ブランド紹介 / 畑紹介 / FAQ を初期から独立させる場合は `/pages/about`、`/pages/farm`、`/pages/faq` を追加する
- スコープを絞る場合は、トップまたは古民家ページ内のセクションとして扱う

### 2.1 URL 設計上の注意

- Shopify 標準の URL 構造（`/products/`、`/collections/`、`/blogs/`、`/pages/`）を正規 URL とする
- オリジナル案 `/products/[slug]` などとは URL が変わるため、既存 URL がある場合はリダイレクト計画を別途作成する
- ブログ URL は初期値として `/blogs/stories` を正規 URL とする。Shopify の `/blogs/` プレフィックスは変更できないため、既存 URL（`/blog` 等）がある場合は Shopify のリダイレクト設定で `/blogs/stories` へ転送する
- 複数コレクションに同一商品が属する場合は canonical と内部リンクの正規導線を確認する

---

## 3. 画面一覧

| 画面ID | Shopify URL 例 | 画面名 | 主データ | テンプレート種別 | 優先度 |
|---|---|---|---|---|---|
| P01 | `/` | トップページ | Theme sections + Products + Blog posts + Metaobjects | JSON template（index） | 必須 |
| P02 | `/collections/all` | 商品一覧 | Shopify Collections / Products | JSON template（collection）| 必須 |
| P03 | `/collections/{handle}` | 商品カテゴリ一覧 | Shopify Collections | JSON template（collection）| 必須 |
| P04 | `/products/{handle}` | 商品詳細 | Shopify Product + metafields | JSON template（product）| 必須 |
| P05 | `/cart` | カート | Shopify Cart | JSON template（cart）| 必須 |
| P06 | `/pages/kominka` | 古民家紹介 | Page + metaobject | JSON template（page.kominka）| 必須 |
| P07 | `/pages/contact` | お問い合わせ | Shopify contact template | JSON template（page.contact）| 必須 |
| P08 | `/blogs/stories` | ブログ一覧 | Shopify Blog | JSON template（blog）| 必須 |
| P09 | `/blogs/stories/{article-handle}` | ブログ詳細 | Shopify Blog post | JSON template（article）| 必須 |
| P10 | `/policies/*` または `/pages/*` | 法務・配送・返品 | Shopify Policies / Pages | policy / page テンプレート | 必須 |
| P11 | `/search` | 検索 | Shopify 標準検索 | JSON template（search）| 任意 |
| P12 | `/pages/about` | ブランド紹介 | Page + metaobject または sections | JSON template（page）| 任意 |
| P13 | `/pages/farm` | 畑紹介 | Page + sections | JSON template（page）| 任意 |
| P14 | `/pages/faq` | FAQ | Page + Metaobjects | JSON template（page）| 任意 |

補足:

- SEO 補助情報（title / meta description / OGP）は全ページで Shopify の検索エンジンリスティング編集機能またはテーマ設定から設定する
- `web_mock/` は依頼者レビュー用の別アプリであり、上表の Shopify 公開サイトとはデータ接続・SEO 対象を分離する

---

## 4. 情報設計・導線設計

### 4.1 主要導線

```txt
トップ
  ├─ 注目商品 → 商品詳細 → カート → Checkout
  ├─ ブログ一覧 → ブログ詳細 → 商品詳細 / 古民家紹介
  ├─ 古民家紹介 → 外部予約リンク
  └─ お問い合わせ導線

商品一覧
  ├─ 商品カテゴリ一覧
  └─ 商品詳細 → カート → Checkout

古民家紹介
  └─ 外部予約リンク（予約サービスまたは Facebook 等）

ブログ詳細
  ├─ 関連商品 → 商品詳細
  ├─ 古民家紹介
  └─ お問い合わせ

フッター
  └─ 法務ページ群（配送・返品・特商法・プライバシー）
```

### 4.2 グローバルナビゲーション

- ロゴ
- 商品（`/collections/all`）
- 古民家（`/pages/kominka`）
- ブログ（`/blogs/stories`）
- お問い合わせ（`/pages/contact`）
- カートアイコン（カート件数表示 / カートドロワー）

ヘッダーにカート件数またはカートドロワー導線を置く。Shopify 標準テーマのカートアイコン表示を活用する。ブランド紹介（`/pages/about`）・畑紹介（`/pages/farm`）は任意ページであり、スコープ確定後にナビゲーション項目へ追加する。

### 4.3 フッター導線

- サイトマップ（主要ページリンク）
- SNS リンク
- 配送情報
- 返品・交換
- 特定商取引法に基づく表記
- プライバシーポリシー
- コピーライト

### 4.4 パンくず設計

パンくずは商品詳細・商品カテゴリ・ブログ詳細・古民家・法務ページで表示する。Shopify 標準テーマのパンくず実装を基本とし、構造化データ `BreadcrumbList` もテーマ側で出力する。

### 4.5 商品一覧の絞り込み・並び順

Shopify 標準のフィルタ・並び順機能を基本として利用する。

| 項目 | 方針 |
|---|---|
| カテゴリ絞り込み | Shopify Collections への導線を利用する |
| 価格帯フィルタ | Shopify 標準の price フィルタを利用する |
| 並び順 | Shopify 標準（おすすめ順、新着順、価格昇順・降順）を提供する |
| タグ絞り込み | Shopify 標準のタグフィルタを利用する |
| 在庫絞り込み | 在庫ありのみ表示する Shopify 標準フィルタを利用できる |

---

## 5. データ設計概要

### 5.1 データソース別責務

| データ領域 | 正本 | 主な利用ページ |
|---|---|---|
| 商品主データ、価格、在庫、決済、注文 | Shopify Products | 商品一覧、商品詳細、カート、Checkout |
| 商品カテゴリ | Shopify Collections | 商品一覧、商品カテゴリ一覧 |
| 商品補足情報 | Product metafields | 商品詳細（原材料、飲み方、注意事項、内容量）|
| 商品 FAQ | Product metafields または Metaobjects | 商品詳細、FAQ ページ |
| 古民家情報 | Page + Metaobject | 古民家紹介ページ（予約URL、写真、アクセス）|
| ブログ記事 | Shopify Blogs / Blog posts | ブログ一覧、ブログ詳細、トップ最新記事 |
| トップセクション | Theme settings / sections | トップページ（画像、見出し、CTA）|
| 法務・配送・返品 | Shopify Policies / Pages | 法務ページ群 |
| 問い合わせ通知先 | Shopify ストア通知設定（差出人メール）| お問い合わせ |
| SEO 補助情報 | Shopify 検索エンジンリスティング / Theme settings | 全ページ |

### 5.2 Shopify Metafields 定義方針

商品詳細表示に必要な補足情報は Shopify Product metafields として定義する。

| metafield | namespace / key 例 | 説明 | 型 |
|---|---|---|---|
| 原材料 | `custom.ingredients` | 商品の原材料・原料 | テキスト |
| 飲み方 | `custom.how_to_use` | 飲み方・使い方 | テキスト（rich text）|
| 注意事項 | `custom.caution` | 注意事項・アレルギー | テキスト |
| 内容量 | `custom.quantity` | 内容量・規格 | テキスト |
| 関連商品 | `custom.related_products` | 関連商品リスト | Product list（`list.product_reference`）|

商品 FAQ は再利用性を重視する場合 Metaobjects として定義し、商品詳細ページから参照する。

### 5.3 古民家 Metaobject 定義方針

古民家情報は Shopify Metaobject（`kominka_info` 等）として定義し、固定ページテンプレートから参照する。

| フィールド名 | 型 | 説明 |
|---|---|---|
| reservation_url | url | 外部予約サービスへの URL |
| access_text | テキスト | アクセス・住所・駐車場 |
| gallery_images | ファイルリスト（`list.file_reference`）| 施設写真 |
| notes | テキスト（rich text）| 注意事項・利用案内 |

予約 URL はページ本文へ直書きせず、Metaobject のフィールドとして管理し、管理画面から更新できるようにする。

### 5.4 データ取得タイミング

| データ | 取得タイミング | 備考 |
|---|---|---|
| 商品・コレクション | ページリクエスト時（Shopify Liquid レンダリング）| Shopify 標準 |
| ブログ記事 | ページリクエスト時（Shopify Liquid レンダリング）| Shopify 標準 |
| Metafields / Metaobjects | ページリクエスト時（Liquid 経由）| Shopify 標準 |
| Theme settings | テーマ設定の JSON として管理 | テーマエディタから更新 |
| 問い合わせ送信 | フォーム送信時 | Shopify 標準 contact フォーム |

---

## 6. テーマ・コンポーネント設計

Shopify テーマは sections / blocks / snippets / JSON templates の組み合わせで構成する。

### 6.1 カスタム Section 一覧

本表はテーマベースに対して新規追加または大幅改修が必要な主なカスタム Section を示す。Shopify テーマが標準で提供する Section（`main-product`、`main-collection`、`cart-items` 等）は含まない。`hero-banner` は複数ページで共通利用する汎用 Section である。

| Section 名 | 用途 | テーマエディタ対応 |
|---|---|---|
| `hero-banner` | ヒーロー画像・見出し・CTA（トップ / 商品一覧 / 古民家 / ブログ）| ○ |
| `featured-products` | 注目商品リスト（トップ）| ○ |
| `product-card` | 商品カード（商品一覧 / トップ注目商品）| ○ |
| `brand-intro` | ブランド紹介テキスト・画像（トップ）| ○ |
| `kominka-cta` | トップページ 古民家誘導（画像・見出し・リンク）| ○ |
| `kominka-gallery` | 古民家写真ギャラリー | ○ |
| `kominka-access` | 古民家アクセス情報 | ○ |
| `reservation-cta` | 外部予約リンク CTA | ○ |
| `latest-blog` | 最新ブログ記事一覧（トップ）| ○ |
| `blog-card` | ブログカード（ブログ一覧）| ○ |
| `faq-list` | FAQ 一覧表示 | ○ |
| `contact-cta` | お問い合わせ誘導 CTA（各ページ下部）| ○ |
| `product-metafields` | 商品詳細の補足情報表示（原材料・飲み方等）| △ |
| `breadcrumb` | パンくず表示 | - |

凡例: ○ = テーマエディタから全設定を編集可能 / △ = テーマエディタから一部設定のみ編集可能 / - = テーマエディタ非対応（開発者がコードで直接管理）

### 6.2 テーマ設計方針

| 項目 | 方針 |
|---|---|
| ブランドカラー | `web_mock/` を参照し、テーマ CSS 変数で定義する |
| 書体 | `web_mock/` を参照し、フォント読み込みをテーマ assets に含める |
| 余白・スペーシング | `web_mock/` のレイアウトを基準に Section schema で調整可能にする |
| ボタンスタイル | Primary / Secondary ボタンをテーマ CSS で定義する |
| レスポンシブ | モバイルファーストを基本とし、テーマの標準レスポンシブ設計を活用する |
| アクセシビリティ | テーマの基本アクセシビリティ（色・見出し階層・フォームラベル）を維持する |

### 6.3 JSON テンプレート構成方針

| テンプレート | ファイル名例 | 主な Section 構成 |
|---|---|---|
| トップページ | `templates/index.json` | hero-banner, brand-intro, featured-products, kominka-cta, latest-blog, contact-cta |
| 商品一覧 | `templates/collection.json` | hero-banner, product-grid |
| 商品詳細 | `templates/product.json` | product-media, product-info, product-metafields, faq-list, related-products |
| カート | `templates/cart.json` | cart-items, cart-footer |
| 古民家 | `templates/page.kominka.json` | hero-banner, kominka-gallery, kominka-access, reservation-cta, faq-list |
| 問い合わせ | `templates/page.contact.json` | Shopify 標準 contact フォーム（カスタム section 追加不要）|
| ブログ一覧 | `templates/blog.json` | hero-banner, blog-grid |
| ブログ詳細 | `templates/article.json` | hero-banner, article-content, related-products, contact-cta |

---

## 7. 技術構成設計

| 技術 | 採用値 | 用途 |
|---|---|---|
| Shopify Online Store | 最新プラン（Basic 以上を確認）| 公開サイト・EC・ブログ・問い合わせ・決済の統合基盤 |
| Liquid | Shopify テーマ言語 | ページテンプレート・Section・Snippet の実装 |
| JSON templates | Shopify テーマ仕様 | ページごとの Section 構成定義 |
| CSS | テーマ assets | スタイリング（`web_mock/` を基に調整。SCSS 使用時は Shopify CLI のビルドプロセスが必要）|
| JavaScript | テーマ assets | カートドロワー、モーダル等のインタラクション |
| Shopify CLI | 最新版 | ローカル開発・テーマ pull / push / dev |
| Shopify Admin API | 最新版 | 初期商品投入補助（商品 CSV または API）|
| Shopify Metafields / Metaobjects | Shopify 標準 | 商品補足情報・古民家情報の構造化データ |
| Shopify Blogs | Shopify 標準 | ブログ投稿・管理 |
| Shopify Payments 等 | 確認後確定 | 決済処理 |
| GA4 | `gtag.js` またはテーマ設定 | アクセス計測 |

### 7.1 モック構成方針（開発中）

| 項目 | 方針 |
|---|---|
| 実装形態 | `web_mock/` 別アプリ（Next.js）|
| 用途 | 依頼者向けのデザイン確認・導線確認 |
| データ | ダミーデータ固定。Shopify には接続しない |
| SEO | `robots.txt` と metadata で `noindex` |
| 位置付け | Shopify テーマ実装時の参照元として利用する |

### 7.2 問い合わせ設計方針

| 項目 | 方針 |
|---|---|
| 実装基盤 | Shopify 標準 contact template |
| 入力項目 | 氏名、メールアドレス、本文（標準）|
| 追加項目 | 問い合わせ種別・電話番号等が必要な場合はテーマコード改修またはフォームアプリを検討 |
| 送信先 | Shopify ストア通知設定（差出人メール）で管理 |
| スパム対策 | 初期は Shopify 標準の範囲で運用。高度なスパム対策は初期スコープ外 |
| CRM 連携・添付ファイル | 初期スコープ外 |

---

## 8. デプロイ・運用設計

### 8.1 Shopify テーマ管理フロー

```txt
ローカル（Shopify CLI）
  ├─ shopify theme pull   ：最新テーマをローカルへ取得
  ├─ shopify theme dev    ：ローカルプレビューでレビュー確認
  ├─ AI 支援によるコード生成・修正
  ├─ Liquid構文・レスポンシブ・SEO・Checkout導線を確認
  └─ shopify theme push   ：確認済みコードをストアへ反映

Git リポジトリ
  └─ テーマソース（Liquid / JSON / CSS / JS）を差分管理
```

### 8.2 テーマ公開・ロールバック方針

| 操作 | 方針 |
|---|---|
| テーマ公開 | Shopify 管理画面でプレビュー確認後に公開テーマとして設定する |
| バックアップ | 変更前のテーマを Shopify 管理画面で複製してバックアップを保持する |
| ロールバック | 前バージョンのテーマを管理画面から公開テーマに戻す |
| 本番反映判断 | 人間が表示確認・Checkout 動作確認を経てから本番反映を承認する |

### 8.3 Shopify ストア設定管理

決済・配送・税・法務・アプリ・ドメイン・SSL・通知設定は Shopify 管理画面で人間が確認・設定する。これらは自動化の対象外とする。

| 設定領域 | 確認担当 |
|---|---|
| 決済方法（Shopify Payments 等）| 依頼者 |
| 配送設定（送料・地域・日数）| 依頼者 / 開発 |
| 法務ページ・ポリシー | 依頼者 / 開発 |
| ドメイン・SSL | 依頼者 / 開発 |
| 通知先メール | 依頼者 / 開発 |
| アプリ設定 | 依頼者 / 開発 |

### 8.4 障害時の方針

- テーマ push に失敗した場合はバックアップテーマを公開テーマとして設定し、直前の状態に戻す
- Shopify 側の障害はステータスページ（status.shopify.com）を確認し、復旧を待つ
- 問い合わせフォームの通知が届かない場合は Shopify 通知設定・差出人メールを確認する
- AI 生成コードによるレイアウト崩れ・Checkout 導線への影響が発生した場合は即座にロールバックする

---

## 9. SEO・セキュリティ実装方針

### 9.1 SEO 実装方針

| 項目 | 実装方針 |
|---|---|
| title / meta description | Shopify 検索エンジンリスティング編集機能を全ページで利用する |
| OGP | テーマ側で `og:title`、`og:description`、`og:image` を出力する |
| sitemap | Shopify が `/sitemap.xml` を自動生成する |
| robots.txt | Shopify が自動生成。カスタマイズが必要な場合は `robots.txt.liquid` テンプレートを作成して上書きする |
| canonical | Shopify 標準 URL を正規とし、テーマ側で正規 URL を出力する |
| SSL | Shopify 標準で全ページ HTTPS |
| CDN | Shopify CDN を活用し表示速度を確保する |
| 構造化データ | テーマ側で主要型を出力する（下表参照）|

### 9.2 構造化データ出力方針

| 対象 | 型 |
|---|---|
| 全ページ共通 | `WebSite`、`Organization` |
| パンくず表示ページ | `BreadcrumbList` |
| 商品詳細 | `Product`（`Offer` は販売中かつ価格が設定されている商品に出力。`availability` は在庫状況に応じて `InStock` / `OutOfStock` を設定）|
| ブログ詳細 | `Article` |
| FAQ ページ | `FAQPage` |
| 古民家紹介 | `LocalBusiness`（宿泊提供が確定した場合は `LodgingBusiness` を再検討）|

### 9.3 SEO の制約と方針

| 領域 | 強み / 制約 | 方針 |
|---|---|---|
| 基本 SEO | title / meta description / sitemap / canonical / SSL が整いやすい | Shopify 標準機能を最大限活用する |
| 表示速度 | CDN 配信・レスポンシブテーマで有利 | 重いアプリ・過剰な JS を避ける |
| URL 構造 | `/products/`、`/collections/`、`/blogs/` 等が固定で自由度が低い | Shopify 標準 URL を受け入れ、旧 URL がある場合はリダイレクト |
| 重複コンテンツ | 複数コレクション・バリエーションで重複が起きやすい | canonical 確認・コレクション設計・内部リンク整理で対処 |
| コンテンツ SEO | ブログ機能は本格メディア SEO には制約がある | 初期は商品 SEO・コレクション SEO を優先。SEO 重視の場合はオリジナル案と比較検討 |

### 9.4 セキュリティ実装方針

| 項目 | 方針 |
|---|---|
| 決済・注文情報 | Shopify 標準機能に委譲し、独自実装は行わない |
| 秘密情報管理 | Shopify CLI / Admin API / テーマ連携の認証情報はリポジトリへ保存しない。ローカル環境または CI の秘密情報として管理する |
| AI 生成コード | レビューを経てからストアへ反映する。本番環境へ未レビューのコードを直接 push しない |
| アプリ選定 | サードパーティアプリ導入時はデータアクセス権限を確認し、不要な権限を持つアプリを避ける |
| テーマ公開 | 開発テーマと公開テーマを分離し、確認前のコードを本番公開しない |
| セキュリティヘッダー | X-Frame-Options / X-Content-Type-Options / HSTS 等は Shopify プラットフォームが標準で付与するため、テーマ側での個別設定は不要 |

### 9.5 GA4 計測方針

GA4 は Shopify テーマ設定または `gtag.js` をテーマ assets に含めて導入する。Cookie とアクセス解析の利用方針はプライバシーポリシーページに明記する。

| イベント | 発火タイミング |
|---|---|
| `view_item` | 商品詳細表示 |
| `add_to_cart` | カートへ追加 |
| `begin_checkout` | Checkout 開始 |
| `purchase` | 注文完了 |
| `generate_lead` | お問い合わせ送信完了 |
| `click_reservation` | 古民家の外部予約リンククリック |
| `view_article` | ブログ詳細表示 |

### 9.6 画像 SEO・画像最適化方針

- 商品画像・ブログ画像・古民家画像は Shopify CDN のレスポンシブ画像変換（`image_url` フィルタ）を活用し、表示サイズに対して過大な画像を避ける
- 商品画像には説明的なファイル名と alt テキストを設定する（登録時に確認）
- ブログのアイキャッチ画像にも適切な alt テキストを設定する
- OGP 画像は Shopify の検索エンジンリスティング画像設定または Theme settings で管理する
- 重いアプリや外部スクリプトの過剰導入を避け、ページ読み込み速度を維持する

### 9.7 薬機法・景品表示法への対応方針

- AI 生成文（商品説明・SEO 文案・ブログ下書き等）は、薬機法・景品表示法・健康効果表現・ブランドトーンの観点で人間が確認してから公開する
- 医薬的効能を断定する表現、体質改善や治療効果を保証する表現は避ける

---

## 10. 開発ロードマップ

本章は `docs/ロードマップ/開発ロードマップ_Shopify案.md` の要約であり、進捗管理の正本はロードマップ側とする。

| フェーズ | 目的 | 主な作業 | 完了条件 |
|---|---|---|---|
| フェーズ0: Shopify 採用判断 | Shopify 案の前提を確認 | プラン・決済・配送・モック再現範囲・URL/SEO 方針・AI 活用範囲・完全自動化しない範囲を判断 | Shopify 案 Go / Hold を記録 |
| フェーズ1: ストア初期設定 | Shopify 運用土台を作る | ストア作成・基本情報・決済・配送・法務・ドメイン・metafields / metaobjects 定義 | 商品・決済・配送・法務・ドメインが設定可能な状態 |
| フェーズ2: AI 支援テーマ基盤構築 | モック再現用のテーマ土台を作る | Shopify CLI 環境構築・Header / Footer・ブランドカラー / 書体・共通 Section・AI レビュー手順 | プレビューで基本レイアウトが確認できる |
| フェーズ3: 主要ページ実装 | トップ・商品・カート・古民家・問い合わせ・ブログを実装 | 各 JSON template・Section・Snippet を実装し、`web_mock/` を可能な範囲で再現 | 必須ページと Checkout 導線が Shopify 上で閲覧・編集可能 |
| フェーズ4: データ投入・運用確認 | 商品・ブログ・古民家情報を登録 | 商品データ・metafields・コレクション・ブログ・古民家情報を登録。スマホ投稿・注文テストを確認 | スマホでブログ更新・商品編集・問い合わせ・注文テストが確認できる |
| フェーズ5: SEO・移行・公開準備 | 公開判定 | title / meta description・SEO キーワード・画像 alt・内部リンク・canonical・GA4・構造化データ・公開前チェック | SEO・URL・計測・総合確認が完了し、本番公開 Go 判断ができる |

---

## 11. 初期対象外

- Next.js 公開サイト
- ConoHa WING への静的サイト配信
- 外部EC リンクのみの購入導線
- 独自予約システム
- 独自問い合わせ API（PHP / Vercel Functions 等）
- Shopify Checkout の大幅な独自デザイン
- モックからの完全自動サイト生成
- 決済・配送・アプリ設定の完全自動化
- 高度な CMS 承認フロー
- 多言語対応
- ヘッドレス Shopify（Storefront API + Next.js 等の外部フロントエンド）

---

## 12. 制約・注意点

- モックデザインは「できるだけ再現」とし、Shopify テーマ・Checkout・アプリ制約により完全一致は保証しない
- Shopify 標準の URL 構造に寄せるため、オリジナル案の URL 設計とは異なる。既存 URL がある場合はリダイレクト計画を別途作成する
- Shopify は基本 SEO に強い一方、URL 構造とブログ機能の自由度は低い。SEO 重視の場合はオリジナル案またはヘッドレス構成との比較判断を行う
- 問い合わせフォームの件名・詳細な送信仕様は Shopify 標準では制約があるため、追加要件がある場合はアプリ選定が必要
- 商品・ブログ・古民家情報を Shopify に集約するため、将来オリジナルサイトへ戻す場合はデータ移行設計が必要
- カート・Checkout・決済・注文通知・配送・税・ポリシー・ドメイン・SSL は公開前に本番相当条件で確認する

---

## 13. 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|---|---|---|---|
| 2026-04-27 | 1.0.0 | Codex | Shopify 案として初版作成。要件定義書 v1.2.0・ロードマップ v1.2.0・オリジナル案基本設計書 v1.5.1 を参照し、Shopify 上で完結するサイト設計を定義 |
| 2026-04-27 | 1.0.1 | Codex | セルフレビュー（4回）を実施。Section 一覧・JSON テンプレート構成・URL 設計・metafield 型・robots.txt・構造化データ・セキュリティヘッダー等の表記を修正 |
| 2026-04-27 | 1.0.1 | Codex | セルフレビュー（4回）を実施。Section 一覧・JSON テンプレート構成・URL 設計・metafield 型タrobots.txt・構造化データ・セキュリティヘッダー等の表記を修正 |

---

*以上*
