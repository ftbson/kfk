import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";

// KFK (KUN FAYA KUN) - Site Metadata Configuration
export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [...siteConfig.seo.keywords],
  authors: [...siteConfig.seo.authors],
  creator: siteConfig.seo.creator,
  publisher: siteConfig.seo.publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: siteConfig.metadataBase,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.brand.shortName,
    images: [
      {
        url: "/img/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brand.name} - ${siteConfig.brand.baseline}`,
      },
    ],
    locale: siteConfig.seo.ogLocale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: ["/img/logo.png"],
    creator: siteConfig.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/img/logo.png",
    shortcut: "/img/logo.png",
    apple: "/img/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupération du pathname pour exclure la Nav & Footer sur les routes /admin
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || headersList.get("next-url") || "";
  
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <CartProvider>
          <AuthProvider>
            <div
              className="app-container"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "#0a0a0a", // Fond noir par défaut pour respecter l'identité de la marque
                color: "#ffffff",
              }}
            >
              {!isAdminRoute && <Navbar />}
              <main className="main-content" style={{ flex: 1 }}>
                {children}
              </main>
              {!isAdminRoute && <Footer />}
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}