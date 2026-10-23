import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import MobileBottomBar from './components/MobileBottomBar';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MenuV2Page from './pages/MenuV2Page';
import CateringPage from './pages/CateringPage';
import StoryPage from './pages/StoryPage';
import ReservationsPage from './pages/ReservationsPage';
import PoliciesPage from './pages/PoliciesPage';
import CartPage from './pages/CartPage';
import { LOCATIONS } from './data/locations';

function PageTitleUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname) {
      case '/menu':
      case '/our-menu':
      case '/menu-v2':
      case '/menu-compare':
      case '/our-menu-v2':
        document.title = 'The Complete Mughlai Menu | Mughlai Indian Cuisine NYC';
        break;
      case '/catering':
        document.title = 'Royal Mughlai Catering & Events (20–1,000+ Guests) | NYC';
        break;
      case '/our-story':
      case '/story':
      case '/about':
      case '/about-us':
        document.title = 'Our Heritage & 30-Year Culinary Legacy | Mughlai Indian Cuisine NYC';
        break;
      case '/reserve':
        document.title = 'Reserve a Table | Five Manhattan Locations | Mughlai Indian Cuisine NYC';
        break;
      case '/policies':
        document.title = 'Policies, Halal Certification & Terms | Mughlai Indian Cuisine NYC';
        break;
      case '/bag':
        document.title = 'Your Royal Bag & Express Checkout | Mughlai Indian Cuisine NYC';
        break;
      default:
        document.title = 'Mughlai Indian Cuisine New York | Five Manhattan Kitchens | Halal Dining & Catering';
        break;
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PageTitleUpdater />
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#121212] text-[#F5EFEB] flex flex-col selection:bg-mughlai-red selection:text-white pb-14 lg:pb-0">

          {/* Sticky Header with Multi-Page Navigation */}
          <Header
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
          />

          {/* Main Content Area Routed by Page */}
          <main className="flex-grow relative z-0">
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <HomePage
                    selectedLocation={selectedLocation}
                    onSelectLocation={setSelectedLocation}
                  />
                }
              />
              
              {/* Dedicated Our Menu Page (Direct 90+ Dishes, Zero Modal, No $22.95 Deal) */}
              <Route
                path="/menu"
                element={<MenuPage />}
              />
              <Route path="/our-menu" element={<Navigate to="/menu" replace />} />

              {/* Dedicated Comparison Clone Menu Page (Exact Match to Reference Mockup) */}
              <Route
                path="/menu-v2"
                element={<MenuV2Page />}
              />
              <Route path="/menu-compare" element={<Navigate to="/menu-v2" replace />} />
              <Route path="/our-menu-v2" element={<Navigate to="/menu-v2" replace />} />

              {/* Dedicated Catering & Events Page */}
              <Route
                path="/catering"
                element={<CateringPage />}
              />

              {/* Dedicated Our Story & Heritage Page */}
              <Route
                path="/our-story"
                element={<StoryPage />}
              />
              <Route path="/story" element={<Navigate to="/our-story" replace />} />
              <Route path="/about" element={<Navigate to="/our-story" replace />} />
              <Route path="/about-us" element={<Navigate to="/our-story" replace />} />
              <Route path="/ourstory" element={<Navigate to="/our-story" replace />} />

              {/* Dedicated Full-Page Table Reservations (Replaces LocationModal) */}
              <Route
                path="/reserve"
                element={<ReservationsPage />}
              />
              <Route path="/reservations" element={<Navigate to="/reserve" replace />} />

              {/* Dedicated Full-Page Policies (Replaces LegalModal: Terms, Privacy, Halal, ADA) */}
              <Route
                path="/policies"
                element={<PoliciesPage />}
              />
              <Route path="/terms" element={<Navigate to="/policies?tab=terms" replace />} />
              <Route path="/privacy" element={<Navigate to="/policies?tab=privacy" replace />} />
              <Route path="/allergens" element={<Navigate to="/policies?tab=halal" replace />} />
              <Route path="/halal" element={<Navigate to="/policies?tab=halal" replace />} />
              <Route path="/accessibility" element={<Navigate to="/policies?tab=ada" replace />} />

              {/* Dedicated Full-Page Royal Bag & Checkout (Replaces Checkout & Success Modals) */}
              <Route
                path="/bag"
                element={<CartPage />}
              />
              {/* Auto-redirect legacy /cart and /cart-preview to /bag */}
              <Route path="/cart" element={<Navigate to="/bag" replace />} />
              <Route path="/cart-preview" element={<Navigate to="/bag" replace />} />

              {/* Fallback to HomePage */}
              <Route
                path="*"
                element={
                  <HomePage
                    selectedLocation={selectedLocation}
                    onSelectLocation={setSelectedLocation}
                  />
                }
              />
            </Routes>
          </main>

          {/* 3. Luxury Dark 5-Branch Footer with Direct Full-Page Routing */}
          <Footer />

          {/* 4. Smart Mobile Bottom Conversion Bar */}
          <MobileBottomBar
            selectedLocation={selectedLocation}
          />

        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
