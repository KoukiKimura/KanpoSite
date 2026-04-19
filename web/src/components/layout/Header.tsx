'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'トップ' },
  { href: '/products', label: '商品' },
  { href: '/brand', label: 'ブランドについて' },
  { href: '/field', label: '畑のこと' },
  { href: '/guesthouse', label: 'ゲストハウス' },
  { href: '/contact', label: 'お問い合わせ' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-brand-bg/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex flex-col items-start group" onClick={() => setIsMenuOpen(false)}>
            <span
              className="text-xl lg:text-2xl tracking-widest text-primary font-serif leading-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              山草の恵み
            </span>
            <span className="text-xs tracking-[0.2em] text-accent italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Sansou no Megumi
            </span>
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ハンバーガーメニュー（モバイル） */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-px bg-brand-text transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-brand-text transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-brand-text transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-brand-bg/95 backdrop-blur-md border-t border-brand-border px-6 py-6">
          <ul className="flex flex-col gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-4 text-sm tracking-widest text-brand-text hover:text-primary transition-colors duration-200 border-b border-brand-border last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
