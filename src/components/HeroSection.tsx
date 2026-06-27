"use client";

import { useState } from "react";
import { Phone, Calendar, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { submitLeadAction } from "@/app/actions/leadActions";

interface HeroSectionProps {
  onScheduleVisit: () => void;
}

export default function HeroSection({ onScheduleVisit }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "apartment",
    budget: "1.5cr-3cr",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      data.append("project", formData.propertyType);
      data.append("budget", formData.budget);
      data.append("message", "Callback request from main Hero form.");
      data.append("sourcePage", "Homepage (Hero Section)");
      data.append("honeypot", (e.currentTarget.elements.namedItem("honeypot") as HTMLInputElement)?.value || "");

      const res = await submitLeadAction(null, data);
      
      if (res.success) {
        setIsSubmitted(true);
        setFormData({ name: "", phone: "", propertyType: "apartment", budget: "1.5cr-3cr" });
        if (res.whatsappUrl) {
          window.open(res.whatsappUrl, "_blank");
        }
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error("Hero form submission error:", err);
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-40 contrast-110"
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        >
          {/* Luxury Real Estate loops */}
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27d2ad6cf797e164dae0e2b43b84176c1164187&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>
        {/* Dark Emerald overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-green-dark/80 via-luxury-green-dark/65 to-luxury-green-dark/95 z-0" />
      </div>

      {/* Decorative Gold Radial Light */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and brand copy */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-luxury-gold/10 border border-luxury-gold/25 px-4 py-1.5 rounded-full w-max text-xs tracking-widest text-luxury-gold uppercase font-semibold"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RERA Registered Noida Experts</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              Experience the Pinnacle of <br />
              <span className="text-gold-gradient">Luxury Living</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-200 text-base sm:text-lg max-w-xl font-light leading-relaxed"
            >
              Goodluck Properties is your trusted real estate partner in Noida &amp; Greater Noida. We orchestrate direct developer access, transparent pricing, and hand-picked elite properties.
            </motion.p>

            {/* Quick Actions Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="tel:9315381500"
                className="flex items-center space-x-2.5 px-6 py-3.5 rounded-lg bg-luxury-gold hover:bg-luxury-gold-bright text-luxury-green-dark font-semibold text-sm tracking-wide shadow-lg shadow-luxury-gold/15 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 93153 81500</span>
              </a>

              <a
                href="https://wa.me/919582505055?text=Hello%20Goodluck%20Properties,%20I%20would%20like%20to%20get%20brochures%20for%20luxury%20projects%20in%20Noida."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 px-6 py-3.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-500/20 text-white font-medium text-sm tracking-wide shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={onScheduleVisit}
                className="flex items-center space-x-2.5 px-6 py-3.5 rounded-lg glass hover:bg-white/10 text-white border-white/20 font-medium text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-luxury-gold" />
                <span>Schedule Site Visit</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-6 sm:p-8 rounded-2xl shadow-2xl relative border-luxury-gold/20"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 rounded-bl-full pointer-events-none" />

              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                Arrange a Private Consultation
              </h2>
              <p className="text-slate-300 text-xs font-light mb-6">
                Receive curated property recommendations, private brochures, and developer discount updates.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 bg-luxury-gold/20 border border-luxury-gold rounded-full flex items-center justify-center text-luxury-gold text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Request Received
                  </h3>
                  <p className="text-slate-300 text-sm max-w-xs font-light">
                    Our luxury relationship advisor will contact you within the next 30 minutes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-luxury-gold hover:underline pt-4"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-input text-sm"
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
                      className="w-full px-4 py-3 rounded-lg glass-input text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Property Interest
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="w-full px-3 py-3 rounded-lg glass-input text-sm bg-luxury-green-dark"
                      >
                        <option value="apartment">Apartments</option>
                        <option value="penthouse">Penthouses</option>
                        <option value="villa">Villas</option>
                        <option value="plots">Luxury Plots</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Budget Range
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-3 rounded-lg glass-input text-sm bg-luxury-green-dark"
                      >
                        <option value="under-1.5cr">Under 1.5 Cr</option>
                        <option value="1.5cr-3cr">1.5 Cr - 3 Cr</option>
                        <option value="3cr-5cr">3 Cr - 5 Cr</option>
                        <option value="above-5cr">5 Cr +</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-lg font-semibold text-sm text-luxury-green-dark shimmer-btn shadow-lg shadow-luxury-gold/20 flex items-center justify-center space-x-2 border-none cursor-pointer transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    <span>{isSubmitting ? "Securing connection..." : "Request Call Back"}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <div className="text-[10px] text-center text-slate-400 font-light mt-4">
                    Your details are encrypted and shared only with premium builders. No spam guaranteed.
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
