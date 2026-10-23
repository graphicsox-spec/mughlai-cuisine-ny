import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft,
  Tag, 
  Check, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  UtensilsCrossed, 
  MessageSquare, 
  Clock, 
  CreditCard, 
  Flame, 
  CheckCircle2, 
  AlertCircle,
  Leaf,
  Truck,
  Lock,
  Car,
  ChevronDown,
  Info,
  Award,
  User,
  Phone,
  Mail,
  Banknote,
  Smartphone,
  Building2,
  Edit3
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LOCATIONS } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import { getAssetUrl } from '../utils/assetUtils';
import CustomSelect from '../components/CustomSelect';
import { FULL_MENU } from '../data/fullMenu';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    subtotal,
    tax: baseTax,
    deliveryFee: baseDeliveryFee,
    total: baseTotal,
    selectedKitchen,
    setSelectedKitchen,
    specialInstructions,
    setSpecialInstructions,
    completeOrder,
    lastOrder,
  } = useCart();

  // Page Step: 'cart' (Review Tray) | 'checkout' (Information & Payment) | 'success' (In-page confirmation)
  const [step, setStep] = useState('cart');
  const [copied, setCopied] = useState(false);

  // Order Fulfillment Type: 'delivery' | 'pickup'
  const [orderType, setOrderType] = useState('delivery');
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [checkoutLocationDropdownOpen, setCheckoutLocationDropdownOpen] = useState(false);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  // Valid promo codes
  const PROMO_CODES = {
    'ROYAL10': { type: 'percent', value: 0.10, label: '10% Royal Privilege Discount' },
    'MUGHLAL10': { type: 'percent', value: 0.10, label: '10% Welcome Discount' },
    'FREEDEL': { type: 'free_delivery', label: 'Free Manhattan Delivery' },
    'FEAST5': { type: 'fixed', value: 5.00, label: '$5 Off Your Feast' },
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    if (PROMO_CODES[cleanCode]) {
      const promo = PROMO_CODES[cleanCode];
      setAppliedCoupon({ code: cleanCode, ...promo });
      setCouponSuccess(`Code "${cleanCode}" applied: ${promo.label}`);
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code. Try ROYAL10 or FREEDEL');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  // Recalculate totals with coupon & orderType
  const discountAmount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.type === 'percent') {
      return subtotal * appliedCoupon.value;
    }
    if (appliedCoupon.type === 'fixed') {
      return Math.min(subtotal, appliedCoupon.value);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  // Delivery Fee ($2.99, free for orders >= $35 or pickup)
  const deliveryFee = useMemo(() => {
    if (orderType === 'pickup' || subtotal === 0) return 0;
    if (appliedCoupon?.type === 'free_delivery') return 0;
    return subtotal >= 35 ? 0 : 2.99;
  }, [orderType, subtotal, appliedCoupon]);

  // Service Fee ($1.99, $0 if subtotal is 0 or pickup)
  const serviceFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return orderType === 'pickup' ? 0 : 1.99;
  }, [subtotal, orderType]);

  const effectiveSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = effectiveSubtotal * 0.08875;
  const grandTotal = effectiveSubtotal === 0 ? 0 : effectiveSubtotal + tax + deliveryFee + serviceFee;

  // Total savings calculation (for the green savings banner in Image 2)
  const totalSavings = useMemo(() => {
    let savings = discountAmount;
    if (orderType === 'delivery' && deliveryFee === 0 && subtotal >= 35) {
      savings += 2.99;
    }
    return savings;
  }, [discountAmount, orderType, deliveryFee, subtotal]);

  // Checkout Form State (Matching Image 2 inputs)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    streetAddress: '',
    aptSuite: '',
    crossStreet: '',
    deliveryNotes: '',
    paymentMethod: 'credit_card', // 'credit_card' | 'apple_pay' | 'cash_on_delivery'
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleCardNumberChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
    if (errors.cardNumber) setErrors((prev) => ({ ...prev, cardNumber: null }));
  };

  const handleCardExpChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setFormData((prev) => ({ ...prev, cardExp: raw }));
    if (errors.cardExp) setErrors((prev) => ({ ...prev, cardExp: null }));
  };

  const handleCardCvvChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setFormData((prev) => ({ ...prev, cardCvv: raw }));
    if (errors.cardCvv) setErrors((prev) => ({ ...prev, cardCvv: null }));
  };

  // Card brand detection (Visa, Mastercard, Amex)
  const getCardBrand = (num) => {
    const clean = (num || '').replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    return null;
  };

  // Validation & Order Submission
  const handleConfirmOrder = (e) => {
    if (e) e.preventDefault();
    const errs = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Valid phone number is required for SMS delivery updates';
    }

    if (orderType === 'delivery') {
      if (!formData.streetAddress.trim()) {
        errs.streetAddress = 'Manhattan delivery street address is required';
      }
    }

    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardName.trim()) errs.cardName = 'Name on card is required';
      const cleanCard = formData.cardNumber.replace(/\s+/g, '');
      if (!cleanCard || cleanCard.length < 15) {
        errs.cardNumber = 'Valid 16-digit card number is required';
      }
      if (!formData.cardExp.trim() || !formData.cardExp.includes('/')) {
        errs.cardExp = 'Expiration MM/YY is required';
      }
      if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) {
        errs.cardCvv = 'CVV required';
      }
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Successfully complete order
    completeOrder({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      streetAddress: formData.streetAddress,
      aptSuite: formData.aptSuite,
      crossStreet: formData.crossStreet,
      deliveryNotes: formData.deliveryNotes,
      orderType,
      kitchen: selectedKitchen,
      paymentMethod: formData.paymentMethod,
      cardLast4: formData.paymentMethod === 'credit_card' ? formData.cardNumber.replace(/\s+/g, '').slice(-4) : null,
      subtotal,
      discountAmount,
      appliedCoupon,
      tax,
      deliveryFee,
      serviceFee,
      total: grandTotal,
      specialInstructions,
    });

    setStep('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildReceiptText = () => {
    if (!lastOrder) return '';
    const isDel = lastOrder.orderType === 'delivery';
    let text = `👑 *MUGHLAI INDIAN CUISINE NYC - ORDER CONFIRMATION*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Order ID:* ${lastOrder.orderId}\n`;
    text += `*Kitchen:* Mughlai ${lastOrder.kitchen?.name || 'Upper East Side'} (${lastOrder.kitchen?.phone || '212-722-6262'})\n`;
    text += `*Order Type:* ${isDel ? 'Door Delivery' : 'Takeout / Pickup'}\n`;
    text += `*Customer:* ${lastOrder.fullName} (${lastOrder.phone})\n`;
    if (isDel) {
      text += `*Address:* ${lastOrder.streetAddress} ${lastOrder.aptSuite || ''}\n`;
    }
    text += `\n*ORDER ITEMS:*\n`;
    (lastOrder.items || []).forEach((item) => {
      text += `• ${item.quantity}x ${item.name} ($${(item.priceNum * item.quantity).toFixed(2)})\n`;
      if (item.isDeal) {
        text += `   - Appetizer: ${item.dealAppetizer}\n`;
        text += `   - Entrée: ${item.dealEntree}\n`;
      } else if (item.spiceLevel) {
        text += `   - Spice: ${item.spiceLevel}\n`;
      }
    });
    if (lastOrder.specialInstructions) {
      text += `\n*Note:* ${lastOrder.specialInstructions}\n`;
    }
    text += `\n*BILL SUMMARY:*\n`;
    text += `Subtotal: $${(lastOrder.subtotal || 0).toFixed(2)}\n`;
    text += `NYC Tax: $${(lastOrder.tax || 0).toFixed(2)}\n`;
    text += `Delivery: ${lastOrder.deliveryFee === 0 ? 'FREE' : '$' + (lastOrder.deliveryFee || 0).toFixed(2)}\n`;
    text += `*TOTAL AMOUNT: $${(lastOrder.total || 0).toFixed(2)}*\n`;
    text += `Payment: ${lastOrder.paymentMethod === 'cash_on_delivery' ? 'Pay upon receipt' : 'Credit Card'}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Thank you for dining with royalty! 100% Certified Halal.`;
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildReceiptText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const rawMsg = buildReceiptText();
    const encoded = encodeURIComponent(rawMsg);
    const rawPhone = (lastOrder?.kitchen?.phoneRaw || '+12127226262').replace(/\D/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${rawPhone}&text=${encoded}`, '_blank');
  };

  // Demo deal quick adder if cart is empty
  const handleAddDemoDeal = () => {
    addToCart(
      {
        id: 'deal-deluxe-preview',
        name: '$22.95 Delivery & Takeout Special Deal',
        price: 22.95,
        image: '/images/slider/special-dum-biryani-desktop.png',
        categoryName: 'Special Deals',
        isDeal: true,
      },
      {
        dealAppetizer: 'Crispy Vegetable Samosa',
        dealEntree: 'Chicken Tikka Masala',
        dealRice: 'Saffron Infused Basmati Rice',
        dealBread: 'Blistered Butter Garlic Naan',
        dealCondiments: 'House Mango Chutney & Cucumber Raita',
      }
    );
    setTimeout(() => {
      addToCart({
        id: 'biryani-special-preview',
        name: 'Mughlai Special Dum Biryani',
        price: 29.95,
        image: '/images/slider/special-dum-biryani-desktop.png',
        description: 'Freshly prepared in our authentic kitchen with whole roasted spices, fresh herbs, and pure ghee.',
        categoryName: 'Aromatic Biryanis',
      });
      addToCart({
        id: 'tandoori-chicken-preview',
        name: 'Clay Oven Tandoori Chicken',
        price: 25.95,
        image: '/images/slider/special-dum-biryani-desktop.png',
        description: 'Freshly prepared in our authentic kitchen with whole roasted spices, fresh herbs, and pure ghee.',
        categoryName: 'Tandoori Specialties',
      });
      addToCart({
        id: 'bread-basket-preview',
        name: 'Mughlai Bread Basket',
        price: 17.95,
        image: '/images/deal/04_Free_Naan_5_Images_800x533/01_Blistered_Butter_Garlic_Naan_800x533.jpg',
        description: 'Freshly prepared in our authentic kitchen with whole roasted spices, fresh herbs, and pure ghee.',
        categoryName: 'Breads from the Tandoor',
      });
    }, 50);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-[#F5EFEB] py-6 sm:py-10 pb-16 font-proxima">
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {step === 'success' && lastOrder ? (
          /* ================================================================= */
          /* IN-PAGE ORDER CONFIRMATION & RECEIPT VIEW (ZERO POPUP WINDOWS)    */
          /* ================================================================= */
          <div className="max-w-2xl mx-auto bg-[#171414] border-2 border-mughlai-gold/60 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn space-y-0 text-white font-proxima">
            {/* Celebration Header */}
            <div className="bg-gradient-to-r from-mughlai-maroon via-mughlai-red to-[#1A0508] p-6 sm:p-8 text-center border-b border-mughlai-gold/30 relative">
              <div className="flex items-center justify-center mb-4">
                <img
                  src={getAssetUrl('/brand/MIC-Logo-New-v2.svg')}
                  alt="Mughlai Indian Cuisine"
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow"
                />
              </div>

              <div className="w-16 h-16 rounded-full bg-mughlai-gold/20 border-2 border-mughlai-gold mx-auto flex items-center justify-center text-mughlai-gold shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-3">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Royal Order Placed Successfully!
              </h2>

              <p className="text-xs sm:text-sm text-[#DCCC7B] mt-1.5 font-swiss">
                Order ID: <strong className="font-mono text-white text-base font-extrabold">{lastOrder.orderId}</strong>
              </p>
            </div>

            {/* Receipt Body */}
            <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-proxima">
              
              {/* Delivery / Pickup Status Pill */}
              <div className="bg-[#0F0D0D] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0">
                    {lastOrder.orderType === 'delivery' ? <Truck className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-mughlai-gold font-bold block">
                      {lastOrder.orderType === 'delivery' ? 'Manhattan Courier Delivery' : 'Hot Takeout Pickup'}
                    </span>
                    <p className="font-bold text-white text-sm">
                      Kitchen: Mughlai {lastOrder.kitchen?.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {lastOrder.kitchen?.address} • Phone: {lastOrder.kitchen?.phone}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-white/10 sm:pl-4">
                  <span className="text-[10px] text-gray-400 block font-mono">ESTIMATED TIME</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    {lastOrder.orderType === 'delivery' ? '30 – 45 Mins' : '15 – 20 Mins'}
                  </span>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="bg-[#0F0D0D] border border-white/10 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                  Delivery & Contact Information:
                </span>
                <p className="font-bold text-white text-sm">
                  {lastOrder.fullName} • <span className="font-mono text-mughlai-goldLight">{lastOrder.phone}</span>
                </p>
                {lastOrder.orderType === 'delivery' && (
                  <p className="text-gray-300">
                    {lastOrder.streetAddress} {lastOrder.aptSuite ? `(${lastOrder.aptSuite})` : ''}
                  </p>
                )}
                {lastOrder.specialInstructions && (
                  <p className="text-[11px] text-mughlai-goldLight italic pt-1 border-t border-white/5">
                    Note: "{lastOrder.specialInstructions}"
                  </p>
                )}
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
                  Ordered Dishes ({lastOrder.items?.length || 0}):
                </span>
                <div className="bg-[#0F0D0D] border border-white/10 rounded-2xl divide-y divide-white/5 p-4 max-h-56 overflow-y-auto">
                  {(lastOrder.items || []).map((item, idx) => (
                    <div key={idx} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-white">
                          <span className="text-mughlai-gold font-mono mr-1.5">{item.quantity}x</span>
                          {item.name}
                        </p>
                        {item.isDeal ? (
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Appetizer: {item.dealAppetizer} • Entrée: {item.dealEntree}
                          </p>
                        ) : item.spiceLevel ? (
                          <p className="text-[11px] text-mughlai-goldLight mt-0.5">
                            Spice: {item.spiceLevel}
                          </p>
                        ) : null}
                      </div>
                      <span className="font-mono text-gray-300 shrink-0 font-medium">
                        ${((item.priceNum || 0) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Totals */}
              <div className="bg-[#0F0D0D] border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${(lastOrder.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>NYC Sales Tax (8.875%)</span>
                  <span className="font-mono text-white">${(lastOrder.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-white">
                    {lastOrder.deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `$${(lastOrder.deliveryFee || 0).toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base font-bold text-white">
                  <span>Total Paid / Due</span>
                  <span className="font-mono text-2xl text-mughlai-gold">
                    ${(lastOrder.total || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Direct Actions (WhatsApp, Copy Receipt, Back to Menu) */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Send Receipt via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/10 transition flex items-center justify-center gap-1.5"
                >
                  <Check className={`w-4 h-4 ${copied ? 'text-emerald-400' : 'text-gray-400'}`} />
                  <span>{copied ? 'Copied Receipt!' : 'Copy Receipt'}</span>
                </button>

                <Link
                  to="/menu"
                  onClick={() => setStep('cart')}
                  className="py-3.5 px-5 rounded-xl bg-mughlai-red hover:bg-mughlai-ruby text-white font-bold text-xs sm:text-sm text-center transition flex items-center justify-center gap-1.5"
                >
                  <span>Order Another Feast</span>
                </Link>
              </div>

            </div>
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-[#171414] border border-white/10 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-mughlai-gold mx-auto shadow-inner">
              <UtensilsCrossed className="w-10 h-10 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Your Royal Bag is Empty
              </h2>
              <p className="text-sm text-gray-400 max-w-md mx-auto font-swiss leading-relaxed">
                Experience the authentic taste of royal slow-simmered gravies, live tandoor breads, or craft our famous $22.95 5-piece combination deal!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/menu"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-mughlai-red to-mughlai-flame text-white text-sm font-bold shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 active:scale-95"
              >
                <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
                <span>Explore Our Menu</span>
              </Link>

              <button
                type="button"
                onClick={handleAddDemoDeal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-mughlai-goldLight hover:text-white border border-mughlai-gold/40 text-sm font-semibold transition flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-mughlai-gold" />
                <span>Load Sample Feast</span>
              </button>
            </div>
          </div>
        ) : step === 'cart' ? (
          /* ================================================================= */
          /* STEP 1: REVIEW ROYAL FEAST TRAY (Image 1 View)                   */
          /* ================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start animate-fadeIn">
            
            {/* LEFT COLUMN: Shopping Cart List (60% width) */}
            <div className="space-y-6 min-w-0">
              
              {/* Header */}
              <div className="pb-1">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight">
                  Your Royal Feast Tray
                </h1>
                <p className="text-sm font-semibold text-mughlai-gold mt-1.5 font-swiss">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>

              {/* Product Cards List */}
              <div className="space-y-3.5">
                {items.map((item) => {
                  const itemDescription = item.description || FULL_MENU.find(
                    (m) => m.id === item.id || m.name.toLowerCase() === item.name.toLowerCase()
                  )?.description || '';

                  return (
                    <div 
                      key={item.cartId}
                      className="bg-[#171414] border border-white/10 hover:border-mughlai-gold/40 rounded-2xl p-4 sm:p-5 transition shadow-lg relative group font-proxima"
                    >
                      <div className="flex gap-4 sm:gap-5 items-start">
                        {/* Thumbnail Image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10 relative">
                          <img
                            src={item.image || '/images/slider/special-dum-biryani-desktop.png'}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/images/slider/special-dum-biryani-desktop.png';
                            }}
                          />
                          {item.isDeal && (
                            <span className="absolute bottom-1 left-1 right-1 bg-mughlai-red/90 text-white text-[9px] font-mono font-bold py-0.5 text-center rounded">
                              $22.95 DEAL
                            </span>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0 pr-6">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                              {preventOrphans(item.name)}
                            </h3>
                          </div>

                          {/* Deal Bundle Selection Details */}
                          {item.isDeal ? (
                            <div className="mt-2 space-y-1 text-xs text-gray-300 font-swiss">
                              {item.dealAppetizer && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-mughlai-gold font-semibold">Appetizer:</span>
                                  <span className="text-gray-200">{item.dealAppetizer}</span>
                                </p>
                              )}
                              {item.dealEntree && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-mughlai-gold font-semibold">Entrée:</span>
                                  <span className="text-gray-200">{item.dealEntree}</span>
                                </p>
                              )}
                              {item.dealRice && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-mughlai-gold font-semibold">Sides:</span>
                                  <span className="text-gray-200">{item.dealRice}</span>
                                </p>
                              )}
                              {item.dealBread && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-mughlai-gold font-semibold">Bread:</span>
                                  <span className="text-gray-200">{item.dealBread}</span>
                                </p>
                              )}
                              {item.dealCondiments && (
                                <p className="flex items-center gap-1.5">
                                  <span className="text-mughlai-gold font-semibold">Condiments:</span>
                                  <span className="text-gray-200">{item.dealCondiments}</span>
                                </p>
                              )}
                            </div>
                          ) : (
                            <>
                              {itemDescription && (
                                <p className="text-xs text-gray-400 font-swiss line-clamp-2 mt-1 leading-relaxed">
                                  {itemDescription}
                                </p>
                              )}
                              {item.spiceLevel && (
                                <p className="text-xs text-mughlai-goldLight font-medium mt-1.5 flex items-center gap-1 font-swiss">
                                  <Flame className="w-3.5 h-3.5 text-mughlai-flame shrink-0" />
                                  <span>Spice Level: <strong>{item.spiceLevel}</strong></span>
                                </p>
                              )}
                            </>
                          )}

                          {/* Price & Quantity Controls */}
                          <div className="mt-3.5 flex items-center justify-between">
                            <div className="flex items-center bg-[#0D0B0B] border border-white/10 rounded-xl p-1 gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, -1)}
                                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center justify-center transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs sm:text-sm font-mono font-bold text-white px-1.5 min-w-[20px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartId, 1)}
                                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white flex items-center justify-center transition"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <span className="font-mono text-base sm:text-lg font-bold text-mughlai-gold">
                                ${(item.priceNum * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition p-1"
                          title="Remove from Tray"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chef Special Preparation Instructions */}
              <div className="bg-[#171414] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                  <MessageSquare className="w-4 h-4 text-mughlai-gold" />
                  <span>Chef's Special Preparation Instructions</span>
                  <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                </div>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Allergies, extra spicy, sauce on the side, cut naan into 4 pieces..."
                  rows={2}
                  className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold/60 focus:ring-1 focus:ring-mughlai-gold/40 transition font-swiss"
                />
              </div>

              {/* Trust Badges */}
              <div className="bg-[#171414] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 font-proxima">
                <div className="flex items-center gap-2.5 shrink-0">
                  <Leaf className="w-5 h-5 text-mughlai-gold shrink-0" />
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">100% Halal Meats</p>
                    <p className="text-[10.5px] text-gray-400 font-swiss mt-0.5">Prepared Fresh Daily</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Truck className="w-5 h-5 text-mughlai-gold shrink-0" />
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">Authentic Mughlai Taste</p>
                    <p className="text-[10.5px] text-gray-400 font-swiss mt-0.5">From Our Kitchen to You</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-mughlai-gold shrink-0" />
                  <div>
                    <p className="text-xs sm:text-[13px] font-bold text-white leading-tight">Fresh & High Quality</p>
                    <p className="text-[10.5px] text-gray-400 font-swiss mt-0.5">Always Made with Care</p>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Unified Secure Checkout Panel (40% width) */}
            <div className="lg:sticky lg:top-24 min-w-0">
              <div className="bg-[#141212] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 font-proxima">
                
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#241E15] border border-mughlai-gold/40 flex items-center justify-center text-mughlai-gold shrink-0">
                    <Lock className="w-5 h-5 text-mughlai-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white leading-tight">Secure Checkout</h3>
                    <p className="text-xs text-gray-400 font-swiss mt-0.5">Your information is safe</p>
                  </div>
                </div>

                {/* Delivery vs Pickup Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-[#0C0A0A] p-1.5 rounded-2xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                      orderType === 'delivery'
                        ? 'bg-gradient-to-r from-[#D92228] to-[#B3171C] text-white shadow-lg shadow-red-950/50'
                        : 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Car className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs sm:text-sm leading-tight">Delivery</span>
                      <span className="block text-[10px] text-white/80 leading-tight">Get it at your doorstep</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 transition text-left ${
                      orderType === 'pickup'
                        ? 'bg-gradient-to-r from-[#D92228] to-[#B3171C] text-white shadow-lg shadow-red-950/50'
                        : 'bg-transparent text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs sm:text-sm leading-tight text-white">Pickup</span>
                      <span className="block text-[10px] text-gray-400 leading-tight whitespace-nowrap">Pick up from restaurant</span>
                    </div>
                  </button>
                </div>

                {/* Location Selection Dropdown */}
                <div className="bg-[#0C0A0A] border border-white/10 rounded-2xl p-3 sm:p-3.5 relative">
                  <div 
                    onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                    className="flex items-center justify-between gap-3 cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-mughlai-gold/10 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0 group-hover:scale-105 transition-transform">
                        <MapPin className="w-4 h-4 text-mughlai-gold" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] sm:text-[11px] text-gray-400 block leading-tight">
                          {orderType === 'delivery' ? 'Delivering from' : 'Pickup at'}
                        </span>
                        <span className="font-bold text-xs sm:text-[13px] text-white group-hover:text-mughlai-gold transition truncate block mt-0.5">
                          {selectedKitchen?.name || 'Upper East Side'} ({selectedKitchen?.neighborhood?.split('/')[0]?.trim() || 'Yorkville'})
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 text-mughlai-gold group-hover:text-white transition shrink-0">
                      <ChevronDown className={`w-4 h-4 text-mughlai-gold transition-transform duration-200 ${locationDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {locationDropdownOpen && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 animate-fadeIn">
                      <p className="text-[11px] font-mono text-mughlai-gold uppercase tracking-wider mb-2">
                        Select Manhattan Kitchen:
                      </p>
                      {LOCATIONS.map((loc) => {
                        const isSelected = selectedKitchen?.id === loc.id;
                        return (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() => {
                              setSelectedKitchen(loc);
                              setLocationDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between text-xs ${
                              isSelected 
                                ? 'bg-mughlai-gold/15 border border-mughlai-gold/50 text-white' 
                                : 'bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-gray-300'
                            }`}
                          >
                            <div>
                              <p className="font-bold text-white flex items-center gap-1.5">
                                <span>{loc.name}</span>
                                <span className="text-[10.5px] font-normal text-gray-400">({loc.neighborhood?.split('/')[0]?.trim()})</span>
                              </p>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-mughlai-gold shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3 Trust Badges Row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#0C0A0A] border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-mughlai-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none truncate">
                        {orderType === 'delivery' ? 'Est. Delivery' : 'Est. Pickup'}
                      </p>
                      <p className="text-[11px] font-bold text-white mt-1 leading-tight truncate">
                        {orderType === 'delivery' ? '30 – 45 mins' : '15 – 20 mins'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0C0A0A] border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center gap-2">
                    <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none truncate">Authentic</p>
                      <p className="text-[11px] font-bold text-white mt-1 leading-tight truncate">Mughlai Cuisine</p>
                    </div>
                  </div>

                  <div className="bg-[#0C0A0A] border border-white/10 rounded-xl p-2 sm:p-2.5 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-mughlai-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none truncate">100% Halal</p>
                      <p className="text-[11px] font-bold text-white mt-1 leading-tight truncate">Prepared Fresh</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base sm:text-lg text-white">Order Summary</h4>
                    <span className="text-xs sm:text-sm font-semibold text-mughlai-gold font-mono">
                      {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <div className="border-t border-white/10 my-2" />

                  <div className="space-y-2 text-xs sm:text-sm font-swiss text-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Items Subtotal</span>
                      <span className="font-mono text-white font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center text-emerald-400">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Estimated NYC Tax (8.875%)</span>
                      <span className="font-mono text-white font-medium">${tax.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span className="font-mono text-white font-medium">
                        {orderType === 'pickup' ? (
                          <span className="text-emerald-400 font-semibold">FREE</span>
                        ) : deliveryFee === 0 ? (
                          <span className="text-emerald-400 font-semibold">FREE</span>
                        ) : (
                          `$${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center gap-1.5" title="Covers secure packaging, utensils and order dispatch">
                        <span>Service Fee</span>
                        <Info className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300 cursor-pointer" />
                      </span>
                      <span className="font-mono text-white font-medium">
                        {serviceFee === 0 ? '$0.00' : `$${serviceFee.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 my-2" />

                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-base sm:text-lg text-white">Estimated Total</span>
                    <span className="font-mono font-black text-2xl sm:text-3xl text-mughlai-gold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Accordion */}
                <div className="bg-[#0C0A0A] border border-white/10 rounded-2xl overflow-hidden transition">
                  <button
                    type="button"
                    onClick={() => setPromoExpanded(!promoExpanded)}
                    className="w-full p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition"
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-200 font-medium">
                      <Tag className="w-4 h-4 text-mughlai-gold" />
                      <span>Have a promo code?</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-mughlai-gold transition-transform duration-200 ${promoExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {(promoExpanded || appliedCoupon) && (
                    <div className="p-3 sm:p-3.5 pt-0 border-t border-white/5 space-y-2 mt-1">
                      {appliedCoupon ? (
                        <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between gap-2 mt-2">
                          <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <span className="font-mono font-bold">{appliedCoupon.code}</span>
                              <p className="text-[10px] text-emerald-400">{appliedCoupon.label}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="text-xs text-red-400 hover:text-red-300 underline font-mono"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyCoupon} className="space-y-2 mt-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={couponInput}
                              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                              placeholder="Enter Promo Code"
                              className="flex-1 min-w-0 bg-[#161414] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold/60 focus:ring-1 focus:ring-mughlai-gold/40 transition font-mono uppercase"
                            />
                            <button
                              type="submit"
                              className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white border border-mughlai-gold/40 text-xs font-bold transition shadow active:scale-95"
                            >
                              Apply
                            </button>
                          </div>

                          {couponError && (
                            <p className="text-xs text-red-400 flex items-center gap-1.5 pt-0.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{couponError}</span>
                            </p>
                          )}

                          <p className="text-[10.5px] text-gray-400 font-mono">
                            Try: <span className="text-mughlai-gold cursor-pointer hover:underline" onClick={() => setCouponInput('ROYAL10')}>ROYAL10</span> or <span className="text-mughlai-gold cursor-pointer hover:underline" onClick={() => setCouponInput('FREEDEL')}>FREEDEL</span>
                          </p>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {/* PROCEED TO CHECKOUT BUTTON -> Switches to in-page Checkout view (Image 2) */}
                <button
                  type="button"
                  onClick={() => {
                    setStep('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF1E27] via-[#E51B23] to-[#B3141B] text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/50 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2.5 group"
                >
                  <Lock className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Terms of Service & Privacy */}
                <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                  By continuing, you agree to our{' '}
                  <Link to="/policies?tab=terms" className="underline text-gray-300 hover:text-white">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/policies?tab=privacy" className="underline text-gray-300 hover:text-white">
                    Privacy Policy
                  </Link>.
                </p>

                {/* Security Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-left">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-mughlai-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white leading-tight">Secure Payments</p>
                      <p className="text-[10px] text-gray-400 leading-tight mt-0.5">SSL Encrypted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-mughlai-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white leading-tight">All Major Cards</p>
                      <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Accepted</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-mughlai-gold shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white leading-tight">Trusted by</p>
                      <p className="text-[10px] text-gray-400 leading-tight mt-0.5">NYC Food Lovers</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ================================================================= */
          /* STEP 2: IN-PAGE CHECKOUT & PAYMENT FLOW (Image 2 Layout)          */
          /* ================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start animate-fadeIn font-proxima">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT COLUMN: Checkout Form & Information (Image 2 Left Side)  */}
            {/* ------------------------------------------------------------- */}
            <div className="space-y-6 min-w-0">
              
              {/* Top Back Navigation Button */}
              <div className="flex items-center justify-between pb-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition group py-2 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  <ArrowLeft className="w-4 h-4 text-mughlai-gold group-hover:-translate-x-1 transition-transform" />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-mughlai-goldLight">
                  <Lock className="w-3.5 h-3.5 text-mughlai-gold" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>

              {/* 1. Fulfillment Radio Cards (Delivery vs Pickup, Exactly like Image 2) */}
              <div className="space-y-3">
                {/* Option 1: Delivery Card */}
                <div
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                    orderType === 'delivery'
                      ? 'border-mughlai-gold bg-gradient-to-r from-mughlai-red/20 via-[#1F1818] to-[#161414] shadow-[0_4px_20px_rgba(212,175,55,0.15)] ring-1 ring-mughlai-gold/40'
                      : 'border-white/10 bg-[#171414] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      orderType === 'delivery' ? 'border-mughlai-gold bg-mughlai-gold' : 'border-gray-500 bg-transparent'
                    }`}>
                      {orderType === 'delivery' && <div className="w-2 h-2 rounded-full bg-[#121212]" />}
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">
                        Get it delivered in only 30 minutes
                      </p>
                      <p className="text-xs text-gray-400 font-swiss mt-0.5 truncate">
                        Fresh from clay oven to your Manhattan address
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-full bg-mughlai-gold/15 text-mughlai-gold border border-mughlai-gold/30 font-semibold shrink-0">
                    {deliveryFee === 0 ? 'FREE' : '$2.99'}
                  </span>
                </div>

                {/* Option 2: Pickup Card */}
                <div
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                    orderType === 'pickup'
                      ? 'border-mughlai-gold bg-gradient-to-r from-mughlai-red/20 via-[#1F1818] to-[#161414] shadow-[0_4px_20px_rgba(212,175,55,0.15)] ring-1 ring-mughlai-gold/40'
                      : 'border-white/10 bg-[#171414] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      orderType === 'pickup' ? 'border-mughlai-gold bg-mughlai-gold' : 'border-gray-500 bg-transparent'
                    }`}>
                      {orderType === 'pickup' && <div className="w-2 h-2 rounded-full bg-[#121212]" />}
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-bold text-white leading-tight">
                        Pickup available in 5 stores near you
                      </p>
                      <p className="text-xs text-gray-400 font-swiss mt-0.5 truncate">
                        Ready in 15 – 20 mins • Pick up hot from {selectedKitchen.name}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 font-semibold shrink-0">
                    FREE Pickup
                  </span>
                </div>
              </div>

              {/* 2. Shipping / Delivery Address Section (Image 2 "Shipping address") */}
              <div className="bg-[#171414] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-mughlai-gold" />
                    <span>{orderType === 'delivery' ? 'Shipping address' : 'Pickup Kitchen & Contact'}</span>
                  </h3>
                  {orderType === 'delivery' && (
                    <span className="text-[11px] text-mughlai-gold font-mono">Manhattan Only</span>
                  )}
                </div>

                {orderType === 'delivery' ? (
                  <div className="space-y-3">
                    <div className="bg-mughlai-red/10 border border-mughlai-gold/25 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-gray-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-mughlai-gold shrink-0" />
                      <span>Direct courier delivery is provided from our 5 kitchens exclusively across Manhattan.</span>
                    </div>

                    {/* Street Address Input with edit style */}
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Street Address *</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          placeholder="e.g. 1724 2nd Avenue, Apt 4B"
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-3 px-3.5 pr-10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                            errors.streetAddress ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        <Edit3 className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.streetAddress && <p className="text-[10px] text-red-400 mt-1">{errors.streetAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Apt / Suite / Floor</label>
                        <input
                          type="text"
                          name="aptSuite"
                          value={formData.aptSuite}
                          onChange={handleInputChange}
                          placeholder="e.g. Apt 4B, Floor 2"
                          className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Cross Street (Optional)</label>
                        <input
                          type="text"
                          name="crossStreet"
                          value={formData.crossStreet}
                          onChange={handleInputChange}
                          placeholder="e.g. Between 94th & 95th St"
                          className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                        />
                      </div>
                    </div>

                    {/* Customer Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Recipient Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. John Doe"
                            className={`w-full bg-[#0D0B0B] border rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                              errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-mughlai-gold'
                            }`}
                          />
                        </div>
                        {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Phone Number (For SMS Updates) *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 212-555-0199"
                            className={`w-full bg-[#0D0B0B] border rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                              errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-mughlai-gold'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Fulfilling Kitchen Selector for Delivery */}
                    <div className="pt-2">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Flame className="w-4 h-4 text-mughlai-flame shrink-0" />
                          <span>Fulfilling Kitchen: <strong className="text-white">Mughlai {selectedKitchen.name}</strong></span>
                        </div>
                        <CustomSelect
                          value={selectedKitchen.id}
                          onChange={(e) => {
                            const loc = LOCATIONS.find((l) => l.id === e.target.value);
                            if (loc) setSelectedKitchen(loc);
                          }}
                          options={LOCATIONS.map((loc) => ({
                            value: loc.id,
                            label: loc.name,
                            subLabel: loc.neighborhood.split('/')[0],
                          }))}
                          align="right"
                          buttonClassName="bg-[#0C0A0A] border-white/15 text-mughlai-goldLight text-xs py-1.5 px-3 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Pickup Details & Kitchen Info */
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#0C0A0A] border border-mughlai-gold/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm sm:text-base">
                          {selectedKitchen.name} Kitchen
                        </span>
                        <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                          Open Today 11:30 AM – 10:30 PM
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">{selectedKitchen.address}, {selectedKitchen.cityStateZip}</p>
                      <p className="text-xs text-mughlai-gold font-mono">Phone: {selectedKitchen.phone}</p>
                      
                      <div className="pt-2">
                        <CustomSelect
                          value={selectedKitchen.id}
                          onChange={(e) => {
                            const loc = LOCATIONS.find((l) => l.id === e.target.value);
                            if (loc) setSelectedKitchen(loc);
                          }}
                          options={LOCATIONS.map((loc) => ({
                            value: loc.id,
                            label: `Change: ${loc.name}`,
                            subLabel: loc.neighborhood.split('/')[0],
                          }))}
                          buttonClassName="w-full bg-[#161414] border-mughlai-gold/40 text-mughlai-gold text-xs py-2 px-3 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                            errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Phone Number (For Ready Alert) *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 212-555-0199"
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                            errors.phone ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Payment Information Section (Image 2 "Payment information") */}
              <div className="bg-[#171414] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                <h3 className="font-bold text-sm sm:text-base text-white">Payment information</h3>

                {/* Method Badges Selector (Card, Apple Pay, Cash on Delivery) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {/* Card Pill */}
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'credit_card' }))}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      formData.paymentMethod === 'credit_card'
                        ? 'border-mughlai-gold bg-mughlai-gold/15 text-white shadow ring-1 ring-mughlai-gold/40'
                        : 'border-white/10 bg-[#0C0A0A] text-gray-400 hover:text-white'
                    }`}
                  >
                    {/* Mastercard dual circle icon */}
                    <div className="flex -space-x-1.5 items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                    </div>
                    <span className="text-xs font-bold font-mono">Card</span>
                  </button>

                  {/* Apple / Google Pay Pill */}
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'apple_pay' }))}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      formData.paymentMethod === 'apple_pay'
                        ? 'border-mughlai-gold bg-mughlai-gold/15 text-white shadow ring-1 ring-mughlai-gold/40'
                        : 'border-white/10 bg-[#0C0A0A] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-mughlai-gold" />
                    <span className="text-xs font-bold">Apple Pay</span>
                  </button>

                  {/* Cash / Card on Delivery Pill */}
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cash_on_delivery' }))}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                      formData.paymentMethod === 'cash_on_delivery'
                        ? 'border-mughlai-gold bg-mughlai-gold/15 text-white shadow ring-1 ring-mughlai-gold/40'
                        : 'border-white/10 bg-[#0C0A0A] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-mughlai-gold" />
                    <span className="text-xs font-bold">Pay Later</span>
                  </button>
                </div>

                {/* Card Fields Form (If Card is selected) */}
                {formData.paymentMethod === 'credit_card' ? (
                  <div className="space-y-3 pt-1">
                    {/* Name on card */}
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Name on card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="Full name as printed on card"
                        className={`w-full bg-[#0D0B0B] border rounded-xl py-3 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                          errors.cardName ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                        }`}
                      />
                      {errors.cardName && <p className="text-[10px] text-red-400 mt-1">{errors.cardName}</p>}
                    </div>

                    {/* Card number with Mastercard icon inside (Image 2 style) */}
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Card number</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="•••• •••• •••• ••••"
                          maxLength={19}
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-3 pl-3.5 pr-14 text-xs sm:text-sm text-white placeholder-gray-500 font-mono tracking-wider focus:outline-none transition ${
                            errors.cardNumber ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                          {getCardBrand(formData.cardNumber) === 'visa' ? (
                            <span className="font-extrabold italic text-blue-400 text-xs tracking-tighter">VISA</span>
                          ) : getCardBrand(formData.cardNumber) === 'amex' ? (
                            <span className="font-bold text-sky-400 text-[10px] font-mono border border-sky-400 px-1 rounded">AMEX</span>
                          ) : (
                            <div className="flex -space-x-1.5 items-center">
                              <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                              <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90" />
                            </div>
                          )}
                        </div>
                      </div>
                      {errors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiration & CVV Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">Expiration</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleCardExpChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-3 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 font-mono text-center focus:outline-none transition ${
                            errors.cardExp ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        {errors.cardExp && <p className="text-[10px] text-red-400 mt-1">{errors.cardExp}</p>}
                      </div>

                      <div>
                        <label className="text-[11px] text-gray-300 block mb-1">CVV</label>
                        <input
                          type="password"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleCardCvvChange}
                          placeholder="CVV"
                          maxLength={4}
                          className={`w-full bg-[#0D0B0B] border rounded-xl py-3 px-3.5 text-xs sm:text-sm text-white placeholder-gray-500 font-mono text-center focus:outline-none transition ${
                            errors.cardCvv ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                          }`}
                        />
                        {errors.cardCvv && <p className="text-[10px] text-red-400 mt-1">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                ) : formData.paymentMethod === 'apple_pay' ? (
                  <div className="p-4 rounded-xl bg-[#0C0A0A] border border-white/10 text-center space-y-2">
                    <Smartphone className="w-8 h-8 text-mughlai-gold mx-auto" />
                    <p className="text-xs sm:text-sm font-bold text-white">Apple Pay / Google Pay Express</p>
                    <p className="text-xs text-gray-400">
                      You will authenticate with Face ID, Touch ID, or Google Wallet when you confirm payment.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#0C0A0A] border border-white/10 space-y-1.5">
                    <div className="flex items-center gap-2 text-mughlai-gold font-bold text-xs sm:text-sm">
                      <Banknote className="w-4 h-4" />
                      <span>Pay Upon {orderType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Pay with cash or contactless card directly to our delivery courier or at the restaurant counter.
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Actions: Back and Confirm Payment (Matching Image 2) */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('cart');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white font-bold text-xs sm:text-sm transition"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF1E27] via-[#E51B23] to-[#B3141B] text-white font-bold text-sm sm:text-base shadow-xl shadow-red-950/50 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2.5 group"
                >
                  <Lock className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Confirm Payment ${grandTotal.toFixed(2)}</span>
                </button>
              </div>

            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Order Summary & Coupon (Image 2 Right Side)     */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:sticky lg:top-24 min-w-0 space-y-4">
              <div className="bg-[#141212] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 font-proxima">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-1 border-b border-white/10">
                  <h3 className="font-bold text-base sm:text-lg text-white">Order Summary</h3>
                  <span className="text-xs text-mughlai-gold font-mono font-semibold">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Items List with Trash Icons (Exact Image 2 Structure) */}
                <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1 divide-y divide-white/5">
                  {items.map((item) => (
                    <div key={item.cartId} className="pt-2.5 first:pt-0 flex items-start justify-between gap-3 text-xs">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-white text-[13px] leading-snug">
                          <span className="text-mughlai-gold font-mono mr-1">x{item.quantity}</span>
                          {item.name}
                        </p>
                        {item.isDeal ? (
                          <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                            {item.dealAppetizer} • {item.dealEntree}
                          </p>
                        ) : item.spiceLevel ? (
                          <p className="text-[11px] text-mughlai-goldLight/80 mt-0.5">
                            Spice: {item.spiceLevel}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="font-mono text-white font-medium text-[13px]">
                          ${(item.priceNum * item.quantity).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          className="p-1 text-gray-500 hover:text-red-400 transition"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-2" />

                {/* Cost Breakdown (Image 2 style) */}
                <div className="space-y-2 text-xs sm:text-sm font-swiss text-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Delivery</span>
                    <span className="font-mono text-white font-medium">
                      {orderType === 'pickup' ? (
                        <span className="text-emerald-400 font-semibold">FREE</span>
                      ) : deliveryFee === 0 ? (
                        <span className="text-emerald-400 font-semibold">FREE</span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Discount</span>
                    <span className="font-mono font-medium">
                      {discountAmount > 0 ? (
                        <span className="text-emerald-400 font-bold">-${discountAmount.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-400">$0.00</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total (exc tax)</span>
                    <span className="font-mono text-white font-medium">${effectiveSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tax</span>
                    <span className="font-mono text-white font-medium">${tax.toFixed(2)}</span>
                  </div>

                  {serviceFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Service Fee</span>
                      <span className="font-mono text-white font-medium">${serviceFee.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 my-2" />

                {/* Grand Order Total */}
                <div className="flex justify-between items-center pt-1">
                  <span className="font-bold text-base sm:text-lg text-white">Order Total</span>
                  <span className="font-mono font-black text-2xl sm:text-3xl text-mughlai-gold">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>

                {/* Green Savings Pill (Matching Image 2: "Your total saving on this order $34.99") */}
                {totalSavings > 0 && (
                  <div className="bg-[#0B1E14] border border-emerald-500/50 rounded-2xl p-3.5 flex items-center justify-between text-emerald-300 shadow-[0_2px_15px_rgba(16,185,129,0.15)] animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-semibold text-emerald-200">
                        Your total saving on this order
                      </span>
                    </div>
                    <span className="font-mono font-bold text-base sm:text-lg text-emerald-400">
                      ${totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Coupon Code Input & Apply Box (Exact Image 2 Bottom Layout) */}
                <div className="bg-[#0C0A0A] border border-white/10 rounded-2xl p-3">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono font-bold">{appliedCoupon.code}</span>
                        <span className="text-[10px] text-emerald-400">({appliedCoupon.label})</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs text-red-400 hover:text-red-300 underline font-mono"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                            placeholder="Coupon code"
                            className="w-full bg-[#161414] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold font-mono uppercase"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition active:scale-95"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-[11px] text-red-400 flex items-center gap-1 pt-0.5">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{couponError}</span>
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Trust Seals */}
                <div className="flex items-center justify-between pt-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-mughlai-gold" />
                    <span>100% Halal Certified</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-mughlai-gold" />
                    <span>Safe & Encrypted</span>
                  </span>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
