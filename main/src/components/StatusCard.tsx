import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Star, Map, Instagram } from 'lucide-react';

export default function StatusCard() {
  const [karachiTime, setKarachiTime] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentDayStr, setCurrentDayStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        
        // Format time in Karachi zone
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });

        const dayFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          weekday: 'long',
        });

        const hour24Formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: 'numeric',
          hour12: false,
        });

        const formattedTime = timeFormatter.format(now);
        const currentDay = dayFormatter.format(now);
        const currentHour24 = parseInt(hour24Formatter.format(now), 10);
        
        setKarachiTime(formattedTime);
        setCurrentDayStr(currentDay);

        // Sunday is Closed
        if (currentDay === 'Sunday') {
          setIsOpen(false);
          return;
        }

        // Monday - Saturday: 7:00 AM to 1:00 AM
        // 7 AM is 7, 1 AM (next morning) is 1.
        // So open if hour is >= 7 (07:00) OR hour < 1 (01:00)
        // If hour is 0 (12:00 AM to 12:59 AM) or 1 AM, the gym is still open from the previous day's shift.
        // Wait, 1:00 AM is the closing time, so we close exactly at 1:00.
        if (currentHour24 >= 7 || currentHour24 < 1) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } catch (err) {
        // Fallback if Intl is not fully supported or errors
        const now = new Date();
        const hour = now.getHours();
        const day = now.toLocaleDateString('en-US', { weekday: 'long' });
        setCurrentDayStr(day);
        setKarachiTime(now.toLocaleTimeString());
        if (day === 'Sunday') {
          setIsOpen(false);
        } else {
          setIsOpen(hour >= 7 || hour < 1);
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="quick-hours" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-6xl mx-auto -mt-16 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divider-y md:divider-y-0 md:divider-x divider-neutral-800">
        
        {/* Gym Timings Status */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg tracking-tight uppercase">
                Gym Timings
              </h4>
              <p className="text-gray-400 text-xs font-mono">LIVE KARACHI CLOCK</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-white tracking-tight">
                {karachiTime || '07:00 AM'}
              </span>
              <span className="text-xs text-gray-500 uppercase font-mono">
                {currentDayStr}
              </span>
            </div>

            {/* Dynamic Badge */}
            <div className="flex items-center gap-2">
              {isOpen ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Open Now (Closes 1 AM)
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                  Closed Now (Opens 7 AM)
                </div>
              )}
            </div>
          </div>
          
          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            Timings: Monday – Saturday (7:00 AM – 1:00 AM). <br />
            <strong>Sunday: Closed</strong> for maintenance.
          </p>
        </div>

        {/* Location Block */}
        <div className="flex flex-col justify-between space-y-4 md:pl-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg tracking-tight uppercase">
                Location Details
              </h4>
              <p className="text-gray-400 text-xs font-mono">FEDERAL B AREA</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-200 font-bold leading-snug">
              Soul Fitness Gym
            </p>
            <p className="text-xs text-gray-400 leading-normal">
              B-4, Federal B Area Block 12, Gulberg Town, Karachi, 75950, Pakistan
            </p>
            <p className="text-[11px] text-yellow-400/80 font-mono">
              Plus Code: W3Q8+9F Gulberg Town, Karachi
            </p>
          </div>

          <a
            href="https://maps.google.com/?q=Soul+Fitness+Gym+Gulberg+Town+Karachi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 transition-colors uppercase font-bold"
          >
            <Map className="w-3.5 h-3.5" />
            Open in Google Maps
          </a>
        </div>

        {/* Quick Contact & Rating */}
        <div className="flex flex-col justify-between space-y-4 md:pl-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-lg tracking-tight uppercase">
                Direct Contact
              </h4>
              <p className="text-gray-400 text-xs font-mono">CALL OR WHATSAPP</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-mono font-black text-yellow-400 tracking-tight">
              03462459535
            </p>
            
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-300 mr-2 font-bold uppercase">Google Score:</span>
              <div className="flex text-yellow-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-white ml-1">4.6</span>
                <span className="text-[11px] text-gray-500 ml-1">(5 stars feed)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <a
              href="tel:03462459535"
              className="text-[10px] sm:text-xs bg-neutral-800 text-gray-200 py-2 px-1 rounded-lg border border-neutral-700 hover:border-yellow-400/40 hover:text-white transition-all uppercase font-bold text-center flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>Call</span>
            </a>
            <a
              href="https://www.facebook.com/soulfitness.khi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs bg-blue-600/10 text-blue-400 py-2 px-1 rounded-lg border border-blue-500/20 hover:bg-blue-600/20 hover:text-blue-300 transition-all uppercase font-bold text-center flex items-center justify-center gap-1"
            >
              <span>Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/soulfitnesskhi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs bg-pink-600/10 text-pink-400 py-2 px-1 rounded-lg border border-pink-500/20 hover:bg-pink-600/20 hover:text-pink-300 transition-all uppercase font-bold text-center flex items-center justify-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5 shrink-0" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
