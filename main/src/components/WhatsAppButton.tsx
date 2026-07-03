import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Check } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [chatOpened, setChatOpened] = useState(false);

  useEffect(() => {
    // Show welcome bubble after 2.5 seconds
    const timer = setTimeout(() => {
      // Only show if not previously dismissed
      const dismissed = localStorage.getItem('soul_wa_dismissed');
      if (!dismissed) {
        setShowTooltip(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const dismissTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    localStorage.setItem('soul_wa_dismissed', 'true');
  };

  const handleWhatsAppRedirect = () => {
    setShowTooltip(false);
    // Redirect to international format for Pakistan phone 03462459535 (923462459535)
    // Pre-filled message for great UX
    const message = encodeURIComponent("As-salamu alaykum Soul Fitness! I'm interested in learning more about your gym membership, classes, and current packages.");
    window.open(`https://wa.me/923462459535?text=${message}`, '_blank');
  };

  return (
    <div id="whatsapp-float-widget" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Tooltip Welcome Speech Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            className="mb-3 bg-neutral-900 border border-neutral-800 text-left p-4 rounded-2xl shadow-2xl max-w-xs w-72 relative backdrop-blur-md"
            onClick={handleWhatsAppRedirect}
          >
            {/* Speech bubble arrow point */}
            <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-neutral-900 border-r border-b border-neutral-800 rotate-45"></div>

            {/* Close tooltip button */}
            <button
              onClick={dismissTooltip}
              className="absolute top-2 right-2 p-0.5 bg-neutral-950 hover:bg-neutral-850 text-gray-500 hover:text-white rounded-full border border-neutral-800 transition-colors cursor-pointer"
              title="Close Greeting"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Chat bubble body content */}
            <div className="space-y-2 cursor-pointer">
              {/* Header */}
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Online reception
                </span>
              </div>

              {/* Message */}
              <p className="text-xs text-gray-300 font-light leading-relaxed pr-2">
                As-salamu alaykum! 👋 Ask us anything about membership prices, group fitness classes, or gym timings. Click to chat!
              </p>

              {/* Quick statistics */}
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-500 pt-1 border-t border-neutral-850">
                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>Typically replies in 5 minutes</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating pulsing WhatsApp brand icon FAB */}
      <motion.button
        id="whatsapp-fab-btn"
        onClick={handleWhatsAppRedirect}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow duration-300 cursor-pointer group"
        title="Chat on WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none scale-105 group-hover:animate-none"></span>
        
        <MessageCircle className="w-6.5 h-6.5 fill-current shrink-0" />
      </motion.button>

    </div>
  );
}
