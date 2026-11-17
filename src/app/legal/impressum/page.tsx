import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Identification et coordonnées du fournisseur pour KFK (KUN FAYA KUN).",
};

export default function LegalNoticePage() {
  const { legal, contact, brand } = siteConfig;

  return (
    <LegalDocument
      title="Mentions Légales"
      description="Informations sur le fournisseur et coordonnées de contact."
    >
      <section className="legal-section">
        <h2>Éditeur</h2>
        <p>
          <strong>{legal.companyName}</strong>
          <br />
          {legal.companyLegalForm}
          <br />
          {legal.companyAddress}
          <br />
          {legal.companyCountry}
        </p>
      </section>

      <section className="legal-section">
        <h2>Représentant Légal</h2>
        <p>{legal.authorizedRepresentative}</p>
      </section>

      <section className="legal-section">
        <h2>Contact</h2>
        <p>
          Email : <strong>{contact.email}</strong>
          <br />
          Téléphone : <strong>{contact.phone}</strong>
        </p>
      </section>

      <section className="legal-section">
        <h2>Informations Société</h2>
        <p>
          Numéro d'immatriculation : <strong>{legal.registrationNumber}</strong>
          <br />
          Numéro TVA : <strong>{legal.vatNumber}</strong>
        </p>
      </section>

      <section className="legal-section">
        <h2>Responsable de la Publication</h2>
        <p>
          <strong>{legal.authorizedRepresentative}</strong>
        </p>
      </section>

      <aside className="legal-draft-notice" role="note">
        <strong>Brouillon — À Compléter Avant Publication</strong>
        <p>
          Tous les placeholders doivent être remplacés par les informations réelles de l'entreprise.
          Ce texte ne constitue pas un avis juridique. Consultez un avocat qualifié dans votre juridiction.
        </p>
      </aside>
    </LegalDocument>
  );
}