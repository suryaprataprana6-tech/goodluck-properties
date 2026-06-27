"use client";

import { Phone, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function StickyMobileCTA() {
  const handleScroll = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-luxury-green-dark/80 backdrop-blur-xl border-t border-luxury-gold/20 shadow-2xl px-4 py-3"
    >
      <div className="grid grid-cols-3 gap-2.5">
        {/* Call Now */}
        <a
          href="tel:9315381500"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg border border-luxury-gold/20 text-slate-100 hover:bg-luxury-gold/5 active:bg-luxury-gold/10 transition-colors"
        >
          <Phone className="w-5 h-5 text-luxury-gold mb-1" />
          <span className="text-[9px] uppercase tracking-wider font-semibold">Call Now</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/919315381500?text=Hello%20Goodluck%20Properties,%20I%20am%20interested%20in%20luxury%20projects."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/20 text-white active:scale-95 transition-all"
        >
          <MessageSquare className="w-5 h-5 text-emerald-100 mb-1" />
          <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-50">WhatsApp</span>
        </a>

        {/* Book Site Visit */}
        <button
          onClick={handleScroll}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-luxury-gold hover:bg-luxury-gold-bright text-luxury-green-dark active:scale-95 transition-all font-semibold cursor-pointer"
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-[9px] uppercase tracking-wider">Book Visit</span>
        </button>
      </div>
    </motion.div>
  );
}
