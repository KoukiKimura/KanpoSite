import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart/CartProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockSite } from '@/lib/mock/site';

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_MOCK_SITE_URL ?? 'http://localhost:3000',
);
const assetBasePath =
  metadataBase.pathname && metadataBase.pathname !== '/'
    ? metadataBase.pathname.replace(/\/$/, '')
    : '';

export const metadata: Metadata = {
  metadataBase,
  icons: {
    icon: [
      { url: `${assetBasePath}/favicon.ico`, sizes: 'any' },
      { url: `${assetBasePath}/favicon.svg`, type: 'image/svg+xml' },
    ],
    shortcut: [`${assetBasePath}/favicon.ico`],
  },
  title: {
    default: `${mockSite.brandJa} | デザインモック`,
    template: `%s | ${mockSite.brandJa}`,
  },
  description:
    '農園、商品、古民家の見せ方を確認するための静的デザインモックです。トップスライダーと画像中心の構成を確認します。',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: `${mockSite.brandJa} | デザインモック`,
    description:
      'トップスライダー、商品一覧、古民家ページのレイアウト確認用モックです。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html id="site-root" lang="ja" data-theme="current" suppressHydrationWarning>
      <body id="site-body">
        <CartProvider>
          <Header />
          <main id="site-main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
