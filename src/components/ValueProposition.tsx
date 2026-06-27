"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Car, HelpingHand, Landmark, Sparkles } from "lucide-react";

const propositions = [
  {
    icon: ShieldCheck,
    title: "Direct Developer Pricing",
    description:
      "Access pre-launch quotes, developer discounts, and premium inventory directly. We guarantee transparent rates with zero hidden charges.",
  },
  {
    icon: Award,
    title: "100% RERA & Legal Verify",
    description:
      "Every property in our portfolio is thoroughly vetted. We match and verify land titles, builder histories, and RERA registry IDs before showcasing.",
  },
  {
    icon: Car,
    title: "Chauffeured Site Visits",
    description:
      "Schedule a site visit at your convenience. We arrange premium private chauffeured cars for a comfortable and luxury inspection experience.",
  },
  {
    icon: HelpingHand,
    title: "End-to-End Handholding",
    description:
      "From selecting the right unit to negotiating prices, handling loan disbursements, legal reviews, and registration — we manage it all.",
  },
  {
    icon: Landmark,
    title: "Noida Market Mastery",
    description:
      "Deep localized insights on Noida Expressway, Sector 150, and Greater Noida West expansion hubs. Invest only in high-yield, premium projects.",
  },
  {
    icon: Sparkles,
    title: "VIP Allocation Access",
    description:
      "Get priority unit selection (park facing, higher floors, penthouses) before projects are launched to the general public.",
  },
];

export default function ValueProposition() {
  return (
    <section id="why-us" className="py-24 bg-luxury-green-dark relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-luxury-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2"
          >
            The Goodluck Edge
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Why Discerning Buyers Choose Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 font-light"
          >
            We don&apos;t just sell real estate; we consult, protect, and acquire assets that reflect your stature. Here is why we are Noida&apos;s trusted luxury partner.
          </motion.p>
        </div>

        {/* Propositions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propositions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-luxury-gold/25 transition-all duration-300 group flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold mb-6 group-hover:bg-luxury-gold group-hover:text-luxury-green-dark transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
