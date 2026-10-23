import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, Flame, Calendar } from 'lucide-react';
import { BRAND_INFO } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import { getAssetUrl } from '../utils/assetUtils';

export default function Footer() {
  return (
    <footer className="bg-[#0D0B0B] text-gray-300 pt-16 pb-12 border-t border-mughlai-red/40 relative overflow-hidden font-swiss">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-mughlai-red/20 via-mughlai-maroon/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid: Brand Column + 3 Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10 items-start">
          
          {/* Left Column: Brand Logo & Mission Statement */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block group">
              <div className="h-12 sm:h-14 flex items-center transition-transform duration-300 group-hover:scale-105">
                <img
                  src={getAssetUrl('/brand/MIC-Logo-New-v2.svg')}
                  alt="Mughlai Indian Cuisine"
                  className="h-full w-auto object-contain drop-shadow"
                />
              </div>
            </Link>

            <p className="text-sm text-gray-400 font-swiss leading-relaxed max-w-sm paragraph-balanced">
              {preventOrphans("Five Manhattan kitchens united by clay-oven fire, layered spice and generous hospitality.")}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs bg-mughlai-red/25 border border-mughlai-gold/40 text-mughlai-goldLight px-3 py-1 rounded-full font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-mughlai-gold" />
                <span>100% Certified Halal</span>
              </span>
              <span className="text-xs text-gray-500 font-mono">
                • 5 Manhattan Locations
              </span>
            </div>
          </div>

          {/* Right Section: 3 Structured Navigation Columns (Attachment 2 Style) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: EXPLORE */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-mughlai-gold tracking-widest uppercase block">
                EXPLORE
              </span>
              <ul className="space-y-3 text-sm text-[#C4C4C4]">
                <li>
                  <Link to="/menu" className="hover:text-white transition block">
                    Our Menu
                  </Link>
                </li>
                <li>
                  <a href="/#locations" className="hover:text-white transition block">
                    Locations
                  </a>
                </li>
                <li>
                  <Link to="/our-story" className="hover:text-white transition block">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to="/#special-deal" className="hover:text-mughlai-gold transition block text-mughlai-goldLight">
                    $22.95 Special Deal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: PLAN */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-mughlai-gold tracking-widest uppercase block">
                PLAN
              </span>
              <ul className="space-y-3 text-sm text-[#C4C4C4]">
                <li>
                  <Link
                    to="/menu"
                    className="hover:text-white transition block"
                  >
                    Order Online
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reserve"
                    className="hover:text-white transition block"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link to="/catering" className="hover:text-white transition block">
                    Catering
                  </Link>
                </li>
                <li>
                  <a href="/#signature-dishes" className="hover:text-white transition block">
                    Signature Delicacies
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: INFORMATION */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <span className="text-xs font-mono font-bold text-mughlai-gold tracking-widest uppercase block">
                INFORMATION
              </span>
              <ul className="space-y-3 text-sm text-[#C4C4C4]">
                <li>
                  <a 
                    href={`mailto:${BRAND_INFO.email}`} 
                    className="hover:text-white transition block"
                  >
                    Email Us
                  </a>
                </li>
                <li>
                  <a 
                    href={`tel:${BRAND_INFO.phone}`} 
                    className="hover:text-white transition block font-mono text-xs"
                  >
                    {BRAND_INFO.phone}
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 block text-xs font-mono leading-tight">
                    Daily: 11:00 AM – 10:15 PM
                  </span>
                </li>
                <li>
                  <span className="text-[11px] text-emerald-400 font-mono block">
                    Takeout, Delivery & Dine-In
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & Location */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4 uppercase tracking-wider">
          <p>
            © {new Date().getFullYear()} MUGHLAI INDIAN CUISINE
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 normal-case text-gray-400 text-[11px]">
            <Link
              to="/policies?tab=terms"
              className="hover:text-white transition"
            >
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              to="/policies?tab=privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              to="/policies?tab=allergens"
              className="hover:text-white transition"
            >
              Halal & Allergens
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              to="/policies?tab=accessibility"
              className="hover:text-white transition"
            >
              Accessibility (ADA)
            </Link>
          </div>

          <p>
            NEW YORK, NEW YORK
          </p>
        </div>

      </div>
    </footer>
  );
}
