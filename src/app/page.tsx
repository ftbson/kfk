import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import HomeProducts from "@/components/HomeProducts";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: siteConfig.brand.name,
  description:
    "KFK (KUN FAYA KUN) — Marque lifestyle premium pour hommes. Mode, accessoires, parfums, djalabiyas et looks complets de la tête aux pieds. Modern, chic, élégant, puissant, minimaliste, international.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <HomeProducts />
      <BestSellers />
      <WhyUs />
      <Testimonials />
    </main>
  );
}