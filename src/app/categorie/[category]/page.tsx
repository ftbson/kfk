import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { productsData } from "@/data/products";
import { siteConfig } from "@/config/site";

const departments = {
  "djalabiya-house": { label: "DJALABIYA HOUSE" },
  accessories: { label: "ACCESSOIRES" },
  "look-and-drip": { label: "LOOK & DRIP" },
  signature: { label: "SIGNATURE" },
} as const satisfies Record<string, { label: string }>;

type DepartmentSlug = keyof typeof departments;

function isDepartmentSlug(value: string): value is DepartmentSlug {
  return Object.hasOwn(departments, value);
}

export function generateStaticParams() {
  return Object.keys(departments).map((dept) => ({ category: dept }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isDepartmentSlug(category)) notFound();

  const selectedDept = departments[category];
  const deptConfig = siteConfig.departments.find((d) => d.id === category);

  const products = productsData.filter(
    (product) => product.department === category,
  );

  return (
    <main className="catalog-page">
      <header className="catalog-heading">
        <p className="storefront-eyebrow">CINQ MONDES. UNE DESTINÉE.</p>
        <h1>{selectedDept.label}</h1>
        <p>
          {deptConfig?.description ?? `${products.length} articles dans ce département`}
        </p>
      </header>
      <div className="storefront-product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="catalog-empty">Aucun article disponible pour le moment.</p>
      )}
      <div className="storefront-actions">
        <Link href="/categorie" className="storefront-secondary-link">
          Tous Les Départements
        </Link>
        <Link href="/packs" className="storefront-primary-link">
          Voir Les Packs
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}