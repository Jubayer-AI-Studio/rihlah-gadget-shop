<div align="center">

  <h1>📱 Rihlah Gadget Shop (রিহলাহ গ্যাজেট শপ)</h1>
  <p><b>Authentic Gadgets & Mobile Accessories — Next.js 15 PWA E-Commerce Architecture</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
  [![Hotline](https://img.shields.io/badge/Hotline-01580--376861-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/8801580376861)

</div>

---

## 📌 1. Platform Vision & Business Model

- **Brand Name:** Rihlah Gadget Shop
- **Core Principle:** Absolute Commitment to Authentic Hardware Products
- **Business Model:** 100% Pure Retail E-Commerce with Zero Wholesale Friction
- **Support Hotline:** `+8801580376861` (Direct WhatsApp Order Dispatch & Customer Care)
- **Courier Logistics:** Nationwide Cash on Delivery (Dhaka Metro: ৳70 / Rest of Bangladesh: ৳130)

---

## 🏛️ 2. Architectural Execution Matrix // How It Works

Below is the structured technical matrix detailing the execution pipeline from gadget discovery to database transaction and courier dispatch:

| Stage | User Interaction & Trigger | System Component | Backend Processing & Prisma ORM Layer | Result & Final Output |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Product Discovery & Category Filtering** | `src/components/CategoryPills.tsx`<br/>`src/components/ProductCard.tsx` | Next.js 15 App Router streams gadget catalog and inventory records from database. | Zero-latency instant category filtering with real-time stock availability indicators. |
| **02** | **Optimistic Cart Mutation (Add to Cart)** | `src/components/CartDrawer.tsx`<br/>`src/context/CartContext.tsx` | Client-side React state memoization combined with LocalStorage offline persistence. | Slide-in drawer opens immediately with updated subtotal and zero network roundtrip lag. |
| **03** | **Regional Delivery Matrix Calculation** | `src/components/MobileBottomNav.tsx`<br/>Checkout Modal Form | Rules engine dynamically applies shipping fees based on selected zone (Dhaka vs Outside). | Computes net payable total with shipping breakdown and invoice summary. |
| **04** | **Cash on Delivery (COD) Sync** | `api_backup/orders/route.ts`<br/>`functions/api/orders.ts` | Prisma Client verifies stock and executes type-safe PostgreSQL relational order transaction. | Generates unique tracking ID and synchronizes database inventory state. |
| **05** | **1-Click WhatsApp Order Routing** | `src/utils/whatsappOrder.ts` | URI encoder formats order item list, variants, price summary, and delivery address. | Dispatches verified order packet directly to the Rihlah hotline (`+8801580376861`). |

---

## 🔄 3. Full-Stack Data Architecture

```
[NEXT.JS 15 CLIENT (PWA MOBILE & DESKTOP)]
                   │
                   ▼ (User Taps 'Add to Cart')
[CART CONTEXT OPTIMISTIC UI ENGINE]
                   │
                   ├──► 1. LocalStorage Persistence (Offline Cart Resilience)
                   │
                   ├──► 2. Dynamic Shipping Engine (Dhaka: ৳70 / Outside: ৳130)
                   │
                   ▼ (User Confirms COD Order)
[PRISMA ORM & POSTGRESQL DATA LAYER]
                   │
                   ├──► Order Ledger Record & Stock Decrement
                   │
                   ▼ (1-Click Dispatch Engine)
[WHATSAPP AUTOMATION URL GENERATOR] ──► Formatted Order Delivered to +8801580376861
```

---

## 🛠️ 4. Technical Architecture

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Database & ORM** | PostgreSQL, Prisma ORM (`prisma/schema.prisma`) |
| **State Management** | React Context API (Optimistic UI & LocalStorage Persistence) |
| **Styling & Responsive Layout** | Tailwind CSS, Mobile-First Bottom Navigation Bar |
| **Offline Architecture** | Progressive Web App (PWA), Service Worker Cache (`public/sw.js`) |

---

## 🚀 5. Local Setup & Execution

```bash
# Clone the repository
git clone https://github.com/Jubayer-AI-Studio/rihlah-gadget-shop.git

# Enter project directory
cd rihlah-gadget-shop

# Install dependencies
npm install

# Push database schema via Prisma
npx prisma generate
npx prisma db push

# Launch development server
npm run dev
```

Visit `http://localhost:3000` to inspect the e-commerce platform.

---

<div align="center">
  <b>Architected & Engineered by Jubayer Ahmad — Senior Full-Stack Architect</b><br/>
  Hotline: <b>+8801580376861</b> • <a href="https://github.com/Jubayer-AI-Studio">GitHub Profile</a>
</div>
