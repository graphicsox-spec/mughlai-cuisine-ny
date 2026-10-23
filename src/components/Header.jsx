import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, MapPin, ChevronDown, Phone, Calendar, ShoppingBag, Flame } from 'lucide-react';
import { LOCATIONS } from '../data/locations';
import { useCart } from '../context/CartContext';
import { getAssetUrl } from '../utils/assetUtils';

export default function Header({ selectedLocation, onSelectLocation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const locationDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItemCount, setSelectedKitchen } = useCart();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'glass-header shadow-2xl py-2.5' : 'bg-[#121212]/95 py-3.5 border-b border-mughlai-border'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - New V2 Gold SVG */}
          <Link to="/" className="flex items-center group">
            <div className="h-11 sm:h-12 md:h-14 flex items-center transition-transform duration-300 group-hover:scale-105">
              <img
                src={getAssetUrl('/brand/MIC-Logo-New-v2.svg')}
                alt="Mughlai Indian Cuisine"
                className="h-full w-auto object-contain drop-shadow"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Swiss-721, 14px, 500 weight, #C4C4C4) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium font-swiss">
            <Link 
              to="/menu" 
              className={`transition py-1 ${
                isActive('/menu')
                  ? 'text-white font-semibold border-b-2 border-mughlai-gold text-mughlai-goldLight'
                  : 'text-[#C4C4C4] hover:text-white hover:-translate-y-0.5'
              }`}
            >
              <span>Our Menu</span>
            </Link>

            <Link 
              to="/catering" 
              className={`transition font-swiss py-1 ${
                isActive('/catering')
                  ? 'text-white font-semibold border-b-2 border-mughlai-gold text-mughlai-goldLight'
                  : 'text-[#C4C4C4] hover:text-white hover:-translate-y-0.5'
              }`}
            >
              <span>Catering & Events</span>
            </Link>

            <Link 
              to="/our-story" 
              className={`transition font-swiss py-1 ${
                isActive('/our-story')
                  ? 'text-white font-semibold border-b-2 border-mughlai-gold text-mughlai-goldLight'
                  : 'text-[#C4C4C4] hover:text-white hover:-translate-y-0.5'
              }`}
            >
              <span>Our Story</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-2.5">

            {/* Active Location Dropdown (Clean text + chevron without rectangular button box) */}
            <div className="relative" ref={locationDropdownRef}>
              <button
                type="button"
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="inline-flex items-center gap-1 text-sm font-swiss text-white hover:text-mughlai-gold transition py-1 px-1.5 group focus:outline-none"
                aria-expanded={locationDropdownOpen}
                title="Select Manhattan Kitchen"
              >
                <span className="font-medium">{selectedLocation ? selectedLocation.name : '5 Manhattan Locations'}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${locationDropdownOpen ? 'rotate-180 text-mughlai-gold' : 'group-hover:text-white'}`} />
              </button>

              {locationDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-72 bg-[#1A1818] border border-mughlai-gold/30 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn font-swiss"
                >
                  <div className="px-3.5 py-1.5 border-b border-white/10 text-xs font-semibold text-mughlai-goldLight font-swiss">
                    Select Nearest Kitchen
                  </div>
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectLocation(loc);
                        setSelectedKitchen(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-mughlai-red/20 transition flex items-start gap-2.5 font-swiss ${selectedLocation?.id === loc.id ? 'bg-mughlai-red/25 border-l-2 border-mughlai-gold/60' : ''}`}
                    >
                      <svg viewBox="0 0 26.25 34.52" className="w-4 h-4 fill-current text-mughlai-gold shrink-0 mt-0.5">
                        <path d="M13.92,34.2c-.54.44-1.1.42-1.62,0-4.38-3.56-8.53-8.43-10.72-13.69C.51,17.94-.15,15.01.03,12.29.5,5.02,6.82-.48,14.05.03c6.42.46,11.64,5.56,12.15,12.05.19,2.4-.27,4.99-1.09,7.3-2.05,5.77-6.48,10.96-11.2,14.82ZM18.44,13.13c0-2.93-2.38-5.31-5.31-5.31s-5.31,2.38-5.31,5.31,2.38,5.31,5.31,5.31,5.31-2.38,5.31-5.31Z"/>
                      </svg>
                      <div className="font-swiss">
                        <p className="text-sm font-semibold text-white">{loc.name}</p>
                        <p className="text-xs text-[#C4C4C4]">{loc.address}</p>
                        <p className="text-[11px] text-mughlai-goldLight font-mono mt-0.5">{loc.phone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/reserve"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-mughlai-goldLight hover:text-white border border-mughlai-gold/40 hover:border-mughlai-gold hover:bg-mughlai-gold/10 px-[16px] py-[8.5px] rounded-xl transition shadow-sm hover:brightness-105 transform hover:-translate-y-0.5 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-mughlai-gold" />
              <span>Reserve Table</span>
            </Link>

            <button
              onClick={() => navigate('/menu')}
              className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-gradient-to-r from-mughlai-red via-mughlai-ruby to-mughlai-flame hover:brightness-110 px-[18px] py-[8.5px] rounded-xl shadow-lg shadow-mughlai-red/30 transition transform hover:-translate-y-0.5 active:scale-95"
            >
              <img 
                src={getAssetUrl('/images/Menu_icon.svg')} 
                alt="" 
                className="w-4 h-4 object-contain shrink-0" 
              />
              <span>Order Online</span>
            </button>

            {/* Seamless Cart Bag Icon on Desktop Navigation */}
            <button
              type="button"
              onClick={() => navigate('/bag')}
              className="relative p-2 text-mughlai-gold hover:text-white transition flex items-center justify-center group focus:outline-none"
              title="View Royal Bag"
              aria-label={`View Royal Bag (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-mughlai-gold text-black text-[10px] font-mono font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#121212]">
                  {totalItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu & Cart Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={() => navigate('/bag')}
              className="relative p-2 text-mughlai-gold hover:text-white transition flex items-center justify-center"
              title="View Royal Bag"
              aria-label={`View Royal Bag (${totalItemCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-mughlai-gold text-black text-[10px] font-mono font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md ring-2 ring-[#121212]">
                  {totalItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="text-xs font-bold bg-gradient-to-r from-mughlai-red to-mughlai-flame text-white px-3 py-1.5 rounded-lg shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <img src={getAssetUrl('/images/Menu_icon.svg')} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
              <span>Order Online</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181616] border-b border-mughlai-border px-4 pt-3 pb-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            <Link
              to="/#special-deal"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-200 hover:text-mughlai-gold py-1.5 font-medium flex items-center justify-between border-b border-white/5"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-mughlai-flame shrink-0" />
                <span className="text-white font-semibold">$22.95 Delivery & Takeout Deal</span>
              </div>
              <span className="text-[11px] bg-mughlai-flame text-white px-2 py-0.5 rounded font-mono font-bold">Special</span>
            </Link>

            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 font-medium flex items-center justify-between border-b border-white/5 transition ${
                isActive('/menu') ? 'text-mughlai-gold font-bold' : 'text-gray-200 hover:text-mughlai-gold'
              }`}
            >
              <span>Our Menu</span>
              <span className="text-xs text-mughlai-gold font-mono">90+ Items</span>
            </Link>

            <div className="py-2">
              <p className="text-xs font-semibold text-mughlai-gold mb-2">
                5 Manhattan Locations:
              </p>
              <div className="grid grid-cols-1 gap-2">
                {LOCATIONS.map((loc) => (
                  <div key={loc.id} className="bg-white/5 p-2.5 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{loc.name}</p>
                      <p className="text-gray-400 text-[11px]">{loc.address}</p>
                    </div>
                    <a
                      href={`tel:${loc.phoneRaw}`}
                      className="bg-mughlai-red/40 text-mughlai-goldLight px-2 py-1 rounded text-xs flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/catering"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 font-medium border-b border-white/5 transition block ${
                isActive('/catering') ? 'text-mughlai-gold font-bold' : 'text-gray-200 hover:text-mughlai-gold'
              }`}
            >
              <span>Catering & Events</span>
            </Link>

            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 font-medium border-b border-white/5 transition block ${
                isActive('/our-story') ? 'text-mughlai-gold font-bold' : 'text-gray-200 hover:text-mughlai-gold'
              }`}
            >
              <span>Our Story</span>
            </Link>

            <Link
              to="/bag"
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1.5 font-medium transition flex items-center justify-between ${
                isActive('/bag') ? 'text-mughlai-gold font-bold' : 'text-gray-200 hover:text-mughlai-gold'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-mughlai-gold" />
                <span>Royal Bag</span>
              </div>
              {totalItemCount > 0 && (
                <span className="bg-mughlai-gold text-black text-[11px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </Link>
          </nav>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              to="/reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-mughlai-gold/40 text-mughlai-goldLight font-semibold text-xs"
            >
              Reserve Table
            </Link>
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-mughlai-red to-mughlai-flame text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <img src={getAssetUrl('/images/Menu_icon.svg')} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
              <span>Order Online</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
