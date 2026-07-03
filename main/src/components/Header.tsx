import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X, Award, Phone } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenFreeTrial: () => void;
}

export default function Header({ onOpenBooking, onOpenFreeTrial }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-yellow-400/20 py-2'
          : 'bg-gradient-to-b from-black/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo Brand */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo size="sm" showTagline={false} className="items-start" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-yellow-400 transition-colors uppercase"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('facility-gallery')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-yellow-400 transition-colors uppercase"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('quick-hours')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-yellow-400 transition-colors uppercase"
            >
              Schedule
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-yellow-400 transition-colors uppercase"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-sm font-medium tracking-wide text-gray-300 hover:text-yellow-400 transition-colors uppercase"
            >
              Contact
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-booking-btn"
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-bold tracking-wider text-yellow-400 border border-yellow-400/50 rounded-lg hover:bg-yellow-400 hover:text-black transition-all uppercase duration-300"
            >
              Book Class
            </button>
            <button
              id="header-trial-btn"
              onClick={onOpenFreeTrial}
              className="px-4 py-2 text-xs font-bold tracking-wider text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 shadow-md shadow-yellow-400/20 hover:scale-105 transition-all uppercase duration-300 flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              Free Trial Pass
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-yellow-400 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-black/95 border-b border-yellow-400/20 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-4 pt-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left text-base font-semibold tracking-wide text-gray-200 hover:text-yellow-400 uppercase py-1 border-b border-gray-800"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('facility-gallery')}
              className="text-left text-base font-semibold tracking-wide text-gray-200 hover:text-yellow-400 uppercase py-1 border-b border-gray-800"
            >
              Gallery & facilities
            </button>
            <button
              onClick={() => scrollToSection('quick-hours')}
              className="text-left text-base font-semibold tracking-wide text-gray-200 hover:text-yellow-400 uppercase py-1 border-b border-gray-800"
            >
              Timings & Schedule
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="text-left text-base font-semibold tracking-wide text-gray-200 hover:text-yellow-400 uppercase py-1 border-b border-gray-800"
            >
              Reviews & Feedback
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="text-left text-base font-semibold tracking-wide text-gray-200 hover:text-yellow-400 uppercase py-1 border-b border-gray-800"
            >
              Contact Us
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center py-2.5 text-sm font-bold tracking-wider text-yellow-400 border border-yellow-400/50 rounded-lg hover:bg-yellow-400 hover:text-black transition-all uppercase"
            >
              Book Class
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenFreeTrial();
              }}
              className="w-full text-center py-2.5 text-sm font-bold tracking-wider text-black bg-yellow-400 rounded-lg hover:bg-yellow-300 transition-all uppercase flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Claim Free Trial Pass
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
