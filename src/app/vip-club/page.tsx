import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "KFK VIP Club",
  description: "Rejoignez le KFK VIP Club pour un accès anticipé, réductions exclusives, événements privés et conseils style personnalisés.",
};

export default function VipClubPage() {
  const benefits = [
    {
      icon: "fa-solid fa-bolt",
      title: "Accès Anticipé",
      description: "Achetez les nouvelles collections 48h avant la sortie publique. Les éditions limitées partent vite — les VIPs ont la priorité.",
    },
    {
      icon: "fa-solid fa-tag",
      title: "Réductions Exclusives",
      description: "Tarifs membres sur tous les packs, soldes saisonniers et éditions limitées. Cumulables avec les économies packs pour un maximum d'avantages.",
    },
    {
      icon: "fa-solid fa-calendar-check",
      title: "Événements Privés",
      description: "Invitations aux avant-premières collections, ateliers de style et événements networking au Bénin et au-delà.",
    },
    {
      icon: "fa-solid fa-user-tie",
      title: "Personal Stylist",
      description: "Consultation style offerte. Indiquez budget et occasion — nous composons votre look complet.",
    },
    {
      icon: "fa-solid fa-headset",
      title: "Support Prioritaire",
      description: "Ligne VIP dédiée. Réponses plus rapides, assistance suivi commande, retours simplifiés.",
    },
    {
      icon: "fa-solid fa-gift",
      title: "Cadeau de Bienvenue",
      description: "Un échantillon KFK Signature (parfum ou accessoire) avec votre première commande en tant que membre.",
    },
  ];

  const howToJoin = [
    "Inscrivez-vous à la newsletter en pied de page — vous recevrez une invitation VIP par email.",
    `Ou envoyez-nous un email à <strong>${siteConfig.contact.email}</strong> avec l'objet 'Demande VIP Club'.`,
    "Le statut VIP est revu trimestriellement selon l'engagement et l'historique d'achats.",
    "Aucuns frais — la fidélité est récompensée, pas achetée.",
  ];

  return (
    <main className="vip-club-page">
      <section className="vip-hero">
        <div className="vip-hero-bg">
          <Image
            src="/images/vip-hero.jpg"
            alt="KFK VIP Club"
            fill
            priority
            sizes="100vw"
            className="vip-hero-image"
          />
        </div>
        <div className="vip-hero-content">
          <span className="vip-badge">ADHÉSION EXCLUSIVE</span>
          <h1>KFK VIP Club</h1>
          <p className="vip-tagline">Là où la fidélité rencontre le luxe</p>
          <p className="vip-description">
            Le KFK VIP Club est notre cercle intime — pour les hommes qui définissent leur propre destin.
            Plus qu'un programme de fidélité, c'est l'accès au lifestyle que vous commandez.
          </p>
          <Link href="#join" className="btn-primary vip-cta">
            Rejoindre le Club
          </Link>
        </div>
      </section>

      <section className="vip-benefits" id="benefits">
        <div className="container">
          <header className="section-header">
            <p className="storefront-eyebrow">AVANTAGES MEMBRES</p>
            <h2>Ce Que Vous Débloquez</h2>
          </header>
          <div className="vip-benefits-grid">
            {benefits.map((benefit, index) => (
              <article key={index} className="vip-benefit-card">
                <div className="vip-benefit-icon">
                  <i className={benefit.icon} aria-hidden="true"></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vip-join" id="join">
        <div className="container">
          <header className="section-header">
            <p className="storefront-eyebrow">COMMENT REJOINDRE</p>
            <h2>Devenir VIP</h2>
          </header>
          <div className="vip-join-content">
            <ol className="vip-join-steps">
              {howToJoin.map((step, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: step }} />
              ))}
            </ol>
            <div className="vip-join-cta">
              <h3>Prêt à Commander Votre Destin ?</h3>
              <Link href="/contact" className="btn-primary">
                Nous Contacter pour l'Adhésion VIP
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="vip-limited">
        <div className="container">
          <header className="section-header">
            <p className="storefront-eyebrow">EXCLUSIVITÉS VIP</p>
            <h2>Éditions Limitées — VIPs en Priorité</h2>
          </header>
          <p className="vip-limited-text">
            Nos drops Édition Limitée (numérotés 50 ou 100 pièces) sont offerts aux membres VIP Club
            72h avant la sortie générale. Une fois épuisées, elles le sont pour toujours.
          </p>
          <Link href="/categorie/signature" className="btn-secondary">
            Voir la Collection Signature
          </Link>
        </div>
      </section>
    </main>
  );
}