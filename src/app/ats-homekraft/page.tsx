import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { MapPin, ShieldCheck, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "ATS Homekraft Sanctuary Sector 150 Noida | Ready to Move Luxury Apartments",
  description:
    "Discover ready-to-move eco-luxury living at ATS Homekraft Sanctuary, Sector 150, Noida Expressway. Premium 3 BHK & 4 BHK sports-living residences starting from ₹2.25 Cr.",
  openGraph: {
    title: "ATS Homekraft Sanctuary | Ready to Move Sector 150 Noida",
    description: "Premium eco-residency on Noida Expressway. RERA No: UPRERAPRJ119432.",
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"],
  },
};

export default function AtsHomekraftPage() {
  const reraId = "UPRERAPRJ119432";
  const projectName = "ATS Homekraft Sanctuary";

  return (
    <div className="min-h-screen bg-luxury-green-dark text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* Banner Hero */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80"
              alt={projectName}
              className="w-full h-full object-cover brightness-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-luxury-green-dark" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <span className="bg-luxury-gold/20 border border-luxury-gold text-luxury-gold-light text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full mb-3 inline-block">
              RERA Reg: {reraId}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
              {projectName}
            </h1>
            <p className="text-slate-300 text-sm font-light flex items-center justify-center">
              <MapPin className="w-4 h-4 text-luxury-gold mr-1.5" />
              Sector 150, Noida-Greater Noida Expressway, UP
            </p>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-8">
              <div className="glass p-6 sm:p-8 rounded-2xl border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Starting Price
                  </span>
                  <span className="font-serif text-lg font-bold text-luxury-gold-light">
                    ₹2.25 Cr*
                  </span>
                </div>
                <div className="border-l border-white/5">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Zoning
                  </span>
                  <span className="text-white text-sm font-semibold">
                    Eco-Luxury Apartments
                  </span>
                </div>
                <div className="border-l border-white/5">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Possession
                  </span>
                  <span className="text-white text-sm font-semibold">
                    Immediate
                  </span>
                </div>
                <div className="border-l border-white/5">
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                    Status
                  </span>
                  <span className="text-emerald-400 text-sm font-semibold">
                    Ready to Move
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-white">Project Overview</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  ATS Homekraft Sanctuary is an absolute eco-luxury masterpiece located in Noida Sector 150, widely celebrated as the greenest residential sector of the Noida Expressway. Offering spacious 3 BHK and 4 BHK premium apartments with massive private balconies, the project provides residents with professional sports zones (tennis courts, cricket nets, soccer fields) and immediate registry readiness.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-light">Fully complete, move in today with immediate registry.</span>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-light">Located in Noida Expressway&apos;s lowest density green sector.</span>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-light">Professional-grade multi-sports arenas and complex.</span>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-luxury-gold mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-light">Top structural build grade by ATS.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mini Inquiry Form */}
            <div className="lg:col-span-4 w-full">
              <div className="glass p-6 sm:p-8 rounded-2xl border-luxury-gold/20 shadow-xl sticky top-28">
                <h3 className="font-serif text-xl font-bold text-white mb-2">Request Floor Plan</h3>
                <p className="text-slate-300 text-xs font-light mb-6">
                  Leave your number and we will send the full brochure and inventory map.
                </p>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-4 py-3 rounded-lg glass-input text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 99999 88888"
                      className="w-full px-4 py-3 rounded-lg glass-input text-xs"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-lg font-semibold text-xs text-luxury-green-dark shimmer-btn shadow-lg shadow-luxury-gold/20 flex items-center justify-center space-x-2 border-none cursor-pointer"
                  >
                    <span>Get Brochure Details</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/919315381500?text=Hi%20Goodluck,%20please%20send%20brochure%20for%20${projectName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-emerald-700/60 hover:bg-emerald-600 border border-emerald-500/20 text-white rounded-lg text-xs font-semibold mt-3"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </form>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </div>
  );
}
