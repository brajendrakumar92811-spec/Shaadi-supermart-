import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import {
  Shield,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FolderTree,
  MapPin,
  TrendingUp,
  FileText,
  Plus,
  Power,
  Eye,
  Megaphone,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    vendors,
    categories,
    cities,
    bookings,
    enquiries,
    advertisements,
    auditLogs,
    approveVendor,
    rejectVendor,
    toggleVendorSuspension,
    addCategory,
    toggleCategoryStatus,
    addLocality,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'categories' | 'localities' | 'ads' | 'audit'>('overview');

  // New category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatNameHi, setNewCatNameHi] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // New locality form
  const [locCityId, setLocCityId] = useState('etawah');
  const [newLocName, setNewLocName] = useState('');

  // Rejection modal
  const [rejectingVendorId, setRejectingVendorId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Incomplete business address or unverifiable phone number.');

  // Financial GMV and Commission calculations
  const totalGMV = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const platformCommissionRate = 0.08; // 8%
  const platformRevenue = Math.round(totalGMV * platformCommissionRate);
  const vendorPayouts = totalGMV - platformRevenue;
  const pendingApprovals = vendors.filter(v => v.verificationStatus === 'pending');

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory({
      name: newCatName,
      nameHi: newCatNameHi || newCatName,
      icon: 'Sparkles',
      description: newCatDesc || 'Wedding related service category',
    });
    setNewCatName('');
    setNewCatNameHi('');
    setNewCatDesc('');
  };

  const handleAddLocalitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocName) return;
    addLocality(locCityId, newLocName);
    setNewLocName('');
  };

  const handleConfirmReject = () => {
    if (rejectingVendorId) {
      rejectVendor(rejectingVendorId, rejectReason);
      setRejectingVendorId(null);
    }
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-[#380E17] text-[#E5C378] flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-stone-900">
                  Shaadi Supermart Governance Control
                </h1>
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded uppercase">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                Marketplace operations for Etawah hub, vendor verification, listings, commissions, and ads.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500">Pending Approvals:</span>
            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {pendingApprovals.length} vendors
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 mb-6 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Platform Overview & GMV
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'approvals'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>Vendor Approvals</span>
            {pendingApprovals.length > 0 && (
              <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {pendingApprovals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'categories'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Category Management ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('localities')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'localities'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Locality & City Coverage
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'ads'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Advertisements & Banners ({advertisements.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: Platform Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block mb-1">Gross Booking Value (GMV)</span>
                <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  {formatINR(totalGMV)}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">From confirmed wedding contracts</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block mb-1">Platform Commission (8%)</span>
                <div className="text-2xl font-serif font-bold text-emerald-800 tabular-nums">
                  {formatINR(platformRevenue)}
                </div>
                <span className="text-[11px] text-emerald-600 mt-1 block">Net marketplace revenue</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block mb-1">Vendor Disbursals</span>
                <div className="text-2xl font-serif font-bold text-stone-800 tabular-nums">
                  {formatINR(vendorPayouts)}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">Transferred to partner accounts</span>
              </div>

              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-xs text-stone-500 block mb-1">Active Partners</span>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {vendors.filter(v => v.verified).length} / {vendors.length}
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  {pendingApprovals.length} pending checks
                </span>
              </div>
            </div>

            {/* Quick Vendor Status Table */}
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Vendor Network Roster (Etawah & Uttar Pradesh)
                </h3>
                <span className="text-xs text-stone-500">{vendors.length} total registered</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">Business</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Rating</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {vendors.map(v => (
                      <tr key={v.id} className="hover:bg-stone-50/50">
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-stone-900">{v.businessName}</div>
                          <div className="text-[11px] text-stone-500">{v.ownerName} · {v.phone}</div>
                        </td>
                        <td className="py-2.5 px-3 text-stone-700">{v.categoryName}</td>
                        <td className="py-2.5 px-3 text-stone-600">{v.locality}, {v.city}</td>
                        <td className="py-2.5 px-3 font-semibold text-stone-800">
                          {v.rating.toFixed(1)} ★ ({v.reviewCount})
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              v.verificationStatus === 'verified'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : v.verificationStatus === 'rejected'
                                ? 'bg-red-50 text-red-800 border border-red-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {v.verificationStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          {v.verificationStatus === 'pending' && (
                            <button
                              onClick={() => approveVendor(v.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-medium mr-1.5 cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => toggleVendorSuspension(v.id, 'Admin manual moderation review')}
                            className={`px-2 py-1 rounded text-[11px] font-medium cursor-pointer ${
                              v.verificationStatus === 'rejected'
                                ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                                : 'border border-red-300 text-red-700 hover:bg-red-50'
                            }`}
                          >
                            {v.verificationStatus === 'rejected' ? 'Reactivate' : 'Suspend'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vendor Approvals Queue */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <h3 className="font-serif text-base font-bold text-stone-900">
              Pending Verification Applications
            </h3>

            {pendingApprovals.length > 0 ? (
              pendingApprovals.map(vendor => (
                <div key={vendor.id} className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-stone-700">{vendor.categoryName}</span>
                        <span>·</span>
                        <span>{vendor.locality}, {vendor.city}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {vendor.businessName}
                      </h4>
                      <div className="text-xs text-stone-600 mt-1">
                        Owner: <strong>{vendor.ownerName}</strong> · Phone: <strong>{vendor.phone}</strong> · Email: {vendor.email}
                      </div>
                      <p className="text-xs text-stone-700 mt-2 bg-stone-50 p-2.5 rounded border border-stone-100">
                        {vendor.description}
                      </p>
                      <div className="mt-2 text-xs text-stone-500">
                        Starting Price: {formatINR(vendor.startingPrice)} /{vendor.pricingUnit} · Service Radius: {vendor.serviceRadiusKm} km
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => approveVendor(vendor.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve & Grant Badge</span>
                      </button>
                      <button
                        onClick={() => setRejectingVendorId(vendor.id)}
                        className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject with Reason</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-lg border border-stone-200 text-xs text-stone-500">
                All vendor applications have been audited. No pending approvals in queue.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Category Management */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Platform Wedding Categories (No-Code Configurable)
              </h3>
              <p className="text-xs text-stone-500 mb-2">
                Enable, disable, or add categories without modifying source code.
              </p>

              <div className="bg-white rounded-lg border border-stone-200 shadow-xs divide-y divide-stone-100">
                {categories.map(cat => (
                  <div key={cat.id} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-stone-900">
                        {cat.name} <span className="text-stone-500 font-normal">({cat.nameHi})</span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{cat.description}</div>
                    </div>

                    <button
                      onClick={() => toggleCategoryStatus(cat.id)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                        cat.active
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {cat.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Category Form */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs h-fit">
              <h3 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#6E1428]" />
                <span>Add Category</span>
              </h3>

              <form onSubmit={handleAddCategorySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Category Name (English)</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={e => setNewCatName(e.target.value)}
                    placeholder="e.g. Wedding Fireworks & Pyrotechnics"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Category Name (Hindi)</label>
                  <input
                    type="text"
                    value={newCatNameHi}
                    onChange={e => setNewCatNameHi(e.target.value)}
                    placeholder="e.g. शादी की आतिशबाजी"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newCatDesc}
                    onChange={e => setNewCatDesc(e.target.value)}
                    placeholder="Brief description of wedding services included"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                >
                  Create Category
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 4: Locality Management */}
        {activeTab === 'localities' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Operational Localities & Expansion Hubs
              </h3>

              <div className="space-y-4">
                {cities.map(city => (
                  <div key={city.id} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {city.name} ({city.nameHi}) - {city.state}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#6E1428]">
                        {city.name === 'Etawah' ? 'Primary Active Launch' : 'Expansion Hub'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {city.localities.map(loc => (
                        <span
                          key={loc}
                          className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200"
                        >
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Locality Form */}
            <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs h-fit">
              <h3 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#6E1428]" />
                <span>Add Service Locality</span>
              </h3>

              <form onSubmit={handleAddLocalitySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Select City</label>
                  <select
                    value={locCityId}
                    onChange={e => setLocCityId(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  >
                    {cities.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">New Locality Name</label>
                  <input
                    type="text"
                    required
                    value={newLocName}
                    onChange={e => setNewLocName(e.target.value)}
                    placeholder="e.g. Jaswantnagar South or Sarafa Chowk"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] cursor-pointer"
                >
                  Register Locality
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: Advertisements & Campaigns */}
        {activeTab === 'ads' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  Advertisements & Sponsored Campaigns
                </h3>
                <p className="text-xs text-stone-500">
                  Track impressions, clicks, and configure seasonal sponsored banners.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advertisements.map(ad => (
                <div key={ad.id} className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs text-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded uppercase">
                        Sponsored Ad
                      </span>
                      <h4 className="font-serif text-base font-bold text-stone-900 mt-1">
                        {ad.title}
                      </h4>
                      <span className="text-stone-500">Sponsor: {ad.sponsorName} ({ad.city})</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                        ad.active ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {ad.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  <p className="text-stone-600 italic">"{ad.tagline}"</p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-500">
                    <div>
                      <span>Impressions: <strong className="text-stone-800">{ad.impressions}</strong></span>
                      <span className="mx-2">·</span>
                      <span>Clicks: <strong className="text-stone-800">{ad.clicks}</strong></span>
                    </div>
                    <span className="text-[11px]">Valid till {ad.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Audit Logs */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs p-5">
            <h3 className="font-serif text-base font-bold text-stone-900 mb-3">
              Marketplace Audit Trails
            </h3>
            <div className="divide-y divide-stone-100 text-xs">
              {auditLogs.map(log => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-4">
                  <div>
                    <span className="font-bold text-stone-800">{log.action}</span>
                    <span className="text-stone-500 text-[11px] ml-2">by {log.actor}</span>
                    <div className="text-stone-600 mt-0.5">{log.details}</div>
                  </div>
                  <span className="text-stone-400 text-[11px] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reject Reason Modal */}
      {rejectingVendorId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5 text-xs">
            <h3 className="font-serif text-base font-bold text-stone-900 mb-2">
              Reject Vendor Application
            </h3>
            <p className="text-stone-500 mb-3">
              Provide an official recorded reason for rejection. The vendor will receive this notice and can resubmit with verified documents.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectingVendorId(null)}
                className="px-3 py-1.5 border border-stone-300 rounded text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 bg-red-600 text-white rounded font-medium hover:bg-red-700 cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
