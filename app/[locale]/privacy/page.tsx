import { setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-display font-black text-white text-4xl mb-3">Privacy Policy</h1>
          <p className="text-white/60">Laatst bijgewerkt: april 2026</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12 prose prose-slate">
        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">1. Wie zijn wij?</h2>
            <p>OnTheCanals.Amsterdam is een platform dat wateractiviteiten op de Amsterdamse grachten verzamelt, vergelijkt en doorverwijst naar externe aanbieders. Wij zijn gevestigd in Amsterdam, Nederland en zijn bereikbaar via info@onthecanals.amsterdam.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">2. Welke gegevens verzamelen wij?</h2>
            <p>Wij verzamelen alleen de gegevens die u zelf aan ons verstrekt via het contactformulier:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Naam</li>
              <li>E-mailadres</li>
              <li>Uw bericht</li>
              <li>Het type gebruiker (bezoeker, aanbieder, pers)</li>
            </ul>
            <p className="mt-3">Wij verwerken geen betalingsgegevens. Boekingen vinden plaats via de externe websites van de aanbieders.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
            <p>Uw gegevens worden uitsluitend gebruikt om:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Uw contactverzoek te beantwoorden</li>
              <li>U te informeren over uw aanvraag als aanbieder</li>
            </ul>
            <p className="mt-3">Wij verkopen uw gegevens niet aan derden en gebruiken ze niet voor commerciële mailings zonder uw toestemming.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">4. Grondslag voor verwerking</h2>
            <p>De verwerking van uw persoonsgegevens is gebaseerd op uw toestemming (artikel 6 lid 1 sub a AVG) en op de uitvoering van een overeenkomst of het nemen van precontractuele maatregelen (artikel 6 lid 1 sub b AVG).</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">5. Bewaartermijn</h2>
            <p>Wij bewaren uw gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld. Contactverzoeken worden maximaal 12 maanden bewaard, tenzij een wettelijke bewaarplicht anders vereist.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">6. Cookies en analytics</h2>
            <p>OnTheCanals.Amsterdam maakt gebruik van functionele cookies die noodzakelijk zijn voor het functioneren van de website. Wij kunnen gebruik maken van geanonimiseerde analysediensten om het gebruik van de website te meten. Er worden geen tracking cookies geplaatst zonder uw toestemming.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">7. Uw rechten</h2>
            <p>Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Recht op inzage in uw persoonsgegevens</li>
              <li>Recht op rectificatie van onjuiste gegevens</li>
              <li>Recht op verwijdering van uw gegevens</li>
              <li>Recht op beperking van de verwerking</li>
              <li>Recht op overdraagbaarheid van gegevens</li>
              <li>Recht van bezwaar tegen de verwerking</li>
            </ul>
            <p className="mt-3">U kunt deze rechten uitoefenen door contact op te nemen via info@onthecanals.amsterdam. Wij reageren binnen 30 dagen op uw verzoek.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">8. Klachten</h2>
            <p>Heeft u een klacht over de verwerking van uw persoonsgegevens? Dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens via <a href="https://www.autoriteitpersoonsgegevens.nl" className="text-canal underline" target="_blank" rel="noopener noreferrer">autoriteitpersoonsgegevens.nl</a>.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">9. Beveiliging</h2>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen tegen verlies, diefstal of onbevoegde toegang. Onze website maakt gebruik van een beveiligde HTTPS-verbinding.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">10. Wijzigingen</h2>
            <p>Wij behouden ons het recht voor deze privacyverklaring te wijzigen. De meest actuele versie is altijd te vinden op onthecanals.nl/privacy. Wij raden u aan deze pagina regelmatig te raadplegen.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">11. Contact</h2>
            <p>Voor vragen over deze privacyverklaring kunt u contact opnemen via:</p>
            <p className="mt-2"><strong>OnTheCanals.Amsterdam</strong><br />Amsterdam, Nederland<br />info@onthecanals.amsterdam</p>
          </section>

        </div>
      </div>
    </div>
  )
}
