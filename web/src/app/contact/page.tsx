import { Metadata } from 'next';
import ContactClient from '@/components/ui/ContactClient';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: '四国ボタニカへのお問い合わせはこちらからどうぞ。商品・古民家・畑見学など、お気軽にご連絡ください。',
};

export default function ContactPage() {
  return <ContactClient />;
}
