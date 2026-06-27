"use client";

import { useState } from "react";
import { MapPin, Send, Search, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Property {
  id: string;
  title: string;
  location: string;
  priceVal: number; // in Lacs for sorting/filtering
  priceStr: string;
  type: "Apartment" | "Penthouse" | "Villa" | "Luxury Plots";
  beds?: number;
  baths?: number;
  area: string;
  image: string;
  reraId: string;
  status: "Ready to Move" | "Under Construction" | "Newly Launched";
  possession: string;
  developer: "Nimbus" | "ACE" | "ATS" | "Gaur" | "Sovereign" | "Eldeco";
  routeUrl: string;
}

const properties: Property[] = [
  {
    id: "finder-1",
    title: "Nimbus The Palm Village",
    location: "Yamuna Expressway, Greater Noida",
    priceVal: 90,
    priceStr: "₹90.00 Lac onwards",
    type: "Apartment",
    beds: 2,
    baths: 2,
    area: "1,450 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ834510",
    status: "Newly Launched",
    possession: "Dec 2028",
    developer: "Nimbus",
    routeUrl: "/nimbus-palm-village",
  },
  {
    id: "finder-2",
    title: "ACE Hanei Residences",
    location: "Sector 12, Greater Noida West",
    priceVal: 160,
    priceStr: "₹1.60 Cr onwards",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: "2,200 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ294811",
    status: "Under Construction",
    possession: "Jun 2027",
    developer: "ACE",
    routeUrl: "/ace-hanei",
  },
  {
    id: "finder-3",
    title: "ATS Homekraft Sanctuary",
    location: "Sector 150, Noida Expressway",
    priceVal: 225,
    priceStr: "₹2.25 Cr onwards",
    type: "Apartment",
    beds: 3,
    baths: 4,
    area: "2,550 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ119432",
    status: "Ready to Move",
    possession: "Immediate",
    developer: "ATS",
    routeUrl: "/ats-homekraft",
  },
  {
    id: "finder-4",
    title: "Gaur Yamuna City Plots",
    location: "Yamuna Expressway, Jewar Corridor",
    priceVal: 120,
    priceStr: "₹1.20 Cr onwards",
    type: "Luxury Plots",
    area: "250 - 500 Sq.Yds.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ550219",
    status: "Under Construction",
    possession: "Dec 2026",
    developer: "Gaur",
    routeUrl: "/gaur-yamuna-city",
  },
  {
    id: "finder-5",
    title: "The Sovereign Sky Suites",
    location: "Sector 94, Noida",
    priceVal: 480,
    priceStr: "₹4.80 Cr onwards",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: "4,600 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ039485",
    status: "Under Construction",
    possession: "Dec 2027",
    developer: "Sovereign",
    routeUrl: "#properties", // links to central showcase
  },
  {
    id: "finder-6",
    title: "Elysian Woods Duplex Villas",
    location: "Sector 128, Noida",
    priceVal: 820,
    priceStr: "₹8.20 Cr onwards",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: "5,800 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ994031",
    status: "Ready to Move",
    possession: "Immediate",
    developer: "Eldeco",
    routeUrl: "#properties",
  },
];

interface PropertyFinderProps {
  onInquire: (propertyName: string) => void;
}

export default function PropertyFinder({ onInquire }: PropertyFinderProps) {
  const [filterType, setFilterType] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterDeveloper, setFilterDeveloper] = useState<string>("All");
  const [filterBudget, setFilterBudget] = useState<string>("All");

  const filteredProperties = properties.filter((prop) => {
    // Type filter
    if (filterType !== "All" && prop.type !== filterType) return false;

    // Location filter
    if (filterLocation !== "All") {
      if (filterLocation === "Expressway" && !prop.location.includes("Expressway")) return false;
      if (filterLocation === "GrNoidaWest" && !prop.location.includes("Greater Noida West") && !prop.location.includes("Sector 12")) return false;
      if (filterLocation === "Yamuna" && !prop.location.includes("Yamuna Expressway")) return false;
      if (filterLocation === "Noida" && !prop.location.includes("Noida") && !prop.location.includes("Sector")) return false;
    }

    // Developer filter
    if (filterDeveloper !== "All" && prop.developer !== filterDeveloper) return false;

    // Budget filter (priceVal in Lacs)
    if (filterBudget !== "All") {
      if (filterBudget === "under-1.5cr" && prop.priceVal >= 150) return false;
      if (filterBudget === "1.5cr-3cr" && (prop.priceVal < 150 || prop.priceVal > 300)) return false;
      if (filterBudget === "above-3cr" && prop.priceVal <= 300) return false;
    }

    return true;
  });

  const getWhatsAppLink = (title: string, rera: string) => {
    const text = encodeURIComponent(
      `Hello Goodluck Properties, I want to inquire about "${title}" (RERA: ${rera}). Please send brochure and price options.`
    );
    return `https://wa.me/919315381500?text=${text}`;
  };

  return (
    <section id="finder" className="py-24 bg-luxury-green-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-luxury-gold/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
            Direct Matchmaker
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Curated Property Finder
          </h2>
          <p className="text-slate-300 font-light">
            Refine our portfolio by location, layouts, budgets, or specific developer names to locate your next asset instantly.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass p-6 rounded-2xl border-luxury-gold/15 shadow-xl mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Property Type */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              Property Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark cursor-pointer text-slate-200"
            >
              <option value="All">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa</option>
              <option value="Luxury Plots">Plots</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              Micro Location
            </label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark cursor-pointer text-slate-200"
            >
              <option value="All">All Locations</option>
              <option value="Noida">Noida Proper</option>
              <option value="Expressway">Noida Expressway</option>
              <option value="GrNoidaWest">Greater Noida West</option>
              <option value="Yamuna">Yamuna Expressway</option>
            </select>
          </div>

          {/* Developer */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              Brand Developer
            </label>
            <select
              value={filterDeveloper}
              onChange={(e) => setFilterDeveloper(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark cursor-pointer text-slate-200"
            >
              <option value="All">All Developers</option>
              <option value="Nimbus">Nimbus Group</option>
              <option value="ACE">ACE Group</option>
              <option value="ATS">ATS Homekraft</option>
              <option value="Gaur">Gaursons</option>
              <option value="Sovereign">Sovereign</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1.5">
              Max Budget
            </label>
            <select
              value={filterBudget}
              onChange={(e) => setFilterBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark cursor-pointer text-slate-200"
            >
              <option value="All">Any Budget</option>
              <option value="under-1.5cr">Under ₹1.5 Cr</option>
              <option value="1.5cr-3cr">₹1.5 Cr - ₹3 Cr</option>
              <option value="above-3cr">₹3 Cr +</option>
            </select>
          </div>
        </div>

        {/* Results Showcase */}
        <AnimatePresence mode="popLayout">
          {filteredProperties.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProperties.map((prop) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col rounded-2xl overflow-hidden glass-card h-full"
                >
                  {/* Image Block */}
                  <div className="relative h-60 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prop.image}
                      alt={prop.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Status Badge */}
                    <span className="absolute top-4 left-4 bg-luxury-green-medium border border-luxury-gold/45 text-luxury-gold-light text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                      {prop.status}
                    </span>

                    {/* Possession Date Badge */}
                    <div className="absolute bottom-4 right-4 flex items-center space-x-1 text-[10px] bg-black/40 text-slate-200 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                      <Calendar className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Possession: {prop.possession}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* RERA and Developer Info */}
                      <div className="flex items-center justify-between mb-3 text-[10px] text-luxury-gold font-mono tracking-wider">
                        <span className="bg-luxury-gold/10 px-2.5 py-0.5 rounded border border-luxury-gold/30">
                          RERA: {prop.reraId}
                        </span>
                        <span className="text-slate-400 uppercase font-sans tracking-widest text-[9px] font-bold">
                          {prop.developer} Project
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-white mb-2 leading-snug">
                        {prop.title}
                      </h3>

                      <div className="flex items-center text-slate-300 text-xs mb-4">
                        <MapPin className="w-3.5 h-3.5 text-luxury-gold mr-1 shrink-0" />
                        <span className="font-light">{prop.location}</span>
                      </div>

                      {/* Detail metrics */}
                      <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-white/5 mb-4 text-xs font-light text-slate-300 text-center">
                        <span className="font-serif text-white font-medium">
                          {prop.type}
                        </span>
                        <span className="border-l border-white/5 font-mono text-slate-400">
                          {prop.area}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <span className="block text-[8px] uppercase tracking-widest text-slate-400">
                            Offering Cost
                          </span>
                          <span className="text-lg font-serif font-bold text-luxury-gold-light">
                            {prop.priceStr}
                          </span>
                        </div>
                      </div>

                      {/* Card buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {prop.routeUrl.startsWith("/") ? (
                          <a
                            href={prop.routeUrl}
                            className="py-2.5 px-2 rounded-lg border border-luxury-gold/30 hover:border-luxury-gold text-slate-200 text-xs font-semibold hover:bg-luxury-gold/5 flex items-center justify-center space-x-1.5 transition-colors"
                          >
                            <Search className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => onInquire(prop.title)}
                            className="py-2.5 px-2 rounded-lg border border-luxury-gold/30 hover:border-luxury-gold text-slate-200 text-xs font-semibold hover:bg-luxury-gold/5 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                          >
                            <span>Quick Inquire</span>
                          </button>
                        )}
                        <a
                          href={getWhatsAppLink(prop.title, prop.reraId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-500/20 text-white text-xs font-bold flex items-center justify-center space-x-1 transition-colors"
                        >
                          <Send className="w-3 h-3 text-emerald-100" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 glass rounded-2xl border-white/5"
            >
              <p className="text-slate-400 text-sm font-light">
                No matching projects found. Try loosening your filter tags or contact us directly.
              </p>
              <button
                onClick={() => {
                  setFilterType("All");
                  setFilterLocation("All");
                  setFilterDeveloper("All");
                  setFilterBudget("All");
                }}
                className="mt-4 px-4 py-2 border border-luxury-gold/30 rounded-lg text-luxury-gold text-xs hover:bg-luxury-gold/5 transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
