import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { VendorCard } from './VendorCard';
import { translations } from '../../utils/translations';
import { Vendor } from '../../types';
import { Filter, SlidersHorizontal, MapPin, X, ArrowUpDown } from 'lucide-react';

interface VendorDirectoryProps {
  onOpenDetails: (vendorId: string) => void;
  onRequestQuote: (vendor: Vendor) => void;
}

export const VendorDirectory: React.FC<VendorDirectoryProps> = ({
  onOpenDetails,
  onRequestQuote,
}) => {
  const {
    vendors,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    selectedLocality,
    setSelectedLocality,
    cities,
    searchQuery,
    setSearchQuery,
    language,
  } = useApp();

  const t = translations[language];

  // Filters State
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'popular'>('rating');
  const [maxBudget, setMaxBudget] = useState<number>(300000);

  const currentCityObj = cities.find(c => c.name === selectedCity) || cities[0];

  // Filtered and Sorted Vendors
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      // Must not be rejected / suspended
      if (v.verificationStatus === 'rejected') return false;

      // Category filter
      if (selectedCategory !== 'all' && v.categoryId !== selectedCategory) {
        return false;
      }

      // City filter
      if (selectedCity && v.city !== selectedCity) {
        return false;
      }

      // Locality filter
      if (selectedLocality && selectedLocality !== 'All Localities' && v.locality !== selectedLocality) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.businessName.toLowerCase().includes(q);
        const matchesDesc = v.description.toLowerCase().includes(q);
        const matchesCat = v.categoryName.toLowerCase().includes(q);
        const matchesLoc = v.locality.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesLoc) return false;
      }

      // Rating filter
      if (minRating > 0 && v.rating < minRating) return false;

      // Verified filter
      if (verifiedOnly && !v.verified) return false;

      // Budget filter
      if (v.startingPrice > maxBudget) return false;

      return true;
    }).sort((a, b) => {
      // Sponsored vendors float gracefully to top in relevance, but don't break strict sorts
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'price_asc') {
        return a.startingPrice - b.startingPrice;
      } else if (sortBy === 'price_desc') {
        return b.startingPrice - a.startingPrice;
      } else if (sortBy === 'popular') {
        return b.completedBookingsCount - a.completedBookingsCount;
      }
      return 0;
    });
  }, [vendors, selectedCategory, selectedCity, selectedLocality, searchQuery, minRating, verifiedOnly, maxBudget, sortBy]);

  const activeCategoryObj = categories.find(c => c.id === selectedCategory);

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="flex items-center gap-1 font-medium text-[#6E1428]">
                <MapPin className="w-3.5 h-3.5" />
                {selectedCity}, UP
              </span>
              <span>·</span>
              <span>
                {selectedLocality === 'All Localities' ? 'All Areas' : selectedLocality}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {activeCategoryObj
                ? language === 'en'
                  ? activeCategoryObj.name
                  : activeCategoryObj.nameHi
                : language === 'en'
                ? 'All Wedding Vendors'
                : 'सभी विवाह सेवा वेंडर्स'}
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Showing {filteredVendors.length} verified listings in {selectedCity}
            </p>
          </div>

          {/* Quick Active Filter Chips & Reset */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded hover:bg-stone-300 transition-colors cursor-pointer"
              >
                <span>Category: {activeCategoryObj?.name}</span>
                <X className="w-3 h-3" />
              </button>
            )}

            {selectedLocality !== 'All Localities' && (
              <button
                onClick={() => setSelectedLocality('All Localities')}
                className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded hover:bg-stone-300 transition-colors cursor-pointer"
              >
                <span>Area: {selectedLocality}</span>
                <X className="w-3 h-3" />
              </button>
            )}

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-1 text-xs bg-stone-200 text-stone-800 px-2.5 py-1 rounded hover:bg-stone-300 transition-colors cursor-pointer"
              >
                <span>Search: "{searchQuery}"</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center text-xs">
            {/* Category Select */}
            <div>
              <label className="block text-stone-500 font-medium mb-1">Service Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
              >
                <option value="all">All 18 Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality Select */}
            <div>
              <label className="block text-stone-500 font-medium mb-1">Locality in {selectedCity}</label>
              <select
                value={selectedLocality}
                onChange={e => setSelectedLocality(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
              >
                {currentCityObj.localities.map(loc => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-center sm:justify-start gap-2 pt-4 sm:pt-0">
              <input
                type="checkbox"
                id="verified-only"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-[#6E1428] rounded border-stone-300 focus:ring-[#6E1428] cursor-pointer"
              >
              </input>
              <label htmlFor="verified-only" className="text-stone-700 cursor-pointer font-medium">
                Verified Partners Only
              </label>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-stone-500 font-medium mb-1">Customer Rating</label>
              <select
                value={minRating}
                onChange={e => setMinRating(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5 ★ & Above</option>
                <option value={4.8}>4.8 ★ & Above</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-stone-500 font-medium mb-1 flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3" />
                <span>Sort Results</span>
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
              >
                <option value="rating">Top Rated (Highest First)</option>
                <option value="popular">Most Bookings / Experience</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onOpenDetails={onOpenDetails}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-lg border border-stone-200 max-w-lg mx-auto">
            <h3 className="font-serif text-lg font-bold text-stone-800 mb-2">
              {t.noVendorsFound}
            </h3>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              {t.tryDifferentLocation}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLocality('All Localities');
                setMinRating(0);
                setVerifiedOnly(false);
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#6E1428] text-white text-xs font-medium rounded hover:bg-[#560F1E] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
