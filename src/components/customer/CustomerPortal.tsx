import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { Booking, Quotation } from '../../types';
import { PaymentModal } from '../common/PaymentModal';
import {
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  Phone,
  Star,
  FileCheck,
  ChevronRight,
  Printer,
  Heart,
  Send,
  User,
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const {
    bookings,
    quotations,
    enquiries,
    vendors,
    acceptQuotation,
    payBookingAdvance,
    submitReview,
    favourites,
    setActiveVendorModalId,
    language,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'bookings' | 'quotes' | 'favourites' | 'profile'>('bookings');

  // Selected booking for payment modal
  const [paymentBooking, setPaymentBooking] = useState<{ booking: Booking; amount: number } | null>(null);

  // Review modal state
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handlePaySuccess = (method: string) => {
    if (paymentBooking) {
      payBookingAdvance(paymentBooking.booking.id, paymentBooking.amount, method);
      setPaymentBooking(null);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewBooking && reviewComment) {
      submitReview(reviewBooking.id, reviewBooking.vendorId, ratingVal, reviewComment);
      setReviewBooking(null);
      setReviewComment('');
    }
  };

  const myBookings = bookings;
  const myQuotes = quotations;
  const favVendors = vendors.filter(v => favourites.includes(v.id));

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Banner */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF2F4] text-[#6E1428] border border-[#E8DEC8] flex items-center justify-center font-serif text-xl font-bold">
              P&R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-stone-900">
                  Pooja Sharma & Rahul Verma
                </h1>
                <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Family Account
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-stone-500">
                <span>Etawah, Uttar Pradesh</span>
                <span>·</span>
                <span>Wedding: 25 Nov 2026</span>
                <span>·</span>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-stone-500 block">Total Active Bookings</span>
              <span className="font-bold text-stone-900 text-base">{myBookings.length}</span>
            </div>
            <div className="text-right border-l border-stone-200 pl-4">
              <span className="text-stone-500 block">Quotations Received</span>
              <span className="font-bold text-stone-900 text-base">{myQuotes.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 mb-6 text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer ${
              activeSubTab === 'bookings'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            My Bookings ({myBookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('quotes')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer ${
              activeSubTab === 'quotes'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Quotations & Enquiries ({myQuotes.length})
          </button>
          <button
            onClick={() => setActiveSubTab('favourites')}
            className={`px-4 py-2 rounded transition-colors cursor-pointer ${
              activeSubTab === 'favourites'
                ? 'bg-[#6E1428] text-white font-semibold'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Saved Vendors ({favVendors.length})
          </button>
        </div>

        {/* Tab 1: My Bookings */}
        {activeSubTab === 'bookings' && (
          <div className="space-y-4">
            {myBookings.length > 0 ? (
              myBookings.map(bk => (
                <div
                  key={bk.id}
                  className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase">
                        {bk.serviceCategory}
                      </span>
                      <span>·</span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded capitalize ${
                          bk.bookingStatus === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : bk.bookingStatus === 'completed'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {bk.bookingStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {bk.vendorName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        Event Date: {bk.weddingDate}
                      </span>
                      <span>·</span>
                      <span>Package: {bk.packageName}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-stone-400" />
                        {bk.vendorPhone}
                      </span>
                    </div>

                    {bk.transactionRef && (
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Transaction Ref: <strong className="font-mono text-stone-700">{bk.transactionRef}</strong></span>
                        <span>({bk.paymentMethod})</span>
                      </div>
                    )}
                  </div>

                  {/* Financial Status & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs border-t md:border-t-0 md:border-l border-stone-100 pt-3 md:pt-0 md:pl-5">
                    <div className="space-y-1 text-right sm:min-w-32">
                      <span className="text-stone-500 block">Total Package:</span>
                      <span className="font-bold text-stone-900 text-sm tabular-nums">
                        {formatINR(bk.totalAmount)}
                      </span>
                      <div className="text-[11px]">
                        <span className="text-emerald-700">Paid: {formatINR(bk.advancePaid)}</span>
                        {bk.balanceAmount > 0 && (
                          <span className="text-stone-500 block">Due: {formatINR(bk.balanceAmount)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      {bk.balanceAmount > 0 && (
                        <button
                          onClick={() => setPaymentBooking({ booking: bk, amount: bk.balanceAmount > 25000 ? 25000 : bk.balanceAmount })}
                          className="px-3.5 py-2 bg-[#6E1428] text-white font-medium rounded hover:bg-[#560F1E] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay Advance / Balance</span>
                        </button>
                      )}

                      {bk.bookingStatus === 'completed' && !bk.reviewed && (
                        <button
                          onClick={() => setReviewBooking(bk)}
                          className="px-3.5 py-2 bg-amber-50 text-amber-900 border border-amber-300 font-medium rounded hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>Submit Verified Review</span>
                        </button>
                      )}

                      {bk.transactionRef && (
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1.5 border border-stone-300 text-stone-700 rounded hover:bg-stone-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Printer className="w-3 h-3 text-stone-500" />
                          <span>Print Receipt</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-lg border border-stone-200 text-xs text-stone-500">
                No active bookings yet. Browse verified wedding vendors to request quotations.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Quotations & Enquiries */}
        {activeSubTab === 'quotes' && (
          <div className="space-y-4">
            {myQuotes.length > 0 ? (
              myQuotes.map(quote => (
                <div
                  key={quote.id}
                  className="bg-white rounded-lg border border-stone-200 p-5 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                        <span className="font-semibold text-[#6E1428]">Quotation #{quote.id}</span>
                        <span>·</span>
                        <span>Valid Until: {formatDate(quote.validUntil)}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {quote.vendorName}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 italic">"{quote.note}"</p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-stone-900 tabular-nums">
                        {formatINR(quote.totalAmount)}
                      </div>
                      <span className="text-xs text-stone-500 block">
                        Advance required: {formatINR(quote.advanceRequired)}
                      </span>
                    </div>
                  </div>

                  {/* Quotation Line Items Breakdown */}
                  <div className="mt-3 p-3 bg-stone-50 rounded border border-stone-200/80 text-xs">
                    <span className="font-semibold text-stone-700 block mb-1.5 uppercase text-[10px] tracking-wider">
                      Itemized Quotation Breakdown:
                    </span>
                    <div className="space-y-1.5 divide-y divide-stone-200">
                      {quote.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center pt-1">
                          <div>
                            <span className="font-medium text-stone-800">{it.name}</span>
                            {it.notes && (
                              <span className="text-stone-500 text-[11px] block">{it.notes}</span>
                            )}
                          </div>
                          <span className="font-semibold text-stone-900 tabular-nums">
                            {it.cost > 0 ? formatINR(it.cost) : 'Included'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-stone-100">
                    <span
                      className={`text-xs font-semibold ${
                        quote.status === 'accepted' ? 'text-emerald-700' : 'text-stone-600'
                      }`}
                    >
                      Status: {quote.status === 'accepted' ? 'Accepted & Booking Created' : 'Awaiting Your Approval'}
                    </span>

                    {quote.status !== 'accepted' && (
                      <button
                        onClick={() => acceptQuotation(quote.id)}
                        className="px-4 py-2 bg-[#6E1428] hover:bg-[#560F1E] text-white text-xs font-medium rounded shadow-xs transition-colors cursor-pointer"
                      >
                        Accept Quotation & Proceed to Book
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-lg border border-stone-200 text-xs text-stone-500">
                No quotations received yet. Request quotations from vendor profiles to compare rates.
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Favourites */}
        {activeSubTab === 'favourites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favVendors.length > 0 ? (
              favVendors.map(v => (
                <div key={v.id} className="bg-white rounded-lg border border-stone-200 p-4 shadow-xs">
                  <h4 className="font-serif text-base font-bold text-stone-900">{v.businessName}</h4>
                  <div className="text-xs text-stone-500 mt-1 mb-2">
                    {v.categoryName} · {v.locality}, {v.city}
                  </div>
                  <div className="text-xs font-semibold text-stone-900 mb-3 tabular-nums">
                    Starting: {formatINR(v.startingPrice)}
                  </div>
                  <button
                    onClick={() => setActiveVendorModalId(v.id)}
                    className="w-full py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded cursor-pointer"
                  >
                    View Vendor Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-8 text-center bg-white rounded-lg border border-stone-200 text-xs text-stone-500">
                You haven't saved any vendors yet. Click the heart icon on any vendor card to bookmark them.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Payment Gateway Modal */}
      {paymentBooking && (
        <PaymentModal
          booking={paymentBooking.booking}
          amount={paymentBooking.amount}
          onSuccess={handlePaySuccess}
          onClose={() => setPaymentBooking(null)}
        />
      )}

      {/* Review Modal */}
      {reviewBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 border border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
              Submit Review for {reviewBooking.vendorName}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Your feedback helps wedding families in Etawah choose the best verified services.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingVal(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= ratingVal
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-stone-800 ml-2">{ratingVal} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Your Detailed Experience</label>
                <textarea
                  required
                  rows={4}
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Share details on punctuality, staff behavior, quality of food/decor/photos, and pricing..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewBooking(null)}
                  className="px-3 py-1.5 border border-stone-300 text-stone-600 rounded hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#6E1428] text-white rounded font-medium hover:bg-[#560F1E] cursor-pointer"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
