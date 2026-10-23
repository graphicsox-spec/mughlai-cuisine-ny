import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import SpecialDealSection from '../components/SpecialDealSection';
import SignatureDishes from '../components/SignatureDishes';
import LocationsHub from '../components/LocationsHub';
import { preventOrphans } from '../utils/textUtils';

export default function HomePage({
  selectedLocation,
  onSelectLocation
}) {
  return (
    <div className="space-y-0">
      {/* 1. Hero Showcase Slider */}
      <HeroSlider />

      {/* 2. $22.95 Delivery & Takeout Special Deal Spotlight */}
      <SpecialDealSection />

      {/* 3. Signature Delicacies Visual Highlights */}
      <SignatureDishes />

      {/* 4. Luxury Discovery Showcase: Full Menu, Catering & Story Teasers */}
      <section className="py-16 bg-[#161313] border-t border-b border-mughlai-border relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-mughlai-maroon/15 blur-3xl pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-mughlai-gold uppercase tracking-wider">
              {preventOrphans("Experience Mughlai Cuisine")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 heading-balanced">
              {preventOrphans("Royalty in Every Culinary Detail")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Explore Full Menu */}
            <Link
              to="/menu"
              className="group bg-[#1E1919] hover:bg-[#251F1F] border border-white/10 hover:border-mughlai-gold/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-mughlai-gold/10 hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/40 flex items-center justify-center text-mughlai-gold mb-4 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 34.1 34.52" className="w-6 h-6 fill-current text-mughlai-gold group-hover:text-mughlai-goldLight transition-colors">
                    <path d="M14.07,19.99c.65-.76,1.21-1.36,2.04-1.91-.56-.7-1.06-1.29-1.73-1.83-.19-.15-.7,0-.93.11-2.39,1.22-5.1.67-6.86-1.37L.07,7.43c-.15-.18-.04-.61.06-.77s.56-.33.73-.17l6.44,6.46c.17.17,1.28.26,1.42-.49.04-.2-.09-.49-.25-.67L2.47,5.3c-.26-.28-.29-.62-.07-.89s.64-.31.91-.04l6.57,6.58c.46.04.86-.38,1.08-.77-.14-.22-.27-.45-.45-.64L4.71,3.38c-.25-.27-.4-.56-.28-.85.1-.24.61-.64.89-.36l6.57,6.63c.32.14.75-.1.88-.31.13-.2.25-.69.04-.92L7.79,1.92l-1-1.07c-.17-.18.05-.64.22-.74.21-.12.61-.18.83.04l7.17,7.03c2.1,2.06,2.74,4.27,1.15,6.94-.17.39.19,1.08.49,1.39,1.49,1.56,2.98,3.03,4.7,4.34,1.36,1.03,2.64,1.98,3.9,3.14l6.98,6.42c.54.49.84,1.24.88,1.95.06,1.18-.68,2.17-1.64,2.61-1.03.48-2.39.28-3.21-.6-2.99-3.26-5.78-6.62-8.35-10.24l-2.17-3.06c-1.46.98-2.47,2.28-3.32,3.78-.48.85-1.08,1.6-1.69,2.38-2.03,2.59-4.03,5.12-6.27,7.51-.64.68-1.69.88-2.55.71-.81-.16-1.57-.75-1.97-1.62s-.31-2.09.44-2.85c2.15-2.17,4.38-4.18,6.72-6.17,1.29-1.09,4.24-3,4.96-3.83Z"/>
                    <path d="M21.68,17.89c-1.21-.99-2.24-1.95-3.22-3.05.53-.99.84-1.91.89-2.97l2.58-2.61c2.63-2.66,5.37-5.11,8.39-7.32.71-.52,2.6-1.84,3.36-1.46.21.11.43.49.42.78-.13,3.68-6.55,11.04-9.23,13.59l-3.19,3.03Z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-mughlai-gold font-bold">90+ Delicacies</span>
                  <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-mono">100% Halal</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-mughlai-goldLight transition-colors">
                  {preventOrphans("Explore Our Menu")}
                </h3>
                <p className="text-xs text-[#C4C4C4] font-swiss leading-relaxed mt-2">
                  {preventOrphans("Clay oven tandoor skewers, rich cashew curries, dum biryanis & handcrafted breads with live search and custom $22.95 combo builder.")}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-mughlai-gold group-hover:text-white transition-colors">
                <span>View Our Menu</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 2: Catering & Events */}
            <Link
              to="/catering"
              className="group bg-[#1E1919] hover:bg-[#251F1F] border border-white/10 hover:border-mughlai-gold/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-mughlai-gold/10 hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/40 flex items-center justify-center text-mughlai-gold mb-4 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 36.23 34.52" className="w-6 h-6 fill-current text-mughlai-gold group-hover:text-mughlai-goldLight transition-colors">
                    <path d="M31.63,18.14H4.08c-.06-7.52,5.97-13.5,13.26-13.81.14-.22.12-.92-.13-1.04-.8-.39-1.44-1.62-.79-2.53.6-.84,1.82-1.03,2.58-.34.82.76.77,2.03-.2,2.67-.23.15-.43.3-.54.41-.14.14-.04.82.29.84,6.76.35,13.31,6.16,13.09,13.8ZM7.7,15.94c.3-3.63,2.1-6.22,4.44-8.61-3.33,1.76-5.28,4.95-6.24,8.43.64.18,1.14.23,1.8.18Z"/>
                    <path d="M27.97,24.55c.3-.11.9.14,1.02.36s.02.86-.2,1.01l-5.93,4.07c-1.03.71-2.12.9-3.37.95l-7.69.28c-.54.02-1.24.26-1.82.35l-1.36-6.08c6.72-2.69,5.05-1.53,11.1-1.85.26-.01.77.36.84.6.09.32-.23.86-.62.97l-3.3.94c-.17.05-.41.38-.44.52-.2.89,4.88.53,5.42.37,2.25-.65,4.08-1.62,6.36-2.49Z"/>
                    <path d="M29.76,22.75H6.01c-.86-.33-1.21-1.42-1.41-2.26l-2.78-.08c-.74-.02-1.54-.4-1.82-1.11h36.23c-.39.81-1.21,1.11-2.01,1.12l-3.13.06c-.18.83-.46,1.83-1.33,2.27Z"/>
                    <polygon points="8.66 32.89 2.68 34.52 2.65 25.34 6.71 24.95 8.66 32.89"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-mughlai-gold font-bold">20 to 1,000+ Guests</span>
                  <span className="text-[10px] bg-mughlai-red/30 border border-mughlai-gold/30 text-mughlai-gold px-2 py-0.5 rounded font-mono">Live Tandoor</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-mughlai-goldLight transition-colors">
                  {preventOrphans("Catering & Private Events")}
                </h3>
                <p className="text-xs text-[#C4C4C4] font-swiss leading-relaxed mt-2">
                  {preventOrphans("Corporate boardroom spreads, wedding feasts, milestone celebrations, and private penthouse catering across Manhattan & Tri-State.")}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-mughlai-gold group-hover:text-white transition-colors">
                <span>Explore Catering Packages</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Card 3: Our Story & Heritage */}
            <Link
              to="/our-story"
              className="group bg-[#1E1919] hover:bg-[#251F1F] border border-white/10 hover:border-mughlai-gold/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-mughlai-gold/10 hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-mughlai-red/20 border border-mughlai-gold/40 flex items-center justify-center text-mughlai-gold mb-4 group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 30.69 34.52" className="w-6 h-6 fill-current text-mughlai-gold group-hover:text-mughlai-goldLight transition-colors">
                    <path d="M30.22,15.69c-1.44,8.88-6.57,15.38-14.87,18.82-4.21-1.72-7.85-4.41-10.52-8.03C.25,20.28-.51,12.27.26,4.8c.13-.44.43-.77.92-.81,4.95-.35,9.75-1.6,14.16-3.99,4.38,2.36,9.15,3.61,14.06,3.99.57.04.94.33,1.05.89.35,3.63.35,7.2-.22,10.81ZM7.94,18.04l4.46,4.5c.79.79,1.97.78,2.74-.05l8.71-9.36c.73-.78.6-1.9-.1-2.53-.74-.67-1.8-.56-2.49.18l-7.53,8.08-3.34-3.37c-.74-.75-1.88-.73-2.56.01s-.66,1.76.11,2.52Z"/>
                  </svg>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-mughlai-gold font-bold">30+ Years Legacy</span>
                  <span className="text-[10px] bg-amber-950/80 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded font-mono">Imperial Recipes</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-mughlai-goldLight transition-colors">
                  {preventOrphans("Our Story & Heritage")}
                </h3>
                <p className="text-xs text-[#C4C4C4] font-swiss leading-relaxed mt-2">
                  {preventOrphans("The story of bringing authentic royal recipes from Old Delhi to Manhattan, slow-cooked in handis and blistered in clay ovens across 5 kitchens.")}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-mughlai-gold group-hover:text-white transition-colors">
                <span>Read Our Heritage</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 5. Five Manhattan Locations Hub */}
      <LocationsHub
        selectedLocation={selectedLocation}
        onSelectLocation={onSelectLocation}
      />
    </div>
  );
}
