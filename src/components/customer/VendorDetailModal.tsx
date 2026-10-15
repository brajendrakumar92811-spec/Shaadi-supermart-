import React, { useState } from 'react';
import { Vendor } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { VisualFallback } from '../common/VisualFallback';
import {
  X,
  Star,
  CheckCircle,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Shield,
  Heart,
  FileText,
  Send,
  AlertCircle,
} from 'lucide-react';

interface VendorDetailModalProps {
  vendorId: string;
  onClose: () => void;
  initialTab?: 'overview' | 'packages' | 'portfolio' | 'reviews' | 'quote';
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendorId,
  onClose,
  initialTab = 'overview',
}) => {
  const {
    vendors,
    submitEnquiry,
    favourites,
    toggleFavourite,
    weddingDateFilter,
    language,
    setActiveCustomerTab,
  } = useApp();

  const vendor = vendors.find(v => v.id === vendorId);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'portfolio' | 'reviews' | 'quote'>(
    initialTab
  );

  // Quote Form State
  const [customerName, setCustomerName] = useState('Pooja Sharma & Rahul Verma');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [weddingDate, setWeddingDate] = useState(weddingDateFilter || '2026-11-25');
  const [venueAddress, setVenueAddress] = useState('Rajarshi Palace, Civil Lines, Etawah');
  const [guestCount, setGuestCount] = useState<number>(500);
  const [budgetEstimate, setBudgetEstimate] = useState<number>(vendor?.startingPrice ? vendor.startingPrice * 1.5 : 50000);
  const [requirements, setRequirements] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!vendor) return null;

  const isFav = favourites.includes(vendor.id);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !weddingDate) return;

    submitEnquiry({
      customerId: 'cust-1',
      customerName,
      customerPhone,
      customerEmail: 'pooja.verma.wed@gmail.com',
      vendorId: vendor.id,
      vendorName: vendor.businessName,
      weddingDate,
      venueAddress,
      locality: vendor.locality,
      city: vendor.city,
      guestCount,
      budgetEstimate,
      requirements: requirements || `Interested in packages for wedding on ${weddingDate} at ${venueAddress}.`,
    });

    setSubmittedSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-stone-200">
        {/* Header Modal Bar */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
              {vendor.businessName}
            </h2>
            {vendor.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavourite(vendor.id)}
              aria-label={isFav ? 'Remove from favourites' : 'Save to favourites'}
              className="p-2 text-stone-600 hover:text-rose-600 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-5 border-b border-stone-200 bg-stone-50 flex items-center gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#6E1428] text-[#6E1428] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Overview & Details
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'packages'
                ? 'border-[#6E1428] text-[#6E1428] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Packages ({vendor.packages.length})
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'border-[#6E1428] text-[#6E1428] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#6E1428] text-[#6E1428] font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            Reviews ({vendor.reviewCount})
          </button>
          <button
            onClick={() => setActiveTab('quote')}
            className={`py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ml-auto ${
              activeTab === 'quote'
                ? 'border-[#6E1428] text-[#6E1428] font-bold bg-rose-50/50'
                : 'border-transparent text-[#6E1428] font-semibold hover:bg-rose-50/30'
            }`}
          >
            Request Quotation
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Visual Banner */}
              <VisualFallback
                type={vendor.bannerImage || vendor.categoryId}
                title={vendor.businessName}
                aspect="16:9"
              />

              {/* Key Fast Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-3.5 rounded-lg border border-stone-200/80 text-xs">
                <div>
                  <span className="text-stone-500 block">Rating</span>
                  <div className="flex items-center gap-1 font-bold text-stone-900 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{vendor.rating.toFixed(1)} / 5</span>
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 block">Experience</span>
                  <span className="font-bold text-stone-900 mt-0.5 block">
                    {vendor.yearsOfExperience} Years
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Operating Area</span>
                  <span className="font-bold text-stone-900 mt-0.5 block">
                    {vendor.locality}, {vendor.serviceRadiusKm} km radius
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Starting At</span>
                  <span className="font-bold text-[#6E1428] mt-0.5 block tabular-nums">
                    {formatINR(vendor.startingPrice)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900 mb-2">About the Business</h3>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  {vendor.description}
                </p>
              </div>

              {/* Contact and Location */}
              <div className="border-t border-stone-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-semibold text-stone-800 mb-2">Location & Address</h4>
                  <div className="space-y-1.5 text-stone-600">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                      <span>{vendor.address}, PIN {vendor.pinCode}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Verified physical presence in {vendor.city}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-stone-800 mb-2">Advance & Cancellation Terms</h4>
                  <div className="space-y-1 text-stone-600">
                    <p>Advance booking token: <strong className="text-stone-800">{vendor.advancePercentage}%</strong></p>
                    <p className="text-stone-500 italic">{vendor.cancellationPolicy}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('quote')}
                  className="w-full py-2.5 bg-[#6E1428] hover:bg-[#560F1E] text-white font-medium text-sm rounded shadow-sm transition-colors text-center cursor-pointer"
                >
                  Request Official Quotation for Your Wedding Date →
                </button>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-500 mb-2">
                Select a package to request a customized quotation for your wedding dates:
              </div>

              {vendor.packages.map(pkg => (
                <div
                  key={pkg.id}
                  className="p-4 rounded-lg border border-stone-200 bg-stone-50/50 hover:border-[#6E1428] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900">{pkg.name}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{pkg.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-stone-900 tabular-nums">
                        {formatINR(pkg.price)}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {pkg.advancePercentage}% Advance required
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-200/80">
                    <span className="text-[11px] font-semibold text-stone-700 uppercase tracking-wider block mb-1.5">
                      Package Inclusions:
                    </span>
                    <ul className="space-y-1 text-xs text-stone-600">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setBudgetEstimate(pkg.price);
                        setRequirements(`Requesting package: ${pkg.name}`);
                        setActiveTab('quote');
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium text-[#6E1428] bg-rose-50 hover:bg-rose-100 rounded border border-rose-200 transition-colors cursor-pointer"
                    >
                      Inquire for this Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vendor.portfolio && vendor.portfolio.length > 0 ? (
                  vendor.portfolio.map(item => (
                    <div key={item.id} className="rounded-lg border border-stone-200 overflow-hidden bg-stone-50">
                      <VisualFallback type={vendor.categoryId} title={item.title} aspect="4:3" />
                      <div className="p-2.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-stone-800">{item.title}</span>
                        <span className="text-stone-500 text-[11px]">{item.tag}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-8 text-center text-xs text-stone-500">
                    Portfolio showcase is being refreshed by the vendor studio.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold font-serif text-stone-900 flex items-center gap-1.5">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                    <span>{vendor.rating.toFixed(1)}</span>
                    <span className="text-xs font-normal text-stone-500">out of 5.0</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Based on {vendor.reviewCount} verified client bookings in Etawah district.
                  </p>
                </div>
                <div className="text-xs text-right text-stone-500">
                  <span className="block font-semibold text-emerald-700">100% Genuine Reviews</span>
                  <span>Restricted to completed bookings</span>
                </div>
              </div>

              {/* Sample Verified Reviews */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-lg border border-stone-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-800">Anjali & Vivek Dixit</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
                        Verified Booking
                      </span>
                    </div>
                    <span className="text-stone-400 text-[11px]">May 2026</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    "Wonderful experience for our wedding ceremony in Pakka Talab. The team was punctual, highly respectful of rituals, and delivered exceptional quality within budget."
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-stone-200 bg-white">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-800">Suresh Chandra Sharma</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
                        Verified Booking
                      </span>
                    </div>
                    <span className="text-stone-400 text-[11px]">Feb 2026</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    "Very cooperative staff and transparent pricing. No sudden extra demands on the wedding day. Highly recommended in Etawah."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quote' && (
            <div>
              {submittedSuccess ? (
                <div className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">
                    Enquiry Sent Successfully!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Your enquiry has been delivered directly to <strong>{vendor.businessName}</strong>. You will receive an itemized quotation with availability details in your dashboard.
                  </p>
                  <div className="pt-3 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        setActiveCustomerTab('account');
                      }}
                      className="px-4 py-2 bg-[#6E1428] text-white text-xs font-medium rounded hover:bg-[#560F1E] transition-colors cursor-pointer"
                    >
                      View My Enquiries & Quotes
                    </button>
                    <button
                      onClick={() => setSubmittedSuccess(false)}
                      className="px-4 py-2 border border-stone-300 text-xs font-medium rounded hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded text-stone-800 mb-3">
                    <span className="font-semibold block text-[#6E1428] mb-0.5">
                      Request Quotation from {vendor.businessName}
                    </span>
                    Direct communication with verified local vendor. No booking commitment required until quotation is approved.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Your Name / Couple Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        WhatsApp / Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        placeholder="10-digit Indian Mobile"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Wedding Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={weddingDate}
                        onChange={e => setWeddingDate(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Approx Guest Count
                      </label>
                      <input
                        type="number"
                        min="50"
                        max="5000"
                        value={guestCount}
                        onChange={e => setGuestCount(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Estimated Budget (₹)
                      </label>
                      <input
                        type="number"
                        step="1000"
                        value={budgetEstimate}
                        onChange={e => setBudgetEstimate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Venue Address / Locality in {vendor.city}
                    </label>
                    <input
                      type="text"
                      value={venueAddress}
                      onChange={e => setVenueAddress(e.target.value)}
                      placeholder="e.g. Rajarshi Palace, Civil Lines, Etawah"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Specific Requirements & Event Timings
                    </label>
                    <textarea
                      rows={3}
                      value={requirements}
                      onChange={e => setRequirements(e.target.value)}
                      placeholder="e.g. 2-day coverage, drone aerial required for Varmala, pure vegetarian live counters..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#6E1428] hover:bg-[#560F1E] text-white font-medium text-sm rounded shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry & Request Quotation</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
