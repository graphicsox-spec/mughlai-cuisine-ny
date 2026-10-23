import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MobileBottomBar({ selectedLocation }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemCount, total } = useCart();

  // If already on the Royal Bag / Checkout page, hide bottom bar so it never blocks inputs or submit buttons
  if (location.pathname === '/bag') {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#121212]/95 backdrop-blur-md border-t border-mughlai-gold/30 px-3.5 py-2.5 flex items-center justify-between gap-2.5 shadow-2xl font-proxima">
      {totalItemCount > 0 ? (
        /* Dynamic Active Bag Bar when items exist */
        <>
          <button
            type="button"
            onClick={() => navigate('/bag')}
            className="flex-[2] bg-gradient-to-r from-mughlai-red via-[#A81C24] to-mughlai-flame text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-between shadow-lg shadow-mughlai-red/40 active:scale-95 transition"
          >
            <div className="flex items-center gap-2">
              <span className="relative">
                <ShoppingBag className="w-4 h-4 text-mughlai-gold" />
                <span className="absolute -top-1.5 -right-1.5 bg-mughlai-gold text-black text-[9px] font-mono font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {totalItemCount}
                </span>
              </span>
              <span>View Royal Bag</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-mughlai-goldLight font-bold">
              <span>${total.toFixed(2)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/reserve')}
            className="flex-1 bg-white/10 border border-mughlai-gold/40 text-mughlai-goldLight font-semibold text-xs py-2.5 px-2.5 rounded-xl flex items-center justify-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve</span>
          </button>

          <a
            href={`tel:${selectedLocation?.phoneRaw || '+12127226262'}`}
            className="p-2.5 bg-mughlai-red text-white rounded-xl shrink-0"
            aria-label="Call Branch"
          >
            <Phone className="w-4 h-4" />
          </a>
        </>
      ) : (
        /* Standard Default Conversion Bar */
        <>
          <button
            type="button"
            onClick={() => navigate('/menu')}
            className="flex-1 bg-gradient-to-r from-mughlai-red to-mughlai-flame text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow"
          >
            <img src="/images/Menu_icon.svg" alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
            <span>Order Online</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/reserve')}
            className="flex-1 bg-white/10 border border-mughlai-gold/40 text-mughlai-goldLight font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Table</span>
          </button>

          <a
            href={`tel:${selectedLocation?.phoneRaw || '+12127226262'}`}
            className="p-2.5 bg-mughlai-red text-white rounded-xl shrink-0"
            aria-label="Call Branch"
          >
            <Phone className="w-4 h-4" />
          </a>
        </>
      )}
    </div>
  );
}
