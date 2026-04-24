import { mockSite } from '@/lib/mock/site';

export default function Footer() {
  return (
    <footer id="site-footer" className="mock-footer-bg border-t border-mock-border">
      <div id="site-footer-inner" className="mx-auto grid max-w-screen-2xl gap-8 px-6 py-12 text-sm text-mock-muted lg:grid-cols-[1.05fr_0.75fr_0.85fr] lg:px-10">
        <div id="site-footer-brand" className="space-y-3">
          <p id="site-footer-brand-kicker" className="text-xs uppercase tracking-[0.35em] text-mock-gold">山草のめぐみ</p>
          <p id="site-footer-brand-title" className="font-serif text-3xl text-mock-ink">{mockSite.brandJa}</p>
          <p className="max-w-2xl leading-8">
            里山の古民家で和漢の草木を育て、お茶、粉薬、錠剤へと静かに仕立てています。畑の景色と暮らしの手ざわりが、そのまま伝わる場所でありたいと考えています。
          </p>
        </div>
        <div id="site-footer-story" className="space-y-3">
          <p id="site-footer-story-kicker" className="text-xs uppercase tracking-[0.35em] text-mock-gold">古民家と畑</p>
          <p id="site-footer-story-body" className="leading-8">
            築年数を重ねた家の時間と、季節ごとに変わる畑の景色。その両方を行き来しながら、日々に寄り添う養生を届けます。
          </p>
          <p id="site-footer-story-en" className="text-xs tracking-[0.24em]">
            {mockSite.brandEn}
          </p>
        </div>
        <div id="site-footer-contact" className="space-y-4">
          <p id="site-footer-contact-kicker" className="text-xs uppercase tracking-[0.35em] text-mock-gold">お問い合わせ</p>
          <div id="site-footer-contact-list" className="space-y-2 leading-8">
            <p id="site-footer-contact-email-row">
              メール:{' '}
              <a id="site-footer-contact-email" href={`mailto:${mockSite.contact.email}`} className="transition hover:text-mock-ink">
                {mockSite.contact.email}
              </a>
            </p>
            <p id="site-footer-contact-phone-row">
              電話:{' '}
              <a id="site-footer-contact-phone" href={`tel:${mockSite.contact.phone}`} className="transition hover:text-mock-ink">
                {mockSite.contact.phone}
              </a>
            </p>
          </div>
          <div id="site-footer-social-links" className="flex flex-wrap gap-3 pt-1">
            <a
              id="site-footer-social-line"
              href={mockSite.contact.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-mock-ink px-4 py-2 text-xs uppercase tracking-[0.24em] text-mock-ink transition hover:bg-mock-ink hover:text-mock-paper"
            >
              Line
            </a>
            <a
              id="site-footer-social-facebook"
              href={mockSite.contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-mock-ink px-4 py-2 text-xs uppercase tracking-[0.24em] text-mock-ink transition hover:bg-mock-ink hover:text-mock-paper"
            >
              Facebook
            </a>
            <a
              id="site-footer-social-instagram"
              href={mockSite.contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center border border-mock-ink px-4 py-2 text-xs uppercase tracking-[0.24em] text-mock-ink transition hover:bg-mock-ink hover:text-mock-paper"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
