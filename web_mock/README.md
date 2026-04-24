# web_mock

依頼者レビュー用の静的モックアプリです。

## 役割

- フェーズ1からフェーズ2のデザイン確認
- ダミーデータだけで主要導線を確認
- 承認済み UI を `web/` へ移植する前段

初期リリースでは下書き確認用 `preview/` 別アプリは作成せず、`web/` は本実装用、`web_mock/` は依頼者レビュー用として用途を分けます。`preview/` は将来 `microCMS` 移行時に再検討します。

## 現在の最小構成

- `/`
- `/products`
- `/products/[slug]`
- `/kominka`
- `/contact`

## デザイン参照

- 参考: `https://www.roccadeifiori.eu/en/the-company/`
- 取り込む要素: 大きなヒーロー、広い余白、セリフ体見出し、土色と深緑の配色
- 取り込まない要素: 実画像依存の演出、実データ接続、実送信

## 開発メモ

- `Next.js App Router`
- `output: 'export'`
- `robots.txt` は `Disallow: /`
- metadata でも `noindex` を付与
- ダミーデータは `src/lib/mock/site.ts`

## 環境参照

- モック公開 URL は `env/.env.mock.deploy` の `DEPLOY_SITE_URL` を参照
- `web_mock/` 自体の確認 URL は `env/web_mock/.env.review` で管理
