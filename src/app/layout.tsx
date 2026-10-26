import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { CartProvider } from "@/context/CartContext";
import MobileBottomNav from "@/components/MobileBottomNav";
import PwaInstaller from "@/components/PwaInstaller";

export const viewport: Viewport = {
  themeColor: "#0B4D3C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.slogan}`,
  description: siteConfig.description,
  metadataBase: new URL("https://rihlah-gadget-shop.vercel.app"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.slogan}`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 800,
        alt: siteConfig.name,
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-surface-light text-ink-main selection:bg-rihlah-accent selection:text-white pb-16 md:pb-0">
        <CartProvider>
          {children}
          <MobileBottomNav />
          <PwaInstaller />
        </CartProvider>
      </body>
    </html>
  );
}
