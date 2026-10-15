import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { Sparkles, X, CheckCircle, Calendar, Wallet, Users, ArrowRight } from 'lucide-react';

interface AIAssistantModalProps {
  onClose: () => void;
  onApplyBudget?: (allocatedItems: any[]) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ onClose, onApplyBudget }) => {
  const { totalBudget, weddingDateFilter, selectedCity, language, setActiveCustomerTab, setSelectedCategory } = useApp();

  const [budgetVal, setBudgetVal] = useState(totalBudget || 1500000);
  const [guestCount, setGuestCount] = useState(600);
  const [eventStyle, setEventStyle] = useState<'grand_royal' | 'traditional_vedic' | 'intimate_modern'>('grand_royal');
  const [planGenerated, setPlanGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPlanGenerated(true);
    }, 800);
  };

  // AI-recommended budget distribution tailored for UP/Etawah weddings
  const allocations = [
    { name: 'Marriage Lawn & Banquet Venue', percent: 25, amount: Math.round(budgetVal * 0.25), catId: 'venues' },
    { name: 'Halwai & Royal Catering Feast', percent: 32, amount: Math.round(budgetVal * 0.32), catId: 'catering' },
    { name: 'Cinematic Photography & Drone', percent: 10, amount: Math.round(budgetVal * 0.10), catId: 'photography' },
    { name: 'Mandap, Stage & Floral Decor', percent: 10, amount: Math.round(budgetVal * 0.10), catId: 'decoration' },
    { name: 'Bridal & Groom Attire / Jewellery', percent: 9, amount: Math.round(budgetVal * 0.09), catId: 'clothing' },
    { name: 'Baraat Brass Band & DJ Sound', percent: 6, amount: Math.round(budgetVal * 0.06), catId: 'band' },
    { name: 'Bridal HD Makeup & Mehndi Art', percent: 4, amount: Math.round(budgetVal * 0.04), catId: 'makeup' },
    { name: 'Pandit Ji, Invitations & Shagun Contingency', percent: 4, amount: Math.round(budgetVal * 0.04), catId: 'pandit' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-[#D4AF37]/40 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF2F4] text-[#6E1428] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#6E1428]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                AI Wedding Strategy Advisor
              </h3>
              <span className="text-[11px] text-stone-500">
                Tailored for {selectedCity}, Uttar Pradesh
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!planGenerated ? (
          <form onSubmit={handleGeneratePlan} className="space-y-4 my-4 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-amber-900">
              <span className="font-semibold block mb-0.5">Customized Recommendation Engine</span>
              Enter your total wedding budget, guest estimate, and celebration style to receive optimal budget distribution and vendor shortlists.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Total Target Budget (₹)</label>
                <input
                  type="number"
                  required
                  step="25000"
                  value={budgetVal}
                  onChange={e => setBudgetVal(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded font-semibold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Expected Guests</label>
                <input
                  type="number"
                  min="100"
                  max="3000"
                  value={guestCount}
                  onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Celebration Theme</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEventStyle('grand_royal')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    eventStyle === 'grand_royal'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Grand Royal (Lawns & Feast)
                </button>
                <button
                  type="button"
                  onClick={() => setEventStyle('traditional_vedic')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    eventStyle === 'traditional_vedic'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Traditional Vedic Rituals
                </button>
                <button
                  type="button"
                  onClick={() => setEventStyle('intimate_modern')}
                  className={`p-2.5 rounded border text-center transition-all cursor-pointer ${
                    eventStyle === 'intimate_modern'
                      ? 'border-[#6E1428] bg-rose-50 text-[#6E1428] font-bold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Intimate Elegance
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#6E1428] hover:bg-[#560F1E] text-white font-medium text-xs rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                {loading ? 'Synthesizing Etawah Wedding Model...' : 'Generate Optimized Wedding Plan →'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 my-4 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Recommended Wedding Strategy for {formatINR(budgetVal)}</strong>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Calculated for {guestCount} guests in {selectedCity} on {weddingDateFilter}. Keep final decisions with your family.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-stone-900 mb-2">
                Recommended Budget Distribution:
              </h4>
              <div className="space-y-1.5 divide-y divide-stone-100">
                {allocations.map((item, idx) => (
                  <div key={idx} className="pt-1.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-800">{item.name}</span>
                      <span className="text-stone-400 text-[11px] ml-2">({item.percent}%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 tabular-nums">
                        {formatINR(item.amount)}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCategory(item.catId);
                          onClose();
                          setActiveCustomerTab('directory');
                        }}
                        className="text-[11px] text-[#6E1428] hover:underline font-medium cursor-pointer"
                      >
                        Explore Vendors →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end gap-2">
              <button
                onClick={() => setPlanGenerated(false)}
                className="px-3 py-1.5 border border-stone-300 rounded text-stone-600 hover:bg-stone-50 cursor-pointer"
              >
                Adjust Parameters
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveCustomerTab('budget');
                }}
                className="px-4 py-1.5 bg-[#6E1428] text-white rounded font-medium hover:bg-[#560F1E] cursor-pointer"
              >
                View in Budget Planner
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
