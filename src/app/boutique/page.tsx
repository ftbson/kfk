import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Boutique KFK | KUN FAYA KUN",
  description:
    "Découvrez nos collections lifestyle premium : JALABIYA HOUSE, ACCESSOIRES, LOOK & DRIP, SIGNATURE. Mode, parfums, accessoires et packs complets pour homme.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}
