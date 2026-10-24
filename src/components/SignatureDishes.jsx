import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ShieldCheck, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { preventOrphans } from '../utils/textUtils';
import { useCart } from '../context/CartContext';

const FEATURED_ITEMS = [
  {
    id: 'ctm',
    name: 'Chicken Tikka Masala',
    category: 'Chicken Entrée',
    price: '$23.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/01_Chicken_Tikka_Masala_800x533.jpg',
    description: 'Our signature dish of char-grilled chicken in a flavorful creamy tomato sauce.',
    badge: 'Chef’s Signature',
    spicy: false,
    halal: true,
  },
  {
    id: 'dum-biryani',
    name: 'Mughlai Special Dum Biryani',
    category: 'Aromatic Biryani',
    price: '$29.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/02_Mughlai_Special_Dum_Biryani_800x533.jpg',
    description: 'Flavorful dish with mixed meat - chicken, lamb, goat, shrimp & egg slow-simmered with basmati rice.',
    badge: 'Royal Dum Pukht',
    spicy: false,
    halal: true,
  },
  {
    id: 'tandoori-chicken',
    name: 'Clay Oven Tandoori Chicken',
    category: 'Tandoor Specialty',
    price: '$25.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/03_Clay_Oven_Tandoori_Chicken_800x533.jpg',
    description: 'Chicken prepared with yogurt and spices in a clay oven served with potatoes and vegetables.',
    badge: 'Clay Oven Classic',
    spicy: true,
    halal: true,
  },
  {
    id: 'roghan-josh',
    name: 'Lamb Roghan Josh',
    category: 'Lamb Entrée',
    price: '$25.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/04_Lamb_Roghan_Josh_800x533.jpg',
    description: 'A delicacy of Kashmiri cuisine, bold flavors of slow-simmered whole spices and tender lamb.',
    badge: 'Kashmiri Classic',
    spicy: true,
    halal: true,
  },
  {
    id: 'saag-paneer',
    name: 'Saag Paneer',
    category: 'Vegetarian Entrée',
    price: '$22.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/05_Saag_Paneer_800x533.jpg',
    description: 'Fresh Indian cheese pieces sautéed in garden spinach with a delicate hint of aromatic spices.',
    badge: 'Vegetarian Favorite',
    spicy: false,
    halal: true,
  },
  {
    id: 'tandoori-salmon',
    name: 'Tandoori Salmon',
    category: 'Seafood Tandoor',
    price: '$32.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/06_Tandoori_Salmon_800x533.jpg',
    description: 'Roasted fish with yogurt and spices in a clay oven served with potatoes and tender vegetables.',
    badge: 'Wild Catch',
    spicy: false,
    halal: true,
  },
  {
    id: 'naan-basket',
    name: 'Mughlai Bread Basket',
    category: 'Tandoor Breads',
    price: '$17.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/07_Mughlai_Bread_Basket_800x533.jpg',
    description: 'Choose any 3 tandoori breads: Garlic Naan, Onion Kulcha, Peshawari Naan, or Whole Wheat Roti.',
    badge: 'Fresh from Tandoor',
    spicy: false,
    halal: true,
  },
  {
    id: 'gulab-jamun',
    name: 'Warm Gulab Jamun',
    category: 'Royal Desserts',
    price: '$8.95',
    image: '/images/Signature_Mughlai_Delicacies_8_Images_800x533/08_Warm_Gulab_Jamun_800x533.jpg',
    description: 'Golden fried milk dumplings soaked in cardamom and rose water infused aromatic sugar syrup.',
    badge: 'Sweet Finale',
    spicy: false,
    halal: true,
  }
];

export default function SignatureDishes() {
  const { addToCart, updateQuantity, items: cartItems, getItemCount } = useCart();
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? FEATURED_ITEMS 
    : filter === 'veg' 
      ? FEATURED_ITEMS.filter(item => item.category.includes('Vegetarian') || item.category.includes('Dessert') || item.category.includes('Breads'))
      : FEATURED_ITEMS.filter(item => !item.category.includes('Vegetarian') && !item.category.includes('Dessert'));

  return (
    <section id="signature-dishes" className="py-20 bg-[#121212] relative border-b border-mughlai-border [isolation:isolate]">
      
      {/* Background Ambience - Zero-cost Radial Gradient instead of heavy blur filter */}
      <div 
        className="absolute top-1/2 left-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74, 14, 23, 0.25) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/20 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight mb-3">
            <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Culinary Masterpieces • Signature Selection")}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight heading-balanced">
            {preventOrphans("Signature Mughlai Delicacies")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#C4C4C4] font-swiss leading-[20px] max-w-4xl mx-auto md:whitespace-nowrap">
            Direct from our 2026 menu sign: slow-simmered rich curries, clay oven tandoor roasts, and fragrant royal biryanis.
          </p>

          {/* Filter Pills (Menu Navigation) */}
          <div className="flex items-center justify-center gap-2 mt-6 font-swiss">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                filter === 'all' 
                  ? 'bg-mughlai-red text-white shadow-md font-semibold' 
                  : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
              }`}
            >
              All Featured Dishes
            </button>
            <button
              onClick={() => setFilter('non-veg')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                filter === 'non-veg' 
                  ? 'bg-mughlai-red text-white shadow-md font-semibold' 
                  : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
              }`}
            >
              Halal Meats & Tandoor
            </button>
            <button
              onClick={() => setFilter('veg')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                filter === 'veg' 
                  ? 'bg-mughlai-red text-white shadow-md font-semibold' 
                  : 'bg-white/5 text-[#C4C4C4] hover:text-white border border-white/10'
              }`}
            >
              Vegetarian & Breads
            </button>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#1A1818] rounded-2xl overflow-hidden border border-white/10 hover:border-mughlai-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-mughlai-red/20 flex flex-col justify-between"
            >
              {/* Dish Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181515] transform-gpu">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1818] via-transparent to-black/30 pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/85 border border-mughlai-gold/40 text-mughlai-goldLight text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow font-swiss">
                    {dish.badge}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3">
                  <span className="bg-mughlai-red text-white font-swiss font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-lg">
                    {dish.price}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3 font-swiss">
                <div>
                  <span className="text-[11px] font-mono font-semibold text-mughlai-gold">
                    {dish.category}
                  </span>
                  
                  {/* Sub-Heading */}
                  <h3 className="font-swiss text-base sm:text-lg font-bold text-white mt-1 group-hover:text-mughlai-gold transition heading-balanced">
                    {preventOrphans(dish.name)}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#C4C4C4] mt-2 line-clamp-2 leading-[20px] paragraph-balanced font-swiss">
                    {preventOrphans(dish.description)}
                  </p>
                </div>

                {/* Order CTA */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between font-proxima">
                  <span className="text-[11px] text-[#C4C4C4] font-medium">100% Halal Meat</span>
                  {getItemCount(dish.id) > 0 ? (
                    <div className="flex items-center gap-1 bg-[#260B0E] border border-mughlai-gold/50 rounded-xl p-1 text-white shadow-sm">
                      <button
                        type="button"
                        onClick={() => {
                          const ci = cartItems.find((i) => i.id === dish.id);
                          if (ci) updateQuantity(ci.cartId, -1);
                        }}
                        className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition"
                        title="Reduce"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-4 text-center text-mughlai-gold">
                        {getItemCount(dish.id)}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(dish, { spiceLevel: 'Medium' })}
                        className="w-6 h-6 rounded-lg flex items-center justify-center bg-mughlai-red hover:bg-mughlai-red/80 text-white transition"
                        title="Add another"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCart(dish, { spiceLevel: dish.spicy ? 'Medium' : 'Mild' })}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-mughlai-gold hover:text-white bg-mughlai-gold/10 hover:bg-mughlai-red px-3.5 py-1.5 rounded-lg border border-mughlai-gold/30 hover:border-mughlai-red transition"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* View Entire 2026 Menu Banner */}
        <div className="mt-14 bg-gradient-to-r from-mughlai-maroon/60 via-[#1F1919] to-mughlai-maroon/60 border border-mughlai-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="font-swiss text-xl sm:text-2xl font-bold text-white heading-balanced">
              {preventOrphans("Explore our Complete 90+ Item Menu")}
            </h4>
            <p className="text-xs sm:text-sm text-[#C4C4C4] paragraph-balanced font-swiss leading-[20px]">
              {preventOrphans("Featuring rich kadhai curries, sizzling tandoori platters, artisanal clay oven breads, and traditional handcrafted desserts.")}
            </p>
          </div>

          <Link
            to="/menu"
            className="shrink-0 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition inline-flex items-center justify-center transform hover:-translate-y-0.5 active:scale-95 gap-2"
          >
            <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
            <span>{preventOrphans("View Our Menu & Order")}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
