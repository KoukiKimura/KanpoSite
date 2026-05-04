import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg px-6">
      <div className="text-center max-w-md">
        <p
          className="text-7xl font-accent italic text-accent mb-6 tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          404
        </p>
        <h1
          className="heading-md text-brand-text mb-4"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          ページが見つかりません
        </h1>
        <div className="w-12 h-px bg-accent mx-auto my-6" />
        <p className="text-sm text-brand-muted leading-loose mb-10">
          お探しのページは移動・削除されたか、URLが変更された可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            トップへ戻る
          </Link>
          <Link href="/products" className="btn-outline">
            商品一覧
          </Link>
          <Link href="/blog" className="text-sm tracking-widest text-primary hover:text-primary-dark transition-colors">
            ブログ →
          </Link>
        </div>
      </div>
    </div>
  );
}
