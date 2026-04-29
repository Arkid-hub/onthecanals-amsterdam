import { setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)

  return (
    <div className="min-h-screen bg-[#faf7f2] pt-16">
      <div className="bg-[#0a3d52] pt-12 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-display font-black text-white text-4xl mb-3">Algemene Voorwaarden</h1>
          <p className="text-white/60">Laatst bijgewerkt: april 2026</p>
        </div>
      </div>

      <div className="bg-[#0a3d52] overflow-hidden" style={{ height: 32 }}>
        <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ height: 32, width: '100%' }}>
          <path d="M0,20 C200,40 400,0 600,20 C800,40 1000,0 1200,20 L1200,40 L0,40 Z" fill="#faf7f2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-12">
        <div className="space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">1. Definities</h2>
            <p>In deze algemene voorwaarden wordt verstaan onder:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Platform:</strong> OnTheCanals.Amsterdam, bereikbaar via onthecanals.nl</li>
              <li><strong>Gebruiker:</strong> iedere persoon die het platform bezoekt of gebruikt</li>
              <li><strong>Aanbieder:</strong> een bedrijf of persoon die wateractiviteiten aanbiedt via het platform</li>
              <li><strong>Activiteit:</strong> een wateractiviteit op of aan de Amsterdamse grachten</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">2. Toepasselijkheid</h2>
            <p>Deze algemene voorwaarden zijn van toepassing op alle gebruik van het platform OnTheCanals.Amsterdam. Door gebruik te maken van het platform gaat u akkoord met deze voorwaarden. Nederlands recht is van toepassing.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">3. Aard van het platform</h2>
            <p>OnTheCanals.Amsterdam is een informatief platform dat bezoekers informeert over wateractiviteiten op de Amsterdamse grachten en doorverwijst naar externe aanbieders. OnTheCanals.Amsterdam is geen partij bij de overeenkomst tussen de gebruiker en de aanbieder. Boekingen en betalingen vinden uitsluitend plaats via de externe websites van de aanbieders.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">4. Aansprakelijkheid</h2>
            <p>OnTheCanals.Amsterdam spant zich in om de informatie op het platform zo accuraat en actueel mogelijk te houden, maar kan de juistheid, volledigheid of actualiteit niet garanderen.</p>
            <p className="mt-3">OnTheCanals.Amsterdam is niet aansprakelijk voor:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Onjuiste of verouderde informatie over activiteiten of aanbieders</li>
              <li>Schade ontstaan tijdens of als gevolg van een geboekte activiteit</li>
              <li>Het niet nakomen van afspraken door een aanbieder</li>
              <li>Prijswijzigingen bij de aanbieder na publicatie op het platform</li>
              <li>Technische storingen of tijdelijke onbeschikbaarheid van het platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">5. Intellectueel eigendom</h2>
            <p>Alle content op OnTheCanals.Amsterdam, waaronder teksten, afbeeldingen, logo's en het ontwerp, zijn eigendom van OnTheCanals.Amsterdam of zijn rechthebbenden. Het is niet toegestaan deze content te kopiëren, verspreiden of commercieel te gebruiken zonder voorafgaande schriftelijke toestemming.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">6. Aanbieders</h2>
            <p>Aanbieders die hun activiteiten op het platform willen vermelden, gaan akkoord met de volgende voorwaarden:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>De aangeboden informatie is correct en actueel</li>
              <li>De aanbieder beschikt over alle vereiste vergunningen en verzekeringen</li>
              <li>De aanbieder voldoet aan alle toepasselijke wet- en regelgeving</li>
              <li>Wijzigingen in het aanbod worden tijdig doorgegeven aan OnTheCanals.Amsterdam</li>
            </ul>
            <p className="mt-3">OnTheCanals.Amsterdam behoudt zich het recht voor om aanbieders zonder opgave van redenen te verwijderen van het platform.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">7. Gebruik van het platform</h2>
            <p>Het is gebruikers niet toegestaan het platform te gebruiken voor:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Het verspreiden van onjuiste of misleidende informatie</li>
              <li>Het schenden van de rechten van derden</li>
              <li>Handelingen die in strijd zijn met de wet of goede zeden</li>
              <li>Het overbelasten of verstoren van de technische infrastructuur van het platform</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">8. Links naar externe websites</h2>
            <p>Het platform bevat links naar externe websites van aanbieders. OnTheCanals.Amsterdam heeft geen controle over de inhoud van deze websites en is niet verantwoordelijk voor de privacy of het beleid van deze externe partijen.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">9. Wijzigingen</h2>
            <p>OnTheCanals.Amsterdam behoudt zich het recht voor deze algemene voorwaarden te wijzigen. De meest actuele versie is altijd beschikbaar op onthecanals.nl/terms. Voortgezet gebruik van het platform na wijziging geldt als acceptatie van de nieuwe voorwaarden.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">10. Toepasselijk recht en geschillen</h2>
            <p>Op deze algemene voorwaarden is uitsluitend Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement Amsterdam, tenzij de wet anders bepaalt.</p>
          </section>

          <section>
            <h2 className="font-display font-bold text-canal-dark text-xl mb-3">11. Contact</h2>
            <p>Voor vragen over deze algemene voorwaarden kunt u contact opnemen via:</p>
            <p className="mt-2"><strong>OnTheCanals.Amsterdam</strong><br />Amsterdam, Nederland<br />info@onthecanals.amsterdam</p>
          </section>

        </div>
      </div>
    </div>
  )
}
