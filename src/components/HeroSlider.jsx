import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  Calendar, 
  Pause,
  Play
} from 'lucide-react';
import { SLIDES } from '../data/sliderData';
import { preventOrphans } from '../utils/textUtils';

export default function HeroSlider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const SLIDE_DURATION = 5500; // 5.5 seconds per slide
  const TICK_INTERVAL = 50;

  // Next Slide Handler
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  };

  // Prev Slide Handler
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  // Autoplay Logic with progress bar
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(progressIntervalRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
      }
    }, TICK_INTERVAL);

    return () => clearInterval(progressIntervalRef.current);
  }, [current, isPlaying]);

  const activeSlide = SLIDES[current];

  return (
    <section 
      className="relative z-0 w-full overflow-hidden bg-[#121212] select-none"
      aria-label="Mughlai Signature Dishes Slider"
    >
      {/* 
        Container Ratio:
        Desktop: 1920x900 aspect ratio (max-h-[880px] min-h-[580px])
        Mobile: 1080x1440 portrait ratio (aspect-[3/4] min-h-[580px] max-h-[760px])
      */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[1920/900] min-h-[580px] max-h-[880px]">
        
        {/* Background Image Layer */}
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Picture element for Desktop (1920x900) vs Mobile (1080x1440 portrait) */}
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
                <img
                  src={slide.desktopImage}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </picture>

              {/* Desktop Gradient Scrim (Left-to-Right for crystal text legibility) */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 via-35% to-transparent pointer-events-none" />
              
              {/* Top Vignette for Navbar contrast */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#121212]/90 to-transparent pointer-events-none" />

              {/* Bottom Scrim for Slider Controls */}
              <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Content Overlay */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end md:justify-center pb-20 md:pb-0">
          
          <div className="max-w-2xl lg:max-w-2xl space-y-3 sm:space-y-4">
            
            {/* Dish Name (Sub-Heading) */}
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-mono text-mughlai-gold font-bold">
                Dish #{String(activeSlide.id).padStart(2, '0')}
              </span>
              <span className="h-px w-10 bg-mughlai-gold/40" />
              <span className="text-xs sm:text-sm font-swiss font-medium text-[#C4C4C4]">
                {preventOrphans(activeSlide.dishName)}
              </span>
            </div>

            {/* Deal Notice Pill - Positioned between Dish Number and Heading */}
            <div className="inline-flex items-center gap-1.5 bg-mughlai-red/35 border border-mughlai-flame/40 px-3 py-1.5 rounded-lg text-xs text-gray-200 w-fit">
              <Flame className="w-3.5 h-3.5 text-mughlai-flame animate-pulse shrink-0" />
              <span className="font-swiss">{preventOrphans(activeSlide.dealNotice)}</span>
            </div>

            {/* Main Headline (Alice Title Case, Standard Spacing) */}
            <h2 className="font-display text-xl sm:text-3xl lg:text-[42px] font-bold text-white leading-tight heading-balanced drop-shadow-md">
              {preventOrphans(activeSlide.headline)}
            </h2>

            {/* Description (Swiss-721, #C4C4C4, 14-16px, 20-22px line height, No Orphans) */}
            <p className="text-xs sm:text-base text-[#C4C4C4] font-swiss max-w-xl leading-[22px] paragraph-balanced drop-shadow">
              {preventOrphans(activeSlide.description)}
            </p>

            {/* Clean A La Carte Text Info (No Button / No Rectangular Box) */}
            <div className="flex items-baseline gap-2 pt-1 font-swiss">
              <span className="text-xs sm:text-sm text-[#A8A8A8] font-swiss">A La Carte:</span>
              <span className="font-swiss font-bold text-lg sm:text-xl text-mughlai-gold font-mono">{activeSlide.price}</span>
            </div>

            {/* Action CTAs - Symmetrical Identical Height & Width */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="w-full sm:w-[210px] h-[52px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red via-mughlai-ruby to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xl shadow-mughlai-red/40 transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
                <span>Order Online</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/reserve')}
                className="w-full sm:w-[210px] h-[52px] inline-flex items-center justify-center gap-2 bg-[#120F0F]/90 hover:bg-black text-mughlai-goldLight hover:text-white border border-mughlai-gold/40 hover:border-mughlai-gold font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md shadow-lg shadow-black/40 transition transform hover:-translate-y-0.5 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-mughlai-gold" />
                <span>Reserve Table</span>
              </button>
            </div>

          </div>

        </div>

        {/* Slide Counter & Play/Pause */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-gray-300">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:text-mughlai-gold transition"
            aria-label={isPlaying ? "Pause Slider" : "Play Slider"}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-mughlai-flame" />}
          </button>
          <span>{String(current + 1).padStart(2, '0')}</span>
          <span className="text-gray-500">/</span>
          <span>{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* Bottom Dish Selector Pills (Desktop) */}
        <div className="hidden lg:flex absolute bottom-5 inset-x-0 z-30 justify-center items-center gap-2 px-4">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setCurrent(idx);
                setProgress(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-2 backdrop-blur-md border ${
                idx === current
                  ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/50 via-mughlai-maroon/40 to-mughlai-red/40 text-white shadow-[0_2px_12px_rgba(212,175,55,0.12)] font-semibold'
                  : 'bg-black/60 text-gray-400 hover:text-white border-white/10 hover:border-white/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${idx === current ? 'bg-mughlai-gold animate-ping' : 'bg-gray-500'}`} />
              <span>{slide.dishName.replace('\u00A0', ' ')}</span>
            </button>
          ))}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="lg:hidden absolute bottom-4 inset-x-0 z-30 flex justify-center items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === current ? 'w-8 bg-mughlai-gold' : 'w-2 bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar (Bottom edge) */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 z-20 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-mughlai-red via-mughlai-flame to-mughlai-gold transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </section>
  );
}
