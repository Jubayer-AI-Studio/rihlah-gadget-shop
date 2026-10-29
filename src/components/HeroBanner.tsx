'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rihlah-light/70 via-white to-surface-light py-4 sm:py-12 border-b border-rihlah-light">
      {/* Decorative Emerald and Amber Ambient Blurs */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-rihlah-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-rihlah-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-3 sm:space-y-6 text-left">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-rihlah-light border border-rihlah-primary/30 text-rihlah-deep text-[11px] sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rihlah-accent animate-pulse" />
              <span>{siteConfig.slogan} • ১০০% অথেনটিক গ্যাজেট</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-rihlah-dark tracking-tight leading-[1.2]">
              প্রিমিয়াম গ্যাজেট ও লাইফস্টাইল—{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rihlah-primary via-rihlah-emerald to-rihlah-accent">
                সেরা অফার রেটে আপনার দরজায়!
              </span>
            </h1>

            {/* Subtext - Hidden on mobile to avoid screen clutter */}
            <p className="hidden sm:block text-sm sm:text-base text-ink-muted max-w-2xl leading-relaxed">
              সরাসরি চীন থেকে আমদানিকৃত ট্রেন্ডিং স্মার্টওয়াচ, সাউন্ড বক্স, কারাওকে স্পিকার ও ওয়্যারলেস হেডফোনের বিশ্বস্ত সংগ্রহ। কোনো অতিরিক্ত ঝামেলা ছাড়াই দেখে-শুনে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।
            </p>

            {/* Mobile-only compact benefit badges */}
            <div className="flex sm:hidden flex-wrap items-center gap-2 pt-0.5 text-[11px] font-bold text-rihlah-deep">
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-rihlah-primary/20 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-rihlah-primary" /> ক্যাশ অন ডেলিভারি
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-rihlah-primary/20 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-rihlah-primary" /> ১০০% অরিজিনাল
              </span>
            </div>

            {/* Desktop Feature Checklist */}
            <div className="hidden sm:grid grid-cols-3 gap-2.5 w-full pt-1 text-xs sm:text-sm text-rihlah-deep font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rihlah-primary shrink-0" />
                <span>সারাদেশে ক্যাশ অন ডেলিভারি (পণ্য দেখে টাকা)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rihlah-primary shrink-0" />
                <span>১০০% অরিজিনাল কোয়ালিটি পণ্য</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rihlah-primary shrink-0" />
                <span>১ ক্লিকে সরাসরি হোয়াটসঅ্যাপে অর্ডার</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2 w-full sm:w-auto">
              <a
                href="#products-section"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-rihlah-primary hover:bg-rihlah-deep active:scale-95 text-white font-bold text-xs sm:text-base shadow-md shadow-rihlah-primary/25 transition-all"
              >
                সব গ্যাজেট দেখুন
                <ArrowDownRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rihlah-amber" />
              </a>

              <a
                href={siteConfig.whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-whatsapp/10 hover:bg-whatsapp/20 text-whatsapp-dark border border-whatsapp/30 font-bold text-xs sm:text-base transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-whatsapp fill-whatsapp/20" />
                হোয়াটসঅ্যাপে অর্ডার
              </a>
            </div>
          </div>

          {/* Right Visual Card - Hidden on mobile screens so products appear immediately */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-tr from-rihlah-light via-white to-orange-50/50 p-4 sm:p-5 border border-rihlah-primary/20 shadow-soft">
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-rihlah-accent to-rihlah-amber text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                সারাদেশে কুরিয়ার ডেলিভারি
              </div>

              {/* Logo / Brand Emblem */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-rihlah-light shadow-inner bg-white p-2">
                <Image
                  src="/images/logo.png"
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Bottom Quick Info */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-rihlah-light flex items-center justify-between text-xs">
                <div>
                  <span className="text-ink-muted block text-[11px]">অফিসিয়াল হটলাইন</span>
                  <span className="font-extrabold text-rihlah-deep text-sm">{siteConfig.whatsappDisplay}</span>
                </div>
                <div className="text-right">
                  <span className="text-ink-muted block text-[11px]">পেমেন্ট মেথড</span>
                  <span className="font-bold text-rihlah-accent text-sm">ক্যাশ অন ডেলিভারি</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
