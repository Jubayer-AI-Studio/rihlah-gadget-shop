"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingBag, MessageCircle, PhoneCall } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/siteConfig";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();

  // Do not render bottom nav on admin portal pages or product detail pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/product")) {
    return null;
  }

  const isHome = pathname === "/";

  const handleCategoryClick = () => {
    if (isHome) {
      const el = document.getElementById("categories");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.location.href = "/#categories";
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            isHome && !isCartOpen
              ? "text-rihlah-primary font-bold scale-105"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className={`w-5 h-5 ${isHome && !isCartOpen ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className="text-[11px] mt-0.5 tracking-tight">হোম</span>
        </Link>

        {/* Categories */}
        <button
          type="button"
          onClick={handleCategoryClick}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all active:scale-95"
        >
          <Grid className="w-5 h-5 stroke-2" />
          <span className="text-[11px] mt-0.5 tracking-tight">ক্যাটাগরি</span>
        </button>

        {/* Cart - Center Highlight */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-700 relative active:scale-95"
          aria-label="কার্ট দেখুন"
        >
          <div className="relative">
            <div className={`p-1.5 rounded-full transition-colors ${totalItems > 0 ? "bg-rihlah-primary text-white shadow-md shadow-rihlah-primary/30" : "bg-slate-100 text-slate-700"}`}>
              <ShoppingBag className="w-5 h-5" />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-scale-in">
                {totalItems}
              </span>
            )}
          </div>
          <span className={`text-[11px] mt-0.5 font-semibold ${totalItems > 0 ? "text-rihlah-primary" : "text-slate-600"}`}>
            কার্ট
          </span>
        </button>

        {/* WhatsApp Order */}
        <a
          href={siteConfig.whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-emerald-600 hover:text-emerald-700 transition-all active:scale-95"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute 0 top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <span className="text-[11px] mt-0.5 font-bold tracking-tight text-emerald-700">হোয়াটসঅ্যাপ</span>
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${siteConfig.whatsappNumber.replace("88", "+88")}`}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all active:scale-95"
        >
          <PhoneCall className="w-5 h-5 stroke-2" />
          <span className="text-[11px] mt-0.5 tracking-tight">কল করুন</span>
        </a>
      </div>
    </nav>
  );
}
