import CategorySection from "@/components/Categories";
import Link from "next/link";

export const metadata = {
  title: "Départements KFK | KUN FAYA KUN",
  description:
    "Découvrez les quatre mondes KFK : JALABIYA HOUSE, ACCESSOIRES, LOOK & DRIP, SIGNATURE. Mode, parfums, accessoires et looks complets pour homme.",
};

export default function CategoriesPage() {
  return (
    <main className="category-index-page">
      <CategorySection />
      <div className="storefront-actions category-index-action">
        <Link href="/packs" className="storefront-primary-link">
          Voir Tous Les Packs
          <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
