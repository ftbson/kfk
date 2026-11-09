"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite: updateFavorite, isFavorite } = useCart();

  if (!product) {
    return null;
  }

  const favorite = isFavorite(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateFavorite(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="KUN FAYA KUN-product-card">
      {/* Badge PROMO conditionnel (affiché seulement si le produit est en promo) */}
      {product.badgePromo && (
        <span className="KUN FAYA KUN-badge-promo">PROMO</span>
      )}

      {/* Zone Supérieure : Marque, Image & Favori */}
      <div className="KUN FAYA KUN-card-top">
        <span className="KUN FAYA KUN-brand-label">{product.brand}</span>

        <Link
          href={`/produkt/${product.id}`}
          className="KUN FAYA KUN-card-img-wrapper"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={220}
            className="KUN FAYA KUN-card-img"
          />
        </Link>

        {/* Bouton Favori en bas à gauche du visuel */}
        <button
          className={`KUN FAYA KUN-wishlist-btn ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={
            favorite
              ? "Aus Wunschliste entfernen"
              : "Zur Wunschliste hinzufügen"
          }
          aria-pressed={favorite}
        >
          <i
            className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></i>
        </button>

        {/* Badge Catégorie (VILLE, VTC, VTT) en bas à droite de l'image */}
        <span
          className={`KUN FAYA KUN-badge-cat cat-${product.category?.toLowerCase()}`}
        >
          {product.category}
        </span>
      </div>

      {/* Informations & Spécifications */}
      <div className="KUN FAYA KUN-card-info">
        <span className="KUN FAYA KUN-sub-cat">{product.categoryLabel}</span>
        <h3 className="KUN FAYA KUN-product-title">
          <Link href={`/produkt/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="KUN FAYA KUN-specs-row">
          <span className="KUN FAYA KUN-spec-item">
            <i className="fa-solid fa-gear"></i> {product.motorTorque}
          </span>
          <span className="KUN FAYA KUN-spec-item">
            <i className="fa-solid fa-battery-three-quarters"></i>{" "}
            {product.batteryCapacity}
          </span>
        </div>
      </div>

      {/* Bas de Carte : Prix & Bouton Ajouter au Panier */}
      <div className="KUN FAYA KUN-card-bottom">
        <div className="KUN FAYA KUN-price-block">
          <div className="KUN FAYA KUN-price-main">
            <span className="KUN FAYA KUN-current-price">
              CHF {product.price?.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="KUN FAYA KUN-old-price">
                CHF {product.oldPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="KUN FAYA KUN-discount-tag">
                {product.discount}
              </span>
            )}
          </div>
          {product.savings && (
            <span className="KUN FAYA KUN-savings-text">
              Sie sparen CHF {product.savings.toFixed(2)}
            </span>
          )}
        </div>

        {/* Bouton Ajouter au panier direct sur la carte */}
        <div className="KUN FAYA KUN-card-actions">
          <button
            className="KUN FAYA KUN-add-cart-btn"
            onClick={handleAddToCart}
            title="In den Warenkorb"
            aria-label={`${product.title} in den Warenkorb legen`}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
