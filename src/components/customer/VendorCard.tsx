import React from 'react';
import { Vendor } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { VisualFallback } from '../common/VisualFallback';
import { Star, CheckCircle, MapPin, Heart, Sparkles, Calendar } from 'lucide-react';

interface VendorCardProps {
  vendor: Vendor;
  onOpenDetails: (vendorId: string) => void;
  onRequestQuote: (vendor: Vendor) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onOpenDetails,
  onRequestQuote,
}) => {
  const { favourites, toggleFavourite, language } = useApp();
  const isFav = favourites.includes(vendor.id);

  return (
    <div className="bg-white rounded-lg border border-stone-200 overflow-hidden hover:border-[#8C2337]/50 hover:shadow-md transition-all flex flex-col group">
      {/* Visual Header */}
      <div className="relative">
        <VisualFallback
          type={vendor.bannerImage || vendor.categoryId}
          title={vendor.businessName}
          aspect="4:3"
        />

        {/* Top Floating Controls */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20">
          {vendor.isSponsored ? (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-amber-500 text-stone-950 px-2 py-0.5 rounded shadow-xs">
              {language === 'en' ? 'Sponsored' : 'विज्ञापन'}
            </span>
          ) : vendor.isFeatured ? (
            <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#5C1322] text-[#E5C378] px-2 py-0.5 rounded shadow-xs border border-[#852538] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#E5C378]" />
              Featured
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={e => {
              e.stopPropagation();
              toggleFavourite(vendor.id);
            }}
            aria-label={isFav ? 'Remove from saved' : 'Save to favourites'}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700 hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>
        </div>

        {/* Verified Status Tag on Image Bottom */}
        {vendor.verified && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-[#E5C378] text-[11px] font-medium px-2 py-0.5 rounded">
            <CheckCircle className="w-3 h-3 text-[#E5C378]" />
            <span>Verified Partner</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Locality */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1">
            <span>{vendor.categoryName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-0.5 text-stone-600">
              <MapPin className="w-3 h-3 text-stone-400" />
              {vendor.locality}, {vendor.city}
            </span>
          </div>

          {/* Business Title */}
          <button
            onClick={() => onOpenDetails(vendor.id)}
            className="text-left w-full group-hover:text-[#6E1428] transition-colors cursor-pointer"
          >
            <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug line-clamp-1">
              {vendor.businessName}
            </h3>
          </button>

          {/* Experience and Rating */}
          <div className="flex items-center gap-3 mt-2 text-xs text-stone-600">
            <div className="flex items-center gap-1 font-semibold text-stone-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{vendor.rating.toFixed(1)}</span>
              <span className="text-stone-500 font-normal">({vendor.reviewCount})</span>
            </div>

            <span>{vendor.yearsOfExperience} yrs experience</span>
            <span aria-hidden="true">·</span>
            <span>{vendor.completedBookingsCount} bookings</span>
          </div>

          {/* Short description */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[11px] text-stone-500 block">
                {language === 'en' ? 'Packages start from' : 'शुरुआती कीमत'}
              </span>
              <div className="text-base font-bold text-stone-900 tabular-nums">
                {formatINR(vendor.startingPrice)}{' '}
                <span className="text-xs font-normal text-stone-500">/{vendor.pricingUnit}</span>
              </div>
            </div>

            <div className="text-right text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-600" />
              <span>Available for season</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(vendor.id)}
              className="py-2 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors text-center cursor-pointer"
            >
              {language === 'en' ? 'View Details' : 'विवरण देखें'}
            </button>
            <button
              onClick={() => onRequestQuote(vendor)}
              className="py-2 px-3 text-xs font-medium text-white bg-[#6E1428] hover:bg-[#560F1E] rounded transition-colors text-center cursor-pointer"
            >
              {language === 'en' ? 'Request Quote' : 'कोटेशन मांगें'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
