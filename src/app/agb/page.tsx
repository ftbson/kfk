import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen für Bestellungen bei KUN FAYA KUN.",
};

export default function AGBPage() {
  return (
    <LegalDocument
      title="Allgemeine Geschäftsbedingungen"
      description="Bedingungen für Bestellungen im KUN FAYA KUN-Onlineshop."
    >
      <TermsContent />
    </LegalDocument>
  );
}
