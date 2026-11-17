"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/lib/currency";

interface BankDetails {
  beneficiary: string;
  iban: string;
  bic: string;
  address: string | null;
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [step, setStep] = useState<"form" | "bank">("form");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    beneficiary: "",
    iban: "",
    bic: "",
    address: null,
  });

  // Backend submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [emailNotificationSent, setEmailNotificationSent] = useState(true);

  // Customer info form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: siteConfig.legal.shippingCountries[0] || "Bénin",
    streetAddress: "",
    postalCode: "",
    city: "",
    whatsapp: "",
    email: "",
  });

  const { legal } = siteConfig;
  const shippingCost = subtotal > legal.shippingCostThreshold || cart.length === 0 ? 0 : legal.shippingCostBase;
  const grandTotal = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const bankResponse = await fetch("/api/bank-details");
      const bankData = await bankResponse.json();
      if (!bankResponse.ok) {
        throw new Error(bankData.error || "Impossible de charger les coordonnées bancaires.");
      }
      if (!bankData.bankDetails) {
        setErrorMessage(
          "Les coordonnées bancaires ne sont pas encore configurées. Veuillez nous contacter."
        );
        return;
      }
      setBankDetails(bankData.bankDetails);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const orderResult: unknown = await response.json();

      if (
        !response.ok ||
        typeof orderResult !== "object" ||
        orderResult === null ||
        !("orderId" in orderResult) ||
        typeof orderResult.orderId !== "string" ||
        !("grandTotal" in orderResult) ||
        typeof orderResult.grandTotal !== "number" ||
        !("emailNotificationSent" in orderResult) ||
        typeof orderResult.emailNotificationSent !== "boolean"
      ) {
        const message =
          typeof orderResult === "object" &&
          orderResult !== null &&
          "error" in orderResult &&
          typeof orderResult.error === "string"
            ? orderResult.error
            : "Erreur lors de l'enregistrement de la commande";
        throw new Error(message);
      }

      setFinalTotal(orderResult.grandTotal);
      setOrderId(orderResult.orderId);
      setEmailNotificationSent(orderResult.emailNotificationSent);
      clearCart();
      setStep("bank");
    } catch (error) {
      console.error("Order error:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    setStep("form");
    setErrorMessage(null);
    setOrderId(null);
  };

  return (
    <>
      <main className="cart-page">
        <div className="cart-container">
          <h1 className="cart-page-title">Panier</h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fa-solid fa-basket-shopping empty-icon" aria-hidden="true"></i>
              <h2>Votre panier est vide</h2>
              <p>Découvrez nos collections et faites votre sélection.</p>
              <Link href="/" className="btn-primary-cart">
                Continuer les achats
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Items List */}
              <div className="cart-items-section">
                <div className="cart-items-header" role="row">
                  <span role="columnheader">Produit</span>
                  <span role="columnheader">Prix</span>
                  <span role="columnheader">Qté</span>
                  <span role="columnheader">Total</span>
                  <span role="columnheader"></span>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row" role="row">
                    {/* Product */}
                    <div className="cart-item-info">
                      <div className="cart-item-image">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <p className="cart-item-category">{item.category}</p>
                        <h4 className="cart-item-title">{item.title}</h4>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="cart-item-price" role="cell">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity */}
                    <div className="cart-item-quantity" role="cell">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuer la quantité"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="cart-item-total" role="cell">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    {/* Remove */}
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Supprimer l'article"
                    >
                      <i className="fa-solid fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                ))}

                <div className="cart-actions-bottom">
                  <button className="btn-clear" onClick={clearCart}>
                    Vider le panier
                  </button>
                  <Link href="/" className="btn-continue">
                    <i className="fa-solid fa-arrow-left" aria-hidden="true"></i> Continuer les achats
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="cart-summary-card">
                <h3>Récapitulatif de la commande</h3>

                <div className="summary-row">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="summary-row">
                  <span>Livraison</span>
                  <span>
                    {shippingCost === 0
                      ? "Offerte"
                      : formatPrice(shippingCost)}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total (TTC)</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>

                <button
                  className="btn-checkout"
                  onClick={() => {
                    setStep("form");
                    setShowCheckoutModal(true);
                  }}
                >
                  Passer au paiement
                  <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CHECKOUT MODAL / BANK DETAILS */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={handleCloseModal} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div
            className="bank-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Fermer"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>

            {step === "form" ? (
              /* STEP 1: SHIPPING FORM */
              <div className="checkout-form-container">
                <div className="modal-header">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-truck-fast" aria-hidden="true"></i>
                  </div>
                  <h2 id="checkout-title">Adresse de livraison & Contact</h2>
                  <p>
                    Saisissez vos coordonnées pour passer au paiement.
                  </p>
                </div>

                {errorMessage && (
                  <div className="error-alert" role="alert" style={{ color: "red", marginBottom: "1rem", textAlign: "center" }}>
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Prénom *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Jean"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Nom *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="country">Pays *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      {legal.shippingCountries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="streetAddress">Adresse *</label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="123 Rue Principale"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="postalCode">Code postal *</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        autoComplete="postal-code"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="1000"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">Ville *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Cotonou"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="whatsapp">Numéro WhatsApp *</label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="+229 01 23 45 67"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jean@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-modal-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Continuer vers le paiement"}
                    <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            ) : (
              /* STEP 2: BANK DETAILS */
              <div className="bank-details-container">
                <div className="modal-header">
                  <div className="icon-wrapper">
                    <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
                  </div>
                  <h2>Coordonnées bancaires pour virement</h2>
                  <p>
                    Merci, <strong>{formData.firstName}</strong>. Veuillez virer le montant total de{" "}
                    <strong>{formatPrice(finalTotal)}</strong> sur le compte suivant :
                  </p>
                  {orderId && <p className="checkout-order-reference">Numéro de commande : {orderId}</p>}
                  {!emailNotificationSent && (
                    <p className="checkout-notification-warning" role="status">
                      Votre commande est enregistrée. La notification automatique a échoué ; merci de nous contacter avec votre numéro de commande.
                    </p>
                  )}
                </div>

                <div className="bank-details-list">
                  <div className="bank-detail-item">
                    <span className="detail-label">Titulaire du compte :</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value">{bankDetails.beneficiary}</strong>
                      <button
                        type="button"
                        aria-label="Copier le titulaire"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.beneficiary, "beneficiary")}
                      >
                        <i className={copiedField === "beneficiary" ? "fa-solid fa-check" : "fa-regular fa-copy"} aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  <div className="bank-detail-item">
                    <span className="detail-label">IBAN :</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value highlight">{bankDetails.iban}</strong>
                      <button
                        type="button"
                        aria-label="Copier l'IBAN"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.iban, "iban")}
                      >
                        <i className={copiedField === "iban" ? "fa-solid fa-check" : "fa-regular fa-copy"} aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  <div className="bank-detail-item">
                    <span className="detail-label">BIC / SWIFT :</span>
                    <div className="detail-value-wrap">
                      <strong className="detail-value">{bankDetails.bic}</strong>
                      <button
                        type="button"
                        aria-label="Copier le BIC"
                        className="copy-btn"
                        onClick={() => handleCopy(bankDetails.bic, "bic")}
                      >
                        <i className={copiedField === "bic" ? "fa-solid fa-check" : "fa-regular fa-copy"} aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>

                  {bankDetails.address && (
                    <div className="bank-detail-item">
                      <span className="detail-label">Adresse de la banque :</span>
                      <div className="detail-value-wrap">
                        <span className="detail-value">{bankDetails.address}</span>
                        <button
                          type="button"
                          aria-label="Copier l'adresse"
                          className="copy-btn"
                          onClick={() => handleCopy(bankDetails.address ?? "", "address")}
                        >
                          <i className={copiedField === "address" ? "fa-solid fa-check" : "fa-regular fa-copy"} aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="modal-info-box">
                  <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
                  <p>
                    Merci d'inclure votre numéro de commande (<strong>{orderId}</strong>) en référence de paiement.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn-modal-close"
                    onClick={handleCloseModal}
                  >
                    Compris & Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}