'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mockSite } from '@/lib/mock/site';

const navItems = [
  { href: '/', label: 'トップ' },
  { href: '/products', label: '商品' },
  { href: '/kominka', label: '古民家' },
  { href: '/contact', label: 'お問い合わせ' },
];

const themeOptions = [
  { key: 'current', label: 'Moss' },
  { key: 'white', label: 'White' },
  { key: 'washi', label: 'Washi' },
] as const;

type ThemeKey = (typeof themeOptions)[number]['key'];

const THEME_STORAGE_KEY = 'web_mock_theme';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('current');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLightTheme = activeTheme !== 'current';

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const normalizedTheme = savedTheme === 'wellness' ? 'washi' : savedTheme;
    const nextTheme = themeOptions.some((item) => item.key === normalizedTheme)
      ? (normalizedTheme as ThemeKey)
      : 'current';

    setActiveTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  function applyTheme(theme: ThemeKey) {
    setActiveTheme(theme);
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  return (
    <header
      id="site-header"
      className={
        isHome
          ? `absolute inset-x-0 top-0 z-50 border-b shadow-[0_18px_40px_rgba(0,0,0,0.08)] ${
              isLightTheme ? 'border-mock-border bg-mock-paper' : 'border-white/10 bg-mock-ink'
            }`
          : `sticky top-0 z-50 border-b backdrop-blur-md ${
              isLightTheme ? 'border-mock-border bg-mock-paper/95' : 'border-white/10 bg-mock-ink/90'
            }`
      }
    >
      <div
        id="site-header-inner"
        className={`relative mx-auto flex max-w-screen-2xl flex-col items-center gap-3 px-4 py-4 md:gap-4 md:px-6 md:py-5 lg:px-10 ${
          isLightTheme ? 'text-mock-ink' : 'text-mock-paper'
        }`}
      >
        <button
          id="site-menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-controls="site-side-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className={`absolute left-4 top-4 z-[80] flex h-10 w-10 items-center justify-center border transition md:left-6 md:h-11 md:w-11 lg:left-10 ${
            isLightTheme
              ? 'border-mock-border bg-mock-paper text-mock-ink hover:bg-mock-background'
              : 'border-white/18 bg-white/8 text-mock-paper hover:bg-white/14'
          }`}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition ${
                isMenuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-5 bg-current transition ${
                isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>

        <div
          id="site-theme-switcher-wrap"
          className="hidden w-full md:block lg:absolute lg:right-10 lg:top-5 lg:flex lg:w-auto lg:justify-end"
        >
          <div
            id="site-theme-switcher"
            className={`ml-auto flex flex-wrap items-center gap-2 rounded-full border px-3 py-2 ${
              isLightTheme ? 'border-mock-border bg-mock-background' : 'border-white/12 bg-white/6'
            }`}
          >
            <span
              id="site-theme-switcher-label"
              className={`text-[10px] uppercase tracking-[0.32em] ${
                isLightTheme ? 'text-mock-muted' : 'text-white/48'
              }`}
            >
              Theme
            </span>
            {themeOptions.map((theme) => (
              <button
                id={`site-theme-${theme.key}`}
                key={theme.key}
                type="button"
                onClick={() => applyTheme(theme.key)}
                className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.28em] transition ${
                  activeTheme === theme.key
                    ? isLightTheme
                      ? 'border-mock-ink bg-mock-ink text-mock-paper'
                      : 'border-white/70 bg-white/90 text-mock-ink'
                    : isLightTheme
                      ? 'border-mock-border bg-mock-paper text-mock-muted hover:bg-mock-background'
                      : 'border-white/18 bg-white/6 text-white/72 hover:bg-white/12'
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>
        </div>

        <div id="site-brand" className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <Link id="site-brand-link" href="/" className="max-w-[calc(100%-5.5rem)] space-y-1 md:max-w-none">
            <p
              id="site-brand-kicker"
              className={`text-[11px] uppercase tracking-[0.4em] ${
                isLightTheme ? 'text-mock-muted' : 'text-white/55'
              }`}
            >
              {mockSite.mockLabel}
            </p>
            <div id="site-brand-text">
              <p id="site-brand-ja" className="font-serif text-2xl leading-none md:text-3xl">
                {mockSite.brandJa}
              </p>
              <p
                id="site-brand-en"
                className={`text-xs tracking-[0.18em] md:text-sm md:tracking-[0.22em] ${
                  isLightTheme ? 'text-mock-muted' : 'text-white/65'
                }`}
              >
                {mockSite.brandEn}
              </p>
            </div>
          </Link>

          <div id="site-header-controls" className="flex w-full flex-col items-center gap-3">
            <nav
              id="site-primary-nav"
              className={`hidden flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.32em] md:flex ${
                isLightTheme ? 'text-mock-muted' : 'text-white/75'
              }`}
            >
              {navItems.map((item) => (
                <Link
                  id={`site-nav-${item.href === '/' ? 'home' : item.href.replace('/', '')}`}
                  key={item.href}
                  href={item.href}
                  className={`transition ${isLightTheme ? 'hover:text-mock-ink' : 'hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="site-menu-view" className="fixed inset-0 z-[60]">
          <button
            id="site-menu-view-backdrop"
            type="button"
            aria-label="メニューを閉じる"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/42"
          />
          <aside
            id="site-side-menu"
            role="dialog"
            aria-modal="true"
            aria-label="サイトメニュー"
            className={`absolute inset-y-0 left-0 flex w-[calc(100vw-2rem)] max-w-sm flex-col border-r px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:px-7 md:py-8 ${
              isLightTheme
                ? 'border-mock-border bg-mock-paper text-mock-ink'
                : 'border-white/12 bg-mock-ink text-mock-paper'
            }`}
          >
            <div id="site-side-menu-heading" className="flex items-start justify-between gap-5">
              <div>
                <p
                  id="site-side-menu-kicker"
                  className={`text-[10px] uppercase tracking-[0.32em] ${
                    isLightTheme ? 'text-mock-muted' : 'text-white/55'
                  }`}
                >
                  Menu
                </p>
                <p id="site-side-menu-brand" className="mt-2 font-serif text-3xl leading-none">
                  {mockSite.brandJa}
                </p>
              </div>
              <button
                id="site-side-menu-close"
                type="button"
                aria-label="メニューを閉じる"
                onClick={() => setIsMenuOpen(false)}
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center border transition ${
                  isLightTheme
                    ? 'border-mock-border bg-mock-background text-mock-ink hover:bg-mock-paper'
                    : 'border-white/16 bg-white/8 text-mock-paper hover:bg-white/14'
                }`}
              >
                <span className="sr-only">Close</span>
                <span className="absolute h-px w-5 rotate-45 bg-current" aria-hidden="true" />
                <span className="absolute h-px w-5 -rotate-45 bg-current" aria-hidden="true" />
              </button>
            </div>

            <nav id="site-side-nav" className="mt-10 grid gap-2">
              {navItems.map((item) => (
                <Link
                  id={`site-side-nav-${item.href === '/' ? 'home' : item.href.replace('/', '')}`}
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`border-t py-4 font-serif text-2xl transition md:py-5 md:text-3xl ${
                    isLightTheme
                      ? 'border-mock-border text-mock-ink hover:text-mock-earth'
                      : 'border-white/12 text-mock-paper hover:text-white/72'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div
              id="site-side-theme-switcher"
              className={`mt-auto border-t pt-7 ${isLightTheme ? 'border-mock-border' : 'border-white/12'}`}
            >
              <p
                id="site-side-theme-switcher-label"
                className={`text-[10px] uppercase tracking-[0.32em] ${
                  isLightTheme ? 'text-mock-muted' : 'text-white/55'
                }`}
              >
                Theme
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {themeOptions.map((theme) => (
                  <button
                    id={`site-side-theme-${theme.key}`}
                    key={theme.key}
                    type="button"
                    onClick={() => applyTheme(theme.key)}
                    className={`border px-3 py-2 text-[10px] uppercase tracking-[0.28em] transition ${
                      activeTheme === theme.key
                        ? isLightTheme
                          ? 'border-mock-ink bg-mock-ink text-mock-paper'
                          : 'border-white/70 bg-white/90 text-mock-ink'
                        : isLightTheme
                          ? 'border-mock-border bg-mock-background text-mock-muted hover:bg-mock-paper'
                          : 'border-white/18 bg-white/8 text-white/72 hover:bg-white/14'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
