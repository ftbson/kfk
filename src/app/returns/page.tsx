import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Retours",
  description: "Politique de retour KFK (KUN FAYA KUN) : conditions, processus, remboursements et exceptions.",
};

export default function ReturnsPage() {
  const { legal, currency, contact, brand } = siteConfig;

  return (
    <LegalDocument
      title="Politique de Retour"
      description="Comment retourner des articles, conditions et délais de remboursement."
    >
      <section className="legal-section">
        <h2>Délai de Retour</h2>
        <p>
          Vous disposez de <strong>{legal.returnWindowDays} jours</strong> à compter
          de la date de livraison pour demander un retour.
        </p>
      </section>

      <section className="legal-section">
        <h2>Conditions de Retour</h2>
        <p>Les articles doivent être :</p>
        <ul>
          <li>Non portés, non utilisés, dans leur état d'origine</li>
          <li>Avec toutes les étiquettes d'origine attachées</li>
          <li>Dans l'emballage d'origine (boîtes, housses, films protecteurs)</li>
          <li>Accompagnés de la confirmation de commande / bon de livraison</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Articles Non Retournables</h2>
        <p>Les articles suivants ne peuvent être retournés pour des raisons d'hygiène et d'exclusivité :</p>
        <ul>
          <li>Parfums avec scellé brisé ou ouverts</li>
          <li>Articles personnalisés / gravés</li>
          <li>Pièces Édition Limitée (numérotées 50/100)</li>
          <li>Sous-vêtements, chaussettes et lingerie</li>
          <li>Coffrets cadeaux une fois ouverts</li>
          <li>Articles soldés / vente finale (mentionnés comme tels)</li>
        </ul>
      </section>

      <section className="legal-section">
        <h2>Processus de Retour</h2>
        <ol>
          <li>Envoyez un email à <strong>{contact.email}</strong> avec votre numéro de commande et le motif du retour.</li>
          <li>Attendez l'autorisation de retour et l'adresse de retour (variable selon la région).</li>
          <li>Expédiez l'article avec suivi. Les frais de retour sont <strong>[À DÉFINIR : client / KFK / partagé]</strong>.</li>
          <li>Une fois reçu et inspecté (sous [X] jours ouvrés), nous traitons le remboursement.</li>
        </ol>
      </section>

      <section className="legal-section">
        <h2>Délai de Remboursement</h2>
        <p>
          Les remboursements sont effectués sur le moyen de paiement d'origine sous <strong>[X–Y jours ouvrés]</strong>
          après réception et validation du retour. Les virements bancaires peuvent prendre
          [X] jours supplémentaires selon votre banque.
        </p>
      </section>

      <section className="legal-section">
        <h2>Échanges</h2>
        <p>
          Pour un échange de taille ou couleur, passez une nouvelle commande et retournez l'article
          original selon le processus ci-dessus. Cela vous assure d'obtenir le remplacement
          rapidement sans attendre le traitement du retour.
        </p>
      </section>

      <section className="legal-section">
        <h2>Articles Endommagés / Incorrects</h2>
        <p>
          Si vous recevez un article endommagé, défectueux ou incorrect, contactez-nous à
          <strong>{contact.email}</strong> sous <strong>[X] jours</strong> avec photos et votre
          numéro de commande. Nous prenons en charge les frais de retour et envoyons un
          remplacement ou émettons un remboursement intégral (frais de port inclus).
        </p>
      </section>
    </LegalDocument>
  );
}