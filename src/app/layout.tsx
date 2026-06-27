import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goodluck Properties | Luxury Real Estate in Noida & Greater Noida",
  description:
    "Your Trusted Real Estate Partner in Noida & Greater Noida. Explore premium penthouses, ultra-luxury villas, and high-end residential apartments. Personal site visits and direct deals.",
  keywords: [
    "Goodluck Properties",
    "Luxury Real Estate Noida",
    "Penthouses Greater Noida",
    "Villas Noida Expressway",
    "Property dealers Noida",
    "Real Estate Noida",
  ],
  authors: [{ name: "Goodluck Properties" }],
  openGraph: {
    title: "Goodluck Properties | Luxury Real Estate in Noida & Greater Noida",
    description:
      "Your Trusted Real Estate Partner in Noida & Greater Noida. Find the finest ultra-luxury homes, villas, and prime plots.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-luxury-green-dark text-slate-100 font-sans selection:bg-luxury-gold selection:text-luxury-green-dark">
        {children}
      </body>
    </html>
  );
}
