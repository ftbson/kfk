export const siteConfig = {
  // Brand Identity (à GARDER en anglais - éléments de marque)
  brand: {
    name: "KUN FAYA KUN",
    shortName: "KFK",
    baseline: "THE LIFESTYLE BRAND",
    slogan: "COMMAND YOUR DESTINY",
    tagline: "Plus qu'une marque, un art de vivre.",
    description:
      "Marque lifestyle premium pour homme. Mode, accessoires, parfums, JALABIYAs et looks complets, de la tête aux pieds.",
    positioning:
      "Marque lifestyle premium pour homme : moderne, chic, élégante, puissante, minimaliste, internationale.",
  },

  // URL & SEO
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kunfayakun.com",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://kunfayakun.com",
  ),

  // Default SEO (en français)
  seo: {
    defaultTitle: "KFK - KUN FAYA KUN | The Lifestyle Brand",
    titleTemplate: "%s | KFK - KUN FAYA KUN",
    defaultDescription:
      "Découvrez KFK (KUN FAYA KUN), la marque lifestyle premium pour homme. JALABIYAs, accessoires, parfums et looks complets. Command Your Destiny.",
    keywords: [
      "KFK",
      "Kun Faya Kun",
      "mode homme premium",
      "JALABIYA moderne",
      "marque lifestyle homme",
      "accessoires homme",
      "parfum homme",
      "bijoux homme",
      "style drip",
      "style gentleman",
    ],
    authors: [{ name: "KFK" }],
    creator: "KFK",
    publisher: "KFK",
    ogLocale: "fr_FR",
    twitterHandle: "@kunfayakun",
  },

  // Contact
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@kunfayakun.com",
    phone: process.env.NEXT_PUBLIC_PHONE || "[À COMPLÉTER]",
    address: {
      line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 || "[À COMPLÉTER]",
      city: process.env.NEXT_PUBLIC_ADDRESS_CITY || "[À COMPLÉTER]",
      country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "Bénin",
    },
  },

  // Navigation (Header) - Libellés en français, routes inchangées
  navigation: {
    main: [
      {
        label: "JALABIYA HOUSE",
        href: "/categorie/JALABIYA-house",
        department: "JALABIYA-house",
      },
      {
        label: "ACCESSOIRES",
        href: "/categorie/accessories",
        department: "accessories",
      },
      {
        label: "LOOK & DRIP",
        href: "/categorie/look-and-drip",
        department: "look-and-drip",
      },
      {
        label: "SIGNATURE",
        href: "/categorie/signature",
        department: "signature",
      },
      {
        label: "KFK PACKS",
        href: "/packs",
        department: "packs",
        highlight: true,
      },
    ],
    secondary: [
      { label: "KFK VIP CLUB", href: "/vip-club" },
      { label: "MON COMPTE", href: "/account" },
    ],
    actions: [
      {
        label: "Favoris",
        href: "/favorites",
        icon: "heart",
        ariaLabel: "Favoris",
      },
      {
        label: "Panier",
        href: "/cart",
        icon: "bag-shopping",
        ariaLabel: "Panier d'achat",
      },
    ],
  },

  // Footer - En français
  footer: {
    columns: [
      {
        title: "Service Client",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "FAQ", href: "/faq" },
          { label: "Livraison", href: "/shipping" },
          { label: "Retours", href: "/returns" },
        ],
      },
      {
        title: "Informations",
        links: [
          { label: "À propos", href: "/a-propos" },
          { label: "CGV", href: "/terms" },
          { label: "Politique de confidentialité", href: "/legal/privacy" },
          { label: "Mentions légales", href: "/legal/impressum" },
          { label: "Cookies", href: "/legal/cookies" },
        ],
      },
      {
        title: "Suivez-nous",
        socials: [
          {
            label: "Instagram",
            href:
              process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
              "https://instagram.com/kunfayakun",
            icon: "instagram",
          },
          {
            label: "TikTok",
            href:
              process.env.NEXT_PUBLIC_TIKTOK_URL ||
              "https://tiktok.com/@kunfayakun",
            icon: "tiktok",
          },
          {
            label: "Facebook",
            href:
              process.env.NEXT_PUBLIC_FACEBOOK_URL ||
              "https://facebook.com/kunfayakun",
            icon: "facebook-f",
          },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} KFK - COMMAND YOUR DESTINY. Tous droits réservés.`,
    bottomLinks: [
      { label: "Confidentialité", href: "/legal/privacy" },
      { label: "CGV", href: "/terms" },
    ],
  },

  // Departments (4 + Packs) - Noms à garder en anglais, descriptions en français
  departments: [
    {
      id: "JALABIYA-house",
      name: "KFK JALABIYA HOUSE",
      slug: "JALABIYA-house",
      theme: "Tradition & Élégance",
      description:
        "JALABIYAs, boubous, tenues traditionnelles modernes, tissus premium, collections pour cérémonies et célébrations.",
      heroImage:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=80",
      tagline: "Tradition & Élégance",
      hero: {
        title: "JALABIYA HOUSE",
        subtitle: "Tradition & Élégance. L'art du boubou moderne revisité.",
        category: "01. TRADITION",
        ctaText: "Découvrir la collection",
        ctaLink: "/JALABIYA-house",
      },
    },
    {
      id: "accessories",
      name: "KFK ACCESSORIES",
      slug: "accessories",
      theme: "Les Détails Qui Font La Différence",
      description:
        "Montres, lunettes, parfums, bracelets, bijoux, sacs et sacoches.",
      heroImage:
        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1920&q=80",
      tagline: "Les Détails Qui Font La Différence",
      hero: {
        title: "ACCESSOIRES",
        subtitle:
          "Les détails qui font la différence. Montres, fragrances, bijoux et plus.",
        category: "02. DÉTAILS",
        ctaText: "Explorer les accessoires",
        ctaLink: "/accessories",
      },
    },
    {
      id: "look-and-drip",
      name: "KFK LOOK & DRIP",
      slug: "look-and-drip",
      theme: "Style Quotidien",
      description:
        "Ensembles, joggers, chemises, pantalons, sneakers, chaussures, polos, looks complets.",
      heroImage:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
      tagline: "Style Quotidien",
      hero: {
        title: "LOOK & DRIP",
        subtitle:
          "Ensembles, joggers et style urbain maîtrisé. Le drip au quotidien.",
        category: "03. STREETWEAR",
        ctaText: "Voir les tenues",
        ctaLink: "/look-and-drip",
      },
    },
    {
      id: "signature",
      name: "KFK SIGNATURE",
      slug: "signature",
      theme: "L'Essence De Votre Style",
      description:
        "Parfums signature, collections exclusives, coffrets cadeaux, accessoires KFK personnalisés.",
      heroImage:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920&q=80",
      tagline: "L'Essence De Votre Style",
      hero: {
        title: "SIGNATURE",
        subtitle: "Parfums exclusifs, éditions limitées et luxe personnalisé.",
        category: "04. LUXE",
        ctaText: "Explorer le luxe",
        ctaLink: "/signature",
      },
    },
    {
      id: "packs",
      name: "KFK PACKS",
      slug: "packs",
      theme: "Looks Complets Sélectionnés",
      description:
        "Gentleman Pack, Friday Pack, Drip Pack, Executive Pack — ensembles prêts à porter sélectionnés.",
      heroImage:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80",
      tagline: "Looks Complets Sélectionnés",
      hero: {
        title: "KFK PACKS",
        subtitle:
          "Ensembles sélectionnés pour chaque occasion. Un clic, un look complet.",
        category: "05. PACKS",
        ctaText: "Acheter les packs",
        ctaLink: "/packs",
      },
    },
  ],

  // Packs - Noms à garder en anglais, descriptions en français
  packs: [
    {
      id: "gentleman-pack",
      name: "Gentleman Pack",
      tagline: "Élégance & Réussite",
      items: ["Pantalon", "Chemise", "Montre", "Parfum"],
      description:
        "L'ensemble essentiel pour le gentleman moderne. Tranchant, confiant, complet.",
      theme: "Élégance & Réussite",
    },
    {
      id: "friday-pack",
      name: "Friday Pack",
      tagline: "Spiritualité & Prestige",
      items: ["JALABIYA", "Parfum", "Montre"],
      description:
        "Pour la prière du vendredi et au-delà. La tradition rencontre le luxe.",
      theme: "Spiritualité & Prestige",
    },
    {
      id: "drip-pack",
      name: "Drip Pack",
      tagline: "Confort & Style",
      items: ["Jogger", "Sneakers", "Lunettes", "Bracelet"],
      description:
        "Confort street-ready au style indéniable. Drip quotidien sans effort.",
      theme: "Confort & Style",
    },
    {
      id: "executive-pack",
      name: "Executive Pack",
      tagline: "Classe & Ambition",
      items: ["Costume ou Tenue Élégante", "Montre", "Sacoche"],
      description:
        "Power dressing pour le leader. Commandez chaque pièce où vous entrez.",
      theme: "Classe & Ambition",
    },
  ],

  // Featured Looks
  featuredLooks: [
    {
      name: "KFK Gentleman Look",
      department: "look-and-drip",
      pack: "gentleman-pack",
    },
    {
      name: "KFK Friday Look",
      department: "JALABIYA-house",
      pack: "friday-pack",
    },
    { name: "KFK Drip Look", department: "look-and-drip", pack: "drip-pack" },
    {
      name: "KFK Executive Look",
      department: "signature",
      pack: "executive-pack",
    },
  ],

  // Services & Innovations - Noms à garder en anglais, descriptions en français
  services: {
    vipClub: {
      name: "KFK VIP Club",
      benefits: [
        "Accès anticipé aux nouvelles collections",
        "Réductions exclusives",
        "Événements privés",
        "Conseils style personnalisés",
        "Service client prioritaire",
      ],
    },
    personalStylist: {
      name: "KFK Personal Stylist",
      description:
        "Dites-nous votre budget et l'occasion. KFK compose votre look complet de la tête aux pieds.",
    },
    limitedEdition: {
      name: "KFK Limited Edition",
      description:
        "Séries numérotées limitées — 50 ou 100 pièces seulement. Exclusivité garantie.",
    },
    giftBox: {
      name: "KFK Gift Box",
      description:
        "Packaging premium pour le cadeau parfait. Déballer le lifestyle.",
    },
    worldwideDelivery: {
      name: "KFK Worldwide Delivery",
      regions: ["Bénin", "Afrique", "International"],
      description: "Où que vous soyez, KFK vous rejoint.",
    },
    ambassadors: {
      name: "KFK Ambassadors",
      description:
        "Rejoignez le mouvement. Représentez la marque. Commandez votre destin.",
    },
  },

  // Promo Bar (configurable)
  promoBar: {
    enabled: process.env.NEXT_PUBLIC_PROMO_ENABLED === "true",
    text:
      process.env.NEXT_PUBLIC_PROMO_TEXT ||
      "Découvrez la nouvelle collection KFK",
    endDate: process.env.NEXT_PUBLIC_PROMO_END_DATE || null, // ISO string
    ctaText: process.env.NEXT_PUBLIC_PROMO_CTA_TEXT || "Acheter",
    ctaLink: process.env.NEXT_PUBLIC_PROMO_CTA_LINK || "/packs",
  },

  // Currency & Locale
  currency: {
    code: "XOF",
    symbol: "FCFA",
    locale: "fr-FR",
  },

  // Colors (for manifest, PWA, etc.)
  colors: {
    primary: "#0a0a0a",
    background: "#0a0a0a",
    accent: "#d4a843", // gold accent
    text: "#ffffff",
    textMuted: "#a0a0a0",
  },

  // Legal placeholders (à compléter par le propriétaire)
  legal: {
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "[À COMPLÉTER]",
    companyLegalForm:
      process.env.NEXT_PUBLIC_COMPANY_LEGAL_FORM || "[À COMPLÉTER]",
    companyAddress: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "[À COMPLÉTER]",
    companyCountry: process.env.NEXT_PUBLIC_COMPANY_COUNTRY || "Bénin",
    registrationNumber:
      process.env.NEXT_PUBLIC_REGISTRATION_NUMBER || "[À COMPLÉTER]",
    vatNumber: process.env.NEXT_PUBLIC_VAT_NUMBER || "[À COMPLÉTER]",
    authorizedRepresentative:
      process.env.NEXT_PUBLIC_AUTHORIZED_REP || "[À COMPLÉTER]",
    dataProtectionEmail: process.env.NEXT_PUBLIC_DPO_EMAIL || "[À COMPLÉTER]",
    supervisoryAuthority:
      process.env.NEXT_PUBLIC_SUPERVISORY_AUTHORITY || "[À COMPLÉTER]",
    shippingCountries: ["Bénin", "Afrique", "International"],
    shippingCostThreshold: 91500,
    shippingCostBase: 9150,
    returnWindowDays: 14,
    paymentMethods: ["Virement bancaire", "Carte (bientôt)"],
  },
} as const;

// Helper functions
export function getDepartmentById(id: string) {
  return siteConfig.departments.find((dept) => dept.id === id);
}

export function getPackById(id: string) {
  return siteConfig.packs.find((pack) => pack.id === id);
}

// Type exports for TypeScript
export type SiteConfig = typeof siteConfig;
export type Department = (typeof siteConfig.departments)[0];
export type Pack = (typeof siteConfig.packs)[0];
export type NavigationItem = (typeof siteConfig.navigation.main)[0];
