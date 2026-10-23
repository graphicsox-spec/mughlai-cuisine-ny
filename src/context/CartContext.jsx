import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LOCATIONS } from '../data/locations';

const CartContext = createContext();

const CART_STORAGE_KEY = 'mughlai_royal_cart_v2';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedKitchen, setSelectedKitchen] = useState(LOCATIONS[0]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // Helper to extract numeric price
  const parsePrice = (priceVal) => {
    if (typeof priceVal === 'number') return priceVal;
    if (!priceVal) return 0;
    const clean = String(priceVal).replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  /**
   * Add a dish or deal bundle to the cart
   */
  const addToCart = (product, options = {}) => {
    const spiceLevel = options.spiceLevel || (product.spicy ? 'Medium' : 'Mild');
    const dealAppetizer = options.dealAppetizer || null;
    const dealEntree = options.dealEntree || null;
    const dealRice = options.dealRice || null;
    const dealBread = options.dealBread || null;
    const dealCondiments = options.dealCondiments || 'House Mango Chutney & Cucumber Raita';

    // Unique cart item identifier
    const cartId = product.isDeal
      ? `deal_${dealAppetizer}_${dealEntree}_${dealRice || ''}_${dealBread || ''}_${spiceLevel}`.replace(/\s+/g, '-').toLowerCase()
      : `${product.id}_${spiceLevel}`.replace(/\s+/g, '-').toLowerCase();

    const priceNum = parsePrice(product.price);

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      const newItem = {
        cartId,
        id: product.id,
        name: product.name,
        price: product.price,
        priceNum,
        image: product.image,
        description: product.description || product.shortDesc || product.fullDesc || '',
        categoryName: product.categoryName || 'Mughlai Specialty',
        spicy: !!product.spicy,
        clayOven: !!product.clayOven,
        veg: !!product.veg,
        spiceLevel,
        isDeal: !!product.isDeal,
        dealAppetizer,
        dealEntree,
        dealRice,
        dealBread,
        dealCondiments,
        dealIncludes: product.isDeal
          ? [dealRice || 'Steaming Basmati Rice', dealBread || 'Fresh Tandoori Naan', 'Sweet Mango Chutney', 'Chilled Cucumber Raita']
          : null,
        quantity: 1,
      };

      return [...prev, newItem];
    });
  };

  /**
   * Update quantity of an item
   */
  const updateQuantity = (cartId, delta) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  /**
   * Remove an item from cart
   */
  const removeFromCart = (cartId) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setItems([]);
    setSpecialInstructions('');
  };

  /**
   * Check how many of a specific dish ID are in cart
   */
  const getItemCount = (productId) => {
    return items
      .filter((i) => i.id === productId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  // Calculations
  const totalItemCount = useMemo(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, i) => sum + i.priceNum * i.quantity, 0);
  }, [items]);

  // NYC Sales Tax: 8.875%
  const tax = useMemo(() => {
    return subtotal * 0.08875;
  }, [subtotal]);

  // Free delivery for orders $35+, otherwise $2.99 (or $0 promo)
  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 35 ? 0 : 2.99;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal === 0 ? 0 : subtotal + tax + deliveryFee;
  }, [subtotal, tax, deliveryFee]);

  const openCart = () => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/bag') {
      window.location.href = '/bag';
    }
  };
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const completeOrder = (orderData = {}) => {
    const finalSubtotal = orderData.subtotal !== undefined ? orderData.subtotal : subtotal;
    const finalTax = orderData.tax !== undefined ? orderData.tax : tax;
    const finalDeliveryFee = orderData.deliveryFee !== undefined ? orderData.deliveryFee : deliveryFee;
    const finalTotal = orderData.total !== undefined ? orderData.total : (finalSubtotal + finalTax + finalDeliveryFee);

    const orderRecord = {
      orderId: 'MUG-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      kitchen: orderData.kitchen || selectedKitchen,
      items: [...items],
      subtotal: finalSubtotal,
      tax: finalTax,
      deliveryFee: finalDeliveryFee,
      serviceFee: orderData.serviceFee || 0,
      discountAmount: orderData.discountAmount || 0,
      appliedCoupon: orderData.appliedCoupon || null,
      total: finalTotal,
      specialInstructions: orderData.specialInstructions || specialInstructions,
      ...orderData,
    };

    setLastOrder(orderRecord);
    clearCart();
    setIsCheckoutOpen(false);
    setIsReceiptOpen(true);
    return orderRecord;
  };

  const closeReceipt = () => setIsReceiptOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemCount,
        totalItemCount,
        subtotal,
        tax,
        deliveryFee,
        total,
        selectedKitchen,
        setSelectedKitchen,
        specialInstructions,
        setSpecialInstructions,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        isReceiptOpen,
        lastOrder,
        completeOrder,
        closeReceipt,
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
