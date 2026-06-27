"use client";

import { useState } from "react";
import { Landmark, Plane, ShieldCheck, TrendingUp, MapPin, Building2, Trees } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InvestmentGuides() {
  const [activeTab, setActiveTab] = useState<"noida" | "greater-noida" | "jewar">("noida");

  const guideData = {
    noida: {
      title: "Why Invest in Noida Expressway Corridor?",
      intro:
        "Noida Proper & Noida Expressway have established themselves as NCR's prime luxury corridors, matching rapid corporate growth with upscale, low-density residential sectors.",
      points: [
        {
          icon: Trees,
          label: "Low Density & Green Belts",
          desc: "Sectors like Sector 150 are designated green havens with up to 80% open spaces, featuring vast central parks and sports infrastructure.",
        },
        {
          icon: Building2,
          label: "Corporate & Tech Headquarters",
          desc: "Home to massive IT parks housing Fortune 500 multinationals (Microsoft, Samsung, Adobe) generating solid local housing demand.",
        },
        {
          icon: TrendingUp,
          label: "Vibrant Capital Appreciation",
          desc: "Average property rates along the Expressway have appreciated by 35% in the last 3 years, maintaining robust investor traction.",
        },
      ],
      ctaText: "Explore Expressway Projects",
    },
    "greater-noida": {
      title: "Why Invest in Greater Noida & Noida Extension?",
      intro:
        "Designed as India's first fully pre-planned industrial and residential hub, Greater Noida offers world-class wide roads, smart grids, and massive modern apartments.",
      points: [
        {
          icon: Landmark,
          label: "Pre-Planned Infrastructure",
          desc: "Underground cabling, wide 60-meter grid lines, and structured sector allocations avoid the congestion of older cities.",
        },
        {
          icon: MapPin,
          label: "Central Connectivity Grid",
          desc: "The Aqua Line Metro and the upcoming FNG Expressway link Sector 12 and Greater Noida West directly to Central Delhi and Ghaziabad.",
        },
        {
          icon: ShieldCheck,
          label: "Exceptional Price-to-Value",
          desc: "Provides premium luxury high-rise layouts (like ACE Hanei) at attractive price multiples compared to Gurgaon.",
        },
      ],
      ctaText: "Explore Greater Noida Projects",
    },
    jewar: {
      title: "Why Invest Near Jewar International Airport?",
      intro:
        "The Noida International Airport at Jewar is Asia's largest upcoming airport project. It is sparking a historic real estate boom along the Yamuna Expressway.",
      points: [
        {
          icon: Plane,
          label: "Asia's Premier Aviation Hub",
          desc: "Spanning over 5,000 hectares, the upcoming airport will host multiple runways, cargo hubs, and direct high-speed metro lines to Delhi.",
        },
        {
          icon: Landmark,
          label: "The Noida Toy & Film City Hubs",
          desc: "Massive state-backed industrial projects like the Toy City, Apparel Park, and the upcoming Yamuna Film City are located right next to the airport corridor.",
        },
        {
          icon: TrendingUp,
          label: "Early-Mover Investment Advantage",
          desc: "Land and residential plot valuations near Yamuna Expressway are projected to rise significantly upon operational launch of Phase 1.",
        },
      ],
      ctaText: "Explore Jewar Corridor Projects",
    },
  };

  return (
    <section id="guides" className="py-24 bg-luxury-green-dark/40 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
            Investor Resources
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Noida Regional Intelligence
          </h2>
          <p className="text-slate-300 font-light">
            Understand the micro-market macro drivers behind Noida Expressway, Greater Noida Expansion, and the Yamuna Airport corridor before investing capital.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {(["noida", "greater-noida", "jewar"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-luxury-gold text-luxury-green-dark shadow-lg shadow-luxury-gold/15"
                  : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {tab === "noida"
                ? "Noida Expressway"
                : tab === "greater-noida"
                ? "Greater Noida"
                : "Jewar Airport Corridor"}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        <div className="glass p-6 sm:p-10 rounded-2xl border-luxury-gold/15 shadow-2xl relative min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Text Left */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {guideData[activeTab].title}
                </h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {guideData[activeTab].intro}
                </p>
                <button
                  onClick={() => {
                    const el = document.getElementById("finder");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-lg border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-green-dark text-xs font-semibold tracking-wider uppercase transition-colors duration-300 cursor-pointer"
                >
                  {guideData[activeTab].ctaText}
                </button>
              </div>

              {/* Points Right */}
              <div className="lg:col-span-6 space-y-6">
                {guideData[activeTab].points.map((pt, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 border border-luxury-gold/25 flex items-center justify-center text-luxury-gold shrink-0">
                      <pt.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white mb-1.5">
                        {pt.label}
                      </h4>
                      <p className="text-slate-400 text-xs font-light leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
