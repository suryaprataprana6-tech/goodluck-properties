"use client";

import { useState } from "react";
import { MapPin, Navigation, Car, Award } from "lucide-react";
import { motion } from "framer-motion";

interface Hotspot {
  id: string;
  name: string;
  coords: { x: string; y: string };
  tagline: string;
  metroDist: string;
  airportDist: string;
  keyConnectivity: string;
  associatedProjects: string[];
}

const hotspots: Hotspot[] = [
  {
    id: "map-sec-150",
    name: "Sector 150 Expressway Corridor",
    coords: { x: "42%", y: "45%" },
    tagline: "Noida's Greenest Low-Density Sports Sector",
    metroDist: "Sector 148 Aqua Metro (5 mins)",
    airportDist: "30 mins drive to Jewar Airport",
    keyConnectivity: "Intersection of Noida, Greater Noida, and Yamuna Expressway",
    associatedProjects: ["ATS Homekraft Sanctuary"],
  },
  {
    id: "map-sec-128",
    name: "Sector 128 Golf Corridor",
    coords: { x: "25%", y: "25%" },
    tagline: "Premium Golf Course facing premium residences",
    metroDist: "Okhla Bird Sanctuary Metro (10 mins)",
    airportDist: "40 mins drive to Jewar Airport",
    keyConnectivity: "Direct access to Delhi border via Kalindi Kunj",
    associatedProjects: ["Elysian Woods Duplex Villas"],
  },
  {
    id: "map-sec-94",
    name: "Sector 94 Premium Gateway",
    coords: { x: "12%", y: "15%" },
    tagline: "Noida's Ultra-Luxury Residential & Commercial Gateway",
    metroDist: "Okhla Bird Sanctuary Metro (2 mins)",
    airportDist: "45 mins drive to Jewar Airport",
    keyConnectivity: "Located at the Delhi-Noida Entry/Exit Border",
    associatedProjects: ["The Sovereign Sky Suites"],
  },
  {
    id: "map-gr-noida-west",
    name: "Sector 12 Greater Noida West",
    coords: { x: "55%", y: "30%" },
    tagline: "Planned residential capital and corporate expansion zone",
    metroDist: "Upcoming Greater Noida West Metro Link",
    airportDist: "45 mins drive to Jewar Airport",
    keyConnectivity: "Connected to Noida Sector 62 and FNG Expressway Corridor",
    associatedProjects: ["ACE Hanei Residences"],
  },
  {
    id: "map-yamuna-exp",
    name: "Yamuna Expressway Corridor",
    coords: { x: "75%", y: "70%" },
    tagline: "The Jewar International Airport Corridor",
    metroDist: "Proposed Jewar Airport High-Speed Metro",
    airportDist: "10 mins drive to Jewar Airport gates",
    keyConnectivity: "Direct high-speed corridor connecting Noida to Agra",
    associatedProjects: ["Nimbus The Palm Village", "Gaur Yamuna City Plots"],
  },
];

export default function InteractiveMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(hotspots[0]);

  return (
    <section id="map" className="py-24 bg-luxury-green-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
            Hotspot Index
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Interactive Connectivity Map
          </h2>
          <p className="text-slate-300 font-light">
            Locate key luxury hubs, upcoming airport links, metro stations, and check actual drive times to prime landmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Pane: Hotspot list / connectivity details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex justify-between items-center cursor-pointer ${
                    selectedHotspot.id === spot.id
                      ? "bg-luxury-gold/10 border-luxury-gold text-white"
                      : "bg-white/5 border-white/5 text-slate-300 hover:border-white/10"
                  }`}
                >
                  <span>{spot.name}</span>
                  <MapPin
                    className={`w-4.5 h-4.5 ${
                      selectedHotspot.id === spot.id ? "text-luxury-gold" : "text-slate-500"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Selected Hotspot Details Box */}
            <div className="glass p-6 rounded-2xl border-luxury-gold/25 shadow-lg flex-grow flex flex-col justify-between mt-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
                  Selected Hotspot Details
                </span>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {selectedHotspot.name}
                </h3>
                <p className="text-slate-300 text-xs font-light mb-4">
                  {selectedHotspot.tagline}
                </p>

                {/* Connectivity Stats */}
                <div className="space-y-3 text-xs font-light text-slate-300 pt-3 border-t border-white/5">
                  <div className="flex items-center">
                    <Navigation className="w-4 h-4 text-luxury-gold mr-2.5 shrink-0" />
                    <span>{selectedHotspot.metroDist}</span>
                  </div>
                  <div className="flex items-center">
                    <Car className="w-4 h-4 text-luxury-gold mr-2.5 shrink-0" />
                    <span>{selectedHotspot.airportDist}</span>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-4 h-4 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                    <span>{selectedHotspot.keyConnectivity}</span>
                  </div>
                </div>
              </div>

              {/* Projects in area */}
              <div className="pt-4 mt-4 border-t border-white/5 text-xs">
                <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                  Active Projects
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHotspot.associatedProjects.map((proj, pidx) => (
                    <span
                      key={pidx}
                      className="bg-luxury-gold/15 border border-luxury-gold/25 text-luxury-gold-light px-2.5 py-1 rounded"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane: Customized stylized map graphic */}
          <div className="lg:col-span-7 glass border-white/10 rounded-2xl p-4 sm:p-6 flex items-center justify-center relative overflow-hidden min-h-[350px]">
            {/* Background Map Contours (stylized layout) */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -rotate-12 pointer-events-none" /> {/* Noida Expressway Line */}
            <div className="absolute top-1/3 left-1/3 w-[2px] h-[300px] bg-white/5 rotate-45 pointer-events-none" /> {/* FNG Link */}
            <div className="absolute top-1/4 left-1/2 w-[3px] h-[400px] bg-luxury-gold/10 -rotate-45 pointer-events-none" /> {/* Yamuna Expressway line */}
            <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full border border-luxury-gold/15 flex items-center justify-center bg-luxury-gold/3 animate-pulse pointer-events-none">
              <span className="text-[9px] uppercase tracking-wider text-luxury-gold text-center leading-tight">
                Jewar <br /> Airport
              </span>
            </div>

            {/* Map Pins */}
            {hotspots.map((spot) => (
              <motion.button
                key={spot.id}
                onClick={() => setSelectedHotspot(spot)}
                style={{ top: spot.coords.y, left: spot.coords.x }}
                whileHover={{ scale: 1.2 }}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors duration-300 ${
                  selectedHotspot.id === spot.id
                    ? "bg-luxury-gold text-luxury-green-dark border-2 border-white scale-110 z-20"
                    : "bg-luxury-green-medium text-luxury-gold border border-luxury-gold/30 hover:bg-luxury-gold hover:text-luxury-green-dark z-10"
                }`}
                aria-label={spot.name}
              >
                <MapPin className="w-4.5 h-4.5" />
              </motion.button>
            ))}

            {/* Key / Legend */}
            <div className="absolute bottom-4 left-4 bg-black/60 border border-white/10 px-3 py-2 rounded-lg text-[9px] text-slate-300 tracking-wide font-light backdrop-blur-sm space-y-1">
              <div className="flex items-center">
                <span className="w-2.5 h-2.5 bg-luxury-gold border border-white rounded-full inline-block mr-1.5" />
                <span>Selected Micro-market</span>
              </div>
              <div className="flex items-center">
                <span className="w-2.5 h-[2px] bg-luxury-gold/25 inline-block mr-1.5" />
                <span>Yamuna Expressway Highway</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
