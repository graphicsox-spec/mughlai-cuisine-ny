import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  UtensilsCrossed, 
  X, 
  Check, 
  ChevronRight,
  ChevronDown,
  Info,
  SlidersHorizontal,
  Plus,
  Minus,
  ShoppingBag
} from 'lucide-react';
import { FULL_MENU, MENU_CATEGORIES } from '../data/fullMenu';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

export default function InteractiveMenu() {
  const { addToCart, updateQuantity, items: cartItems, getItemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'halal-meat' | 'tandoor' | 'spicy'
  const [isExpandedCategories, setIsExpandedCategories] = useState(false);

  const COLLAPSED_COUNT = 7;
  const displayedCategories = useMemo(() => {
    if (isExpandedCategories) return MENU_CATEGORIES;
    const initial = MENU_CATEGORIES.slice(0, COLLAPSED_COUNT);
    const activeObj = MENU_CATEGORIES.find(c => c.id === activeCategory);
    if (activeObj && !initial.some(c => c.id === activeCategory)) {
      return [...initial, activeObj];
    }
    return initial;
  }, [isExpandedCategories, activeCategory]);

  // Filtered Menu Items
  const filteredItems = useMemo(() => {
    return FULL_MENU.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !item.veg) return false;
      if (dietaryFilter === 'halal-meat' && item.veg) return false;
      if (dietaryFilter === 'tandoor' && !item.clayOven) return false;
      if (dietaryFilter === 'spicy' && !item.spicy) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.categoryName.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#141212] relative border-b border-mughlai-border">
      <div id="menu-explorer" className="absolute -top-24 pointer-events-none" />
      
      {/* Background Ambience */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight mb-3">
            <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Royal Culinary Collection")}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight heading-balanced">
            {preventOrphans("Explore the Complete Mughlai Menu")}
          </h2>

          <p className="mt-3 text-sm sm:text-[15px] md:text-base text-[#C4C4C4] font-swiss max-w-5xl mx-auto leading-relaxed">
            <span className="lg:whitespace-nowrap">
              Over 90 authentic delicacies prepared fresh daily with certified 100% Halal meats, live clay oven tandoor skewers,
            </span>
            <span className="block">
              velvety slow-simmered curries, and royal dum biryanis.
            </span>
          </p>
        </div>

        {/* =========================================================================
            MENU CONTROLS: SEARCH & DIETARY FILTERS
        ========================================================================= */}
        <div className="space-y-4 mb-8">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Search Input (+20% Wider) */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all dishes (e.g. Tikka, Korma, Paneer, Naan, Vindaloo)..."
                className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons (Clean Wrap, No Horizontal Slider) */}
            <div className="flex flex-wrap items-center gap-1.5 py-1 font-proxima">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition border ${
                  dietaryFilter === 'all'
                    ? 'border-mughlai-gold/50 bg-gradient-to-r from-mughlai-red/40 via-mughlai-maroon/30 to-mughlai-red/30 text-white shadow-[0_2px_12px_rgba(212,175,55,0.1)] font-semibold'
                    : 'bg-white/5 text-[#C4C4C4] hover:text-white border-white/10'
                }`}
              >
                All Diets
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow font-semibold'
                    : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
                }`}
              >
                <Leaf className="w-3 h-3 text-emerald-400" />
                <span>Vegetarian</span>
              </button>

              <button
                onClick={() => setDietaryFilter('halal-meat')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
                  dietaryFilter === 'halal-meat'
                    ? 'bg-mughlai-red text-white shadow font-semibold'
                    : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-mughlai-gold" />
                <span>100% Halal Meats</span>
              </button>

              <button
                onClick={() => setDietaryFilter('tandoor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
                  dietaryFilter === 'tandoor'
                    ? 'bg-mughlai-flame text-white shadow font-semibold'
                    : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
                }`}
              >
                <Flame className="w-3 h-3 text-orange-400" />
                <span>Clay Oven</span>
              </button>

              <button
                onClick={() => setDietaryFilter('spicy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition flex items-center gap-1 ${
                  dietaryFilter === 'spicy'
                    ? 'bg-red-700 text-white shadow font-semibold'
                    : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
                }`}
              >
                <span>🌶️ Spicy</span>
              </button>
            </div>

          </div>

          {/* =========================================================================
              CATEGORY FILTER: EXPAND / COLLAPSE (NO SLIDER / NO MASKING)
          ========================================================================= */}
          <div className="bg-[#171414] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg space-y-3 font-proxima">
            
            {/* Top Bar: Title + Expand/Collapse Trigger */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-mughlai-gold" />
                <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-wider">
                  Select Menu Category
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  ({MENU_CATEGORIES.length - 1} Categories)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsExpandedCategories(!isExpandedCategories)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-mughlai-gold hover:text-white px-3.5 py-1.5 rounded-xl bg-mughlai-gold/10 hover:bg-mughlai-gold/20 border border-mughlai-gold/30 hover:border-mughlai-gold transition"
              >
                <span>{isExpandedCategories ? 'Collapse Categories' : `View All ${MENU_CATEGORIES.length - 1} Categories`}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-mughlai-gold transition-transform duration-300 ${isExpandedCategories ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Category Pills (Clean Wrapping Directly on Screen - Zero Slide, Zero Mask) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-proxima">
              {displayedCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const itemCount = cat.id === 'all' 
                  ? FULL_MENU.length 
                  : FULL_MENU.filter(m => m.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                      isActive
                        ? 'border-mughlai-gold/60 bg-gradient-to-r from-mughlai-red/40 via-mughlai-maroon/30 to-mughlai-red/30 text-white shadow-[0_2px_12px_rgba(212,175,55,0.15)] font-semibold scale-[1.02]'
                        : 'bg-[#1C1818] text-[#C4C4C4] hover:text-white border-white/10 hover:border-white/25 hover:bg-[#241F1F]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-black/50 text-mughlai-gold font-bold' : 'bg-white/5 text-gray-400'
                    }`}>
                      {itemCount}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Results Count Strip */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <span>
              Showing <strong className="text-white">{filteredItems.length}</strong> delicious dishes
              {activeCategory !== 'all' && ` in ${MENU_CATEGORIES.find(c => c.id === activeCategory)?.name}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </span>
            {(searchQuery || dietaryFilter !== 'all' || activeCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setActiveCategory('all');
                }}
                className="text-mughlai-gold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* =========================================================================
            MENU ITEMS GRID (All 90+ Items)
        ========================================================================= */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#1A1818] border border-white/10 rounded-2xl p-12 text-center max-w-lg mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h4 className="font-display font-bold text-white text-lg">No dishes found</h4>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search query or dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-mughlai-red text-white rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
            {filteredItems.map((item) => {
              const countInCart = getItemCount(item.id);
              const matchingCartItem = cartItems.find((ci) => ci.id === item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-[#181616] hover:bg-[#1E1A1A] border border-white/5 hover:border-mughlai-gold/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mughlai-red/10 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Dish Image Thumbnail with Floating Badges */}
                    <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-[#121010]">
                      <img
                        src={item.image || '/images/Signature_Mughlai_Delicacies_8_Images_800x533/01_Chicken_Tikka_Masala_800x533.jpg'}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#181616] via-transparent to-black/40 pointer-events-none" />

                      {/* Category Tag (Top-Left) */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                          {item.categoryName}
                        </span>
                      </div>

                      {/* Dietary & Spice Badges (Top-Right) */}
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                        {item.spicy && (
                          <span className="text-[10px] bg-red-950/90 backdrop-blur-md text-red-300 border border-red-700/50 px-2 py-0.5 rounded-lg font-mono shadow-sm" title="Spicy Dish">
                            🌶️ Hot
                          </span>
                        )}
                        {item.clayOven && (
                          <span className="text-[10px] bg-amber-950/90 backdrop-blur-md text-orange-300 border border-orange-700/50 px-2 py-0.5 rounded-lg font-mono shadow-sm" title="Clay Oven Tandoor">
                            🔥 Tandoor
                          </span>
                        )}
                        {item.veg ? (
                          <span className="text-[10px] bg-emerald-950/90 backdrop-blur-md text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-lg font-mono shadow-sm">
                            🌱 Veg
                          </span>
                        ) : (
                          <span className="text-[10px] bg-[#2A0808]/90 backdrop-blur-md text-mughlai-goldLight border border-mughlai-gold/40 px-2 py-0.5 rounded-lg font-mono shadow-sm">
                            Halal
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Text Content */}
                    <div className="p-4">
                      <h3 className="font-proxima font-bold text-white text-base group-hover:text-mughlai-gold transition heading-balanced leading-snug">
                        {preventOrphans(item.name)}
                      </h3>

                      <p className="text-xs text-[#C4C4C4] mt-1.5 line-clamp-2 leading-[18px] paragraph-balanced font-proxima">
                        {preventOrphans(item.description)}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Price & Quick Action */}
                  <div className="px-4 pb-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="font-proxima font-bold text-base sm:text-lg text-mughlai-gold">
                      {item.price}
                    </span>

                    {countInCart > 0 ? (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 bg-[#260B0E] border border-mughlai-gold/50 rounded-xl p-1 text-white shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => matchingCartItem && updateQuantity(matchingCartItem.cartId, -1)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition"
                          title="Reduce quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center text-mughlai-gold">
                          {countInCart}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(item, { spiceLevel: matchingCartItem?.spiceLevel || (item.spicy ? 'Medium' : 'Mild') })}
                          className="w-6 h-6 rounded-lg flex items-center justify-center bg-mughlai-red hover:bg-mughlai-red/80 text-white transition"
                          title="Add another"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item, { spiceLevel: item.spicy ? 'Medium' : 'Mild' });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white bg-white/5 hover:bg-mughlai-red px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-mughlai-red transition shadow-sm group-hover:border-mughlai-gold/40"
                      >
                        <Plus className="w-3.5 h-3.5 text-mughlai-gold" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </section>
  );
}
