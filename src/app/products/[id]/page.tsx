import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductGallery from "@/components/ProductGallery";
import { siteConfig } from "@/config/site";
import {
  getAllProducts,
  getProductById,
  getProductsByDepartment,
} from "@/data/products";
import { formatPrice } from "@/lib/currency";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Produit introuvable" };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const department = siteConfig.departments.find(
    (item) => item.id === product.department,
  );
  const relatedProducts = getProductsByDepartment(product.department)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);
  const specifications = [
    { label: "Catégorie", value: product.category },
    product.fabric && { label: "Tissu", value: product.fabric },
    product.material && { label: "Matière", value: product.material },
    product.sizes && product.sizes.length > 0 && {
      label: "Tailles disponibles",
      value: product.sizes.join(", ")
    },
    product.colors && product.colors.length > 0 && {
      label: "Coloris disponibles",
      value: product.colors.join(", ")
    },
    product.scentNotes && { label: "Notes olfactives", value: product.scentNotes },
    product.isLimitedEdition &&
      product.limitedEditionNumber && {
        label: "Édition limitée",
        value: `${product.limitedEditionNumber} pièces numérotées`,
      },
    product.isVipExclusive && { label: "Collection", value: "Exclusivité VIP" },
  ].filter(
    (specification): specification is { label: string; value: string } =>
      Boolean(specification),
  );

  return (
    <main className="product-detail-page">
      <nav className="product-breadcrumbs" aria-label="Fil d’Ariane">
        <Link href="/">Accueil</Link>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        <Link
          href={
            product.department === "packs"
              ? "/packs"
              : `/categorie/${product.department}`
          }
        >
          {department?.name ?? product.department}
        </Link>
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        <span aria-current="page">{product.title}</span>
      </nav>

      <section className="product-detail-layout">
        <ProductGallery key={product.id} product={product} />

        <div className="product-detail-content">
          <p className="product-detail-eyebrow">
            {department?.name ?? product.department}
          </p>
          <p className="product-detail-category">{product.category}</p>
          <h1>{product.title}</h1>

          {product.rating && (
            <div className="product-detail-rating">
              <span aria-label={`${product.rating} sur 5`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${index < Math.round(product.rating!) ? "active" : ""}`}
                    aria-hidden="true"
                  />
                ))}
              </span>
              <span>
                {product.rating.toFixed(1)}
                {product.reviewsCount ? ` · ${product.reviewsCount} avis` : ""}
              </span>
            </div>
          )}

          <div className="product-detail-price">
            <strong>{formatPrice(product.price)}</strong>
            {product.oldPrice && product.oldPrice > product.price && (
              <>
                <del>{formatPrice(product.oldPrice)}</del>
                <span>
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="product-detail-description">{product.description}</p>

          {product.packItems && (
            <section className="product-included-items" aria-labelledby="included-title">
              <h2 id="included-title">Le pack comprend</h2>
              <ul>
                {product.packItems.map((item) => (
                  <li key={item}>
                    <i className="fa-solid fa-check" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ProductDetailActions product={product} />

          <div className="product-delivery-note">
            <i className="fa-solid fa-truck-fast" aria-hidden="true" />
            <p>
              Livraison offerte dès{" "}
              {formatPrice(siteConfig.legal.shippingCostThreshold)} d’achat.
              <Link href="/shipping"> En savoir plus</Link>
            </p>
          </div>
        </div>
      </section>

      {specifications.length > 0 && (
        <section className="product-specifications" aria-labelledby="specifications-title">
          <div className="product-section-heading">
            <p className="product-detail-eyebrow">Détails</p>
            <h2 id="specifications-title">Caractéristiques du produit</h2>
          </div>
          <dl>
            {specifications.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="product-related-section" aria-labelledby="related-title">
          <div className="product-section-heading">
            <p className="product-detail-eyebrow">À découvrir aussi</p>
            <h2 id="related-title">Dans le même univers</h2>
          </div>
          <div className="storefront-product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
