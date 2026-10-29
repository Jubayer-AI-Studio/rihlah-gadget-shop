export interface SiteConfig {
  name: string;
  englishName: string;
  slogan: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappDirectUrl: string;
  deliveryCharge: {
    insideDhaka: number;
    outsideDhaka: number;
  };
  features: {
    authentic100: boolean;
    cashOnDelivery: boolean;
    replacementWarranty: boolean;
    fastShipping: boolean;
  };
}

export const siteConfig: SiteConfig = {
  name: "রিহলাহ গ্যাজেট শপ",
  englishName: "Rihlah Gadget Shop",
  slogan: "অরিজিনাল পণ্যে অবিচল আস্থা",
  tagline: "সেরা গ্যাজেট ও লাইফস্টাইল অ্যাক্সেসরিজের বিশ্বস্ত অনলাইন শপ",
  description: "রিহলাহ গ্যাজেট শপ — প্রিমিয়াম স্মার্টওয়াচ, ব্লুটুথ কারাওকে স্পিকার, সাউন্ড সিস্টেম, ওয়্যারলেস নেকব্যান্ড ও হেডফোনের ১০০% অরিজিনাল খুচরা বিক্রয় কেন্দ্র। ক্যাশ অন ডেলিভারি ও দ্রুত হোম ডেলিভারি নিশ্চয়তা।",
  whatsappNumber: "8801580376861",
  whatsappDisplay: "01580-376861",
  whatsappDirectUrl: "https://wa.me/8801580376861",
  deliveryCharge: {
    insideDhaka: 85,
    outsideDhaka: 135,
  },
  features: {
    authentic100: true,
    cashOnDelivery: true,
    replacementWarranty: true,
    fastShipping: true,
  },
};
