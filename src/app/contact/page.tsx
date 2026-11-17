"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { convertUsdToXof, formatPrice } from "@/lib/currency";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const faqs = [
    {
      question: "Quel département KFK me correspond ?",
      answer:
        "JALABIYA HOUSE : Tenues traditionnelles modernes pour cérémonies et célébrations. ACCESSOIRES : Montres, lunettes, parfums, bijoux, sacs. LOOK & DRIP : Ensembles quotidiens, joggers, sneakers, chemises. SIGNATURE : Parfums exclusifs, éditions limitées, cadeaux personnalisés. PACKS : Looks complets sélectionnés (Gentleman, Friday, Drip, Executive).",
    },
    {
      question: "Livrez-vous à l'international ?",
      answer: `Oui. Nous livrons en ${siteConfig.legal.shippingCountries.join(", ")}. Les frais et délais varient selon la région. Livraison offerte dès ${formatPrice(siteConfig.legal.shippingCostThreshold)} d'achat. Consultez notre page Livraison pour les détails.`,
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: `Vous disposez de ${siteConfig.legal.returnWindowDays} jours à compter de la livraison pour demander un retour. Articles non portés, étiquettes et emballage d'origine obligatoires. Certains articles (personnalisés, édition limitée, parfums ouverts) ne sont pas retournables. Contactez-nous à ${siteConfig.contact.email} pour initier un retour.`,
    },
    {
      question: "Comment fonctionne le service Personal Stylist ?",
      answer: `Indiquez-nous votre budget et l'occasion. Nos stylistes composent votre look complet de la tête aux pieds depuis les collections KFK. Disponible pour les membres VIP Club et sur demande pour les commandes supérieures à ${formatPrice(convertUsdToXof(500))}.`,
    },
    {
      question: "Quels modes de paiement acceptez-vous ?",
      answer: `Actuellement : Virement bancaire. Paiement par carte prochainement. Après validation, vous recevez les coordonnées bancaires et le montant total. Utilisez votre numéro de commande comme référence.`,
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormMessage(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setFormMessage("Merci. Votre message a bien été envoyé.");
    } catch {
      setFormMessage("Le message n'a pas pu être envoyé. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-section">
      <div className="contact-container">
        <header className="contact-heading">
          <p className="storefront-eyebrow">{siteConfig.brand.name} SERVICE</p>
          <h1>Nous Sommes Là Pour Vous</h1>
          <p>
            Une question sur nos collections, une commande ou nos services ?
            Écrivez-nous.
          </p>
        </header>
        <div className="contact-grid">
          {/* LEFT COLUMN: FAQ */}
          <div className="faq-column">
            <span className="section-subtitle">AIDE & INFORMATIONS</span>
            <h2 className="section-title">Questions Fréquentes</h2>

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
                      maxHeight: openFaq === index ? "300px" : "0",
                      opacity: openFaq === index ? 1 : 0,
                    }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="vertical-divider"></div>

          {/* RIGHT COLUMN: FORM */}
          <div className="form-column">
            <span className="section-subtitle">NOUS CONTACTER</span>
            <h2 className="section-title">Comment Pouvons-nous Vous Aider ?</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-grid">
                <label>
                  Votre Nom *
                  <input type="text" name="name" autoComplete="name" required />
                </label>
                <label>
                  Votre Email *
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                </label>
                <label>
                  Numéro de Téléphone
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label>
                  Sujet
                  <input type="text" name="subject" />
                </label>
              </div>

              <label className="contact-message-label">
                Votre Message *
                <textarea name="message" rows={5} required />
              </label>

              <button
                type="submit"
                className="btn-submit-contact"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER LE MESSAGE"}
                {!isSubmitting && (
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                )}
              </button>
              {formMessage && <p role="status">{formMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
