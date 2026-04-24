import Link from 'next/link';

const productLinks = [
  { href: '/products', label: '商品一覧' },
  { href: '/products?category=茶葉', label: '茶葉' },
  { href: '/products?category=セット', label: 'セット商品' },
];

const brandLinks = [
  { href: '/about', label: 'ブランド紹介' },
  { href: '/concept', label: 'コンセプト' },
  { href: '/farm', label: '畑紹介' },
  { href: '/kominka', label: '古民家' },
  { href: '/contact', label: 'お問い合わせ' },
];

const legalLinks = [
  { href: '/terms', label: '利用規約' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/legal', label: '特定商取引法に基づく表記' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* メインフッターエリア */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ブランド情報 */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <p
                className="text-2xl tracking-widest text-white font-serif leading-tight"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                山草の恵み
              </p>
              <p
                className="text-xs tracking-[0.2em] text-accent-light italic mt-1"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Sansou no Megumi
              </p>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mt-4">
              自然の恵みを大切に、<br />
              丁寧に育てた生薬で<br />
              日々の健康をお届けします。
            </p>
            <div className="mt-6 text-xs text-white/50 space-y-1">
              <p>〒000-0000 ○○県○○市○○町0-0-0</p>
              <p>Email: info@sansou-megumi.jp（仮）</p>
              <p>Tel: 000-000-0000（仮）</p>
            </div>
          </div>

          {/* 商品 */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-5">商品</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ブランド */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-5">ブランド</h3>
            <ul className="space-y-3">
              {brandLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法的情報 */}
          <div>
            <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-5">法的情報</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200 tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* コピーライト */}
      <div className="border-t border-white/10">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 tracking-wide">
            &copy; {currentYear} 山草の恵み. All Rights Reserved.
          </p>
          <p className="text-xs text-white/30 italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Sansou no Megumi — Natural Herbal Medicine
          </p>
        </div>
      </div>
    </footer>
  );
}
