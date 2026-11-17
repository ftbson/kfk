# KFK (KUN FAYA KUN) — Premium Men's Lifestyle Brand

> **THE LIFESTYLE BRAND** — Command Your Destiny

KFK is a premium men's lifestyle brand creating fashion, accessories, fragrances, djalabiyas, and complete looks — from head to toe. Modern, chic, elegant, powerful, minimalist, international.

## 🌍 Brand Identity

| Property | Value |
|----------|-------|
| **Name** | KFK (KUN FAYA KUN) |
| **Baseline** | THE LIFESTYLE BRAND |
| **Slogan** | COMMAND YOUR DESTINY |
| **Tagline** | KFK (KUN FAYA KUN) — From head to toe |
| **Positioning** | Premium men's lifestyle: fashion, accessories, fragrances, djalabiyas, complete looks. Modern, chic, elegant, powerful, minimalist, international. |
| **Colors** | Primary: `#0A0A0A` (Deep Charcoal) · Accent: `#C9A876` (Champagne Gold) · Background: `#FFFFFF` · Text: `#1A1A1A` · Muted: `#6B6B6B` |
| **Target** | Men 25–45, urban, style-conscious, medium-high income, Africa & diaspora, global |
| **Tone** | Confident, minimal, authoritative, aspirational, respectful |
| **Vision** | Short (6m): Launch 4 depts + packs, VIP club, Benin flagship · Medium (18m): Africa boutiques, bespoke, women's capsule · Long (5y): Global flagship stores, KFK fragrance house, lifestyle ecosystem |

## 🏗 Architecture

### Departments (4) + Packs

| Department | ID | Description |
|------------|-----|-------------|
| **Djalabiya House** | `djalabiya-house` | Modern traditional outfits, boubous, djalabiyas, kaftans for ceremonies & celebrations |
| **Accessories** | `accessories` | Watches, sunglasses, perfumes, bracelets, jewelry, bags & satchels |
| **Look & Drip** | `look-and-drip` | Everyday sets, joggers, shirts, trousers, sneakers, shoes, polos |
| **Signature** | `signature` | Exclusive fragrances, limited editions, gift boxes, personalized accessories |

### Packs (4 Curated Complete Looks)

| Pack | Savings | Contents |
|------|---------|----------|
| **Gentleman Pack** | 19% | Trousers + Shirt + Watch + Perfume |
| **Friday Pack** | 20% | Djalabiya + Perfume + Watch |
| **Drip Pack** | 21% | Jogger + Sneakers + Sunglasses + Bracelet |
| **Executive Pack** | 20% | Suit + Watch + Satchel |

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, React 19, TypeScript)
- **Database**: Drizzle ORM + Turso (libSQL)
- **Auth**: Custom HTTP-only cookie-based (NextAuth-style)
- **Styling**: CSS Modules + CSS Variables (design tokens from `siteConfig`)
- **Icons**: Font Awesome 6
- **Images**: Next.js Image + Unsplash placeholders
- **Currency**: USD with `Intl.NumberFormat` (configurable via `siteConfig`)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/              # Admin dashboard (orders, bank details)
│   ├── api/                # API routes (auth, orders, bank-details, admin)
│   ├── categorie/          # Department pages (4 depts)
│   │   ├── djalabiya-house/
│   │   ├── accessories/
│   │   ├── look-and-drip/
│   │   └── signature/
│   ├── packs/              # KFK Packs page
│   ├── vip-club/           # VIP Club landing
│   ├── collections/vip/    # Redirect to /vip-club
│   ├── a-propos/           # About page (vision)
│   ├── contact/            # Contact + FAQ
│   ├── cart/               # Shopping cart + checkout modal
│   ├── favorites/          # Wishlist page
│   ├── account/            # Customer account + orders
│   ├── login/              # Login/Register
│   ├── faq/                # FAQ accordion
│   ├── shipping/           # Shipping policy
│   ├── returns/            # Returns policy
│   ├── terms/              # Terms of Sale
│   ├── legal/              # Privacy, Impressum, Cookies
│   ├── not-found.tsx       # 404 page
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Homepage
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── manifest.ts         # PWA manifest
├── components/             # React components
│   ├── Navbar.tsx          # Header, promo bar, mobile drawer
│   ├── Footer.tsx          # Footer with env-driven socials
│   ├── Hero.tsx            # Department-driven hero slider
│   ├── ShopGrid.tsx        # Filterable/sortable product grid
│   ├── ProductCard.tsx     # Product card with specs
│   ├── Categories.tsx      # Department cards on homepage
│   ├── BestSellers.tsx     # Featured products section
│   ├── WhyUs.tsx           # Service features + stats
│   ├── Testimonials.tsx    # Customer testimonials
│   ├── LegalDocument.tsx   # Legal page wrapper
│   ├── TermsContent.tsx    # Terms of Sale content
│   └── ...
├── config/
│   └── site.ts             # 🎯 CENTRALIZED CONFIG (single source of truth)
├── context/
│   ├── AuthContext.tsx     # Auth state + HTTP-only cookies
│   └── CartContext.tsx     # Cart + Favorites (localStorage)
├── data/
│   └── products.ts         # 20 products across 4 depts + packs
├── lib/
│   ├── auth.ts             # Password hashing, token, cookies
│   ├── db.ts               # Drizzle + Turso client
│   ├── mail.ts             # Nodemailer email service
│   └── schema.ts           # Drizzle schema
└── database/
    ├── schema.sql          # SQL schema
    └── migrations/         # Migration files
```

## ⚙️ Configuration

### Centralized Site Config (`src/config/site.ts`)

**All brand content, SEO, navigation, departments, packs, legal placeholders, currency, and services are defined here.** No hardcoded text in components.

```typescript
// Example: Access anywhere
import { siteConfig, getDepartmentById } from "@/config/site";

siteConfig.brand.name        // "KFK"
siteConfig.brand.baseline    // "THE LIFESTYLE BRAND"
siteConfig.departments       // Array of 4 departments
siteConfig.packs             // Array of 4 packs
siteConfig.currency          // { code: "USD", symbol: "$", locale: "en-US" }
siteConfig.legal             // Placeholders for jurisdiction-specific info
```

### Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` and fill in:

```bash
# Database
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...

# Auth
AUTH_SECRET=... (32-char base64)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=...

# Site
NEXT_PUBLIC_SITE_URL=https://kunfayakun.com

# Email (SMTP)
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASSWORD=...

# Promo Bar (optional)
NEXT_PUBLIC_PROMO_ENABLED=true
NEXT_PUBLIC_PROMO_TEXT="Free shipping over $300"
NEXT_PUBLIC_PROMO_END_DATE=2026-12-31T23:59:59Z

# Socials (Footer)
NEXT_PUBLIC_SOCIAL_INSTAGRAM=https://instagram.com/kunfayakun
NEXT_PUBLIC_SOCIAL_TWITTER=https://twitter.com/kunfayakun
# ... etc

# Legal Placeholders (REQUIRED BEFORE LAUNCH)
NEXT_PUBLIC_COMPANY_NAME="KFK SAS"
NEXT_PUBLIC_COMPANY_REGISTRY="RCCM: XXXX"
NEXT_PUBLIC_COMPANY_TAX_ID="Tax ID: XXXX"
NEXT_PUBLIC_COMPANY_ADDRESS="..."
NEXT_PUBLIC_COMPANY_DIRECTOR="..."
NEXT_PUBLIC_COMPANY_EMAIL="..."
NEXT_PUBLIC_COMPANY_PHONE="..."
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Turso database (free tier available at [turso.tech](https://turso.tech))

### Installation

```bash
# Clone & install
git clone <repo-url>
cd kfk
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Database setup
pnpm db:generate    # Generate migrations
pnpm db:push        # Push schema to Turso
# OR
pnpm db:migrate     # Run migrations

# Development
pnpm dev            # http://localhost:3000
```

### Database Studio
```bash
pnpm db:studio      # Opens Drizzle Studio at http://localhost:4983
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Drizzle migrations |
| `pnpm db:push` | Push schema to database |
| `pnpm db:migrate` | Run pending migrations |
| `pnpm db:studio` | Open Drizzle Studio |

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage (Hero, Categories, Best Sellers, Why Us, Testimonials) |
| `/packs` | KFK Packs (4 curated looks) |
| `/categorie/djalabiya-house` | Djalabiya House department |
| `/categorie/accessories` | Accessories department |
| `/categorie/look-and-drip` | Look & Drip department |
| `/categorie/signature` | Signature department |
| `/vip-club` | VIP Club landing page |
| `/a-propos` | About KFK (vision, timeline) |
| `/contact` | Contact form + FAQ |
| `/cart` | Shopping cart + checkout (bank transfer) |
| `/favorites` | Wishlist |
| `/account` | Customer account + order history |
| `/login` | Login / Register |
| `/faq` | Frequently Asked Questions |
| `/shipping` | Shipping policy |
| `/returns` | Returns policy |
| `/terms` | Terms of Sale |
| `/legal/privacy` | Privacy Policy |
| `/legal/impressum` | Legal Notice (Impressum) |
| `/legal/cookies` | Cookies Policy |
| `/admin` | Admin dashboard (orders, bank details) |

**Legacy redirects (French/German → English):**
- `/panier` → `/cart`
- `/connexion` → `/login`
- `/compte` → `/account`
- `/collections/vip` → `/vip-club`
- `/agb` → `/terms`
- `/legal/versand-retouren` → `/shipping`

## 💳 Checkout Flow

1. Customer fills shipping form (name, address, WhatsApp, email)
2. Order saved to database via `/api/orders`
3. Bank details fetched from `/api/bank-details` (admin-configured)
4. Modal shows IBAN, BIC, beneficiary, amount, order reference
5. Customer transfers via bank — includes order number as reference
6. Admin marks order as "paid" in dashboard
7. Email confirmation sent (via Nodemailer)

**Payment**: Bank transfer only (card payments planned).

## 🔐 Admin Dashboard

- **URL**: `/admin`
- **Login**: `ADMIN_USERNAME` / `ADMIN_PASSWORD_HASH` (bcrypt)
- **Features**:
  - View all orders with customer details, items, totals
  - Update order status: Pending → Paid → Shipped / Cancelled
  - Configure bank details (IBAN, BIC, beneficiary, address)
  - WhatsApp links for customer contact

## 📱 PWA Support

- `manifest.ts` generates `manifest.json`
- Icons in `/public/icons/` (72×72 → 512×512)
- Screenshots in `/public/screenshots/`
- Shortcuts: Packs, Djalabiya House, Accessories, Cart
- Installable on mobile/desktop

## 🔍 SEO & Metadata

- Centralized in `siteConfig.seo`
- `robots.ts` → `/robots.txt`
- `sitemap.ts` → `/sitemap.xml` (static + products + departments)
- Open Graph + Twitter Cards on all pages
- `lang="en"`, `locale="en_US"`
- Canonical URLs via `metadataBase`

## ♿ Accessibility

- Semantic HTML5 (`<main>`, `<header>`, `<nav>`, `<section>`, `<article>`)
- ARIA labels on all icon-only buttons
- Focus-visible outlines
- Color contrast (WCAG AA)
- Keyboard navigation
- `role="dialog"`, `aria-modal` on modals
- `aria-expanded` on accordions

## 🧪 Verification Checklist

Before launch, verify:

```bash
# 1. No German/French/old references remain
grep -rEi "CHF|Schweiz|Mein|Warenkorb|Konto|Anmelden|Bestell|Liefer|Zwischensumme|Gesamtsumme|Kostenlos|Zur.Kasse|Zurück|Weiter.einkaufen|Ausstehend|Bezahlt|Versendet|Storniert|E.Bike|SWISSHOLZ|Kun.Faya.Kun" --include="*.tsx" --include="*.ts" --include="*.css" src/

# 2. All legal pages have [TO BE COMPLETED] placeholders
grep -r "TO BE COMPLETED" src/app/legal/ src/app/shipping/ src/app/returns/ src/app/terms/

# 3. Build passes
pnpm build

# 4. Lint passes
pnpm lint

# 5. Type check
npx tsc --noEmit
```

## 📄 Legal Pages — Placeholders to Complete

All legal pages (`/legal/privacy`, `/legal/impressum`, `/legal/cookies`, `/shipping`, `/returns`, `/terms`) contain `[TO BE COMPLETED]` placeholders for jurisdiction-specific information. **Replace before launch:**

- Company legal name, registry, tax ID
- Registered address, director name
- Contact email/phone for legal notices
- Data Protection Officer details
- Cookie specifics (analytics, marketing providers)
- Shipping carriers, delivery times per region
- Return shipping cost policy (customer/KFK/split)
- Refund timeline (business days)
- Damaged item claim window

## 🎨 Design Tokens (CSS Variables)

Defined in `:root` via `siteConfig.colors` in `layout.tsx`:

```css
--color-primary: #0A0A0A;      /* Deep Charcoal */
--color-accent: #C9A876;       /* Champagne Gold */
--color-background: #FFFFFF;   /* Pure White */
--color-text: #1A1A1A;         /* Near Black */
--color-muted: #6B6B6B;        /* Medium Gray */
--color-border: #E5E5E5;       /* Light Gray */
--color-error: #B71C1C;        /* Deep Red */
--color-success: #1B5E20;      /* Deep Green */
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Add environment variables from `.env.local`
3. Deploy — automatic on push to main

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

Proprietary — All rights reserved. KFK (KUN FAYA KUN) © 2025+

---

**Built with Next.js 16, React 19, TypeScript, Drizzle ORM, Turso, and ❤️ for the culture.**

*Command Your Destiny.*