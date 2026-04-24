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
        className={`relative mx-auto flex max-w-screen-2xl flex-col items-center gap-4 px-6 py-5 lg:px-10 ${
          isLightTheme ? 'text-mock-ink' : 'text-mock-paper'
        }`}
      >
        <div
          id="site-theme-switcher-wrap"
          className="w-full lg:absolute lg:right-10 lg:top-5 lg:flex lg:w-auto lg:justify-end"
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
          <Link id="site-brand-link" href="/" className="space-y-1">
            <p
              id="site-brand-kicker"
              className={`text-[11px] uppercase tracking-[0.4em] ${
                isLightTheme ? 'text-mock-muted' : 'text-white/55'
              }`}
            >
              {mockSite.mockLabel}
            </p>
            <div id="site-brand-text">
              <p id="site-brand-ja" className="font-serif text-3xl leading-none">
                {mockSite.brandJa}
              </p>
              <p
                id="site-brand-en"
                className={`text-sm tracking-[0.22em] ${
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
              className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.32em] ${
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
    </header>
  );
}
