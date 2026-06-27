import React from "react";

export default function Schemas() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Goodluck Properties",
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "@id": "https://www.goodluckproperties.co.in/#localbusiness",
    "url": "https://www.goodluckproperties.co.in",
    "telephone": "+919315381500",
    "priceRange": "₹₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 150, Noida-Greater Noida Expressway",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201310",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4239,
      "longitude": 77.4988
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "20:30"
    }
  };

  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Goodluck Properties",
    "description": "Your Trusted Real Estate Partner in Noida & Greater Noida. Vetted luxury apartments, villas, and penthouses with transparent deals.",
    "telephone": "+919315381500",
    "url": "https://www.goodluckproperties.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 150, Noida-Greater Noida Expressway",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201310",
      "addressCountry": "IN"
    },
    "areaServed": ["Noida", "Greater Noida", "Yamuna Expressway"],
    "knowsAbout": ["Luxury Apartments", "Villas", "Penthouses", "Residential Plots"]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is Goodluck Properties an authorized partner for Noida projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Goodluck Properties is a legally registered real estate advisory and an authorized channel partner for top developers in Noida, Greater Noida, and Yamuna Expressway. Our UPRERA registration number is UPRERAAGT19842."
        }
      },
      {
        "@type": "Question",
        "name": "What price ranges are available for luxury properties in Noida Sector 150?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Luxury apartment options in prime sectors like Sector 150 start from ₹1.5 Cr onwards, going up to ₹8 Cr+ for duplex penthouses and custom independent villas."
        }
      },
      {
        "@type": "Question",
        "name": "Do you arrange chauffeured site visits for project tours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we coordinate VIP site visits. We arrange premium, private chauffeured car pickups and drop-offs for clients to tour projects comfortably under advisor guidance."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
