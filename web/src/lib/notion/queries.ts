/**
 * Notion Database / Page / Block を取得してサイト用データへ変換するクエリ関数
 * サーバーサイド専用（'use client' を付けないこと）
 */

import type { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notionClient, BLOG_DATABASE_ID } from './client';
import { pageToPost, blockToNotionBlock, type NotionBlogPost, type NotionBlock } from './types';

// ---------------------------------------------------------------------------
// 記事一覧取得（Published のみ、PublishedAt 降順）
// ---------------------------------------------------------------------------

export async function getNotionBlogPosts(): Promise<NotionBlogPost[]> {
  if (!BLOG_DATABASE_ID) {
    console.warn('[getNotionBlogPosts] NOTION_BLOG_DATABASE_ID が設定されていません。');
    return [];
  }

  const allPages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Published' },
      },
      sorts: [{ property: 'PublishedAt', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    });

    allPages.push(
      ...response.results.filter(
        (p): p is PageObjectResponse => p.object === 'page' && 'properties' in p
      )
    );

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return allPages.map(pageToPost).filter((p) => p.slug);
}

// ---------------------------------------------------------------------------
// slug 指定で1件取得（Published のみ）
// ---------------------------------------------------------------------------

export async function getNotionBlogPostBySlug(
  slug: string
): Promise<NotionBlogPost | null> {
  if (!BLOG_DATABASE_ID) return null;

  const response = await notionClient.databases.query({
    database_id: BLOG_DATABASE_ID,
    filter: {
      and: [
        { property: 'Slug', title: { equals: slug } },
        { property: 'Status', select: { equals: 'Published' } },
      ],
    },
    page_size: 1,
  });

  const page = response.results.find(
    (p): p is PageObjectResponse => p.object === 'page' && 'properties' in p
  );
  if (!page) return null;

  return pageToPost(page);
}

// ---------------------------------------------------------------------------
// カテゴリ絞り込み取得
// ---------------------------------------------------------------------------

export async function getNotionBlogPostsByCategory(
  category: string
): Promise<NotionBlogPost[]> {
  if (!BLOG_DATABASE_ID) return [];

  const allPages: PageObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.databases.query({
      database_id: BLOG_DATABASE_ID,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Category', select: { equals: category } },
        ],
      },
      sorts: [{ property: 'PublishedAt', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    });

    allPages.push(
      ...response.results.filter(
        (p): p is PageObjectResponse => p.object === 'page' && 'properties' in p
      )
    );

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return allPages.map(pageToPost).filter((p) => p.slug);
}

// ---------------------------------------------------------------------------
// Page ID からブロック一覧を取得
// ---------------------------------------------------------------------------

export async function getNotionBlocks(pageId: string): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notionClient.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if ('type' in block) {
        blocks.push(blockToNotionBlock(block as BlockObjectResponse));
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

// ---------------------------------------------------------------------------
// 最新 N 件取得（トップページ用）
// ---------------------------------------------------------------------------

export async function getLatestNotionBlogPosts(limit = 3): Promise<NotionBlogPost[]> {
  try {
    const posts = await getNotionBlogPosts();
    return posts.slice(0, limit);
  } catch (e) {
    console.warn('[getLatestNotionBlogPosts] Notion API 取得失敗。空配列を返します。', e);
    return [];
  }
}
