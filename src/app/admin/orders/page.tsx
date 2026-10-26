'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ArrowLeft, Phone, MapPin, Calendar, Clock, CheckCircle2, Truck, AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';

interface OrderItem {
  id: string;
  productName: string;
  productSlug: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string | null;
  totalPrice: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryArea: string;
  deliveryCharge: number;
  subtotal: number;
  totalAmount: number;
  notes?: string | null;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (filter === 'ALL') return true;
    return o.status === filter;
  });

  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-surface-light text-left py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-rihlah-light shadow-xs">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-rihlah-primary hover:text-rihlah-deep mb-2">
              <ArrowLeft className="w-4 h-4" /> স্টোরে ফিরে যান
            </Link>
            <h1 className="text-2xl font-black text-rihlah-dark">অর্ডার কন্ট্রোল ড্যাশবোর্ড</h1>
            <p className="text-xs text-ink-muted">ডাটাবেজে সংরক্ষিত সকল কাস্টমার অর্ডারের রিয়েল-টাইম তথ্য</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rihlah-light text-rihlah-deep text-xs font-bold hover:bg-rihlah-light/80 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              রিফ্রেশ
            </button>
          </div>
        </div>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-rihlah-light shadow-xs">
            <span className="text-xs text-ink-muted font-bold block">মোট অর্ডার সংখ্যা</span>
            <span className="text-2xl font-black text-rihlah-dark mt-1 block">{orders.length} টি</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-rihlah-light shadow-xs">
            <span className="text-xs text-ink-muted font-bold block">পেন্ডিং অর্ডার</span>
            <span className="text-2xl font-black text-amber-600 mt-1 block">
              {orders.filter((o) => o.status === 'PENDING').length} টি
            </span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-rihlah-light shadow-xs">
            <span className="text-xs text-ink-muted font-bold block">সর্বমোট সেলস ভ্যালু</span>
            <span className="text-2xl font-black text-rihlah-primary mt-1 block">৳{totalSales}</span>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-3xl border border-rihlah-light shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-rihlah-light pb-4">
            <h2 className="text-lg font-bold text-rihlah-dark">অর্ডারের তালিকা</h2>
            <div className="flex gap-2">
              {['ALL', 'PENDING', 'CONFIRMED', 'DELIVERED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filter === st
                      ? 'bg-rihlah-primary text-white'
                      : 'bg-surface-muted text-ink-muted hover:bg-rihlah-light'
                  }`}
                >
                  {st === 'ALL' ? 'সকল' : st}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-sm font-bold text-ink-muted">
              অর্ডার লোড হচ্ছে...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-sm text-ink-muted">
              এখনও কোনো অর্ডার পাওয়া যায়নি।
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-rihlah-light bg-surface-light/40 space-y-3"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rihlah-light pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-rihlah-primary">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-ink-muted">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleDateString('bn-BD')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.createdAt).toLocaleTimeString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {/* Customer Information & Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="font-bold text-ink-main text-sm">{order.customerName}</p>
                      <p className="text-ink-muted flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-rihlah-primary" />
                        <span className="font-mono font-bold">{order.customerPhone}</span>
                      </p>
                      <p className="text-ink-muted flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rihlah-primary shrink-0 mt-0.5" />
                        <span>{order.customerAddress} ({order.deliveryArea === 'insideDhaka' ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে'})</span>
                      </p>
                      {order.notes && (
                        <p className="text-rihlah-accent font-semibold pt-1">
                          নোট: {order.notes}
                        </p>
                      )}
                    </div>

                    {/* Direct WhatsApp Callout */}
                    <div className="flex sm:justify-end items-center">
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${order.customerName}! রিহলাহ গ্যাজেট শপ থেকে আপনার অর্ডার #${order.orderNumber} এর বিষয়ে যোগাযোগ করছি।`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-whatsapp text-white font-bold text-xs shadow-xs hover:bg-whatsapp-hover transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                        কাস্টমারকে হোয়াটসঅ্যাপ করুন
                      </a>
                    </div>
                  </div>

                  {/* Purchased Items List */}
                  <div className="pt-2 border-t border-rihlah-light">
                    <span className="text-[11px] font-bold text-ink-muted block mb-2">অর্ডারকৃত পণ্যসমূহ:</span>
                    <div className="space-y-2">
                      {order.items.map((it) => (
                        <div key={it.id} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-rihlah-light/60">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-rihlah-light">
                              <Image src={it.productImage} alt={it.productName} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-ink-main">{it.productName}</p>
                              {it.selectedColor && (
                                <span className="text-[10px] text-rihlah-primary font-semibold">
                                  রং: {it.selectedColor}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right font-mono font-bold">
                            <span>{it.quantity} x ৳{it.unitPrice} = ৳{it.totalPrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="flex justify-between items-center pt-2 text-xs border-t border-dashed border-rihlah-light">
                    <span className="text-ink-muted">
                      সাবটোটাল: ৳{order.subtotal} + ডেলিভারি: ৳{order.deliveryCharge}
                    </span>
                    <span className="text-sm font-black text-rihlah-primary">
                      সর্বমোট: ৳{order.totalAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
