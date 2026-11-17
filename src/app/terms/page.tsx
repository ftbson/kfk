import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import TermsContent from "@/components/TermsContent";

export const metadata: Metadata = {
  title: "Conditions de Vente",
  description: "Conditions générales de vente pour les commandes chez KFK (KUN FAYA KUN).",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Conditions Générales de Vente"
      description="Conditions pour les commandes dans la boutique en ligne KFK."
    >
      <TermsContent />
    </LegalDocument>
  );
}