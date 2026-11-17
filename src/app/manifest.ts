import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.brand.name,
    short_name: siteConfig.brand.shortName,
    description: siteConfig.seo.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: siteConfig.colors.background,
    theme_color: siteConfig.colors.primary,
    orientation: "portrait-primary",
    scope: "/",
    lang: "fr",
    dir: "ltr",
    categories: ["shopping", "lifestyle", "fashion"],
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/home-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "KFK Page d'accueil — Marque lifestyle premium pour homme",
      },
      {
        src: "/screenshots/home-narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "KFK Vue mobile — Acheter les collections",
      },
    ],
    shortcuts: [
      {
        name: "Acheter les Packs",
        short_name: "Packs",
        description: "Looks complets sélectionnés",
        url: "/packs",
        icons: [{ src: "/icons/shortcut-packs.png", sizes: "192x192" }],
      },
      {
        name: "Djalabiya House",
        short_name: "Djalabiya",
        description: "Tenues traditionnelles modernes",
        url: "/categorie/djalabiya-house",
        icons: [{ src: "/icons/shortcut-djalabiya.png", sizes: "192x192" }],
      },
      {
        name: "Accessoires",
        short_name: "Accessoires",
        description: "Montres, parfums, bijoux",
        url: "/categorie/accessories",
        icons: [{ src: "/icons/shortcut-accessories.png", sizes: "192x192" }],
      },
      {
        name: "Mon Panier",
        short_name: "Panier",
        description: "Voir le panier d'achat",
        url: "/cart",
        icons: [{ src: "/icons/shortcut-cart.png", sizes: "192x192" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}