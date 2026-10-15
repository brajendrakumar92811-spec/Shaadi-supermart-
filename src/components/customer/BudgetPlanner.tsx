import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';
import { BudgetItem } from '../../types';
import {
  Wallet,
  Plus,
  Trash2,
  Printer,
  TrendingDown,
  CheckCircle,
  Clock,
  PieChart,
} from 'lucide-react';

export const BudgetPlanner: React.FC = () => {
  const {
    budgetItems,
    totalBudget,
    updateTotalBudget,
    addBudgetItem,
    deleteBudgetItem,
    language,
  } = useApp();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudgetVal, setNewBudgetVal] = useState(totalBudget.toString());

  // Form for new expense
  const [eventName, setEventName] = useState<'Roka' | 'Haldi' | 'Mehndi' | 'Sangeet' | 'Wedding' | 'Reception' | 'General'>('Wedding');
  const [category, setCategory] = useState('Marriage Lawn & Venue');
  const [description, setDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [actualCost, setActualCost] = useState('');
  const [vendorName, setVendorName] = useState('');

  // Calculations
  const totalEstimated = budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0);
  const totalCommitted = budgetItems.reduce((acc, item) => acc + item.actualCost, 0);
  const totalPaid = budgetItems.reduce((acc, item) => acc + item.paidAmount, 0);
  const remainingBudget = totalBudget - totalCommitted;
  const committedPercentage = Math.min(100, Math.round((totalCommitted / totalBudget) * 100));

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !estimatedCost) return;

    addBudgetItem({
      eventName,
      category,
      description,
      estimatedCost: Number(estimatedCost),
      actualCost: actualCost ? Number(actualCost) : Number(estimatedCost),
      paidAmount: 0,
      vendorName: vendorName || undefined,
      isConfirmed: Boolean(vendorName),
    });

    setDescription('');
    setEstimatedCost('');
    setActualCost('');
    setVendorName('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Strip with Print Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-[#6E1428] mb-1">
              Financial Management
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'en' ? 'Wedding Budget Planner' : 'विवाह बजट प्रबंधन'}
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Customize spending limits for events, track advances, and monitor remaining funds.
            </p>
          </div>

          <div className="flex items-center gap-3 no-print">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded shadow-xs hover:bg-stone-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print / Export Summary</span>
            </button>
          </div>
        </div>

        {/* Top Financial Dashboard Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          {/* Total Budget Card */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Total Planned Budget</span>
              <Wallet className="w-4 h-4 text-[#6E1428]" />
            </div>

            {isEditingBudget ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  value={newBudgetVal}
                  onChange={e => setNewBudgetVal(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-stone-300 rounded focus:ring-1 focus:ring-[#6E1428]"
                />
                <button
                  onClick={() => {
                    updateTotalBudget(Number(newBudgetVal));
                    setIsEditingBudget(false);
                  }}
                  className="px-2.5 py-1 text-xs bg-[#6E1428] text-white rounded font-medium cursor-pointer"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-baseline justify-between mt-1">
                <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {formatINR(totalBudget)}
                </div>
                <button
                  onClick={() => setIsEditingBudget(true)}
                  className="text-[11px] text-[#6E1428] hover:underline cursor-pointer no-print"
                >
                  Edit
                </button>
              </div>
            )}
            <span className="text-[11px] text-stone-400 mt-1 block">Full wedding allocation</span>
          </div>

          {/* Committed Spending */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Committed / Booked</span>
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tabular-nums mt-1">
              {formatINR(totalCommitted)}
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
              <span>{committedPercentage}% of budget utilized</span>
            </div>
          </div>

          {/* Advances Paid */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Advance Tokens Paid</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-xl sm:text-2xl font-bold text-amber-800 tabular-nums mt-1">
              {formatINR(totalPaid)}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              Balance: {formatINR(totalCommitted - totalPaid)}
            </span>
          </div>

          {/* Remaining Balance */}
          <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
              <span>Remaining Unallocated</span>
              <TrendingDown className={`w-4 h-4 ${remainingBudget < 0 ? 'text-red-500' : 'text-emerald-600'}`} />
            </div>
            <div
              className={`font-serif text-xl sm:text-2xl font-bold tabular-nums mt-1 ${
                remainingBudget < 0 ? 'text-red-600' : 'text-emerald-700'
              }`}
            >
              {formatINR(remainingBudget)}
            </div>
            <span className="text-[11px] text-stone-400 mt-1 block">
              {remainingBudget < 0 ? 'Over budget!' : 'Safe headroom'}
            </span>
          </div>
        </div>

        {/* Progress Bar of Budget Utilization */}
        <div className="bg-white p-4 rounded-lg border border-stone-200 mb-6">
          <div className="flex justify-between text-xs font-medium text-stone-700 mb-1.5">
            <span>Budget Utilization Pace</span>
            <span>{committedPercentage}% committed</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full transition-all ${
                committedPercentage > 100
                  ? 'bg-red-600'
                  : committedPercentage > 85
                  ? 'bg-amber-500'
                  : 'bg-[#6E1428]'
              }`}
              style={{ width: `${Math.min(100, committedPercentage)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Itemized Expenses Table */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <h2 className="font-serif text-base font-bold text-stone-900">
                Itemized Expenses & Vendor Allocations
              </h2>
              <span className="text-xs text-stone-500">{budgetItems.length} expenses tracked</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 text-stone-600 font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-2.5 px-3">Event</th>
                    <th className="py-2.5 px-3">Category & Item</th>
                    <th className="py-2.5 px-3 text-right">Committed</th>
                    <th className="py-2.5 px-3 text-right">Paid</th>
                    <th className="py-2.5 px-3">Vendor</th>
                    <th className="py-2.5 px-3 text-center no-print">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {budgetItems.map(item => (
                    <tr key={item.id} className="hover:bg-stone-50/60">
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className="text-[11px] font-medium text-stone-700">
                          {item.eventName}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-stone-900">{item.description}</div>
                        <div className="text-[11px] text-stone-500">{item.category}</div>
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium text-stone-900 tabular-nums whitespace-nowrap">
                        {formatINR(item.actualCost)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-700 font-medium tabular-nums whitespace-nowrap">
                        {formatINR(item.paidAmount)}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap text-stone-600">
                        {item.vendorName ? (
                          <span className="text-stone-800 font-medium">{item.vendorName}</span>
                        ) : (
                          <span className="text-stone-400 italic">Not booked</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center no-print">
                        <button
                          onClick={() => deleteBudgetItem(item.id)}
                          aria-label="Delete item"
                          className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Col: Add New Expense Form */}
          <div className="bg-white rounded-lg border border-stone-200 shadow-xs p-4 h-fit no-print">
            <h2 className="font-serif text-base font-bold text-stone-900 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#6E1428]" />
              <span>Add Custom Expense</span>
            </h2>

            <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Ceremony / Event</label>
                <select
                  value={eventName}
                  onChange={e => setEventName(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                >
                  <option value="Wedding">Wedding / Pheras</option>
                  <option value="Sangeet">Sangeet & Cocktail</option>
                  <option value="Mehndi">Mehndi Ceremony</option>
                  <option value="Haldi">Haldi Ritual</option>
                  <option value="Roka">Roka / Engagement</option>
                  <option value="Reception">Wedding Reception</option>
                  <option value="General">General / Attire & Shagun</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Service Category</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  placeholder="e.g. Photography, Food, Decor, Sweets"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Description / Item Details</label>
                <input
                  type="text"
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. 500 plates dinner catering"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Estimated Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={estimatedCost}
                    onChange={e => setEstimatedCost(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Actual / Final (₹)</label>
                  <input
                    type="number"
                    value={actualCost}
                    onChange={e => setActualCost(e.target.value)}
                    placeholder="If finalized"
                    className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Assigned Vendor (Optional)</label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={e => setVendorName(e.target.value)}
                  placeholder="e.g. Royal Shutterbug Studio"
                  className="w-full px-2.5 py-1.5 bg-stone-50 border border-stone-300 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#6E1428]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#6E1428] hover:bg-[#560F1E] text-white font-medium text-xs rounded transition-colors cursor-pointer"
                >
                  Add to Budget
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
