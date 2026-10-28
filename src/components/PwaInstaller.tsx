"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, X, Share } from "lucide-react";
import { trackEvent } from "@/utils/analytics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Rihlah PWA Service Worker Registered"))
        .catch((err) => console.warn("SW registration failed:", err));
    }

    // Check if already in standalone (installed) mode
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // Check dismissed state
    const isDismissed = sessionStorage.getItem("rihlah_pwa_dismissed");
    if (isDismissed) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: boolean }).MSStream;

    if (isAppleIos) {
      setIsIos(true);
      // Show prompt after 3 seconds on iOS
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android / Chrome / Edge beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      trackEvent('install');
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      trackEvent('install');
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("rihlah_pwa_dismissed", "true");
  };

  if (!showPrompt || isStandalone) return null;

  return (
    <aside
      aria-label="App Installation Prompt"
      className="fixed bottom-20 md:bottom-6 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-50 animate-slide-up"
    >
      <div className="bg-gradient-to-r from-rihlah-dark via-rihlah-deep to-rihlah-primary text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-white p-0.5 shrink-0 shadow-md">
            <Image
              src="/icons/icon-192x192.png"
              alt="রিহলাহ গ্যাজেট শপ লোগো"
              width={44}
              height={44}
              className="object-contain w-full h-full rounded-lg"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5 leading-snug">
              রিহলাহ গ্যাজেট শপ অ্যাপ
              <span className="text-[10px] bg-rihlah-amber text-slate-900 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                PWA
              </span>
            </h4>
            <p className="text-xs text-white/80 truncate">
              {isIos
                ? "হোম স্ক্রিনে অ্যাড করে সরাসরি অ্যাপের মতো চালান"
                : "১ ক্লিকে মোবাইলে ইনস্টল করুন, সহজে অর্ডার করুন"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isIos ? (
            <div className="bg-white/20 text-white text-xs px-2.5 py-1.5 rounded-xl font-medium flex items-center gap-1">
              <Share className="w-3.5 h-3.5" />
              <span>Share &gt; Add to Home</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              className="bg-rihlah-amber hover:bg-amber-400 active:scale-95 text-slate-950 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>ইনস্টল</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="বন্ধ করুন"
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
