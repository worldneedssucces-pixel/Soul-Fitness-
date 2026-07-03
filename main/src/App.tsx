/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StatusCard from './components/StatusCard';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import BookingModal from './components/BookingModal';
import FreeTrialModal from './components/FreeTrialModal';
import { Sparkles, Trophy, Shield, Dumbbell, Facebook, Instagram } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFreeTrialOpen, setIsFreeTrialOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  const handleOpenFreeTrial = () => setIsFreeTrialOpen(true);
  const handleCloseFreeTrial = () => setIsFreeTrialOpen(false);

  const handleExploreGallery = () => {
    const galleryEl = document.getElementById('facility-gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="soul-fitness-app" className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black antialiased">
      {/* Global Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        onOpenFreeTrial={handleOpenFreeTrial}
      />

      {/* Hero Banner Entry */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onOpenFreeTrial={handleOpenFreeTrial}
        onExploreGallery={handleExploreGallery}
      />

      {/* Floating Status / timings checkup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <StatusCard />
      </div>

      {/* Core Highlights section */}
      <section id="why-choose-us" className="py-24 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Highlight 1 */}
            <div className="bg-neutral-900/50 border border-neutral-800/80 p-8 rounded-2xl space-y-4 hover:border-yellow-400/20 transition-colors">
              <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400 w-fit">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">
                Elite Conditioning
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Expert training workflows tailored for powerlifting, bodybuilding, weight loss, and general body sculpting. Our coaches are veteran guides dedicated to your results.
              </p>
            </div>

            {/* Highlight 2 */}
            <div className="bg-neutral-900/50 border border-neutral-800/80 p-8 rounded-2xl space-y-4 hover:border-yellow-400/20 transition-colors">
              <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400 w-fit">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">
                Superior Turf & Gear
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                High-grade artificial green grass turf throughout the gym for low-impact joint protection, paired with premium adjustable red and black workout benches and squat racks.
              </p>
            </div>

            {/* Highlight 3 */}
            <div className="bg-neutral-900/50 border border-neutral-800/80 p-8 rounded-2xl space-y-4 hover:border-yellow-400/20 transition-colors">
              <div className="p-3 bg-yellow-400/10 rounded-xl text-yellow-400 w-fit">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">
                Outdoor Recovery Zone
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Unwind on our scenic outdoor terrace cafe. Styled with stone slab paths, turf, and contemporary seating, it is the perfect spot for post-workout protein shakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Gallery & Spec Sheets */}
      <GallerySection onOpenBooking={handleOpenBooking} />

      {/* Dynamic Review Scores & Review Writers */}
      <ReviewsSection />

      {/* Direct Contact Coordinates & Embedded Maps */}
      <ContactSection />

      {/* Footer Branding Area */}
      <footer className="bg-black border-t border-neutral-900 py-12 text-center text-gray-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="font-display font-extrabold text-white tracking-widest text-sm uppercase">
              SOUL <span className="text-yellow-400">FITNESS</span>
            </span>
            <span className="text-gray-700">|</span>
            <span className="uppercase text-[10px] tracking-wider text-gray-400">Commit To Be Fit</span>
          </div>
          
          <p className="text-[11px] text-gray-500 max-w-md mx-auto leading-relaxed">
            B-4, Federal B Area Block 12, Gulberg Town, Karachi, Pakistan. <br />
            Tel: <strong className="text-gray-400">03462459535</strong>
          </p>

          <div className="pt-2 flex justify-center gap-6 text-[10px] uppercase font-bold text-gray-400">
            <a href="#hero" className="hover:text-yellow-400 transition-colors">Home</a>
            <a href="#facility-gallery" className="hover:text-yellow-400 transition-colors">Gallery</a>
            <a href="#reviews-section" className="hover:text-yellow-400 transition-colors">Reviews</a>
            <a href="#contact-section" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>

          <div className="flex justify-center gap-4 pt-1">
            <a
              href="https://www.facebook.com/soulfitness.khi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-blue-400 rounded-lg border border-neutral-850 transition-all"
              title="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/soulfitnesskhi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 text-gray-400 hover:text-pink-400 rounded-lg border border-neutral-850 transition-all"
              title="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 text-[10px] text-gray-600 border-t border-neutral-950">
            &copy; {new Date().getFullYear()} Soul Fitness Gym Karachi. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating pulsing WhatsApp fab widget */}
      <WhatsAppButton />

      {/* Appointment reservation modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
      />

      {/* Voucher card modal */}
      <FreeTrialModal
        isOpen={isFreeTrialOpen}
        onClose={handleCloseFreeTrial}
      />
    </div>
  );
}

