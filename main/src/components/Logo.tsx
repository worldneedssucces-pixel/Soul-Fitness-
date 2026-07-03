import React from 'react';
// @ts-ignore
import gymLogo from '../../Images/logo.jpg';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', showTagline = true, size = 'md' }: LogoProps) {
  const getLogoHeight = () => {
    switch (size) {
      case 'sm':
        return 'h-20 md:h-24';
      case 'lg':
        return 'h-40 md:h-48';
      case 'md':
      default:
        return 'h-28 md:h-32';
    }
  };

  const heightClass = getLogoHeight();

  return (
    <div id="gym-logo-container" className={`flex flex-col items-center select-none ${className}`}>
      <img
        src={gymLogo}
        alt="Soul Fitness Logo"
        className={`${heightClass} w-auto object-contain`}
        referrerPolicy="no-referrer"
      />
      {showTagline && (
        <div id="gym-tagline" className="text-center font-display tracking-widest text-gray-300 font-bold uppercase mt-1 text-[10px]">
          — Commit To Be Fit —
        </div>
      )}
    </div>
  );
}
