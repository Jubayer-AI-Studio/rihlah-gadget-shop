const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = [
  {
    id: "jbl-m3-mini-speaker",
    slug: "jbl-m3-mini-portable-bluetooth-speaker",
    name: "JBL M3 / M3-T Mini Portable Bluetooth Speaker",
    tagline: "মেটাল বডির আল্ট্রা-মিনি লাউড সাউন্ড ও TWS স্টেরিও পেয়ারিং!",
    category: "speaker",
    categoryLabel: "ব্লুটুথ স্পিকার",
    originalPrice: 350,
    price: 320,
    badge: "হট ডিল",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 34,
    images: JSON.stringify(["/images/products/jbl-m3-mini-speaker.jpg"]),
    colors: JSON.stringify([
      { name: "মেটালিক ব্লু", code: "#0284C7", image: "/images/products/jbl-m3-mini-speaker.jpg" }
    ]),
    shortDescription: "মেটাল বডির আল্ট্রা-মিনি ব্লুটুথ স্পিকার যা অনায়াসে পকেটে বা হাতের তালুতে নিয়ে ঘোরা যায়। ক্রিস্টাল ক্লিয়ার লাউড সাউন্ড ও TWS পেয়ারিং সুবিধা।",
    fullDescription: JSON.stringify([
      "JBL M3 / M3-T অত্যন্ত ছোট এবং সহজে বহনযোগ্য একটি মিনি ওয়্যারলেস মেটাল স্পিকার।",
      "এতে রয়েছে ব্লুটুথ ৫.০ প্রযুক্তি যা দিয়ে স্মার্টফোন, ল্যাপটপ বা যেকোনো ব্লুটুথ ডিভাইসের সাথে দ্রুত কানেক্ট করা যায়।",
      "TF মেমোরি কার্ড সাপোর্ট রয়েছে এবং দুটি স্পিকারকে একসাথে TWS-এর মাধ্যমে পেয়ার করে ডাবল স্টেরিও সাউন্ড উপভোগ করা সম্ভব।"
    ]),
    keyFeatures: JSON.stringify([
      "প্রিমিয়াম অ্যালুমিনিয়াম মেটাল বডি — পকেট সাইজ আল্ট্রা পোর্টেবল ডিজাইন",
      "ব্লুটুথ ৫.০ টেকনোলজি — ১০ মিটার পর্যন্ত স্টেবল কানেকশন",
      "টিএফ (TF) মেমোরি কার্ড সাপোর্ট — মোবাইল ছাড়াই গান শুনুন",
      "TWS ডুয়েল স্পিকার পেয়ারিং — সিনেমাটিক স্টেরিও সারাউন্ড সাউন্ড",
      "একবার ফুল চার্জে ২ থেকে ৪ ঘণ্টা পর্যন্ত টানা মিউজিক ব্যাকআপ"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "JBL M3 / M3-T Series" },
      { label: "মেটেরিয়াল", value: "Aluminum Alloy Metal Body" },
      { label: "ব্লুটুথ ভার্সন", value: "v5.0" },
      { label: "প্লেব্যাক টাইম", value: "২ থেকে ৪ ঘণ্টা" },
      { label: "ইনপুট ইন্টারফেস", value: "Bluetooth, TF Card, Micro USB" },
      { label: "চার্জিং সময়", value: "১.৫ ঘণ্টা" }
    ]),
    warranty: "৭ দিনের ক্যাশ-ব্যাক বা রিপ্লেসমেন্ট সুবিধা"
  },
  {
    id: "y80-ultra-smartwatch",
    slug: "y80-ultra-smartwatch-8-in-1-straps",
    name: "Y80 Ultra (8+1) স্মার্টওয়াচ গিফট প্যাকেজ",
    tagline: "৮টি ভিন্ন আকর্ষণীয় স্ট্র্যাপ ও ১টি ফ্রি প্রোটেক্টিভ বাম্পার কেস!",
    category: "smartwatch",
    categoryLabel: "স্মার্টওয়াচ",
    originalPrice: 950,
    price: 850,
    badge: "মেগা অফার",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    images: JSON.stringify([
      "/images/products/y80-ultra-box.jpg",
      "/images/products/y80-ultra-orange.jpg",
      "/images/products/y80-ultra-silver.jpg"
    ]),
    colors: JSON.stringify([
      { name: "কমলা ওশান স্ট্র্যাপ", code: "#EA580C", image: "/images/products/y80-ultra-orange.jpg" },
      { name: "মেটালিক সিলভার চেইন", code: "#94A3B8", image: "/images/products/y80-ultra-silver.jpg" }
    ]),
    shortDescription: "কম বাজেটে প্রিমিয়াম অ্যাপল ওয়াচ আল্ট্রা লুকের সম্পূর্ণ গিফট প্যাকেজ। সাথে পাচ্ছেন ৮টি বিভিন্ন ডিজাইনের ইন্টারচেঞ্জেবল স্ট্র্যাপ ও ফ্রি কেস।",
    fullDescription: JSON.stringify([
      "Y80 Ultra (8+1) স্মার্টওয়াচ বর্তমান তরুণ প্রজন্মের মাঝে অত্যন্ত জনপ্রিয় একটি গ্যাজেট প্যাকেজ।",
      "এর সবচেয়ে বড় আকর্ষণ হলো বক্সের সাথে থাকা ৮টি ভিন্ন ডিজাইনের স্ট্র্যাপ (সিলিকন, ফ্যাব্রিক ও মেটাল চেইন) যা আপনার প্রতিদিনের পোশাকের সাথে ম্যাচ করে পরিবর্তন করতে পারবেন।",
      "ঘড়ি থেকেই সরাসরি ব্লুটুথ কলিং করা এবং রিসিভ করা যায়, সাথে রয়েছে ওয়্যারলেস চার্জিং ও হেলথ ট্র্যাকিং ফিচার।"
    ]),
    keyFeatures: JSON.stringify([
      "২.০২ ইঞ্চি IPS এইচডি টাচ স্ক্রিন ডিসপ্লে (২৪০x২৮৪ রেজোলিউশন)",
      "৮টি ভিন্ন কালার ও ডিজাইনের স্ট্র্যাপ + ১টি ফ্রি প্রোটেক্টিভ কভার",
      "ব্লুটুথ ৫.০ কলিং — ঘড়ি থেকেই কথা বলুন ও কল রিসিভ করুন",
      "২৪০ mAh ব্যাটারি ও সহজে ম্যাগনেটিক ওয়্যারলেস চার্জিং",
      "হার্ট রেট, ব্লাড প্রেসার, স্লিপ ট্র্যাকিং ও মাল্টি-স্পোর্টস মোড",
      "স্মার্ট নোটিফিকেশন ও অ্যালার্ম অ্যালার্ট"
    ]),
    specs: JSON.stringify([
      { label: "ডিসপ্লে", value: "2.02 inch IPS Touch Display" },
      { label: "ব্যাটারি ব্যাকআপ", value: "১ থেকে ৩ দিন" },
      { label: "চার্জিং টাইপ", value: "Wireless Magnetic Charging" },
      { label: "কানেক্টিভিটি", value: "Bluetooth 5.0 (Android & iOS)" },
      { label: "স্ট্র্যাপ সংখ্যা", value: "৮টি ভিন্ন প্রিমিয়াম স্ট্র্যাপ" },
      { label: "ওয়াটার রেজিস্ট্যান্স", value: "Splash Proof" }
    ]),
    warranty: "৭ দিনের চেক-ইন ওয়ারেন্টি"
  },
  {
    id: "stn-28-cat-ear-headphone",
    slug: "stn-28-wireless-rgb-cat-ear-headphone",
    name: "STN-28 Wireless Cat Ear RGB হেডফোন",
    tagline: "কিউট বিড়ালের কান ও থাবার মাল্টিকালার RGB LED লাইটিং!",
    category: "headphone",
    categoryLabel: "হেডফোন ও অডিও",
    originalPrice: 650,
    price: 600,
    badge: "ভাইরাল ট্রেন্ড",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 41,
    images: JSON.stringify([
      "/images/products/cat-ear-pink.jpg",
      "/images/products/cat-ear-green.jpg",
      "/images/products/cat-ear-purple.jpg",
      "/images/products/cat-ear-blue.jpg"
    ]),
    colors: JSON.stringify([
      { name: "গোলাপি (Pink)", code: "#F472B6", image: "/images/products/cat-ear-pink.jpg" },
      { name: "মিন্ট গ্রিন (Mint Green)", code: "#4ADE80", image: "/images/products/cat-ear-green.jpg" },
      { name: "ল্যাভেন্ডার পার্পল (Purple)", code: "#A855F7", image: "/images/products/cat-ear-purple.jpg" },
      { name: "স্কাই ব্লু (Blue)", code: "#38BDF8", image: "/images/products/cat-ear-blue.jpg" }
    ]),
    shortDescription: "শিশু, কিশোরী ও কিউট গ্যাজেট প্রেমীদের প্রথম পছন্দ STN-28 ওয়্যারলেস ক্যাট ইয়ার হেডফোন। গান শোনা, অনলাইন ক্লাস কিংবা গেম খেলায় চমৎকার সাউন্ড ও ঝলমলে RGB লাইট।",
    fullDescription: JSON.stringify([
      "স্টাইল, সাউন্ড আর কিউটনেসের সেরা কম্বো নিয়ে এলো STN-28 Wireless Cat Ear Headphone।",
      "মাথায় বিড়ালের কান এবং কানের পাশে কিউট থাবার ডিজাইনে জ্বলবে ঝলমলে আরজিবি এলইডি লাইট।",
      "সফট কুশন ইয়ারপ্যাড দীর্ঘক্ষণ ব্যবহারে কান ব্যথা হতে দেয় না এবং ফোল্ডেবল ডিজাইন হওয়ায় সহজেই ব্যাগে বহনযোগ্য।"
    ]),
    keyFeatures: JSON.stringify([
      "আকর্ষণীয় Cat Ear & Paw ডিজাইনে ডাইনামিক RGB LED লাইটিং",
      "ব্লুটুথ ৫.০ কানেক্টিভিটি — মোবাইল, ট্যাব ও ল্যাপটপে সাপোর্ট",
      "মাল্টিপল মোড: ব্লুটুথ + TF মেমোরি কার্ড + ৩.৫ মিমি AUX কেবল",
      "বিল্ট-ইন এইচডি মাইক্রোফোন — গেম ও অনলাইন ক্লাসের জন্য দারুণ",
      "নরম মেমরি ফোম ইয়ারপ্যাড ও সহজে ভাঁজ করে বহনের সুবিধা"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "STN-28 Wireless Cat Ear" },
      { label: "ব্লুটুথ ভার্সন", value: "v5.0" },
      { label: "ব্যাটারি লাইফ", value: "৬ থেকে ৮ ঘণ্টা" },
      { label: "চার্জিং পোর্ট", value: "Micro-USB" },
      { label: "ফ্রিকোয়েন্সি রেসপন্স", value: "20Hz - 20kHz" }
    ]),
    warranty: "৭ দিনের রিপ্লেসমেন্ট সুবিধা"
  },
  {
    id: "unigar-ar-royal-wireless-neckband",
    slug: "unigar-ar-royal-350h-anc-wireless-neckband",
    name: "Unigar 350H Sports Wireless Neckband (Model: Ar-Royal)",
    tagline: "সুপার ANC নয়েজ রিডাকশন, ভয়েস চেঞ্জ ও ৩৫০ ঘণ্টা ব্যাকআপ!",
    category: "headphone",
    categoryLabel: "ওয়্যারলেস নেকব্যান্ড",
    originalPrice: 700,
    price: 650,
    badge: "Super ANC",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 68,
    images: JSON.stringify(["/images/products/unigar-ar-royal.jpg"]),
    colors: JSON.stringify([
      { name: "টাইটানিয়াম মেটালিক গ্রে", code: "#334155", image: "/images/products/unigar-ar-royal.jpg" }
    ]),
    shortDescription: "অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC) সমৃদ্ধ ১০০% অরিজিনাল Unigar Ar-Royal নেকব্যান্ড। এতে আছে ৩৫০ ঘণ্টার বিশাল ব্যাকআপ ও মজাদার ভয়েস চেঞ্জ ফিচার।",
    fullDescription: JSON.stringify([
      "রাস্তাঘাটের কোলাহল ভুলে নিখুঁত নিস্তব্ধ মিউজিক উপভোগ করতে Unigar 350H Ar-Royal নেকব্যান্ড সেরা পছন্দ।",
      "এর এক্টিভ নয়েজ ক্যান্সেলেশন (ANC) চারপাশের অযাচিত শব্দ দূর করে ক্রিস্টাল ক্লিয়ার কলিং নিশ্চিত করে।",
      "কথা বলার সময় নিজের গলার আওয়াজ পরিবর্তন করে বন্ধুদের চমকে দেওয়ার জন্য রয়েছে স্পেশাল ভয়েস চেঞ্জ অপশন।"
    ]),
    keyFeatures: JSON.stringify([
      "Super ANC (Active Noise Cancellation) ডিপ নয়েজ ব্লকিং",
      "ভয়েস চেঞ্জ ফিচার — কলে বন্ধুদের সাথে ফান ভয়েসে কথা বলুন",
      "৩৫০ ঘণ্টা স্ট্যান্ডবাই ব্যাকআপ টাইম",
      "এইচডি সাউন্ড মাইক্রোফোন — মিটিং ও কলে জিরো নয়েজ",
      "সোয়েট-রেসিস্ট্যান্ট স্পোর্টস ডিজাইন — জিমে ও দৌড়ে পারফেক্ট গ্রিপ",
      "১০০% অথেনটিক Unigar প্রিমিয়াম কোয়ালিটি"
    ]),
    specs: JSON.stringify([
      { label: "ব্র্যান্ড", value: "Unigar (100% Authentic)" },
      { label: "মডেল", value: "Ar-Royal (Super ANC)" },
      { label: "স্ট্যান্ডবাই ব্যাকআপ", value: "৩৫০ ঘণ্টা" },
      { label: "চার্জিং পোর্ট", value: "Type-C Fast Charging" },
      { label: "ওয়াটারপ্রুফ রেটিং", value: "IPX5 Sweat Resistant" }
    ]),
    warranty: "৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি"
  },
  {
    id: "unigar-ar-riff-wireless-neckband",
    slug: "unigar-ar-riff-80h-wireless-neckband",
    name: "Unigar - Ar Riff Wireless Neckband",
    tagline: "৫টি ভয়েস চেঞ্জার ম্যাজিক ও ৮০ ঘণ্টা টানা মিউজিক ব্যাকআপ!",
    category: "headphone",
    categoryLabel: "ওয়্যারলেস নেকব্যান্ড",
    originalPrice: 550,
    price: 450,
    badge: "ধামাকা অফার",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 77,
    images: JSON.stringify(["/images/products/unigar-ar-riff.jpg"]),
    colors: JSON.stringify([
      { name: "ম্যাট ব্ল্যাক", code: "#18181B", image: "/images/products/unigar-ar-riff.jpg" }
    ]),
    shortDescription: "৮০ ঘণ্টা মিউজিক টাইম, ৪০০ ঘণ্টা স্ট্যান্ডবাই ও ৫টি ম্যাজিক ভয়েস চেঞ্জার ইফেক্ট সমৃদ্ধ প্রিমিয়াম Unigar Ar-Riff নেকব্যান্ড।",
    fullDescription: JSON.stringify([
      "বাজারে এসেছে Unigar-এর বহুল প্রতীক্ষিত ধামাকা গ্যাজেট Unigar Ar-Riff Wireless Neckband।",
      "এতে রয়েছে ৫টি ম্যাজিক ভয়েস চেঞ্জার — Original, Male, Female, Child এবং Robot Voice। এক ক্লিকেই বদলে দিন নিজের গলার কণ্ঠস্বর।",
      "বিশাল ব্যাটারি ক্যাপাসিটির কারণে একবার ফুল চার্জে টানা ৮০ ঘণ্টা মিউজিক উপভোগ করতে পারবেন।"
    ]),
    keyFeatures: JSON.stringify([
      "৫টি ভয়েস চেঞ্জার ম্যাজিক (Original, Male, Female, Child, Robot Voice)",
      "বিশাল ব্যাটারি — ৮০ ঘণ্টা মিউজিক টাইম ও ৪০০ ঘণ্টা স্ট্যান্ডবাই",
      "লেটেস্ট ব্লুটুথ ৫.৫ কানেক্টিভিটি — দ্রুত ও নিরবচ্ছিন্ন অডিও",
      "Super ENC নয়েজ রিডাকশন — ক্রিস্টাল ক্লিয়ার কল কোয়ালিটি",
      "ম্যাগনেটিক ইয়ারবাডস ও আল্ট্রা-সফট ফ্লেক্সিবল ব্যান্ড"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "Unigar Ar-RIFF" },
      { label: "ব্লুটুথ ভার্সন", value: "v5.5" },
      { label: "মিউজিক ব্যাকআপ", value: "৮০ ঘণ্টা" },
      { label: "স্ট্যান্ডবাই", value: "৪০০ ঘণ্টা" },
      { label: "চার্জিং টাইপ", value: "Type-C" },
      { label: "নয়েজ ক্যান্সেলিং", value: "Super ENC" }
    ]),
    warranty: "৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি"
  },
  {
    id: "business-s209-wireless-headset",
    slug: "business-s209-single-ear-wireless-headset",
    name: "Business Super Star Wireless Headset S209",
    tagline: "২৭০° রোটেটেবল ইয়ারহুক ও একটানা ৮ ঘণ্টা অফিসিয়াল কলিং!",
    category: "headphone",
    categoryLabel: "বিজনেস হেডসেট",
    originalPrice: 500,
    price: 450,
    badge: "ড্রাইভারস চয়েস",
    isFeatured: false,
    isBestSeller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    images: JSON.stringify(["/images/products/business-s209.jpg"]),
    colors: JSON.stringify([
      { name: "কর্পোরেট ব্ল্যাক", code: "#09090B", image: "/images/products/business-s209.jpg" }
    ]),
    shortDescription: "ড্রাইভিং বা একটানা জরুরি অফিশিয়াল মিটিংয়ে কান ব্যথামুক্ত নিরবচ্ছিন্ন কথা বলার জন্য ২৭০ ডিগ্রি রোটেটেবল বিজনেস ব্লুটুথ হেডসেট S209।",
    fullDescription: JSON.stringify([
      "গাড়ি চালানো, একটানা মিটিং বা দীর্ঘক্ষণ জরুরি কলে কথা বলার জন্য এটি এক সেরা সমাধান।",
      "ডান কান নাকি বাম কান? ২৭০° রোটেটেবল ইয়ারহুক ফ্লিপ করে ইচ্ছামতো যেকোনো কানে পরতে পারবেন।",
      "অ্যাডভান্সড ব্লুটুথ ৫.০ ও ইন্টেলিজেন্ট নয়েজ রিডাকশন বাইরের অনাকাঙ্ক্ষিত শব্দ প্রতিরোধ করে স্পষ্ট কথা বলা নিশ্চিত করে।"
    ]),
    keyFeatures: JSON.stringify([
      "২৭০° রোটেটেবল ইয়ারহুক — ডান বা বাম যেকোনো কানে পরার স্বাধীনতা",
      "অ্যাডভান্সড ব্লুটুথ ৫.০ (Bluetooth V5.0) কানেকশন",
      "HD সাউন্ড ও ইন্টেলিজেন্ট নয়েজ রিডাকশন মাইক্রোফোন",
      "৮ ঘণ্টার পাওয়ারফুল ব্যাটারি ব্যাকআপ টাইম",
      "রাইডার, ড্রাইভার, ফ্রিল্যান্সার ও কর্পোরেট প্রফেশনালদের জন্য সেরা"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "Business S209 V5.0+EDR" },
      { label: "ব্যাটারি টাইম", value: "টানা ৮ ঘণ্টা টকটাইম" },
      { label: "ফিচার", value: "Caller Name Report, Voice Control Answer" },
      { label: "ওজন", value: "মাত্র ১২ গ্রাম (আল্ট্রা লাইট)" }
    ]),
    warranty: "৭ দিনের চেকিং ওয়ারেন্টি"
  },
  {
    id: "gts-2385-karaoke-speaker",
    slug: "gts-2385-portable-bluetooth-karaoke-speaker",
    name: "GTS-2385 Portable Bluetooth Karaoke Speaker (+2 Mic)",
    tagline: "৮ ইঞ্চি মেগা বাস স্পিকার, ট্রলি ডিজাইন ও ২টি ফ্রি ওয়্যারলেস মাইক!",
    category: "speaker",
    categoryLabel: "কারাওকে সাউন্ড",
    originalPrice: 2400,
    price: 2000,
    badge: "মেগা পার্টি সাউন্ড",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 46,
    images: JSON.stringify(["/images/products/gts-2385-speaker.jpg"]),
    colors: JSON.stringify([
      { name: "পার্টি ব্ল্যাক RGB", code: "#18181B", image: "/images/products/gts-2385-speaker.jpg" }
    ]),
    shortDescription: "বাড়ির পার্টি, পিকনিক বা আউটডোর আয়োজনে গানের আড্ডা জমাতে ৮ ইঞ্চি শক্তিশালী ড্রাইভের ট্রলি কারাওকে স্পিকার। সাথে ২টি ফ্রি ওয়্যারলেস মাইক!",
    fullDescription: JSON.stringify([
      "ঘরোয়া অনুষ্ঠান, পিকনিক কিংবা বন্ধুদের আড্ডায় চমৎকার সাউন্ড আর দুর্দান্ত কারাওকে অভিজ্ঞতার জন্য GTS-2385 বেস্ট চয়েস।",
      "সহজে বহনযোগ্য ট্রলি ডিজাইন এবং আকর্ষণীয় আরজিবি এলইডি লাইট ঘরের পরিবেশ মুহূর্তেই পার্টির মতো করে তোলে।",
      "বক্সের সাথে ২টি ফ্রি ওয়্যারলেস মাইক্রোফোন থাকায় তারের ঝামেলা ছাড়াই একসাথে দুইজন গান গাইতে পারবেন।"
    ]),
    keyFeatures: JSON.stringify([
      "৮ ইঞ্চি শক্তিশালী স্পিকার ড্রাইভার — গভীর ডিপ বেস ও ক্রিস্টাল সাউন্ড",
      "২টি ফ্রি ওয়্যারলেস মাইক্রোফোন — দ্বৈত কারাওকে ডুয়েট গান",
      "ডাইনামিক RGB LED লাইটিং প্যানেল",
      "সহজে টেনে নেওয়ার জন্য ট্রলি ও মজবুত হাতল ডিজাইন",
      "ব্লুটুথ, পেনড্রাইভ (USB), TF মেমোরি কার্ড ও AUX ইনপুট সাপোর্ট",
      "বিল্ট-ইন রিচার্জেবল ব্যাটারি — কারেন্ট ছাড়াই দীর্ঘক্ষণ ব্যাকআপ"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "GTS-2385 (Greenice)" },
      { label: "ড্রাইভার সাইজ", value: "8 inch High-Power Woofer" },
      { label: "মাইক", value: "2x Wireless UHF Microphones" },
      { label: "কানেক্টিভিটি", value: "Bluetooth, USB, TF, AUX, FM Radio" },
      { label: "ব্যাটারি", value: "High Capacity Rechargeable Li-ion" }
    ]),
    warranty: "১৫ দিনের সার্ভিস গ্যারান্টি"
  },
  {
    id: "vlogger-series-ring-light",
    slug: "vlogger-series-led-ring-light-tripod-stand",
    name: "Vlogger Series LED Ring Light (with Tripod Stand)",
    tagline: "১০ ব্রাইটনেস লেভেল, ৩ লাইট মোড ও ফ্লেক্সিবল ট্রাইপড স্ট্যান্ড!",
    category: "accessories",
    categoryLabel: "ভ্লগিং ও লাইটিং",
    originalPrice: 950,
    price: 850,
    badge: "ক্রিয়েটরস চয়েস",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 38,
    images: JSON.stringify(["/images/products/vlogger-ring-light.jpg"]),
    colors: JSON.stringify([
      { name: "প্রো ব্ল্যাক", code: "#09090B", image: "/images/products/vlogger-ring-light.jpg" }
    ]),
    shortDescription: "ভিডিও মেকিং, ইউটিউব ভ্লগিং, টিকটক/রিলস, মেকআপ ও প্রোডাক্ট ফটোগ্রাফিতে পারফেক্ট আলো দিতে প্রফেশনাল LED রিং লাইট ও ট্রাইপড কম্বো।",
    fullDescription: JSON.stringify([
      "আপনার কনটেন্টকে দিন নিখুঁত ও প্রফেশনাল টাচ! Vlogger Series LED Ring Light নিয়ে আসুন আপনার ভিডিও ও ছবিতে পারফেক্ট লাইটিং।",
      "এতে রয়েছে ১০টি ব্রাইটনেস লেভেল এবং ৩টি লাইট মোড (Warm, Soft, White) যা যেকোনো পরিবেশে নিখুঁত স্কিনটোন ফুটিয়ে তোলে।",
      "সাথে ফ্লেক্সিবল Gooseneck মোবাইল হোল্ডার ও মেটাল ট্রাইপড স্ট্যান্ড থাকায় ক্যামেরা যেকোনো অ্যাঙ্গেলে সহজে সেট করা যায়।"
    ]),
    keyFeatures: JSON.stringify([
      "ডিমেবল LED রিং লাইট — ১০টি ব্রাইটনেস লেভেল নিয়ন্ত্রণ",
      "৩টি লাইট মোড: Warm, Soft (White + Warm), Pure White",
      "ফ্লেক্সিবল Gooseneck মোবাইল হোল্ডার — ৩৬০ ডিগ্রি রোটেট",
      "কমপ্যাক্ট ট্রাইপড স্ট্যান্ড ও বল হেড মাউন্ট",
      "USB পাওয়ার চালিত — মোবাইল চার্জার ও পাওয়ার ব্যাংকেও চলবে",
      "রিলস, মেকআপ, লাইভ স্ট্রিমিং ও প্রোডাক্ট ছবির জন্য সেরা"
    ]),
    specs: JSON.stringify([
      { label: "আইটেম", value: "Vlogger Series Ring Light" },
      { label: "লাইট মোড", value: "3 Color Lighting Modes" },
      { label: "ব্রাইটনেস", value: "10 Levels Adjustable" },
      { label: "পাওয়ার", value: "USB 5V/2A" },
      { label: "ট্রাইপড ম্যাটেরিয়াল", value: "Reinforced Alloy Metal" }
    ]),
    warranty: "চেকিং রিপ্লেসমেন্ট ওয়ারেন্টি"
  },
  {
    id: "kbroad-kts-1943-karaoke-speaker",
    slug: "kbroad-kts-1943-portable-karaoke-speaker-mic",
    name: "KBroad KTS-1943 পোর্টেবল ব্লুটুথ কারাওকে স্পিকার",
    tagline: "হ্যান্ডহেল্ড কারাওকে মাইক, আধুনিক ফ্রন্ট গ্রিল ও লাউড সাউন্ড!",
    category: "speaker",
    categoryLabel: "ব্লুটুথ স্পিকার",
    originalPrice: 700,
    price: 650,
    badge: "সাশ্রয়ী কারাওকে",
    isFeatured: false,
    isBestSeller: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 31,
    images: JSON.stringify(["/images/products/kbroad-kts-1943.jpg"]),
    colors: JSON.stringify([
      { name: "ব্ল্যাক গ্রিল", code: "#18181B", image: "/images/products/kbroad-kts-1943.jpg" },
      { name: "রেড গ্রিল", code: "#DC2626", image: "/images/products/kbroad-kts-1943.jpg" },
      { name: "ব্লু গ্রিল", code: "#2563EB", image: "/images/products/kbroad-kts-1943.jpg" },
      { name: "গ্রিন গ্রিল", code: "#16A34A", image: "/images/products/kbroad-kts-1943.jpg" }
    ]),
    shortDescription: "সাশ্রয়ী বাজেটের মধ্যে চমৎকার মিনি সাউন্ড সিস্টেম। বক্সের সাথেই রয়েছে একটি হ্যান্ডহেল্ড মাইক্রোফোন ও ৩ ইঞ্চি শক্তিশালী ড্রাইভার।",
    fullDescription: JSON.stringify([
      "ছোটখাটো আড্ডা আর ঘরোয়া পার্টির পারফেক্ট সঙ্গী KBroad KTS-1943 পোর্টেবল ব্লুটুথ কারাওকে স্পিকার।",
      "৩ ইঞ্চির শক্তিশালী ড্রাইভার সাইজে ছোট হলেও ছোটখাটো রুমের জন্য বেশ লাউড এবং ক্লিয়ার সাউন্ড প্রদান করে।",
      "ওপরের হ্যান্ডেল বা হাতল দিয়ে যেকোনো জায়গায় সহজে বহন করা যায় এবং রিচার্জেবল ব্যাটারি থাকায় কারেন্ট ছাড়াই চালানো যায়।"
    ]),
    keyFeatures: JSON.stringify([
      "বক্সের সাথেই ফ্রি হ্যান্ডহেল্ড কারাওকে মাইক্রোফোন",
      "৩ ইঞ্চির শক্তিশালী সাউন্ড ড্রাইভার — রুমের জন্য লাউড ও ক্লিয়ার",
      "ব্লুটুথ, পেনড্রাইভ (USB) এবং মেমোরি কার্ড (TF) সাপোর্ট",
      "রিচার্জেবল বিল্ট-ইন ব্যাটারি — ফুল চার্জে তারের ঝামেলা নেই",
      "সহজে বহনযোগ্য হাতল ও আকর্ষণীয় আধুনিক ফ্রন্ট গ্রিল ডিজাইন"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "KBroad KTS-1943" },
      { label: "ড্রাইভার সাইজ", value: "3 Inch Audio Driver" },
      { label: "কানেকশন", value: "Bluetooth, USB Pendrive, TF Card" },
      { label: "মাইক", value: "1x Handheld Wired Microphone" },
      { label: "ব্যাটারি", value: "Built-in Rechargeable" }
    ]),
    warranty: "৭ দিনের চেকিং ওয়ারেন্টি"
  },
  {
    id: "tagg-verve-max-buzz-smartwatch",
    slug: "tagg-verve-max-buzz-bluetooth-calling-smartwatch",
    name: "TAGG Verve Max Buzz স্মার্টওয়াচ (১.৮১\" HD ডিসপ্লে)",
    tagline: "৫০০ নিটস ব্রাইটনেস, স্মার্ট ব্লুটুথ কলিং ও ১২০+ স্পোর্টস মোড!",
    category: "smartwatch",
    categoryLabel: "স্মার্টওয়াচ",
    originalPrice: 1250,
    price: 1150,
    badge: "প্রিমিয়াম চয়েস",
    isFeatured: true,
    isBestSeller: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    images: JSON.stringify([
      "/images/products/tagg-smartwatch-silver.jpg",
      "/images/products/tagg-smartwatch-gold.jpg"
    ]),
    colors: JSON.stringify([
      { name: "সিলভার / হোয়াইট", code: "#E2E8F0", image: "/images/products/tagg-smartwatch-silver.jpg" },
      { name: "রোজ গোল্ড / বেজ", code: "#E0B094", image: "/images/products/tagg-smartwatch-gold.jpg" }
    ]),
    shortDescription: "কম বাজেটে সব প্রিমিয়াম ফিচারের ফ্ল্যাগশিপ লুক। ১.৮১ ইঞ্চি ৫০0 নিটস ব্রাইটনেস ডিসপ্লে, সরাসরি ব্লুটুথ কলিং, SpO2 ও হার্ট রেট ট্র্যাকিং।",
    fullDescription: JSON.stringify([
      "ঘড়ি শুধু সময় দেখার জন্য? ওসব দিন শেষ! এখন কবজিতে থাকবে আস্ত একটা গ্যাজেট লাইফস্টাইল TAGG Verve Max Buzz স্মার্টওয়াচে।",
      "তীব্র রোদেও ডিসপ্লে দেখতে কোনো ঝক্কি পোহাতে হবে না এর ৫০০ নিটস ব্রাইটনেসের কারণে।",
      "পকেট থেকে ফোন বের করা ছাড়াই সরাসরি ঘড়ি থেকেই কল করুন ও রিসিভ করুন এবং রয়েছে ১৫০টিরও বেশি কাস্টম ওয়াচ ফেস।"
    ]),
    keyFeatures: JSON.stringify([
      "১.৮১ ইঞ্চি জায়ান্ট এইচডি ডিসপ্লে — ৫০০ নিটস পিক ব্রাইটনেস",
      "ঝড়ের গতিতে ব্লুটুথ কলিং ও স্মার্ট ভয়েস অ্যাসিস্ট্যান্ট ব্যাকআপ",
      "২৪ ঘণ্টা রিয়েল-টাইম হার্ট রেট, SpO2 রক্তে অক্সিজেন ও স্লিপ সেন্সর",
      "১২০টিরও বেশি স্পোর্টস মোড — প্রতিটা স্টেপ আর ক্যালোরি কাউন্ট",
      "১৫০টিরও বেশি কাস্টম ওয়াচ ফেস — প্রতিদিন দিন নতুন লুক"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "TAGG Verve Max Buzz" },
      { label: "ডিসপ্লে", value: "1.81 inch HD (500 Nits Brightness)" },
      { label: "কলিং", value: "Bluetooth HD Calling with Speaker & Mic" },
      { label: "হেলথ সেন্সর", value: "Heart Rate, SpO2, Sleep Monitor" },
      { label: "স্পোর্টস মোড", value: "120+ Dedicated Modes" }
    ]),
    warranty: "৭ দিনের রিপ্লেসমেন্ট"
  },
  {
    id: "p47-wireless-headphone",
    slug: "p47-wireless-bluetooth-headphone",
    name: "P47 Wireless Bluetooth Headphone",
    tagline: "ওয়্যারলেস ও অক্স ডুয়েল সুবিধা, মেমোরি কার্ড স্লট ও এফএম রেডিও!",
    category: "headphone",
    categoryLabel: "হেডফোন ও অডিও",
    originalPrice: 350,
    price: 320,
    badge: "পানির দামে অফার",
    isFeatured: false,
    isBestSeller: true,
    inStock: true,
    rating: 4.7,
    reviewsCount: 95,
    images: JSON.stringify(["/images/products/p47-wireless.jpg"]),
    colors: JSON.stringify([
      { name: "কালো", code: "#18181B", image: "/images/products/p47-wireless.jpg" },
      { name: "সাদা", code: "#FFFFFF", image: "/images/products/p47-wireless.jpg" },
      { name: "লাল", code: "#EF4444", image: "/images/products/p47-wireless.jpg" },
      { name: "নীল", code: "#3B82F6", image: "/images/products/p47-wireless.jpg" }
    ]),
    shortDescription: "গান শোনা, গেমিং কিংবা মুভি দেখা—সবকিছুতেই প্রিমিয়াম সাউন্ড পেতে P47 ওয়্যারলেস হেডফোন। মেমোরি কার্ড, এফএম ও ফোল্ডেবল ডিজাইন।",
    fullDescription: JSON.stringify([
      "দারুণ অফার! P47 Wireless Bluetooth Headphone এখন পানির দামে। ফ্যাশন আর প্রযুক্তির এক দারুণ কম্বিনেশন!",
      "ব্লুটুথ দিয়ে তারবিহীন ব্যবহারের পাশাপাশি অক্স (AUX) কেবল দিয়ে এটি মোবাইল বা কম্পিউটারে প্লাগ করে চালানো যায়।",
      "খুব সহজেই ভাঁজ করে ব্যাগে রাখা যায়, ফলে ট্রাভেল বা ভ্রমণের জন্য এটি দারুণ।"
    ]),
    keyFeatures: JSON.stringify([
      "ওয়্যারলেস ব্লুটুথ + ৩.৫ মিমি অক্স ডুয়েল কানেকশন",
      "ফোন ছাড়াই সরাসরি গান শোনার জন্য TF মেমোরি কার্ড স্লট",
      "বিল্ট-ইন এফএম (FM) রেডিও সাপোর্ট",
      "ফোল্ডেবল ফ্রেম — সহজে ভাজ করে ব্যাগে বহনযোগ্য",
      "স্মার্ট বাটন কন্ট্রোল — ভলিউম, গান পরিবর্তন ও কল রিসিভ"
    ]),
    specs: JSON.stringify([
      { label: "মডেল", value: "P47 Wireless 4.1+EDR" },
      { label: "কানেক্টিভিটি", value: "Bluetooth, 3.5mm Aux, TF Card, FM" },
      { label: "প্লে টাইম", value: "৪ থেকে ৬ ঘণ্টা" },
      { label: "চার্জিং ইন্টারফেস", value: "Micro-USB" }
    ]),
    warranty: "চেকিং রিপ্লেসমেন্ট"
  }
];

async function main() {
  console.log("Seeding Rihlah Gadget Shop database with 11 products...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const item of productsData) {
    await prisma.product.create({
      data: item
    });
  }
  console.log(`Successfully seeded ${productsData.length} products!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
