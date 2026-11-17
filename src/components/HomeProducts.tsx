import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProductsByDepartment } from "@/data/products";
import { siteConfig } from "@/config/site";

export default function HomeProducts() {
  return (
    <section
      className="home-products-section"
      aria-labelledby="home-products-title"
    >
      <div className="storefront-section-header">
        <p className="storefront-eyebrow">{siteConfig.brand.name} SÉLECTION</p>
        <h2 id="home-products-title">Chaque pièce à sa place</h2>
        <p>Explorez nos collections et retrouvez les articles classés par univers.</p>
      </div>
      <div className="home-department-list">
        {siteConfig.departments.map((department, index) => {
          const products = getProductsByDepartment(department.id).slice(0, 5);
          const collectionHref =
            department.id === "packs"
              ? "/packs"
              : `/categorie/${department.id}`;

          return (
            <section
              key={department.id}
              className="home-department-section"
              aria-labelledby={`home-${department.id}-title`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <header className="home-department-heading">
                <div>
                  <p className="storefront-eyebrow">{department.name}</p>
                  <h3 id={`home-${department.id}-title`}>{department.theme}</h3>
                </div>
                <Link href={collectionHref} className="storefront-secondary-link">
                  Toute la collection
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              </header>
              <div className="storefront-product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}