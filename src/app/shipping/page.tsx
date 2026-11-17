import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Livraison",
  description: "Politique de livraison KFK (KUN FAYA KUN) : zones de livraison, coûts, délais et transporteurs.",
};

export default function ShippingPage() {
  const { legal, brand } = siteConfig;

  return (
    <LegalDocument
      title="Politique de Livraison"
      description="Où nous livrons, combien cela coûte et combien de temps cela prend."
    >
      <section className="legal-section">
        <h2>Zones de Livraison</h2>
        <p>
          {brand.name} ({brand.shortName}) livre en : <strong>{legal.shippingCountries.join(", ")}</strong>.
          Les pays disponibles s'affichent au paiement. Nous ne livrons pas vers les pays non listés au paiement.
        </p>
      </section>

      <section className="legal-section">
        <h2>Frais de Livraison</h2>
        <p>
          Livraison standard : <strong>{formatPrice(legal.shippingCostBase)}</strong>
          pour les commandes jusqu'à <strong>{formatPrice(legal.shippingCostThreshold)}</strong>.
        </p>
        <p>
          <strong>Livraison offerte</strong> dès
          <strong>{formatPrice(legal.shippingCostThreshold)}</strong> d'achat.
        </p>
        <p>
          Le montant affiché au paiement au moment de la commande fait foi.
          Les options de livraison express (si disponibles) seront affichées au paiement avec leurs suppléments.
        </p>
      </section>

      <section className="legal-section">
        <h2>Délais & Transporteurs</h2>
        <p>
          <strong>[DÉLAIS DE LIVRAISON, TRANSPORTEURS, TEMPS DE TRAITEMENT & PROCÉDURE DE RETARD À COMPLÉTER]</strong>
        </p>
        <p>
          Estimations typiques (jours ouvrés, à vérifier) :
        </p>
        <ul>
        <li>Bénin : [X–Y jours ouvrés]</li>
        <li>Afrique de l'Ouest : [X–Y jours ouvrés]</li>
        <li>Reste de l'Afrique : [X–Y jours ouvrés]</li>
        <li>International : [X–Y jours ouvrés]</li>
        </ul>
        <p>
          Temps de traitement : [X jours ouvrés après confirmation du paiement].
          Transporteurs : [DHL, FedEx, Aramex, partenaires locaux — à confirmer].
        </p>
        <p>
          En cas de retard, nous vous informerons par email. Pour colis perdus ou
          endommagés, contactez-nous à {siteConfig.contact.email} dans les
          [X] jours suivant la date de livraison prévue.
        </p>
      </section>

      <section className="legal-section">
        <h2>Douanes & Droits d'Importation (International)</h2>
        <p>
          Les commandes expédiées hors du Bénin peuvent être soumises à des droits de douane, taxes
          et frais imposés par le pays de destination. Ces frais sont à la charge du destinataire
          et ne sont pas inclus dans le total de la commande. Nous ne pouvons ni prévoir ni
          contrôler ces frais. Contactez votre bureau de douane local pour plus de détails.
        </p>
      </section>

      <section className="legal-section">
        <h2>Problèmes de Livraison</h2>
        <p>
          Si votre commande arrive endommagée, incomplète ou incorrecte, contactez-nous
          à {siteConfig.contact.email} dans les [X] jours avec photos et votre
          numéro de commande. Nous organiserons un remplacement ou un remboursement selon notre
          <a href="/retours">Politique de Retour</a>.
        </p>
      </section>
    </LegalDocument>
  );
}