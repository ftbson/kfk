"use client";

import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/currency";

export default function TermsContent() {
  const { legal, contact, brand } = siteConfig;

  return (
    <>
      <section className="legal-section">
        <h2>1. Fournisseur & Champ d'Application</h2>
        <p>
          Les présentes Conditions Générales de Vente (« Conditions ») régissent les commandes
          passées dans la boutique en ligne {brand.name} ({brand.shortName}). Le cocontractant est
          <strong>{legal.companyName}</strong>, {legal.companyLegalForm},
          {legal.companyAddress}, {legal.companyCountry}. Merci de compléter et
          vérifier ces informations avant publication.
        </p>
        <p>
          La boutique livre actuellement en {legal.shippingCountries.join(", ")}.
          La zone de livraison réelle et toute déviation sont visibles au paiement
          avant de valider la commande.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Produits & Disponibilité</h2>
        <p>
          Les présentations de produits dans la boutique sont à titre informatif.
          Les détails produits, prix et informations de livraison affichés au moment
          de la commande font foi. Les images peuvent différer du produit livré.
          La disponibilité est affichée dans la boutique ou confirmée après commande.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Prix & Frais de Livraison</h2>
        <p>
          Les prix sont affichés en FCFA.
          Le traitement de la TVA et des droits applicables doit être complété par
          le fournisseur avant publication : <strong>[MENTION TVA / DROITS À COMPLÉTER]</strong>.
        </p>
        <p>
          Selon le paiement actuel, les frais de livraison sont de {formatPrice(legal.shippingCostBase)}
          pour les commandes jusqu'à {formatPrice(legal.shippingCostThreshold)} inclus ;
          la livraison est offerte pour les commandes supérieures à {formatPrice(legal.shippingCostThreshold)}.
          Si ces conditions ne s'appliquent pas de façon permanente, elles doivent être ajustées avant publication.
          Le montant affiché au paiement au moment de la commande fait foi.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Commande & Formation du Contrat</h2>
        <p>
          Après validation de la commande, les données sont enregistrées et les
          instructions de paiement par virement sont affichées. La commande reçoit
          initialement le statut « en attente ». Le moment où le contrat d'achat
          devient contraignant et comment la confirmation s'effectue doivent être
          clairement définis par le fournisseur :
          <strong>[FORMATION DU CONTRAT & CONFIRMATION À DÉFINIR]</strong>.
        </p>
        <p>
          Merci de vérifier vos informations avant de valider. En cas d'erreur,
          contactez le service client à <strong>{contact.email}</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Paiement</h2>
        <p>
          Le paiement actuel prévoit le paiement par virement bancaire. Les
          coordonnées bancaires individuelles et le montant à virer sont affichés
          après validation de la commande. Délai de paiement, conséquences de
          non-paiement et éventuels modes de paiement supplémentaires :
          <strong>[CONDITIONS DE PAIEMENT À COMPLÉTER]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Livraison</h2>
        <p>
          La livraison s'effectue à l'adresse indiquée au paiement dans un pays
          de livraison proposé. Délais de livraison contraignants, transporteurs,
          restrictions et procédures en cas de retard ou échec de livraison :
          <strong>[CONDITIONS DE LIVRAISON À COMPLÉTER]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Annulation, Retours & Défauts</h2>
        <p>
          Délai de retour, conditions, frais de retour, processus de remboursement
          et éventuelles exclusions doivent être déterminés par le fournisseur :
          <strong>[RÈGLES DE RETOUR & REMBOURSEMENT À COMPLÉTER]</strong>.
        </p>
        <p>
          Merci de décrire également les conditions de garantie légale et contractuelle
          ainsi que le processus de notification des défauts :
          <strong>[RÈGLES DE GARANTIE & DÉFAUTS À COMPLÉTER]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Protection des Données</h2>
        <p>
          Les informations sur le traitement des données personnelles se trouvent dans notre
          <a href="/legal/privacy">Politique de Confidentialité</a>.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Droit Applicable & Litiges</h2>
        <p>
          Le droit applicable, la juridiction compétente et les éventuelles dispositions
          impératives de protection des consommateurs doivent être vérifiées et complétées
          pour le siège réel du fournisseur et les pays de livraison :
          <strong>[DROIT & JURIDICTION À REVOIR]</strong>.
        </p>
      </section>

      <aside className="legal-draft-notice" role="note">
        <strong>Brouillon — À Compléter Avant Publication</strong>
        <p>
          Tous les placeholders entre crochets doivent être remplacés par les informations
          réelles de l'entreprise. Ce texte ne constitue pas un avis juridique. Consultez
          un avocat qualifié dans votre juridiction.
        </p>
      </aside>
    </>
  );
}