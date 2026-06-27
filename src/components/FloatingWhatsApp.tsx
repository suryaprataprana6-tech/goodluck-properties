"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tool tip after 5 seconds to get client attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 pointer-events-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto bg-luxury-green-dark border border-luxury-gold/40 text-slate-100 text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 font-medium backdrop-blur-md"
          >
            <span>Need Help? Chat with Noida Advisor</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-luxury-gold hover:text-white font-bold ml-1 cursor-pointer"
              aria-label="Dismiss tooltip"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/919315381500?text=Hi%20Goodluck%20Properties,%20I%20am%20interested%20in%20luxury%20projects%20in%20Noida.%20Please%20share%20details."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/20 cursor-pointer relative"
        aria-label="Chat on WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        <MessageSquare className="w-7 h-7" />
        {/* Pulsing indicator dot */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
        </span>
      </motion.a>
    </div>
  );
}
