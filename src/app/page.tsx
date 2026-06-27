"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import ValueProposition from "@/components/ValueProposition";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Premium Upgrades
import PropertyFinder from "@/components/PropertyFinder";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import InvestmentGuides from "@/components/InvestmentGuides";
import InteractiveMap from "@/components/InteractiveMap";
import TrustBuilder from "@/components/TrustBuilder";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import LeadPopup from "@/components/LeadPopup";
import AIPropertyAssistant from "@/components/AIPropertyAssistant";
import Schemas from "@/components/Schemas";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string>("Imperial Crown");

  const scrollToContact = (projectName?: string) => {
    if (projectName) {
      setSelectedProject(projectName);
    }
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInquireFromFinder = (title: string) => {
    let projectKey = "Imperial Crown";
    if (title.includes("Nimbus")) projectKey = "Nimbus The Palm Village";
    if (title.includes("ACE")) projectKey = "ACE Hanei";
    if (title.includes("ATS")) projectKey = "ATS Homekraft";
    if (title.includes("Gaur")) projectKey = "Gaur Yamuna City";
    scrollToContact(projectKey);
  };

  return (
    <div className="min-h-screen bg-luxury-green-dark text-slate-100 flex flex-col justify-between selection:bg-luxury-gold selection:text-luxury-green-dark">
      {/* JSON-LD Schemas for Search Engines */}
      <Schemas />

      {/* Premium Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <HeroSection onScheduleVisit={() => scrollToContact()} />

        {/* Brand Stats Section */}
        <StatsSection />

        {/* Real-time Property Finder Directory */}
        <PropertyFinder onInquire={handleInquireFromFinder} />

        {/* Premium Property Highlights Showcase */}
        <FeaturedProperties
          onInquire={(title) => {
            let projectKey = "Imperial Crown";
            if (title.includes("Elysian")) projectKey = "Elysian Woods";
            if (title.includes("Sovereign")) projectKey = "Sovereign Suites";
            if (title.includes("Oakwood")) projectKey = "Oakwood Plots";
            if (title.includes("Serene")) projectKey = "Serene Meadows";
            scrollToContact(projectKey);
          }}
        />

        {/* Noida Regional Investment Guides */}
        <InvestmentGuides />

        {/* Interactive Transit & Metro Hotspots Map */}
        <InteractiveMap />

        {/* Why Choose Us Proposition */}
        <ValueProposition />

        {/* Investment ROI & Loan Calculator */}
        <InvestmentCalculator />

        {/* Trust Indicators (Google Ratings, Site Visits) */}
        <TrustBuilder />

        {/* HNI Client Reviews */}
        <Testimonials />

        {/* Interactive Contact & Site Visit Booking Desk */}
        <ContactForm selectedProject={selectedProject} />
      </main>

      {/* Brand Footer & Compliance */}
      <Footer />

      {/* Bottom Floating Interactive Widgets */}
      <FloatingWhatsApp />
      <AIPropertyAssistant />
      <StickyMobileCTA />

      {/* 15-Second Lead Capture Popup */}
      <LeadPopup />
    </div>
  );
}
