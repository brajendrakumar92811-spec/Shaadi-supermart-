import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { translations } from '../../utils/translations';
import { MapPin, Globe, ChevronDown, User, Shield, Briefcase, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    userRole,
    setUserRole,
    language,
    setLanguage,
    selectedCity,
    setSelectedCity,
    cities,
    activeCustomerTab,
    setActiveCustomerTab,
    favourites,
  } = useApp();

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9] border-b border-[#E8DEC8] shadow-xs">
      {/* Top Utility Announcement & City Strip */}
      <div className="bg-[#5C1322] text-[#F9EBD2] text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#E5C378] font-semibold">★ Etawah Launch:</span>
          <span className="hidden sm:inline">Connecting families with verified local wedding vendors across Uttar Pradesh</span>
          <span className="sm:hidden">Verified wedding vendors in Etawah</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 text-[#F9EBD2] hover:text-white transition-colors cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#E5C378]" />
            <span className="font-medium">{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Role Preview Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#420E19] hover:bg-[#340A13] px-2.5 py-0.5 rounded text-[#E5C378] font-medium border border-[#852538] cursor-pointer transition-colors"
            >
              {userRole === 'admin' ? (
                <Shield className="w-3 h-3 text-[#E5C378]" />
              ) : userRole === 'vendor' ? (
                <Briefcase className="w-3 h-3 text-[#E5C378]" />
              ) : (
                <User className="w-3 h-3 text-[#E5C378]" />
              )}
              <span className="capitalize">{userRole} View</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-stone-200 shadow-xl rounded-md py-1 z-50 text-stone-800">
                <div className="px-3 py-1 text-[11px] font-semibold text-stone-500 uppercase border-b border-stone-100">
                  Select User Interface
                </div>
                <button
                  onClick={() => {
                    setUserRole('customer');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                    userRole === 'customer' ? 'font-bold text-[#72162A] bg-rose-50/50' : ''
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-stone-500" />
                  <span>Customer App (Pooja & Rahul)</span>
                </button>
                <button
                  onClick={() => {
                    setUserRole('vendor');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                    userRole === 'vendor' ? 'font-bold text-[#72162A] bg-rose-50/50' : ''
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                  <span>Vendor Dashboard (Partner)</span>
                </button>
                <button
                  onClick={() => {
                    setUserRole('admin');
                    setRoleDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                    userRole === 'admin' ? 'font-bold text-[#72162A] bg-rose-50/50' : ''
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-stone-500" />
                  <span>Super Admin Dashboard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveCustomerTab('home')}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#6E1428] group-hover:text-[#520E1E] transition-colors whitespace-nowrap">
              Shaadi Supermart
            </span>
          </button>

          {/* Quick City Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1.5 rounded border border-stone-200 cursor-pointer transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#6E1428]" />
              <span className="font-medium">{selectedCity}, UP</span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-44 bg-white border border-stone-200 shadow-lg rounded-md py-1 z-50 text-xs">
                <div className="px-3 py-1 font-semibold text-stone-500 text-[10px] uppercase">
                  Service Cities
                </div>
                {cities.map(city => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-rose-50 ${
                      selectedCity === city.name ? 'text-[#6E1428] font-bold bg-rose-50/60' : 'text-stone-700'
                    }`}
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-stone-500">
                      {city.name === 'Etawah' ? 'Live' : 'Expanding'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-700">
          <button
            onClick={() => setActiveCustomerTab('directory')}
            className={`whitespace-nowrap transition-colors cursor-pointer hover:text-[#6E1428] ${
              activeCustomerTab === 'directory' ? 'text-[#6E1428] font-semibold' : ''
            }`}
          >
            {language === 'en' ? 'Browse Vendors' : 'वेंडर्स खोजें'}
          </button>
          <button
            onClick={() => {
              setActiveCustomerTab('home');
              const el = document.getElementById('categories-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="whitespace-nowrap transition-colors cursor-pointer hover:text-[#6E1428]"
          >
            {language === 'en' ? 'Categories' : 'सेवा श्रेणियाँ'}
          </button>
          <button
            onClick={() => setActiveCustomerTab('budget')}
            className={`whitespace-nowrap transition-colors cursor-pointer hover:text-[#6E1428] ${
              activeCustomerTab === 'budget' ? 'text-[#6E1428] font-semibold' : ''
            }`}
          >
            {language === 'en' ? 'Budget Planner' : 'बजट प्लानर'}
          </button>
          <button
            onClick={() => setActiveCustomerTab('checklist')}
            className={`whitespace-nowrap transition-colors cursor-pointer hover:text-[#6E1428] ${
              activeCustomerTab === 'checklist' ? 'text-[#6E1428] font-semibold' : ''
            }`}
          >
            {language === 'en' ? 'Checklist' : 'तैयारी चेकलिस्ट'}
          </button>
          <button
            onClick={() => setActiveCustomerTab('account')}
            className={`whitespace-nowrap transition-colors cursor-pointer hover:text-[#6E1428] ${
              activeCustomerTab === 'account' ? 'text-[#6E1428] font-semibold' : ''
            }`}
          >
            {language === 'en' ? 'My Bookings' : 'मेरी बुकिंग्स'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveCustomerTab('directory')}
            className="relative p-2 text-stone-600 hover:text-[#6E1428] transition-colors cursor-pointer"
            title="Saved Vendors"
          >
            <Heart className="w-5 h-5" />
            {favourites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#6E1428] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favourites.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              if (userRole === 'customer') {
                setUserRole('vendor');
              } else {
                setActiveCustomerTab('directory');
              }
            }}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#6E1428] hover:bg-[#560F1E] rounded shadow-xs transition-colors whitespace-nowrap cursor-pointer border border-[#560F1E]"
          >
            {userRole === 'vendor'
              ? 'Partner Panel'
              : userRole === 'admin'
              ? 'Admin Panel'
              : t.registerAsVendor}
          </button>
        </div>
      </div>

      {/* Mobile Top Sub-bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-stone-100/90 border-t border-stone-200 text-xs">
        <button
          onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
          className="flex items-center gap-1 font-medium text-stone-700"
        >
          <MapPin className="w-3.5 h-3.5 text-[#6E1428]" />
          <span>{selectedCity}, UP</span>
          <ChevronDown className="w-3 h-3 text-stone-500" />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveCustomerTab('directory')}
            className={`font-medium ${activeCustomerTab === 'directory' ? 'text-[#6E1428]' : 'text-stone-600'}`}
          >
            Vendors
          </button>
          <button
            onClick={() => setActiveCustomerTab('budget')}
            className={`font-medium ${activeCustomerTab === 'budget' ? 'text-[#6E1428]' : 'text-stone-600'}`}
          >
            Budget
          </button>
          <button
            onClick={() => setActiveCustomerTab('account')}
            className={`font-medium ${activeCustomerTab === 'account' ? 'text-[#6E1428]' : 'text-stone-600'}`}
          >
            Bookings
          </button>
        </div>
      </div>
    </header>
  );
};
