"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/currency";
import { siteConfig } from "@/config/site";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addToCart, toggleFavorite: updateFavorite, isFavorite } = useCart();
  const [imageUnavailable, setImageUnavailable] = useState(false);

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
    addToCart({
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      image: product.image,
    });
  };

  return (
    <article className={`kfk-product-card ${variant === "compact" ? "compact" : ""}`}>
      <div className="kfk-card-top">
        <Link
          href={getProductLink(product)}
          className="kfk-card-img-wrapper"
          aria-label={`Voir ${product.title}`}
        >
          {imageUnavailable ? (
            <span className="kfk-card-image-fallback" aria-hidden="true">
              <i className="fa-solid fa-shirt" />
              <span>{siteConfig.brand.shortName}</span>
            </span>
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              width={320}
              height={220}
              className="kfk-card-img"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImageUnavailable(true)}
            />
          )}
        </Link>

        <button
          className={`kfk-wishlist-btn ${favorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={favorite}
        >
          <i className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"} aria-hidden="true"></i>
        </button>
      </div>

      <div className="kfk-card-info">
        <span className="kfk-product-category">{product.category}</span>
        <h3 className="kfk-product-title">
          <Link href={getProductLink(product)}>{product.title}</Link>
        </h3>
      </div>

      <div className="kfk-card-bottom">
        <span className="kfk-current-price">{formatPrice(product.price)}</span>

        <div className="kfk-card-actions">
          <button
            className="kfk-add-cart-btn"
            onClick={handleAddToCart}
            aria-label={`Ajouter ${product.title} au panier`}
          >
            <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i>
            <span className="btn-text">Ajouter</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function getProductLink(product: Product): string {
  return `/products/${product.id}`;
}