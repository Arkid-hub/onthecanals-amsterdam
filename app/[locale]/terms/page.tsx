import { setRequestLocale, getTranslations } from 'next-intl/server'
import { locales } from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const tc = await getTranslations('common')

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-display font-black text-white text-4xl mb-3">Terms &amp; Conditions</h1>
          <p className="text-white/60">Last updated: April 2026</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12">
        {locale !== 'en' && (
          <div className="bg-canal-light border border-blue-100 rounded-xl px-4 py-3 mb-6 text-sm text-canal-dark">
            🌐 {tc('enOnlyNotice')}
          </div>
        )}
        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">1. Definitions</h2>
            <p>In these terms and conditions, the following definitions apply:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Platform:</strong> OnTheCanals.Amsterdam, accessible via onthecanals.nl</li>
              <li><strong>User:</strong> any person who visits or uses the platform</li>
              <li><strong>Provider:</strong> a company or individual offering water activities via the platform</li>
              <li><strong>Activity:</strong> a water activity on or along the Amsterdam canals</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">2. Applicability</h2>
            <p>These terms and conditions apply to all use of the OnTheCanals.Amsterdam platform. By using the platform, you agree to these terms. Dutch law applies.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">3. Nature of the platform</h2>
            <p>OnTheCanals.Amsterdam is an informational platform that helps visitors discover water activities on the Amsterdam canals and directs them to external providers. OnTheCanals.Amsterdam is not a party to any agreement between the user and the provider. All bookings and payments take place exclusively via the external websites of the providers.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">4. Liability</h2>
            <p>OnTheCanals.Amsterdam makes every effort to keep the information on the platform as accurate and up to date as possible, but cannot guarantee the correctness, completeness or currency of the information.</p>
            <p className="mt-3">OnTheCanals.Amsterdam is not liable for:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Incorrect or outdated information about activities or providers</li>
              <li>Damage arising during or as a result of a booked activity</li>
              <li>Failure by a provider to fulfil their obligations</li>
              <li>Price changes by the provider after publication on the platform</li>
              <li>Technical failures or temporary unavailability of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">5. Intellectual property</h2>
            <p>All content on OnTheCanals.Amsterdam, including texts, images, logos and design, is the property of OnTheCanals.Amsterdam or its rights holders. Copying, distributing or commercially using this content without prior written permission is not permitted.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">6. Providers</h2>
            <p>Providers who wish to list their activities on the platform agree to the following conditions:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>The information provided is accurate and up to date</li>
              <li>The provider holds all required permits and insurance</li>
              <li>The provider complies with all applicable laws and regulations</li>
              <li>Any changes to the offering are communicated to OnTheCanals.Amsterdam in a timely manner</li>
            </ul>
            <p className="mt-3">OnTheCanals.Amsterdam reserves the right to remove providers from the platform without stating reasons.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">7. Use of the platform</h2>
            <p>Users are not permitted to use the platform for:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Spreading false or misleading information</li>
              <li>Infringing the rights of third parties</li>
              <li>Actions that are contrary to the law or public morality</li>
              <li>Overloading or disrupting the technical infrastructure of the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">8. Links to external websites</h2>
            <p>The platform contains links to external provider websites. OnTheCanals.Amsterdam has no control over the content of these websites and is not responsible for the privacy practices or policies of these third parties.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">9. Changes</h2>
            <p>OnTheCanals.Amsterdam reserves the right to amend these terms and conditions. The most current version is always available at onthecanals.nl/terms. Continued use of the platform after changes have been made constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">10. Governing law and disputes</h2>
            <p>These terms and conditions are exclusively governed by Dutch law. Disputes will be submitted to the competent court in the district of Amsterdam, unless the law provides otherwise.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">11. Contact</h2>
            <p>For questions about these terms and conditions, please contact us at:</p>
            <p className="mt-2"><strong>OnTheCanals.Amsterdam</strong><br />Amsterdam, the Netherlands<br />info@onthecanals.amsterdam</p>
          </section>

        </div>
      </div>
    </div>
  )
}
