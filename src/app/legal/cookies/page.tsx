import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookies & Stockage Local",
  description: "Informations sur les cookies et données stockées localement utilisées par KFK (KUN FAYA KUN).",
};

export default function CookiesPage() {
  const { brand } = siteConfig;

  return (
    <LegalDocument
      title="Cookies & Stockage Local"
      description="Quelles technologies de stockage techniquement nécessaires la boutique utilise."
    >
      <section className="legal-section">
        <h2>Cookies de Session Essentiels</h2>
        <p>
          Lorsque vous vous connectez, {brand.name} ({brand.shortName}) dépose un cookie
          de session pour que votre compte reste disponible pendant l'utilisation. Il est HTTP-only,
          marqué Secure en production, et SameSite Strict. Les sessions client et admin
          expirent après 30 jours maximum. Ce cookie sert uniquement à l'authentification
          et n'est pas utilisé pour des profils publicitaires.
        </p>
      </section>

      <section className="legal-section">
        <h2>Panier & Favoris</h2>
        <p>
          Le panier et les favoris sont stockés dans le localStorage de votre navigateur
          pour persister lors de vos retours sur le même navigateur. Ces entrées ne sont
          pas des cookies et ne sont pas synchronisées avec un compte client. Vous pouvez
          vider le localStorage via les paramètres de votre navigateur.
        </p>
      </section>

      <section className="legal-section">
        <h2>Analytique & Marketing</h2>
        <p>
          Aucun pixel analytique ou marketing n'est actuellement intégré dans le code
          de l'application. Avant publication, vérifiez si de tels services sont activés
          via la configuration de déploiement, tag managers, ou scripts additionnels.
          Si c'est le cas, ajoutez ici les fournisseurs, finalités et options de consentement.
        </p>
      </section>

      <section className="legal-section">
        <h2>Gestion du Stockage</h2>
        <p>
          Vous pouvez consulter et supprimer les cookies et le localStorage dans les
          paramètres de votre navigateur. Si vous bloquez les cookies de session essentiels,
          la connexion et les fonctions de compte peuvent être limitées. Pour plus
          d'informations sur le traitement de vos données, consultez la
          <a href="/legal/privacy">Politique de Confidentialité</a>.
        </p>
      </section>
    </LegalDocument>
  );
}