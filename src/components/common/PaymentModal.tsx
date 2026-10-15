import React, { useState } from 'react';
import { Booking } from '../../types';
import { formatINR } from '../../utils/formatters';
import { X, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building2, Printer } from 'lucide-react';

interface PaymentModalProps {
  booking: Booking;
  amount: number;
  onSuccess: (method: string) => void;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  booking,
  amount,
  onSuccess,
  onClose,
}) => {
  const [method, setMethod] = useState<'upi' | 'card' | 'netbank'>('upi');
  const [upiId, setUpiId] = useState('user@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnRef, setTxnRef] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedRef = `TXN-${method.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTxnRef(generatedRef);
      setIsProcessing(false);
      setPaymentSuccess(true);
      onSuccess(method === 'upi' ? `UPI (${upiId})` : method === 'card' ? 'Rupay Debit Card' : 'HDFC NetBanking');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-serif text-base font-bold text-stone-900">
              Indian Gateway (Test Sandbox)
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-serif text-lg font-bold text-stone-900">
                Payment Received Successfully!
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Advance token paid to <strong>{booking.vendorName}</strong>.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-stone-50 p-3.5 rounded border border-stone-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Transaction ID:</span>
                <span className="font-mono font-medium text-stone-800">{txnRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Amount Paid:</span>
                <span className="font-bold text-stone-900">{formatINR(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Booking Status:</span>
                <span className="text-emerald-700 font-semibold">Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Wedding Date:</span>
                <span className="text-stone-800">{booking.weddingDate}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-stone-300 text-xs font-medium rounded hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#6E1428] text-white text-xs font-medium rounded hover:bg-[#560F1E] cursor-pointer"
              >
                Close & View Bookings
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Payment Summary */}
            <div className="bg-[#FAF8F5] p-3 rounded-lg border border-stone-200 text-xs">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-stone-600">Booking for:</span>
                <span className="font-semibold text-stone-900">{booking.vendorName}</span>
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-stone-600">Total Package Cost:</span>
                <span className="tabular-nums font-medium text-stone-800">{formatINR(booking.totalAmount)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                <span className="font-bold text-stone-900">Token Advance Due Now:</span>
                <span className="text-base font-bold text-[#6E1428] tabular-nums">
                  {formatINR(amount)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="block text-xs font-semibold text-stone-600 mb-2">
                Choose Payment Method:
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setMethod('upi')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    method === 'upi'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-semibold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 mx-auto mb-1" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    method === 'card'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-semibold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('netbank')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    method === 'netbank'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-semibold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 mx-auto mb-1" />
                  <span>NetBanking</span>
                </button>
              </div>
            </div>

            {/* Method Inputs */}
            <form onSubmit={handlePay} className="space-y-3 text-xs">
              {method === 'upi' && (
                <div>
                  <label className="block text-stone-600 font-medium mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@paytm or user@okhdfcbank"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                  />
                  <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-700">Supported:</span>
                    <span>Google Pay</span>
                    <span>·</span>
                    <span>PhonePe</span>
                    <span>·</span>
                    <span>Paytm</span>
                    <span>·</span>
                    <span>BHIM</span>
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="space-y-2">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Card Number (Demo)</label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 9012"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        defaultValue="•••"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === 'netbank' && (
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Select Bank</label>
                  <select className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Punjab National Bank (PNB)</option>
                    <option>Bank of Baroda</option>
                  </select>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-2.5 bg-[#6E1428] hover:bg-[#560F1E] disabled:bg-stone-400 text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {isProcessing ? (
                    <span>Verifying with Bank...</span>
                  ) : (
                    <span>Pay {formatINR(amount)} Securely</span>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>256-bit Encrypted Demo Gateway · Safe Sandbox Mode</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
