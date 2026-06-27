"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Properties", href: "#properties" },
    { name: "Why Us", href: "#why-us" },
    { name: "Stats", href: "#stats" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-navbar py-4 shadow-lg shadow-black/10"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#" className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-gold-gradient">
                GOODLUCK
              </span>
              <span className="text-[10px] tracking-[0.3em] text-slate-300 uppercase -mt-1 font-sans">
                Properties
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-luxury-gold transition-colors text-sm font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Quick Contact Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:9315381500"
                className="flex items-center space-x-2 text-slate-300 hover:text-luxury-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span className="font-medium">+91 93153 81500</span>
              </a>
              <a
                href="https://wa.me/919582505055?text=Hello%20Goodluck%20Properties,%20I%20am%20interested%20in%20luxury%20properties%20in%20Noida."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-emerald-700/80 hover:bg-emerald-600 border border-emerald-500/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <a
                href="tel:9315381500"
                className="p-2 rounded-full glass border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
                aria-label="Call Goodluck Properties"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-luxury-gold transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-luxury-green-dark/95 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl text-slate-200 hover:text-luxury-gold transition-colors tracking-wide border-b border-white/5 pb-2"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <div className="text-center text-xs tracking-widest text-slate-400 uppercase">
                Direct Inquiries
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:9315381500"
                  className="flex items-center justify-center space-x-2 py-3 glass rounded-lg border-luxury-gold/20 text-slate-200 text-sm hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  <span>Call 1500</span>
                </a>
                <a
                  href="tel:9582505055"
                  className="flex items-center justify-center space-x-2 py-3 glass rounded-lg border-luxury-gold/20 text-slate-200 text-sm hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all"
                >
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  <span>Call 5055</span>
                </a>
              </div>

              <a
                href="https://wa.me/919582505055?text=Hello%20Goodluck%20Properties,%20I%20am%20interested%20in%20luxury%20properties%20in%20Noida."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white py-3 rounded-lg text-sm font-medium transition-colors duration-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
