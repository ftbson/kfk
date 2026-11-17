import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";

export default function BestSellers() {
  const products = getFeaturedProducts(8);

  return (
    <section className="bestsellers-section" aria-labelledby="bestsellers-title">
      <div className="bestsellers-container">
        {/* Header */}
        <div className="bestsellers-header">
          <h2 id="bestsellers-title" className="bestsellers-title">Meilleures Ventes</h2>
          <p className="bestsellers-subtitle">
            Sélectionnées à la main. Qualité vérifiée. Prêtes à expédier.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Product Grid */}
        <div className="storefront-product-grid products-grid" role="list">
          {products.map((product) => (
            <div key={product.id} role="listitem">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="bestsellers-footer">
          <Link href="/boutique" className="btn-view-all">
            Voir Tous Les Produits <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}