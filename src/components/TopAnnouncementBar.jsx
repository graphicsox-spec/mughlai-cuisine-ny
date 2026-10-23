import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, MapPin, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';

export default function TopAnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-[#130E0F] via-[#1B1315] to-[#130E0F] text-white text-[11px] border-b border-mughlai-gold/20 relative z-50 font-swiss">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex items-center justify-between gap-2 min-h-[26px]">
          
          {/* Left: Halal & Special Deal */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-mughlai-goldLight font-medium shrink-0">
              <ShieldCheck className="w-3 h-3 text-mughlai-gold" />
              <span>{preventOrphans("100% Halal Meat Certified")}</span>
            </span>

            <span className="hidden sm:inline-block w-px h-3 bg-white/15 shrink-0" />

            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#B0B0B0] truncate">
              <Flame className="w-3 h-3 text-mughlai-flame shrink-0" />
              <span className="truncate">
                Manhattan Takeout & Delivery Special: <strong className="text-white font-semibold">$22.95</strong> (Appetizer + Entrée + Rice + Naan)
              </span>
            </span>
          </div>

          {/* Right: Locations & Sleek Action */}
          <div className="flex items-center space-x-3 shrink-0 ml-auto">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#9E9E9E] text-[11px]">
              <svg viewBox="0 0 26.25 34.52" className="w-3 h-3 fill-current text-mughlai-gold/80 shrink-0">
                <path d="M13.92,34.2c-.54.44-1.1.42-1.62,0-4.38-3.56-8.53-8.43-10.72-13.69C.51,17.94-.15,15.01.03,12.29.5,5.02,6.82-.48,14.05.03c6.42.46,11.64,5.56,12.15,12.05.19,2.4-.27,4.99-1.09,7.3-2.05,5.77-6.48,10.96-11.2,14.82ZM18.44,13.13c0-2.93-2.38-5.31-5.31-5.31s-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31,5.31-2.38,5.31-5.31Z"/>
              </svg>
              <span>5 Manhattan Kitchens</span>
            </span>

            <Link
              to="/#special-deal"
              className="inline-flex items-center gap-1 bg-mughlai-gold/10 hover:bg-mughlai-gold/20 text-mughlai-goldLight hover:text-white font-medium px-2.5 py-0.5 rounded-full border border-mughlai-gold/30 hover:border-mughlai-gold transition text-[11px]"
            >
              <span>Order Special ($22.95)</span>
              <span className="text-mughlai-gold text-[10px]">&rarr;</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
