import { Client } from '@notionhq/client';

/**
 * Notion API クライアント（サーバーサイド専用）
 * NOTION_API_KEY は web/.env.local に設定する。ブラウザへ公開しない。
 */
export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const BLOG_DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID ?? '';
