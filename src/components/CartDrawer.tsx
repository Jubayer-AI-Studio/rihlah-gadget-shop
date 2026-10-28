'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { siteConfig } from '@/config/siteConfig';
import { OrderCustomerInfo } from '@/types/product';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, placeOrder } = useCart();

  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    address: '',
    area: 'insideDhaka',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const deliveryCharge =
    customer.area === 'insideDhaka'
      ? siteConfig.deliveryCharge.insideDhaka
      : siteConfig.deliveryCharge.outsideDhaka;

  const total = subtotal + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name.trim()) {
      setError('দয়া করে আপনার নাম লিখুন।');
      return;
    }
    if (!customer.phone.trim() || customer.phone.replace(/\D/g, '').length < 11) {
      setError('দয়া করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return;
    }
    if (!customer.address.trim()) {
      setError('দয়া করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।');
      return;
    }

    setError(null);
    setLoading(true);

    const res = await placeOrder(customer);
    setLoading(false);

    if (!res.success) {
      setError(res.error || 'অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-left">
      {/* Backdrop */}
      <div
        onClick={() => !loading && setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-rihlah-dark via-rihlah-deep to-rihlah-primary text-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-rihlah-amber" />
              <h2 className="text-base sm:text-lg font-bold">আপনার শপিং ব্যাগ</h2>
              <span className="text-xs bg-rihlah-primary text-rihlah-amber px-2 py-0.5 rounded-full font-black border border-rihlah-amber/30">
                {cartItems.length} টি পণ্য
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              disabled={loading}
              className="p-1.5 rounded-full hover:bg-rihlah-primary text-white/80 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-rihlah-light flex items-center justify-center text-rihlah-primary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-rihlah-dark">আপনার ব্যাগটি খালি!</h3>
                <p className="text-xs text-ink-muted max-w-xs mx-auto">
                  রিহলাহ গ্যাজেট শপের ১০০% অরিজিনাল গ্যাজেট সংগ্রহ থেকে আপনার পছন্দের পণ্য যোগ করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-rihlah-primary text-white font-bold text-xs hover:bg-rihlah-deep shadow-sm"
                >
                  গ্যাজেট ব্রাউজ করুন <ArrowRight className="w-3.5 h-3.5 text-rihlah-amber" />
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor || ''}-${idx}`}
                      className="flex gap-3 p-3 rounded-2xl bg-surface-light border border-rihlah-light items-center relative"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white border border-rihlah-light/60">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="text-xs sm:text-sm font-bold text-ink-main truncate">
                          {item.product.name}
                        </h4>
                        {item.selectedColor && (
                          <span className="text-[11px] text-rihlah-primary font-semibold block">
                            কালার: {item.selectedColor}
                          </span>
                        )}

                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-rihlah-primary">
                            ৳{item.product.price}
                          </span>
                          {item.product.originalPrice > item.product.price && (
                            <span className="text-[10px] text-ink-muted line-through">
                              ৳{item.product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-rihlah-light rounded-lg bg-white overflow-hidden shadow-2xs">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1, item.selectedColor)
                              }
                              className="p-1 hover:bg-rihlah-light text-rihlah-deep"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-black text-rihlah-deep">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1, item.selectedColor)
                              }
                              className="p-1 hover:bg-rihlah-light text-rihlah-deep"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-rihlah-deep">
                            = ৳{item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="absolute top-2.5 right-2.5 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmitOrder} className="pt-3 border-t border-rihlah-light space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rihlah-dark">
                    <Truck className="w-4 h-4 text-rihlah-accent" />
                    <span>ক্যাশ অন ডেলিভারি তথ্য (Delivery Details)</span>
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Customer Name */}
                  <div>
                    <label className="text-[11px] font-bold text-ink-muted block mb-1">
                      আপনার নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ সাকিব চৌধুরী"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-rihlah-light focus:outline-none focus:ring-2 focus:ring-rihlah-primary"
                    />
                  </div>

                  {/* Customer Phone */}
                  <div>
                    <label className="text-[11px] font-bold text-ink-muted block mb-1">
                      মোবাইল নম্বর * (১১ ডিজিট)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-rihlah-light focus:outline-none focus:ring-2 focus:ring-rihlah-primary"
                    />
                  </div>

                  {/* Customer Address */}
                  <div>
                    <label className="text-[11px] font-bold text-ink-muted block mb-1">
                      সম্পূর্ণ ডেলিভারি ঠিকানা *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="যেমন: বাড়ি ৪, রোড ২, ধানমন্ডি, ঢাকা"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full text-base sm:text-xs p-2.5 rounded-xl border border-rihlah-light focus:outline-none focus:ring-2 focus:ring-rihlah-primary"
                    />
                  </div>

                  {/* Delivery Area Radio */}
                  <div>
                    <label className="text-[11px] font-bold text-ink-muted block mb-1">
                      ডেলিভারি এলাকা *
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer ${
                          customer.area === 'insideDhaka'
                            ? 'bg-rihlah-light border-rihlah-primary text-rihlah-deep font-bold'
                            : 'bg-white border-rihlah-light text-ink-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          checked={customer.area === 'insideDhaka'}
                          onChange={() => setCustomer({ ...customer, area: 'insideDhaka' })}
                          className="accent-rihlah-primary"
                        />
                        <span>ঢাকার ভিতরে (৳৭০)</span>
                      </label>

                      <label
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer ${
                          customer.area === 'outsideDhaka'
                            ? 'bg-rihlah-light border-rihlah-primary text-rihlah-deep font-bold'
                            : 'bg-white border-rihlah-light text-ink-muted'
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          checked={customer.area === 'outsideDhaka'}
                          onChange={() => setCustomer({ ...customer, area: 'outsideDhaka' })}
                          className="accent-rihlah-primary"
                        />
                        <span>ঢাকার বাইরে (৳১৩০)</span>
                      </label>
                    </div>
                  </div>

                  {/* Optional Notes */}
                  <div>
                    <label className="text-[11px] font-bold text-ink-muted block mb-1">
                      বিশেষ নোট (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: দুপুর ২টার পরে কল দিবেন"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      className="w-full text-xs p-2 rounded-xl border border-rihlah-light focus:outline-none focus:ring-2 focus:ring-rihlah-primary"
                    />
                  </div>

                  {/* Price Summary Breakdown */}
                  <div className="pt-3 border-t border-rihlah-light space-y-1.5 text-xs">
                    <div className="flex justify-between text-ink-muted">
                      <span>পণ্যের মোট মূল্য:</span>
                      <span className="font-bold text-ink-main">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-ink-muted">
                      <span>ডেলিভারি চার্জ:</span>
                      <span className="font-bold text-ink-main">৳{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-rihlah-deep pt-1.5 border-t border-dashed border-rihlah-light">
                      <span>সর্বমোট প্রদেয়:</span>
                      <span className="text-base text-rihlah-accent font-black">৳{total}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-whatsapp to-whatsapp-dark hover:brightness-105 active:scale-98 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>অর্ডার প্রসেস হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 fill-white/20" />
                        <span>অর্ডার কনফার্ম করুন (Send to WhatsApp)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-ink-muted font-medium">
                    🔒 পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করবেন (ক্যাশ অন ডেলিভারি)
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
