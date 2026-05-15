# サイト詳細設計書_Shopify案

| 項目 | 内容 |
|---|---|
| ドキュメント名 | サイト詳細設計書_Shopify案 |
| バージョン | 1.1.6 |
| 作成日 | 2026-04-27 |
| 最終更新日 | 2026-05-07 |
| ステータス | Shopify正規方針・実装反映・SEO/メタデータ・ブランド名称反映済み |
| 参照要件 | `docs/要件定義/サイト要件定義書_Shopify案.md` v1.2.6 |
| 参照基本設計 | `docs/サイト設計/サイト基本設計書_Shopify案.md` v1.0.7 |
| 参照ロードマップ | `docs/ロードマップ/開発ロードマップ_Shopify案.md` v1.3.4 |

---

## 1. 詳細設計前提

- 公開サイト、商品管理、決済、ブログ、問い合わせ、法務ページは Shopify に集約する
- サイト名 / ブランド名は `四国ボタニカ` とする。英字表記が必要な箇所は、イタリア語 botanica（植物・植物学）由来の推定に基づく `Shikoku Botanica` を暫定採用し、正式綴り確認後に差し替える
- OGP、Organization説明、ヘッダー・フッター、seedのSEO title / descriptionでは、四国の植物・薬草の知恵を扱うボタニカルブランドとして説明する
- 独自の Next.js 公開サイト・ConoHa 静的配信・外部 EC リンク運用は採用しない
- テーマは Online Store 2.0 対応テーマ（Dawn / Horizon 系 / 有料テーマから選定）をベースとし、Liquid / JSON templates / sections / snippets / assets をカスタマイズする
- テーマはローカルで作成・検証し、初回はZIPアップロード、以後の更新はShopify CLI `theme push` を正規運用とする。反映前に `shopify theme check --path .` を実行し、ライブテーマへ反映する場合はTheme Access tokenと `--allow-live` を使う
- `web_mock/` のデザイン（トップ、商品、カート、古民家、問い合わせ、ブログ）を可能な範囲で再現することを目標とするが、Shopify テーマ・Checkout・アプリ制約により完全一致は保証しない
- テーマカラーは暫定で `MOSS` を基準にする。後続レビューで変更される可能性があるため、テーマ設定と CSS 変数で差し替えやすく管理する
- AI 生成コードはそのまま本番反映せず、Liquid 構文・レスポンシブ表示・アクセシビリティ・SEO・Checkout 導線への影響を確認してから反映する
- 商品・決済・配送・法務・アプリ設定は人間が Shopify 管理画面で確認・設定する
- 薬機法・景品表示法に抵触する表現（医薬的効能を断定する記述等）は AI 生成文を含めすべて人間が確認してから公開する

### 1.1 アプリ構成

| アプリ / モジュール | 役割 | 実行基盤 |
|---|---|---|
| `web_mock/` | 依頼者確認用の静的モック（ダミーデータ）| 静的ホスティング（Shopify に接続しない）|
| Shopify Online Store | 公開サイト・EC・ブログ・問い合わせ・決済・法務 | Shopify（CDN 配信 / HTTPS）|
| Shopify CLI | ローカルでのテーマ開発・pull / dev / check / package | ローカル開発環境 |

### 1.2 環境構成

| 環境 | 配備対象 | 用途 |
|---|---|---|
| `mock_review` | `web_mock/` | 依頼者向けデザイン確認 |
| ローカルテーマソース | `web_shopify/` | Liquid / JSON templates / sections / snippets / assets の編集、Git管理、ZIP生成 |
| Shopify テーマライブラリ | Shopify 管理画面（非公開テーマ）| ZIPアップロード後のプレビュー確認、テーマエディタ調整 |
| Shopify 本番テーマ | Shopify 管理画面（公開テーマ）| 本番公開 |

---

## 2. ルーティング詳細

Shopify 標準の URL 構造を正規 URL とし、テーマカスタマイズや任意追加ページを含む全ルートを以下に示す。

| ルートID | Shopify URL | 画面名 | テンプレートファイル | 優先度 |
|---|---|---|---|---|
| P01 | `/` | トップページ | `templates/index.json` | 必須 |
| P02 | `/collections/all` | 商品一覧（全商品）| `templates/collection.json` | 必須 |
| P03 | `/collections/{handle}` | 商品カテゴリ一覧 | `templates/collection.json` | 必須 |
| P04 | `/products/{handle}` | 商品詳細 | `templates/product.json` | 必須 |
| P05 | `/cart` | カート | `templates/cart.json` | 必須 |
| P06 | `/pages/kominka` | 古民家紹介 | `templates/page.kominka.json` | 必須 |
| P07 | `/pages/contact` | お問い合わせ | `templates/page.contact.json` | 必須 |
| P08 | `/blogs/stories` | ブログ一覧 | `templates/blog.json` | 必須 |
| P09 | `/blogs/stories/{article-handle}` | ブログ詳細 | `templates/article.json` | 必須 |
| P10 | `/policies/shipping-policy` | 配送情報 | Shopify 標準 policy テンプレート | 必須 |
| P11 | `/policies/refund-policy` | 返品・交換 | Shopify 標準 policy テンプレート | 必須 |
| P12 | `/policies/legal-notice` | 特定商取引法に基づく表記 | Shopify 標準 policy テンプレート | 必須 |
| P13 | `/policies/privacy-policy` | プライバシーポリシー | Shopify 標準 policy テンプレート | 必須 |
| P14 | `/search` | 検索 | `templates/search.json` | 任意 |
| P15 | `/pages/about` | ブランド紹介 | `templates/page.json` | 任意 |
| P16 | `/pages/farm` | 畑紹介 | `templates/page.json` | 任意 |
| P17 | `/pages/faq` | FAQ | `templates/page.faq.json` | 任意 |
| - | `/account/*` | マイアカウント | Shopify 標準 | 必須（Shopify 自動生成）|
| - | `/checkout` | チェックアウト | Shopify 標準 Checkout | 必須（Shopify 自動生成）|
| - | `404` | ページ未検出 | `templates/404.json` | 必須 |

### 2.1 URL 設計上の注意事項

- Shopify 標準 URL プレフィックス（`/products/`、`/collections/`、`/blogs/`、`/pages/`、`/policies/`）は変更不可のため、設計上そのまま受け入れる
- 旧 URL（旧Next.js案の `/products/[slug]`、`/kominka` 等）が告知済み・外部リンク済みの場合は、Shopify 管理画面の URL リダイレクト設定で転送先を設定する
- 複数コレクションに同一商品が属する場合は `canonical` の出力方針を確認し、重複コンテンツを避ける
- ブログ URL は `/blogs/stories` を正規 URL とする。`/blogs/` プレフィックスは変更不可のため、既存 URL がある場合はリダイレクト設定で対応する

---

## 3. 画面詳細設計

### 3.1 トップページ（`/`）

#### セクション構成

| セクション | Section ファイル | 主データ | テーマエディタ対応 |
|---|---|---|---|
| ヒーロー | `hero-banner` | Theme settings / section schema | ○ |
| ブランド紹介 | `brand-intro` | Theme settings / section schema | ○ |
| 注目商品 | `featured-products` | Shopify Products（collection handle 指定）| ○ |
| 古民家誘導 | `kominka-cta` | Theme settings / section schema | ○ |
| 最新ブログ | `latest-blog` | Shopify Blog（最新 3〜4 件）| ○ |
| お問い合わせ CTA | `contact-cta` | Theme settings / section schema | ○ |

#### 仕様

- ヒーロー画像・見出し・CTA テキスト・CTA リンクはテーマエディタから更新できること
- 注目商品はコレクション指定で自動取得し、3〜8件をPC・スマホとも2列で表示する
- トップの注目商品カードは簡易表示とし、画像と商品名のみを表示する。価格、説明文、数量、カート追加ボタンは表示しない
- 最新ブログはブログ `stories` から自動取得し、新しい記事を上にした縦リストで表示する。タイトルを主導線にし、画像は小サムネイルとして本文を邪魔しないサイズに抑える
- 商品・ブログはデータ登録後に自動反映する。管理画面での手動切り替えは不要
- モバイルファーストで実装し、ヒーロー画像はレスポンシブ対応（PC / SP で縦横比を調整）

### 3.2 商品一覧（`/collections/all`、`/collections/{handle}`）

#### セクション構成

| セクション | Section ファイル / 方針 | 備考 |
|---|---|---|
| コレクションヒーロー | `hero-banner` | コレクション導入の画像・タイトルを表示 |
| 商品一覧 | `main-collection` | フィルタ・並び順・ページネーション含む |

#### 仕様

| 要素 | 仕様 |
|---|---|
| フィルタ | Shopify 標準フィルタ（カテゴリ、価格帯、タグ、在庫）を利用 |
| 並び順 | Shopify 標準（おすすめ順、新着順、価格昇順・降順）|
| 表示件数 | 1 ページあたり 12〜24 件（テーマ設定で調整可）|
| 商品カード | 画像、商品名、価格、NEWバッジ |
| ページネーション | Shopify 標準ページネーション |

- コレクション画像・説明文は Shopify 管理画面のコレクション設定で管理する
- `collections/all` の表示順はデフォルト順（管理画面で調整可能）
- 商品カード画像は商品詳細へのリンクにする
- 商品一覧の商品カードには説明文、数量指定、カート追加ボタンを置かない
- 数量指定、在庫あり / なし、カート追加ボタンは商品詳細テンプレートに置く
- `NEW` バッジは商品タグ `new`、または公開後60日以内の商品に表示する
- 数量選択 UI は `web_mock/` と同様に最大 9 個までを基準とし、Shopify の在庫数・販売可否がそれ未満の場合は Shopify 正本に合わせて制限する

### 3.3 商品詳細（`/products/{handle}`）

#### レイアウト

```txt
[Breadcrumb]
[product-media（左）] [product-info（右）]
                       - 商品名
                       - 価格
                       - バリエーション選択（ある場合）
                       - 数量選択
                       - カートに追加ボタン
                       - 配送・返品ポリシーリンク
[product-metafields]
  - 詳細説明
  - 内容量（custom.quantity）
  - 原材料（custom.ingredients）
  - 飲み方（custom.how_to_use）
  - 注意事項（custom.caution）
[faq-list（商品 FAQ）]
[related-products（関連商品）]
```

#### セクション構成

| セクション | Section / Snippet ファイル | 主データ | テーマエディタ対応 |
|---|---|---|---|
| 商品メディア | `main-product`（media 部）| `product.images` | △（商品登録時）|
| 商品情報 | `main-product`（info 部）| `product` オブジェクト | △（商品登録時）|
| 補足情報 | `product-metafields`（カスタム section）| Product metafields | △ |
| 商品 FAQ | `faq-list`（カスタム section）| Product metafields / Metaobjects | △ |
| 関連商品 | `related-products`（カスタム section）| `product.metafields.custom.related_products` / 同一コレクション / fallback商品 | △ |
| パンくず | `breadcrumbs` snippet | Shopify ルーティング | - |

#### 仕様

- 購入ボタンは Shopify 標準の「カートに追加」ボタンとし、カート画面または Ajax カートドロワーへ遷移する
- バリエーション（容量違い等）がある場合は Shopify 標準のバリアント選択 UI を利用する
- 価格は Shopify Products の price フィールドを正本とする
- 在庫状態は Shopify 在庫管理に従い、品切れ時は「カートに追加」ボタンを無効化する
- 在庫あり / なしを購入操作付近にテキスト表示する
- 数量選択は在庫数と販売可否に応じて制御し、選択肢は最大 9 個までを基準とする
- 補足情報（原材料・飲み方・注意事項・内容量）は metafields が未入力の場合は表示しない
- FAQ は商品 metafields に紐づくMetaobjectがある場合は商品別に表示し、未登録の場合は `product.json` のsection blockで定義した共通FAQを表示する
- 関連商品は `custom.related_products` metafield を優先し、未設定時は同一コレクションの商品、さらに未取得時はテーマ内のfallback商品を表示する
- 構造化データ `Product` + `Offer`（販売中かつ価格設定済みの商品）+ `BreadcrumbList` を出力する

### 3.4 カート（`/cart`）

#### セクション構成

| セクション | Section / 方針 | 備考 |
|---|---|---|
| カート | `main-cart` | 商品名・画像・価格・数量変更・削除・小計・Checkout導線 |

#### 仕様

- カートアイテムの数量変更・削除は Shopify 標準機能で実装する
- 小計はカートアイテムの合計金額を表示する（税・送料は Checkout で確定）
- チェックアウトボタンは Shopify 標準 Checkout へ遷移する
- カートドロワー（Ajax カート）の採用はテーマベース選定後に判断する
- カートが空の場合は「商品を見る」導線を表示する
- ヘッダーのカート導線はアイコンのみで表示し、カート件数バッジを重ねる
- カート件数は 99 点を上限表示とし、100 点以上は `99+` と表示する

### 3.5 古民家紹介（`/pages/kominka`）

#### セクション構成

| セクション | Section ファイル | 主データ | テーマエディタ対応 |
|---|---|---|---|
| ヒーロー | `hero-banner` | Theme settings / section schema | ○ |
| 施設概要 | Page 本文 or `kominka-overview` | Shopify Page 本文 | ○ |
| 写真ギャラリー | `kominka-gallery` | section blocks / image settings | ○ |
| アクセス | `kominka-access` | page metafield `custom.access_text` / section setting | ○ |
| 予約 CTA | `reservation-cta` | page metafield `custom.reservation_url` / section setting | ○ |
| FAQ（古民家）| `faq-list` | section blocks / Metaobjects（拡張時）| ○ |

#### 仕様

- 予約 URL は page metafield `custom.reservation_url` を優先し、未設定時はsection setting、さらに未設定時はお問い合わせ導線へフォールバックする
- 初期実装ではMetaobject `kominka_info` は作らず、写真・FAQ・施設情報を複数件管理する拡張時に追加する
- 写真ギャラリーは PC / SP でレイアウトを切り替える（PC: 2〜3 カラム、SP: 1〜2 カラム）
- 構造化データ `LocalBusiness` を出力する。宿泊提供が確定した場合は `LodgingBusiness` を再検討する
- パンくずを表示し `BreadcrumbList` を出力する

### 3.6 お問い合わせ（`/pages/contact`）

#### 入力項目（Shopify contact form + `main-page-contact` 初期実装）

| 項目 | 型 | 必須 | 初期実装 | 備考 |
|---|---|---|---|---|
| `contact[name]` | text | 必須 | ○ | 氏名 |
| `contact[email]` | email | 必須 | ○ | メールアドレス |
| `contact[phone]` | tel | 任意 | 実装済み | `show_phone` で表示制御 |
| `contact[body]` | textarea | 必須 | ○ | 問い合わせ本文 |
| `contact[お問い合わせ種別]` | select | 任意 | 実装済み | topic blockで選択肢を管理 |
| `contact[プライバシーポリシー同意]` | checkbox | 必須 | 実装済み | `show_privacy` 有効時に表示 |

#### 仕様

- Shopify 標準の `{% form 'contact' %}` を使い、表示UIは `main-page-contact` sectionで管理する
- 電話番号・問い合わせ種別・プライバシー同意チェックは初期実装に含める。添付ファイルやCRM連携が必要な場合はフォームアプリ（Hulk Contact Form 等）を検討する
- 送信先は Shopify ストア設定の「通知先メール（差出人メール）」で管理する
- 送信後は Shopify 標準の完了メッセージを表示する
- スパム対策は初期は Shopify 標準の範囲で運用する
- CRM 連携・添付ファイル受付は初期スコープ外

#### フォーム送信フロー

```txt
1. 利用者がフォームに入力
2. Shopify 標準フォーム送信（POST /contact）
3. Shopify がフォームデータを受信
4. 設定済み通知先メールへ通知メールを送信
5. 完了メッセージを同一ページ内で表示
```

### 3.7 ブログ一覧（`/blogs/stories`）

#### セクション構成

| セクション | Section ファイル | 主データ | テーマエディタ対応 |
|---|---|---|---|
| ヒーロー | `hero-banner` | Theme settings / section schema | ○ |
| BLOG一覧 | `main-blog` | Shopify Blog posts | △ |

#### 仕様

| 要素 | 仕様 |
|---|---|
| 一覧要素 | 公開日、タイトル、短い抜粋、タグ、任意の小サムネイル |
| 表示件数 | 1 ページあたり 12 件（テーマ設定で調整可）|
| ソート | 公開日降順（新しい記事を上に表示）|
| ページネーション | Shopify 標準ページネーション |
| タグ表示 | 枠線なし、`#`付きの青系テキストリンク |

- 一覧はカードグリッドではなく縦並びのテキスト中心表示にする
- 画像がある記事だけ右側または末尾に小サムネイルを表示し、本文・タイトルの読みやすさを優先する

### 3.8 ブログ詳細（`/blogs/stories/{article-handle}`）

#### セクション構成

| セクション | Section ファイル | 主データ | テーマエディタ対応 |
|---|---|---|---|
| 記事メインコンテンツ | テーマ標準 `main-article` | Shopify Article | - |
| お問い合わせ CTA | `contact-cta` | Theme settings / section schema | ○ |

#### 仕様

- 記事タイトル・本文・公開日・アイキャッチ・著者・タグは Shopify Blog posts から取得する
- 記事本文は Shopify リッチテキストエディタで記述した HTML を表示する
- アイキャッチ画像は本文幅に合わせ、PCでも過大にならない最大幅で表示する
- タグはBLOG一覧と同じく枠線なしの `#` 付きテキストリンクで表示する
- 関連商品表示は任意拡張とし、採用する場合は Article metafields（`custom.related_products`）と `related-products` sectionを `article.json` に追加する
- 構造化データ `Article` + `BreadcrumbList` を出力する
- SNS シェアボタンはテーマ選定後に採否を判断する

### 3.9 法務・ポリシーページ（`/policies/*`）

| Shopify URL | ページ名 | 管理場所 |
|---|---|---|
| `/policies/shipping-policy` | 配送情報 | Shopify 管理画面 > ポリシー |
| `/policies/refund-policy` | 返品・交換 | Shopify 管理画面 > ポリシー |
| `/policies/legal-notice` | 特定商取引法に基づく表記 | Shopify 管理画面 > ポリシー |
| `/policies/privacy-policy` | プライバシーポリシー | Shopify 管理画面 > ポリシー |

#### 仕様

- 各ポリシーは Shopify 管理画面のポリシー設定から直接編集する
- Shopify 標準の `policy` テンプレートをベースに、テーマのスタイルを適用する
- 各ポリシーには最終確認日（`lastVerifiedAt`）を本文に明記し、確認済みの日付を管理する
- フッターのポリシーリンクは Shopify テーマのフッターメニューで設定する

### 3.10 404 ページ

- `templates/404.json` または `templates/404.liquid` でカスタム 404 ページを実装する
- トップページへの導線・商品一覧への導線・検索フォームを表示する

---

## 4. コンポーネント（Section / Snippet）詳細設計

### 4.1 カスタム Section 一覧

`web_shopify/sections/` で管理する主なSectionを示す。現行テーマでは、商品一覧・商品詳細・BLOG・問い合わせなどの `main-*` 系Sectionもプロジェクト側で管理する。

| Section ファイル名 | 用途 | schema 設定項目 | テーマエディタ |
|---|---|---|---|
| `hero-banner.liquid` | ヒーロー画像・見出し・CTA（複数ページ共通）| 背景画像、見出し、サブコピー、CTA テキスト、CTA リンク | ○ |
| `featured-products.liquid` | 注目商品リスト（トップ）| コレクション選択、表示件数、見出し | ○ |
| `brand-intro.liquid` | ブランド紹介テキスト・画像（トップ）| 見出し、本文、画像、リンク | ○ |
| `kominka-cta.liquid` | 古民家誘導（トップ）| 画像、見出し、本文、CTA テキスト・リンク | ○ |
| `page-kominka-overview.liquid` | 古民家ページの概要・本文 | 見出し、本文、画像 | ○ |
| `kominka-gallery.liquid` | 古民家写真ギャラリー | section blocks / 手動画像設定 | ○ |
| `kominka-access.liquid` | 古民家アクセス情報 | page metafield `custom.access_text` / 直接テキスト | ○ |
| `reservation-cta.liquid` | 外部予約リンク CTA | page metafield `custom.reservation_url` / 直接 URL | ○ |
| `latest-blog.liquid` | 最新ブログ記事一覧（トップ）| ブログ選択、表示件数、見出し | ○ |
| `main-collection.liquid` | 商品一覧、フィルタ、並び順、ページネーション | 表示件数、フィルタ表示、クイック追加表示 | ○ |
| `main-product.liquid` | 商品詳細、メディア、数量、在庫、カート追加 | Shopify Product参照 | △ |
| `main-cart.liquid` | カート明細、数量変更、Checkout導線 | Shopify Cart参照 | △ |
| `main-blog.liquid` | BLOG一覧の縦リスト | 1ページの記事数 | ○ |
| `main-article.liquid` | BLOG詳細本文、画像、タグ | Shopify Article参照 | - |
| `main-page-contact.liquid` | 問い合わせフォーム | lead文、補足文、電話番号表示、プライバシー同意、topic blocks | ○ |
| `main-page.liquid` | 汎用固定ページ本文 | Shopify Page参照 | - |
| `main-search.liquid` | 検索結果 | Shopify Search参照 | - |
| `main-list-collections.liquid` | コレクション一覧 | Shopify Collections参照 | - |
| `main-404.liquid` | 404ページ | 導線文言 | - |
| `faq-list.liquid` | FAQ 一覧（アコーディオン UI）| Product metafield / 手動入力 blocks。Metaobjectは拡張時 | ○ |
| `contact-cta.liquid` | お問い合わせ誘導 CTA（各ページ下部）| 見出し、本文、CTA テキスト・リンク | ○ |
| `product-metafields.liquid` | 商品詳細の補足情報（原材料・飲み方等）| 表示項目の有効・無効（schema）| △ |
| `related-products.liquid` | 関連商品一覧 | metafield参照 / 同一コレクション / fallback商品 | △ |

### 4.2 Snippet 一覧

| Snippet ファイル名 | 用途 | 備考 |
|---|---|---|
| `breadcrumbs.liquid` | パンくず表示 | テンプレートから render |
| `product-card.liquid` | 商品カード（variantによりトップ簡易表示・一覧表示・関連商品表示を切り替え）| 一覧・注目商品・関連商品で共通利用 |
| `fallback-product-card.liquid` | 商品未登録時のプレビューカード | トップ注目商品などの初期表示 |
| `responsive-image.liquid` | Shopify画像のレスポンシブ出力 | 商品、BLOG、古民家画像で共通利用 |
| `pagination.liquid` | ページネーション | 商品一覧、BLOG一覧、検索結果で利用 |
| `structured-data.liquid` | JSON-LD出力 | `layout/theme.liquid` から render |
| `icon-cart.liquid` | カートアイコン | ヘッダーで利用 |
| `seo-meta.liquid` | SEO meta、OGP、Twitterカード出力 | `<head>` 内から render |

### 4.3 JSON テンプレート構成方針

| テンプレートファイル | 主な Section 構成 |
|---|---|
| `templates/index.json` | hero-banner, brand-intro, featured-products, kominka-cta, latest-blog, contact-cta |
| `templates/collection.json` | hero-banner, main-collection |
| `templates/product.json` | main-product, product-metafields, faq-list, related-products |
| `templates/cart.json` | main-cart |
| `templates/page.kominka.json` | hero-banner, page-kominka-overview, kominka-gallery, kominka-access, reservation-cta, faq-list |
| `templates/page.contact.json` | main-page-contact |
| `templates/blog.json` | hero-banner（任意）, main-blog |
| `templates/article.json` | main-article, contact-cta |
| `templates/page.faq.json` | hero-banner（任意）, faq-list |
| `templates/page.json` | hero-banner（任意）, main-page |
| `templates/search.json` | main-search |
| `templates/404.json` | main-404（カスタム）|
| `templates/list-collections.json` | main-list-collections |
| `templates/policy.liquid` | Shopify Policies本文 |

### 4.4 グローバルナビゲーション

ヘッダー:

| 項目 | Shopify URL | 備考 |
|---|---|---|
| ロゴ | `/` | テーマ設定から画像変更可 |
| 商品 | `/collections/all` | ドロップダウンでカテゴリ一覧も可 |
| 古民家 | `/pages/kominka` | |
| ブログ | `/blogs/stories` | |
| お問い合わせ | `/pages/contact` | |
| カートアイコン | `/cart` | アイコンのみ表示。カート件数バッジを重ね、100点以上は `99+` |

- ナビゲーションメニューは Shopify 管理画面のメニュー設定から編集できること
- ブランド紹介（`/pages/about`）・畑紹介（`/pages/farm`）は任意ページであり、スコープ確定後に追加する

フッター:

- サイトマップ（主要ページリンク）
- SNS リンク（LINE、Facebook、Instagram）
- 配送情報リンク
- 返品・交換リンク
- 特定商取引法に基づく表記リンク
- プライバシーポリシーリンク
- コピーライト

---

## 5. データモデル詳細

### 5.1 Shopify Products / Collections

| フィールド | Shopify 管理 | 備考 |
|---|---|---|
| `title` | 商品名 | |
| `body_html` | 詳細説明（リッチテキスト）| |
| `vendor` | ブランド名 | |
| `product_type` | 商品タイプ | 商品分類・フィルター候補に利用 |
| `handle` | URL スラッグ（自動生成 / 手動変更可）| `/products/{handle}` |
| `images` | 商品画像（複数）| alt テキストを必ず設定 |
| `variants` | バリエーション（容量・種類等）| 価格・在庫 per バリアント |
| `price` | 価格（税込 / 税抜は設定に依存）| |
| `inventory_quantity` | 在庫数 | 在庫管理 ON の場合 |
| `published` | 公開状態 | |
| `tags` | 商品タグ。初期seedのコレクション紐付けは手動コレクションへの `collects` 作成で行う | |
| `seo_title` | SEO タイトル | 検索エンジンリスティング設定 |
| `seo_description` | SEO ディスクリプション | 検索エンジンリスティング設定 |

コレクション種別:

| コレクション handle | 用途 |
|---|---|
| `all` | 全商品一覧（Shopify 自動生成）|
| `featured-products` | トップページ注目商品 |
| `tea` | お茶類 |
| `powder` | 粉薬 |
| `tablets` | 錠剤 |
| `care-set` | 養生セット |
| （他、商品整理後に追加）| |

### 5.2 Shopify Product Metafields 定義

| metafield | namespace | key | 型 | 説明 |
|---|---|---|---|---|
| 内容量 | `custom` | `quantity` | `single_line_text_field` | 内容量・規格 |
| 原材料 | `custom` | `ingredients` | `multi_line_text_field` | 原材料 |
| 飲み方 | `custom` | `how_to_use` | `multi_line_text_field` | 飲み方・使い方 |
| 注意事項 | `custom` | `caution` | `multi_line_text_field` | 注意事項・アレルギー |
| 関連商品 | `custom` | `related_products` | `list.product_reference` | 関連商品リスト |
| 商品 FAQ | `custom` | `faqs` | `list.metaobject_reference` | Metaobject `faq_item` のリスト |

- 主要metafields（`quantity`、`ingredients`、`how_to_use`、`caution`、`related_products`、古民家用page metafields）は `scripts/seed-shopify.mjs` がGraphQL Admin APIで定義作成・pinを補助する。権限不足時は管理画面で定義する
- 未入力の metafields はテーマ側で非表示処理を行う（`{% if product.metafields.custom.quantity != blank %}`）

### 5.3 古民家データ定義

初期実装では古民家情報を Shopify Page、Page metafields、section settings で管理する。Metaobject 型名 `kominka_info` は、施設情報や写真を複数レコードとして運用する拡張時に追加する。

| フィールド名 | key | 型 | 説明 |
|---|---|---|---|
| 予約 URL | `custom.reservation_url` | `url` | Page metafield。外部予約サービス URL |
| アクセス | `custom.access_text` | `multi_line_text_field` | Page metafield。住所・交通手段・駐車場 |
| 写真 | section block `image` | image picker / fallback asset | `page.kominka.json` とテーマエディタで管理 |
| 注意事項 | section block / page body | text / rich text | 利用上の注意事項 |

- `reservation_url` は管理画面から直接更新できるため、テーマコード修正不要で予約先を変更できる

### 5.4 FAQ Metaobject 定義

Metaobject 型名: `faq_item`

| フィールド名 | key | 型 | 説明 |
|---|---|---|---|
| 質問 | `question` | `single_line_text_field` | FAQ の質問文 |
| 回答 | `answer` | `rich_text_field` | FAQ の回答文 |
| カテゴリ | `category` | `single_line_text_field` | `product` / `shipping` / `kominka` / `other` |

- 商品 FAQ は商品 metafield `custom.faqs` からリスト参照する
- 古民家 FAQ は初期実装では `page.kominka.json` の `faq-list` section blocksで表示し、Metaobjectクエリは拡張時に追加する
- FAQ ページ（`/pages/faq`）は初期実装ではsection blocksで表示し、全カテゴリを束ねる運用が必要になった場合にMetaobjectsへ移行する

### 5.5 Shopify Blogs / Blog posts

| フィールド | 管理場所 | 備考 |
|---|---|---|
| ブログ名 | Shopify 管理画面 > ブログ投稿 | `stories`（URL: `/blogs/stories`）|
| 記事タイトル | 記事編集画面 | |
| 記事本文 | 記事編集画面（リッチテキスト）| HTML として保存される |
| アイキャッチ画像 | 記事編集画面 | alt テキストを設定 |
| 抜粋 | 記事編集画面 | 一覧縦リストに短く表示 |
| タグ | 記事編集画面 | 記事分類、一覧表示、内部リンク設計の目印に利用 |
| 著者 | 記事編集画面 | スタッフアカウント名 |
| SEO タイトル | 記事編集画面（検索エンジンリスティング）| |
| SEO ディスクリプション | 記事編集画面（検索エンジンリスティング）| |
| 公開日時 | 記事編集画面 | 公開予約可 |
| 公開状態 | 記事編集画面 | 下書き / 公開 |

- 記事は Shopify アプリ（iOS / Android）からスマホで投稿・編集できること（実機確認必須）
- 関連商品は Article metafields（`custom.related_products`）として別途定義・設定する

### 5.6 Shopify Article Metafields 定義

| metafield | namespace | key | 型 | 説明 |
|---|---|---|---|---|
| 関連商品 | `custom` | `related_products` | `list.product_reference` | 記事に関連する商品リスト |

### 5.7 Theme Settings（`config/settings_schema.json`）

テーマ全体設定として以下を定義する:

| 設定グループ | 設定項目 | 用途 |
|---|---|---|
| ブランド情報 | `logo`、`brand_kicker`、`brand_name_ja`、`brand_name_en`、`footer_lead` | ヘッダー・フッター表示 |
| カラー | `color_background`、`color_paper`、`color_ink`、`color_moss`、`color_olive`、`color_earth`、`color_sand`、`color_border`、`color_muted`、`color_gold` | ブランドカラー CSS 変数 |
| ナビゲーション | `main_menu`、`footer_menu` | ヘッダー・フッターメニュー |
| 連絡先・SNS | `contact_email`、`contact_phone`、`line_url`、`facebook_url`、`instagram_url` | フッター・問い合わせ導線 |
| SEO・構造化データ | `default_og_image`、`default_og_asset`、`default_og_alt`、`organization_name`、`organization_description` | OGP・Twitterカード・構造化データ `Organization` |

`contact_email` と `contact_phone` は実運用値が未設定の場合、フッターに空リンクを出さず非表示にする。`default_og_image` が未設定の場合は `default_og_asset` のテーマassetを使う。

---

## 6. テーマ実装詳細

### 6.1 ディレクトリ構成

```txt
web_shopify/
├── assets/
│   ├── theme.css             # 共通スタイル
│   ├── theme.js              # 共通 JS（ドロワー、フォーム補助等）
│   ├── cart-icon.png
│   └── *.webp                # 初期表示・プレビュー用画像
├── config/
│   ├── settings_schema.json  # テーマ設定スキーマ
│   └── settings_data.json    # テーマ設定値（Git管理有無は方針に従う）
├── layout/
│   └── theme.liquid          # グローバルレイアウト（head、header、footer）
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero-banner.liquid
│   ├── featured-products.liquid
│   ├── brand-intro.liquid
│   ├── kominka-cta.liquid
│   ├── page-kominka-overview.liquid
│   ├── kominka-gallery.liquid
│   ├── kominka-access.liquid
│   ├── reservation-cta.liquid
│   ├── latest-blog.liquid
│   ├── main-collection.liquid
│   ├── main-product.liquid
│   ├── main-cart.liquid
│   ├── main-blog.liquid
│   ├── main-article.liquid
│   ├── main-page-contact.liquid
│   ├── main-page.liquid
│   ├── main-search.liquid
│   ├── main-list-collections.liquid
│   ├── main-404.liquid
│   ├── faq-list.liquid
│   ├── contact-cta.liquid
│   ├── product-metafields.liquid
│   └── related-products.liquid
├── snippets/
│   ├── breadcrumbs.liquid
│   ├── product-card.liquid
│   ├── fallback-product-card.liquid
│   ├── responsive-image.liquid
│   ├── pagination.liquid
│   ├── seo-meta.liquid
│   ├── structured-data.liquid
│   └── icon-cart.liquid
├── templates/
│   ├── index.json
│   ├── collection.json
│   ├── product.json
│   ├── cart.json
│   ├── page.json
│   ├── page.kominka.json
│   ├── page.contact.json
│   ├── page.faq.json
│   ├── blog.json
│   ├── article.json
│   ├── list-collections.json
│   ├── policy.liquid
│   ├── search.json
│   └── 404.json
└── locales/
    └── ja.default.json       # 日本語文言
```

### 6.2 `layout/theme.liquid` 設計

```txt
<html>
<head>
  - charset / viewport / title / canonical（theme layout）
  - description（seo-meta snippet）
  - OGP タグ（seo-meta snippet）
  - テーマ CSS（assets/theme.css）
  - フォント読み込み
  - {{ content_for_header }}（Shopify 必須）
  - 標準GA4連携で不足するカスタムイベントJS（必要時のみ）
</head>
<body>
  - {% section 'header' %}
  - main タグ
    - {{ content_for_layout }}
  - {% section 'footer' %}
  - 構造化データ WebSite + Organization + ページ別JSON-LD（structured-data snippet）
  - テーマ JS
</body>
</html>
```

### 6.3 ブランドカラー・書体 CSS 設計

Shopify の通常の `assets/*.css` は静的アセットとして扱うため、テーマ設定値を直接 `{{ settings.* }}` で埋め込む前提にしない。テーマ設定に依存するCSS変数は `layout/theme.liquid` から `<style>` として出力し、`assets/theme.css` はそのCSS変数を参照する。

`layout/theme.liquid`:

```liquid
<style>
  :root {
    --color-background: {{ settings.color_background | default: '#f4efe6' }};
    --color-paper: {{ settings.color_paper | default: '#fbf8f1' }};
    --color-ink: {{ settings.color_ink | default: '#1d241c' }};
    --color-moss: {{ settings.color_moss | default: '#41543b' }};
    --color-olive: {{ settings.color_olive | default: '#6d7b52' }};
    --color-earth: {{ settings.color_earth | default: '#8f6949' }};
    --color-gold: {{ settings.color_gold | default: '#ad8b57' }};
  }
</style>
```

`assets/theme.css`:

```css
body {
  background: var(--color-background);
  color: var(--color-ink);
}
```

- カラー・書体の基準値は `web_mock/` の `tailwind.config.ts` および `globals.css` を参照して設定する
- 現在の初期基準テーマは `MOSS` とする。主な基準色は `--mock-ink: #1d241c`、`--mock-moss: #41543b`、`--mock-olive: #6d7b52`、`--mock-earth: #8f6949`、`--mock-gold: #ad8b57`、`--mock-background: #f4efe6`、`--mock-paper: #fbf8f1`
- `MOSS` は暫定テーマであり、後続レビューで変更される場合は theme settings の初期値と CSS 変数を差し替える

### 6.4 レスポンシブ設計方針

- モバイルファーストを基本とし、ブレークポイントはテーマベースの標準値（通常 768px / 990px / 1280px）を採用する
- `web_mock/` の Tailwind CSS ブレークポイントと近似させ、モバイル表示を優先確認する
- タッチ操作（スワイプ・タップ）を考慮し、カートへの追加、ナビゲーション開閉、ギャラリー操作が快適に動作すること

---

## 7. SEO / 構造化データ / 計測

### 7.1 SEO 実装設計

| 項目 | 実装方針 | 設定場所 |
|---|---|---|
| `<title>` | `{ページタイトル} \| {サイト名}` 形式。Shopify 検索エンジンリスティング設定を優先 | 各ページ設定 / `theme.liquid` |
| `<meta name="description">` | 各ページのSEOディスクリプション。未設定時はShopifyの店舗説明、さらに未設定時は `organization_description` を使用 | 各ページ設定 / `seo-meta` snippet |
| `og:title / og:description / og:image` | 商品・記事画像、ShopifyのデフォルトOGP画像、テーマasset `default_og_asset` の順に補完。`og:image:alt` とTwitterカードも出力 | `seo-meta` snippet |
| `canonical` | Shopify 標準 canonical 出力（`{{ canonical_url }}`）を使用 | `theme.liquid` |
| `sitemap.xml` | Shopify が `/sitemap.xml` を自動生成 | Shopify 自動 |
| `robots.txt` | Shopify 標準。カスタマイズ必要時は `robots.txt.liquid` を作成 | Shopify 標準 / 必要時カスタム |
| SSL / HTTPS | Shopify 標準（全ページ自動 HTTPS）| Shopify 自動 |
| CDN | Shopify CDN（画像・assets の高速配信）| Shopify 自動 |

初期seedでは、商品、コレクション、固定ページ、BLOG、記事に `global.title_tag` / `global.description_tag` を投入する。公開前には管理画面のSearch engine listingで最終文言を確認する。

### 7.2 構造化データ出力設計

| ページ / 対象 | 型 | 実装場所 |
|---|---|---|
| 全ページ共通 | `WebSite`、`Organization` | `structured-data` snippet |
| パンくず表示ページ | `BreadcrumbList` | `structured-data` snippet / `breadcrumbs` snippet |
| 商品詳細 | `Product` + `Offer`（販売中・価格設定済み商品）+ `availability`（在庫状況に応じて）| `structured-data` snippet |
| ブログ詳細 | `Article` | `structured-data` snippet |
| FAQ ページ / 商品 FAQ | `FAQPage` | `faq-list` section 内 |
| 古民家紹介 | `LocalBusiness` | `structured-data` snippet内で `page.handle == 'kominka'` の場合に出力 |

`Product` + `Offer` の `availability` は Shopify の在庫状態（`product.available`）に応じて `InStock` / `OutOfStock` を出力する。
`Organization` は `organization_name` / `organization_description` / `logo` を使い、SNS URL が設定されている場合は `sameAs` に出力する。

### 7.3 GA4 計測設計

導入方法:

- Shopify の Google & YouTube チャネルまたは Shopify が案内するGA4設定手順を第一候補とし、ECイベントの二重計測を避ける
- `layout/theme.liquid` へ独自 `gtag.js` を直接埋め込む方式は、標準連携が使えない場合の代替案とする
- `view_item`、`add_to_cart`、`begin_checkout`、`purchase` は標準連携側の自動計測を優先し、テーマ側では重複発火させない
- `click_reservation`、必要に応じた `view_article` など標準連携で不足するイベントのみ、テーマJSで明示発火する
- 測定 ID をテーマ設定で持つ場合も、Google & YouTube チャネル側の設定と重複しないか公開前に確認する

| イベント | 発火タイミング | 実装方法 |
|---|---|---|
| `view_item` | 商品詳細表示 | Shopify GA4 標準連携を優先 |
| `add_to_cart` | カートへ追加 | Shopify GA4 標準連携を優先 |
| `begin_checkout` | Checkout 開始 | Shopify GA4 標準連携を優先 |
| `purchase` | 注文完了 | Shopify GA4 標準連携を優先 |
| `generate_lead` | お問い合わせ送信完了 | `page.contact.json` 内のイベント発火 |
| `click_reservation` | 外部予約リンククリック | `reservation-cta` section 内のクリックイベント |
| `view_article` | ブログ詳細表示 | `article.json` テンプレート |

- Cookie とアクセス解析の利用方針はプライバシーポリシーに明記する

---

## 8. テーマ作成・Zip反映・運用立ち上げ設計

### 8.1 全体作成イメージ

Shopify案の現行フローは「ローカルでテーマを作る → `theme check` → Shopify CLI `theme push` → 管理画面/プレビューで確認 → 商品・SEO・ブログ等を接続 → 公開」とする。ZIP化は初回アップロード、バックアップ、管理画面からの手動復旧用に残す。

```txt
0. 前提確定
   ├─ Shopifyプラン、決済、配送、税、ドメイン、通知先メールを確認
   ├─ ベーステーマを決定
   └─ web_mock/ から再現対象の画面・余白・色・写真・導線を固定

1. Shopify側の土台作成
   ├─ 主要metafield定義を作成（MetaobjectはFAQ等の拡張時）
   ├─ ブログ stories を作成
   ├─ 固定ページ kominka / contact / about / farm / faq を必要に応じて作成
   └─ メニュー、ポリシー、通知、配送、決済を仮設定

2. ローカルテーマ作成
   ├─ web_shopify/ にテーマソースを配置
   ├─ ベーステーマの Liquid / JSON templates / sections / snippets / assets を編集
   ├─ web_mock/ のデザインを Shopify section へ落とし込む
   └─ AI支援で生成したコードを人間がレビューする

3. ローカル検証
   ├─ shopify theme dev でプレビュー
   ├─ shopify theme check で構文・ベストプラクティス確認
   ├─ PC / SP / 商品 / カート / ブログ / 問い合わせを確認
   └─ 薬機法・景品表示法に関わる文言を確認

4. ZIP化
   ├─ shopify theme package --path .
   └─ 生成された theme_name-theme_version.zip を成果物とする

5. Shopifyへアップロード
   ├─ 管理画面 > オンラインストア > テーマ
   ├─ テーマライブラリ > テーマをインポート > ZIPをアップロード
   └─ 非公開テーマとしてプレビュー確認

6. アップロード後調整
   ├─ テーマエディタで画像・文言・メニュー・セクション表示を調整
   ├─ 商品、コレクション、固定ページ、ブログ、メニューを登録・紐付け
   ├─ SEO設定、画像alt、リダイレクト、GA4、構造化データを確認
   └─ 注文テスト・問い合わせテスト・スマホ確認を完了

7. 本番公開
   ├─ 公開前チェックリストを完了
   ├─ 旧テーマをバックアップ
   └─ 新テーマを公開して、必要時は旧テーマへ即時ロールバック
```

### 8.2 ローカルテーマ作成フロー

```txt
初期セットアップ
  ├─ Shopify CLI をインストール
  ├─ shopify auth login --store {store-name}.myshopify.com
  ├─ ベーステーマを管理画面で追加または複製
  └─ shopify theme pull --theme-id {base-theme-id} --path .

日常開発
  ├─ shopify theme dev --path .
  ├─ Liquid / JSON / CSS / JS を編集
  ├─ shopify theme check --path .
  ├─ レビュー指摘を修正
  └─ shopify theme package --path .
```

`shopify theme push` は現行のテーマ更新手段とする。初回アップロードやバックアップ用途ではZIPファイルも作成し、Shopify管理画面からアップロードできる状態を維持する。

### 8.3 ZIP化・アップロード方針

| 項目 | 方針 |
|---|---|
| ZIP生成 | `shopify theme package --path .` を使う |
| ZIPに含めるもの | Shopifyテーマ標準構成の `assets/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/` |
| ZIPに含まれないもの | 商品、コレクション、メニュー、ページ、ブログ記事、ストアファイル、注文、顧客、アプリ設定 |
| `settings_data.json` | 初期表示に必要な値のみ含める。ストア固有の確定値はアップロード後にテーマエディタで調整する |
| ファイル名 | `settings_schema.json` のテーマ名・バージョンから生成される名前を基本とする |
| アップロード先 | Shopify 管理画面 > オンラインストア > テーマ > テーマライブラリ > テーマをインポート |
| 公開状態 | アップロード直後は非公開テーマとして保持し、確認完了後に公開する |

ZIPアップロードはテーマファイルのみを反映する手順である。商品・ブログ・ページ・画像ファイル・メニュー・ポリシー等のストアデータは別途Shopify管理画面で登録する。

### 8.4 Git 管理方針

```txt
リポジトリ構成例
  KanpoSite/
  └── web_shopify/             # Shopify テーマソース
      ├── assets/
      ├── config/
      ├── layout/
      ├── sections/
      ├── snippets/
      ├── templates/
      └── locales/
```

- `.gitignore` に `config/settings_data.json` を含めるか否かはプロジェクトポリシーで決定する（テーマ設定値を Git 管理したい場合は含める）
- Shopify CLI 認証情報（`.shopify/` 等）はリポジトリへコミットしない
- Admin API アクセストークン等の秘密情報はリポジトリへ保存しない

### 8.5 アップロード後の調整アシスト

アップロード後は、非公開テーマのプレビューとテーマエディタを使って、コード側で直すべきものと管理画面で直すべきものを切り分ける。

| 調整対象 | 確認内容 | 対応 |
|---|---|
| ヘッダー | ロゴ、メニュー、カート件数、SPメニュー | テーマ設定 / `sections/header.liquid` |
| トップ | ヒーロー画像、CTA、注目商品、最新ブログ | テーマエディタ / section schema |
| 商品カード | 画像比率、価格表示、売り切れ表示、余白 | `snippets/product-card.liquid` / CSS |
| 商品詳細 | バリエーション、数量、metafields、関連商品 | 商品データ / `product-metafields.liquid` |
| 古民家 | 予約URL、写真、アクセス、FAQ | page metafield / section settings / page template |
| 問い合わせ | 追加項目、完了表示、通知先 | `main-page-contact` / ストア通知設定 |
| ブログ | 一覧縦リスト、アイキャッチ、タグ、関連記事（任意）| blog template / Article metafields |
| SEO | title、description、canonical、OGP、Twitterカード、JSON-LD、画像alt | seed / 管理画面 / `seo-meta.liquid` / `structured-data.liquid` |
| レスポンシブ | 375px / 768px / 1280px で崩れがないか | CSS / section schema |
| Checkout導線 | CartからCheckoutへ進めるか | Shopify標準機能 / 決済設定 |

調整の進め方:

```txt
1. 非公開テーマのプレビューURLを共有
2. 依頼者が画面別に修正点を記録
3. コード修正が必要なものはローカルテーマへ反映
4. theme check / theme dev で確認
5. 再度ZIP化して新しい非公開テーマとしてアップロード
6. 管理画面設定だけで直るものはテーマエディタで修正
7. 修正差分がなくなるまで 2〜6 を繰り返す
```

### 8.6 商品登録手順

商品登録はテーマ公開前に最低限の代表商品で通し確認し、その後に本登録へ進む。

```txt
1. 商品マスタを作成
   ├─ 商品名
   ├─ handle案
   ├─ 価格
   ├─ SKU
   ├─ 在庫数
   ├─ バリエーション
   ├─ 商品説明
   ├─ 原材料・内容量・飲み方・注意事項
   ├─ 商品画像とalt
   └─ SEOタイトル・SEOディスクリプション

2. Shopifyカスタムデータを先に定義
   ├─ Product metafields
   ├─ Page metafields（古民家用）
   └─ FAQや商品ハイライト等のMetaobjectは必要時に追加

3. 商品を登録
   ├─ Products > Add product
   ├─ タイトル、説明、メディア、価格、在庫、配送重量を入力
   ├─ バリエーションを設定
   ├─ Online Store販売チャネルへ公開
   └─ Search engine listingでURL handleとSEO項目を編集（seed投入後も公開前に確認）

4. 補足情報を入力
   ├─ custom.quantity
   ├─ custom.ingredients
   ├─ custom.how_to_use
   ├─ custom.caution
   ├─ custom.faqs
   └─ custom.related_products

5. コレクションへ紐付け
   ├─ 初期seedは手動コレクションへ `collects` で紐付け
   ├─ 運用拡張時は条件付きコレクションも検討
   ├─ トップ注目商品用コレクションを設定
   └─ 商品一覧・カテゴリ一覧で表示を確認
```

CSV投入またはAdmin API補助を使う場合も、最初に1〜3商品を手入力してテーマ表示、metafields、SEO title / description、画像alt、在庫、Checkout導線を確認してから一括投入する。

### 8.7 SEO対策手順

| 対象 | 作業 |
|---|---|
| サイト共通 | サイト名、ロゴ、デフォルトOGP、OGP alt、Organization情報、SNSリンクをテーマ設定へ入力 |
| 商品 | 商品名に自然な検索語を含める。SEOタイトル、SEOディスクリプション、handle、画像altを設定 |
| コレクション | コレクション名、説明文、SEOタイトル、SEOディスクリプション、代表画像altを設定 |
| ブログ | 記事タイトル、見出し、抜粋、タグ、内部リンク、SEOタイトル、SEOディスクリプションを設定 |
| 固定ページ | 古民家、問い合わせ、ブランド紹介、畑紹介のtitle / description / OGPを確認 |
| 内部リンク | トップ、商品、ブログ、古民家、問い合わせの相互導線を整備 |
| リダイレクト | 旧URLがある場合はShopify URLリダイレクトへ登録 |
| 画像 | 商品画像・テーマ画像・ブログ画像に短く説明的なaltを設定 |
| 構造化データ | Product、Article、BreadcrumbList、LocalBusinessを検証 |
| 法規制 | 薬機法・景品表示法に抵触する効能表現を避ける |

初期SEOは「商品詳細とコレクションの品質」を最優先にする。Shopifyブログは運用しやすい一方でURL構造の自由度が低いため、記事SEOは内部リンクと商品導線を重視する。

### 8.8 ブログ更新手順

ブログは `stories` を正規ブログとして作成し、運営者がPCまたはShopifyアプリから更新する。

```txt
1. ブログ投稿を新規作成
   ├─ タイトルを入力
   ├─ 本文をリッチテキストで作成
   ├─ アイキャッチ画像を設定
   ├─ 抜粋を入力
   ├─ タグを設定
   └─ 著者・公開日時を確認

2. SEOを設定
   ├─ 検索エンジンリスティングのタイトル
   ├─ メタディスクリプション
   ├─ URL handle
   └─ 画像alt

3. 関連導線を設定
   ├─ Article metafield custom.related_products に関連商品を登録
   ├─ 本文中に関連商品・古民家・問い合わせへの内部リンクを入れる
   └─ 薬機法・景品表示法に関わる表現を確認

4. 下書きプレビュー
   ├─ PC / SP で本文、画像、余白を確認
   ├─ トップの最新ブログ枠への反映を確認
   └─ 必要に応じて公開予約を設定

5. 公開後確認
   ├─ `/blogs/stories/{article-handle}` を確認
   ├─ Article構造化データを確認
   └─ Search Console登録後はインデックス状況を確認
```

スマホ更新では、長文編集やSEO詳細設定の抜けが起きやすいため、公開前チェック項目として「タイトル、抜粋、アイキャッチ、タグ、SEO説明、内部リンク」を確認する。

### 8.9 Shopify ストア初期設定管理

以下は人間が管理画面で設定・確認する項目であり、自動化の対象外とする:

| 設定領域 | 担当 |
|---|---|
| 決済方法（Shopify Payments / その他）| 依頼者 |
| 配送設定（送料・配送地域・発送目安）| 依頼者 / 開発 |
| 税設定 | 依頼者 / 開発 |
| ポリシー（配送・返品・特商法・プライバシー）本文入力 | 依頼者 / 開発 |
| ドメイン設定・SSL | 依頼者 / 開発 |
| 通知先メール（お問い合わせ先・注文通知）| 依頼者 / 開発 |
| アプリ設定 | 依頼者 / 開発 |
| メタフィールド定義（Metaobjectは拡張時）| 開発 |
| テーマSEO設定（デフォルトOGP、Organization、SNS）| 開発 / 依頼者 |
| GA4 / Search Console | 開発 / 依頼者 |

### 8.10 テーマ公開・ロールバック方針

| 操作 | 手順 |
|---|---|
| テーマ公開 | 非公開テーマのプレビューで表示・Checkout 動作確認後、「公開する」を選択 |
| バックアップ | 変更前のテーマを「テーマをコピー」で複製して保持する |
| ロールバック | 旧テーマを管理画面で「公開する」を選択して即時切り戻し |
| ZIP保管 | 公開したZIPファイルを日付・バージョン付きで保管する |
| 本番反映承認 | 人間が表示確認・Checkout 動作確認・スマホ確認を経てから承認する |

### 8.11 障害時の方針

- ZIPアップロードに失敗した場合は、`theme check` の結果、テーマフォルダ構成、ZIPの生成元、Shopifyテーマ数上限を確認する
- アップロード後の表示崩れが大きい場合は公開せず、ローカル修正後に再ZIP化する
- 公開後に問題が出た場合はバックアップテーマを公開テーマとして設定し、直前の状態に戻す
- Shopify プラットフォーム障害は [status.shopify.com](https://status.shopify.com) を確認し、復旧を待つ
- お問い合わせ通知が届かない場合は Shopify ストア設定の通知先メール・差出人メールを確認する
- AI 生成コードによるレイアウト崩れ・Checkout 導線への影響が発生した場合は即時ロールバックする

---

## 9. セキュリティ実装設計

| 項目 | 設計方針 |
|---|---|
| 決済・注文情報 | Shopify 標準機能に委譲。独自実装は行わない |
| 秘密情報管理 | Shopify CLI 認証情報・Admin API アクセストークン・テーマ設定のシークレットはリポジトリへ保存しない |
| AI 生成コード | 本番反映前にレビューを必須とする。未レビューコードを本番テーマへ直接反映しない |
| アプリ選定 | サードパーティアプリ導入時はデータアクセス権限を確認し、不要な権限を持つアプリを避ける |
| テーマ公開 | 開発テーマと公開テーマを分離し、確認前のコードを本番公開しない |
| セキュリティヘッダー | Shopifyの標準配信に依存する。テーマコードから任意HTTPヘッダーは制御できないため、必要な制御がある場合はShopify設定・アプリ・外部ドメイン構成の範囲で確認する |
| 外部リンク | `reservation_url` 等の外部 URL は `rel="noopener noreferrer"` を付与する |
| 薬機法・景品表示法 | AI 生成の商品説明・SEO 文案・ブログ下書きはすべて人間が確認してから公開する |

---

## 10. 環境変数・秘密情報管理

Shopify 案ではサーバーサイドアプリ（Next.js、PHP 等）を持たないため、環境変数は最小限である。

| 項目 | 管理場所 | 備考 |
|---|---|---|
| Shopify ストア URL | Shopify CLI 設定 / `.env`（ローカル）| リポジトリへコミットしない |
| Shopify CLI 認証トークン | `shopify auth login` が自動管理 | リポジトリへコミットしない |
| Admin API アクセストークン | ローカル `.env` または CI シークレット | 商品 CSV 投入補助等で利用する場合。リポジトリへ保存しない |
| GA4 計測 ID | Google & YouTube チャネル / Customer Events 等のShopify標準連携で管理。テーマ設定で持つ場合はカスタムイベント補助時のみ | 秘密情報ではないが重複設定に注意 |

`web_mock/` の環境変数:

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_MOCK_SITE_URL` | `web_mock/` の確認 URL |

---

## 11. 調査ソース

- Shopify Help Center: Adding, previewing, and buying themes（ZIPアップロード）  
  https://help.shopify.com/en/manual/online-store/themes/adding-themes
- Shopify CLI: `theme package`  
  https://shopify.dev/docs/api/shopify-cli/theme/theme-package
- Shopify CLI: Theme commands  
  https://shopify.dev/docs/api/shopify-cli/theme
- Shopify Help Center: Duplicating themes  
  https://help.shopify.com/en/manual/online-store/os/using-themes/managing-themes/duplicating-themes
- Shopify Help Center: Downloading themes  
  https://help.shopify.com/en/manual/online-store/themes/managing-themes/downloading-themes
- Shopify Help Center: Products  
  https://help.shopify.com/en/manual/products
- Shopify Help Center: Adding and updating products  
  https://help.shopify.com/en/manual/products/add-update-products
- Shopify Help Center: Adding alt text to media  
  https://help.shopify.com/en/manual/products/product-media/add-alt-text
- Shopify Help Center: Custom data  
  https://help.shopify.com/en/manual/custom-data
- Shopify Help Center: Metaobjects  
  https://help.shopify.com/en/manual/custom-data/metaobjects
- Shopify Help Center: Setting up Google Analytics 4  
  https://help.shopify.com/en/manual/reports-and-analytics/google-analytics/google-analytics-setup

---

## 12. 将来拡張余地

| 項目 | 拡張ポイント |
|---|---|
| ヘッドレス移行 | Shopify Storefront API を利用した Next.js フロントエンド構成（SEO 重視の場合）|
| Shopify Hydrogen | Vite ベースのヘッドレス Shopify フレームワークへの移行 |
| Shopify Markets | 多言語・多通貨対応（海外展開が必要になった場合）|
| メタフィールド拡張 | 商品ハイライト、認定マーク、産地情報等の metafields 追加 |
| フォームアプリ導入 | 問い合わせ種別・電話番号・添付ファイル等が必要になった場合の Hulk Contact Form 等 |
| CRM 連携 | お問い合わせデータ・顧客データの外部 CRM 連携（Shopify アプリで対応）|
| 予約システム導入 | 古民家の直接予約が必要になった場合の Shopify アプリまたは外部予約システム連携 |
| レビュー機能 | 商品レビューが必要になった場合の Judge.me 等のレビューアプリ導入 |
| Search & Discovery | Shopify 標準のフィルタ・検索強化が必要になった場合のアプリ導入 |

---

## 13. 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|---|---|---|---|
| 2026-04-27 | 1.0.0 | Codex | Shopify案の詳細設計書を初版作成 |
| 2026-04-27 | 1.1.0 | Codex | 再帰レビューを反映。テーマ反映の正規手順をCLI push前提からローカル作成・ZIP化・Shopify管理画面アップロードへ変更。アップロード後調整、商品登録、SEO対策、ブログ更新、ロールバック、調査ソースを追加し、ルートID重複、CSS変数出力、GA4重複計測リスクを修正 |
| 2026-04-28 | 1.1.1 | Codex | `web_mock/` の商品画像遷移、数量指定、在庫表示、カートアイコン件数バッジ、暫定テーマカラー `MOSS` を反映 |
| 2026-04-29 | 1.1.2 | Codex | CLI push運用、Admin API seed、商品一覧/トップ表示、NEWバッジ、BLOG/問い合わせ運用を実装状態に同期 |
| 2026-04-29 | 1.1.3 | Codex | 上位要件・基本設計との再帰レビューを実施し、実ファイル構成、main系Section、BLOG縦リスト、問い合わせ追加項目を修正 |
| 2026-04-30 | 1.1.4 | Codex | Shopify実装との差分を再帰確認し、SEOメタデータseed、OGP/Twitterカード補完、画像alt、関連商品フォールバック、主要metafield定義、古民家page metafield運用、REST/GraphQL併用seed方針を反映 |
| 2026-05-04 | 1.1.5 | Codex | Shopifyを正規方針とし、オリジナル案をアーカイブ参照へ変更 |
| 2026-05-07 | 1.1.6 | Codex | サイト名を四国ボタニカへ変更し、暫定英字表記 `Shikoku Botanica`、Organization説明、SEO文脈の前提を追加 |

---

*以上*
