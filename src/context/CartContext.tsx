'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, OrderCustomerInfo, Product } from '@/types/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  placeOrder: (customer: OrderCustomerInfo) => Promise<{ success: boolean; whatsappUrl?: string; error?: string }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rihlah_cart_items');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('rihlah_cart_items', JSON.stringify(cartItems));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [cartItems, isHydrated]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return {
            ...item,
            quantity,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const placeOrder = async (customer: OrderCustomerInfo) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          items: cartItems,
        }),
      });

      const data = await res.json();
      if (data.success && data.whatsappUrl) {
        clearCart();
        setIsCartOpen(false);
        window.open(data.whatsappUrl, '_blank');
        return { success: true, whatsappUrl: data.whatsappUrl };
      } else {
        return { success: false, error: data.error || 'অর্ডার করতে ব্যর্থ হয়েছে।' };
      }
    } catch (e: any) {
      console.error('Order placement error:', e);
      return { success: false, error: 'সার্ভারে কানেক্ট করা যাচ্ছে না।' };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
