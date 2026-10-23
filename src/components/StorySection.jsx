import React from 'react';
import { ShieldCheck, Sparkles, Utensils, Users, Award, Mail } from 'lucide-react';
import { preventOrphans } from '../utils/textUtils';
import { BRAND_INFO } from '../data/locations';

export default function StorySection({ onOpenOrderModal }) {
  return (
    <section id="our-story" className="py-20 bg-[#161313] relative overflow-hidden border-b border-mughlai-border">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Story Block: The Mughlai Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-white/10">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 bg-mughlai-red/20 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
              <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
              <span>{preventOrphans("Centuries of Culinary Royalty")}</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight heading-balanced">
              {preventOrphans("The Golden Taste of India in the Heart of Manhattan")}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-serif italic leading-relaxed paragraph-balanced">
              {preventOrphans("Mughlai cuisine was born in the imperial kitchens of the Mughal Empire, where Persian, Central Asian, and Indian culinary masters created richly spiced curries, tandoori marinades, and aromatic saffron biryanis.")}
            </p>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed paragraph-balanced">
              {preventOrphans("For years, Mughlai Indian Cuisine has served New Yorkers and international visitors across Manhattan with five dedicated kitchens. We roast whole spices in small batches, slow-simmer gravies for hours, and bake our breads fresh against the walls of custom clay ovens.")}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-mughlai-gold mb-2" />
                <h4 className="text-sm font-bold text-white heading-balanced">{preventOrphans("100% Certified Halal")}</h4>
                <p className="text-xs text-gray-400 mt-1 paragraph-balanced">{preventOrphans("Strictly certified halal meats prepared with utmost care.")}</p>
              </div>

              <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl">
                <Utensils className="w-6 h-6 text-mughlai-flame mb-2" />
                <h4 className="text-sm font-bold text-white heading-balanced">{preventOrphans("Live Clay Ovens")}</h4>
                <p className="text-xs text-gray-400 mt-1 paragraph-balanced">{preventOrphans("Charcoal-fired authentic tandoors in all 5 kitchens.")}</p>
              </div>
            </div>

          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-square">
                <img
                  src="/images/slider/special-dum-biryani-desktop.png"
                  alt="Dum Biryani Handi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-square mt-6">
                <img
                  src="/images/slider/royal-tandoori-sizzler-desktop.png"
                  alt="Tandoori Sizzler"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Block: Catering & Private Events */}
        <div id="catering" className="pt-20">
          <div className="bg-gradient-to-r from-mughlai-maroon/80 via-[#1C1717] to-mughlai-maroon/80 border border-mughlai-gold/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-mughlai-gold/20 text-mughlai-gold border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold">
                <Users className="w-3.5 h-3.5" />
                <span>{preventOrphans("Corporate Events • Weddings • Private Parties")}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white heading-balanced">
                {preventOrphans("Full-Service Manhattan Indian Catering")}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-serif italic leading-relaxed paragraph-balanced">
                {preventOrphans("Bring the golden taste of India to your corporate gatherings, wedding celebrations, family milestones, and private dinners throughout Manhattan, Brooklyn, and Queens.")}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`mailto:${BRAND_INFO.email}?subject=Catering Inquiry - Mughlai Indian Cuisine`}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-gold to-mughlai-goldDark text-black font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl shadow-lg hover:brightness-110 transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>{preventOrphans("Request Catering Quote: " + BRAND_INFO.email)}</span>
                </a>

                <button
                  onClick={onOpenOrderModal}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl border border-white/20 transition"
                >
                  <span>{preventOrphans("Explore 2026 Party Platters")}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
