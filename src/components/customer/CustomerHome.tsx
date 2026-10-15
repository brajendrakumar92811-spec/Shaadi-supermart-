import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeroSection } from './HeroSection';
import { CategoryGrid } from './CategoryGrid';
import { VendorCard } from './VendorCard';
import { formatINR } from '../../utils/formatters';
import { translations } from '../../utils/translations';
import { AIAssistantModal } from '../common/AIAssistantModal';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Wallet,
  CalendarCheck,
  CheckCircle,
  Star,
  Clock,
  HeartHandshake,
} from 'lucide-react';

interface CustomerHomeProps {
  onOpenDetails: (vendorId: string) => void;
  onRequestQuote: (vendor: any) => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onOpenDetails,
  onRequestQuote,
}) => {
  const {
    vendors,
    advertisements,
    recordAdClick,
    setActiveCustomerTab,
    setSelectedCategory,
    language,
    selectedCity,
  } = useApp();

  const [showAiModal, setShowAiModal] = useState(false);
  const t = translations[language];

  const featuredVendors = vendors.filter(v => v.isFeatured && v.verificationStatus === 'verified').slice(0, 3);
  const sponsoredAds = advertisements.filter(a => a.active);

  return (
    <div className="bg-[#FAF8F5]">
      {/* 1. Hero Section with Search Form */}
      <HeroSection />

      {/* 2. Wedding Categories Grid */}
      <CategoryGrid />

      {/* 3. Featured & Verified Vendors Section */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#8C2337] mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Handpicked Excellence</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                {language === 'en' ? 'Featured Vendors in ' + selectedCity : selectedCity + ' के लोकप्रिय वेंडर्स'}
              </h2>
            </div>

            <button
              onClick={() => setActiveCustomerTab('directory')}
              className="text-xs sm:text-sm font-semibold text-[#6E1428] hover:text-[#560F1E] flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'View all verified vendors' : 'सभी सत्यापित वेंडर्स देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onOpenDetails={onOpenDetails}
                onRequestQuote={onRequestQuote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Seasonal Promotions & Sponsored Campaigns */}
      {sponsoredAds.length > 0 && (
        <section className="py-10 bg-[#FAF2F4] border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded uppercase">
                {language === 'en' ? 'Sponsored Promotions' : 'विशेष प्रायोजित ऑफ़र'}
              </span>
              <span className="text-xs text-stone-500">
                Verified wedding partner packages
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sponsoredAds.map(ad => (
                <div
                  key={ad.id}
                  onClick={() => {
                    recordAdClick(ad.id);
                    if (ad.targetUrl) onOpenDetails(ad.targetUrl);
                  }}
                  className="bg-white rounded-lg p-5 border border-[#8C2337]/30 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-[#6E1428]">{ad.sponsorName}</span>
                      <span>Etawah District</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                      {ad.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {ad.tagline}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-400 text-[11px]">Limited time seasonal offer</span>
                    <span className="font-semibold text-[#6E1428] hover:underline flex items-center gap-1">
                      Check Availability →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Planning Tools Showcase (Budget & Checklist & AI Assistant) */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Complete Wedding Planning Suite
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Designed to help Indian families budget, schedule, and coordinate ceremonies stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tool 1: Budget Planner */}
            <div className="p-6 rounded-lg border border-stone-200 bg-[#FAF8F5] flex flex-col justify-between hover:border-[#6E1428] transition-colors">
              <div>
                <div className="w-12 h-12 rounded bg-white text-[#6E1428] border border-stone-200 flex items-center justify-center mb-4 shadow-2xs">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  Wedding Budget Calculator
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Allocate expenses for Haldi, Mehndi, Sangeet, Wedding & Reception. Track advances and balance dues without hidden costs.
                </p>
              </div>
              <button
                onClick={() => setActiveCustomerTab('budget')}
                className="py-2 px-3 text-xs font-semibold text-[#6E1428] bg-white border border-[#6E1428]/30 rounded hover:bg-rose-50/50 transition-colors cursor-pointer text-center"
              >
                Open Budget Planner →
              </button>
            </div>

            {/* Tool 2: Planning Checklist */}
            <div className="p-6 rounded-lg border border-stone-200 bg-[#FAF8F5] flex flex-col justify-between hover:border-[#6E1428] transition-colors">
              <div>
                <div className="w-12 h-12 rounded bg-white text-[#6E1428] border border-stone-200 flex items-center justify-center mb-4 shadow-2xs">
                  <CalendarCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  Timeline Milestone Checklist
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  A comprehensive milestone checklist from 12 months out to D-Day. Assign tasks to parents, siblings, and bridal party.
                </p>
              </div>
              <button
                onClick={() => setActiveCustomerTab('checklist')}
                className="py-2 px-3 text-xs font-semibold text-[#6E1428] bg-white border border-[#6E1428]/30 rounded hover:bg-rose-50/50 transition-colors cursor-pointer text-center"
              >
                Open Checklist Calendar →
              </button>
            </div>

            {/* Tool 3: AI Advisor */}
            <div className="p-6 rounded-lg border border-[#D4AF37] bg-[#FFFDF9] flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-12 h-12 rounded bg-[#FAF2F4] text-[#6E1428] border border-[#E8DEC8] flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  AI Wedding Advisor
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Input your wedding budget and guest count to receive an optimized spending distribution and service checklist for Etawah.
                </p>
              </div>
              <button
                onClick={() => setShowAiModal(true)}
                className="py-2 px-3 text-xs font-semibold text-white bg-[#6E1428] rounded hover:bg-[#560F1E] transition-colors cursor-pointer text-center"
              >
                Launch AI Planner →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Why Shaadi Supermart in Etawah Trust Banner */}
      <section className="py-12 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Why Families Trust Shaadi Supermart
              </h2>
              <p className="text-xs text-stone-600">
                Building India's most honest, location-grounded wedding services platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">100% Verified Local Shops</h4>
                  <p className="text-stone-600 leading-relaxed">
                    We personally verify physical shops, past events, and phone numbers in Etawah and Auraiya before granting the verified partner badge.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-[#6E1428] flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Direct Vendor Pricing</h4>
                  <p className="text-stone-600 leading-relaxed">
                    No middlemen markup on your quotations. You deal directly with the photographers, halwais, and decorators with itemized transparency.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">Guaranteed Booking Safety</h4>
                  <p className="text-stone-600 leading-relaxed">
                    Tokens are recorded with legitimate reference codes and downloadable receipts to ensure committed dates are protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Advisor Modal */}
      {showAiModal && <AIAssistantModal onClose={() => setShowAiModal(false)} />}
    </div>
  );
};
