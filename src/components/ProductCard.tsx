'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Eye, Sparkles, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { generateSingleProductWhatsAppUrl } from '@/utils/whatsappOrder';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = generateSingleProductWhatsAppUrl(product, 1);
    window.open(url, '_blank');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const discountAmount = product.originalPrice - product.price;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-rihlah-light shadow-xs hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1 text-left">
      {/* Image Area with Link */}
      <Link href={`/product/${product.slug}`} className="relative w-full aspect-square bg-surface-muted/40 overflow-hidden block">
        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-rihlah-primary text-white font-extrabold text-[11px] shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-full bg-rihlah-accent text-white font-bold text-[10px] shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> বেস্ট সেলার
            </span>
          )}
        </div>

        {/* Discount Amount Pill */}
        {discountAmount > 0 && (
          <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-red-600 text-white font-black text-[11px] shadow-xs">
            ৳{discountAmount} ছাড়!
          </div>
        )}

        {/* Product Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-rihlah-dark/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-rihlah-deep px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-rihlah-accent" /> বিস্তারিত দেখুন
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 text-left">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] uppercase tracking-wider text-rihlah-emerald font-extrabold">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-sm sm:text-base text-ink-main line-clamp-2 hover:text-rihlah-accent transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-ink-muted line-clamp-1 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Retail Pricing Block */}
        <div className="space-y-2 pt-2 border-t border-rihlah-light">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-rihlah-primary">
                ৳{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-ink-muted/80 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>

            <span className="text-[10px] text-whatsapp-dark bg-whatsapp/10 border border-whatsapp/20 px-2 py-0.5 rounded-full font-bold">
              স্টকে আছে
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-rihlah-primary hover:bg-rihlah-deep active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-rihlah-amber" />
            <span>অর্ডার করুন</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
            <span>হোয়াটসঅ্যাপ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
