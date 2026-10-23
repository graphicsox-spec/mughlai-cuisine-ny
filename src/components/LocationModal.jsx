import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  UtensilsCrossed, 
  Calendar,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';
import { LOCATIONS, getBranchStatus } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

export default function LocationModal({ isOpen, onClose, mode = 'order', onSelectLocation, selectedLocation }) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const { setSelectedKitchen, selectedKitchen } = useCart();
  const [activeTab, setActiveTab] = useState(mode); // 'order' | 'reserve'
  const status = getBranchStatus();

  const handleOrderFromBranch = (loc) => {
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
    setSelectedKitchen(loc);
    onClose();
    navigate('/menu');
    setTimeout(() => {
      const el = document.getElementById('deal-builder') || document.getElementById('menu-explorer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-[#181616] border-2 border-mughlai-gold/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-mughlai-maroon via-mughlai-red to-[#1A0508] p-5 sm:p-6 border-b border-mughlai-gold/20 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black/30 border border-mughlai-gold/40 rounded-xl text-mughlai-gold shrink-0">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-swiss text-xl sm:text-2xl font-bold heading-balanced">
                {preventOrphans(activeTab === 'reserve' ? 'Reserve a Table in Manhattan' : 'Select Manhattan Kitchen to Order')}
              </h3>
              <p className="text-xs text-[#C4C4C4] mt-0.5 font-swiss">
                5 Kitchens Across Manhattan • Delivery, Takeout & Dine-In
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs (Menu Navigation) */}
        <div className="flex border-b border-white/10 bg-[#141212] p-2 gap-2 font-swiss">
          <button
            onClick={() => setActiveTab('order')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 border ${
              activeTab === 'order'
                ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/40 via-mughlai-maroon/30 to-mughlai-red/30 text-white shadow-[0_2px_12px_rgba(212,175,55,0.1)]'
                : 'border-transparent text-[#C4C4C4] hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-mughlai-gold" />
            <span>Order Delivery / Takeout ($22.95 Deal)</span>
          </button>

          <button
            onClick={() => setActiveTab('reserve')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center justify-center gap-2 border ${
              activeTab === 'reserve'
                ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/40 via-mughlai-maroon/30 to-mughlai-red/30 text-white shadow-[0_2px_12px_rgba(212,175,55,0.1)]'
                : 'border-transparent text-[#C4C4C4] hover:text-white hover:bg-white/[0.03]'
            }`}
          >
            <Calendar className={`w-4 h-4 ${activeTab === 'reserve' ? 'text-mughlai-gold' : 'text-gray-400'}`} />
            <span>Reserve Table (Dine-In)</span>
          </button>
        </div>

        {/* Value Callout Banner */}
        <div className="bg-mughlai-red/15 border-b border-mughlai-gold/20 px-5 py-2.5 flex items-center justify-between text-xs text-gray-200 font-swiss">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-mughlai-flame shrink-0" />
            <span><strong>Special Notice:</strong> $22.95 Delivery & Takeout Special Deal is available at all 5 branches!</span>
          </div>
          <span className="hidden sm:inline-block text-mughlai-gold font-mono font-semibold">100% Halal</span>
        </div>

        {/* Locations List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 divide-y divide-white/5 font-swiss">
          {LOCATIONS.map((loc, idx) => {
            const isCurrent = (selectedKitchen?.id === loc.id) || (selectedLocation?.id === loc.id);

            return (
              <div 
                key={loc.id} 
                className={`pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-2xl transition border font-swiss ${
                  isCurrent 
                    ? 'bg-mughlai-red/10 border-mughlai-gold/40 shadow-[0_2px_12px_rgba(212,175,55,0.08)]' 
                    : 'border-transparent hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-swiss font-bold text-white text-base sm:text-lg">
                      {preventOrphans(loc.name)}
                    </span>
                    <span className="text-[10px] bg-mughlai-gold/15 text-mughlai-gold border border-mughlai-gold/30 px-2.5 py-0.5 rounded-full font-semibold font-swiss">
                      {loc.neighborhood.split('/')[0]}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Kitchen
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#C4C4C4] flex items-center gap-1.5 font-swiss">
                    <MapPin className="w-3.5 h-3.5 text-mughlai-red shrink-0" />
                    <span>{loc.address}, {loc.cityStateZip}</span>
                  </p>

                  <p className="text-[11px] text-mughlai-goldLight/80 italic ml-5">
                    Cross Streets: {loc.crossStreet}
                  </p>

                  <p className="text-[11px] text-gray-400 ml-5 font-sans">
                    <strong>Delivers to:</strong> {loc.deliveryCoverage}
                  </p>

                  <div className="flex items-center gap-3 ml-5 pt-1 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-mughlai-gold" />
                      <span>Lunch 11am–2:45pm | Dinner 5pm–10:15pm</span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                  {activeTab === 'reserve' ? (
                    <>
                      <a
                        href={`tel:${loc.phoneRaw}`}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-gold to-mughlai-goldDark text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:brightness-110 transition font-mono"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call to Reserve: {loc.phone}</span>
                      </a>
                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1 text-[11px] text-gray-400 hover:text-white py-1"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleOrderFromBranch(loc)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-mughlai-red/30 transition transform hover:-translate-y-0.5 active:scale-95"
                      >
                        <UtensilsCrossed className="w-3.5 h-3.5 text-white" />
                        <span>Order from {loc.name}</span>
                      </button>

                      <a
                        href={`tel:${loc.phoneRaw}`}
                        className="inline-flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs px-3 py-1.5 rounded-xl border border-white/10 transition font-mono"
                      >
                        <Phone className="w-3 h-3 text-mughlai-gold" />
                        <span>{loc.phone}</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#121212] p-3.5 text-center border-t border-white/10 flex items-center justify-between text-xs text-gray-400 px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-mughlai-gold" />
            <span>100% Certified Halal Meat Across All Kitchens</span>
          </div>
          <span className="text-mughlai-goldLight">Fast Manhattan Delivery</span>
        </div>

      </div>
    </div>
  );
}
