import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Flame, 
  CheckCircle2, 
  Building2, 
  ArrowLeft,
  Sparkles,
  Lock,
  Truck,
  ShoppingBag,
  Smartphone
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LOCATIONS } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import CustomSelect from './CustomSelect';

export default function CheckoutModal() {
  const navigate = useNavigate();
  const {
    items,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    tax,
    deliveryFee,
    total,
    selectedKitchen,
    setSelectedKitchen,
    specialInstructions,
    completeOrder,
  } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
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

  if (!isCheckoutOpen) return null;

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

  const getCardBrand = (num) => {
    const clean = (num || '').replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
    if (/^3[47]/.test(clean)) return 'amex';
    return null;
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Valid phone number is required';
    }
    if (orderType === 'delivery') {
      if (!formData.streetAddress.trim()) errs.streetAddress = 'Delivery street address is required';
    }
    if (formData.paymentMethod === 'credit_card') {
      if (!formData.cardName.trim()) errs.cardName = 'Name on card is required';
      const cleanCard = formData.cardNumber.replace(/\s+/g, '');
      if (!cleanCard || cleanCard.length < 15) errs.cardNumber = 'Valid 16-digit card number is required';
      if (!formData.cardExp.trim() || !formData.cardExp.includes('/')) errs.cardExp = 'MM/YY required';
      if (!formData.cardCvv.trim() || formData.cardCvv.length < 3) errs.cardCvv = 'CVV required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    completeOrder({
      ...formData,
      orderType,
      kitchen: selectedKitchen,
      subtotal,
      tax,
      deliveryFee,
      total,
      specialInstructions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-proxima">
      <div 
        className="bg-[#181616] border-2 border-mughlai-gold/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-mughlai-maroon via-mughlai-red to-[#1A0508] p-5 sm:p-6 border-b border-mughlai-gold/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                closeCheckout();
                navigate('/bag');
              }}
              className="p-2 rounded-xl bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white transition"
              title="Back to Tray"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="font-proxima text-xl sm:text-2xl font-bold leading-tight">
                {preventOrphans("Checkout & Place Order")}
              </h3>
              <p className="text-xs text-[#DCCC7B] mt-0.5">
                {items.length} dishes • Total: <strong className="font-mono text-white">${total.toFixed(2)}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCheckout}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white transition"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* 1. Fulfillment Radio Option Cards (Matching Image 2) */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono font-bold text-mughlai-gold uppercase tracking-wider block">
              Step 1: Choose Fulfillment
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                  orderType === 'delivery'
                    ? 'border-mughlai-gold bg-gradient-to-r from-mughlai-red/30 to-mughlai-gold/15 text-white ring-1 ring-mughlai-gold/40'
                    : 'border-white/10 bg-[#141212] text-gray-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-mughlai-red/25 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold">Door Delivery</span>
                  <span className="block text-[10px] text-gray-400">In 30 – 45 mins</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 ${
                  orderType === 'pickup'
                    ? 'border-mughlai-gold bg-gradient-to-r from-mughlai-red/30 to-mughlai-gold/15 text-white ring-1 ring-mughlai-gold/40'
                    : 'border-white/10 bg-[#141212] text-gray-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-mughlai-red/25 border border-mughlai-gold/30 flex items-center justify-center text-mughlai-gold shrink-0">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm font-bold">Takeout / Pickup</span>
                  <span className="block text-[10px] text-gray-400">Ready in 15 – 20 mins</span>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Kitchen Selection */}
          <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-200 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-mughlai-flame" />
                <span>Fulfilling Kitchen</span>
              </span>
              <span className="text-[11px] text-mughlai-gold font-mono">100% Halal Meats</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div>
                <p className="text-sm font-bold text-white">{selectedKitchen.name} Kitchen</p>
                <p className="text-xs text-gray-400 mt-0.5">{selectedKitchen.address}, {selectedKitchen.cityStateZip}</p>
                <p className="text-[11px] text-[#A8A8A8] mt-0.5">Phone: {selectedKitchen.phone}</p>
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
                className="w-full sm:w-auto sm:min-w-[220px] shrink-0"
                buttonClassName="bg-black/60 border-mughlai-gold/40 text-mughlai-goldLight text-xs py-2 px-3 rounded-xl"
              />
            </div>
          </div>

          {/* 3. Customer Contact Info */}
          <div>
            <label className="text-xs font-mono font-bold text-mughlai-gold uppercase tracking-wider block mb-2">
              Step 2: Contact Information
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-gray-300 block mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Parham Marandi"
                    className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
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
                    className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-mughlai-gold'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 4. Delivery Address Details (Shown if Delivery) */}
          {orderType === 'delivery' && (
            <div>
              <label className="text-xs font-mono font-bold text-mughlai-gold uppercase tracking-wider block mb-2">
                Step 3: Manhattan Delivery Address
              </label>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-gray-300">Street Address *</label>
                    <span className="text-[10px] text-mughlai-gold font-mono">Manhattan Only</span>
                  </div>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="e.g. 1450 Lexington Avenue"
                    className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.streetAddress ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-mughlai-gold'
                    }`}
                  />
                  {errors.streetAddress && <p className="text-[10px] text-red-400 mt-1">{errors.streetAddress}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Apt / Suite / Floor</label>
                    <input
                      type="text"
                      name="aptSuite"
                      value={formData.aptSuite}
                      onChange={handleInputChange}
                      placeholder="e.g. Apt 4B"
                      className="w-full bg-[#1F1C1C] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
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
                      className="w-full bg-[#1F1C1C] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-300 block mb-1">Delivery Drop-Off Instructions</label>
                  <input
                    type="text"
                    name="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={handleInputChange}
                    placeholder="e.g. Leave with doorman, call when outside, elevator is open..."
                    className="w-full bg-[#1F1C1C] border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 5. Payment Information (Image 2 Style) */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-mughlai-gold uppercase tracking-wider block">
              Step 4: Payment Information
            </label>
            
            {/* Payment Method Selector Badges */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'credit_card' }))}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition ${
                  formData.paymentMethod === 'credit_card'
                    ? 'border-mughlai-gold bg-mughlai-gold/15 text-white ring-1 ring-mughlai-gold/40'
                    : 'border-white/10 bg-[#141212] text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex -space-x-1.5 items-center">
                  <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
                  <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
                <span className="text-xs font-bold font-mono">Card</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'apple_pay' }))}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  formData.paymentMethod === 'apple_pay'
                    ? 'border-mughlai-gold bg-mughlai-gold/15 text-white ring-1 ring-mughlai-gold/40'
                    : 'border-white/10 bg-[#141212] text-gray-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-mughlai-gold" />
                <span className="text-xs font-bold">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cash_on_delivery' }))}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-mughlai-gold bg-mughlai-gold/15 text-white ring-1 ring-mughlai-gold/40'
                    : 'border-white/10 bg-[#141212] text-gray-400 hover:text-white'
                }`}
              >
                <Banknote className="w-3.5 h-3.5 text-mughlai-gold" />
                <span className="text-xs font-bold">Pay Later</span>
              </button>
            </div>

            {/* Credit Card Details */}
            {formData.paymentMethod === 'credit_card' ? (
              <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 space-y-3">
                <div>
                  <label className="text-[11px] text-gray-300 block mb-1">Name on card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="Full name as printed on card"
                    className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none transition ${
                      errors.cardName ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                    }`}
                  />
                  {errors.cardName && <p className="text-[10px] text-red-400 mt-1">{errors.cardName}</p>}
                </div>

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
                      className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 pl-3 pr-12 text-xs text-white placeholder-gray-500 font-mono tracking-wider focus:outline-none transition ${
                        errors.cardNumber ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      {getCardBrand(formData.cardNumber) === 'visa' ? (
                        <span className="font-extrabold italic text-blue-400 text-xs">VISA</span>
                      ) : (
                        <div className="flex -space-x-1.5 items-center">
                          <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                          <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.cardNumber && <p className="text-[10px] text-red-400 mt-1">{errors.cardNumber}</p>}
                </div>

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
                      className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 font-mono text-center focus:outline-none transition ${
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
                      className={`w-full bg-[#1F1C1C] border rounded-xl py-2.5 px-3 text-xs text-white placeholder-gray-500 font-mono text-center focus:outline-none transition ${
                        errors.cardCvv ? 'border-red-500' : 'border-white/10 focus:border-mughlai-gold'
                      }`}
                    />
                    {errors.cardCvv && <p className="text-[10px] text-red-400 mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>
              </div>
            ) : formData.paymentMethod === 'apple_pay' ? (
              <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 text-center space-y-1.5">
                <Smartphone className="w-6 h-6 text-mughlai-gold mx-auto" />
                <p className="text-xs font-bold text-white">Apple Pay Express</p>
                <p className="text-[11px] text-gray-400">Authenticate with Face ID or Touch ID upon confirmation.</p>
              </div>
            ) : (
              <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 space-y-1">
                <p className="text-xs font-bold text-mughlai-gold flex items-center gap-1.5">
                  <Banknote className="w-4 h-4" />
                  <span>Pay Upon Receipt</span>
                </p>
                <p className="text-[11px] text-gray-300">
                  Cash or contactless card to driver / restaurant counter upon arrival.
                </p>
              </div>
            )}
          </div>

          {/* 6. Mini Summary Review */}
          <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="font-bold text-gray-200">Order Summary ({items.length} items)</span>
              <span className="font-mono text-mughlai-gold font-bold">${total.toFixed(2)}</span>
            </div>
            
            <div className="max-h-28 overflow-y-auto space-y-1 pr-1 divide-y divide-white/5">
              {items.map((i) => (
                <div key={i.cartId} className="pt-1 first:pt-0 flex justify-between text-[11px] text-gray-300">
                  <span className="line-clamp-1">
                    {i.quantity}x {i.name} {i.spiceLevel ? `(${i.spiceLevel})` : ''}
                  </span>
                  <span className="font-mono shrink-0 pl-2 text-gray-400">
                    ${(i.priceNum * i.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {specialInstructions && (
              <p className="text-[11px] text-mughlai-goldLight italic pt-1 border-t border-white/5">
                Note: "{specialInstructions}"
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF1E27] via-[#E51B23] to-[#B3141B] text-white font-bold text-base shadow-xl shadow-red-950/50 hover:brightness-110 active:scale-[0.99] transition flex items-center justify-center gap-2 group"
            >
              <Lock className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Confirm Payment ${total.toFixed(2)}</span>
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-2.5">
              By placing your order, you agree to receive order notifications via phone or SMS.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
