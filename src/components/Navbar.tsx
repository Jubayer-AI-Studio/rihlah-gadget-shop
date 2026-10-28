'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, ShieldCheck, Truck, MessageCircle, Sparkles, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/siteConfig';

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-rihlah-light shadow-xs transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rihlah-dark via-rihlah-deep to-rihlah-primary text-white text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rihlah-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rihlah-accent"></span>
            </span>
            <span className="font-semibold text-rihlah-amber">
              {siteConfig.slogan}
            </span>
            <span className="hidden sm:inline text-white/80">•</span>
            <span className="hidden sm:inline text-white/90">
              {siteConfig.tagline}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-white/90">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-rihlah-amber" /> সারাদেশে ক্যাশ অন ডেলিভারি
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-rihlah-amber" /> ১০০% অরিজিনাল পণ্য
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border border-rihlah-primary/30 shadow-xs transition-transform group-hover:scale-105 bg-white p-0.5">
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-base sm:text-xl leading-tight text-rihlah-deep tracking-tight group-hover:text-rihlah-accent transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-rihlah-accent font-bold tracking-wide">
              {siteConfig.slogan}
            </span>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="পণ্য বা মডেল সার্চ করুন (যেমন: Smartwatch, Speaker, Headphone)..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-surface-muted/70 border border-rihlah-light rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rihlah-primary focus:bg-white transition-all text-ink-main placeholder-ink-muted/70"
          />
          <Search className="w-4 h-4 text-rihlah-primary absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-full hover:bg-surface-muted text-ink-main"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-rihlah-deep" />
          </button>

          {/* WhatsApp Direct Hotline */}
          <a
            href={siteConfig.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp-dark border border-whatsapp/30 text-xs font-bold transition-all"
          >
            <MessageCircle className="w-4 h-4 text-whatsapp fill-whatsapp/20" />
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase tracking-wider text-whatsapp-dark/80 font-bold">হোয়াটসঅ্যাপ হটলাইন</span>
              <span className="font-mono text-xs font-extrabold leading-none">{siteConfig.whatsappDisplay}</span>
            </div>
          </a>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rihlah-accent to-rihlah-amber hover:brightness-105 active:scale-95 text-white font-bold text-sm shadow-md transition-all group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:-rotate-12" />
            <span className="hidden xs:inline">কার্ট</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-rihlah-accent font-black text-xs shadow-xs">
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-rihlah-light bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্য বা মডেল সার্চ করুন..."
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full bg-surface-muted border border-rihlah-light rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-rihlah-primary"
              autoFocus
            />
            <Search className="w-4 h-4 text-rihlah-primary absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}
    </header>
  );
}
