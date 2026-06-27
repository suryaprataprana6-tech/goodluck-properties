"use client";

import { motion } from "framer-motion";
import { BedDouble, Bath, Square, MapPin, Send } from "lucide-react";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  beds?: number;
  baths?: number;
  area: string;
  image: string;
  reraId: string;
  status: "Ready to Move" | "Under Construction" | "Newly Launched";
}

const properties: Property[] = [
  {
    id: "prop-1",
    title: "The Imperial Crown Penthouse",
    location: "Sector 150, Noida Expressway",
    price: "₹4.50 Cr onwards",
    type: "Penthouse",
    beds: 4,
    baths: 5,
    area: "4,250 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ834510",
    status: "Under Construction",
  },
  {
    id: "prop-2",
    title: "Elysian Woods Duplex Villas",
    location: "Sector 128, Noida",
    price: "₹8.20 Cr onwards",
    type: "Villa",
    beds: 5,
    baths: 6,
    area: "5,800 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ294811",
    status: "Ready to Move",
  },
  {
    id: "prop-3",
    title: "The Sovereign Suites Residences",
    location: "Sector 94, Noida",
    price: "₹3.25 Cr onwards",
    type: "Apartment",
    beds: 3,
    baths: 4,
    area: "2,950 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ119432",
    status: "Under Construction",
  },
  {
    id: "prop-4",
    title: "Oakwood Premium Estate Plots",
    location: "Greater Noida West",
    price: "₹1.80 Cr onwards",
    type: "Luxury Plots",
    area: "250 - 500 Sq.Yds.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ550219",
    status: "Newly Launched",
  },
  {
    id: "prop-5",
    title: "Serene Meadows Sky Mansion",
    location: "Sector 143, Noida Expressway",
    price: "₹5.75 Cr onwards",
    type: "Duplex Penthouse",
    beds: 4,
    baths: 5,
    area: "4,600 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ039485",
    status: "Under Construction",
  },
  {
    id: "prop-6",
    title: "The Signature Boulevard Apartments",
    location: "Sector 150, Noida Expressway",
    price: "₹2.90 Cr onwards",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: "2,450 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    reraId: "UPRERAPRJ994031",
    status: "Ready to Move",
  },
];

interface FeaturedPropertiesProps {
  onInquire: (propertyName: string) => void;
}

export default function FeaturedProperties({ onInquire }: FeaturedPropertiesProps) {
  const getWhatsAppLink = (title: string, location: string) => {
    const text = encodeURIComponent(
      `Hello Goodluck Properties, I am interested in "${title}" located in ${location}. Please send me the brochure, floor plan, and pricing sheet.`
    );
    return `https://wa.me/919582505055?text=${text}`;
  };

  return (
    <section id="properties" className="py-24 bg-luxury-green-dark/30 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-luxury-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2"
          >
            Signature Collection
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Featured Luxury Properties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 font-light"
          >
            Explore our elite selection of premium residences, hand-picked for their prime connectivity, developer integrity, and ultra-high capital appreciation potential in Noida.
          </motion.p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col rounded-2xl overflow-hidden glass-card h-full"
            >
              {/* Image & Badges */}
              <div className="relative h-64 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prop.image}
                  alt={prop.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                {/* Dark gradient on top of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Status Tag */}
                <span className="absolute top-4 left-4 bg-luxury-green-medium border border-luxury-gold/45 text-luxury-gold-light text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {prop.status}
                </span>

                {/* Property Type Tag */}
                <span className="absolute bottom-4 left-4 text-xs font-serif text-white font-semibold">
                  {prop.type}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* RERA badge */}
                  <div className="flex items-center text-[10px] text-luxury-gold font-mono tracking-wider mb-2">
                    <span className="bg-luxury-gold/10 px-2 py-0.5 rounded border border-luxury-gold/30">
                      RERA: {prop.reraId}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
                    {prop.title}
                  </h3>

                  <div className="flex items-center text-slate-300 text-sm mb-4">
                    <MapPin className="w-4 h-4 text-luxury-gold mr-1.5 shrink-0" />
                    <span className="font-light">{prop.location}</span>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mb-4 text-xs font-light text-slate-300">
                    {prop.beds && (
                      <div className="flex items-center space-x-1.5 justify-center">
                        <BedDouble className="w-3.5 h-3.5 text-luxury-gold/70" />
                        <span>{prop.beds} Beds</span>
                      </div>
                    )}
                    {prop.baths && (
                      <div className="flex items-center space-x-1.5 justify-center">
                        <Bath className="w-3.5 h-3.5 text-luxury-gold/70" />
                        <span>{prop.baths} Baths</span>
                      </div>
                    )}
                    <div
                      className={`flex items-center space-x-1.5 justify-center ${
                        !prop.beds ? "col-span-3 text-center" : ""
                      }`}
                    >
                      <Square className="w-3.5 h-3.5 text-luxury-gold/70" />
                      <span>{prop.area}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-slate-400">
                        Offering Price
                      </span>
                      <span className="text-xl font-serif font-bold text-luxury-gold-light">
                        {prop.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onInquire(prop.title)}
                      className="py-2.5 px-3 rounded-lg border border-luxury-gold/30 hover:border-luxury-gold text-slate-200 text-xs font-medium transition-colors hover:bg-luxury-gold/5 flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Quick Inquire</span>
                    </button>
                    <a
                      href={getWhatsAppLink(prop.title, prop.location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-500/20 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>Get Brochure</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
