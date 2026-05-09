import type { Metadata } from 'next'
import { setRequestLocale, getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for OnTheCanals Amsterdam — how we handle your data.',
}

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('common')

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-5">
        {locale !== 'en' && (
          <div className="bg-canal-light border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-canal-dark">
            🌐 {tc('enOnlyNotice')}
          </div>
        )}
        <h1 className="font-display font-black text-canal-dark text-3xl mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: April 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-sm leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">1. Who we are</h2>
            <p>OnTheCanals Amsterdam is an independent platform that helps visitors discover and compare water activities on the Amsterdam canals. We are based in Amsterdam, the Netherlands.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">2. What data we collect</h2>
            <p>We collect minimal data. Specifically:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Contact form submissions</strong> — name, email address and your message, when you use our contact form.</li>
              <li><strong>Analytics data</strong> — anonymised page views and visitor statistics via our analytics provider.</li>
              <li><strong>Affiliate tracking</strong> — when you click a booking link, our affiliate partner (GetYourGuide) may set cookies to track the referral. See section 4 below.</li>
            </ul>
            <p className="mt-3">We do not collect payment information. All bookings are completed on the provider's own website or platform.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">3. How we use your data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To respond to contact form submissions</li>
              <li>To understand how our platform is used (anonymised analytics)</li>
              <li>To improve the platform and the information we provide</li>
            </ul>
            <p className="mt-3">We do not sell your data to third parties. We do not use your data for automated decision-making or profiling.</p>
          </section>

          <section id="affiliate">
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">4. Affiliate links & partner tracking</h2>
            <p>Some booking links on OnTheCanals.Amsterdam are <strong>affiliate links</strong>. This means that when you click a link and make a booking, we may receive a small commission from the booking platform — at no additional cost to you.</p>
            <p className="mt-3">Our current affiliate partners include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>GetYourGuide</strong> (getyourguide.com) — affiliate partner ID: SA8A0PZ</li>
            </ul>
            <p className="mt-3">When you click a GetYourGuide link, GetYourGuide may place cookies on your device to track the referral and attribute any resulting booking to our account. This tracking is subject to <a href="https://www.getyourguide.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-canal hover:underline">GetYourGuide's privacy policy</a>.</p>
            <p className="mt-3">Affiliate commissions help us keep OnTheCanals.Amsterdam free and independent. Our editorial recommendations are not influenced by commercial relationships — we list activities based on quality and relevance to visitors.</p>
            <p className="mt-3">This disclosure is made in accordance with Dutch consumer protection law (Wet oneerlijke handelspraktijken) and the guidelines of the Autoriteit Consument & Markt (ACM).</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">5. Cookies</h2>
            <p>We use the following types of cookies:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Functional cookies</strong> — required for the website to work correctly.</li>
              <li><strong>Analytics cookies</strong> — anonymised visitor statistics.</li>
              <li><strong>Third-party affiliate cookies</strong> — set by GetYourGuide when you click a booking link.</li>
            </ul>
            <p className="mt-3">You can disable cookies in your browser settings. Disabling cookies may affect some functionality of the site.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">6. Your rights (AVG / GDPR)</h2>
            <p>Under the General Data Protection Regulation (GDPR / AVG), you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Lodge a complaint with the Dutch data protection authority (<a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-canal hover:underline">Autoriteit Persoonsgegevens</a>)</li>
            </ul>
            <p className="mt-3">To exercise your rights, contact us via the <a href={locale === "en" ? "/contact" : `/${locale}/contact`} className="text-canal hover:underline">contact page</a>.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-lg mb-3">7. Contact</h2>
            <p>For privacy-related questions, please use our <a href={locale === "en" ? "/contact" : `/${locale}/contact`} className="text-canal hover:underline">contact form</a> or email us at <a href="mailto:hello@onthecanals.nl" className="text-canal hover:underline">hello@onthecanals.nl</a>.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
