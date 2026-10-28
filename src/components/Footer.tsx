'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Truck, RefreshCw, MessageCircle, Phone, MapPin, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-rihlah-deep to-rihlah-dark text-white pt-14 pb-8 border-t border-rihlah-primary mt-16 text-left">
      {/* 4 Trust Feature Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rihlah-accent/30 transition-all">
            <div className="p-2.5 rounded-2xl bg-rihlah-primary/80 text-rihlah-amber shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">সারাদেশে ক্যাশ অন ডেলিভারি</h4>
              <p className="text-xs text-white/70 mt-1">পণ্য হাতে পেয়ে চেক করে টাকা দেওয়ার পূর্ণ স্বাধীনতা।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rihlah-accent/30 transition-all">
            <div className="p-2.5 rounded-2xl bg-rihlah-primary/80 text-rihlah-amber shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">১০০% অথেনটিক গ্যাজেট</h4>
              <p className="text-xs text-white/70 mt-1">অরিজিনাল পণ্যে অবিচল আস্থা—সরাসরি চায়না থেকে ইমপোর্ট।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rihlah-accent/30 transition-all">
            <div className="p-2.5 rounded-2xl bg-rihlah-primary/80 text-rihlah-amber shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">৭ দিনের সহজ রিপ্লেসমেন্ট</h4>
              <p className="text-xs text-white/70 mt-1">যেকোনো টেকনিক্যাল সমস্যায় দ্রুত সমাধানের নিশ্চয়তা।</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rihlah-accent/30 transition-all">
            <div className="p-2.5 rounded-2xl bg-rihlah-primary/80 text-whatsapp shrink-0">
              <MessageCircle className="w-6 h-6 fill-whatsapp/20" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">২৪/৭ হোয়াটসঅ্যাপ হেল্পলাইন</h4>
              <p className="text-xs text-white/70 mt-1">যেকোনো প্রশ্ন বা তথ্যের জন্য সরাসরি মেসেজ দিন।</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-rihlah-accent/50 bg-white p-0.5 shadow-md">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-black text-white text-lg">{siteConfig.name}</h3>
              <p className="text-xs text-rihlah-amber font-bold">{siteConfig.slogan}</p>
            </div>
          </div>
          <p className="text-xs text-white/80 leading-relaxed max-w-sm">
            {siteConfig.description}
          </p>
          <div className="pt-2">
            <a
              href={siteConfig.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              হোয়াটসঅ্যাপে মেসেজ পাঠান: {siteConfig.whatsappDisplay}
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2">জনপ্রিয় ক্যাটাগরি</h4>
          <ul className="space-y-2 text-xs text-white/80">
            <li><Link href="/#products-section" className="hover:text-rihlah-amber transition-colors">ব্লুটুথ ও কারাওকে স্পিকার</Link></li>
            <li><Link href="/#products-section" className="hover:text-rihlah-amber transition-colors">স্মার্টওয়াচ ও গিফট প্যাকেজ</Link></li>
            <li><Link href="/#products-section" className="hover:text-rihlah-amber transition-colors">ওয়্যারলেস হেডফোন ও নেকব্যান্ড</Link></li>
            <li><Link href="/#products-section" className="hover:text-rihlah-amber transition-colors">ভ্লগিং ও কনটেন্ট ক্রিয়েটর লাইট</Link></li>
            <li><Link href="/#products-section" className="hover:text-rihlah-amber transition-colors">বিজনেস ওয়্যারলেস হেডসেট</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2">যোগাযোগ ও কাস্টমার কেয়ার</h4>
          <div className="space-y-2.5 text-xs text-white/80">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-rihlah-amber shrink-0" />
              হটলাইন: <span className="font-mono font-bold text-white">{siteConfig.whatsappDisplay}</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-whatsapp shrink-0" />
              হোয়াটসঅ্যাপ: <a href={siteConfig.whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-mono font-bold">{siteConfig.whatsappDisplay}</a>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rihlah-amber shrink-0 mt-0.5" />
              ঢাকা, বাংলাদেশ (সরাসরি চায়না থেকে আমদানিকৃত)
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
        <p>© {new Date().getFullYear()} {siteConfig.name}। সর্বস্বত্ব সংরক্ষিত।</p>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="hover:text-rihlah-amber text-white/50 hover:underline transition-colors flex items-center gap-1 text-[11px]"
          >
            🔒 অ্যাডমিন প্যানেল (অর্ডার দেখুন)
          </Link>
          <p className="flex items-center gap-1 text-white/80">
            <Sparkles className="w-3.5 h-3.5 text-rihlah-amber" />
            {siteConfig.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
