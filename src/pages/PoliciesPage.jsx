import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Scale, 
  Sparkles, 
  Lock, 
  Building2, 
  Phone, 
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { BRAND_INFO } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';

const POLICY_TABS = [
  {
    id: 'terms',
    step: '01',
    title: 'Terms of Service',
    subtitle: 'Ordering, Fulfillment & Cancellation Rules',
    icon: FileText,
    accentColor: 'text-mughlai-gold'
  },
  {
    id: 'privacy',
    step: '02',
    title: 'Privacy Policy',
    subtitle: '256-Bit SSL Encryption & Zero Data Sale',
    icon: ShieldCheck,
    accentColor: 'text-emerald-400'
  },
  {
    id: 'allergens',
    step: '03',
    title: '100% Halal & Allergens',
    subtitle: 'Certified Halal Meats & Kitchen Safety Notice',
    icon: AlertTriangle,
    accentColor: 'text-mughlai-flame'
  },
  {
    id: 'accessibility',
    step: '04',
    title: 'ADA Title III Accessibility',
    subtitle: 'WCAG 2.1 AA Digital Standards & Audio Assistance',
    icon: Scale,
    accentColor: 'text-blue-400'
  }
];

export default function PoliciesPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'terms';

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(location.search).get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="bg-[#121212] min-h-screen text-[#F5EFEB] py-10 sm:py-16 font-proxima relative overflow-hidden">
      
      {/* Background Ambient Glow (Matches Catering & Story Pages) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-mughlai-maroon/20 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header (Attachment 1 Style: Clean, Open, Unboxed Hero) */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-2">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
            <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Official Restaurant Governance & Compliance")}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight heading-balanced">
            {preventOrphans("Legal & Operational Policies")}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed max-w-3xl mx-auto">
            {preventOrphans("Transparent terms, customer privacy protection, 100% certified Halal meat guarantees, and digital accessibility commitments for Mughlai Indian Cuisine across Manhattan.")}
          </p>

          {/* Quick Trust Badges (Attachment 1 Style, using Scale icon for ADA Title III) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Certified Halal Meats</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-mughlai-gold" />
              <span>NYC Commercial Food Regulations</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-mughlai-gold" />
              <span>256-Bit SSL Privacy Protected</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-400" />
              <span>ADA Title III Accessibility</span>
            </span>
          </div>

          {/* Direct Support & Inquiries Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm h-11 w-[220px] max-w-full rounded-xl shadow-lg shadow-mughlai-red/40 transition transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>{BRAND_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm h-11 w-[260px] max-w-full rounded-xl transition transform hover:-translate-y-0.5 font-mono"
            >
              <Mail className="w-4 h-4 text-mughlai-gold" />
              <span>{BRAND_INFO.email}</span>
            </a>
          </div>

        </div>

        {/* =========================================================================
            4 EQUAL INDEPENDENT TAB CARDS (COMPLETELY REDESIGNED UI)
        ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {POLICY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between group cursor-pointer ${
                  isActive
                    ? 'border-mughlai-gold bg-gradient-to-br from-mughlai-red/35 via-[#1E1718] to-[#141010] shadow-[0_6px_24px_rgba(212,175,55,0.18)] ring-1 ring-mughlai-gold/40 scale-[1.02]'
                    : 'bg-[#181515] border-white/10 hover:border-mughlai-gold/40 hover:bg-[#1E1A1A] hover:-translate-y-0.5'
                }`}
              >
                {/* Top Row: Icon + Active Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-mughlai-gold/20 text-mughlai-gold border border-mughlai-gold/50 shadow-inner'
                        : 'bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mughlai-gold/20 border border-mughlai-gold/50 text-[10px] font-mono font-bold text-mughlai-goldLight shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-mughlai-gold animate-pulse" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-mughlai-gold transition-colors font-medium">
                      Tab {tab.step}
                    </span>
                  )}
                </div>

                {/* Content: Title & Descriptive Subtitle */}
                <div className="space-y-1">
                  <h3
                    className={`font-display text-sm sm:text-[15px] font-bold transition-colors ${
                      isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {tab.title}
                  </h3>
                  <p
                    className={`text-[11px] font-swiss transition-colors leading-relaxed ${
                      isActive ? 'text-mughlai-goldLight/90' : 'text-[#8E8E8E] group-hover:text-gray-300'
                    }`}
                  >
                    {tab.subtitle}
                  </p>
                </div>

                {/* Bottom Active Glow Accent Bar */}
                <div
                  className={`mt-4 h-1 w-full rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-mughlai-gold via-mughlai-flame to-mughlai-red'
                      : 'bg-transparent group-hover:bg-white/10'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-[#171414] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl leading-relaxed text-xs sm:text-sm text-gray-300 font-proxima">
          
          {/* TAB 1: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Terms of Service & Ordering Guidelines</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono">Effective Date: 2026 • NYC Commercial Food Regulations</p>
              </div>

              <p>
                Welcome to Mughlai Indian Cuisine. By placing an online pickup or delivery order, booking private catering, or reserving a table at any of our five Manhattan branches (Upper East Side, Kips Bay, Hell's Kitchen, Financial District, Upper West Side), you agree to the following terms and operating guidelines.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">1. Order Fulfillment & Delivery Windows</h3>
                  <p className="text-gray-300">
                    Standard Manhattan delivery times are typically 35–55 minutes depending on traffic and kitchen volume. Because each entrée and naan is cooked fresh to order, slight delays may occur during peak lunch (12pm–2pm) and dinner (6:30pm–8:30pm) rushes.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">2. Takeout & Delivery Special ($22.95 Feast)</h3>
                  <p className="text-gray-300">
                    The $22.95 Special Deal includes 1 Appetizer, 1 Royal Entrée, Basmati Rice, Plain or Garlic Naan, and Chutneys. This promotional bundle is valid exclusively for takeout and direct delivery orders and cannot be combined with third-party courier coupons.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">3. Cancellations & Modifications</h3>
                  <p className="text-gray-300">
                    Because dishes are cooked immediately upon receipt, online orders can only be modified or canceled within 5 minutes of order confirmation by calling the selected kitchen directly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Customer Privacy & Data Protection Policy</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono">Strict Compliance with New York Consumer Privacy Standards</p>
              </div>

              <p>
                Mughlai Indian Cuisine values your trust. We collect only the essential personal information needed to safely process, package, and deliver your culinary order.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">1. Payment Card Data Security</h3>
                  <p className="text-gray-300">
                    All online credit and debit card transactions are encrypted with 256-bit SSL protocols and processed via PCI-DSS compliant payment gateways. We never store raw card numbers, CVVs, or cardholder banking credentials on our local servers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">2. Delivery Phone & SMS Communications</h3>
                  <p className="text-gray-300">
                    By providing your phone number during checkout, you authorize our restaurant managers and delivery drivers to contact you via telephone or automated SMS regarding order status, doorman drop-offs, and kitchen inquiries.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">3. Zero Selling of Personal Data</h3>
                  <p className="text-gray-300">
                    We strictly uphold a policy against selling, leasing, or trading our patrons' personal information to third-party data brokers, marketers, or advertisers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALLERGENS & HALAL */}
          {activeTab === 'allergens' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">100% Certified Halal Meat & Allergen Notice</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono">NYC Department of Health Dietary Safety Statement</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2">
                <h3 className="font-bold flex items-center gap-2 text-base text-emerald-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>100% Certified Halal Across All Five Manhattan Kitchens</span>
                </h3>
                <p className="text-xs text-emerald-300">
                  Every cut of chicken, lamb, and goat served at our Upper East Side, Kips Bay, Hell's Kitchen, Financial District, and Upper West Side locations is strictly certified 100% Halal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">Allergen Advisory:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• <strong>Dairy & Butter:</strong> Several traditional curries (Tikka Masala, Korma, Dal Makhani) and naans use butter, ghee, and cream.</li>
                    <li>• <strong>Tree Nuts:</strong> Royal Mughlai gravies are prepared using traditional cashew paste, almonds, and melon seeds for flavor depth.</li>
                    <li>• <strong>Gluten & Wheat:</strong> Tandoor breads are rolled from wheat dough. Steamed basmati rice and tandoor meats are prepared naturally gluten-friendly.</li>
                  </ul>
                  <p className="text-[11px] text-mughlai-goldLight italic pt-1">
                    Please inform our kitchen staff of severe allergies before dining or ordering.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACCESSIBILITY */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-white/10 pb-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Digital Accessibility Statement (ADA Title III Compliance)</h2>
                <p className="text-xs text-gray-400 mt-1 font-mono">Commitment to Equal Digital Access under WCAG 2.1 AA & Title III Law</p>
              </div>

              <p>
                Mughlai Indian Cuisine is committed to ensuring that our website is accessible to all individuals, including people with disabilities. We continually review and improve our website to align with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and Title III statutory standards.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">Accessibility Features:</h3>
                  <p className="text-gray-300">
                    High contrast text ratios, descriptive alt tags on dishes, keyboard navigable interactive menus, and mobile screen reader compatibility.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0D0B0B] border border-white/10 space-y-2">
                  <h3 className="font-bold text-white text-sm">Need Telephone Assistance?</h3>
                  <p className="text-gray-300">
                    If you experience any accessibility difficulty navigating our online menu or ordering feast items, please call our primary telephone line at <strong className="text-white">212-722-6262</strong> or email <strong className="text-white">MughlaiCuisineNY@gmail.com</strong> for immediate personalized dining service.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
