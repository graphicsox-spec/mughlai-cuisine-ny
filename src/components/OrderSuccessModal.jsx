import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  Share2, 
  Copy, 
  X, 
  UtensilsCrossed, 
  Sparkles,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { preventOrphans } from '../utils/textUtils';
import { getAssetUrl } from '../utils/assetUtils';

export default function OrderSuccessModal() {
  const { isReceiptOpen, closeReceipt, lastOrder } = useCart();
  const [copied, setCopied] = React.useState(false);

  if (!isReceiptOpen || !lastOrder) return null;

  const isDelivery = lastOrder.orderType === 'delivery';

  // Format a clean WhatsApp / SMS text receipt
  const buildReceiptText = () => {
    let text = `👑 *MUGHLAI INDIAN CUISINE NYC - ORDER CONFIRMATION*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Order ID:* ${lastOrder.orderId}\n`;
    text += `*Kitchen:* Mughlai ${lastOrder.kitchen.name} (${lastOrder.kitchen.phone})\n`;
    text += `*Order Type:* ${isDelivery ? 'Door Delivery' : 'Takeout / Pickup'}\n`;
    text += `*Customer:* ${lastOrder.fullName} (${lastOrder.phone})\n`;
    if (isDelivery) {
      text += `*Address:* ${lastOrder.streetAddress} ${lastOrder.aptSuite || ''}\n`;
    }
    text += `\n*ORDER ITEMS:*\n`;
    lastOrder.items.forEach((item) => {
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
    text += `Subtotal: $${lastOrder.subtotal.toFixed(2)}\n`;
    text += `NYC Tax: $${lastOrder.tax.toFixed(2)}\n`;
    text += `Delivery: ${lastOrder.deliveryFee === 0 ? 'FREE' : '$' + lastOrder.deliveryFee.toFixed(2)}\n`;
    text += `*TOTAL AMOUNT: $${lastOrder.total.toFixed(2)}*\n`;
    text += `Payment: ${lastOrder.paymentMethod === 'cash_or_card_on_delivery' ? 'Pay upon receipt' : 'Online / Card'}\n`;
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
    // Send directly to the active branch kitchen phone on WhatsApp
    const rawPhone = (lastOrder.kitchen?.phoneRaw || '+12127226262').replace(/\D/g, '');
    window.open(`https://api.whatsapp.com/send?phone=${rawPhone}&text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-proxima">
      <div 
        className="bg-[#181616] border-2 border-mughlai-gold/60 rounded-3xl max-w-xl w-full max-h-[94vh] overflow-hidden flex flex-col shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="bg-gradient-to-r from-mughlai-maroon via-mughlai-red to-[#1A0508] p-6 text-center border-b border-mughlai-gold/30 relative">
          <button
            type="button"
            onClick={closeReceipt}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center mb-3">
            <img
              src={getAssetUrl('/brand/MIC-Logo-New-v2.svg')}
              alt="Mughlai Indian Cuisine"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow"
            />
          </div>

          <div className="w-14 h-14 rounded-full bg-mughlai-gold/20 border-2 border-mughlai-gold mx-auto flex items-center justify-center text-mughlai-gold shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-3">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-[11px] font-mono font-bold text-mughlai-gold tracking-widest uppercase block">
            Royal Order Confirmed
          </span>
          <h3 className="font-proxima text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Order #{lastOrder.orderId}
          </h3>
          <p className="text-xs text-[#E5D7B7] mt-1">
            Thank you, <strong className="text-white">{lastOrder.fullName}</strong>! Your order is being freshly prepared in our clay ovens.
          </p>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Estimated Time Card */}
          <div className="bg-white/[0.04] border border-mughlai-gold/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-mughlai-gold/15 border border-mughlai-gold/40 rounded-xl text-mughlai-gold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Estimated {isDelivery ? 'Delivery' : 'Ready'} Time</p>
                <p className="text-base sm:text-lg font-bold text-white font-mono">
                  {isDelivery ? '35 – 45 Minutes' : '20 – 30 Minutes'}
                </p>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 font-semibold font-mono">
              Live in Kitchen
            </span>
          </div>

          {/* Fulfilling Kitchen */}
          <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-mughlai-gold flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-mughlai-flame" />
                <span>Preparing Kitchen: Mughlai {lastOrder.kitchen.name}</span>
              </span>
              <a 
                href={`tel:${lastOrder.kitchen.phoneRaw}`}
                className="text-[11px] text-mughlai-gold hover:underline flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3" />
                <span>{lastOrder.kitchen.phone}</span>
              </a>
            </div>
            <p className="text-xs text-gray-300">
              {lastOrder.kitchen.address}, {lastOrder.kitchen.cityStateZip}
            </p>
            {isDelivery && (
              <p className="text-xs text-[#A8A8A8] pt-1 border-t border-white/5">
                <strong>Delivering to:</strong> {lastOrder.streetAddress} {lastOrder.aptSuite || ''}
              </p>
            )}
          </div>

          {/* Itemized Order List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
              Itemized Receipt ({lastOrder.items.length} dishes)
            </h4>
            <div className="bg-[#121010] border border-white/10 rounded-2xl p-4 divide-y divide-white/5 space-y-2">
              {lastOrder.items.map((item) => (
                <div key={item.cartId} className="pt-2 first:pt-0 flex justify-between items-start text-xs">
                  <div>
                    <p className="font-bold text-white">
                      {item.quantity}x {item.name}
                    </p>
                    {item.isDeal ? (
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        Appetizer: {item.dealAppetizer} • Entrée: {item.dealEntree}
                      </p>
                    ) : (
                      <p className="text-[11px] text-mughlai-goldLight/80">
                        Spice: {item.spiceLevel}
                      </p>
                    )}
                  </div>
                  <span className="font-mono text-gray-200 font-semibold pl-2">
                    ${(item.priceNum * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              {/* Bill Totals */}
              <div className="pt-3 space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-gray-300">${lastOrder.subtotal.toFixed(2)}</span>
                </div>
                {lastOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount {lastOrder.appliedCoupon?.code ? `(${lastOrder.appliedCoupon.code})` : ''}</span>
                    <span className="font-mono font-bold">-${lastOrder.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>NYC Sales Tax</span>
                  <span className="font-mono text-gray-300">${lastOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono text-gray-300">
                    {lastOrder.deliveryFee === 0 ? 'FREE' : `$${lastOrder.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                {lastOrder.serviceFee > 0 && (
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span className="font-mono text-gray-300">${lastOrder.serviceFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
                  <span>Total Paid / Due</span>
                  <span className="font-mono text-base text-mughlai-gold">
                    ${lastOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions (WhatsApp, Copy, Call) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Receipt Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-mughlai-gold" />
                  <span>Copy Receipt Text</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 bg-[#121212] border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-mughlai-gold" />
            <span>100% Certified Halal Dining</span>
          </div>

          <button
            type="button"
            onClick={closeReceipt}
            className="px-5 py-2 rounded-xl bg-mughlai-red hover:bg-mughlai-red/80 text-white font-bold text-xs transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
