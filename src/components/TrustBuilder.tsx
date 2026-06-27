"use client";

import { Star, Camera, Users } from "lucide-react";

const googleReviews = [
  {
    author: "Rohan Khanna",
    rating: 5,
    date: "1 week ago",
    text: "Direct deals, clean paperwork, and no broker fee on the Sector 150 project. Highly professional real estate group in Noida.",
  },
  {
    author: "Prerna Gupta",
    rating: 5,
    date: "3 weeks ago",
    text: "They organized a private site visit in a luxury car. The transparency regarding the RERA registry IDs of the developers was excellent.",
  },
  {
    author: "Deepak Mehra",
    rating: 5,
    date: "1 month ago",
    text: "Saved 8 Lacs on pre-launch allotments using their allocation desk. Very reliable consultation on Yamuna Expressway hotspots.",
  },
];

const galleryItems = [
  {
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
    label: "VIP Chauffeur Pickup",
    desc: "Private luxury sedan transport for site tours.",
  },
  {
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
    label: "Advisor Consultation",
    desc: "Vetting floor plans and pricing parameters.",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
    label: "On-Site Inspection",
    desc: "Checking construction benchmarks and layouts.",
  },
];

const partners = [
  { name: "ATS Homekraft", rera: "UPRERAAGT19842" },
  { name: "ACE Group", rera: "UPRERAAGT19842" },
  { name: "Gaursons India", rera: "UPRERAAGT19842" },
  { name: "Godrej Properties", rera: "UPRERAAGT19842" },
  { name: "M3M India", rera: "UPRERAAGT19842" },
  { name: "Sobha Limited", rera: "UPRERAAGT19842" },
];

export default function TrustBuilder() {
  return (
    <section id="trust" className="py-24 bg-luxury-green-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-luxury-gold/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Google Reviews and Trust Score */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2 text-luxury-gold">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">
              4.9/5 Google Rating
            </h3>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              Based on 180+ verified reviews from corporate buyers and investors in Noida &amp; Greater Noida.
            </p>
            <div className="flex items-center space-x-2 text-xs font-semibold text-luxury-gold">
              <Users className="w-4.5 h-4.5" />
              <span>100% Verified Buyer Reviews</span>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {googleReviews.map((rev, idx) => (
              <div
                key={idx}
                className="glass p-5 rounded-xl border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-white text-xs">{rev.author}</span>
                    <span className="text-[9px] text-slate-500">{rev.date}</span>
                  </div>
                  <div className="flex space-x-0.5 text-luxury-gold mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-[11px] font-light leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="text-[9px] text-slate-500 font-mono tracking-widest mt-4 uppercase">
                  Google Reviewer
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Site Visit Gallery */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
              Site Operations
            </span>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">
              Chauffeured Site Visit Experience
            </h3>
            <p className="text-slate-300 font-light text-sm">
              We arrange end-to-end site inspections, providing comfortable pickups and on-site construction walk-throughs with senior analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden glass-card flex flex-col border-white/5 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera className="w-8 h-8 text-luxury-gold" />
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    {item.label}
                  </h4>
                  <p className="text-slate-400 text-xs font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Builder Partners Logos */}
        <div className="pb-8 border-b border-white/5">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-semibold block">
              Authorized Channel Partner
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="glass p-4 rounded-xl border-white/5 text-center flex flex-col items-center justify-center min-h-[90px] hover:border-luxury-gold/30 transition-colors duration-300"
              >
                <span className="font-serif text-xs font-bold text-slate-200 tracking-wider">
                  {partner.name}
                </span>
                <span className="text-[9px] text-slate-500 font-mono mt-1 uppercase">
                  RERA Authorized
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
