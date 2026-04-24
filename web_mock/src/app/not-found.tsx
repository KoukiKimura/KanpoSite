import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mock-shell flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
      <p className="text-xs uppercase tracking-[0.35em] text-mock-gold">Not found</p>
      <h1 className="font-serif text-5xl text-mock-ink">このモックページは未作成です</h1>
      <p className="max-w-2xl text-sm leading-8 text-mock-muted">
        このモックは依頼者レビュー用の最小ひな形です。必要な画面から優先的に追加します。
      </p>
      <Link href="/" className="mock-button-secondary">
        Back to top
      </Link>
    </section>
  );
}
