import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/components/cart/CartProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | 四国ボタニカ',
    default: '四国ボタニカ — 四国の植物の知恵を、日常へ。',
  },
  description:
    '四国ボタニカは、イタリア語の botanica（植物・植物学）にちなみ、四国の植物・薬草の知恵を日常へ届けるブランドです。',
  keywords: ['四国ボタニカ', 'Shikoku Botanica', 'botanica', '植物', '薬草', 'イヌトウキ', '漢方'],
  openGraph: {
    title: '四国ボタニカ',
    description: '四国の植物の知恵を、日常へ。薬草と生薬の背景を大切にしたボタニカルブランド。',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Fonts — loaded via <link> for static export compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Noto+Serif+JP:wght@300;400;500;600&family=Noto+Sans+JP:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-brand-text">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
