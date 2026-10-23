import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  Navigation, 
  Compass, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { LOCATIONS, getBranchStatus } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

export default function LocationsHub({ selectedLocation, onSelectLocation }) {
  const navigate = useNavigate();
  const { setSelectedKitchen } = useCart();
  const [activeTab, setActiveTab] = useState(selectedLocation?.id || LOCATIONS[0].id);
  const [status, setStatus] = useState(getBranchStatus());

  useEffect(() => {
    setStatus(getBranchStatus());
    const interval = setInterval(() => {
      setStatus(getBranchStatus());
    }, 60000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const activeBranch = LOCATIONS.find(loc => loc.id === activeTab) || LOCATIONS[0];

  return (
    <section id="locations" className="py-20 bg-[#121212] relative border-b border-mughlai-border">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight mb-3">
            <Compass className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Manhattan Dining & Delivery Network")}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight heading-balanced">
            {preventOrphans("Five Kitchens Across Manhattan")}
          </h2>

          <p className="mt-3 text-sm sm:text-[15px] md:text-base text-[#C4C4C4] font-swiss max-w-5xl mx-auto leading-relaxed">
            <span className="lg:whitespace-nowrap">
              Strategically located across Upper East, Kips Bay, Hell's Kitchen, Financial District, and Upper West Side to ensure hot,
            </span>
            <span className="block">
              fast delivery and cozy neighborhood dine-in.
            </span>
          </p>

          {/* Live Manhattan Status Indicator */}
          <div className="mt-5 inline-flex items-center gap-2 bg-[#1C1818] border border-white/10 px-4 py-1.5 rounded-full text-xs font-swiss">
            <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-gray-300 font-medium">
              New York Time Status: <strong className={status.isOpen ? 'text-emerald-400' : 'text-amber-400'}>{status.text}</strong>
            </span>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE NEIGHBORHOOD TABS SELECTOR (MENU NAVIGATION)
        ========================================================================= */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 mb-8 font-swiss">
          {LOCATIONS.map((loc, idx) => {
            const isTabActive = loc.id === activeTab;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setActiveTab(loc.id);
                  onSelectLocation(loc);
                }}
                className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2.5 shrink-0 border ${
                  isTabActive
                    ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/35 via-mughlai-maroon/25 to-mughlai-red/25 text-white shadow-[0_4px_20px_rgba(212,175,55,0.12)] scale-[1.02]'
                    : 'bg-[#181616] text-[#C4C4C4] hover:text-white border-white/5 hover:border-white/20'
                }`}
              >
                <MapPin className={`w-4 h-4 ${isTabActive ? 'text-mughlai-gold' : 'text-gray-500'}`} />
                <div className="text-left font-swiss">
                  <span className="block font-swiss font-bold leading-none">{loc.name}</span>
                  <span className="text-[10px] text-[#C4C4C4] font-swiss block mt-0.5">{loc.neighborhood.split('/')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            ACTIVE BRANCH HERO DEEP-DIVE CARD
        ========================================================================= */}
        <div className="bg-gradient-to-br from-[#1C1818] via-[#161313] to-[#121212] border border-mughlai-gold/40 rounded-3xl p-6 sm:p-10 shadow-2xl mb-14 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Branch Facts & Contact */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-mughlai-gold/20 text-mughlai-gold border border-mughlai-gold/40 text-xs font-mono font-bold px-3 py-1 rounded-full">
                  Manhattan Branch #{LOCATIONS.findIndex(l => l.id === activeBranch.id) + 1}
                </span>

                <span className="bg-white/5 text-gray-300 text-xs px-3 py-1 rounded-full font-sans">
                  {activeBranch.neighborhood}
                </span>

                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Halal Meat Certified</span>
                </span>
              </div>

              <div>
                <h3 className="font-swiss text-2xl sm:text-3xl font-bold text-white heading-balanced">
                  {preventOrphans(`Mughlai Indian Cuisine — ${activeBranch.name}`)}
                </h3>
                <p className="text-sm text-[#C4C4C4] font-swiss mt-1 paragraph-balanced leading-[20px]">
                  {preventOrphans(activeBranch.highlights)}
                </p>
              </div>

              {/* Address & Cross Streets Box */}
              <div className="bg-black/50 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3 font-swiss">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-mughlai-red shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-swiss">Exact Street Address</h4>
                    <p className="text-sm text-[#C4C4C4] mt-0.5 font-swiss">{activeBranch.address}, {activeBranch.cityStateZip}</p>
                    <p className="text-xs text-mughlai-goldLight font-medium mt-0.5 italic font-swiss">Cross Streets: {activeBranch.crossStreet}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-mughlai-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-300 font-swiss">Delivery Coverage Area</h4>
                    <p className="text-xs text-[#C4C4C4] mt-0.5 font-swiss">{activeBranch.deliveryCoverage}</p>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-mughlai-gold font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Lunch Hours</span>
                  </div>
                  <p className="text-gray-300 font-medium">Monday – Sunday</p>
                  <p className="text-white font-mono text-xs mt-0.5">11:00 AM – 2:45 PM</p>
                </div>

                <div className="bg-white/[0.03] border border-white/5 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-mughlai-flame font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Dinner Hours</span>
                  </div>
                  <p className="text-gray-300 font-medium">Mon – Fri: 5pm – 10:15pm</p>
                  <p className="text-gray-300 font-medium">Sat 3pm – 10:15pm | Sun till 9:45pm</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    onSelectLocation(activeBranch);
                    setSelectedKitchen(activeBranch);
                    navigate('/menu');
                    setTimeout(() => {
                      const el = document.getElementById('deal-builder') || document.getElementById('menu-explorer');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl shadow-mughlai-red/40 transition transform hover:-translate-y-0.5 active:scale-95"
                >
                  <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
                  <span>Order from {activeBranch.name} ($22.95 Deal)</span>
                </button>

                <a
                  href={`tel:${activeBranch.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl border border-white/20 transition font-mono"
                >
                  <Phone className="w-4 h-4 text-mughlai-gold" />
                  <span>Call: {activeBranch.phone}</span>
                </a>

                <a
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-mughlai-gold hover:underline px-2 py-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Right Column: Interactive Map Card & Features */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="rounded-2xl overflow-hidden border border-mughlai-gold/30 bg-black/80 relative aspect-[4/3] flex flex-col justify-between p-6 shadow-2xl">
                
                {/* Simulated Street / Manhattan Map Grid Graphic */}
                <div className="absolute inset-0 opacity-20 jali-pattern pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-mughlai-gold">
                    Manhattan GPS Verified
                  </span>
                  <span className="text-[10px] bg-mughlai-red text-white px-2 py-0.5 rounded font-mono">
                    Tel: {activeBranch.phone}
                  </span>
                </div>

                <div className="relative z-10 text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full bg-mughlai-red/30 border-2 border-mughlai-gold flex items-center justify-center text-mughlai-gold mb-3 animate-bounce">
                    <MapPin className="w-7 h-7 text-mughlai-flame" />
                  </div>
                  <h5 className="font-display font-bold text-white text-xl">
                    {preventOrphans(activeBranch.address)}
                  </h5>
                  <p className="text-xs text-gray-300 font-sans mt-1">
                    {activeBranch.cityStateZip} • {activeBranch.crossStreet}
                  </p>
                </div>

                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${activeBranch.phoneRaw}`}
                    className="text-gray-300 hover:text-mughlai-gold font-mono transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-mughlai-gold" />
                    <span>Tel: {activeBranch.phone}</span>
                  </a>
                  <a
                    href={activeBranch.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-mughlai-gold hover:underline font-bold"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

              {/* Service Features Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {activeBranch.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.04] border border-white/5 px-3 py-2 rounded-xl text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mughlai-gold shrink-0" />
                    <span className="font-medium truncate">{feat}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* =========================================================================
            ALL 5 MANHATTAN KITCHENS QUICK DIRECTORY GRID
        ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
            <h4 className="font-display font-bold text-white text-xl">
              {preventOrphans("All 5 Manhattan Kitchens at a Glance")}
            </h4>
            <span className="text-xs text-gray-400">
              Click any location to set as your primary ordering branch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {LOCATIONS.map((loc) => {
              const isSelected = loc.id === activeTab;
              return (
                <div
                  key={loc.id}
                  onClick={() => {
                    setActiveTab(loc.id);
                    onSelectLocation(loc);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/25 via-mughlai-gold/5 to-transparent text-white shadow-[0_4px_20px_rgba(212,175,55,0.08)]'
                      : 'bg-[#161414] border-white/5 hover:border-white/20 hover:bg-[#1A1818]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-mughlai-gold">{loc.neighborhood.split('/')[0]}</span>
                      {isSelected && <span className="text-[10px] text-emerald-400 font-mono font-bold">Active</span>}
                    </div>
                    <h5 className="font-display font-bold text-white text-base">
                      {preventOrphans(loc.name)}
                    </h5>
                    <p className="text-xs text-gray-300 mt-1">{loc.address}</p>
                    <p className="text-[11px] text-gray-500 italic mt-0.5">{loc.crossStreet}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5 text-xs">
                    <a
                      href={`tel:${loc.phoneRaw}`}
                      className="text-mughlai-gold hover:underline font-mono font-bold block"
                    >
                      {loc.phone}
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLocation(loc);
                        setSelectedKitchen(loc);
                        navigate('/menu');
                      }}
                      className="w-full text-center bg-white/5 hover:bg-mughlai-red text-white py-1.5 rounded-lg text-xs font-semibold transition mt-2"
                    >
                      Order from Branch
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
