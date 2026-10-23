import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  Flame, 
  Utensils, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Heart, 
  ChevronDown,
  Check,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';
import { FULL_MENU, MENU_CATEGORIES } from '../data/fullMenu';
import { useCart } from '../context/CartContext';
import { preventOrphans } from '../utils/textUtils';
import CustomSelect from './CustomSelect';

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

// 13 Category definitions with custom thumbnails and labels matching reference image
const CATEGORIES_V2 = [
  {
    id: 'all',
    name: 'All Items',
    thumbnail: null,
  },
  {
    id: 'soups-salads',
    name: 'Soups & Salads',
    thumbnail: '/images/FullMenu2026/Tamatar Shorba.png',
  },
  {
    id: 'nonveg-appetizers',
    name: 'Clay Oven Non-Veg',
    thumbnail: '/images/FullMenu2026/Tandoori Lamb Chops.png',
  },
  {
    id: 'veg-appetizers',
    name: 'Vegetarian Appetizers',
    thumbnail: '/images/deal/01_Appetizer_Images_800x533/01_Crispy_Vegetable_Samosa_800x533.jpg',
  },
  {
    id: 'chicken-entrees',
    name: 'Chicken Entrées',
    thumbnail: '/images/deal/02_Royal_Entree_5_Images_800x533/01_Chicken_Tikka_Masala_800x533.jpg',
  },
  {
    id: 'lamb-goat',
    name: 'Lamb & Goat Entrées',
    thumbnail: '/images/deal/02_Royal_Entree_5_Images_800x533/02_Kashmiri_Lamb_Roghan_Josh_800x533.jpg',
  },
  {
    id: 'seafood',
    name: 'Seafood Entrées',
    thumbnail: '/images/FullMenu2026/Tandoori Wild Salmon.png',
  },
  {
    id: 'veg-entrees',
    name: 'Vegetarian Entrées',
    thumbnail: '/images/deal/02_Royal_Entree_5_Images_800x533/04_Royal_Saag_Paneer_800x533.jpg',
  },
  {
    id: 'tandoor',
    name: 'Tandoor-e-Mughlai',
    thumbnail: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/03_Clay_Oven_Tandoori_Chicken_800x533.jpg',
  },
  {
    id: 'biryanis',
    name: 'Aromatic Biryanis',
    thumbnail: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/02_Mughlai_Special_Dum_Biryani_800x533.jpg',
  },
  {
    id: 'breads',
    name: 'Breads from the Tandoor',
    thumbnail: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/07_Mughlai_Bread_Basket_800x533.jpg',
  },
  {
    id: 'rice-sides',
    name: 'Rice & Sides',
    thumbnail: '/images/deal/03_Free_Rice_5_Images_800x533/01_Saffron_Infused_Basmati_Rice_800x533.jpg',
  },
  {
    id: 'desserts',
    name: 'Royal Desserts',
    thumbnail: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/08_Warm_Gulab_Jamun_800x533.jpg',
  },
];

export default function InteractiveMenuV2() {
  const { addToCart } = useCart();
  
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'halal' | 'tandoor' | 'spicy'
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const [sortBy, setSortBy] = useState('popular');
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const [showAllCategories, setShowAllCategories] = useState(true);
  const [addedPopupId, setAddedPopupId] = useState(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Real-time suggestions when user focuses or types
  const searchSuggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // Top 5 trending signature dishes when query is empty
      return FULL_MENU.filter(d => d.popular).slice(0, 5);
    }
    return FULL_MENU.filter((item) => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.categoryName.toLowerCase().includes(q);
      return matchName || matchDesc || matchCat;
    }).slice(0, 6);
  }, [searchQuery]);

  // Handle clicking a suggestion
  const handleSelectSuggestion = (dish) => {
    const cleanName = dish.name.replace('\u00A0', ' ');
    setSearchQuery(cleanName);
    setAppliedSearch(cleanName);
    setIsSearchFocused(false);
    setTimeout(() => {
      const el = document.getElementById(`dish-${dish.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  // Stepper handlers
  const handleInc = (dishId) => {
    setQuantities(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 1) + 1
    }));
  };

  const handleDec = (dishId) => {
    setQuantities(prev => ({
      ...prev,
      [dishId]: Math.max(1, (prev[dishId] || 1) - 1)
    }));
  };

  // Toggle Favorite
  const toggleFavorite = (dishId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(dishId)) next.delete(dishId);
      else next.add(dishId);
      return next;
    });
  };

  // Search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedSearch(searchQuery.trim());
  };

  // Add to Bag with quantity
  const handleAddToCart = (dish) => {
    const qty = quantities[dish.id] || 1;
    for (let i = 0; i < qty; i++) {
      addToCart(dish, { spiceLevel: dish.spicy ? 'Medium' : 'Mild' });
    }
    // Show quick visual feedback
    setAddedPopupId(dish.id);
    setTimeout(() => {
      setAddedPopupId(null);
    }, 1500);
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    let list = FULL_MENU.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Dietary Filter
      if (dietaryFilter === 'veg' && !item.veg) return false;
      if (dietaryFilter === 'halal' && item.veg) return false; // Non-veg Halal meats
      if (dietaryFilter === 'tandoor' && !item.clayOven && item.category !== 'tandoor' && item.category !== 'breads') return false;
      if (dietaryFilter === 'spicy' && !item.spicy) return false;

      // 3. Search query
      const query = (appliedSearch || searchQuery).trim().toLowerCase();
      if (query) {
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.categoryName.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.priceNum || 0) - (b.priceNum || 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.priceNum || 0) - (a.priceNum || 0));
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeCategory, dietaryFilter, appliedSearch, searchQuery, sortBy]);

  return (
    <section className="bg-[#0E0C0C] min-h-screen text-[#F5EFEB] py-8 sm:py-12 font-proxima relative selection:bg-mughlai-red selection:text-white">
      
      {/* Subtle Ambient Backlights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-mughlai-maroon/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-64 right-10 w-96 h-96 bg-[#EAA938]/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">

        {/* =========================================================================
            1. TOP HEADER SECTION (Exact match to reference image)
        ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          
          {/* Left Column: Heading & Description */}
          <div className="max-w-2xl space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
              The Complete <span className="text-[#EAA938] font-serif">Mughlai Menu</span>
            </h1>

            <p className="text-xs sm:text-[13px] text-[#A8A8A8] font-swiss leading-relaxed max-w-xl">
              {preventOrphans("Over 90 authentic delicacies prepared fresh daily with certified 100% Halal meats, live clay oven tandoor skewers, velvety slow-simmered curries, and royal dum biryanis.")}
            </p>
          </div>

          {/* Right Column: Search Bar & Dietary Filter Pills (Exact Matching Width & Vertical Alignment) */}
          <div className="flex flex-col gap-3 w-full sm:w-[580px] lg:w-[600px]">
            
            {/* Search Input Box with Live Suggestions */}
            <div ref={searchContainerRef} className="w-full relative">
              <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center bg-[#171414] border border-white/15 focus-within:border-[#EAA938]/60 rounded-full pl-5 sm:pl-6 pr-1.5 py-1.5 shadow-lg transition">
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!isSearchFocused) setIsSearchFocused(true);
                  }}
                  placeholder="Search all dishes (e.g. Tikka, Korma, Paneer, Naan, Vindaloo...)"
                  className="bg-transparent text-white placeholder-gray-500 text-xs sm:text-[13px] outline-none flex-1 font-swiss"
                />

                {/* Quick Clear Input button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setAppliedSearch('');
                    }}
                    className="p-1 mr-1 text-gray-400 hover:text-white transition"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EAA938] hover:bg-[#F5B544] text-black flex items-center justify-center transition shadow-md shrink-0 active:scale-95"
                  title="Search"
                  aria-label="Search"
                >
                  <img
                    src="/images/Search_Icon.svg"
                    alt="Search"
                    className="w-4 h-4 object-contain shrink-0"
                  />
                </button>
              </form>

              {/* Instant Auto-Complete Suggestions Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#161313]/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn">
                  
                  {/* Header / Context indicator */}
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 text-[11px] font-mono text-gray-400">
                    <span className="flex items-center gap-1.5">
                      {searchQuery.trim() ? (
                        <>
                          <span>Dishes matching</span>
                          <strong className="text-white font-sans">"{searchQuery}"</strong>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-[#EAA938]" />
                          <span>Popular Guest Favorites</span>
                        </>
                      )}
                    </span>
                    <span className="text-[#EAA938]">{searchSuggestions.length} found</span>
                  </div>

                  {/* Suggestions List */}
                  <div className="mt-1 space-y-1 max-h-72 overflow-y-auto no-scrollbar">
                    {searchSuggestions.length > 0 ? (
                      searchSuggestions.map((dish) => (
                        <button
                          key={dish.id}
                          type="button"
                          onClick={() => handleSelectSuggestion(dish)}
                          className="w-full p-2 rounded-xl hover:bg-white/[0.08] hover:border-[#EAA938]/40 border border-transparent transition flex items-center justify-between gap-3 text-left group cursor-pointer"
                        >
                          {/* Dish Image + Text */}
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10"
                            />
                            <div className="min-w-0">
                              <p className="font-serif font-bold text-white text-xs sm:text-[13px] group-hover:text-[#EAA938] transition-colors truncate">
                                {dish.name.replace('\u00A0', ' ')}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-swiss mt-0.5">
                                <span className="truncate">{dish.categoryName}</span>
                                <span>•</span>
                                <span className={dish.veg ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
                                  {dish.veg ? "Veg" : "Halal"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Arrow */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-serif font-bold text-[#EAA938] text-xs sm:text-sm font-mono">
                              {dish.price}
                            </span>
                            <span className="text-gray-500 group-hover:text-white transition text-xs">
                              &rarr;
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-400 font-swiss">
                        No dishes found for "{searchQuery}". Try searching for <span className="text-[#EAA938]">Tikka</span>, <span className="text-[#EAA938]">Naan</span>, or <span className="text-[#EAA938]">Biryani</span>.
                      </div>
                    )}
                  </div>

                  {/* Bottom View All Action */}
                  {searchQuery.trim() && (
                    <div className="pt-2 border-t border-white/5 px-2 mt-1 flex items-center justify-between text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedSearch(searchQuery.trim());
                          setIsSearchFocused(false);
                        }}
                        className="text-[#EAA938] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>View all matching results in grid</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Diet Filter Pills Row - Exact same width as search box, 5 equal columns, left & right aligned */}
            <div className="w-full grid grid-cols-5 gap-1.5 sm:gap-2">
              
              {/* 1. All Diets */}
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`w-full py-2 px-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition ${
                  dietaryFilter === 'all'
                    ? 'border-[#EAA938] bg-[#241B13] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)]'
                    : 'border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">All Diets</span>
              </button>

              {/* 2. Vegetarian */}
              <button
                type="button"
                onClick={() => setDietaryFilter('veg')}
                className={`w-full py-2 px-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition ${
                  dietaryFilter === 'veg'
                    ? 'border-[#EAA938] bg-[#241B13] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)]'
                    : 'border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25'
                }`}
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Vegetarian</span>
              </button>

              {/* 3. Halal Meats */}
              <button
                type="button"
                onClick={() => setDietaryFilter('halal')}
                className={`w-full py-2 px-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition ${
                  dietaryFilter === 'halal'
                    ? 'border-[#EAA938] bg-[#241B13] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)]'
                    : 'border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#EAA938] shrink-0" />
                <span className="truncate">Halal Meats</span>
              </button>

              {/* 4. Clay Oven */}
              <button
                type="button"
                onClick={() => setDietaryFilter('tandoor')}
                className={`w-full py-2 px-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition ${
                  dietaryFilter === 'tandoor'
                    ? 'border-[#EAA938] bg-[#241B13] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)]'
                    : 'border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span className="truncate">Clay Oven</span>
              </button>

              {/* 5. Spicy */}
              <button
                type="button"
                onClick={() => setDietaryFilter('spicy')}
                className={`w-full py-2 px-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 sm:gap-1.5 border transition ${
                  dietaryFilter === 'spicy'
                    ? 'border-[#EAA938] bg-[#241B13] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)]'
                    : 'border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25'
                }`}
              >
                <span className="text-xs shrink-0">🌶️</span>
                <span className="truncate">Spicy</span>
              </button>

            </div>

          </div>

        </div>

        {/* =========================================================================
            2. BROWSE BY CATEGORY BOX (Exact match to reference image)
        ========================================================================= */}
        <div className="bg-[#141212] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl">
          
          {/* Box Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/5">
            <div className="flex items-center gap-2 text-white">
              <h2 className="font-bold text-sm sm:text-base text-white font-swiss">
                Browse by Category
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="text-xs text-[#EAA938] hover:text-[#F5B544] font-semibold transition font-swiss"
            >
              <span>All 12 Categories</span>
            </button>
          </div>

          {/* Category Cards Flow: All Items Box on left + 2 Rows of 6 Equal Width Columns */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3 pt-3.5">
            
            {/* All Items Card - Exact match to user mockup: 4 rounded squares icon, bold text, count badge, stretching from top edge of row 1 to bottom edge of row 2 */}
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`w-full sm:w-24 md:w-28 shrink-0 self-stretch rounded-2xl flex flex-col items-center justify-center gap-1.5 p-2 transition active:scale-[0.98] cursor-pointer group ${
                activeCategory === 'all'
                  ? 'border-2 border-[#EAA938] bg-[#221A12] text-[#EAA938] shadow-[0_0_15px_rgba(234,169,56,0.25)] ring-1 ring-[#EAA938]/40'
                  : 'border border-white/10 bg-[#161313] text-gray-300 hover:text-white hover:border-white/25 hover:bg-[#1C1818]'
              }`}
              title="Show All Dishes"
            >
              {/* 4-square icon matching mockup */}
              <div className={`grid grid-cols-2 gap-1 w-4 h-4 shrink-0 transition-colors ${
                activeCategory === 'all' ? 'text-[#EAA938]' : 'text-gray-400 group-hover:text-white'
              }`}>
                <span className="w-1.5 h-1.5 rounded-[2px] bg-current" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-current" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-current" />
                <span className="w-1.5 h-1.5 rounded-[2px] bg-current" />
              </div>

              {/* Title */}
              <span className={`text-xs font-bold font-swiss tracking-tight ${
                activeCategory === 'all' ? 'text-[#EAA938]' : 'text-gray-200 group-hover:text-white'
              }`}>
                All Items
              </span>

              {/* Count Badge matching mockup */}
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold shrink-0 transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#EAA938] text-black shadow-sm'
                  : 'bg-white/10 text-gray-400 group-hover:text-gray-200'
              }`}>
                {FULL_MENU.length}
              </span>
            </button>

            {/* 12 Category Filters: 2 Rows of 6 Equal Width Columns, Perfectly Aligned Vertically Left & Right */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {CATEGORIES_V2.filter(c => c.id !== 'all').map((cat) => {
                const isSelected = activeCategory === cat.id;
                const count = FULL_MENU.filter(m => m.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full py-2 px-1 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 border transition ${
                      isSelected
                        ? 'border-[#EAA938] bg-[#2A2016] text-[#EAA938] shadow-[0_0_12px_rgba(234,169,56,0.2)] ring-1 ring-[#EAA938]/30'
                        : 'border-white/10 bg-[#1A1818] text-gray-300 hover:text-white hover:border-white/25 hover:bg-[#201D1D]'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                      isSelected ? 'bg-black/60 text-[#EAA938] font-bold' : 'bg-white/10 text-gray-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* =========================================================================
            3. RESULTS COUNT & SORTING BAR (Exact match to reference image)
        ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 pb-2">
          
          <p className="text-xs sm:text-sm text-gray-400 font-swiss">
            Showing <span className="text-[#EAA938] font-mono font-bold text-sm sm:text-base">{filteredItems.length}</span> delicious dishes
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-swiss">
            <span className="shrink-0 font-medium text-gray-300">Sort by:</span>
            <CustomSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={SORT_OPTIONS}
              className="w-44 sm:w-48"
              buttonClassName="bg-[#171414] border-white/15 hover:border-[#EAA938] text-white py-1.5 px-3 rounded-lg text-xs"
              menuClassName="bg-[#171414] border-[#EAA938]/40 shadow-2xl"
              align="right"
            />
          </div>

        </div>

        {/* =========================================================================
            4. DISH CARDS GRID - 4 EQUAL COLUMNS (Exact match to reference image)
        ========================================================================= */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredItems.map((dish) => {
              const qty = quantities[dish.id] || 1;
              const isFav = favorites.has(dish.id);
              const isJustAdded = addedPopupId === dish.id;

              return (
                <div
                  key={dish.id}
                  id={`dish-${dish.id}`}
                  className="scroll-mt-28 bg-[#141212] border border-white/10 hover:border-[#EAA938]/60 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                >
                  {/* Top Image Box with Overlays */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Top-Left Badge: Category Name */}
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 shadow">
                        {dish.categoryName}
                      </span>
                    </div>

                    {/* Top-Right Badges: Veg/Halal + Favorite Heart Button */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                      {dish.veg ? (
                        <span className="bg-emerald-950/85 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <Leaf className="w-2.5 h-2.5" />
                          <span>Veg</span>
                        </span>
                      ) : (
                        <span className="bg-amber-950/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Halal</span>
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleFavorite(dish.id)}
                        className="w-7 h-7 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-red-400 hover:scale-110 transition shadow"
                        title={isFav ? "Saved to Favorites" : "Add to Favorites"}
                        aria-label="Add to Favorites"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors ${
                            isFav ? 'fill-red-500 text-red-500' : 'text-white/80'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
                    
                    {/* Title & Description */}
                    <div>
                      <h3 className="font-serif font-bold text-white text-[16px] sm:text-[17px] leading-snug line-clamp-1 group-hover:text-[#EAA938] transition-colors">
                        {dish.name.replace('\u00A0', ' ')}
                      </h3>
                      <p className="text-xs text-[#A0A0A0] leading-relaxed line-clamp-2 mt-1.5 min-h-[34px] font-swiss">
                        {dish.description}
                      </p>
                    </div>

                    {/* Bottom Action Row: Price + Stepper + Add to Bag */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1.5">
                      
                      {/* Price */}
                      <span className="text-[#EAA938] font-serif font-bold text-lg sm:text-xl shrink-0">
                        {dish.price}
                      </span>

                      {/* Quantity Stepper (- 1 +) */}
                      <div className="bg-[#1F1C1C] border border-white/15 rounded-lg px-2 py-1 flex items-center gap-2 text-xs text-white shrink-0">
                        <button
                          type="button"
                          onClick={() => handleDec(dish.id)}
                          className="hover:text-[#EAA938] transition p-0.5 text-gray-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-xs min-w-[12px] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleInc(dish.id)}
                          className="hover:text-[#EAA938] transition p-0.5 text-gray-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Add Button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(dish)}
                        className={`font-bold text-xs sm:text-[13px] px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0 ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#EAA938] hover:bg-[#F5B544] text-black'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add</span>
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#141212] rounded-3xl border border-white/10 p-8 space-y-3">
            <p className="text-base text-gray-300 font-serif">No dishes found matching your current filter.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setDietaryFilter('all');
                setSearchQuery('');
                setAppliedSearch('');
              }}
              className="px-4 py-2 bg-[#EAA938] text-black font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
