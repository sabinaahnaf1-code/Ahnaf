import { motion, AnimatePresence } from "motion/react";
import { X, Send, Phone, Mail, User, Globe } from "lucide-react";
import React, { useState } from "react";
import { db, collection, addDoc, Timestamp, query, where, getDocs } from "../firebase";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const countryCodes = [
  { code: "+880", country: "Bangladesh" },
  { code: "+1", country: "USA/Canada" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+971", country: "UAE" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+81", country: "Japan" },
  { code: "+86", country: "China" },
];

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // 1. Check for Spam Filters
      const email = data.email as string;
      const phone = data.phone as string;
      const name = data.name as string;

      let isSpam = false;

      // Check email spam
      const emailQuery = query(collection(db, "spamFilters"), where("type", "==", "email"), where("value", "==", email));
      const emailSnap = await getDocs(emailQuery);
      if (!emailSnap.empty) isSpam = true;

      // Check phone spam
      if (!isSpam) {
        const phoneQuery = query(collection(db, "spamFilters"), where("type", "==", "phone"), where("value", "==", phone));
        const phoneSnap = await getDocs(phoneQuery);
        if (!phoneSnap.empty) isSpam = true;
      }

      // Check name spam
      if (!isSpam) {
        const nameQuery = query(collection(db, "spamFilters"), where("type", "==", "name"), where("value", "==", name));
        const nameSnap = await getDocs(nameQuery);
        if (!nameSnap.empty) isSpam = true;
      }

      // 2. Save to Firestore
      await addDoc(collection(db, "contacts"), {
        name: data.name,
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        message: data.message || "",
        createdAt: Timestamp.now(),
        status: isSpam ? "spam" : "inbox",
      });

      // 3. Send to Formspree (only if not spam)
      if (!isSpam) {
        await fetch("https://formspree.io/f/mgoppjpj", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
      }

      // We consider it a success if Firestore worked, even if Formspree fails
      // (though Formspree should work too)
      setStatus("success");
      form.reset();
      
      // Close after a delay to show the success message
      setTimeout(() => {
        onClose();
        // Reset status after modal is closed
        setTimeout(() => setStatus("idle"), 500);
      }, 3000);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-blue/30 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-green/20 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact Me</h2>
                  <p className="text-white/40 text-xs sm:text-sm mt-1">I'll get back to you as soon as possible.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 sm:py-16 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Send size={32} className="sm:w-10 sm:h-10" />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/40 text-sm">Thank you for reaching out. I'll be in touch soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex flex-col">
                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green/60 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-green transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/10 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green/60 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-green transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        required
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/10 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green/60 ml-1">Code</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-green transition-colors">
                          <Globe size={18} />
                        </div>
                        <select
                          name="countryCode"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code} className="bg-bg-dark">
                              {c.code} ({c.country})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green/60 ml-1">Phone Number</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-green transition-colors">
                          <Phone size={18} />
                        </div>
                        <input
                          required
                          name="phone"
                          type="tel"
                          pattern="[0-9]{5,15}"
                          placeholder="1234567890"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 pr-4 text-sm sm:text-base text-white placeholder:text-white/10 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-green/60 ml-1">Message (Optional)</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="How can I help you?"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm sm:text-base text-white placeholder:text-white/10 focus:outline-none focus:border-brand-blue/50 focus:bg-white/[0.05] transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "submitting"}
                    type="submit"
                    className="w-full py-3.5 sm:py-4 bg-brand-blue text-white rounded-2xl font-bold flex items-center justify-center gap-2 glow-blue hover:bg-brand-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2 sm:mt-4"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-sm sm:text-base">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm sm:text-base">Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </motion.button>

                  {status === "error" && (
                    <p className="text-brand-green text-xs text-center mt-2">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
