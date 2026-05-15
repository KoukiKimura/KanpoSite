'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { mockCartIcon, mockSite } from '@/lib/mock/site';

const navItems = [
  { href: '/', label: 'トップ' },
  { href: '/products', label: '商品' },
  { href: '/kominka', label: '古民家' },
  { href: '/contact', label: 'お問い合わせ' },
];

const themeOptions = [
  { key: 'current', label: 'MOSS' },
  { key: 'white', label: 'White' },
  { key: 'washi', label: 'Washi' },
] as const;

type ThemeKey = (typeof themeOptions)[number]['key'];

const THEME_STORAGE_KEY = 'web_mock_theme';

const logoOptions = [
  { key: 'original', label: 'オリジナル' },
  { key: 'shikaku', label: '四角' },
  { key: 'yoko', label: '横' },
] as const;

type LogoKey = (typeof logoOptions)[number]['key'];

const LOGO_STORAGE_KEY = 'web_mock_logo';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('current');
  const [activeLogo, setActiveLogo] = useState<LogoKey>('original');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalQuantity } = useCart();
  const isLightTheme = activeTheme !== 'current';
  const cartCountLabel = totalQuantity > 99 ? '99+' : String(totalQuantity);
  const showCartCount = totalQuantity > 0;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const normalizedTheme = savedTheme === 'wellness' ? 'washi' : savedTheme;
    const nextTheme = themeOptions.some((item) => item.key === normalizedTheme)
      ? (normalizedTheme as ThemeKey)
      : 'current';

    setActiveTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    const savedLogo = window.localStorage.getItem(LOGO_STORAGE_KEY) as LogoKey | null;
    const nextLogo = logoOptions.some((item) => item.key === savedLogo) ? (savedLogo as LogoKey) : 'original';
    setActiveLogo(nextLogo);
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

  function applyLogo(logo: LogoKey) {
    setActiveLogo(logo);
    window.localStorage.setItem(LOGO_STORAGE_KEY, logo);
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
        className={`relative mx-auto flex max-w-screen-2xl flex-col items-center gap-3 px-4 pt-4 pb-7 md:gap-4 md:px-6 md:pt-5 md:pb-6 lg:px-10 ${
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
          className={`absolute left-4 top-4 z-[80] flex h-9 w-9 items-center justify-center border transition md:left-6 md:h-11 md:w-11 lg:left-10 ${
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

        <Link
          id="site-mobile-cart-link"
          href="/cart"
          aria-label="カートを見る"
          className={`absolute right-4 top-4 z-[80] flex h-9 w-9 items-center justify-center border transition md:hidden ${
            isLightTheme
              ? 'border-mock-border bg-mock-paper text-mock-ink hover:bg-mock-background'
              : 'border-white/18 bg-white/90 text-mock-ink hover:bg-white'
          }`}
        >
          <img src={mockCartIcon.src} alt="" className="h-5 w-5 object-contain" />
          {showCartCount ? (
            <span
              id="site-mobile-cart-count"
              className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-mock-earth px-1 text-[10px] font-semibold leading-none text-white"
            >
              {cartCountLabel}
            </span>
          ) : null}
        </Link>

        <div
          id="site-theme-switcher-wrap"
          className="hidden w-full flex-col items-center gap-2 md:flex lg:absolute lg:right-10 lg:top-5 lg:w-auto lg:items-end"
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
          <Link
            id="site-cart-link"
            href="/cart"
            aria-label="カートを見る"
            className={`relative flex h-11 w-11 items-center justify-center border transition ${
              isLightTheme
                ? 'border-mock-border bg-mock-paper text-mock-ink hover:bg-mock-background'
                : 'border-white/18 bg-white/90 text-mock-ink hover:bg-white'
            }`}
          >
            <img src={mockCartIcon.src} alt="" className="h-5 w-5 object-contain" />
            {showCartCount ? (
              <span
                id="site-cart-count"
                className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-mock-earth px-1 text-[10px] font-semibold leading-none text-white"
              >
                {cartCountLabel}
              </span>
            ) : null}
          </Link>
        </div>

        <div id="site-brand" className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <Link id="site-brand-link" href="/" className="max-w-[calc(100%-4.5rem)] space-y-1 md:max-w-none">
            {activeLogo === 'original' ? (
              <>
                <p
                  id="site-brand-kicker"
                  className={`text-[11px] uppercase tracking-[0.4em] ${
                    isLightTheme ? 'text-mock-muted' : 'text-white/55'
                  }`}
                >
                  {mockSite.mockLabel}
                </p>
                <div id="site-brand-text">
                  <p id="site-brand-ja" className="font-serif text-4xl leading-none md:text-7xl">
                    {mockSite.brandJa}
                  </p>
                  <p
                    id="site-brand-en"
                    className={`text-sm tracking-[0.18em] md:text-base md:tracking-[0.22em] ${`
                      isLightTheme ? 'text-mock-muted' : 'text-white/65'
                    }`}
                  >
                    {mockSite.brandEn}
                  </p>
                </div>
              </>
            ) : activeLogo === 'shikaku' ? (
              <>
                {/* モバイル：中央寄せ画像 */}
                <img
                  id="site-brand-logo-shikaku"
                  src="/images/logo-shikaku.png"
                  alt={mockSite.brandJa}
                  className="mx-auto h-36 w-auto object-contain md:hidden"
                />
                {/* PC：ロゴ左・タイトル右の横並び */}
                <div id="site-brand-logo-shikaku-pc" className="hidden items-center gap-5 md:flex">
                  <img
                    src="/images/logo-shikaku.png"
                    alt={mockSite.brandJa}
                    className="h-32 w-auto object-contain"
                  />
                  <div className="text-left">
                    <p
                      className={`font-serif text-7xl leading-none ${`
                        isLightTheme ? 'text-mock-ink' : 'text-mock-paper'
                      }`}
                    >
                      {mockSite.brandJa}
                    </p>
                    <p
                      className={`mt-1 text-lg tracking-[0.22em] ${`
                        isLightTheme ? 'text-mock-muted' : 'text-white/65'
                      }`}
                    >
                      {mockSite.brandEn}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <img
                id="site-brand-logo-yoko"
                src="/images/logo-yoko.png"
                alt={mockSite.brandJa}
                className="h-24 w-auto object-contain md:h-24"
              />
            )}
          </Link>

          <div id="site-header-controls" className="flex w-full flex-col items-center gap-3">
            <nav
              id="site-primary-nav"
              className={`hidden flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm uppercase tracking-[0.28em] md:flex ${`
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
              <p
                id="site-side-logo-switcher-label"
                className={`mt-6 text-[10px] uppercase tracking-[0.32em] ${
                  isLightTheme ? 'text-mock-muted' : 'text-white/55'
                }`}
              >
                Logo
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {logoOptions.map((logo) => (
                  <button
                    id={`site-side-logo-${logo.key}`}
                    key={logo.key}
                    type="button"
                    onClick={() => applyLogo(logo.key)}
                    className={`border px-3 py-2 text-[10px] tracking-[0.14em] transition ${
                      activeLogo === logo.key
                        ? isLightTheme
                          ? 'border-mock-ink bg-mock-ink text-mock-paper'
                          : 'border-white/70 bg-white/90 text-mock-ink'
                        : isLightTheme
                          ? 'border-mock-border bg-mock-background text-mock-muted hover:bg-mock-paper'
                          : 'border-white/18 bg-white/8 text-white/72 hover:bg-white/14'
                    }`}
                  >
                    {logo.label}
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
