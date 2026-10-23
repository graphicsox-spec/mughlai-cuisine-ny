import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Utensils, 
  Flame, 
  Star, 
  Quote, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import { preventOrphans } from '../utils/textUtils';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Mughlai’s Chicken Tikka Masala and Garlic Naan are the gold standard in Manhattan. The tandoor smoke and rich cashew gravy are unmistakable. We order from their Kips Bay location every Friday without fail.",
    author: "David L., Gramercy Resident",
    tag: "Verified Local Diner",
    rating: 5,
    branch: "Kips Bay Kitchen"
  },
  {
    id: 2,
    quote: "We hosted an executive holiday luncheon for 65 people in our Wall Street offices catered by the Financial District branch. The Dum Biryani handis arrived piping hot with Sterno kits and fresh raita. Flawless execution.",
    author: "Ananya M., Financial District",
    tag: "Corporate Catering Client",
    rating: 5,
    branch: "Financial District Kitchen"
  },
  {
    id: 3,
    quote: "Having authentic 100% Halal meat served with this level of elegance in Upper Manhattan is rare. Their Tandoori Lamb Chops and Dal Mughlai are on par with the finest dining rooms in Delhi.",
    author: "Tariq K., Upper West Side",
    tag: "Fine Dining Reviewer",
    rating: 5,
    branch: "Upper West Side Kitchen"
  }
];

export default function HeritageStory() {
  return (
    <section id="our-story" className="py-20 bg-[#121212] relative overflow-hidden border-b border-mughlai-border">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            TOP BLOCK: THE MUGHLAI CULINARY LEGACY
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pb-20 border-b border-white/10">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-mughlai-red/20 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
              <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
              <span>{preventOrphans("Centuries of Culinary Royalty")}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
              <span className="lg:block">{preventOrphans("The Golden Taste of India in the")}</span>{' '}
              <span className="lg:block text-mughlai-gold">{preventOrphans("Heart of Manhattan")}</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed paragraph-balanced">
              {preventOrphans("Mughlai cuisine is an imperial culinary legacy developed in the royal court kitchens of the Mughal Empire. It is renowned for velvety cashew gravies, delicate saffron aromatics, and the smoky char of live clay ovens.")}
            </p>

            <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed paragraph-balanced">
              {preventOrphans("For years, Mughlai Indian Cuisine has faithfully honored this heritage across New York City. We roast our whole spices in small batches, slow-simmer our dal and rich curries for hours, and hand-stretch every naan before slapping it against the burning clay walls of our custom tandoors in all five Manhattan branches.")}
            </p>

            {/* 3 Pillars (Sub-Headings & Descriptions) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 font-swiss">
              <div className="bg-[#181616] border border-white/5 p-4 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-swiss font-bold text-white text-sm heading-balanced">
                  {preventOrphans("100% Certified Halal")}
                </h4>
                <p className="text-[11px] text-[#C4C4C4] font-swiss mt-1 paragraph-balanced leading-[16px]">
                  {preventOrphans("Every cut of chicken, lamb, and goat is strictly certified Halal.")}
                </p>
              </div>

              <div className="bg-[#181616] border border-white/5 p-4 rounded-2xl">
                <Flame className="w-6 h-6 text-mughlai-flame mb-2" />
                <h4 className="font-swiss font-bold text-white text-sm heading-balanced">
                  {preventOrphans("Live Clay Tandoors")}
                </h4>
                <p className="text-[11px] text-[#C4C4C4] font-swiss mt-1 paragraph-balanced leading-[16px]">
                  {preventOrphans("Authentic clay ovens fired with natural charcoal in all 5 kitchens.")}
                </p>
              </div>

              <div className="bg-[#181616] border border-white/5 p-4 rounded-2xl">
                <Utensils className="w-6 h-6 text-mughlai-gold mb-2" />
                <h4 className="font-swiss font-bold text-white text-sm heading-balanced">
                  {preventOrphans("Royal Dum Pukht")}
                </h4>
                <p className="text-[11px] text-[#C4C4C4] font-swiss mt-1 paragraph-balanced leading-[16px]">
                  {preventOrphans("Dough-sealed handis preserving the deep steam of spices.")}
                </p>
              </div>
            </div>

          </div>

          {/* Right Visual Showcase (Automatically stretches to match exact height of Left Column) */}
          <div className="lg:col-span-5 h-full flex flex-col">
            <div className="relative w-full h-full min-h-[380px] lg:min-h-0 mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border-2 border-mughlai-gold/40 shadow-2xl bg-black flex-1 flex flex-col">
              <img
                src="/images/Dum Pukht Sealed Cooking.png"
                alt="Dum Pukht Sealed Cooking"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-mughlai-gold font-bold">
                      Imperial Recipe #01
                    </span>
                    <h5 className="font-display font-bold text-white text-base">
                      {preventOrphans("Dum Pukht Sealed Cooking")}
                    </h5>
                  </div>
                  <span className="text-xs bg-mughlai-red text-white px-2.5 py-1 rounded-lg font-bold">
                    Since 1526
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM BLOCK: MANHATTAN DINER TESTIMONIALS
        ========================================================================= */}
        <div className="pt-20">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-mughlai-red/20 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight mb-3">
              <Star className="w-3.5 h-3.5 text-mughlai-gold fill-mughlai-gold" />
              <span>{preventOrphans("Accolades from Across Manhattan")}</span>
            </div>

            <h3 className="font-swiss text-xl sm:text-3xl font-bold text-white heading-balanced">
              {preventOrphans("Loved by New Yorkers & International Diners")}
            </h3>
            
            <p className="text-xs sm:text-sm text-[#C4C4C4] font-swiss mt-2 paragraph-balanced leading-[20px]">
              {preventOrphans("Over 1,200+ 5-star ratings across Google and Yelp for our five neighborhood branches.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-swiss">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#181616] border border-white/10 hover:border-mughlai-gold/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars & Branch tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-mughlai-gold">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-mughlai-gold" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded font-mono">
                      {t.branch}
                    </span>
                  </div>

                  <Quote className="w-6 h-6 text-mughlai-red/60 mb-2" />

                  {/* Testimonial Quote Description */}
                  <p className="text-xs sm:text-sm text-[#C4C4C4] font-swiss leading-[20px] paragraph-balanced">
                    "{preventOrphans(t.quote)}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between font-swiss">
                  <div>
                    {/* Author Sub-Heading */}
                    <h5 className="font-swiss font-bold text-white text-xs">
                      {preventOrphans(t.author)}
                    </h5>
                    <span className="text-[10px] text-mughlai-goldLight block mt-0.5 font-swiss">
                      {t.tag}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
