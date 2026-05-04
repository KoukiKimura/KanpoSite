import type { NotionBlock, InlineText } from '@/lib/notion/types';

// ---------------------------------------------------------------------------
// インラインテキストレンダラー
// ---------------------------------------------------------------------------

function InlineContent({ texts }: { texts: InlineText[] }) {
  return (
    <>
      {texts.map((t, i) => {
        let node: React.ReactNode = t.plain;
        if (t.code) node = <code className="bg-brand-cream text-primary px-1.5 py-0.5 rounded text-[0.875em] font-mono">{node}</code>;
        if (t.bold) node = <strong className="font-semibold">{node}</strong>;
        if (t.italic) node = <em>{node}</em>;
        if (t.href) node = <a href={t.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-accent transition-colors">{node}</a>;
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// ブロックをリストグループ単位にまとめるヘルパー
// 連続する bulleted_list_item は <ul> 、numbered_list_item は <ol> でラップする
// ---------------------------------------------------------------------------

type BlockSegment =
  | { kind: 'single'; block: NotionBlock; index: number }
  | { kind: 'ul'; items: { block: NotionBlock; index: number }[] }
  | { kind: 'ol'; items: { block: NotionBlock; index: number }[] };

function groupBlocks(blocks: NotionBlock[]): BlockSegment[] {
  const segments: BlockSegment[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === 'bulleted_list_item') {
      const last = segments[segments.length - 1];
      if (last && last.kind === 'ul') {
        last.items.push({ block, index: i });
      } else {
        segments.push({ kind: 'ul', items: [{ block, index: i }] });
      }
    } else if (block.type === 'numbered_list_item') {
      const last = segments[segments.length - 1];
      if (last && last.kind === 'ol') {
        last.items.push({ block, index: i });
      } else {
        segments.push({ kind: 'ol', items: [{ block, index: i }] });
      }
    } else {
      segments.push({ kind: 'single', block, index: i });
    }
  }

  return segments;
}

// ---------------------------------------------------------------------------
// NotionArticleBody
// ---------------------------------------------------------------------------

type Props = {
  blocks: NotionBlock[];
};

export default function NotionArticleBody({ blocks }: Props) {
  const segments = groupBlocks(blocks);

  return (
    <div className="prose-brand">
      {segments.map((seg, si) => {
        if (seg.kind === 'ul') {
          return (
            <ul key={si} className="list-disc list-inside space-y-1.5 mb-5 ml-2">
              {seg.items.map(({ block, index }) =>
                block.type === 'bulleted_list_item' ? (
                  <li key={index} className="leading-relaxed">
                    <InlineContent texts={block.texts} />
                  </li>
                ) : null
              )}
            </ul>
          );
        }

        if (seg.kind === 'ol') {
          return (
            <ol key={si} className="list-decimal list-inside space-y-1.5 mb-5 ml-2">
              {seg.items.map(({ block, index }) =>
                block.type === 'numbered_list_item' ? (
                  <li key={index} className="leading-relaxed">
                    <InlineContent texts={block.texts} />
                  </li>
                ) : null
              )}
            </ol>
          );
        }

        const { block, index } = seg;

        switch (block.type) {
          case 'paragraph':
            if (block.texts.length === 0) return <div key={si} className="h-4" />;
            return (
              <p key={si} className="leading-relaxed mb-5">
                <InlineContent texts={block.texts} />
              </p>
            );

          case 'heading_2':
            return (
              <h2 key={si} className="text-xl font-semibold text-primary mt-10 mb-4 pb-2 border-b border-brand-border"
                style={{ fontFamily: "'Noto Serif JP', serif" }}>
                <InlineContent texts={block.texts} />
              </h2>
            );

          case 'heading_3':
            return (
              <h3 key={si} className="text-base font-semibold text-primary mt-8 mb-3"
                style={{ fontFamily: "'Noto Serif JP', serif" }}>
                <InlineContent texts={block.texts} />
              </h3>
            );

          case 'quote':
            return (
              <blockquote key={si} className="border-l-4 border-accent pl-5 py-1 my-6 text-brand-muted italic">
                <InlineContent texts={block.texts} />
              </blockquote>
            );

          case 'callout':
            return (
              <div key={si} className="flex gap-3 bg-brand-cream border border-brand-border rounded p-4 my-6">
                {block.emoji && <span className="text-xl leading-none mt-0.5">{block.emoji}</span>}
                <p className="leading-relaxed">
                  <InlineContent texts={block.texts} />
                </p>
              </div>
            );

          case 'divider':
            return <hr key={si} className="border-brand-border my-8" />;

          case 'image':
            // NOTE: Notion の file.url は約1時間で期限切れになる。
            // フェーズ3後半で画像ダウンロード + 静的アセット化を実装すること。
            return (
              <figure key={si} className="my-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={block.url}
                  alt={block.caption || '記事内の画像'}
                  className="w-full rounded"
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="text-xs text-brand-muted text-center mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'unsupported':
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`[NotionArticleBody] 未対応ブロック: ${block.rawType}`);
            }
            return null;

          default:
            void index; // exhaustive check 用
            return null;
        }
      })}
    </div>
  );
}
