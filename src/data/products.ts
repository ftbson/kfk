/**
 * KFK (KUN FAYA KUN) - Product Catalog
 * Catalog source amounts are USD and are exported as FCFA.
 * Replace placeholder images with actual KFK assets in /public/img/products/
 */
import { convertUsdToXof } from "@/lib/currency";

export interface Product {
  id: string;
  title: string;
  description: string;
  department:
    | "JALABIYA-house"
    | "accessories"
    | "look-and-drip"
    | "signature"
    | "packs";
  category: string; // Sub-category within department
  price: number;
  oldPrice?: number;
  discount?: string; // e.g. "20%"
  image: string;
  images?: string[]; // Gallery images
  badge?: string; // e.g. "New", "Limited", "VIP"
  isLimitedEdition?: boolean;
  limitedEditionNumber?: number; // e.g. 50 or 100
  isVipExclusive?: boolean;
  rating?: number; // Product rating out of 5
  reviewsCount?: number; // Number of reviews
  // Department-specific fields
  fabric?: string; // For JALABIYA-house
  material?: string; // For accessories
  size?: string; // For look-and-drip
  scentNotes?: string; // For signature perfumes
  packItems?: string[]; // For packs
  colors?: string[]; // Available colors
  sizes?: string[]; // Available sizes
}

const productsInUsd: Product[] = [
  // ==========================================
  // JALABIYA HOUSE - Vêtements traditionnels masculins
  // ==========================================
  {
    id: "jh-001",
    title: "Jalabiya Classique – Noir",
    description:
      "Jalabiya masculine en coton premium, coupe droite traditionnelle. Tissu respirant, idéal pour la prière et les cérémonies. Finitions soignées au col et aux manches.",
    department: "JALABIYA-house",
    category: "Jalabiyas",
    price: 85,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    ],
    fabric: "Coton premium 100%",
    colors: ["Noir", "Bleu marine", "Blanc", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 42,
  },
  {
    id: "jh-002",
    title: "Boubou Moderne – Blanc",
    description:
      "Boubou contemporain en mélange lin-coton, coupe ample et élégante. Tissu léger et résistant, parfait pour les grandes occasions et l'été. Broderie discrète au col.",
    department: "JALABIYA-house",
    category: "Boubous",
    price: 120,
    oldPrice: 150,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    ],
    fabric: "Mélange lin-coton",
    colors: ["Blanc", "Ivoire", "Sable", "Gris clair"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 67,
  },
  {
    id: "jh-003",
    title: "Kaftan Cérémonie – Ivoire",
    description:
      "Kaftan de cérémonie en tissu jacquard subtil, coupe royale avec manches larges. Doublure en coton doux. Pour mariages, Aïd et événements formels.",
    department: "JALABIYA-house",
    category: "Kaftans",
    price: 180,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    ],
    fabric: "Jacquard coton-soie",
    colors: ["Ivoire", "Champagne", "Or pâle", "Argenté"],
    sizes: ["M", "L", "XL", "XXL"],
    badge: "Limited Edition",
    isLimitedEdition: true,
    limitedEditionNumber: 50,
    rating: 4.7,
    reviewsCount: 23,
  },
  {
    id: "jh-004",
    title: "Djellaba Hiver – Marine",
    description:
      "Djellaba chaude en laine mélangée, capuche intégrée, poches latérales. Coupe droite, tissus épais pour l'hiver. Élégance traditionnelle par temps frais.",
    department: "JALABIYA-house",
    category: "Djellabas",
    price: 140,
    image: "https://images.unsplash.com/photo-1610087552295-7b7c9c3b6e8e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1610087552295-7b7c9c3b6e8e?q=80&w=800&auto=format&fit=crop",
    ],
    fabric: "Laine mélangée",
    colors: ["Marine", "Charbon", "Bordeaux", "Vert sapin"],
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewsCount: 31,
  },
  {
    id: "jh-005",
    title: "Ensemble Traditionnel – Beige",
    description:
      "Ensemble deux pièces : tunique longue + pantalon assorti. Coton léger, coupe décontractée. Pour le quotidien et le vendredi. Look complet en un clic.",
    department: "JALABIYA-house",
    category: "Ensembles",
    price: 110,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    ],
    fabric: "Coton léger 100%",
    colors: ["Beige", "Sable", "Gris perle", "Bleu ciel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.5,
    reviewsCount: 28,
  },

  // ==========================================
  // ACCESSORIES - Montres, lunettes, parfums, bijoux, sacs
  // ==========================================
  {
    id: "ac-001",
    title: "Montre Minimaliste – Argent",
    description:
      "Montre à quartz japonaise, boîtier acier inoxydable 40mm, cadran épuré soleillé, bracelet maille milanaise ajustable. Verre saphir résistant aux rayures. Étanche 50m.",
    department: "accessories",
    category: "Montres",
    price: 180,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Acier inoxydable 316L, verre saphir",
    colors: ["Argent", "Noir", "Or rose", "Bleu"],
    badge: "Best Seller",
    rating: 4.8,
    reviewsCount: 156,
  },
  {
    id: "ac-002",
    title: "Montre Chronographe – Noir",
    description:
      "Chronographe trois sous-cadrans, mouvement quartz précis, boîtier 42mm PVD noir, bracelet cuir véritable noir surpiqûres blanches. Verre minéral durci. Étanche 100m.",
    department: "accessories",
    category: "Montres",
    price: 220,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Acier inoxydable PVD noir, cuir véritable",
    colors: ["Noir", "Marron", "Bleu marine"],
    rating: 4.7,
    reviewsCount: 89,
  },
  {
    id: "ac-003",
    title: "Lunettes Aviateur – Doré",
    description:
      "Forme aviateur classique, monture métal doré fin, verres polarisés UV400 catégorie 3. Branches ajustables, plaquettes nez en silicone. Étui cuir inclus.",
    department: "accessories",
    category: "Lunettes",
    price: 95,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Métal doré, verres polarisés",
    colors: ["Doré/Vert", "Doré/Brun", "Argent/Gris", "Noir/Gris"],
    rating: 4.6,
    reviewsCount: 73,
  },
  {
    id: "ac-004",
    title: "Lunettes Carré – Noir Mat",
    description:
      "Monture acétate haute qualité noir mat, verres polarisés dégradés. Charnières à ressort, confort optimal. Style intemporel, visage ovale à carré. Étui rigide inclus.",
    department: "accessories",
    category: "Lunettes",
    price: 85,
    oldPrice: 110,
    discount: "23%",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Acétate premium, verres polarisés",
    colors: ["Noir mat", "Écaille", "Bleu marine", "Transparent"],
    rating: 4.5,
    reviewsCount: 41,
  },
  {
    id: "ac-005",
    title: "Parfum Signature Oud – 100ml",
    description:
      "Eau de parfum boisée orientale. Notes de tête : bergamote, safran. Cœur : oud, rose, géranium. Fond : ambre, santal, musc blanc. Tenue 10h+. Flacon verre lourd 100ml.",
    department: "accessories",
    category: "Parfums",
    price: 140,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Verre, atomiseur métal",
    scentNotes: "Bergamote, Safran, Oud, Rose, Géranium, Ambre, Santal, Musc blanc",
    badge: "Signature",
    rating: 4.9,
    reviewsCount: 203,
  },
  {
    id: "ac-006",
    title: "Parfum Frais Vétiver – 100ml",
    description:
      "Eau de parfum fraîche masculine. Notes de tête : citron, pamplemousse, cardamome. Cœur : vétiver, lavande, géranium. Fond : cèdre, musc, mousse de chêne. Flacon 100ml.",
    department: "accessories",
    category: "Parfums",
    price: 120,
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Verre, atomiseur métal",
    scentNotes: "Citron, Pamplemousse, Cardamome, Vétiver, Lavande, Cèdre, Musc",
    rating: 4.7,
    reviewsCount: 112,
  },
  {
    id: "ac-007",
    title: "Chaîne Acier Inoxydable – 60cm",
    description:
      "Chaîne maille forçat 4mm, acier inoxydable 316L chirurgical, fermoir mousqueton sécurisé. Résistant à l'eau, ne noircit pas, hypoallergénique. Port solo ou avec pendentif.",
    department: "accessories",
    category: "Bijoux",
    price: 45,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Acier inoxydable 316L",
    colors: ["Argent", "Or", "Noir PVD"],
    sizes: ["50cm", "60cm", "70cm"],
    rating: 4.8,
    reviewsCount: 134,
  },
  {
    id: "ac-008",
    title: "Bracelet Cuir & Acier – Marron",
    description:
      "Bracelet double tour cuir véritable marron, fermoir acier inoxydable aimanté. Largeur 12mm, longueur ajustable 19-23cm. Style masculin, poignet confortable.",
    department: "accessories",
    category: "Bijoux",
    price: 38,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Cuir véritable, acier inoxydable 316L",
    colors: ["Marron", "Noir", "Cognac", "Bleu marine"],
    rating: 4.6,
    reviewsCount: 67,
  },
  {
    id: "ac-009",
    title: "Bracelet Perles Naturelles – Onyx",
    description:
      "Perles onyx noir mat 8mm, intercalaires acier inoxydable, fil élastique renforcé. Pierre naturelle, chaque pièce unique. Taille unique extensible (18-20cm).",
    department: "accessories",
    category: "Bijoux",
    price: 32,
    image: "https://images.unsplash.com/photo-1611106594073-d3d7e1b6b7a5?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611106594073-d3d7e1b6b7a5?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Onyx naturel, acier inoxydable 316L",
    colors: ["Onyx noir", "Œil de tigre", "Lapis lazuli", "Pierre de lave"],
    rating: 4.7,
    reviewsCount: 89,
  },
  {
    id: "ac-010",
    title: "Portefeuille Cuir – Noir",
    description:
      "Portefeuille bi-fold cuir pleine fleur, 8 fentes cartes, 2 compartiments billets, poche monnaie zippée. RFID blocking. Dimensions 11.5 x 9.5 cm. Fabriqué à la main.",
    department: "accessories",
    category: "Maroquinerie",
    price: 65,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Cuir pleine fleur, doublure textile",
    colors: ["Noir", "Marron", "Cognac", "Bleu marine"],
    rating: 4.8,
    reviewsCount: 91,
  },
  {
    id: "ac-011",
    title: "Sacoche Bandoulière – Charbon",
    description:
      "Sacoche messenger toile enduite déperlante + cuir, bandoulière réglable, compartiment ordinateur 13\", poches organisées. Style urbain, usage quotidien. 28 x 20 x 8 cm.",
    department: "accessories",
    category: "Maroquinerie",
    price: 125,
    oldPrice: 155,
    discount: "19%",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Toile enduite, cuir, doublure polyester",
    colors: ["Charbon", "Kaki", "Marine", "Noir"],
    rating: 4.7,
    reviewsCount: 54,
  },

  // ==========================================
  // LOOK & DRIP - Vêtements quotidiens, chaussures
  // ==========================================
  {
    id: "ld-001",
    title: "T-Shirt Essentiel – Noir",
    description:
      "T-shirt col rond, coton peigné 180g/m², coupe droite moderne, ourlets renforcés. Tissu doux, résistant au lavage, ne se déforme pas. Base de garde-robe.",
    department: "look-and-drip",
    category: "T-Shirts",
    price: 35,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton peigné 180g/m²",
    colors: ["Noir", "Blanc", "Gris chiné", "Bleu marine", "Vert olive", "Bordeaux"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 312,
  },
  {
    id: "ld-002",
    title: "T-Shirt Essentiel – Blanc",
    description:
      "T-shirt col rond, coton peigné 180g/m², coupe droite moderne, ourlets renforcés. Blanc pur, non transparent. Base indispensable, qualité premium.",
    department: "look-and-drip",
    category: "T-Shirts",
    price: 35,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton peigné 180g/m²",
    colors: ["Blanc", "Noir", "Gris chiné", "Bleu marine", "Vert olive", "Bordeaux"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviewsCount: 287,
  },
  {
    id: "ld-003",
    title: "Polo Classique – Blanc",
    description:
      "Polo piqué de coton 220g/m², col structuré à 3 boutons, manches courtes ourlées, fentes latérales. Coupe regular, tissu respirant. Élégance décontractée.",
    department: "look-and-drip",
    category: "Polos",
    price: 55,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton piqué 220g/m²",
    colors: ["Blanc", "Noir", "Bleu marine", "Vert forêt", "Bordeaux", "Gris anthracite"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 156,
  },
  {
    id: "ld-004",
    title: "Polo Classique – Bleu Marine",
    description:
      "Polo piqué de coton 220g/m², col structuré à 3 boutons, manches courtes ourlées, fentes latérales. Bleu marine profond, intemporel. Coupe regular.",
    department: "look-and-drip",
    category: "Polos",
    price: 55,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton piqué 220g/m²",
    colors: ["Bleu marine", "Blanc", "Noir", "Vert forêt", "Bordeaux", "Gris anthracite"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 134,
  },
  {
    id: "ld-005",
    title: "Chemise Casual – Beige",
    description:
      "Chemise coton popeline léger, col boutonné, poignet boutonné, pli dos, ourlet arrondi. Coupe décontractée, tissu respirant. Bureau ou week-end.",
    department: "look-and-drip",
    category: "Chemises",
    price: 65,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton popeline 120g/m²",
    colors: ["Beige", "Blanc", "Bleu ciel", "Rose poudré", "Vert sauge", "Rayé bleu"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 112,
  },
  {
    id: "ld-006",
    title: "Chemise Oxford – Blanc",
    description:
      "Chemise coton Oxford texturé, col boutonné, poche poitrine, ourlet arrondi. Coupe regular, tissu épais et durable. Classique indémodable, repassage facile.",
    department: "look-and-drip",
    category: "Chemises",
    price: 70,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton Oxford 150g/m²",
    colors: ["Blanc", "Bleu clair", "Rose", "Rayé blanc/bleu", "Rayé blanc/rose"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "New",
    rating: 4.8,
    reviewsCount: 89,
  },
  {
    id: "ld-007",
    title: "Pantalon Droit – Noir",
    description:
      "Pantalon chino coton-élasthanne, coupe droite moderne, taille mi-haute, 2 poches italiennes, 2 poches passepoilées dos. Tissu stretch confort, finitions soignées.",
    department: "look-and-drip",
    category: "Pantalons",
    price: 75,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton 97% / Élasthanne 3%",
    colors: ["Noir", "Bleu marine", "Beige", "Gris anthracite", "Kaki", "Marron"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    rating: 4.8,
    reviewsCount: 178,
  },
  {
    id: "ld-008",
    title: "Jean Brut – Bleu Brut",
    description:
      "Jean 5 poches denim 13oz, coupe droiteRegular, taille normale, braguette boutonnée. Denim brut non lavé, se patine avec le temps. Fabrication soignée.",
    department: "look-and-drip",
    category: "Jeans",
    price: 85,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Denim 100% coton 13oz",
    colors: ["Bleu brut", "Bleu lavé", "Noir", "Gris"],
    sizes: ["38", "40", "42", "44", "46", "48"],
    rating: 4.7,
    reviewsCount: 145,
  },
  {
    id: "ld-009",
    title: "Jogging Urbain – Gris Chiné",
    description:
      "Jogger molleton gratté 300g/m², coupe fuselée, taille élastique cordon, poches zippées, ourlets côtes. Confort absolu, style soigné. Ville ou domicile.",
    department: "look-and-drip",
    category: "Joggers",
    price: 65,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton molleton 300g/m²",
    colors: ["Gris chiné", "Noir", "Bleu marine", "Vert olive", "Bordeaux"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 234,
  },
  {
    id: "ld-010",
    title: "Veste Minimaliste – Noir",
    description:
      "Veste bomber légère, nylon technique déperlant, doublure mesh respirant, col montant, poches zippées, poignets élastiqués. Coupe regular, mi-saison.",
    department: "look-and-drip",
    category: "Vestes",
    price: 120,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Nylon technique, doublure mesh",
    colors: ["Noir", "Bleu marine", "Kaki", "Gris anthracite"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 98,
  },
  {
    id: "ld-011",
    title: "Sweat Col Rond – Gris Chiné",
    description:
      "Sweat coton molleton 320g/m², col rond bord-côte, manches montées, coupe regular. Tissu dense, chaleur maîtrisée, tenue impeccable. Essential gris.",
    department: "look-and-drip",
    category: "Sweats",
    price: 70,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coton molleton 320g/m²",
    colors: ["Gris chiné", "Noir", "Bleu marine", "Beige", "Vert forêt"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviewsCount: 167,
  },
  {
    id: "ld-012",
    title: "Sneakers Minimalistes – Blanc",
    description:
      "Sneakers cuir lisse blanc, semelle gomme naturelle, doublure cuir, semelle intérieure amovible. Construction Strobel, confort immédiat. Style épuré, tout va avec.",
    department: "look-and-drip",
    category: "Sneakers",
    price: 135,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Cuir pleine fleur, semelle gomme",
    colors: ["Blanc", "Noir", "Blanc/Noir", "Crème"],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    badge: "Best Seller",
    rating: 4.9,
    reviewsCount: 267,
  },
  {
    id: "ld-013",
    title: "Derbies Classiques – Noir",
    description:
      "Derbies cuir veau lisse, semelle cuir + patin caoutchouc, montage Blake, forme ronde élégante. Doublure cuir, semelle intérieure cuir. Bureau et cérémonies.",
    department: "look-and-drip",
    category: "Chaussures",
    price: 165,
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Cuir veau, semelle cuir/caoutchouc",
    colors: ["Noir", "Marron foncé", "Cognac"],
    sizes: ["39", "40", "41", "42", "43", "44", "45", "46"],
    rating: 4.8,
    reviewsCount: 87,
  },

  // ==========================================
  // SIGNATURE - Parfums exclusifs, coffrets, personnalisés
  // ==========================================
  {
    id: "sg-001",
    title: "Parfum KFK No.1 – 100ml",
    description:
      "Parfum signature KFK. Notes de tête : bergamote, cardamome, poivre rose. Cœur : iris, violette, géranium. Fond : vétiver, fève tonka, musc, ambre gris. Flacon numéroté 100ml.",
    department: "signature",
    category: "Parfums Signature",
    price: 220,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Verre lourd, atomiseur métal, coffret rigide",
    scentNotes: "Bergamote, Cardamome, Poivre rose, Iris, Violette, Géranium, Vétiver, Fève tonka, Musc, Ambre gris",
    badge: "Flagship",
    isLimitedEdition: true,
    limitedEditionNumber: 100,
    isVipExclusive: true,
    rating: 4.9,
    reviewsCount: 67,
  },
  {
    id: "sg-002",
    title: "Parfum KFK No.2 Nuit – 100ml",
    description:
      "Interprétation nocturne. Notes de tête : poivre noir, bergamote, encens. Cœur : cuir, tabac, bois de santal. Fond : oud, patchouli, vanille, musc. Flacon noir mat numéroté 100ml.",
    department: "signature",
    category: "Parfums Signature",
    price: 260,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Verre noir mat, atomiseur métal noir, coffret rigide",
    scentNotes: "Poivre noir, Bergamote, Encens, Cuir, Tabac, Santal, Oud, Patchouli, Vanille, Musc",
    badge: "Limited Edition",
    isLimitedEdition: true,
    limitedEditionNumber: 50,
    rating: 4.8,
    reviewsCount: 34,
  },
  {
    id: "sg-003",
    title: "Coffret Cadeau Signature",
    description:
      "Coffret luxe : Parfum KFK No.1 (50ml) + Porte-cartes gravé cuir + Carré de soie KFK. Packaging premium aimanté, prêt à offrir. Gravure initiale offerte.",
    department: "signature",
    category: "Coffrets Cadeaux",
    price: 320,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Coffret rigide aimanté, cuir, soie, verre",
    badge: "Gift Ready",
    isVipExclusive: true,
    rating: 4.9,
    reviewsCount: 28,
  },
  {
    id: "sg-004",
    title: "Boutons de Manchette Gravés – Or",
    description:
      "Boutons de manchette argent 925 plaqué or 18k, gravure personnalisée (initiales, date, symbole). Écrin cuir inclus. Fabrication sur commande, délai 10 jours.",
    department: "signature",
    category: "Personnalisés",
    price: 180,
    image: "https://images.unsplash.com/photo-1635767798638-3e2523422c67?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e2523422c67?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Argent 925, plaqué or 18k",
    isVipExclusive: true,
    rating: 4.7,
    reviewsCount: 19,
  },
  {
    id: "sg-005",
    title: "Ceinture Cuir Réversible – Noir/Marron",
    description:
      "Ceinture cuir pleine fleur réversible, boucle aimantée interchangeable argent/brossé. Largeur 3.5cm, longueur 115cm (découpable). 2 couleurs en 1. Coffret cadeau.",
    department: "signature",
    category: "Accessoires Personnalisés",
    price: 95,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    ],
    material: "Cuir pleine fleur, boucle métal brossé",
    colors: ["Noir/Marron", "Noir/Cognac", "Marine/Noir"],
    rating: 4.8,
    reviewsCount: 56,
  },

  // ==========================================
  // PACKS - Looks complets cohérents
  // ==========================================
  {
    id: "pk-001",
    title: "Gentleman Pack",
    description:
      "L'essentiel du gentleman moderne : Pantalon droit noir + Chemise Oxford blanche + Montre minimaliste argent + Parfum Oud 100ml. Valeur 455$ → 365$. Look complet bureau/soirée.",
    department: "packs",
    category: "Packs Looks Complets",
    price: 365,
    oldPrice: 455,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Best Value",
    packItems: [
      "Pantalon Droit – Noir (ld-007)",
      "Chemise Oxford – Blanc (ld-006)",
      "Montre Minimaliste – Argent (ac-001)",
      "Parfum Signature Oud – 100ml (ac-005)",
    ],
    rating: 4.9,
    reviewsCount: 89,
  },
  {
    id: "pk-002",
    title: "Friday Pack",
    description:
      "Pour le vendredi et les cérémonies : Jalabiya classique noir + Parfum Oud 100ml + Montre minimaliste argent. Valeur 405$ → 325$. Tradition et élégance réunies.",
    department: "packs",
    category: "Packs Looks Complets",
    price: 325,
    oldPrice: 405,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Tradition & Luxe",
    packItems: [
      "Jalabiya Classique – Noir (jh-001)",
      "Parfum Signature Oud – 100ml (ac-005)",
      "Montre Minimaliste – Argent (ac-001)",
    ],
    rating: 4.8,
    reviewsCount: 67,
  },
  {
    id: "pk-003",
    title: "Drip Pack",
    description:
      "Style urbain quotidien : Jogging gris chiné + Sneakers minimalistes blanc + Lunettes aviateur doré + Bracelet perles onyx. Valeur 357$ → 285$. Confort et style assurés.",
    department: "packs",
    category: "Packs Looks Complets",
    price: 285,
    oldPrice: 357,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Street Ready",
    packItems: [
      "Jogging Urbain – Gris Chiné (ld-009)",
      "Sneakers Minimalistes – Blanc (ld-012)",
      "Lunettes Aviateur – Doré (ac-003)",
      "Bracelet Perles Naturelles – Onyx (ac-009)",
    ],
    rating: 4.7,
    reviewsCount: 54,
  },
  {
    id: "pk-004",
    title: "Executive Pack",
    description:
      "Power dressing pour leader : Pantalon droit noir + Chemise Oxford blanche + Veste minimaliste noire + Montre chronographe noir + Sacoche bandoulière charbon. Valeur 645$ → 515$.",
    department: "packs",
    category: "Packs Looks Complets",
    price: 515,
    oldPrice: 645,
    discount: "20%",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    ],
    badge: "Power Dressing",
    packItems: [
      "Pantalon Droit – Noir (ld-007)",
      "Chemise Oxford – Blanc (ld-006)",
      "Veste Minimaliste – Noir (ld-010)",
      "Montre Chronographe – Noir (ac-002)",
      "Sacoche Bandoulière – Charbon (ac-011)",
    ],
    rating: 4.9,
    reviewsCount: 41,
  },
];

export const productsData: Product[] = productsInUsd.map((product) => ({
  ...product,
  price: convertUsdToXof(product.price),
  oldPrice:
    product.oldPrice === undefined
      ? undefined
      : convertUsdToXof(product.oldPrice),
}));

// Helper functions
export function getProductsByDepartment(
  department: Product["department"],
): Product[] {
  return productsData.filter((p) => p.department === department);
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getPackProducts(): Product[] {
  return productsData.filter((p) => p.department === "packs");
}

export function getLimitedEditionProducts(): Product[] {
  return productsData.filter((p) => p.isLimitedEdition);
}

export function getVipExclusiveProducts(): Product[] {
  return productsData.filter((p) => p.isVipExclusive);
}

export function getFeaturedProducts(limit = 8): Product[] {
  // Return a mix of best sellers, new, and limited editions
  return productsData
    .filter(
      (p) =>
        p.badge === "Best Seller" || p.badge === "New" || p.isLimitedEdition,
    )
    .slice(0, limit);
}

export function getAllProducts(): Product[] {
  return productsData;
}