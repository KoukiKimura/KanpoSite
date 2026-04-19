import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | 山草の恵み',
    default: '山草の恵み — 自然の力を、日常へ。',
  },
  description:
    '山草の恵みは、自然の生薬を丁寧に育て、日本の漢方の知恵を現代の日常へお届けするブランドです。',
  keywords: ['漢方', '生薬', '健康茶', '自然素材', '山草の恵み', 'Sansou no Megumi'],
  openGraph: {
    title: '山草の恵み',
    description: '自然の力を、日常へ。漢方の知恵を活かした生薬茶のブランド。',
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
