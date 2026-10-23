import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  Utensils, 
  Building2, 
  HeartHandshake, 
  PartyPopper,
  Clock,
  MapPin,
  Flame
} from 'lucide-react';
import { LOCATIONS, BRAND_INFO } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import CustomSelect from './CustomSelect';

const CATERING_PACKAGES = [
  {
    id: 'corp',
    name: 'Royal Corporate\u00A0Luncheon',
    subtitle: 'Ideal for Wall Street boardrooms, tech summits & office gatherings',
    pricePerPerson: 'From $24 / person',
    minGuests: '15+ Guests',
    features: [
      'Assorted Samosa & Pakora Appetizer Trays',
      'Choice of 2 Kadhai Entrées (e.g. Chicken Tikka Masala & Daal Mughlai)',
      'Steaming Long-Grain Basmati Rice & Fresh Naan',
      'Cucumber Raita, Mango Chutney & Mint Chutney',
      'Individual compostable cutlery, plates & napkins',
      'Insulated hot delivery on time across Manhattan'
    ],
    badge: 'Popular for Business'
  },
  {
    id: 'feast',
    name: 'Grand Mughlai\u00A0Buffet',
    subtitle: 'Our signature full-spread feast for family milestones & private parties',
    pricePerPerson: 'From $36 / person',
    minGuests: '25+ Guests',
    features: [
      '3 Clay Oven Appetizers (Chicken Tikka, Seekh Kebab, Paneer Tikka)',
      '3 Signature Entrées (Lamb Roghan Josh, Chicken Makhani, Saag Paneer)',
      'Fragrant Mughlai Special Dum Biryani Handi',
      'Artisanal Tandoori Bread Basket (Garlic Naan, Roti, Kulcha)',
      'Warm Gulab Jamun & Mughlai Kheer Dessert Chafers',
      'Stainless chafing dishes & Sterno heating kits included'
    ],
    badge: 'Signature Spread'
  },
  {
    id: 'imperial',
    name: 'Imperial Gala &\u00A0Wedding',
    subtitle: 'Comprehensive bespoke dining with optional on-site live tandoor stations',
    pricePerPerson: 'Custom Quote',
    minGuests: '50+ Guests',
    features: [
      'Live Clay Oven Tandoor chef station available on-site',
      'Customized multi-course royal Mughlai tasting menu',
      'Street food chaat counter (Pani Puri, Papri Chaat, Bhel Puri)',
      'Dedicated event captain, uniformed servers & bartenders',
      'Complete table setting, chinaware & buffet staging',
      'Full coordination with Manhattan venue managers'
    ],
    badge: 'Full-Service Luxury'
  }
];

export default function CateringSection() {
  // Form State
  const [formData, setFormData] = useState({
    eventType: 'Corporate Event',
    guestCount: '25-50',
    preferredBranch: LOCATIONS[0].name,
    serviceStyle: 'Chafing Dish Setup (Hot Buffet)',
    eventDate: '',
    fullName: '',
    company: '',
    email: '',
    phone: '',
    specialNotes: '',
    halalOnly: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate inquiry submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="catering" className="py-20 bg-[#161313] relative overflow-hidden border-b border-mughlai-border">
      
      {/* Background Ambience */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-mughlai-red/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-mughlai-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
            <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Manhattan & Tri-State Event Dining")}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight heading-balanced">
            {preventOrphans("Royal Mughlai Catering & Events")}
          </h1>

          <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed max-w-5xl mx-auto">
            <span className="lg:whitespace-nowrap lg:block">
              {preventOrphans("Bring authentic imperial dining to your corporate boardrooms, milestone family celebrations, and grand wedding receptions.")}{' '}
            </span>
            <span className="lg:whitespace-nowrap lg:block">
              {preventOrphans("From 20 to 1,000+ guests with optional live clay oven tandoors on-site.")}
            </span>
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Users className="w-4 h-4 text-mughlai-gold" />
              <span>20 – 1,000+ Guests</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-mughlai-flame" />
              <span>On-Site Live Tandoor Available</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Certified Halal Meats</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Hot Insulated Manhattan Delivery</span>
            </span>
          </div>

          {/* CTAs (Identical Height & Width: 270px) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm h-12 w-[270px] max-w-full rounded-xl shadow-lg shadow-mughlai-red/40 transition transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>(212) 722-6262</span>
            </a>
            <a
              href={`mailto:${BRAND_INFO.email}`}
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm h-12 w-[270px] max-w-full rounded-xl transition transform hover:-translate-y-0.5"
            >
              <Mail className="w-4 h-4 text-mughlai-gold" />
              <span>{BRAND_INFO.email}</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            CATERING PACKAGES OVERVIEW
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 font-swiss">
          {CATERING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gradient-to-b from-[#1E1919] to-[#141212] border border-white/10 hover:border-mughlai-gold/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-mughlai-red/20 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] bg-mughlai-red/40 border border-mughlai-gold/30 text-mughlai-goldLight px-2.5 py-0.5 rounded-full font-bold font-swiss">
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{pkg.minGuests}</span>
                </div>

                <h3 className="font-swiss text-2xl font-bold text-white group-hover:text-mughlai-gold transition heading-balanced">
                  {preventOrphans(pkg.name)}
                </h3>

                <p className="text-xs text-[#C4C4C4] mt-1 font-swiss paragraph-balanced leading-[18px]">
                  {preventOrphans(pkg.subtitle)}
                </p>

                <div className="mt-4 pb-4 border-b border-white/10">
                  <span className="font-swiss text-2xl font-extrabold gold-text">{pkg.pricePerPerson}</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-[#C4C4C4] font-swiss">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-mughlai-gold shrink-0 mt-0.5" />
                      <span className="paragraph-balanced leading-[18px]">{preventOrphans(feat)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <a
                  href="#catering-inquiry"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-mughlai-red text-white py-3 rounded-xl text-xs font-bold transition border border-white/10 hover:border-mughlai-red"
                >
                  <span>Request Quote for this Package</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            INTERACTIVE QUALIFIED-LEAD INQUIRY FORM
        ========================================================================= */}
        <div id="catering-inquiry" className="bg-[#1C1818] border-2 border-mughlai-gold/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6 font-swiss">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-mughlai-gold font-swiss">
                  <Sparkles className="w-4 h-4 text-mughlai-gold" />
                  <span>Instant Catering Concierge</span>
                </div>
                <h3 className="font-swiss text-xl sm:text-2xl font-bold text-white mt-1 heading-balanced">
                  {preventOrphans("Plan Your Manhattan Event Menu")}
                </h3>
                <p className="text-xs sm:text-sm text-[#C4C4C4] font-swiss mt-2 leading-[20px] paragraph-balanced">
                  {preventOrphans("Tell us about your upcoming event. Our dedicated catering manager will respond within 4 business hours with custom menu proposals and itemized quotes.")}
                </p>
              </div>

              <div className="space-y-3.5 text-xs font-swiss">
                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 p-3.5 rounded-xl">
                  <Phone className="w-4 h-4 text-mughlai-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white font-swiss">Direct Catering Phone Assistance</h5>
                    <p className="text-[#C4C4C4] mt-0.5 font-swiss">Call any of our 5 locations or directly:</p>
                    <a href="tel:+12127226262" className="text-mughlai-goldLight font-mono font-bold hover:underline block mt-0.5">
                      212-722-6262 (Upper East) • 646-398-8985 (FiDi)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 p-3.5 rounded-xl">
                  <Mail className="w-4 h-4 text-mughlai-flame shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white font-swiss">Direct Email Inquiries</h5>
                    <a href={`mailto:${BRAND_INFO.email}`} className="text-mughlai-goldLight font-mono hover:underline block mt-0.5">
                      {BRAND_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/[0.03] border border-white/5 p-3.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white font-swiss">Dietary & Halal Accommodations</h5>
                    <p className="text-[#C4C4C4] mt-0.5 font-swiss">
                      All meat is 100% Halal certified. Robust vegetarian, vegan, and nut-aware options prepared in dedicated sections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-[#141212] border border-white/10 rounded-2xl p-6 sm:p-8 font-swiss">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn font-swiss">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-swiss text-2xl font-bold text-white heading-balanced">
                    {preventOrphans("Catering Request Received!")}
                  </h4>
                  <p className="text-sm text-[#C4C4C4] max-w-md mx-auto font-swiss leading-[20px] paragraph-balanced">
                    {preventOrphans(`Thank you, ${formData.fullName}. Our Manhattan catering manager has received your inquiry for ${formData.guestCount} guests and will contact you at ${formData.email} shortly.`)}
                  </p>

                  {/* Immediate Action Buttons to guarantee inquiry delivery */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(`Catering Inquiry - ${formData.eventType} (${formData.guestCount} Guests)`)}&body=${encodeURIComponent(
                        `Mughlai Catering Inquiry Details:\n\n` +
                        `• Full Name: ${formData.fullName}\n` +
                        `• Company / Organization: ${formData.company || 'N/A'}\n` +
                        `• Phone: ${formData.phone}\n` +
                        `• Email: ${formData.email}\n` +
                        `• Event Type: ${formData.eventType}\n` +
                        `• Guest Count: ${formData.guestCount}\n` +
                        `• Event Date: ${formData.eventDate || 'TBD'}\n` +
                        `• Preferred Kitchen: ${formData.preferredBranch}\n` +
                        `• Service Style: ${formData.serviceStyle}\n` +
                        `• Special Preferences: ${formData.specialNotes || 'None'}\n` +
                        `• 100% Halal Confirmed: ${formData.halalOnly ? 'Yes' : 'No'}`
                      )}`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-mughlai-red hover:bg-mughlai-ruby text-white text-xs font-bold font-swiss shadow-md transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Direct Email to Kitchen</span>
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?phone=12127226262&text=${encodeURIComponent(
                        `👑 *MUGHLAI CATERING INQUIRY*\n` +
                        `Name: ${formData.fullName}\n` +
                        `Company: ${formData.company || 'N/A'}\n` +
                        `Phone: ${formData.phone}\n` +
                        `Guests: ${formData.guestCount}\n` +
                        `Date: ${formData.eventDate || 'TBD'}\n` +
                        `Type: ${formData.eventType}\n` +
                        `Branch: ${formData.preferredBranch}\n` +
                        `Notes: ${formData.specialNotes || 'None'}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold font-swiss shadow-md transition"
                    >
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium font-swiss"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-swiss">
                  
                  {/* Row 1: Event Type & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Event Type
                      </label>
                      <CustomSelect
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        options={[
                          'Corporate Luncheon / Meeting',
                          'Wedding / Reception',
                          'Milestone Birthday / Anniversary',
                          'Private Cocktail Party',
                          'Holiday & Festive Gathering',
                          'Other Special Event'
                        ]}
                        buttonClassName="bg-[#1A1818] border-white/15 hover:border-mughlai-gold/60 text-white rounded-xl py-2.5 px-3.5"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Estimated Guest Count
                      </label>
                      <CustomSelect
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        options={[
                          '15 – 25 Guests',
                          '25 – 50 Guests',
                          '50 – 100 Guests',
                          '100 – 200 Guests',
                          '200+ Large Gala'
                        ]}
                        buttonClassName="bg-[#1A1818] border-white/15 hover:border-mughlai-gold/60 text-white rounded-xl py-2.5 px-3.5"
                      />
                    </div>
                  </div>

                  {/* Row 2: Nearest Manhattan Branch & Service Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Nearest Kitchen to Fulfill
                      </label>
                      <CustomSelect
                        value={formData.preferredBranch}
                        onChange={(e) => setFormData({ ...formData, preferredBranch: e.target.value })}
                        options={LOCATIONS.map((loc) => ({
                          value: loc.name,
                          label: loc.name,
                          subLabel: loc.neighborhood.split('/')[0]
                        }))}
                        buttonClassName="bg-[#1A1818] border-white/15 hover:border-mughlai-gold/60 text-white rounded-xl py-2.5 px-3.5"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Service Preference
                      </label>
                      <CustomSelect
                        value={formData.serviceStyle}
                        onChange={(e) => setFormData({ ...formData, serviceStyle: e.target.value })}
                        options={[
                          'Hot Delivery & Drop-Off',
                          'Chafing Dish Setup (Hot Buffet)',
                          'Full-Service with Servers & Captain',
                          'Live On-Site Tandoor Chef Station'
                        ]}
                        buttonClassName="bg-[#1A1818] border-white/15 hover:border-mughlai-gold/60 text-white rounded-xl py-2.5 px-3.5"
                      />
                    </div>
                  </div>

                  {/* Row 3: Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma / Sarah Miller"
                        className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Company / Organization (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Goldman Sachs, Morgan Stanley"
                        className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4: Email, Phone & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Work / Personal Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(212) 555-0199"
                        className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Event Date (Approx)
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 5: Notes & Dietary */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Menu Preferences & Notes
                    </label>
                    <textarea
                      rows="3"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="Specify favorite curries, biryanis, appetizers, or dietary requirements (vegetarian count, spice level, gluten-free)..."
                      className="w-full bg-[#1A1818] border border-white/15 focus:border-mughlai-gold rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Halal check and Submit button */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.halalOnly}
                        onChange={(e) => setFormData({ ...formData, halalOnly: e.target.checked })}
                        className="rounded border-white/20 text-mughlai-red focus:ring-mughlai-red"
                      />
                      <span>Confirm 100% Certified Halal Meats</span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red via-mughlai-ruby to-mughlai-flame hover:brightness-110 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-xl transition transform hover:-translate-y-0.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? 'Submitting...' : 'Submit Catering Inquiry'}</span>
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
