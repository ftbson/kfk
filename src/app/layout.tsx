import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

// Configuration SEO Avancée - KFK (KUN FAYA KUN) - The Lifestyle Brand
export const metadata: Metadata = {
  title: {
    default: "KFK - KUN FAYA KUN | The Lifestyle Brand & Mode Masculine",
    template: "%s | KFK",
  },
  description:
    "Découvrez KFK (KUN FAYA KUN), la marque de lifestyle masculin haut de gamme. Djalabiyas, accessoires, parfums et looks complets. Command Your Destiny.",
  keywords: [
    "KFK",
    "Kun Faya Kun",
    "Mode masculine haut de gamme",
    "Djalabiya moderne",
    "Lifestyle brand",
    "Accessoires homme",
    "Parfum homme",
    "Style et élégance",
  ],
  authors: [{ name: "KFK" }],
  creator: "KFK",
  publisher: "KFK",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kunfayakun.com"), // À adapter selon votre domaine final
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KFK - KUN FAYA KUN | The Lifestyle Brand",
    description:
      "Plus qu'une marque, un style de vie. Explorez nos collections de djalabiyas, accessoires et looks complets.",
    url: "https://kunfayakun.com",
    siteName: "KFK",
    images: [
      {
        url: "/img/logo.png",
        width: 800,
        height: 600,
        alt: "KFK Logo",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KFK - KUN FAYA KUN | Command Your Destiny",
    description:
      "Exprimez votre personnalité, affirmez votre style et commandez votre destin.",
    images: ["/img/logo.png"],
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