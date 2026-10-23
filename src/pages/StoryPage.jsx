import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Flame, Star, Award, Calendar } from 'lucide-react';
import HeritageStory from '../components/HeritageStory';
import { preventOrphans } from '../utils/textUtils';

export default function StoryPage() {
  return (
    <div className="bg-[#121212] min-h-screen">
      
      {/* Dedicated Story Page Hero Banner */}
      <div className="bg-gradient-to-b from-[#1C1515] via-[#161212] to-[#121212] border-b border-mughlai-border pt-12 pb-14 relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-5xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
              <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
              <span>{preventOrphans("Centuries of Culinary Royalty in Manhattan")}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight heading-balanced">
              {preventOrphans("Our Story & Culinary Legacy")}
            </h1>

            <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed max-w-5xl mx-auto">
              <span className="lg:whitespace-nowrap lg:block">
                {preventOrphans("For over three decades, Mughlai Indian Cuisine has honored the royal recipes of the Mughal imperial courts — bringing live clay oven tandoors,")}{' '}
              </span>
              <span className="lg:whitespace-nowrap lg:block">
                {preventOrphans("slow-simmered dum cooking, and 100% Halal culinary heritage to the heart of New York City.")}
              </span>
            </p>

            {/* Heritage Quality Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs font-mono">
              <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Award className="w-4 h-4 text-mughlai-gold" />
                <span>30+ Years in New York City</span>
              </span>
              <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-mughlai-flame" />
                <span>Authentic Clay Oven Traditions</span>
              </span>
              <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified 100% Halal Meats</span>
              </span>
              <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Star className="w-4 h-4 text-mughlai-gold" />
                <span>Michelin Guide & Zagat Accolades</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/reserve"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-mughlai-red/40 transition transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Royal Table</span>
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl transition"
              >
                <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
                <span>Order Royal Takeout</span>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Main Heritage & Testimonials Content */}
      <HeritageStory />

    </div>
  );
}
