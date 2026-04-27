# サイト要件定義書_Shopify案

| 項目 | 内容 |
|---|---|
| ドキュメント名 | サイト要件定義書_Shopify案 |
| バージョン | 1.2.0 |
| 作成日 | 2026-04-26 |
| 最終更新日 | 2026-04-27 |
| ステータス | Shopify調査結果反映済み・再帰レビュー済み |
| 位置付け | Shopify上でサイト・商品・ブログ・問い合わせ・決済運用を完結させる案 |
| 参照元 | `web_mock/`、`docs/要件定義/サイト要件定義書.md` v1.5.5、`work/Shopify案についての調査` |

---

## 1. 目的

公開サイト、商品管理、決済、ブログ、問い合わせ、法務ページを Shopify に集約し、運用者が Shopify 管理画面および Shopify アプリから更新できる構成にする。

本案では、既存モックのデザインをできるだけ再現しつつ、Shopify標準機能とテーマカスタマイズで完結させる。独自の Next.js 公開サイト、ConoHa上の静的配信、外部ECリンク運用は採用しない。

ただし、調査結果を踏まえ、Shopify案は「ノーコードでワンクリック生成する案」ではなく、「AI支援でLiquid / CSS / JSON sectionsを作成し、Shopify CLIでテーマへ反映する半自動開発案」として扱う。商品・配送・決済・アプリ設定などは人間による管理画面確認を必須とする。

## 2. 採用方針

| 領域 | 方針 |
|---|---|
| プラットフォーム | Shopify Online Store |
| テーマ | Online Store 2.0 対応テーマをベースに、Liquid / JSON templates / sections / blocks でカスタマイズ |
| デザイン | `web_mock/` のトップ、商品、古民家、問い合わせ、ブログの見た目を可能な範囲で再現 |
| 商品管理 | Shopify Products / Collections / Variants / Inventory |
| 商品補足情報 | Product metafields / metaobjects |
| ブログ | Shopify Blogs / Blog posts |
| 古民家 | Shopify Page または metaobject + page template |
| 予約 | 独自予約システムは実装せず、外部予約URLへ誘導 |
| 問い合わせ | Shopify標準の contact template を基本。追加項目が必要な場合はフォームアプリまたはテーマ拡張を検討 |
| カート | Shopify標準の cart page または cart drawer を利用し、テーマ内でCheckout導線を明確にする |
| 決済・注文 | Shopify Checkout / Orders を利用 |
| 公開サイト | Shopifyテーマとして公開 |
| 開発支援 | AIでLiquid / HTML / CSS / JavaScript / JSON templatesを生成・修正し、Shopify CLIでテーマへ反映 |
| 自動化範囲 | テーマコード生成、section構成、商品CSV/API投入補助は対象。ストア設定、決済、配送、アプリ設定、最終レイアウト確認は手動確認必須 |
| SEO方針 | Shopify標準SEOを活用しつつ、URL構造・コンテンツSEOの制約を前提に、商品・コレクション・内部リンクを重点最適化 |

## 3. Shopify調査メモ

2026-04-26 時点の調査では、Shopify案に必要な基本機能は標準機能とテーマカスタマイズで成立する。ただし、完全自動構築ではなく、AI支援によるテーマ開発と人間の設定確認を組み合わせる前提とする。

| 領域 | 確認内容 | 方針 |
|---|---|---|
| ブログ | Shopifyアプリからブログ投稿の作成・編集・画像追加・SEO編集・公開予約ができる | ブログ更新はShopifyに集約 |
| 問い合わせ | `contact` テンプレートで問い合わせページを作成でき、モバイル操作手順も公式に案内されている | 標準フォームを第一候補 |
| テーマ構造 | テンプレートは sections / blocks で構成され、ページごとに編集できる | モック再現はカスタムsectionで対応 |
| JSON templates | JSONテンプレートでsectionsの並びと設定を管理できる | トップ、商品、古民家、ブログ用テンプレートを作る |
| Metaobjects | 複数フィールドを持つ構造化データをShopify管理画面で扱える | FAQ、古民家情報、商品ハイライトに利用 |

### 3.1 AI支援・自動化の評価

| 領域 | できること | 方針 |
|---|---|---|
| Shopify標準AI | 商品説明、ブログ文案、SEO文言、マーケティング文面の生成補助 | 運用補助として利用可能 |
| テーマ開発 | AIでLiquid、HTML、CSS、JavaScript、JSON templates / sectionsを生成・修正できる | モック再現の主要手段として採用 |
| Shopify CLI | ローカルでテーマを編集し、`shopify theme push` 等でストアへ反映できる | テーマ開発・反映フローの中心にする |
| データ投入 | 商品CSV、Admin API等で商品・コレクションの初期投入を補助できる | 初期移行・大量登録時に利用検討 |
| 完全自動生成 | モックからワンクリックでサイト、商品、配送、決済、アプリ設定まで完成させる | 初期スコープ外。人間の確認を必須にする |

AI生成コードはそのまま本番反映せず、テーマ構造、Liquid構文、モバイル表示、アクセシビリティ、SEO、Checkout導線への影響を確認してから反映する。

### 3.2 SEO調査の評価

| 領域 | 強み / 弱み | 方針 |
|---|---|---|
| 基本SEO | title / meta description、sitemap.xml、robots.txt、canonical、SSLが標準で整いやすい | Shopify標準機能を活用 |
| 表示速度 | CDN配信とレスポンシブテーマにより小規模ECでは有利 | 重いアプリと過剰JSを避ける |
| URL構造 | `/products/`、`/collections/`、`/blogs/` など固定構造で自由度が低い | Shopify標準URLを受け入れ、旧URLがある場合はリダイレクト |
| 重複コンテンツ | 複数コレクションやバリエーションで重複が起きやすい | canonical確認、コレクション設計、内部リンク整理で対処 |
| コンテンツSEO | Shopifyブログは簡易で、本格メディアSEOには弱い | 初期は最低限のブログ運用。SEO重視ならオリジナル案またはヘッドレス構成を比較対象に残す |

本案は、EC運用・商品管理・決済を優先する場合に適した案とする。ブランドストーリーやロングテール記事SEOを最優先する場合は、`Next.js + Shopify（ECのみ） + CMS` のヘッドレス構成、またはオリジナル案を再比較する。

## 4. 対象ページ

| ページID | Shopify URL例 | ページ名 | 主データ | 優先度 |
|---|---|---|---|---|
| P01 | `/` | トップページ | Theme sections + Products + Blog posts + Metaobjects | 必須 |
| P02 | `/collections/all` | 商品一覧 | Shopify Collections / Products | 必須 |
| P03 | `/collections/{handle}` | 商品カテゴリ一覧 | Shopify Collections | 必須 |
| P04 | `/products/{handle}` | 商品詳細 | Shopify Product + metafields | 必須 |
| P05 | `/cart` | カート | Shopify Cart | 必須 |
| P06 | `/pages/kominka` | 古民家紹介 | Page + metaobject | 必須 |
| P07 | `/pages/contact` | お問い合わせ | Shopify contact template | 必須 |
| P08 | `/blogs/stories` | ブログ一覧 | Shopify Blog | 必須 |
| P09 | `/blogs/stories/{article-handle}` | ブログ詳細 | Shopify Blog post | 必須 |
| P10 | `/policies/*` または `/pages/*` | 法務・配送・返品 | Shopify Policies / Pages | 必須 |
| P11 | `/search` | 検索 | Shopify標準検索 | 任意 |

ブランド紹介、畑紹介、FAQを初期から分ける場合は、`/pages/about`、`/pages/farm`、`/pages/faq` を追加する。スコープを絞る場合はトップまたは古民家ページ内のセクションとして扱う。

ブログURLは初期値として `/blogs/stories` を正規URLとする。既存URLや告知上の都合で `/blog` を利用したい場合は、Shopify標準URLへのリダイレクトまたは導線設計として別途扱う。

## 5. 機能要件

### 5.1 トップページ

- モックの写真主導・和モダン・余白重視の構成をShopifyテーマで再現する
- ヒーロー、ブランド導入、注目商品、古民家導線、最新ブログ、お問い合わせ導線を表示する
- 管理画面から画像、見出し、本文、CTAリンクを更新できるsection設計にする
- 商品とブログはShopifyデータから自動表示できること

### 5.2 商品・EC

- 商品登録、価格、在庫、バリエーション、画像、販売状態はShopifyを正本とする
- 商品一覧と商品詳細はShopify標準URLを使う
- 商品詳細には原材料、飲み方、注意事項、内容量、FAQ、関連商品を表示する
- 原材料などの補足情報はproduct metafieldsまたはmetaobjectsで管理する
- カート、チェックアウト、注文、決済、配送設定はShopify標準機能を利用する
- カートはShopify標準のcart pageまたはcart drawerを利用し、数量変更、削除、小計、Checkout導線を表示する
- Checkout画面の大幅なデザイン再現は初期スコープ外とし、Shopify標準制約内で調整する

### 5.3 古民家

- 古民家紹介ページをShopify上の固定ページとして実装する
- 施設概要、写真、アクセス、過ごし方、注意事項、FAQを表示する
- 予約システムは実装しない
- 予約CTAは外部予約サービスまたはFacebook等の外部URLへ遷移する
- 予約URLはページ本文へ直書きせず、theme settings、metaobject、またはpage metafieldなどの構造化データとして管理する

### 5.4 問い合わせ

- Shopify標準の contact page template を基本採用する
- 氏名、メールアドレス、本文を中心に運用する
- 問い合わせ種別、電話番号など追加項目が必須の場合は、テーマコード改修またはフォームアプリを検討し、採用前に標準フォームで足りるかを確認する
- 問い合わせ送信先はShopifyのストア通知先・差出人メール設定を確認して運用する
- 高度なスパム対策、CRM連携、添付ファイル受付は初期スコープ外とする

### 5.5 ブログ

- Shopify Blogを使い、スマホから投稿・編集できること
- ブログ投稿にはタイトル、本文、アイキャッチ、抜粋、タグ、著者、SEOタイトル、SEOディスクリプションを設定できること
- 運営者アカウントでShopifyアプリから記事作成、画像追加、下書き保存、公開、編集ができることを実機確認する
- トップページに最新記事を表示する
- ブログ詳細から商品、古民家、問い合わせへ導線を設ける
- 記事カテゴリはタグまたはブログ分割で管理する。初期は1ブログ + タグを基本とする

### 5.6 テーマ開発・AI支援

- Shopifyテーマのソースはローカルで管理し、Liquid、JSON templates、sections、snippets、assetsを編集対象とする
- `web_mock/` の画面構成を基に、AI支援でShopify sectionとtemplateへ変換する
- テーマ反映はShopify CLIを用いたローカル開発とテーマ反映を基本とする
- AI生成コードはレビューし、Shopifyテーマ構造、Liquid構文、レスポンシブ表示、アクセシビリティ、SEOへの影響を確認する
- 商品CSVまたはAdmin APIによる初期商品投入補助は検討対象とする
- 決済、配送、税、法務、アプリ設定、Checkout動作確認は自動化せず、人間が管理画面で確認する
- 完全自動サイト生成は要件に含めない
- Shopify CLI、テーマ連携、Admin API利用時の認証情報はローカル環境またはCIの秘密情報として管理し、テーマコードやリポジトリに埋め込まない

### 5.7 Shopify標準AI活用

- 商品説明、SEO説明、ブログ下書き、メール文面の作成補助にShopify標準AIまたは外部AIを利用できる
- AI生成文は薬機法、景品表示法、健康効果表現、ブランドトーンの観点で人間が確認する
- 医薬的効能を断定する表現、体質改善や治療効果を保証する表現は避ける

## 6. データ要件

| データ | Shopify機能 | 備考 |
|---|---|---|
| 商品 | Products | 価格・在庫・販売状態の正本 |
| 商品カテゴリ | Collections | 手動または条件付きコレクション |
| 商品補足 | Product metafields | 原材料、飲み方、注意事項、内容量 |
| 商品FAQ | Metaobjects または Product metafields | 再利用性を重視する場合はmetaobjects |
| カート・Checkout | Shopify Cart / Checkout | 数量変更、削除、小計、Checkout導線。決済処理はShopify標準 |
| トップセクション | Theme settings / sections | 画像、見出し、CTA |
| 古民家情報 | Page + metaobject | 予約URL、写真、アクセス情報 |
| ブログ | Blogs / Blog posts | スマホ更新対象 |
| 法務・配送 | Policies / Pages | Shopify側の運用条件と同期 |
| テーマ設定 | Theme settings / JSON templates | AI生成後も管理画面で編集できる設定に整理 |

## 7. SEO要件

- Shopifyの検索エンジンリスティング編集機能を利用する
- 商品、コレクション、ブログ、ページにtitle / meta descriptionを設定する
- テーマ側でOGP、パンくず、主要構造化データの不足を補う
- ブログ詳細は `Article`、商品詳細は `Product`、古民家は `LocalBusiness` を基本にする
- URLはShopify標準URLを正規とし、旧オリジナルサイトURLを移行する場合はリダイレクト計画を別途作成する
- 商品名、コレクション名、商品説明に検索キーワードを自然に含める
- 商品画像には説明的なファイル名とalt属性を設定する
- 商品画像、ブログ画像、古民家画像はShopify CDNとテーマのresponsive imageを活用し、表示サイズに対して過大な画像を避ける
- ブログ記事から関連商品、コレクション、古民家、問い合わせへ内部リンクを設ける
- 複数コレクションに同一商品が属する場合はcanonicalと内部リンクの正規導線を確認する
- Shopifyブログは本格的なメディアSEOには制約があるため、初期は商品SEOとコレクションSEOを優先する

## 8. 非機能要件

| 項目 | 要件 |
|---|---|
| 運用性 | 商品、ブログ、固定ページをShopify管理画面・アプリで更新できること |
| パフォーマンス | テーマ改修で不要なアプリ・重いJSを増やさない |
| アクセシビリティ | テーマの基本アクセシビリティを維持し、色・見出し・フォームラベルを確認 |
| セキュリティ | 決済・注文情報はShopify標準機能に委譲 |
| 秘密情報管理 | Shopify CLI、テーマ連携、Admin API等の認証情報をリポジトリへ保存しない |
| 保守性 | カスタムsectionを増やしすぎず、テーマ更新時の差分管理を可能にする |
| 開発効率 | AI支援とShopify CLIによりテーマ作成を効率化する。ただし完全自動化を前提にしない |

## 9. 初期対象外

- Next.js公開サイト
- ConoHa WINGへの静的サイト配信
- 外部ECリンクのみの購入導線
- 独自予約システム
- 独自問い合わせAPI
- Shopify Checkoutの大幅な独自デザイン
- モックからの完全自動サイト生成
- 決済・配送・アプリ設定の完全自動化
- 高度なCMS承認フロー
- 多言語対応

## 10. 制約・注意点

- モックデザインは「できるだけ再現」とし、Shopifyテーマ・Checkout・アプリ制約により完全一致は保証しない
- AI生成コードとShopify CLIによりテーマ単位のソース反映は可能だが、ストア全体の完全自動構築は前提にしない
- Shopify標準のURL構造に寄せるため、既存Next.js案の `/products/[slug]` などとはURLが変わる
- Shopifyは基本SEOに強い一方、URL構造とブログ機能の自由度は低い。SEO重視の場合はオリジナル案またはヘッドレス構成との比較判断を行う
- 問い合わせフォームの件名や詳細な送信仕様はShopify標準では制約があるため、追加要件がある場合はアプリ選定が必要
- 商品情報、ブログ、古民家情報をShopifyに集約するため、将来オリジナルサイトへ戻す場合はデータ移行設計が必要
- カート、Checkout、決済、注文通知、配送、税、ポリシー、ドメイン、SSLは公開前に本番相当条件で確認する

## 11. 調査ソース

- Shopify ブログ投稿管理: https://help.shopify.com/en/manual/online-store/blogs/writing-blogs/working-with-blog-posts
- Shopify 問い合わせページ: https://help.shopify.com/en/manual/online-store/themes/customizing-themes/common-customizations/add-contact-page
- Shopify Theme structure: https://help.shopify.com/en/manual/online-store/themes/theme-structure
- Shopify JSON templates: https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates
- Shopify Metaobjects: https://help.shopify.com/en/manual/custom-data/metaobjects
- Shopify Custom data options: https://help.shopify.com/en/manual/custom-data/options
- 調査メモ: `work/Shopify案についての調査`

## 12. 更新履歴

| 日付 | バージョン | 更新者 | 内容 |
|---|---|---|---|
| 2026-04-26 | 1.0.0 | Codex | Shopify案として初版作成。Shopify上でトップ、商品、古民家、問い合わせ、ブログを完結させる方針を定義 |
| 2026-04-26 | 1.1.0 | Codex | `work/Shopify案についての調査` を反映し、AI支援テーマ開発、CLI反映、半自動化範囲、Shopify SEOの強み・制約を追加 |
| 2026-04-27 | 1.2.0 | Codex | 再帰レビューを反映。カート、画像最適化、問い合わせ送信先、スマホブログ運用、認証情報管理、公開前確認を明確化 |

*以上*
