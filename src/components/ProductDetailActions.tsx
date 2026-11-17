"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function ProductDetailActions({
  product,
}: {
  product: Product;
}) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const [added, setAdded] = useState(false);
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="kfk-detail-actions">
      <button className="kfk-detail-add-btn" onClick={handleAddToCart}>
        <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
        Ajouter au panier
      </button>
      <button
        className="kfk-detail-favorite-btn"
        onClick={() => toggleFavorite(product.id)}
        aria-pressed={favorite}
      >
        <i
          className={favorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          aria-hidden="true"
        />
        {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
      {added && (
        <p className="product-added-message" role="status">
          Article ajouté au panier.{" "}
          <Link href="/cart">Voir le panier</Link>
        </p>
      )}
    </div>
  );
}