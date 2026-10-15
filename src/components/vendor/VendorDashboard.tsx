import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { ServicePackage, Enquiry, QuotationItem } from '../../types';
import {
  TrendingUp,
  Inbox,
  FileCheck,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Send,
  Sparkles,
  Users,
  Settings,
} from 'lucide-react';

export const VendorDashboard: React.FC = () => {
  const {
    vendors,
    enquiries,
    quotations,
    bookings,
    createQuotation,
    registerVendor,
    updateVendorServices,
    categories,
    selectedCity,
    language,
  } = useApp();

  // Active vendor profile (we pick 'vendor-1' Royal Shutterbug or active user vendor)
  const currentVendor = vendors.find(v => v.id === 'vendor-1') || vendors[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'packages' | 'subscription' | 'register'>('overview');

  // Quotation Builder Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [quoteItems, setQuoteItems] = useState<QuotationItem[]>([
    { name: 'Core Wedding Ceremony Photography & 4K Video', cost: 65000, notes: '2 Candid + 2 Traditional' },
    { name: 'Drone Aerial Varmala Coverage', cost: 10000, notes: 'DJI Mavic 3 Cine' },
  ]);
  const [advanceRequired, setAdvanceRequired] = useState(25000);
  const [validUntil, setValidUntil] = useState('2026-10-31');
  const [quoteNote, setQuoteNote] = useState('Special seasonal discount applied for early confirmation.');

  // New Vendor Registration State (Section 5.A)
  const [regBizName, setRegBizName] = useState('');
  const [regOwnerName, setRegOwnerName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCategory, setRegCategory] = useState('photography');
  const [regLocality, setRegLocality] = useState('Civil Lines');
  const [regStartingPrice, setRegStartingPrice] = useState(25000);
  const [regDesc, setRegDesc] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // New Package Creation State (Section 5.D)
  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState<number>(35000);
  const [newPkgDesc, setNewPkgDesc] = useState('');
  const [newPkgInclusions, setNewPkgInclusions] = useState('Complete day coverage, high-res photos');

  // Filter vendor specific data
  const myEnquiries = enquiries.filter(e => e.vendorId === currentVendor.id);
  const myQuotations = quotations.filter(q => q.vendorId === currentVendor.id);
  const myBookings = bookings.filter(b => b.vendorId === currentVendor.id);

  // KPI Calculations
  const totalRevenue = myBookings.reduce((sum, b) => sum + (b.advancePaid || 0), 0);
  const pendingBalance = myBookings.reduce((sum, b) => sum + (b.balanceAmount || 0), 0);
  const conversionRate = myEnquiries.length > 0 ? Math.round((myBookings.length / myEnquiries.length) * 100) : 0;

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    const total = quoteItems.reduce((acc, item) => acc + item.cost, 0);

    createQuotation({
      enquiryId: selectedEnquiry.id,
      vendorId: currentVendor.id,
      vendorName: currentVendor.businessName,
      customerId: selectedEnquiry.customerId,
      customerName: selectedEnquiry.customerName,
      weddingDate: selectedEnquiry.weddingDate,
      items: quoteItems,
      totalAmount: total,
      advanceRequired,
      validUntil,
      note: quoteNote,
    });

    setSelectedEnquiry(null);
  };

  const handleRegisterVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regBizName || !regPhone) return;

    registerVendor({
      businessName: regBizName,
      ownerName: regOwnerName,
      phone: regPhone,
      categoryId: regCategory,
      city: 'Etawah',
      locality: regLocality,
      startingPrice: Number(regStartingPrice),
      description: regDesc || 'Professional wedding service provider in Etawah district.',
    });

    setRegSuccess(true);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgName || !newPkgPrice) return;

    const newPkg: ServicePackage = {
      id: `pkg-${Date.now()}`,
      name: newPkgName,
      price: Number(newPkgPrice),
      description: newPkgDesc,
      inclusions: newPkgInclusions.split(',').map(s => s.trim()),
      advancePercentage: 25,
    };

    updateVendorServices(currentVendor.id, [...currentVendor.packages, newPkg]);
    setNewPkgName('');
    setNewPkgPrice(35000);
    setNewPkgDesc('');
    setNewPkgInclusions('');
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vendor Header Strip */}
        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#5C1322] text-[#E5C378] flex items-center justify-center font-serif text-xl font-bold">
              {currentVendor.businessName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-stone-900">
                  {currentVendor.businessName}
                </h1>
                {currentVendor.verified ? (
                  <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Partner
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Verification Pending Admin Approval
                  </span>
                )}
              </div>
              <div className="text-xs text-stone-500 mt-1">
                <span>{currentVendor.categoryName}</span>
                <span> · </span>
                <span>{currentVendor.locality}, {currentVendor.city}</span>
                <span> · </span>
                <span>Owner: {currentVendor.ownerName} ({currentVendor.phone})</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('register')}
              className="px-3 py-1.5 border border-stone-300 rounded hover:bg-stone-50 font-medium text-stone-700 cursor-pointer"
            >
              + Register New Business
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className="px-3.5 py-1.5 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>Partner Tier: Silver</span>
            </button>
          </div>
        </div>

        {/* Verification Status Warning if Pending */}
        {!currentVendor.verified && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-950 mb-0.5">
                Business Profile Pending Verification
              </span>
              Your business was submitted for verification in Etawah district. Our team verifies physical shop presence and phone authenticity before awarding the verified badge. You can still manage services, respond to enquiries, and prepare packages.
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 mb-6 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'enquiries'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Customer Enquiries ({myEnquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Manage Services & Packages ({currentVendor.packages.length})
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'subscription'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Subscription & Monetization
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'register'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Add New Vendor
          </button>
        </div>

        {/* Tab 1: Dashboard Overview KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>Total Enquiries</span>
                  <Inbox className="w-4 h-4 text-[#6E1428]" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {myEnquiries.length}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">From Etawah families</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>Quotations Sent</span>
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {myQuotations.length}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">Active proposal offers</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>Confirmed Bookings</span>
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {myBookings.length}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">Conversion: {conversionRate}%</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>Recorded Advances</span>
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-serif font-bold text-emerald-800 tabular-nums">
                  {formatINR(totalRevenue)}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Pending balance: {formatINR(pendingBalance)}
                </span>
              </div>
            </div>

            {/* Recent Incoming Enquiries Quick Panel */}
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Recent Customer Inquiries
                </h3>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs text-[#6E1428] font-semibold hover:underline cursor-pointer"
                >
                  View All Enquiries →
                </button>
              </div>

              {myEnquiries.length > 0 ? (
                <div className="divide-y divide-stone-100 text-xs">
                  {myEnquiries.slice(0, 3).map(enq => (
                    <div key={enq.id} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-stone-900">{enq.customerName}</div>
                        <div className="text-stone-500 text-[11px] mt-0.5">
                          Wedding Date: <strong>{enq.weddingDate}</strong> · Venue: {enq.venueAddress}
                        </div>
                        <p className="text-stone-600 mt-1 italic">"{enq.requirements}"</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 block mb-2 capitalize">
                          {enq.status.replace('_', ' ')}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setActiveTab('enquiries');
                          }}
                          className="px-3 py-1.5 bg-[#6E1428] text-white text-xs font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                        >
                          Send Quotation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-stone-500">
                  No pending customer enquiries right now.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Enquiries & Quotation Maker */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            {/* Quotation Builder Modal */}
            {selectedEnquiry && (
              <div className="bg-white p-5 rounded-lg border-2 border-[#6E1428] shadow-lg mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      Create & Send Quotation for {selectedEnquiry.customerName}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Event Date: {selectedEnquiry.weddingDate} · Venue: {selectedEnquiry.venueAddress} · Budget: {formatINR(selectedEnquiry.budgetEstimate)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSendQuote} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-2">
                      Itemized Quotation Lines
                    </label>
                    <div className="space-y-2">
                      {quoteItems.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <input
                            type="text"
                            required
                            value={item.name}
                            onChange={e => {
                              const updated = [...quoteItems];
                              updated[idx].name = e.target.value;
                              setQuoteItems(updated);
                            }}
                            placeholder="Service line name"
                            className="flex-1 px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                          />
                          <input
                            type="number"
                            required
                            value={item.cost}
                            onChange={e => {
                              const updated = [...quoteItems];
                              updated[idx].cost = Number(e.target.value);
                              setQuoteItems(updated);
                            }}
                            placeholder="Cost"
                            className="w-28 px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded tabular-nums"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (quoteItems.length > 1) {
                                setQuoteItems(quoteItems.filter((_, i) => i !== idx));
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setQuoteItems([
                          ...quoteItems,
                          { name: 'Additional Service Item', cost: 5000, notes: '' },
                        ])
                      }
                      className="mt-2 text-xs text-[#6E1428] font-medium hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Line Item</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Advance Booking Token Required (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={advanceRequired}
                        onChange={e => setAdvanceRequired(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">
                        Quotation Valid Until
                      </label>
                      <input
                        type="date"
                        required
                        value={validUntil}
                        onChange={e => setValidUntil(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">
                      Special Note / Inclusions for Customer
                    </label>
                    <textarea
                      rows={2}
                      value={quoteNote}
                      onChange={e => setQuoteNote(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>

                  <div className="p-3 bg-stone-50 rounded flex justify-between items-center font-bold text-stone-900">
                    <span>
                      Total Quotation Value:
                    </span>
                    <span className="text-base text-[#6E1428] tabular-nums">
                      {formatINR(quoteItems.reduce((acc, i) => acc + i.cost, 0))}
                    </span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEnquiry(null)}
                      className="px-3.5 py-2 border border-stone-300 rounded text-stone-600 hover:bg-stone-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Official Quotation</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Enquiries List */}
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs divide-y divide-stone-100">
              {myEnquiries.map(enq => (
                <div key={enq.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-stone-900 text-sm">{enq.customerName}</span>
                      <span>·</span>
                      <span className="text-stone-500">Phone: {enq.customerPhone}</span>
                    </div>

                    <div className="text-xs text-stone-600">
                      Wedding Date: <strong className="text-stone-800">{enq.weddingDate}</strong> · Venue: {enq.venueAddress}
                    </div>

                    <p className="text-xs text-stone-700 italic bg-stone-50 p-2 rounded border border-stone-100 mt-2 max-w-2xl">
                      "{enq.requirements}"
                    </p>

                    <div className="text-[11px] text-stone-400 pt-1">
                      Requested budget: {formatINR(enq.budgetEstimate)} · Received: {formatDate(enq.createdAt)}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded capitalize ${
                        enq.status === 'quotation_sent'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : enq.status === 'accepted'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {enq.status.replace('_', ' ')}
                    </span>

                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="px-3.5 py-1.5 bg-[#6E1428] hover:bg-[#560F1E] text-white text-xs font-medium rounded transition-colors cursor-pointer"
                    >
                      {enq.status === 'quotation_sent' ? 'Revise Quote' : 'Create Quotation'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Manage Services & Packages */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Active Service Packages
              </h3>

              {currentVendor.packages.map(pkg => (
                <div key={pkg.id} className="p-4 bg-white rounded-lg border border-stone-200 shadow-xs">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900">{pkg.name}</h4>
                      <p className="text-xs text-stone-600 mt-0.5">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-bold text-stone-900 tabular-nums">
                        {formatINR(pkg.price)}
                      </span>
                      <span className="text-[11px] text-stone-400 block">{pkg.advancePercentage}% advance</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 text-xs">
                    <span className="font-semibold text-stone-700 block mb-1">Inclusions:</span>
                    <ul className="space-y-0.5 text-stone-600">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Package Box */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs h-fit">
              <h3 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#6E1428]" />
                <span>Add New Package</span>
              </h3>

              <form onSubmit={handleAddPackage} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={newPkgName}
                    onChange={e => setNewPkgName(e.target.value)}
                    placeholder="e.g. Royal Pre-Wedding & Drone Combo"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Package Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newPkgPrice}
                    onChange={e => setNewPkgPrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded tabular-nums"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Short Description</label>
                  <input
                    type="text"
                    value={newPkgDesc}
                    onChange={e => setNewPkgDesc(e.target.value)}
                    placeholder="e.g. 2-day complete celebration coverage"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">
                    Inclusions (Comma separated)
                  </label>
                  <textarea
                    rows={3}
                    value={newPkgInclusions}
                    onChange={e => setNewPkgInclusions(e.target.value)}
                    placeholder="e.g. 4K Drone shoot, 2 albums, Raw photo USB"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                >
                  Publish Package
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: Subscriptions & Monetization */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                Shaadi Supermart Partner Plans
              </h3>
              <p className="text-xs text-stone-600">
                Transparent vendor subscriptions to boost visibility in Etawah and across UP. Zero commission markups for customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Free Tier */}
              <div className="p-5 rounded-lg border border-stone-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Free Listing</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 my-2">₹0 / month</div>
                  <p className="text-xs text-stone-600 mb-4">Ideal for new and small wedding artists.</p>
                  <ul className="space-y-2 text-xs text-stone-600">
                    <li className="flex items-center gap-1.5">✓ Standard directory listing</li>
                    <li className="flex items-center gap-1.5">✓ Up to 5 customer enquiries/month</li>
                    <li className="flex items-center gap-1.5">✓ Verified badge after inspection</li>
                  </ul>
                </div>
                <button className="w-full mt-6 py-2 border border-stone-300 rounded text-xs font-medium text-stone-700">
                  Current Free Plan
                </button>
              </div>

              {/* Silver Partner */}
              <div className="p-5 rounded-lg border-2 border-[#6E1428] bg-white relative flex flex-col justify-between shadow-md">
                <div className="absolute -top-3 right-4 bg-[#6E1428] text-[#E5C378] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Most Popular in Etawah
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#6E1428] uppercase tracking-wider">Silver Partner</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 my-2">₹1,499 / month</div>
                  <p className="text-xs text-stone-600 mb-4">For established wedding vendors with active booking schedules.</p>
                  <ul className="space-y-2 text-xs text-stone-700">
                    <li className="flex items-center gap-1.5 font-medium">✓ Unlimited customer enquiries</li>
                    <li className="flex items-center gap-1.5 font-medium">✓ Priority search ranking in Etawah</li>
                    <li className="flex items-center gap-1.5 font-medium">✓ Instant WhatsApp lead notifications</li>
                    <li className="flex items-center gap-1.5">✓ Online advance booking collection</li>
                  </ul>
                </div>
                <button className="w-full mt-6 py-2 bg-[#6E1428] text-white rounded text-xs font-medium hover:bg-[#560F1E] cursor-pointer">
                  Upgrade to Silver Partner
                </button>
              </div>

              {/* Royal Gold */}
              <div className="p-5 rounded-lg border border-stone-200 bg-white flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Royal Gold Sponsor</span>
                  <div className="text-2xl font-bold font-serif text-stone-900 my-2">₹3,999 / month</div>
                  <p className="text-xs text-stone-600 mb-4">Top-tier spotlight placement on homepage & categories.</p>
                  <ul className="space-y-2 text-xs text-stone-600">
                    <li className="flex items-center gap-1.5">✓ Homepage Featured Banner placement</li>
                    <li className="flex items-center gap-1.5">✓ First position in category searches</li>
                    <li className="flex items-center gap-1.5">✓ Dedicated relationship manager</li>
                    <li className="flex items-center gap-1.5">✓ Multi-district exposure (Auraiya & Kanpur)</li>
                  </ul>
                </div>
                <button className="w-full mt-6 py-2 border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-50 cursor-pointer">
                  Request Gold Placement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Vendor Registration Flow */}
        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
            {regSuccess ? (
              <div className="text-center space-y-3 py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Vendor Application Submitted!
                </h3>
                <p className="text-xs text-stone-600">
                  Your business <strong>{regBizName}</strong> has been registered. The Super Admin will review your shop and phone details for verification.
                </p>
                <button
                  onClick={() => {
                    setRegSuccess(false);
                    setActiveTab('overview');
                  }}
                  className="px-4 py-2 bg-[#6E1428] text-white text-xs font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterVendorSubmit} className="space-y-4 text-xs">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="font-serif text-base font-bold text-stone-900">
                    Register a New Wedding Business in Etawah
                  </h3>
                  <p className="text-stone-500 text-[11px] mt-0.5">
                    Join Shaadi Supermart to receive verified wedding bookings from local families.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Business Name *</label>
                    <input
                      type="text"
                      required
                      value={regBizName}
                      onChange={e => setRegBizName(e.target.value)}
                      placeholder="e.g. Etawah Royal Band & Lights"
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Owner Name *</label>
                    <input
                      type="text"
                      required
                      value={regOwnerName}
                      onChange={e => setRegOwnerName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Service Category</label>
                    <select
                      value={regCategory}
                      onChange={e => setRegCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Locality in Etawah</label>
                    <select
                      value={regLocality}
                      onChange={e => setRegLocality(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                    >
                      <option>Civil Lines</option>
                      <option>Pakka Talab</option>
                      <option>Friends Colony</option>
                      <option>Ashok Nagar</option>
                      <option>Jaswantnagar</option>
                      <option>Bharthana</option>
                      <option>Vijay Nagar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Starting Price (₹)</label>
                  <input
                    type="number"
                    value={regStartingPrice}
                    onChange={e => setRegStartingPrice(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Business Description</label>
                  <textarea
                    rows={3}
                    value={regDesc}
                    onChange={e => setRegDesc(e.target.value)}
                    placeholder="Years of experience, specializations, past landmark events..."
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded text-[11px] text-stone-600">
                  By registering, you agree to Shaadi Supermart's Vendor Code of Conduct and commit to honouring committed bookings and prices without arbitrary increases on event dates.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                >
                  Submit Application for Admin Verification
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
