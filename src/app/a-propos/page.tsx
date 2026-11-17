import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À Propos de KFK",
  description:
    "Découvrez KFK (KUN FAYA KUN), la marque lifestyle premium pour hommes. Mode, accessoires, parfums, JALABIYAs et looks complets de la tête aux pieds.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="storefront-eyebrow">
            LA MARQUE {siteConfig.brand.name}
          </p>
          <h1>Plus qu'une marque, un art de vivre.</h1>
          <p>
            KFK est une marque lifestyle premium pour hommes. Nous créons mode,
            accessoires, parfums, JALABIYAs et looks complets — de la tête aux
            pieds. Moderne, chic, élégant, puissant, minimaliste, international.
          </p>
          <div className="about-actions">
            <Link href="/packs" className="storefront-primary-link">
              Explorer les Collections
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="storefront-secondary-link">
              Nous Contacter
            </Link>
          </div>
        </div>
        <div className="about-hero-aside" aria-hidden="true">
          <span>{siteConfig.brand.name}</span>
          <span>{siteConfig.brand.slogan}</span>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <p className="storefront-eyebrow">NOTRE ENGAGEMENT</p>
          <h2>Command Your Destiny</h2>
          <p>
            Le style n'est pas ce que vous portez. C'est comment vous avancez
            dans le monde. Quatre départements. Une destination pour l'homme
            moderne.
          </p>
        </div>
        <div className="about-value-grid">
          <article>
            <span>01</span>
            <h3>Quatre Mondes, Une Vision</h3>
            <p>
              JALABIYA House, Accessoires, Look & Drip, Signature — chacun un
              univers complet. Ensemble, ils vous habillent pour chaque moment.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Packs Sélectionnés</h3>
            <p>
              Gentleman, Friday, Drip, Executive — un clic, look complet. Aucune
              hésitation. Juste de la confiance.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Services Qui Élèvent</h3>
            <p>
              VIP Club pour accès anticipé & exclusivités. Personal Stylist pour
              looks sur mesure. Livraison mondiale. Éditions limitées numérotées
              50/100.
            </p>
          </article>
        </div>
      </section>

      <section className="about-category-section">
        <div className="about-section-heading">
          <p className="storefront-eyebrow">QUATRE DÉPARTEMENTS + PACKS</p>
          <h2>Découvrez Votre Monde</h2>
        </div>
        <div className="about-category-grid">
          {siteConfig.departments.map((dept) => (
            <Link
              className="about-category-card"
              href={dept.slug}
              key={dept.id}
            >
              <span>{dept.theme.toUpperCase()}</span>
              <h3>{dept.name}</h3>
              <p>{dept.description}</p>
              <span className="about-category-link">
                {dept.hero.ctaText}
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="about-vision">
        <div className="about-section-heading">
          <p className="storefront-eyebrow">LA VISION</p>
          <h2>Du Bénin au Monde</h2>
        </div>
        <div className="vision-grid">
          <article className="vision-item">
            <span className="vision-phase">COURT TERME</span>
            <h3>Visibilité & Fidélité</h3>
            <p>
              Forte présence de marque. Base clients fidèle. Positionnement
              premium établi.
            </p>
          </article>
          <article className="vision-item">
            <span className="vision-phase">MOYEN TERME</span>
            <h3>Boutiques en Afrique</h3>
            <p>
              Multiples boutiques KFK au Bénin et marchés africains clés. Points
              de contact physiques.
            </p>
          </article>
          <article className="vision-item">
            <span className="vision-phase">LONG TERME</span>
            <h3>Marque Lifestyle Homme Internationale</h3>
            <p>
              Reconnaissance mondiale. La destination du style masculin de la
              tête aux pieds.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
