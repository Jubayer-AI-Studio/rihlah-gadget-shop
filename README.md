<div align="center">

  <h1>📱 রিহলাহ গ্যাজেট শপ (Rihlah Gadget Shop)</h1>
  <p><b>অরিজিনাল পণ্যে অবিচল আস্থা — Next.js 15 PWA E-Commerce Architecture</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
  [![WhatsApp](https://img.shields.io/badge/Hotline-01580--376861-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/8801580376861)

</div>

---

## 📌 ১. পরিচিতি ও মূল ভিশন (Brand Vision)

- **ব্র্যান্ডের নাম:** রিহলাহ গ্যাজেট শপ (Rihlah Gadget Shop)
- **ট্যাগলাইন:** *অরিজিনাল পণ্যে অবিচল আস্থা*
- **ব্যবসায়িক মডেল:** ১০০% খুচরা বিক্রি (Pure Retail E-Commerce)। কোনো অপ্রয়োজনীয় হোলসেল জটিলতা নেই।
- **হোয়াটসঅ্যাপ হটলাইন:** `+8801580376861` (সরাসরি অর্ডার ও কাস্টমার কেয়ার)
- **ডেলিভারি পলিসি:** সারাদেশে দ্রুততম ক্যাশ অন ডেলিভারি (ঢাকার ভিতরে ৳৭০ / ঢাকার বাইরে ৳১৩০)।

---

## 🏛️ ২. সিস্টেম আর্কিটেকচার ও কাজের ধাপ (HOW IT WORKS — কার্যপদ্ধতির ছক)

নিচের ছকে রিহলাহ গ্যাজেট শপ প্ল্যাটফর্মের প্রতিটি উপাদান কীভাবে কাজ করে এবং ইউজার রিকোয়েস্ট থেকে ক্যাশ-অন-ডেলিভারি অর্ডার ডিসপ্যাচ পর্যন্ত সম্পূর্ণ ইঞ্জিনিয়ারিং ফ্লো তুলে ধরা হলো:

| ধাপ | ব্যবহারকারীর পদক্ষেপ (User Journey) | সিস্টেম কম্পোনেন্ট | প্রসেসিং লজিক ও ডাটাবেস (Prisma ORM) | ফলাফল ও আউটপুট |
| :---: | :--- | :--- | :--- | :--- |
| **০১** | **গ্যাজেট ব্রাউজিং ও ক্যাটাগরি ফিল্টার** | `src/components/CategoryPills.tsx`<br/>`src/components/ProductCard.tsx` | Next.js 15 App Router (`/`) ডাটাবেস থেকে ক্যাটাগরিভিত্তিক গ্যাজেট মেটাডাটা ও হাই-রেজোলিউশন ইমেজ লোড করে। | শূন্য ল্যাগ ও রিয়েল-টাইমে প্রোডাক্ট ফিল্টারিং এবং লাইভ স্টক স্ট্যাটাস ডিসপ্লে। |
| **০২** | **অপটিমিস্টিক কার্ট সংযোজন (Add to Cart)** | `src/components/CartDrawer.tsx`<br/>`src/context/CartContext.tsx` | ক্লায়েন্ট-সাইড রিঅ্যাক্ট স্টেট মেমোইজেশন এবং LocalStorage অফলাইন পারসিস্টেন্স ইঞ্জিন। | পেজ রিলোড ছাড়াই ড্রয়ার ওপেন, সাবটোটাল আপডেট ও আইটেম কাউন্টার অ্যানিমেশন। |
| **০৩** | **ডেলিভারি জোন ও চার্জ ক্যালকুলেশন** | `src/components/MobileBottomNav.tsx`<br/>Checkout Modal Form | ঢাকা মেট্রো (৳৭০) বনাম ঢাকার বাইরে (৳১৩০) ডায়নামিক ডেলিভারি রুলস স্বয়ংক্রিয়ভাবে অ্যাপ্লাই হয়। | তাৎক্ষণিক নেট পেয়েবল অ্যামাউন্ট (Net Payable) ক্যালকুলেশন ও বিলিং সামারি। |
| **০৪** | **ক্যাশ অন ডেলিভারি (COD) ডাটা সিঙ্ক** | `api_backup/orders/route.ts`<br/>`functions/api/orders.ts` | Prisma ORM দিয়ে PostgreSQL-এ অর্ডার ট্রানজ্যাকশন, কাস্টমার ফোন নম্বর ও ডেলিভারি ঠিকানা সেভ। | অনন্য অর্ডার ট্র্যাকিং আইডি জেনারেট এবং ডাটাবেস ইনভেন্টরি স্টেট সিঙ্ক। |
| **০৫** | **হোয়াটসঅ্যাপ ১-ক্লিক অর্ডার ডিসপ্যাচ** | `src/utils/whatsappOrder.ts` | ইউআরএল এনকোডিং দিয়ে কার্টের সব আইটেম, ভেরিয়েন্ট, পরিমাণ, মূল্য ও ঠিকানাসহ প্রি-ফরম্যাটেড মেসেজ প্রস্তুত করে। | রিহলাহ হটলাইনে ১-ট্যাপে সরাসরি ভেরিফাইড অর্ডার প্যাকেট প্রেরণ। |

---

## 🔄 ৩. ফুল-স্ট্যাক ডেটা ফ্লো ডায়াগ্রাম (Data Architecture Diagram)

```
[NEXT.JS 15 CLIENT (PWA MOBILE/DESKTOP)]
                   │
                   ▼ (User Taps 'Add to Cart')
[CART CONTEXT OPTIMISTIC UI ENGINE]
                   │
                   ├──► 1. LocalStorage Persistence (Offline Cart Resilience)
                   │
                   ├──► 2. Dynamic Shipping Engine (Dhaka: ৳70 / Outside: ৳130)
                   │
                   ▼ (User Taps 'Confirm COD Order')
[PRISMA ORM / POSTGRESQL DATA LAYER]
                   │
                   ├──► Order Validation & Stock Decrement
                   │
                   ▼ (1-Click Dispatch Engine)
[WHATSAPP AUTOMATION URL GENERATOR] ──► Formatted Order Delivered to +8801580376861
```

---

## 🛠️ ৪. টেক স্ট্যাক (Tech Stack)

| ডোমেন | প্রযুক্তি |
| :--- | :--- |
| **ফ্রন্টএন্ড ফ্রেমওয়ার্ক** | Next.js 15 (App Router), React 19, TypeScript |
| **ডাটাবেস ও ওআরএম** | PostgreSQL, Prisma ORM (`prisma/schema.prisma`) |
| **স্টেট ম্যানেজমেন্ট** | React Context API (Optimistic UI & LocalStorage Persistence) |
| **স্টাইলিং ও রেসপনসিভনেস** | Tailwind CSS, Mobile-First Navigation Bar |
| **অফলাইন আর্কিটেকচার** | Progressive Web App (PWA), Service Worker Cache (`sw.js`) |

---

## 💻 ৫. লোকাল রান করার নিয়ম (Local Setup)

```bash
# ক্লোন করুন
git clone https://github.com/Jubayer-AI-Studio/rihlah-gadget-shop.git

# প্রজেক্ট ডিরেক্টরিতে যান
cd rihlah-gadget-shop

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# প্রিজমা স্কিমা সিঙ্ক করুন
npx prisma generate
npx prisma db push

# ডেভ সার্ভার চালু করুন
npm run dev
```

ব্রাউজারে `http://localhost:3000` ওপেন করে লাইভ প্রিভিউ দেখুন।

---

<div align="center">
  <b>Architected & Developed by Jubayer Ahmad — Senior Full-Stack Architect</b><br/>
  হটলাইন: <b>01580-376861</b> • <a href="https://github.com/Jubayer-AI-Studio">GitHub প্রোফাইল</a>
</div>
