import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facility } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, CheckCircle2, Award } from 'lucide-react';

// @ts-ignore
import galleryImg1 from '../../gallery/1.jpg';
// @ts-ignore
import galleryImg2 from '../../gallery/2.PNG';
// @ts-ignore
import galleryImg3 from '../../gallery/3.PNG';
// @ts-ignore
import galleryImg4 from '../../gallery/4.PNG';
// @ts-ignore
import galleryImg5 from '../../gallery/5.jpg';

const GALLERY_ITEMS: Facility[] = [
  {
    id: 'gallery-1',
    title: 'Main Strength Floor',
    tagline: 'Premium Strength & Conditioning',
    description: 'Our spacious workout arena equipped with premium heavy dumbbells, heavy-duty plates, and custom weightlifting stations.',
    imageUrl: galleryImg1,
    features: ['Elite Selection Machines', 'Professional Dumbbell Racks', 'Premium Barbells', 'Expert Trainer Assistance']
  },
  {
    id: 'gallery-2',
    title: 'Advanced Cardio Hub',
    tagline: 'Endurance & Stamina',
    description: 'Top-tier speed-adjustable treadmills and endurance cross-trainers positioned perfectly for high-intensity cardio training.',
    imageUrl: galleryImg2,
    features: ['High-Speed Treadmills', 'Vitals and Cardio Tracking', 'Active Ventilation', 'Ambient Lighting']
  },
  {
    id: 'gallery-3',
    title: 'Elite Powerlifting Station',
    tagline: 'Designed for Warriors',
    description: 'Heavy squat racks, rigid barbell platforms, and high-quality bumper plates built to sustain heavy lifts and powerlifting progress.',
    imageUrl: galleryImg3,
    features: ['Rigid Squat Stations', 'Olympic Lifting Bars', 'Heavy Bumper Plates', 'Safety Spotting Racks']
  },
  {
    id: 'gallery-4',
    title: 'Functional Agility Arena',
    tagline: 'Dynamic Speed & Athletics',
    description: 'Premium shock-absorbing green turf base designed for explosive speed, core workouts, stretching, and functional movement drills.',
    imageUrl: galleryImg4,
    features: ['Shock-Absorbing Turf Base', 'Agility Speed Tracks', 'Functional Core Mats', 'Spacious Stretching Zone']
  },
  {
    id: 'gallery-5',
    title: 'Luxury Wellness Suite',
    tagline: 'Jacuzzi & Dry Sauna Recovery',
    description: 'Reinvigorate sore muscles and enhance recovery with our deluxe hot jacuzzi and deep-heat dry sauna wellness facilities.',
    imageUrl: galleryImg5,
    features: ['Therapeutic Hot Jacuzzi', 'Deep Heat Dry Sauna', 'Hygienic Private Lockers', 'Comfortable Lounge Area']
  }
];

interface GallerySectionProps {
  onOpenBooking: () => void;
}

export default function GallerySection({ onOpenBooking }: GallerySectionProps) {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = (facility: Facility) => {
    setSelectedFacility(facility);
  };

  const closeLightbox = () => {
    setSelectedFacility(null);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFacility) return;
    const currentIndex = GALLERY_ITEMS.findIndex(f => f.id === selectedFacility.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setSelectedFacility(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedFacility) return;
    const currentIndex = GALLERY_ITEMS.findIndex(f => f.id === selectedFacility.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setSelectedFacility(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section id="facility-gallery" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1 bg-yellow-400/10 px-3 py-1 rounded-full text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Explore Soul Fitness
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Our Premium <span className="text-yellow-400">Facilities</span>
          </h2>
          <p className="text-gray-400 font-sans text-sm sm:text-base">
            Take an interactive tour of Soul Fitness Gym. Click on any area to view full photos, dynamic equipment specifications, and special zone configurations.
          </p>
        </div>

        {/* Facility Responsive Grid */}
        <motion.div
          id="facility-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {GALLERY_ITEMS.map((facility, idx) => (
              <motion.div
                key={facility.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-neutral-900 border border-neutral-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-yellow-400/30 transition-all duration-300 flex flex-col h-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                  <img
                    src={facility.imageUrl}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-yellow-400 text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase border border-yellow-400/20">
                    {facility.tagline}
                  </span>

                  {/* Maximize Lightbox button */}
                  <button
                    onClick={() => openLightbox(facility)}
                    className="absolute bottom-4 right-4 p-2.5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg cursor-pointer"
                    title="View Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-xl text-white uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                      {facility.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      {facility.description}
                    </p>
                  </div>

                  {/* Bullet Spec Features */}
                  <div className="pt-2 border-t border-neutral-800/80">
                    <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                      {facility.features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-[10px] font-mono text-gray-300">
                          <CheckCircle2 className="w-3 h-3 text-yellow-400 shrink-0" />
                          <span className="truncate" title={feat}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick CTAs */}
                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => openLightbox(facility)}
                      className="text-xs text-gray-400 hover:text-white font-bold tracking-wider uppercase font-mono py-2 flex-1 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors text-center"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={onOpenBooking}
                      className="text-xs bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold tracking-wider uppercase py-2 flex-1 rounded-lg transition-all text-center"
                    >
                      Book Zone
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal / Slideshow */}
        <AnimatePresence>
          {selectedFacility && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-2 bg-neutral-900/85 hover:bg-neutral-800 text-gray-400 hover:text-white rounded-full border border-neutral-800 transition-colors cursor-pointer z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 p-3 bg-neutral-900/85 hover:bg-neutral-800 text-gray-300 hover:text-yellow-400 rounded-full border border-neutral-800 transition-all cursor-pointer z-40 hover:scale-105"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 sm:right-8 p-3 bg-neutral-900/85 hover:bg-neutral-800 text-gray-300 hover:text-yellow-400 rounded-full border border-neutral-800 transition-all cursor-pointer z-40 hover:scale-105"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col lg:grid lg:grid-cols-12 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Image Section */}
                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-[650px] bg-neutral-950 flex items-center">
                  <img
                    src={selectedFacility.imageUrl}
                    alt={selectedFacility.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                    {selectedFacility.tagline}
                  </div>
                </div>

                {/* Detail text details */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full bg-neutral-900 text-left overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs text-yellow-400 font-mono tracking-widest uppercase font-bold">
                        Facility Tour
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight mt-1 leading-none">
                        {selectedFacility.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-sm font-light leading-relaxed">
                      {selectedFacility.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
                        Equipment & Design Specs:
                      </h4>
                      <ul className="space-y-2">
                        {selectedFacility.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-200">
                            <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-neutral-800 mt-6 space-y-3">
                    <button
                      onClick={() => {
                        closeLightbox();
                        onOpenBooking();
                      }}
                      className="w-full text-center py-3 text-sm font-extrabold tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all uppercase shadow-lg shadow-yellow-400/10"
                    >
                      Book Free Training Here
                    </button>
                    <button
                      onClick={closeLightbox}
                      className="w-full text-center py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase font-mono"
                    >
                      Go back to gallery
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
