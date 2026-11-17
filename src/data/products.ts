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
  department: "djalabiya-house" | "accessories" | "look-and-drip" | "signature" | "packs";
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
  fabric?: string; // For djalabiya-house
  material?: string; // For accessories
  size?: string; // For look-and-drip
  scentNotes?: string; // For signature perfumes
  packItems?: string[]; // For packs
}

const productsInUsd: Product[] = [
  // ==========================================
  // DJALABIYA HOUSE
  // ==========================================
  {
    id: "dj-001",
    title: "Royal Boubou - Midnight",
    description: "Hand-embroidered premium cotton boubou with gold-thread detailing. For ceremonies and celebrations.",
    department: "djalabiya-house",
    category: "Boubous",
    price: 280,
    oldPrice: 350,
    discount: "20%",
    image: "/img/products/dj-001.jpg",
    images: ["/img/products/dj-001-1.jpg", "/img/products/dj-001-2.jpg"],
    badge: "Limited Edition",
    isLimitedEdition: true,
    limitedEditionNumber: 50,
    fabric: "Premium Cotton + Gold Thread",
  },
  {
    id: "dj-002",
    title: "Modern Djalabiya - Sand",
    description: "Contemporary cut djalabiya in breathable linen blend. Effortless elegance for daily wear.",
    department: "djalabiya-house",
    category: "Djalabiyas",
    price: 180,
    image: "/img/products/dj-002.jpg",
    images: ["/img/products/dj-002-1.jpg"],
    fabric: "Linen-Cotton Blend",
  },
  {
    id: "dj-003",
    title: "Ceremony Kaftan - Ivory",
    description: "Luxurious silk-blend kaftan with subtle embossed pattern. Wedding and Eid ready.",
    department: "djalabiya-house",
    category: "Kaftans",
    price: 420,
    image: "/img/products/dj-003.jpg",
    images: ["/img/products/dj-003-1.jpg", "/img/products/dj-003-2.jpg"],
    badge: "Signature",
    fabric: "Silk Blend",
    isVipExclusive: true,
  },
  {
    id: "dj-004",
    title: "Heritage Boubou - Navy",
    description: "Classic boubou silhouette in heavyweight cotton. Timeless piece for the modern traditionalist.",
    department: "djalabiya-house",
    category: "Boubous",
    price: 220,
    image: "/img/products/dj-004.jpg",
    images: ["/img/products/dj-004-1.jpg"],
    fabric: "Heavyweight Cotton",
  },

  // ==========================================
  // ACCESSORIES
  // ==========================================
  {
    id: "ac-001",
    title: "KFK Chronograph - Black Gold",
    description: "Swiss movement chronograph with black DLC case, gold accents, and sapphire crystal. 100m water resistance.",
    department: "accessories",
    category: "Watches",
    price: 850,
    image: "/img/products/ac-001.jpg",
    images: ["/img/products/ac-001-1.jpg", "/img/products/ac-001-2.jpg"],
    badge: "Signature",
    material: "316L Stainless Steel, DLC, Gold PVD",
    isVipExclusive: true,
    rating: 4.9,
    reviewsCount: 47,
  },
  {
    id: "ac-002",
    title: "Aviator Sunglasses - Gold Frame",
    description: "Classic aviator silhouette with polarized lenses and 24k gold-plated frame. Includes leather case.",
    department: "accessories",
    category: "Sunglasses",
    price: 280,
    image: "/img/products/ac-002.jpg",
    images: ["/img/products/ac-002-1.jpg"],
    material: "Titanium + 24k Gold Plating",
  },
  {
    id: "ac-003",
    title: "Signature Eau de Parfum - Oud & Amber",
    description: "Woody oriental fragrance. Top: Bergamot, Saffron. Heart: Oud, Rose. Base: Amber, Sandalwood, Musk. 100ml.",
    department: "accessories",
    category: "Perfumes",
    price: 220,
    oldPrice: 260,
    discount: "15%",
    image: "/img/products/ac-003.jpg",
    images: ["/img/products/ac-003-1.jpg"],
    badge: "Best Seller",
    scentNotes: "Bergamot, Saffron, Oud, Rose, Amber, Sandalwood, Musk",
    rating: 4.8,
    reviewsCount: 123,
  },
  {
    id: "ac-004",
    title: "Leather Satchel - Midnight",
    description: "Full-grain Italian leather satchel with gold hardware. Fits 15\" laptop. Hand-stitched in Italy.",
    department: "accessories",
    category: "Bags",
    price: 650,
    image: "/img/products/ac-004.jpg",
    images: ["/img/products/ac-004-1.jpg", "/img/products/ac-004-2.jpg"],
    material: "Full-Grain Italian Leather",
  },
  {
    id: "ac-005",
    title: "Beaded Bracelet Set - Onyx & Gold",
    description: "Stackable 6mm natural onyx beads with 18k gold-plated spacer beads. Set of 3.",
    department: "accessories",
    category: "Jewelry",
    price: 95,
    image: "/img/products/ac-005.jpg",
    images: ["/img/products/ac-005-1.jpg"],
    material: "Natural Onyx, 18k Gold Plated Brass",
  },

  // ==========================================
  // LOOK & DRIP
  // ==========================================
  {
    id: "ld-001",
    title: "Executive Set - Charcoal",
    description: "Tailored wool-blend trousers + crisp cotton shirt. Modern fit, boardroom ready.",
    department: "look-and-drip",
    category: "Sets",
    price: 320,
    image: "/img/products/ld-001.jpg",
    images: ["/img/products/ld-001-1.jpg", "/img/products/ld-001-2.jpg"],
    badge: "Complete Look",
    size: "S-XL",
  },
  {
    id: "ld-002",
    title: "Premium Jogger - Black",
    description: "Heavyweight French terry jogger with tapered fit. Embroidered KFK logo. Everyday luxury.",
    department: "look-and-drip",
    category: "Joggers",
    price: 140,
    image: "/img/products/ld-002.jpg",
    images: ["/img/products/ld-002-1.jpg"],
    size: "XS-XXL",
  },
  {
    id: "ld-003",
    title: "Oxford Shirt - White",
    description: "Premium cotton oxford with mother-of-pearl buttons. Versatile staple for any look.",
    department: "look-and-drip",
    category: "Shirts",
    price: 110,
    image: "/img/products/ld-003.jpg",
    images: ["/img/products/ld-003-1.jpg"],
    size: "S-XXL",
  },
  {
    id: "ld-004",
    title: "Leather Sneakers - Minimal",
    description: "Full-grain leather low-top sneakers. Margom sole. Clean, timeless, all-day comfort.",
    department: "look-and-drip",
    category: "Sneakers",
    price: 280,
    image: "/img/products/ld-004.jpg",
    images: ["/img/products/ld-004-1.jpg", "/img/products/ld-004-2.jpg"],
    badge: "New",
    size: "39-46",
  },
  {
    id: "ld-005",
    title: "Polo Piqué - Navy",
    description: "Long-staple cotton piqué polo. Slim fit, reinforced collar. Elevated casual.",
    department: "look-and-drip",
    category: "Polos",
    price: 95,
    image: "/img/products/ld-005.jpg",
    images: ["/img/products/ld-005-1.jpg"],
    size: "S-XL",
  },

  // ==========================================
  // SIGNATURE
  // ==========================================
  {
    id: "sg-001",
    title: "KFK No. 1 - Signature Parfum",
    description: "The flagship fragrance. Top: Citrus, Cardamom. Heart: Iris, Violet. Base: Vetiver, Tonka, Musk. 100ml. Numbered bottle.",
    department: "signature",
    category: "Signature Perfumes",
    price: 380,
    image: "/img/products/sg-001.jpg",
    images: ["/img/products/sg-001-1.jpg", "/img/products/sg-001-2.jpg"],
    badge: "Flagship",
    isLimitedEdition: true,
    limitedEditionNumber: 100,
    scentNotes: "Citrus, Cardamom, Iris, Violet, Vetiver, Tonka, Musk",
    isVipExclusive: true,
  },
  {
    id: "sg-002",
    title: "KFK No. 2 - Night Edition",
    description: "Darker, deeper interpretation. Top: Black Pepper, Bergamot. Heart: Leather, Tobacco. Base: Oud, Patchouli, Vanilla. 100ml.",
    department: "signature",
    category: "Signature Perfumes",
    price: 420,
    image: "/img/products/sg-002.jpg",
    images: ["/img/products/sg-002-1.jpg"],
    badge: "Limited Edition",
    isLimitedEdition: true,
    limitedEditionNumber: 50,
    scentNotes: "Black Pepper, Bergamot, Leather, Tobacco, Oud, Patchouli, Vanilla",
  },
  {
    id: "sg-003",
    title: "Signature Gift Box",
    description: "Curated luxury gift set: Signature Perfume (50ml), engraved card holder, silk pocket square. Premium packaging.",
    department: "signature",
    category: "Gift Boxes",
    price: 520,
    image: "/img/products/sg-003.jpg",
    images: ["/img/products/sg-003-1.jpg", "/img/products/sg-003-2.jpg"],
    badge: "Gift Ready",
  },
  {
    id: "sg-004",
    title: "Personalized Cufflinks - Gold",
    description: "18k gold-plated sterling silver cufflinks. Custom engraving available (initials, date). Gift box included.",
    department: "signature",
    category: "Personalized",
    price: 350,
    image: "/img/products/sg-004.jpg",
    images: ["/img/products/sg-004-1.jpg"],
    material: "Sterling Silver, 18k Gold Plating",
    isVipExclusive: true,
  },

  // ==========================================
  // PACKS
  // ==========================================
  {
    id: "pk-001",
    title: "Gentleman Pack",
    description: "Trousers + Shirt + Watch + Perfume. The complete ensemble for elegance & success.",
    department: "packs",
    category: "Curated Packs",
    price: 1100,
    oldPrice: 1380,
    discount: "20%",
    image: "/img/products/pk-001.jpg",
    images: ["/img/products/pk-001-1.jpg", "/img/products/pk-001-2.jpg"],
    badge: "Best Value",
    packItems: ["Executive Trousers (Charcoal)", "Oxford Shirt (White)", "KFK Chronograph (Black Gold)", "Signature Eau de Parfum (100ml)"],
    rating: 4.9,
    reviewsCount: 89,
  },
  {
    id: "pk-002",
    title: "Friday Pack",
    description: "Djalabiya + Perfume + Watch. Spirituality & prestige for the holy day and beyond.",
    department: "packs",
    category: "Curated Packs",
    price: 980,
    oldPrice: 1240,
    discount: "21%",
    image: "/img/products/pk-002.jpg",
    images: ["/img/products/pk-002-1.jpg"],
    badge: "Tradition Meets Luxury",
    packItems: ["Modern Djalabiya (Sand)", "Signature Eau de Parfum (100ml)", "KFK Chronograph (Black Gold)"],
    rating: 4.8,
    reviewsCount: 67,
  },
  {
    id: "pk-003",
    title: "Drip Pack",
    description: "Jogger + Sneakers + Sunglasses + Bracelet. Comfort & style for everyday dominance.",
    department: "packs",
    category: "Curated Packs",
    price: 720,
    oldPrice: 895,
    discount: "19%",
    image: "/img/products/pk-003.jpg",
    images: ["/img/products/pk-003-1.jpg", "/img/products/pk-003-2.jpg"],
    badge: "Street Ready",
    packItems: ["Premium Jogger (Black)", "Leather Sneakers (Minimal)", "Aviator Sunglasses (Gold)", "Beaded Bracelet Set (Onyx & Gold)"],
    rating: 4.7,
    reviewsCount: 54,
  },
  {
    id: "pk-004",
    title: "Executive Pack",
    description: "Suit + Watch + Satchel. Class & ambition for the leader who commands every room.",
    department: "packs",
    category: "Curated Packs",
    price: 1850,
    oldPrice: 2280,
    discount: "19%",
    image: "/img/products/pk-004.jpg",
    images: ["/img/products/pk-004-1.jpg", "/img/products/pk-004-2.jpg"],
    badge: "Power Dressing",
    packItems: ["Tailored Wool Suit (Charcoal)", "KFK Chronograph (Black Gold)", "Leather Satchel (Midnight)"],
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
export function getProductsByDepartment(department: Product["department"]): Product[] {
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
    .filter((p) => p.badge === "Best Seller" || p.badge === "New" || p.isLimitedEdition)
    .slice(0, limit);
}

export function getAllProducts(): Product[] {
  return productsData;
}