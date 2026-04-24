# env/web_mock

`web_mock/` 用の環境ファイル配置先です。

## 方針

- モック公開 URL は `env/.env.mock.deploy` の `DEPLOY_SITE_URL` を参照する
- モック確認 URL は `NEXT_PUBLIC_MOCK_SITE_URL` で管理する
- `web_mock/` は静的モックのため、秘密情報は持たせない

## 配置ファイル

- `.env.review`
  - 依頼者レビュー用 URL とモック公開 URL を記述する
