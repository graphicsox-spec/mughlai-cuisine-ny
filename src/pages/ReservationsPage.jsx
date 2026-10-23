import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Send
} from 'lucide-react';
import { LOCATIONS, BRAND_INFO } from '../data/locations';
import { preventOrphans } from '../utils/textUtils';
import CustomSelect from '../components/CustomSelect';

export default function ReservationsPage() {
  const [selectedBranch, setSelectedBranch] = useState(LOCATIONS[0]);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    partySize: '2 Guests',
    date: '',
    time: '7:00 PM',
    seatingPreference: 'Standard Dining',
    specialNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#121212] min-h-screen text-[#F5EFEB] py-10 sm:py-16 font-proxima">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header (Attachment 1 Style: Clean, Open, Unboxed Hero) */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-2">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-mughlai-red/25 border border-mughlai-gold/40 px-3.5 py-1 rounded-full text-xs font-semibold text-mughlai-goldLight">
            <Sparkles className="w-3.5 h-3.5 text-mughlai-gold" />
            <span>{preventOrphans("Manhattan Dine-In Seating & Table Reservations")}</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight heading-balanced">
            {preventOrphans("Reserve Your Royal Table")}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-sm sm:text-base text-[#C4C4C4] font-swiss leading-relaxed max-w-3xl mx-auto">
            {preventOrphans("Experience the smoky warmth of live charcoal tandoors, slow-simmered handi curries, and generous hospitality across our five Manhattan dining locations.")}
          </p>

          {/* Quick Trust Badges (Attachment 1 Style) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-mughlai-gold" />
              <span>5 Manhattan Locations</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mughlai-flame" />
              <span>Open 7 Days • Lunch & Dinner</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Certified Halal Dining</span>
            </span>
            <span className="bg-black/40 border border-white/10 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Parties from 1 to 50+ Guests</span>
            </span>
          </div>

          {/* Symmetrical CTAs (Attachment 1 Style) */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BRAND_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm h-11 w-[220px] max-w-full rounded-xl shadow-lg shadow-mughlai-red/40 transition transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {BRAND_INFO.phone}</span>
            </a>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-xs sm:text-sm h-11 w-[220px] max-w-full rounded-xl transition transform hover:-translate-y-0.5"
            >
              <img src="/images/Menu_icon.svg" alt="" className="w-4 h-4 object-contain shrink-0" />
              <span>Explore Our Menu</span>
            </Link>
          </div>

        </div>

        {/* 2-Column Layout: Left (5 Locations Directory) + Right (Direct Booking Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Five Manhattan Branches */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                Choose Your Manhattan Location
              </h2>
              <span className="text-xs font-mono text-gray-400">
                5 Kitchens Open Daily
              </span>
            </div>

            <div className="space-y-3.5">
              {LOCATIONS.map((loc) => {
                const isSelected = selectedBranch.id === loc.id;

                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedBranch(loc)}
                    className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-r from-mughlai-red/25 via-[#1E1818] to-[#151212] border-mughlai-gold/60 ring-1 ring-mughlai-gold/40 shadow-xl'
                        : 'bg-[#161414] border-white/10 hover:border-white/25 hover:bg-[#1C1818]'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base sm:text-lg">
                          {loc.name}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mughlai-gold/15 text-mughlai-gold border border-mughlai-gold/30">
                          {loc.neighborhood.split('/')[0]}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-mughlai-red shrink-0" />
                        <span>{loc.address}, {loc.cityStateZip}</span>
                      </p>

                      <p className="text-[11px] text-mughlai-goldLight/90 italic">
                        Cross Street: {loc.crossStreet}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-gray-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-mughlai-gold" />
                          <span>Lunch: 11:00 AM – 2:45 PM | Dinner: 5:00 PM – 10:15 PM</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                      <a
                        href={`tel:${loc.phoneRaw}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-mughlai-gold to-mughlai-goldDark text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow hover:brightness-110 transition font-mono"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {loc.phone}</span>
                      </a>

                      <a
                        href={loc.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-white py-1 transition"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (5 cols): Table Reservation Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#171414] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              
              <div className="border-b border-white/10 pb-3">
                <span className="text-[10px] font-mono text-mughlai-gold font-bold uppercase tracking-wider block">
                  Selected Dining Room
                </span>
                <h3 className="font-bold text-lg sm:text-xl text-white">
                  Mughlai {selectedBranch.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedBranch.address} • Direct: {selectedBranch.phone}
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">
                    Table Request Prepared!
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{formData.fullName}</strong>. Your reservation request for <strong>{formData.partySize}</strong> on <strong>{formData.date || 'Today'}</strong> at <strong>{formData.time}</strong> at our {selectedBranch.name} location has been prepared.
                  </p>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={`tel:${selectedBranch.phoneRaw}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-mughlai-gold to-mughlai-goldDark text-black font-bold text-xs font-mono shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Instant Phone Confirmation: {selectedBranch.phone}</span>
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send?phone=12127226262&text=${encodeURIComponent(
                        `👑 *MUGHLAI TABLE RESERVATION REQUEST*\n` +
                        `Branch: Mughlai ${selectedBranch.name}\n` +
                        `Name: ${formData.fullName}\n` +
                        `Phone: ${formData.phone}\n` +
                        `Party Size: ${formData.partySize}\n` +
                        `Date: ${formData.date || 'Today'}\n` +
                        `Time: ${formData.time}\n` +
                        `Seating: ${formData.seatingPreference}\n` +
                        `Notes: ${formData.specialNotes || 'None'}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition"
                    >
                      <span>Send Request via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-gray-400 hover:text-white pt-2"
                    >
                      Book Another Table
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Parham Marandi"
                      className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(212) 555-0199"
                        className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Party Size</label>
                      <select
                        value={formData.partySize}
                        onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                        className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-mughlai-gold transition"
                      >
                        {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', '8+ Guests (Call)'].map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Reservation Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-mughlai-gold transition"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Preferred Time</label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-mughlai-gold transition"
                      >
                        {[
                          '12:00 PM', '1:00 PM', '2:00 PM',
                          '5:30 PM', '6:00 PM', '6:30 PM',
                          '7:00 PM', '7:30 PM', '8:00 PM',
                          '8:30 PM', '9:00 PM', '9:30 PM'
                        ].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Special Occasion / Notes</label>
                    <input
                      type="text"
                      value={formData.specialNotes}
                      onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                      placeholder="e.g. Birthday celebration, booth seating, anniversary..."
                      className="w-full bg-[#0D0B0B] border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-mughlai-gold transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-mughlai-red to-mughlai-flame hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-xl transition flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Request Table Reservation</span>
                  </button>

                  <div className="pt-1 text-center">
                    <p className="text-[11px] text-gray-400">
                      Need immediate seating tonight? Call directly: <strong className="text-white font-mono">{selectedBranch.phone}</strong>
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
