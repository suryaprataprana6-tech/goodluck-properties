"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Amit Sharma",
    role: "CEO, Tech Solutions",
    location: "Bought Penthouse in Sector 150",
    text: "Goodluck Properties made my purchase at Sector 150 completely seamless. No brokerage, direct developer interaction, and their team got me a premium park-facing unit that was supposedly sold out. Their Noida market insight is truly top-tier.",
    rating: 5,
  },
  {
    name: "Dr. Sunita Rao",
    role: "Senior Cardiologist",
    location: "Bought Luxury Villa in Sector 128",
    text: "As a medical professional, I have very little time. Goodluck Properties managed everything: private chauffeured site visits, documentation checks, bank loan disbursals, and registry paperwork. Truly premium and transparent service!",
    rating: 5,
  },
  {
    name: "Vikram Malhotra",
    role: "Director of Engineering, MNC",
    location: "Bought Sky Residence in Sector 94",
    text: "Very professional team. They helped me lock in a pre-launch price that saved me a significant amount. Their transparent negotiation style and RERA due diligence won my trust completely. Highly recommended for premium buyers.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-luxury-green-dark relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-luxury-gold/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.25em] text-luxury-gold uppercase font-semibold mb-2"
          >
            Client Patrons
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Words from Our Distinguished Buyers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 font-light"
          >
            Real reviews from homeowners and real estate investors who unlocked premium living with Goodluck Properties.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border-white/5 relative flex flex-col justify-between"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-luxury-gold/15">
                <Quote className="w-12 h-12" />
              </div>

              <div>
                {/* Rating */}
                <div className="flex space-x-1 mb-6 text-luxury-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-200 text-sm font-light leading-relaxed mb-6 italic relative z-10">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* User Bio */}
              <div className="border-t border-white/5 pt-4 flex flex-col">
                <span className="font-serif text-base font-bold text-white">
                  {rev.name}
                </span>
                <span className="text-luxury-gold-light text-xs font-medium">
                  {rev.role}
                </span>
                <span className="text-slate-400 text-[10px] tracking-wide mt-0.5">
                  {rev.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
