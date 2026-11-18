"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { getProductById, Product } from "@/data/products";
import { formatPrice } from "@/lib/currency";

export default function FavoritesPage() {
  const { favorites, removeFromCart: toggleFavorite, addToCart } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <main className="favorites-page">
        <div className="favorites-loading">Chargement des favoris…</div>
      </main>
    );
  }

  const favoriteProducts: Product[] = favorites
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);

  return (
    <main className="favorites-page">
      <div className="favorites-container">
        <header className="favorites-header">
          <h1>Mes Favoris</h1>
          <p>{favoriteProducts.length} {favoriteProducts.length === 1 ? "article" : "articles"} sauvegardé(s)</p>
        </header>

        {favoriteProducts.length === 0 ? (
          <div className="empty-favorites">
            <i className="fa-regular fa-heart" aria-hidden="true"></i>
            <h2>Aucun favori pour l'instant</h2>
            <p>Explorez et sauvegardez les articles que vous aimez.</p>
            <Link href="/packs" className="btn-primary">
              Découvrir les Collections
            </Link>
          </div>
        ) : (
          <div className="favorites-grid" role="list">
            {favoriteProducts.map((product) => (
              <article key={product.id} className="favorite-card" role="listitem">
                <Link
                  href={`/products/${product.id}`}
                  className="favorite-image-wrap"
                  aria-label={`${product.title} - Voir les détails`}
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="favorite-image"
                  />
                  {product.isLimitedEdition && (
                    <span className="favorite-badge limited">Édition Limitée #{product.limitedEditionNumber}</span>
                  )}
                </Link>

                <div className="favorite-info">
                  <span className="favorite-category">{product.category}</span>
                  <h3 className="favorite-title">
                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                  </h3>
                  <p className="favorite-price">{formatPrice(product.price)}</p>

                  <div className="favorite-actions">
                    <button
                      className="favorite-remove-btn"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`Retirer ${product.title} des favoris`}
                    >
                      <i className="fa-solid fa-heart-broken" aria-hidden="true"></i>
                      Retirer
                    </button>
                    <button
                      className="favorite-add-cart-btn"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.title,
                          category: product.category,
                          price: product.price,
                          oldPrice: product.oldPrice,
                          image: product.image,
                        })
                      }
                      aria-label={`Ajouter ${product.title} au panier`}
                    >
                      <i className="fa-solid fa-bag-shopping" aria-hidden="true"></i>
                      Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
