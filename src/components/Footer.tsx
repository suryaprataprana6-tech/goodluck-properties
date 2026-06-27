"use client";

import { ShieldCheck, Mail, Phone, MessageSquare } from "lucide-react";

export default function Footer() {
  const microMarkets = [
    "Sector 150, Noida",
    "Sector 128, Noida",
    "Sector 94, Noida",
    "Sector 143, Noida",
    "Noida Expressway",
    "Greater Noida West",
    "Yamuna Expressway",
  ];

  const developers = [
    "ATS Homekraft",
    "Godrej Properties",
    "Birla Estates",
    "Max Estates",
    "Eldeco Group",
    "Tata Value Homes",
    "Gaursons India",
  ];

  return (
    <footer className="bg-luxury-green-dark border-t border-white/5 pt-16 pb-8 text-sm font-light text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <a href="#" className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient">
                GOODLUCK
              </span>
              <span className="text-[10px] tracking-[0.3em] text-slate-300 uppercase -mt-1 font-sans">
                Properties
              </span>
            </a>
            <p className="text-slate-300 leading-relaxed text-xs">
              Your Trusted Real Estate Partner in Noida &amp; Greater Noida. We consult, protect, and acquire assets that reflect your stature. Hand-picked elite properties and direct builder deals.
            </p>
            <div className="flex items-center space-x-2 bg-luxury-gold/5 border border-luxury-gold/25 px-3 py-1.5 rounded-lg w-max text-[10px] tracking-wide text-luxury-gold uppercase font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>UPRERA AGENT REG: UPRERAAGT19842</span>
            </div>
          </div>

          {/* Micro Markets */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Noida Micro-Markets
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-xs">
              {microMarkets.map((market) => (
                <li key={market}>
                  <a
                    href="#properties"
                    className="hover:text-luxury-gold transition-colors block py-0.5"
                  >
                    Properties in {market}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Partner Developers
            </h3>
            <ul className="space-y-2 text-xs">
              {developers.map((dev) => (
                <li key={dev} className="text-slate-400">
                  {dev}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact info */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-white mb-4 tracking-wide">
              Inquiries Desk
            </h3>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
              <a href="tel:9315381500" className="hover:text-luxury-gold transition-colors">
                +91 93153 81500
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
              <a href="tel:9582505055" className="hover:text-luxury-gold transition-colors">
                +91 95825 05055
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-4 h-4 text-luxury-gold shrink-0" />
              <a
                href="https://wa.me/919582505055?text=Hello%20Goodluck%20Properties"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-luxury-gold transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
              <span>sales@goodluckproperties.co.in</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Policy */}
        <div className="pt-8 text-[10px] text-slate-400 font-light leading-relaxed">
          <p className="mb-4">
            <strong>Disclaimer:</strong> Goodluck Properties is a real estate consulting firm and an authorized channel partner with leading developers in Noida &amp; Greater Noida. The information, graphics, and materials displayed on this homepage are for informational purposes only. Project names, logos, branding, layout designs, and specifications are the properties of their respective developers and are protected under RERA compliance guidelines.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 pt-4 border-t border-white/5 gap-4">
            <span>
              &copy; {new Date().getFullYear()} Goodluck Properties. All rights reserved.
            </span>
            <div className="flex space-x-6 text-[10px]">
              <a href="#" className="hover:text-slate-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-slate-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-slate-300">
                RERA Disclosures
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
