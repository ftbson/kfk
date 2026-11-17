import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Comment KFK (KUN FAYA KUN) traite les données personnelles, à quelles fins et vos droits.",
};

export default function PrivacyPage() {
  const { legal, contact, brand } = siteConfig;

  return (
    <LegalDocument
      title="Politique de Confidentialité"
      description="Quelles données KFK traite, comment elles sont utilisées et vos droits."
    >
      <section className="legal-section">
        <h2>1. Responsable du Traitement</h2>
        <p>
          L'entité responsable du traitement des données personnelles est
          <strong>{legal.companyName}</strong>, {legal.companyAddress},
          {legal.companyCountry}. Demandes de protection des données :
          <strong>{contact.email}</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Données Traitées</h2>
        <ul>
          <li>
            Compte : Nom, adresse email, mot de passe chiffré, et données de session techniques.
          </li>
          <li>
            Commandes : Nom, email, téléphone, pays de livraison, adresse de livraison,
            produits commandés, montants, et statut de commande.
          </li>
          <li>
            Demandes de contact : Nom, email, téléphone optionnel, sujet, et contenu du message.
          </li>
          <li>
            Panier & Favoris : IDs de produits et quantités stockés dans le localStorage
            de votre navigateur (non synchronisés avec le compte).
          </li>
          <li>
            Données techniques des services d'hébergement/sécurité lors de la visite du site :
            horodatage, page demandée, données de connexion.
          </li>
        </ul>
        <p>
          Merci de ne pas transmettre d'informations hautement sensibles via le
          formulaire de contact.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Finalités du Traitement</h2>
        <p>
          Nous utilisons les données pour fournir les comptes clients, traiter les commandes,
          répondre aux demandes, envoyer les notifications de commande, protéger le site
          et respecter nos obligations légales. Pour d'autres finalités, notamment publicitaires
          ou analytiques, précisez quels services sont réellement utilisés avant publication :
          <strong>[FINALITÉS & SERVICES SUPPLÉMENTAIRES À REVOIR]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Destinataires & Sous-traitants</h2>
        <p>
          Les données commandes, comptes et site sont actuellement traitées dans une base
          de données Turso. Le site est hébergé sur Vercel. Les messages et notifications
          de commande sont envoyés via le service SMTP configuré ; son fournisseur est
          <strong>[FOURNISSEUR SMTP & LOCALISATION À COMPLÉTER]</strong>.
        </p>
        <p>
          Merci d'ajouter tous les autres destinataires de données, leurs pays, et les
          garanties pour les transferts internationaux :
          <strong>[DESTINATAIRES SUPPLÉMENTAIRES & TRANSFERTS DE DONNÉES À REVOIR]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Paiements</h2>
        <p>
          Le paiement actuel affiche les coordonnées de virement bancaire et ne collecte
          pas de données de carte. Les virements sont traités hors du site.
          Les données bancaires et comptables nécessaires au paiement peuvent être traitées
          par l'établissement financier concerné et le fournisseur.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Durées de Conservation</h2>
        <p>
          Nous conservons les données uniquement aussi longtemps que nécessaire pour les
          finalités énoncées ou comme l'exigent les obligations légales de conservation.
          Les durées précises pour les données commandes, comptabilité, compte et formulaire
          de contact doivent être définies par le fournisseur :
          <strong>[DURÉES DE CONSERVATION À COMPLÉTER]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Cookies & Local Storage</h2>
        <p>
          Pour les clients connectés, un cookie de session HTTP-only techniquement nécessaire
          est utilisé (Secure en production, SameSite Strict). Les sessions client et admin
          expirent après 30 jours maximum. Ce cookie sert uniquement à l'authentification,
          pas aux profils publicitaires.
        </p>
        <p>
          Le panier et les favoris sont stockés dans le localStorage de votre navigateur
          pour persister entre les visites sur le même navigateur. Ce ne sont pas des cookies
          et ne sont pas synchronisés avec votre compte. Vous pouvez vider le localStorage
          via les paramètres de votre navigateur.
        </p>
      </section>

      <section className="legal-section">
        <h2>8. Vos Droits & Contact</h2>
        <p>
          Selon la loi de protection des données applicable, vous pouvez demander l'accès,
          la rectification ou l'effacement, vous opposer au traitement, ou demander la
          limitation. Écrivez à <strong>{contact.email}</strong>. Vous pouvez également
          contacter l'autorité de contrôle compétente. L'autorité compétente et ses
          coordonnées doivent être déterminées selon le siège réel de l'entreprise :
          <strong>[AUTORITÉ DE CONTRÔLE À REVOIR]</strong>.
        </p>
      </section>

      <section className="legal-section">
        <h2>9. Mises à Jour</h2>
        <p>
          Nous pouvons mettre à jour cette Politique de Confidentialité lorsque nos
          traitements de données ou les exigences légales changent. La version publiée
          sur cette page s'applique.
        </p>
      </section>
    </LegalDocument>
  );
}