/**
 * Notion API レスポンスを公開サイト用の型へ変換するレイヤー
 * UIコンポーネントは直接 Notion API の型に依存しない
 */

import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

// ---------------------------------------------------------------------------
// 公開サイト用の型
// ---------------------------------------------------------------------------

export type NotionBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  status: 'Published' | 'Draft';
  /** ブロック一覧（本文レンダリング用） */
  blocks?: NotionBlock[];
};

export type NotionBlock =
  | { type: 'paragraph'; texts: InlineText[] }
  | { type: 'heading_2'; texts: InlineText[] }
  | { type: 'heading_3'; texts: InlineText[] }
  | { type: 'bulleted_list_item'; texts: InlineText[] }
  | { type: 'numbered_list_item'; texts: InlineText[]; index?: number }
  | { type: 'quote'; texts: InlineText[] }
  | { type: 'callout'; texts: InlineText[]; emoji?: string }
  | { type: 'divider' }
  | { type: 'image'; url: string; caption: string }
  | { type: 'unsupported'; rawType: string };

export type InlineText = {
  plain: string;
  bold: boolean;
  italic: boolean;
  code: boolean;
  href: string | null;
};

// ---------------------------------------------------------------------------
// RichText → InlineText 変換
// ---------------------------------------------------------------------------

function toInlineTexts(richTexts: RichTextItemResponse[]): InlineText[] {
  return richTexts.map((rt) => ({
    plain: rt.plain_text,
    bold: rt.annotations.bold,
    italic: rt.annotations.italic,
    code: rt.annotations.code,
    href: rt.href ?? null,
  }));
}

// ---------------------------------------------------------------------------
// Page プロパティ → NotionBlogPost 変換
// ---------------------------------------------------------------------------

export function pageToPost(page: PageObjectResponse): NotionBlogPost {
  const props = page.properties;

  const getTitle = (key: string): string => {
    const p = props[key];
    if (!p || p.type !== 'title') return '';
    return p.title.map((t) => t.plain_text).join('');
  };

  const getRichText = (key: string): string => {
    const p = props[key];
    if (!p || p.type !== 'rich_text') return '';
    return p.rich_text.map((t) => t.plain_text).join('');
  };

  const getSelect = (key: string): string => {
    const p = props[key];
    if (!p || p.type !== 'select') return '';
    return p.select?.name ?? '';
  };

  const getDate = (key: string): string => {
    const p = props[key];
    if (!p || p.type !== 'date') return '';
    return p.date?.start ?? '';
  };

  return {
    id: page.id,
    slug: getTitle('Slug'),
    title: getRichText('Title'),
    excerpt: getRichText('Excerpt'),
    category: getSelect('Category').toLowerCase(),
    publishedAt: getDate('PublishedAt'),
    status: (getSelect('Status') as NotionBlogPost['status']) || 'Draft',
  };
}

// ---------------------------------------------------------------------------
// Block → NotionBlock 変換
// ---------------------------------------------------------------------------

export function blockToNotionBlock(block: BlockObjectResponse): NotionBlock {
  switch (block.type) {
    case 'paragraph':
      return { type: 'paragraph', texts: toInlineTexts(block.paragraph.rich_text) };
    case 'heading_2':
      return { type: 'heading_2', texts: toInlineTexts(block.heading_2.rich_text) };
    case 'heading_3':
      return { type: 'heading_3', texts: toInlineTexts(block.heading_3.rich_text) };
    case 'bulleted_list_item':
      return { type: 'bulleted_list_item', texts: toInlineTexts(block.bulleted_list_item.rich_text) };
    case 'numbered_list_item':
      return { type: 'numbered_list_item', texts: toInlineTexts(block.numbered_list_item.rich_text) };
    case 'quote':
      return { type: 'quote', texts: toInlineTexts(block.quote.rich_text) };
    case 'callout': {
      const emoji =
        block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : undefined;
      return { type: 'callout', texts: toInlineTexts(block.callout.rich_text), emoji };
    }
    case 'divider':
      return { type: 'divider' };
    case 'image': {
      const url =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption.map((t) => t.plain_text).join('');
      return { type: 'image', url, caption };
    }
    default:
      return { type: 'unsupported', rawType: block.type };
  }
}
