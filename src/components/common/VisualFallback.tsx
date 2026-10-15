import React from 'react';
import { Camera, Castle, Sparkles, Utensils, Music, Smile, Shirt, Gem, Car } from 'lucide-react';

interface VisualFallbackProps {
  type: string;
  title?: string;
  aspect?: '16:9' | '4:3' | '1:1';
  className?: string;
}

export const VisualFallback: React.FC<VisualFallbackProps> = ({
  type,
  title,
  aspect = '4:3',
  className = '',
}) => {
  const aspectClass =
    aspect === '16:9' ? 'aspect-video' : aspect === '1:1' ? 'aspect-square' : 'aspect-[4/3]';

  // Palette combinations for wedding themes: Burgundy, Gold, Ivory, Wine
  const getTheme = () => {
    switch (type) {
      case 'photo_cinema_hero':
      case 'photography':
        return {
          bg: 'from-[#4A0E1A] via-[#6B1728] to-[#8F1D36]',
          icon: Camera,
          pattern: 'radial-gradient(circle at 75% 25%, rgba(212,175,55,0.2) 0%, transparent 60%)',
          motif: 'Cinematic Studio',
        };
      case 'venue_lawn_hero':
      case 'venues':
        return {
          bg: 'from-[#1A261D] via-[#2D4233] to-[#445E4D]',
          icon: Castle,
          pattern: 'radial-gradient(circle at 30% 70%, rgba(212,175,55,0.25) 0%, transparent 60%)',
          motif: 'Grand Lawn & Palace',
        };
      case 'catering_feast_hero':
      case 'catering':
        return {
          bg: 'from-[#4D260D] via-[#7A3E16] to-[#A05220]',
          icon: Utensils,
          pattern: 'radial-gradient(circle at 80% 30%, rgba(229,195,120,0.2) 0%, transparent 60%)',
          motif: 'Shahi Royal Feast',
        };
      case 'band_baraat_hero':
      case 'band':
        return {
          bg: 'from-[#3A1435] via-[#5C1B54] to-[#7E2573]',
          icon: Music,
          pattern: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.25) 0%, transparent 70%)',
          motif: 'Royal Brass Band',
        };
      case 'bridal_makeup_hero':
      case 'makeup':
      case 'mehndi':
        return {
          bg: 'from-[#521327] via-[#7B203E] to-[#A32E54]',
          icon: Smile,
          pattern: 'radial-gradient(circle at 70% 30%, rgba(255,215,0,0.2) 0%, transparent 60%)',
          motif: 'Bridal Couture & Mehndi',
        };
      case 'stage_decor_hero':
      case 'decoration':
      case 'florists':
        return {
          bg: 'from-[#3A0F22] via-[#63183A] to-[#8C2353]',
          icon: Sparkles,
          pattern: 'radial-gradient(circle at 20% 80%, rgba(212,175,55,0.3) 0%, transparent 60%)',
          motif: 'Mandap & Floral Art',
        };
      case 'clothing_lehenga_hero':
      case 'clothing':
        return {
          bg: 'from-[#54121F] via-[#7D1B2E] to-[#A6243D]',
          icon: Shirt,
          pattern: 'radial-gradient(circle at 85% 20%, rgba(212,175,55,0.25) 0%, transparent 60%)',
          motif: 'Zardozi Heritage',
        };
      case 'car_vintage_hero':
      case 'transport':
        return {
          bg: 'from-[#1E2024] via-[#32363D] to-[#4B515C]',
          icon: Car,
          pattern: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.2) 0%, transparent 70%)',
          motif: 'Vintage Carriage',
        };
      default:
        return {
          bg: 'from-[#42111E] via-[#5F182B] to-[#7C2038]',
          icon: Gem,
          pattern: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.2) 0%, transparent 60%)',
          motif: 'Shaadi Supermart',
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-t-lg bg-gradient-to-br ${theme.bg} ${className}`}
      style={{ backgroundImage: theme.pattern }}
    >
      {/* Subtle traditional Indian arched motif overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 L100,0 L100,100 L0,100 Z M50,15 C30,15 15,35 15,65 L85,65 C85,35 70,15 50,15 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="15" r="3" fill="#D4AF37" />
        <line x1="50" y1="18" x2="50" y2="35" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>

      {/* Decorative filigree accents */}
      <div className="absolute top-2 left-2 text-[#D4AF37]/40 text-[10px] tracking-widest uppercase font-serif">
        ★ ETAWAH HERITAGE ★
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
        <div className="w-12 h-12 rounded-full bg-black/25 backdrop-blur-sm border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C378] mb-2 shadow-inner">
          <IconComponent className="w-6 h-6 stroke-[1.5]" />
        </div>
        {title && (
          <p className="text-white font-serif text-sm md:text-base font-medium line-clamp-1 max-w-[90%] drop-shadow-md">
            {title}
          </p>
        )}
        <span className="text-[11px] text-[#E5C378]/90 font-medium tracking-wide mt-0.5">
          {theme.motif}
        </span>
      </div>

      {/* Bottom subtle shadow vignette */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};
