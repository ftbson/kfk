import Image from "next/image";
import { siteConfig, getDepartmentById } from "@/config/site";
import { getProductsByDepartment } from "@/data/products";
import ShopGrid from "@/components/ShopGrid";

const department = getDepartmentById("accessories")!;
const products = getProductsByDepartment("accessories");

export const metadata = {
  title: department.name,
  description: department.description,
};

export default function AccessoriesPage() {
  return (
    <main className="department-page">
      <header className="department-header">
        <div className="department-header-bg">
          <Image
            src={department.heroImage}
            alt={department.name}
            fill
            priority
            sizes="100vw"
            className="department-hero-image"
          />
        </div>
        <div className="department-header-content">
          <p className="department-eyebrow">{department.tagline}</p>
          <h1>{department.name}</h1>
          <p className="department-description">{department.description}</p>
        </div>
      </header>

      <section className="department-products">
        <div className="container">
          <ShopGrid initialProducts={products} departmentId="accessories" />
        </div>
      </section>
    </main>
  );
}