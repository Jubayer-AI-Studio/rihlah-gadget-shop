'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryPills from '@/components/CategoryPills';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';
import { initialProducts } from '@/data/products';
import { siteConfig } from '@/config/siteConfig';
import { MessageCircle, Sparkles, PackageSearch, Loader2 } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    trackEvent('visit');
    async function loadProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load products from API:', err);
      }
    }
    loadProducts();
  }, []);

  // Category counts calculation
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
      speaker: 0,
      smartwatch: 0,
      headphone: 0,
      accessories: 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-surface-light">
      {/* Navigation Bar */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Hero Section */}
      <HeroBanner />

      {/* Main Products Section */}
      <main id="products-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rihlah-light pb-4 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-rihlah-primary text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-rihlah-accent" />
              <span>{siteConfig.slogan}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-rihlah-dark">
              আমাদের প্রিমিয়াম গ্যাজেট কালেকশন
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              নিশ্চিত ১০০% অরিজিনাল কোয়ালিটি ও আকর্ষণীয় ছাড়ের মূল্যে লুফে নিন আপনার পছন্দের গ্যাজেট।
            </p>
          </div>

          {/* Results Badge */}
          <div className="text-xs font-bold text-rihlah-deep bg-rihlah-light border border-rihlah-primary/20 px-3.5 py-1.5 rounded-full shrink-0 self-start md:self-auto">
            মোট {filteredProducts.length} টি গ্যাজেট উপলব্ধ
          </div>
        </div>

        {/* Category Filter Pills */}
        <CategoryPills
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productCounts={productCounts}
        />

        {/* Products Grid or Loading */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <Loader2 className="w-10 h-10 mx-auto text-rihlah-primary animate-spin" />
            <p className="text-sm text-ink-muted font-bold">গ্যাজেট ডাটাবেজ থেকে লোড হচ্ছে...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-rihlah-light p-8 shadow-xs">
            <PackageSearch className="w-12 h-12 mx-auto text-rihlah-primary" />
            <h3 className="text-lg font-bold text-rihlah-dark">কোনো পণ্য খুঁজে পাওয়া যায়নি!</h3>
            <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
              আপনার সার্চ করা নামের সাথে কোনো গ্যাজেট মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-5 py-2.5 rounded-full bg-rihlah-primary text-white font-bold text-xs hover:bg-rihlah-deep shadow-sm"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}

        {/* Special Customer Support Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-rihlah-dark via-rihlah-deep to-rihlah-primary p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-rihlah-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 max-w-2xl relative z-10">
            <span className="text-xs bg-rihlah-primary/80 border border-rihlah-amber/30 text-rihlah-amber font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              ২৪/৭ সরাসরি কাস্টমার সাপোর্ট
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              পণ্য সম্পর্কে কোনো প্রশ্ন বা সরাসরি ফোনে অর্ডার করতে চান?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              যেকোনো গ্যাজেটের রিয়েল ছবি, ভিডিও বা ডেলিভারি সম্পর্কিত তথ্যের জন্য সরাসরি আমাদের হোয়াটসঅ্যাপে মেসেজ বা কল করুন। আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
            </p>
          </div>

          <a
            href={siteConfig.whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-whatsapp to-whatsapp-dark hover:brightness-105 active:scale-95 text-white font-extrabold text-sm shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>হোয়াটসঅ্যাপে কথা বলুন</span>
          </a>
        </div>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
