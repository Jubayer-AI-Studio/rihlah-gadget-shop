<div align="center">

  <h1>📱 রিহলাহ গ্যাজেট শপ (Rihlah Gadget Shop)</h1>
  <p><b>অরিজিনাল পণ্যে অবিচল আস্থা — Next.js 15 PWA E-Commerce Architecture</b></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

</div>

---

## 📌 ১. ভিশন ও পরিচিতি (Brand Vision)

- **ব্র্যান্ডের নাম:** রিহলাহ গ্যাজেট শপ (Rihlah Gadget Shop)
- **ট্যাগলাইন:** *অরিজিনাল পণ্যে অবিচল আস্থা*
- **ব্যবসায়িক মডেল:** ১০০% খুচরা বিক্রি (Pure Retail E-Commerce)।
- **হোয়াটসঅ্যাপ হটলাইন:** `+8801580376861` (Instant Order Support)
- **ডেলিভারি পলিসি:** সারাদেশে ক্যাশ অন ডেলিভারি (ঢাকার ভিতরে ৳৭০ / ঢাকার বাইরে ৳১৩০)।

---

## 🛠️ ২. টেকনিক্যাল আর্কিটেকচার (Full-Stack Architecture)

```
[NEXT.JS 15 CLIENT (PWA)]
           │
           ▼ (Optimistic Cart State / React Server Actions)
[PRISMA ORM DATA LAYER]
           │
           ▼ (Type-Safe SQL Query Pooling)
[POSTGRESQL DATABASE]
           │
           └──► Products, Inventory, Categories & Verified Order Records
```

### মূল সুবিধাসমূহ:
1. **অপটিমিস্টিক কার্ট স্টেট:** কার্টে আইটেম যুক্ত বা পরিবর্তন করলে কোনো রিলোড ছাড়াই ইনস্ট্যান্ট ইউআই আপডেট হয়।
2. **টাইপ-সেফ ডেটাবেস:** Prisma ORM দিয়ে সম্পূর্ণ স্কিমা মডেলিং এবং রিলেশনাল ডেটা কোয়েরি।
3. **PWA অফলাইন সাপোর্ট:** সার্ভিস ওয়ার্কার ক্যাশিংয়ের মাধ্যমে মোবাইল অ্যাপের মতো হোমস্ক্রিন থেকে ইনস্ট্যান্ট ব্যবহারযোগ্য।
4. **১-ক্লিক হোয়াটসঅ্যাপ ডিসপ্যাচ:** কার্টের প্রোডাক্ট সামারি, ঠিকানা ও ডেলিভারি চার্জ স্বয়ংক্রিয়ভাবে হিসাব করে হোয়াটসঅ্যাপে অর্ডার পাঠানো যায়।

---

## 🚀 ৩. লোকাল ডেভেলপমেন্ট সেটআপ

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

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```

---

<div align="center">
  <b>Developed by Jubayer Ahmad — Senior Full-Stack Architect</b>
</div>
