import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Award, Star, ShieldCheck, ChevronDown } from 'lucide-react';

// @ts-ignore
import heroImg1 from '../../Images/630152576_18070505141537792_5280327796017967419_n.jpg';
// @ts-ignore
import heroImg2 from '../../Images/2.jpg';
// @ts-ignore
import heroImg3 from '../../Images/3.jpg';
// @ts-ignore
import heroImg4 from '../../Images/4.jpg';
// @ts-ignore
import heroImg5 from '../../Images/5.jpg';
// @ts-ignore
import heroImg6 from '../../Images/6.jpg';

const heroImages = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
  heroImg6,
];

interface HeroProps {
  onOpenBooking: () => void;
  onOpenFreeTrial: () => void;
  onExploreGallery: () => void;
}

export default function Hero({ onOpenBooking, onOpenFreeTrial, onExploreGallery }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden pt-16"
    >
      {/* Dark Ambient Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1920&auto=format&fit=crop"
          alt="Soul Fitness Gym Banner"
          className="w-full h-full object-cover opacity-35 object-center scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to blend image smoothly into the layout */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
        
        {/* Subtle glowing elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (Left Col) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Google Rating badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 px-3.5 py-1.5 rounded-full"
            >
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current/60" />
              </div>
              <span className="text-yellow-400 font-display font-bold text-xs tracking-wider uppercase">
                4.6 / 5.0 Google Rating
              </span>
            </motion.div>

            {/* Title / Brand Taglines */}
            <div className="space-y-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-yellow-400 font-display text-sm sm:text-base font-extrabold tracking-widest uppercase block"
              >
                Welcome to Federal B Area's Premier Gym
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase leading-[0.95]"
              >
                SOUL FITNESS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 font-black">
                  GYM
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 font-sans text-base sm:text-lg max-w-xl font-light"
              >
                Commit to be fit. Transform your soul, body, and strength with Karachi's finest trainers, advanced workout flooring, and premium lifting gear.
              </motion.p>
            </div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-y-4 gap-x-6 text-xs text-gray-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>PREMIUM EQUIPMENTS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>OUTDOOR RECOVERY LOUNGE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-yellow-400" />
                <span>CERTIFIED KARACHI COACHES</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="hero-free-trial-btn"
                onClick={onOpenFreeTrial}
                className="group px-8 py-4 text-sm font-extrabold tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-yellow-400/20 uppercase flex items-center justify-center gap-2"
              >
                <Award className="w-4.5 h-4.5 text-black group-hover:rotate-12 transition-transform" />
                Get 1-Day Free Trial
              </button>
              
              <button
                id="hero-book-session-btn"
                onClick={onOpenBooking}
                className="px-8 py-4 text-sm font-extrabold tracking-wider text-white bg-neutral-900 border border-neutral-700 hover:border-yellow-400 rounded-xl transition-all duration-300 hover:bg-neutral-800 uppercase flex items-center justify-center gap-2"
              >
                <Calendar className="w-4.5 h-4.5 text-yellow-400" />
                Book Session Now
              </button>
            </motion.div>
          </div>

          {/* Interactive Tire-Flip Hero Graphic (Right Col) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-square bg-gradient-to-tr from-yellow-400/10 to-transparent p-[1px] rounded-3xl overflow-hidden shadow-2xl shadow-yellow-400/5 group"
            >
              {/* Inner container */}
              <div className="absolute inset-[1px] bg-neutral-950 rounded-[23px] overflow-hidden flex flex-col justify-end p-6">
                
                {/* Simulated live visual matching the man-tire banner with rotating image slideshow */}
                <div className="absolute inset-0 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={currentImageIndex}
                      src={heroImages[currentImageIndex]}
                      alt="Soul Fitness Gym Session"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer" onClick={onExploreGallery}>
          <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            EXPLORE THE GYM
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
