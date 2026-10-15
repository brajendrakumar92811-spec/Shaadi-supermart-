import React from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { Search, MapPin, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const {
    language,
    selectedCity,
    selectedLocality,
    setSelectedLocality,
    searchQuery,
    setSearchQuery,
    weddingDateFilter,
    setWeddingDateFilter,
    cities,
    setActiveCustomerTab,
    setSelectedCategory,
  } = useApp();

  const t = translations[language];

  const currentCityObj = cities.find(c => c.name === selectedCity) || cities[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveCustomerTab('directory');
  };

  return (
    <section className="relative bg-[#380E17] text-white overflow-hidden py-12 md:py-20 border-b border-[#5C1625]">
      {/* Background Indian Wedding Arch Motif */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#851E34] rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5A1221] rounded-full filter blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#5A1423] border border-[#7D1D32] text-[#F3D797] text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>
              {language === 'en'
                ? 'Etawah’s Premier Wedding Services Marketplace'
                : 'इटावा का विश्वसनीय विवाह सेवा बाज़ार'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#FFFDF9] mb-4 text-balance">
            {language === 'en' ? (
              <>Plan Your Perfect Wedding with <span className="text-[#E5C378]">Shaadi Supermart</span></>
            ) : (
              <>शादी की सम्पूर्ण तैयारी, <span className="text-[#E5C378]">शादी सुपरमार्ट</span> के संग</>
            )}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed text-balance max-w-2xl mx-auto">
            {language === 'en'
              ? 'Find and compare verified wedding photographers, marriage lawns, caterers, DJs, bridal makeup artists, and decorators in Etawah and across Uttar Pradesh.'
              : 'इटावा और आसपास के सबसे बेहतरीन व सत्यापित फोटोग्राफर्स, बारात घर, हलवाई, डीजे और डेकोरेटर्स से सीधे कोटेशन पाएं।'}
          </p>
        </div>

        {/* Central Search Form Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-3 sm:p-4 text-stone-900 border border-[#E8DEC8]">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Search Service / Vendor' : 'सेवा या वेंडर खोजें'}
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. Royal Shutterbug, Caterers, Lawn' : 'जैसे: फोटोग्राफर, बारात घर...'}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428] text-stone-800"
                />
              </div>
            </div>

            {/* Locality Selector */}
            <div className="md:col-span-3">
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Locality' : 'इलाका'} ({selectedCity})
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
                <select
                  value={selectedLocality}
                  onChange={e => setSelectedLocality(e.target.value)}
                  aria-label={language === 'en' ? 'Select Locality' : 'इलाका चुनें'}
                  className="w-full pl-9 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428] text-stone-800 appearance-none cursor-pointer"
                >
                  {currentCityObj.localities.map(loc => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wedding Date Selector */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                {t.weddingDate}
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-2.5 pointer-events-none" />
                <input
                  type="date"
                  value={weddingDateFilter}
                  onChange={e => setWeddingDateFilter(e.target.value)}
                  aria-label={t.weddingDate}
                  className="w-full pl-8 pr-2 py-2 text-xs bg-stone-50 border border-stone-200 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428] text-stone-800"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                className="w-full mt-2 md:mt-0 py-2.5 px-4 bg-[#6E1428] hover:bg-[#560F1E] text-white font-medium text-sm rounded shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{language === 'en' ? 'Find' : 'खोजें'}</span>
              </button>
            </div>
          </form>

          {/* Quick Filters Under Search */}
          <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-400">{language === 'en' ? 'Popular in Etawah:' : 'लोकप्रिय:'}</span>
              <button
                onClick={() => {
                  setSelectedCategory('photography');
                  setActiveCustomerTab('directory');
                }}
                className="hover:text-[#6E1428] underline underline-offset-2 cursor-pointer font-medium"
              >
                Photographers
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSelectedCategory('venues');
                  setActiveCustomerTab('directory');
                }}
                className="hover:text-[#6E1428] underline underline-offset-2 cursor-pointer font-medium"
              >
                Marriage Lawns
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSelectedCategory('catering');
                  setActiveCustomerTab('directory');
                }}
                className="hover:text-[#6E1428] underline underline-offset-2 cursor-pointer font-medium"
              >
                Halwai & Caterers
              </button>
              <span>·</span>
              <button
                onClick={() => {
                  setSelectedCategory('makeup');
                  setActiveCustomerTab('directory');
                }}
                className="hover:text-[#6E1428] underline underline-offset-2 cursor-pointer font-medium"
              >
                Bridal Makeup
              </button>
            </div>

            <div className="flex items-center gap-3 text-stone-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Vendors</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6E1428]" />
                <span>Zero Hidden Fees</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
