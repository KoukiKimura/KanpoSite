import { mockContactTopics } from '@/lib/mock/site';

export default function ContactPage() {
  return (
    <>
      <section id="contact-heading-section" className="border-b border-mock-border bg-[rgba(255,255,255,0.35)]">
        <div id="contact-heading-inner" className="mock-shell py-16 md:py-20">
          <div id="contact-heading" className="flex flex-col gap-4 text-left items-start">
            <h2 id="contact-heading-title" className="font-serif text-2xl text-mock-ink md:text-3xl">
              お問い合わせ
            </h2>
            <p id="contact-heading-body" className="max-w-2xl text-sm leading-8 text-mock-muted md:text-base">
              商品のこと、古民家のこと、取材や訪問のことなど、気になることがあればこちらからご連絡ください。
            </p>
          </div>
        </div>
      </section>

      <section id="contact-content-section" className="mock-section">
        <div id="contact-content-layout" className="mock-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside id="contact-topics-panel" className="mock-card p-8">
            <h3 id="contact-topics-title" className="font-serif text-2xl text-mock-ink">
              お問い合わせ内容
            </h3>
            <ul id="contact-topics-list" className="mt-6 space-y-3 text-sm leading-8 text-mock-muted">
              {mockContactTopics.map((topic, index) => (
                <li id={`contact-topic-${index + 1}`} key={topic} className="border-b border-mock-border pb-3">
                  {topic}
                </li>
              ))}
            </ul>
          </aside>

          <div id="contact-form-panel" className="mock-card p-8">
            <form id="contact-form" className="grid gap-6">
              <div id="contact-form-row-basic" className="grid gap-6 md:grid-cols-2">
                <label id="contact-name-field" className="grid gap-2 text-sm text-mock-ink">
                  お名前
                  <input
                    id="contact-name-input"
                    name="name"
                    type="text"
                    className="border border-mock-border bg-white px-4 py-3"
                    placeholder="山田 花子"
                  />
                </label>
                <label id="contact-email-field" className="grid gap-2 text-sm text-mock-ink">
                  メールアドレス
                  <input
                    id="contact-email-input"
                    name="email"
                    type="email"
                    className="border border-mock-border bg-white px-4 py-3"
                    placeholder="example@example.com"
                  />
                </label>
              </div>

              <label id="contact-category-field" className="grid gap-2 text-sm text-mock-ink">
                お問い合わせ種別
                <select id="contact-category-select" name="category" className="border border-mock-border bg-white px-4 py-3">
                  {mockContactTopics.map((topic, index) => (
                    <option id={`contact-category-option-${index + 1}`} key={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>

              <label id="contact-message-field" className="grid gap-2 text-sm text-mock-ink">
                本文
                <textarea
                  id="contact-message-input"
                  name="message"
                  className="min-h-48 border border-mock-border bg-white px-4 py-3"
                  placeholder="ご希望の日程や内容、気になっていることをご記入ください。"
                />
              </label>

              <div
                id="contact-response-note"
                className="mock-note-panel rounded-sm border border-mock-border p-5 text-sm leading-8 text-mock-muted"
              >
                返信には数日いただく場合があります。お急ぎの確認が必要な場合は、古民家の候補日程とあわせてご記入ください。
              </div>

              <button id="contact-submit-button" type="button" className="mock-button-primary w-fit">
                送信する
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
