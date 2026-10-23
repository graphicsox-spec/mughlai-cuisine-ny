import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, AlertTriangle, Accessibility, Sparkles } from 'lucide-react';
import { preventOrphans } from '../utils/textUtils';

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-proxima">
      <div 
        className="bg-[#181616] border-2 border-mughlai-gold/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-mughlai-maroon via-mughlai-red to-[#1A0508] p-5 sm:p-6 border-b border-mughlai-gold/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black/30 border border-mughlai-gold/40 rounded-xl text-mughlai-gold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-proxima text-xl sm:text-2xl font-bold leading-tight">
                {preventOrphans("Legal & Operational Policies")}
              </h3>
              <p className="text-xs text-[#DCCC7B] mt-0.5">
                Mughlai Indian Cuisine • Five Manhattan Kitchens
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/60 text-gray-300 hover:text-white transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#141212] p-2 gap-1.5 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
              activeTab === 'terms'
                ? 'border-mughlai-gold/60 bg-mughlai-gold/15 text-white font-bold'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>Terms of Service</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
              activeTab === 'privacy'
                ? 'border-mughlai-gold/60 bg-mughlai-gold/15 text-white font-bold'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('allergens')}
            className={`py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
              activeTab === 'allergens'
                ? 'border-mughlai-gold/60 bg-mughlai-gold/15 text-white font-bold'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-mughlai-flame" />
            <span>Halal & Allergens</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accessibility')}
            className={`py-2 px-3.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap border ${
              activeTab === 'accessibility'
                ? 'border-mughlai-gold/60 bg-mughlai-gold/15 text-white font-bold'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>Accessibility (ADA)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-proxima">
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bold text-white text-base font-display">Terms of Service & Ordering Guidelines</h4>
              <p>
                Welcome to Mughlai Indian Cuisine. By accessing our website, placing delivery or takeout orders, or submitting catering inquiries, you agree to comply with and be bound by the following terms.
              </p>
              <div className="space-y-2.5 bg-[#141212] p-4 rounded-2xl border border-white/10">
                <p><strong>1. Pricing & Taxes:</strong> All prices are displayed in USD ($) and are subject to mandatory NYC sales tax (8.875%). Prices and specials are subject to change without prior notice.</p>
                <p><strong>2. Order Cancellation:</strong> Due to immediate culinary preparation in our live tandoor and curry stations, online orders may only be cancelled by directly calling the preparing kitchen within 5 minutes of placement.</p>
                <p><strong>3. Delivery Fulfillment:</strong> Hot delivery is available across designated Manhattan delivery zones. Delivery estimates (30–45 minutes) may vary depending on adverse weather or traffic conditions.</p>
                <p><strong>4. Special Deals:</strong> The $22.95 Delivery & Takeout Special is non-transferable and includes 1 Appetizer, 1 Entrée, Basmati Rice, Tandoori Naan, Mango Chutney, and Cucumber Raita.</p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bold text-white text-base font-display">Privacy & Data Protection Policy</h4>
              <p>
                Mughlai Indian Cuisine values your privacy. We collect minimal customer contact details solely to fulfill food orders and coordinate delivery dispatches.
              </p>
              <div className="space-y-2.5 bg-[#141212] p-4 rounded-2xl border border-white/10">
                <p><strong>Information Collected:</strong> Name, delivery street address, phone number, and email provided during checkout or catering inquiry submission.</p>
                <p><strong>SMS & Call Communication:</strong> By placing an order, you consent to receive direct transactional SMS notifications regarding delivery tracking, courier arrival, or order clarifications.</p>
                <p><strong>Zero Third-Party Sharing:</strong> We never sell, rent, or trade your personal data to external marketing agencies or third parties.</p>
                <p><strong>Payment Security:</strong> Payment transactions are handled with industry-standard 256-bit encryption protocols.</p>
              </div>
            </div>
          )}

          {activeTab === 'allergens' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bold text-white text-base font-display">100% Certified Halal Meat & Allergen Notice</h4>
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300">
                <p className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Certified Halal Meats</span>
                </p>
                <p className="text-xs text-emerald-200 mt-1">
                  Every cut of chicken, lamb, and goat served across all five Manhattan kitchens is strictly certified Halal, prepared according to traditional culinary standards.
                </p>
              </div>

              <div className="space-y-2 bg-[#141212] p-4 rounded-2xl border border-white/10">
                <p className="font-bold text-white text-xs uppercase tracking-wider font-mono">Allergen Information:</p>
                <p>• <strong>Dairy & Butter:</strong> Several traditional curries and naans are prepared with ghee, butter, and cream. Please specify dairy allergies in special instructions.</p>
                <p>• <strong>Tree Nuts & Cashews:</strong> Royal Mughlai gravies (including Korma and Tikka Masala) are slow-simmered with cashew paste and almonds for signature richness.</p>
                <p>• <strong>Gluten & Wheat:</strong> Tandoori flatbreads are freshly rolled from wheat flour. Steamed basmati rice and select curries are naturally gluten-free.</p>
                <p className="text-[11px] text-gray-400 italic pt-1">
                  If you have a severe food allergy, please call your local kitchen directly before placing an order.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'accessibility' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-bold text-white text-base font-display">Accessibility Statement (ADA Compliance)</h4>
              <p>
                Mughlai Indian Cuisine is committed to digital accessibility for all diners, including individuals with disabilities. We continually optimize our website experience adhering to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
              </p>
              <div className="space-y-2 bg-[#141212] p-4 rounded-2xl border border-white/10">
                <p>• High-contrast dark royal theme with legible font sizing and responsive layout scaling.</p>
                <p>• Alt text descriptions on signature dish imagery and semantic HTML navigation structure.</p>
                <p>• If you experience any accessibility barrier, please email us at <strong className="text-white">MughlaiCuisineNY@gmail.com</strong> or call <strong className="text-white">212-722-6262</strong> for immediate telephone dining assistance.</p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#121212] p-3.5 text-center border-t border-white/10 flex items-center justify-between text-xs text-gray-400 px-6">
          <span>Mughlai Indian Cuisine • New York, NY</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
