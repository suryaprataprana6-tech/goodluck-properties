"use client";

import { useState, useEffect } from "react";
import { X, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLeadAction } from "@/app/actions/leadActions";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "Nimbus The Palm Village",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("lead-popup-dismissed");
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem("lead-popup-dismissed", "true");
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in all fields.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("email", "N/A");
      data.append("project", formData.project);
      data.append("budget", "Varies / Priority Offer Unlock");
      data.append("message", "VIP Priority Allocation Request");
      data.append("sourcePage", "Homepage (15-Second Delayed Lead Popup Modal)");
      data.append("honeypot", (e.currentTarget.elements.namedItem("honeypot") as HTMLInputElement)?.value || "");

      const res = await submitLeadAction(null, data);
      
      if (res.success) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", project: "Nimbus The Palm Village" });
        sessionStorage.setItem("lead-popup-dismissed", "true");
        if (res.whatsappUrl) {
          window.open(res.whatsappUrl, "_blank");
        }
        setTimeout(() => {
          setIsOpen(false);
        }, 2500);
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error("Popup form submission error:", err);
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md glass p-6 sm:p-8 rounded-2xl border-luxury-gold/30 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/5 rounded-bl-full pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 bg-luxury-gold/20 border border-luxury-gold rounded-full flex items-center justify-center text-luxury-gold text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-xl font-bold text-white">VIP Priority Registered</h3>
                <p className="text-slate-300 text-xs font-light max-w-xs">
                  Your registration is complete. A senior relationship director will contact you with floor plans and price details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <div className="text-center mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-luxury-gold uppercase font-bold mb-1 block">
                    Limited Period Offer
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">Unlock Priority Pricing</h3>
                  <p className="text-slate-300 text-xs font-light mt-1">
                    Register to access direct developer inventories, floor plans, and cash discounts before general public release.
                  </p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                    Interested Project
                  </label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg glass-input text-xs bg-luxury-green-dark"
                  >
                    <option value="Nimbus The Palm Village">Nimbus The Palm Village</option>
                    <option value="ACE Hanei">ACE Hanei</option>
                    <option value="ATS Homekraft">ATS Homekraft</option>
                    <option value="Gaur Yamuna City">Gaur Yamuna City</option>
                    <option value="Other Luxury Project">Other Noida Projects</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg font-semibold text-xs text-luxury-green-dark shimmer-btn shadow-lg shadow-luxury-gold/20 flex items-center justify-center space-x-2 border-none cursor-pointer mt-6"
                >
                  <span>{isSubmitting ? "Registering Interest..." : "Unlock Luxury Deals"}</span>
                  {!isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[9px] text-slate-400 mt-4">
                  <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>UPRERA compliant registry guarantee. Zero brokerage.</span>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
