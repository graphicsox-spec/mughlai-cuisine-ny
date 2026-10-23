import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck, UtensilsCrossed } from 'lucide-react';
import { LOCATIONS } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

export default function LocationsSection({ selectedLocation, onSelectLocation, onOpenOrderModal }) {
  const navigate = useNavigate();
  const { setSelectedKitchen } = useCart();
  return (
    <section id="locations" className="py-20 bg-[#121212] relative border-b border-mughlai-border">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-mughlai-maroon/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/20 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight mb-3">
            <MapPin className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Five Neighborhood Kitchens Across Manhattan")}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white heading-balanced">
            {preventOrphans("Visit or Order from Your Nearest Location")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-400 font-serif italic max-w-xl mx-auto paragraph-balanced">
            {preventOrphans("From Wall Street to the Upper West Side, enjoy fast Manhattan delivery, hot takeout, and warm hospitality.")}
          </p>
        </div>

        {/* 5 Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((loc, idx) => {
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => onSelectLocation(loc)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected 
                    ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/25 via-mughlai-gold/5 to-transparent text-white shadow-[0_4px_20px_rgba(212,175,55,0.08)] scale-[1.01]' 
                    : 'bg-[#181616] border-white/10 hover:border-mughlai-gold/40 hover:bg-[#1E1B1B]'
                }`}
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-mughlai-gold">
                      Kitchen 0{idx + 1}
                    </span>
                    <span className="text-[10px] bg-mughlai-gold/15 text-mughlai-goldLight border border-mughlai-gold/30 px-2 py-0.5 rounded-full font-semibold">
                      {loc.neighborhood}
                    </span>
                  </div>

                  {/* Branch Name */}
                  <h3 className="font-display text-xl font-bold text-white heading-balanced">
                    {preventOrphans(loc.name)}
                  </h3>

                  {/* Address */}
                  <p className="text-sm text-gray-300 mt-2 font-medium flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-mughlai-red shrink-0 mt-0.5" />
                    <span>{loc.address}, {loc.cityStateZip}</span>
                  </p>
                  <p className="text-xs text-mughlai-goldLight/80 italic ml-5.5 mt-0.5">
                    {loc.crossStreet}
                  </p>

                  {/* Hours */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-mughlai-gold shrink-0" />
                      <span className="text-gray-300 font-medium">Lunch: 11:00 AM – 2:45 PM</span>
                    </div>
                    <div className="flex items-center gap-2 pl-5.5 text-[11px] text-gray-400">
                      <span>Dinner: Mon–Fri 5pm–10:15pm | Sat 3pm–10:15pm</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <a
                    href={`tel:${loc.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white hover:text-mughlai-gold transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-mughlai-gold" />
                    <span>{loc.phone}</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
                      title="Google Maps Directions"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLocation(loc);
                        setSelectedKitchen(loc);
                        navigate('/menu');
                      }}
                      className="bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow transition active:scale-95"
                    >
                      Order
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

          {/* 6th Card: Manhattan Delivery Coverage */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-mughlai-maroon/60 via-[#1A1616] to-[#121212] border border-mughlai-gold/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-mughlai-gold text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-mughlai-gold" />
                <span>Full Manhattan Delivery</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white heading-balanced">
                {preventOrphans("Direct Delivery Throughout New York City")}
              </h3>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed paragraph-balanced font-serif italic">
                {preventOrphans("Our five synchronized Manhattan kitchens ensure your tandoori dishes, biryanis, and curries arrive steaming hot.")}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onOpenOrderModal}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-gold to-mughlai-goldDark text-black font-bold text-xs py-3 rounded-xl shadow-lg hover:brightness-110 transition"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>{preventOrphans("Choose Location & Order ($22.95 Deal)")}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
