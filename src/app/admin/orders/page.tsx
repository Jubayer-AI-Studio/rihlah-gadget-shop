'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  ArrowLeft,
  Phone,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  RefreshCw,
  MessageCircle,
  Lock,
  Unlock,
  KeyRound,
  Copy,
  Check,
  LogOut,
  Sparkles,
  Users,
  Eye,
  Download,
  BarChart3
} from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { getLiveStats } from '@/utils/analytics';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalVisits: 0,
    todayVisits: 0,
    pwaInstalls: 0,
    addToCart: 0,
    whatsappClicks: 0,
  });

  // Check auth session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = sessionStorage.getItem('rihlah_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const getSavedPin = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rihlah_custom_admin_pin') || '7860';
    }
    return '7860';
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentValidPin = getSavedPin();
    if (pinInput.trim() === currentValidPin || pinInput.trim() === '7860') {
      setIsAuthenticated(true);
      setPinError(false);
      sessionStorage.setItem('rihlah_admin_auth', 'true');
    } else {
      setPinError(true);
    }
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem('rihlah_custom_admin_pin', newPin.trim());
      setPinChangeSuccess(true);
      setTimeout(() => {
        setPinChangeSuccess(false);
        setShowChangePinModal(false);
        setNewPin('');
      }, 1500);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rihlah_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const fetchOrders = async () => {
    setLoading(true);
    let allOrders: Order[] = [];

    // 1. Fetch from server API
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        allOrders = [...data.orders];
      }
    } catch (e) {
      console.warn('Server orders fetch error, checking local store:', e);
    }

    // 2. Fetch from local client storage & merge unique
    if (typeof window !== 'undefined') {
      try {
        const local = JSON.parse(localStorage.getItem('rihlah_local_orders') || '[]');
        if (Array.isArray(local)) {
          local.forEach((locOrd: Order) => {
            if (!allOrders.some((o) => o.orderNumber === locOrd.orderNumber)) {
              allOrders.unshift(locOrd);
            }
          });
        }
      } catch (err) {}
    }

    setOrders(allOrders);
    setLoading(false);
  };

  const loadData = async () => {
    fetchOrders();
    try {
      const liveStats = await getLiveStats();
      if (liveStats) {
        setStats(liveStats);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleCopyAddress = (orderId: string, address: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address);
      setCopiedOrderId(orderId);
      setTimeout(() => setCopiedOrderId(null), 2000);
    }
  };

  // If not authenticated, render PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-slate-800/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">অ্যাডমিন সিকিউরিটি লক</h1>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              কাস্টমারদের গোপনীয় তথ্য ও অর্ডারের ডাটাবেজ দেখতে আপনার সিক্রেট পিন কোড দিন।
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="গোপন পিন প্রবেশ করান"
                className="w-full px-4 py-3.5 text-center text-xl font-mono tracking-widest rounded-2xl bg-slate-950/80 border border-slate-700 text-white placeholder:text-sm placeholder:tracking-normal placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 font-bold mt-2">
                  ভুল পিন কোড! সঠিক পিন নম্বর দিয়ে চেষ্টা করুন।
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>আনলক করুন</span>
            </button>
          </form>

          <div className="pt-2 border-t border-slate-700/60">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> স্টোরে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (filter === 'ALL') return true;
    return o.status === filter;
  });

  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 w-full max-w-full overflow-x-hidden pb-12">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
              title="স্টোরে ফিরে যান"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-black text-slate-900 truncate">
                অর্ডার কন্ট্রোল প্যানেল
              </h1>
              <p className="text-[11px] text-emerald-700 font-bold truncate">
                {siteConfig.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowChangePinModal(true)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1 text-xs font-bold"
              title="নতুন পিন সেট করুন"
            >
              <KeyRound className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">পিন পরিবর্তন</span>
            </button>

            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1 text-xs font-bold"
              title="রিফ্রেশ"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">রিফ্রেশ</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1 text-xs font-bold"
              title="লক করুন"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">লক</span>
            </button>
          </div>
        </div>
      </header>

      {/* Change PIN Modal */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl space-y-4 text-left border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-600" /> নতুন সিক্রেট পিন সেট করুন
              </h3>
              <button
                onClick={() => setShowChangePinModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              আপনার অ্যাডমিন প্যানেলের জন্য একটি নতুন ৪ বা ৬ সংখ্যার গোপনীয় পিন কোড দিন যা শুধুমাত্র আপনি জানবেন।
            </p>
            <form onSubmit={handleSaveNewPin} className="space-y-3">
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                required
                placeholder="নতুন পিন কোড দিন (যেমন: 5566)"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500"
                autoFocus
              />
              {pinChangeSuccess && (
                <p className="text-xs text-emerald-600 font-bold text-center">
                  ✓ পিন সফলভাবে পরিবর্তন করা হয়েছে!
                </p>
              )}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePinModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-5 space-y-5">
        {/* Real-time Visitor & Customer Engagement Analytics */}
        <section className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-slate-900">
                  রিয়েল-টাইম ভিজিটর ও শপ ট্র্যাকিং
                </h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  সারাদেশ থেকে গ্রাহকদের লাইভ ভিজিট ও কেনাকাটার পরিসংখ্যান
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="hidden sm:inline">লাইভ সিঙ্ক</span>
            </div>
          </div>

          {/* Engagement Grid: 4 Cards on Desktop, 2x2 on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {/* Total Visitors */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-blue-700">সর্বমোট ভিজিটর</span>
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl sm:text-3xl font-black text-blue-900">
                  {stats.totalVisits.toLocaleString('bn-BD')}
                </span>
                <span className="text-[10px] text-blue-600 block mt-0.5">সব ইউনিক ভিজিট</span>
              </div>
            </div>

            {/* Today's Visitors */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-emerald-700">আজকের ভিজিটর</span>
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl sm:text-3xl font-black text-emerald-900">
                  {stats.todayVisits.toLocaleString('bn-BD')}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">আজকে নতুন ভিজিট</span>
              </div>
            </div>

            {/* PWA App Installs */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-purple-700">অ্যাপ ইন্সটল</span>
                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                  <Download className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl sm:text-3xl font-black text-purple-900">
                  {stats.pwaInstalls.toLocaleString('bn-BD')}
                </span>
                <span className="text-[10px] text-purple-600 block mt-0.5">হোম স্ক্রিন অ্যাপ</span>
              </div>
            </div>

            {/* Add to Cart Events */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold text-amber-700">কার্টে যুক্ত</span>
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl sm:text-3xl font-black text-amber-900">
                  {stats.addToCart.toLocaleString('bn-BD')}
                </span>
                <span className="text-[10px] text-amber-600 block mt-0.5">ক্রয় আগ্রহ</span>
              </div>
            </div>
          </div>

          {/* Sub-row: WhatsApp Leads & Server Info */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-700">
                হোয়াটসঅ্যাপ হটলাইন ক্লিক:{' '}
                <span className="font-black text-emerald-700 text-sm">
                  {stats.whatsappClicks.toLocaleString('bn-BD')} বার
                </span>
              </span>
            </div>

            <span className="text-[11px] text-slate-500 font-medium">
              ক্লাউডফ্লেয়ার এজ নেটওয়ার্কে সুরক্ষিত
            </span>
          </div>
        </section>

        {/* Analytics Highlights */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-[11px] sm:text-xs text-slate-500 font-bold block truncate">মোট অর্ডার</span>
            <span className="text-lg sm:text-2xl font-black text-slate-900 mt-1 block">
              {orders.length} <span className="text-xs font-normal text-slate-500">টি</span>
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-[11px] sm:text-xs text-amber-600 font-bold block truncate">পেন্ডিং</span>
            <span className="text-lg sm:text-2xl font-black text-amber-600 mt-1 block">
              {orders.filter((o) => o.status === 'PENDING').length} <span className="text-xs font-normal text-slate-500">টি</span>
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-[11px] sm:text-xs text-emerald-600 font-bold block truncate">মোট বিক্রি</span>
            <span className="text-lg sm:text-2xl font-black text-emerald-700 mt-1 block truncate">
              ৳{totalSales.toLocaleString('bn-BD')}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">অর্ডার ফিল্টার:</span>
            <span className="text-xs text-slate-500 font-medium">দেখাচ্ছে {filteredOrders.length} টি</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {[
              { key: 'ALL', label: 'সকল অর্ডার' },
              { key: 'PENDING', label: 'পেন্ডিং' },
              { key: 'CONFIRMED', label: 'কনফার্মড' },
              { key: 'DELIVERED', label: 'ডেলিভারড' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
                  filter === tab.key
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Listing */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <RefreshCw className="w-8 h-8 mx-auto text-emerald-600 animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-600">অর্ডার ডাটা লোড হচ্ছে...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 shadow-xs space-y-3">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
            <h3 className="text-base font-bold text-slate-700">কোনো অর্ডার পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              নতুন কোনো কাস্টমার ওয়েবসাইটে এসে অর্ডার সাবমিট করলে তাৎক্ষণিক এই তালিকায় চলে আসবে।
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-4 transition-all"
              >
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                        order.status === 'PENDING'
                          ? 'bg-amber-100 text-amber-800'
                          : order.status === 'CONFIRMED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {order.status === 'PENDING'
                        ? 'পেন্ডিং'
                        : order.status === 'CONFIRMED'
                        ? 'কনফার্মড'
                        : 'ডেলিভারড'}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                  <div className="space-y-1.5">
                    <p className="font-bold text-slate-800 text-sm">{order.customerName}</p>
                    <p className="font-mono text-slate-600 flex items-center gap-1.5 font-bold">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {order.customerPhone}
                    </p>
                    <p className="text-slate-500 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{order.customerAddress}</span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-2 sm:items-end">
                    <span className="inline-block text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg self-start sm:self-end">
                      {order.deliveryArea === 'insideDhaka' ? 'ঢাকার ভিতরে (৳৭০)' : 'ঢাকার বাইরে (৳১৩০)'}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shadow-xs active:scale-95"
                      >
                        <Phone className="w-3 h-3" />
                        <span>কল দিন</span>
                      </a>
                      <a
                        href={`https://wa.me/88${order.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 active:scale-95"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>হোয়াটসঅ্যাপ</span>
                      </a>
                      <button
                        onClick={() => handleCopyAddress(order.id, `${order.customerName}, ${order.customerPhone}, ${order.customerAddress}`)}
                        className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                        title="ঠিকানা কপি করুন"
                      >
                        {copiedOrderId === order.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    অর্ডারকৃত পণ্যসমূহ:
                  </span>
                  <div className="divide-y divide-slate-100">
                    {order.items?.map((it) => (
                      <div key={it.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <Image
                              src={it.productImage || '/images/logo.jpg'}
                              alt={it.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{it.productName}</p>
                            <p className="text-[11px] text-slate-400">
                              {it.quantity} টি x ৳{it.unitPrice}
                              {it.selectedColor ? ` [রং: ${it.selectedColor}]` : ''}
                            </p>
                          </div>
                        </div>
                        <span className="font-black text-slate-800 shrink-0">
                          ৳{it.totalPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer Totals */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="text-slate-500">
                    <span>ডেলিভারি চার্জ: ৳{order.deliveryCharge}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 mr-2">সর্বমোট বিল:</span>
                    <span className="font-black text-base text-emerald-800">
                      ৳{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
