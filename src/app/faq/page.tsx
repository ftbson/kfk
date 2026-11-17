"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { convertUsdToXof, formatPrice } from "@/lib/currency";

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Qu'est-ce que KFK (KUN FAYA KUN) ?",
      answer:
        "KFK est une marque lifestyle premium pour hommes. Nous créons mode, accessoires, parfums, JALABIYAs et looks complets — de la tête aux pieds. Moderne, chic, élégant, puissant, minimaliste, international.",
    },
    {
      question: "Quels sont les quatre départements ?",
      answer:
        "1) JALABIYA HOUSE : Tenues traditionnelles modernes, boubous, JALABIYAs, kaftans pour cérémonies et célébrations. 2) ACCESSOIRES : Montres, lunettes, parfums, bracelets, bijoux, sacs et sacoches. 3) LOOK & DRIP : Ensembles quotidiens, joggers, chemises, pantalons, sneakers, chaussures, polos. 4) SIGNATURE : Parfums exclusifs, éditions limitées, coffrets cadeaux, accessoires personnalisés.",
    },
    {
      question: "Que sont les KFK Packs ?",
      answer:
        "Des looks complets en un clic : Gentleman Pack (pantalon + chemise + montre + parfum), Friday Pack (JALABIYA + parfum + montre), Drip Pack (jogger + sneakers + lunettes + bracelet), Executive Pack (costume + montre + sacoche). Chacun offre 19-21% d'économie vs achat séparé.",
    },
    {
      question: "Livrez-vous dans mon pays ?",
      answer: `Nous livrons en ${siteConfig.legal.shippingCountries.join(", ")}. Les pays disponibles s'affichent au paiement. Livraison offerte dès ${formatPrice(siteConfig.legal.shippingCostThreshold)} d'achat. Consultez notre page Livraison pour les délais et transporteurs.`,
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: `Vous disposez de ${siteConfig.legal.returnWindowDays} jours à compter de la livraison pour demander un retour. Articles non portés, étiquettes et emballage d'origine obligatoires. Articles personnalisés, édition limitée, parfums ouverts non retournables. Contactez ${siteConfig.contact.email} pour initier un retour.`,
    },
    {
      question: "Comment fonctionne le service Personal Stylist ?",
      answer: `Indiquez-nous votre budget et l'occasion. Nos stylistes composent votre look complet de la tête aux pieds depuis les collections KFK. Disponible pour les membres VIP Club et sur demande pour les commandes supérieures à ${formatPrice(convertUsdToXof(500))}.`,
    },
    {
      question: "Qu'est-ce que le KFK VIP Club ?",
      answer:
        "Accès anticipé aux nouvelles collections, réductions exclusives, événements privés, conseils style personnalisés, service client prioritaire. Inscription via la newsletter du pied de page ou contactez-nous.",
    },
    {
      question: "Que sont les Éditions Limitées ?",
      answer:
        "Petites séries numérotées — seulement 50 ou 100 pièces fabriquées. Une fois épuisées, elles le sont pour toujours. Chaque pièce est numérotée individuellement. Les membres VIP Club ont un accès prioritaire.",
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: `Actuellement : Virement bancaire. Paiement par carte prochainement. Après validation, vous recevez les coordonnées bancaires et le montant total. Utilisez votre numéro de commande comme référence.`,
    },
    {
      question: "Comment suivre ma commande ?",
      answer:
        "Une fois expédiée, vous recevrez un email avec le numéro de suivi et le lien transporteur. Vous pouvez aussi consulter le statut dans votre compte sous 'Mes Commandes'.",
    },
    {
      question: "Puis-je modifier ou annuler ma commande ?",
      answer: `Contactez-nous immédiatement à ${siteConfig.contact.email} avec votre numéro de commande. Nous pouvons modifier/annuler uniquement avant le statut 'en traitement'. Une fois expédiée, plus de modification possible.`,
    },
    {
      question: "Avez-vous des boutiques physiques ?",
      answer:
        "Actuellement en ligne uniquement. Projet à moyen terme : boutiques KFK au Bénin et en Afrique. Long terme : flagships internationaux. Rejoignez le VIP Club pour les mises à jour.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="faq-page">
      <div className="faq-container">
        <header className="faq-header">
          <p className="storefront-eyebrow">CENTRE D'AIDE</p>
          <h1>Questions Fréquentes</h1>
          <p>
            Réponses rapides. Besoin d'aide ?{" "}
            <a href="/contact">Contactez-nous</a>.
          </p>
        </header>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaq === index ? "active" : ""}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleFaq(index)}
                aria-expanded={openFaq === index}
              >
                {faq.question}
                <i
                  className={`fa-solid fa-chevron-${openFaq === index ? "up" : "down"}`}
                ></i>
              </button>
              <div
                className="faq-answer-wrapper"
                style={{
                  maxHeight: openFaq === index ? "400px" : "0",
                  opacity: openFaq === index ? 1 : 0,
                }}
              >
                <p className="faq-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
