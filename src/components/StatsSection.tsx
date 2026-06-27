"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "₹1,500+ Cr",
    label: "Properties Handled & Sold",
    detail: "High-value transactions completed",
  },
  {
    value: "10+ Years",
    label: "Industry Experience",
    detail: "Specialized in Noida & Greater Noida",
  },
  {
    value: "1,200+",
    label: "HNI Families Served",
    detail: "Happy homeowners & investors",
  },
  {
    value: "50+",
    label: "Premium Project Partners",
    detail: "Associated with India's top developers",
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="py-20 bg-luxury-green-medium/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center flex flex-col items-center p-4"
            >
              {/* Stat number value */}
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold-gradient tracking-tight mb-2">
                {stat.value}
              </span>

              {/* Stat Label */}
              <span className="text-white font-medium text-xs sm:text-sm tracking-wide mb-1">
                {stat.label}
              </span>

              {/* Stat sub-detail */}
              <span className="text-slate-400 text-[11px] font-light">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
