'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Plus,
  Minus,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Share2,
  Star
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { siteConfig } from '@/config/siteConfig';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsappOrder';
import { trackEvent } from '@/utils/analytics';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  React.useEffect(() => {
    trackEvent('visit');
  }, []);

  const totalPrice = product.price * quantity;
  const savings = (product.originalPrice - product.price) * quantity;

  const handleColorSelect = (colorName: string, colorImg?: string) => {
    setSelectedColor(colorName);
    if (colorImg) {
      setActiveImage(colorImg);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleWhatsAppOrder = () => {
    trackEvent('whatsapp');
    const url = generateSingleProductWhatsAppUrl(product, quantity, selectedColor);
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-light text-left">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-ink-muted flex-wrap">
          <Link href="/" className="hover:text-rihlah-primary flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-rihlah-primary/40" />
          <span className="text-rihlah-primary font-bold">{product.categoryLabel}</span>
          <ChevronRight className="w-3.5 h-3.5 text-rihlah-primary/40" />
          <span className="text-ink-main font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-5 sm:p-8 border border-rihlah-light shadow-xs">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Main Image Container */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-muted/30 border border-rihlah-light shadow-inner">
              {product.badge && (
                <div className="absolute top-3.5 left-3.5 z-10 px-3.5 py-1 rounded-full bg-rihlah-primary text-white font-extrabold text-xs shadow-md">
                  {product.badge}
                </div>
              )}
              {product.originalPrice > product.price && (
                <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs shadow-md">
                  ৳{product.originalPrice - product.price} ছাড়!
                </div>
              )}
              <Image
                src={activeImage}
                alt={product.name}
                fill
                priority
                className="object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImage === img
                        ? 'border-rihlah-primary shadow-md scale-105 ring-2 ring-rihlah-primary/20'
                        : 'border-rihlah-light opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Share and Guarantee */}
            <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-rihlah-light">
              <span className="flex items-center gap-1.5 text-whatsapp-dark font-bold">
                <Truck className="w-4 h-4 text-whatsapp" /> সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-rihlah-primary hover:text-rihlah-deep font-bold"
              >
                <Share2 className="w-3.5 h-3.5 text-rihlah-accent" />
                <span>{copied ? 'লিংক কপি হয়েছে!' : 'শেয়ার করুন'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing & Purchase Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Rating */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-0.5 rounded-full bg-rihlah-light text-rihlah-deep text-xs font-black uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating} ({product.reviewsCount} টি রিভিউ)</span>
                </div>
                {product.isBestSeller && (
                  <span className="px-2.5 py-0.5 rounded-full bg-rihlah-accent text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" /> বেস্ট সেলার
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-rihlah-dark leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed font-medium">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Block */}
              <div className="p-5 rounded-2xl bg-surface-light border border-rihlah-light space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-ink-muted font-bold">অফার মূল্য:</span>
                  <span className="text-3xl sm:text-4xl font-black text-rihlah-primary">
                    ৳{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-ink-muted line-through font-semibold">
                      ৳{product.originalPrice}
                    </span>
                  )}
                  {product.originalPrice > product.price && (
                    <span className="px-2.5 py-1 rounded-md bg-red-100 text-red-700 text-xs font-black">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়!
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-xs text-rihlah-emerald font-extrabold">
                    🎉 এই অর্ডারে আপনি নিশ্চিত ৳{savings} টাকা সেভ করছেন!
                  </p>
                )}
              </div>

              {/* Color Variant Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <label className="text-xs font-bold text-ink-main flex items-center justify-between">
                    <span>পছন্দের কালার নির্বাচন করুন:</span>
                    <span className="text-rihlah-primary font-bold">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorSelect(color.name, color.image)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                          selectedColor === color.name
                            ? 'border-rihlah-primary bg-rihlah-light text-rihlah-deep ring-2 ring-rihlah-primary/20 shadow-xs'
                            : 'border-rihlah-light bg-white text-ink-muted hover:border-rihlah-primary/40'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: color.code }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-ink-main block">
                  পরিমাণ (Quantity):
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-rihlah-light rounded-xl bg-white overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-rihlah-light text-rihlah-deep transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-black text-rihlah-dark min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-rihlah-light text-rihlah-deep transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs">
                    <span className="text-ink-muted block font-semibold">সর্বমোট প্রদেয়:</span>
                    <span className="text-xl font-black text-rihlah-primary">
                      ৳{totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Buy Now & Direct WhatsApp */}
            <div className="space-y-3 pt-4 border-t border-rihlah-light">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-rihlah-accent to-rihlah-amber hover:brightness-105 active:scale-98 text-white font-black text-sm shadow-md shadow-rihlah-accent/20 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>এখনই অর্ডার করুন (Buy Now)</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-whatsapp to-whatsapp-dark hover:brightness-105 active:scale-98 text-white font-black text-sm shadow-md shadow-whatsapp/20 flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার</span>
                </button>
              </div>

              {/* 3 Trust Signals */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-center text-rihlah-deep font-bold">
                <div className="p-2.5 rounded-xl bg-surface-light border border-rihlah-light flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-rihlah-accent" />
                  <span>ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-light border border-rihlah-light flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-rihlah-primary" />
                  <span>১০০% অরিজিনাল</span>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-light border border-rihlah-light flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-rihlah-accent" />
                  <span>{product.warranty || '৭ দিনের রিপ্লেসমেন্ট'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          {/* Left Column: Full Description & Key Features */}
          <div className="lg:col-span-7 space-y-6">
            {/* Features Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rihlah-light shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-rihlah-dark border-b border-rihlah-light pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rihlah-accent" />
                মূল আকর্ষণ ও বৈশিষ্ট্যসমূহ (Key Features)
              </h2>
              <ul className="space-y-3">
                {product.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-main font-medium">
                    <CheckCircle2 className="w-4 h-4 text-rihlah-primary shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rihlah-light shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-rihlah-dark border-b border-rihlah-light pb-3">
                পণ্যের বিস্তারিত বিবরণ
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-ink-muted leading-relaxed font-medium">
                {product.fullDescription.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Specs Table */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rihlah-light shadow-xs space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-rihlah-dark border-b border-rihlah-light pb-3">
                টেকনিক্যাল স্পেসিফিকেশন
              </h2>
              <div className="divide-y divide-rihlah-light text-xs sm:text-sm">
                {product.specs.map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="text-ink-muted font-semibold">{spec.label}:</span>
                    <span className="text-rihlah-dark font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Helpline Callout */}
            <div className="rounded-3xl bg-rihlah-light/70 border border-rihlah-primary/20 p-5 space-y-2 text-xs text-rihlah-deep">
              <h3 className="font-bold text-sm text-rihlah-dark">কোনো প্রশ্ন বা কনফিউশন আছে?</h3>
              <p className="text-ink-muted leading-relaxed">
                পণ্যটির রিয়েল ছবি বা ভিডিও দেখতে এবং যেকোনো প্রশ্ন সরাসরি জানতে আমাদের কাস্টমার হটলাইনে কল বা হোয়াটসঅ্যাপ মেসেজ করুন।
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-whatsapp-dark hover:underline"
                >
                  <MessageCircle className="w-4 h-4 text-whatsapp" />
                  হোয়াটসঅ্যাপ হটলাইন: {siteConfig.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-rihlah-light text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-rihlah-dark">
                সম্পর্কিত অন্যান্য ট্রেন্ডিং গ্যাজেট
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                একই সাথে আপনার অর্ডারে যুক্ত করতে পারেন
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Quick Buy Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-2 safe-bottom">
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-800 shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-bold">হোম</span>
        </Link>

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-emerald-600 hover:text-emerald-700 shrink-0"
        >
          <MessageCircle className="w-5 h-5 text-whatsapp fill-whatsapp/20" />
          <span className="text-[10px] mt-0.5 font-bold text-emerald-700">হোয়াটসঅ্যাপ</span>
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rihlah-primary to-rihlah-deep text-white font-extrabold text-xs shadow-md shadow-rihlah-primary/25 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-rihlah-amber" />
          <span>অর্ডার করুন (৳{product.price})</span>
        </button>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
