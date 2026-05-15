# ポリシー文面作成メモ

作成日: 2026-05-07

## 参照した公的情報

- 消費者庁「特定商取引法」
  - 通信販売では広告表示、返品特約、申込み段階の表示が重要。
  - https://www.caa.go.jp/policies/policy/consumer_transaction/specified_commercial_transactions/index.html
- 特定商取引法ガイド「特定商取引法とは」
  - 通信販売はインターネット等で広告し、通信手段で申込みを受ける取引。
  - https://www.no-trouble.caa.go.jp/what/
- 国民生活センター「クーリング・オフ」
  - 通信販売にはクーリング・オフ制度がなく、返品条件は返品特約に従う。
  - 特約がない場合、商品受領日を含め8日以内なら返品できるが、返送料は消費者負担。
  - https://www.kokusen.go.jp/soudan_now/data/coolingoff.html
- 個人情報保護委員会「個人情報保護法ガイドライン・Q&A」
  - 利用目的は本人が合理的に予測できる程度に具体化する必要がある。
  - 安全管理措置の概要や問い合わせ窓口を本人が知り得る状態に置く必要がある。
  - https://www.ppc.go.jp/personalinfo/faq/APPI_QA/
  - https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/
- 消費者庁「景品表示法」
  - 品質、内容、価格等を実際より優良・有利に見せる表示は規制対象。
  - 健康食品の表示に関する注意資料も公開されている。
  - https://www.caa.go.jp/policies/policy/representation/fair_labeling/

## 近いShopifyサイトで確認した構成

食品、健康食品、茶・ハーブ系のShopifyストアでは、フッターに次のページを並べる構成が多い。

- 返金ポリシー
- プライバシーポリシー
- 利用規約
- 配送ポリシー
- 特定商取引法に基づく表記

確認例:

- ヤクゼンオンラインショッピング: https://shopping.yakuzen.biz/
- George Steuart Tea公式オンラインストア: https://gs-tea.shop/
- 最高品質ハーブのヤポネサウンド合同会社: https://japonesound-service.com/
- TEAM7-bio onlineshop: https://team7-bio.com/
- やいづ海街マルシェ: https://yaizu-marche.jp/

## 文面方針

- 食品・茶・粉末・苗を扱うため、お客様都合の返品は受けない方針を明記。
- 誤発送、破損、不良は商品到着後7日以内の連絡で交換または返金対応。
- 苗など状態が変化する商品は、到着当日または翌日までの連絡を求める。
- 配送は日本国内のみ、送料はチェックアウト表示または個別案内を優先。
- 健康表現は、疾病の診断・治療・予防を目的としない旨を利用規約・特商法表記に明記。
- 特商法表記は販売業者固有情報が未確定のため、テンプレートとして設置し、正式情報への差し替えを必須にする。

## 公開前に確定が必要な項目

- 販売業者の正式名称
- 運営責任者名
- 所在地
- 電話番号と受付時間
- メールアドレス
- 実際の決済方法
- 実際の送料条件、送料無料条件
- 苗・予約品の出荷条件

## Admin APIでポリシー本文を更新する方法

Dev Dashboard方式のアプリは、Shopify管理画面に固定のAdmin APIトークンが表示されない。`SHOPIFY_DEV_CLIENT_ID` と `SHOPIFY_DEV_CLIENT_SECRET` からClient Credentials Grantで24時間有効のトークンを自動取得して使う。

必要なAdmin API scope:

- `write_legal_policies`
- 既存本文を読み取って確認する場合は `read_legal_policies`

実行コマンド:

```powershell
cd web_shopify
node scripts/update-policies.mjs
```

上記はdry-run。実際に更新する場合:

```powershell
node scripts/update-policies.mjs --apply
```

一部だけ更新する場合:

```powershell
node scripts/update-policies.mjs --only=refund,shipping --apply
```

特定商取引法に基づく表記は事業者固有情報の差し替えが必要なため、本文に「差し替え必須」が残っている場合は実更新時もスキップする。内容確認後に反映したい場合だけ、次を使う。

```powershell
node scripts/update-policies.mjs --only=legal --include-draft-legal-notice --apply
```
