# サイト運用TODO

作成日: 2026-05-07

本番公開設定は今回の作業範囲から除外します。

## 対応済み

- 文字化け確認: テーマ内のLiquid、JSON、JS、Markdownに不正な文字化け実体がないことを確認済み。
- 法務文言: 商品、コレクション、ブランド説明、SEO説明から、効能効果や医薬品に見える表現を削減済み。
- ポリシー: 返金、配送、プライバシー、利用規約、特商法表記のテーマ側フォールバック本文を作成済み。
- 管理画面ポリシー更新スクリプト: `scripts/update-policies.mjs` を作成済み。
- Shopify初期投入スクリプト: `scripts/seed-shopify.mjs --skip-publish` で、本番公開処理を避けて管理データ更新できるように修正済み。
- SEO基本設定: canonical、OGP、Twitter Card、Organization、WebSite、Breadcrumb、Product、Articleの構造化データを実装済み。
- 商品構造化データ: 予約・問い合わせ品を0円の購入可能オファーとして出さないように修正済み。
- 古民家構造化データ: LodgingBusiness、住所、Google Map URL、予約導線のschemaを追加済み。
- favicon: SVG faviconを追加済み。
- Search Console: HTMLタグ方式の `content` 値をテーマ設定から出力できるように追加済み。

## 保留

- 管理画面ポリシー本文のAdmin API更新: Dev Dashboardアプリに `write_legal_policies` スコープが不足しているため保留。
- 本番公開設定: 今回はスキップ。

## 管理画面で確認するTODO

- Dev Dashboardアプリに `write_legal_policies` を追加し、アプリを再インストールする。
- スコープ追加後に `node scripts/update-policies.mjs --only=refund,shipping,privacy,terms --apply` を再実行する。
- 商品、コレクション、固定ページ、BLOG、メニューの公開状態を変えない場合は `node scripts/seed-shopify.mjs --skip-publish` を使う。
- 特商法表記の販売業者、所在地、電話番号、責任者、営業時間、返品条件を正式情報へ差し替える。
- 配送設定、送料、発送日数、配送不可条件を実運用に合わせて確定する。
- 決済、税設定、通知先メール、問い合わせフォームの受信先を確認する。
- Google Search Consoleでサイト所有権を確認し、`/sitemap.xml` を送信する。
- GA4はShopifyのCustomer eventsまたはGoogle & YouTubeアプリ側で設定する。
- 旧サイトURLから移設ページへのリダイレクトを設定する。
- 商品価格、在庫、予約・問い合わせ品の購入導線を公開前に確認する。

## 公開前チェック

- `/pages/srs` の当帰コーナー表示、関連ページ遷移、画像altを確認する。
- 商品詳細の関連商品カードで、画像・価格・ボタンが重ならないことを確認する。
- `/pages/kominka` のアクセス本文、Google Map、予約導線を確認する。
- `/policies/refund-policy`、`/policies/shipping-policy`、`/policies/privacy-policy`、`/policies/terms-of-service` の表示を確認する。
- モバイル幅でヘッダー、商品カード、問い合わせフォーム、古民家アクセスが崩れないことを確認する。
