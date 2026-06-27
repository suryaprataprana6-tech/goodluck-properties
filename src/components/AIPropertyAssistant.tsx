"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, User, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  sender: "user" | "bot";
  text: string;
  actions?: Array<{ label: string; action: () => void; link?: string }>;
}

export default function AIPropertyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Namaste! Welcome to Goodluck Properties. I am your AI Property Advisor. Ask me about property prices, investment hotspots, RERA verification, or scheduling a site visit in Noida. Aap Hindi, English, ya Hinglish me kuch bhi pooch sakte hain!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate thinking and answer
    setTimeout(() => {
      const response = generateAIResponse(textToSend);
      setMessages((prev) => [...prev, response]);
    }, 800);
  };

  const generateAIResponse = (input: string): Message => {
    const text = input.toLowerCase();

    // 1. Booking site visits
    if (
      text.includes("visit") ||
      text.includes("book") ||
      text.includes("appointment") ||
      text.includes("ghumna") ||
      text.includes("dekhna") ||
      text.includes("visit schedule")
    ) {
      return {
        sender: "bot",
        text: "Sure! We coordinate VIP site visits with private chauffeured cars. You can pick a date and we will handle all coordinates. Click below to schedule a visit or call our VIP desk.",
        actions: [
          {
            label: "Book Site Visit Form",
            action: () => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              setIsOpen(false);
            },
          },
          { label: "Call Desk", action: () => {}, link: "tel:9315381500" },
        ],
      };
    }

    // 2. Prices
    if (
      text.includes("price") ||
      text.includes("cost") ||
      text.includes("budget") ||
      text.includes("rate") ||
      text.includes("daam") ||
      text.includes("kitne ka")
    ) {
      return {
        sender: "bot",
        text: "Luxury property prices in Noida & Greater Noida differ by location:\n\n• Sector 150: ₹1.5 Cr to ₹5 Cr\n• Sector 128 (Golf Course Corridor): ₹3.5 Cr to ₹12 Cr\n• Yamuna Expressway: ₹80 L to ₹3 Cr\n• Greater Noida West: ₹90 L to ₹2.5 Cr\n\nWould you like a direct price list of available projects sent to your WhatsApp?",
        actions: [
          {
            label: "Get Prices on WhatsApp",
            action: () => {},
            link: "https://wa.me/919315381500?text=Hi%20Goodluck,%20please%20share%20the%20price%20sheet%20for%20Noida%20projects.",
          },
        ],
      };
    }

    // 3. Jewar Airport
    if (
      text.includes("airport") ||
      text.includes("jewar") ||
      text.includes("yamuna") ||
      text.includes("aerocity")
    ) {
      return {
        sender: "bot",
        text: "Jewar Airport is Asia's largest upcoming airport. It is driving huge property appreciation along the Yamuna Expressway and Noida Expressway. Nimbus The Palm Village and Gaur Yamuna City are prime investments here. Should I share the brochures for these projects?",
        actions: [
          {
            label: "Nimbus Palm Brochure",
            action: () => {},
            link: "https://wa.me/919315381500?text=Please%20send%20brochure%20for%20Nimbus%20The%20Palm%20Village.",
          },
          {
            label: "Gaur Yamuna City Brochure",
            action: () => {},
            link: "https://wa.me/919315381500?text=Please%20send%20brochure%20for%20Gaur%20Yamuna%20City.",
          },
        ],
      };
    }

    // 4. Specific Projects
    if (text.includes("nimbus") || text.includes("palm village")) {
      return {
        sender: "bot",
        text: "Nimbus The Palm Village offers resort-style low-rise luxury living on the Yamuna Expressway. Low density, private lawns, and top-tier amenities starting around ₹90 Lakhs onwards. UPRERA Approved.",
        actions: [{ label: "View Project details", action: () => window.open("/nimbus-palm-village", "_blank") }],
      };
    }

    if (text.includes("ace") || text.includes("hanei")) {
      return {
        sender: "bot",
        text: "ACE Hanei in Greater Noida West features premium residential high-rises. Extremely spacious layouts, grand clubhouse, and high connectivity options starting around ₹1.6 Cr. UPRERA Approved.",
        actions: [{ label: "View Project details", action: () => window.open("/ace-hanei", "_blank") }],
      };
    }

    if (text.includes("ats") || text.includes("homekraft")) {
      return {
        sender: "bot",
        text: "ATS Homekraft in Sector 150 Noida Expressway features premium eco-living and vast sports amenities. Built by ATS, Sector 150 is the greenest sector of Noida Expressway. UPRERA Approved.",
        actions: [{ label: "View Project details", action: () => window.open("/ats-homekraft", "_blank") }],
      };
    }

    if (text.includes("gaur") || text.includes("yamuna city")) {
      return {
        sender: "bot",
        text: "Gaur Yamuna City is an integrated 250-acre township offering luxury villa plots, lakes, and high-end conveniences on the Yamuna Expressway close to the Jewar Airport corridor.",
        actions: [{ label: "View Project details", action: () => window.open("/gaur-yamuna-city", "_blank") }],
      };
    }

    // Default reply
    return {
      sender: "bot",
      text: "Aapka query humne note kar liya hai. A senior real estate consultant can share customized inventory matches, maps, and specific payment plans with you directly. Let's chat on WhatsApp or call our desk.",
      actions: [
        {
          label: "Live WhatsApp Chat",
          action: () => {},
          link: "https://wa.me/919315381500?text=Hello%20Goodluck,%20I%20have%20questions%20regarding%20Noida%20properties.",
        },
        { label: "Call Specialist", action: () => {}, link: "tel:9315381500" },
      ],
    };
  };

  const suggestions = [
    "What are Sector 150 prices?",
    "Why invest near Jewar Airport?",
    "Book a VIP Site Visit",
    "ACE Hanei Details",
  ];

  return (
    <>
      {/* Floating Chat Trigger button */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-luxury-gold text-luxury-green-dark flex items-center justify-center shadow-lg shadow-black/30 border border-luxury-gold-light/40 cursor-pointer relative"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-luxury-gold-bright"></span>
          </span>
        </motion.button>
      </div>

      {/* Chat Window Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 left-6 z-50 w-full max-w-[360px] sm:max-w-[400px] h-[500px] glass border-luxury-gold/30 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-luxury-green-medium p-4 border-b border-luxury-gold/20 flex justify-between items-center">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-white tracking-wide">
                    VIP Property AI
                  </h4>
                  <span className="text-[10px] text-emerald-400 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                    Online &amp; Fluent (Hinglish)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-luxury-green-dark/30 scrollbar-thin">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user"
                        ? "bg-luxury-gold text-luxury-green-dark"
                        : "bg-luxury-green-medium text-luxury-gold border border-luxury-gold/20"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col space-y-2 max-w-[75%]">
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed font-light ${
                        msg.sender === "user"
                          ? "bg-luxury-gold/15 text-white rounded-tr-none border border-luxury-gold/25"
                          : "bg-white/5 text-slate-200 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {msg.text.split("\n").map((line, lidx) => (
                        <p key={lidx} className={lidx > 0 ? "mt-2.5" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Quick response actions inside bubbles */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {msg.actions.map((act, aix) =>
                          act.link ? (
                            <a
                              key={aix}
                              href={act.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] bg-luxury-green-medium border border-luxury-gold/25 text-luxury-gold-light hover:bg-luxury-gold hover:text-luxury-green-dark px-2.5 py-1 rounded-full font-medium transition-all"
                            >
                              {act.label}
                            </a>
                          ) : (
                            <button
                              key={aix}
                              onClick={act.action}
                              className="text-[10px] bg-luxury-green-medium border border-luxury-gold/25 text-luxury-gold-light hover:bg-luxury-gold hover:text-luxury-green-dark px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer"
                            >
                              {act.label}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions Overlay (shows when few messages are sent) */}
            {messages.length < 5 && (
              <div className="p-3 bg-luxury-green-dark/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar scroll-smooth">
                {suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sug)}
                    className="shrink-0 text-[10px] bg-white/5 border border-white/10 hover:border-luxury-gold/30 text-slate-300 hover:text-luxury-gold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Text Input Footer */}
            <div className="p-3 border-t border-white/5 bg-luxury-green-medium flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask in Hindi, English, ya Hinglish..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                className="flex-1 bg-white/5 border border-white/10 focus:border-luxury-gold/40 text-xs px-3.5 py-2.5 rounded-xl text-white outline-none focus:bg-white/8 transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                className="p-2.5 bg-luxury-gold hover:bg-luxury-gold-bright text-luxury-green-dark rounded-xl transition-all active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
