import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const products = getAllProducts();

  const staticRoutes = [
    "",
    "/packs",
    "/categorie/djalabiya-house",
    "/categorie/accessories",
    "/categorie/look-and-drip",
    "/categorie/signature",
    "/vip-club",
    "/a-propos",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/terms",
    "/legal/privacy",
    "/legal/impressum",
    "/legal/cookies",
    "/cart",
    "/favorites",
    "/login",
    "/account",
  ];

  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const departmentRoutes = siteConfig.departments.map((dept) => ({
    url: `${baseUrl}/categorie/${dept.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const packRoutes = siteConfig.packs.map((pack) => ({
    url: `${baseUrl}/packs`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.7,
    })),
    ...departmentRoutes,
    ...productRoutes,
    ...packRoutes,
  ];
}