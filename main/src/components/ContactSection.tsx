import React, { useState, useEffect } from 'react';
import { GYM_HOURS } from '../data';
import { Clock, MapPin, Phone, Facebook, Map, Compass, Info, Check, Instagram } from 'lucide-react';

export default function ContactSection() {
  const [currentDayName, setCurrentDayName] = useState<string>('');

  useEffect(() => {
    try {
      const dayFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'long',
      });
      setCurrentDayName(dayFormatter.format(new Date()));
    } catch (e) {
      setCurrentDayName(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
    }
  }, []);

  return (
    <section id="contact-section" className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Connect With Us
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Find <span className="text-yellow-400">Our Gym</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            We are located in Federal B Area, Gulberg Town, Karachi. Review our full weekly schedule below, call our front desk, or inspect our physical location maps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Column 1: Contact Details & Hours (Left Side) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Hour Sheet Cards */}
            <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl text-left">
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
                <Clock className="w-5.5 h-5.5 text-yellow-400" />
                Gym Working Timings
              </h3>
              
              <div id="working-hours-list" className="space-y-2.5">
                {GYM_HOURS.map(h => {
                  const isToday = h.day === currentDayName;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                        isToday
                          ? 'bg-yellow-400/10 border border-yellow-400/30 font-bold'
                          : 'bg-neutral-950/40 border border-transparent'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-sans ${isToday ? 'text-yellow-400' : 'text-gray-300'}`}>
                        {h.day}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono ${isToday ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {h.hours}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-bold font-mono bg-yellow-400 text-black px-1.5 py-0.5 rounded uppercase">
                            TODAY
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Details Card */}
            <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-left">
              <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                Quick Addresses & Lines
              </h3>

              <div className="space-y-4">
                {/* Physical Location */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg mt-0.5 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                      Physical Gym Address
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-normal">
                      B-4, Federal B Area Block 12 Gulberg Town, Karachi, 75950, Pakistan
                    </p>
                    <p className="text-[10px] text-yellow-400/80 font-mono mt-0.5">
                      Plus Code: W3Q8+9F Gulberg Town, Karachi
                    </p>
                  </div>
                </div>

                {/* Helpline */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/10 text-yellow-400 rounded-lg mt-0.5 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                      Front Desk Number
                    </h4>
                    <p className="text-lg font-mono font-black text-yellow-400 mt-1">
                      03462459535
                    </p>
                    <p className="text-[10px] text-gray-400">Available Monday–Saturday: 7 AM–1 AM</p>
                  </div>
                </div>

                {/* Facebook page */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg mt-0.5 shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                      Facebook Page
                    </h4>
                    <a
                      href="https://www.facebook.com/soulfitness.khi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold underline mt-1 block"
                    >
                      facebook.com/soulfitness.khi
                    </a>
                  </div>
                </div>

                {/* Instagram profile */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg mt-0.5 shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
                      Instagram Profile
                    </h4>
                    <a
                      href="https://www.instagram.com/soulfitnesskhi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-400 hover:text-pink-300 font-bold underline mt-1 block"
                    >
                      @soulfitnesskhi
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Live Embedded Google Map (Right Side) */}
          <div className="lg:col-span-7 relative h-[450px] lg:h-auto rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-end p-6">
            
            {/* Embedded Live Google Maps Iframe */}
            <div className="absolute inset-0 z-0 bg-neutral-950">
              <iframe
                title="Soul Fitness Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3618.330882855734!2d67.075936!3d24.9208064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f67ba053c89%3A0xe54e60241b7776b6!2sSoul%20Fitness%20Gym!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.85, filter: 'invert(90%) hue-rotate(180deg) contrast(120%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Float details panel on map */}
            <div className="relative z-10 bg-neutral-900/95 border border-neutral-800/80 p-5 rounded-2xl max-w-sm text-left shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-yellow-400 text-black rounded-lg">
                  <Map className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">SOUL FITNESS</h4>
                  <p className="text-sm font-bold text-white mt-0.5">Karachi Branch Location</p>
                </div>
              </div>
              
              <p className="text-gray-400 text-xs font-light leading-relaxed">
                Located near Federal B Area Block 12, close to Gulberg Town landmarks. Ample street parking is available outside the facility.
              </p>

              <div className="flex gap-2">
                <a
                  href="https://maps.google.com/?q=Soul+Fitness+Gym+Gulberg+Town+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black text-[10px] font-extrabold tracking-wider uppercase rounded-lg flex-1 text-center transition-colors shadow-md shadow-yellow-400/10"
                >
                  Get Directions
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
