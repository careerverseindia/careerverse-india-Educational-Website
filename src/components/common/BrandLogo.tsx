import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withWhiteBg?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClasses = {
    sm: 'h-10 sm:h-12',
    md: 'h-12 sm:h-14',
    lg: 'h-14 sm:h-16',
    xl: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/careerverse-logo copy.png"
        alt="CareerVerse India - Guiding Careers. Building Futures."
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.015]`}
        loading="eager"
      />
    </div>
  );
};