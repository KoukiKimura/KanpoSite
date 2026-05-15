'use client';

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Link from 'next/link';

const faqs = [
  {
    q: '商品の購入方法を教えてください。',
    a: '現在、オンラインでの購入機能は準備中です。お問い合わせフォームよりご連絡いただくか、メールにてご注文を承っております。',
  },
  {
    q: '体質に合ったお茶の選び方がわかりません。',
    a: '各商品のページに使用目的の説明を記載しています。ご不明な場合はお問い合わせください。体質に合わせたご提案をさせていただきます。',
  },
  {
    q: '定期購入はできますか？',
    a: '現在は個別のご注文のみ承っております。定期購入サービスについては将来的に検討中です。',
  },
  {
    q: '畑の見学はできますか？',
    a: '畑見学については不定期で受け付けています。ゲストハウスのオープン後は、宿泊プランに含まれる予定です。見学希望の方はお問い合わせください。',
  },
  {
    q: '送料はどのくらいかかりますか？',
    a: '送料は発送先地域によって異なります。注文確定時にお知らせいたします。',
  },
];

export default function ContactClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 送信機能は将来実装予定（現在はメールにて受付）
    setSubmitted(true);
  };

  return (
    <>
      {/* ページヘッダー */}
      <div className="bg-primary-dark text-white pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-site text-center">
          <p
            className="text-xs tracking-[0.3em] text-white/50 uppercase mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Contact
          </p>
          <h1
            className="heading-lg text-white"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            お問い合わせ
          </h1>
          <div className="w-12 h-px bg-accent mx-auto mt-5" />
        </div>
      </div>

      <section className="section-padding bg-brand-bg">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* コンタクトフォーム */}
            <div className="lg:col-span-2">
              <SectionTitle
                title="メッセージを送る"
                titleEn="Send a Message"
                align="left"
                subtitle="以下のフォームよりお問い合わせください。通常2〜3営業日以内にご返信いたします。"
              />

              {/* TODO: 送信機能は将来実装予定（現在はメールにて受付） */}
              <p className="text-xs text-accent bg-accent/10 px-4 py-3 mb-8 border border-accent/20">
                ※ 現在、フォームの送信機能は準備中です。お問い合わせはメール（info@shikoku-botanica.jp）にて受け付けております。
              </p>

              {submitted ? (
                <div className="p-8 bg-primary/5 border border-primary/20 text-center">
                  <p className="text-2xl mb-3">✉️</p>
                  <h3 className="text-lg font-serif text-primary mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                    フォーム機能は準備中です
                  </h3>
                  <p className="text-sm text-brand-muted leading-loose">
                    恐れ入りますが、現在フォームからの送信はできません。<br />
                    <a href="mailto:info@shikoku-botanica.jp" className="text-primary underline hover:no-underline">info@shikoku-botanica.jp</a> へ直接メールをお送りください。
                  </p>
                  <button
                    className="mt-6 text-sm text-primary underline hover:no-underline"
                    onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', subject: '', message: '' }); }}
                  >
                    戻る
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs tracking-widest text-brand-text mb-2">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full border border-brand-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="山田 太郎"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs tracking-widest text-brand-text mb-2">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full border border-brand-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs tracking-widest text-brand-text mb-2">
                      件名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full border border-brand-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                      placeholder="商品について"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs tracking-widest text-brand-text mb-2">
                      メッセージ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={7}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full border border-brand-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="お問い合わせの内容をご記入ください。"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    送信する
                  </button>
                </form>
              )}
            </div>

            {/* サイドバー：連絡先情報 */}
            <div className="lg:col-span-1">
              <SectionTitle
                title="連絡先"
                titleEn="Contact Info"
                align="left"
              />
              <div className="space-y-6 text-sm text-brand-muted leading-loose">
                <div>
                  <p className="text-xs tracking-widest text-brand-text mb-1">メール</p>
                  <p>info@shikoku-botanica.jp（仮）</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-brand-text mb-1">電話番号</p>
                  <p>000-000-0000（仮）</p>
                  <p className="text-xs text-brand-muted/70">受付時間: 平日 10:00〜17:00</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-brand-text mb-1">所在地</p>
                  <p>〒000-0000<br />○○県○○市○○町0-0-0（仮）</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-brand-text mb-2">Facebook</p>
                  <span
                    aria-disabled="true"
                    className="text-brand-muted text-xs tracking-widest line-through select-none"
                  >
                    Facebookページ（仮）
                  </span>
                </div>
              </div>

              {/* 返信目安 */}
              <div className="mt-8 p-5 bg-brand-cream border border-brand-border">
                <p className="text-xs tracking-widest text-brand-text mb-2">返信について</p>
                <p className="text-xs text-brand-muted leading-loose">
                  通常2〜3営業日以内にご返信いたします。
                  お急ぎの場合はお電話にてお問い合わせください。
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 lg:mt-28 max-w-3xl mx-auto">
            <SectionTitle
              title="よくあるご質問"
              titleEn="FAQ"
              subtitle="お問い合わせの多いご質問をまとめました。"
            />
            <div className="divide-y divide-brand-border border border-brand-border">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    className="w-full text-left flex items-start justify-between gap-4 px-6 py-5 hover:bg-brand-cream transition-colors duration-200"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-sm tracking-wide font-medium text-brand-text pr-4">
                      Q. {faq.q}
                    </span>
                    <span className={`text-primary flex-shrink-0 text-lg transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-brand-muted leading-loose">A. {faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
