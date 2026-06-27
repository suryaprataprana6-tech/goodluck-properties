"use client";

import { useState } from "react";
import { Phone, Calendar, Clock, MapPin, Mail, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { submitLeadAction } from "@/app/actions/leadActions";

interface ContactFormProps {
  selectedProject?: string;
}

export default function ContactForm({ selectedProject = "Imperial Crown" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: selectedProject,
    visitDate: "",
    message: "",
  });

  const [prevSelectedProject, setPrevSelectedProject] = useState(selectedProject);
  if (selectedProject !== prevSelectedProject) {
    setPrevSelectedProject(selectedProject);
    setFormData((prev) => ({ ...prev, project: selectedProject }));
  }

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
      data.append("email", formData.email);
      data.append("project", formData.project);
      data.append("budget", "Varies / Site Visit Requested");
      data.append(
        "message",
        `[Site Visit Requested] Date: ${formData.visitDate}. Client Message: ${formData.message}`
      );
      data.append("sourcePage", "Homepage (Site Visit Scheduler Form)");
      data.append("honeypot", (e.currentTarget.elements.namedItem("honeypot") as HTMLInputElement)?.value || "");

      const res = await submitLeadAction(null, data);
      
      if (res.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          project: "Imperial Crown",
          visitDate: "",
          message: "",
        });
        if (res.whatsappUrl) {
          window.open(res.whatsappUrl, "_blank");
        }
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error("Contact Form submission error:", err);
      alert("Submission error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-luxury-green-dark/50 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-green-dark via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div>
              <span className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2 block">
                Exclusive Desk
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Connect With Our Specialists
              </h2>
              <p className="text-slate-300 font-light leading-relaxed">
                Contact Goodluck Properties directly for developer-backed allocations, RERA check files, and to lock premium launch prices in Noida.
              </p>
            </div>

            {/* Direct Calls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:9315381500"
                className="glass p-5 rounded-xl border-luxury-gold/15 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all group flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-4 group-hover:bg-luxury-gold group-hover:text-luxury-green-dark transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                    Corporate Sales
                  </span>
                  <span className="font-serif text-lg font-bold text-white tracking-wide block mt-1">
                    9315381500
                  </span>
                  <span className="text-[10px] text-luxury-gold hover:underline mt-1 inline-block">
                    Click to Call →
                  </span>
                </div>
              </a>

              <a
                href="tel:9582505055"
                className="glass p-5 rounded-xl border-luxury-gold/15 hover:border-luxury-gold/50 hover:bg-luxury-gold/5 transition-all group flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-4 group-hover:bg-luxury-gold group-hover:text-luxury-green-dark transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                    VIP Desk / WhatsApp
                  </span>
                  <span className="font-serif text-lg font-bold text-white tracking-wide block mt-1">
                    9582505055
                  </span>
                  <span className="text-[10px] text-luxury-gold hover:underline mt-1 inline-block">
                    Click to Call →
                  </span>
                </div>
              </a>
            </div>

            {/* Office Locations */}
            <div className="space-y-4 text-sm font-light text-slate-300">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-luxury-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Noida Office</h4>
                  <p className="mt-0.5">Sector 150, Noida-Greater Noida Expressway, UP, India</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-luxury-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Email Address</h4>
                  <p className="mt-0.5">sales@goodluckproperties.co.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="w-5 h-5 text-luxury-gold mr-3 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Working Hours</h4>
                  <p className="mt-0.5">9:00 AM - 8:30 PM (All 7 Days Open)</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919582505055?text=Hi%20Goodluck%20Properties,%20I%20want%20to%20know%20more%20about%20your%20luxury%20projects."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2.5 bg-emerald-700/60 hover:bg-emerald-600 border border-emerald-500/30 text-white py-3.5 rounded-xl font-medium transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Live Chat with Noida Advisors</span>
            </a>
          </div>

          {/* Right Column: Scheduler Form */}
          <div className="lg:col-span-7 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-6 sm:p-8 rounded-2xl border-luxury-gold/20 shadow-xl"
            >
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                Schedule a Site Visit
              </h3>
              <p className="text-slate-300 text-xs font-light mb-6">
                Fill the schedule request, and we will pick you up in a chauffeured vehicle.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 bg-luxury-gold/20 border border-luxury-gold rounded-full flex items-center justify-center text-luxury-gold text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl font-semibold text-white">
                    Site Visit Scheduled
                  </h4>
                  <p className="text-slate-300 text-sm max-w-sm font-light">
                    Thank you! Our site coordinator will call you shortly to confirm the pickup timing and coordinates.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-luxury-gold hover:underline pt-4"
                  >
                    Schedule another visit
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Phone Number
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg glass-input text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                        Project Interest
                      </label>
                      <select
                        value={formData.project}
                        onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                        className="w-full px-3 py-3 rounded-lg glass-input text-sm bg-luxury-green-dark"
                      >
                        <option value="Imperial Crown">The Imperial Crown Penthouse</option>
                        <option value="Elysian Woods">Elysian Woods Villas</option>
                        <option value="Sovereign Suites">Sovereign Suites Noida</option>
                        <option value="Oakwood Plots">Oakwood Estate Plots</option>
                        <option value="Serene Meadows">Serene Meadows Sky Mansion</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                      Preferred Date of Visit
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-input text-sm bg-luxury-green-dark text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-300 font-semibold mb-1">
                      Inquiry Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify preferred unit layouts or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg glass-input text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-lg font-semibold text-sm text-luxury-green-dark shimmer-btn shadow-lg shadow-luxury-gold/20 flex items-center justify-center space-x-2 border-none cursor-pointer hover:brightness-110 active:scale-[0.98] transition-all duration-300"
                  >
                    <Calendar className="w-4.5 h-4.5" />
                    <span>{isSubmitting ? "Submitting Request..." : "Schedule VIP Site Visit"}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
