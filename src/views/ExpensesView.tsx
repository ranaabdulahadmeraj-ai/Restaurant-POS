import React, { useState } from 'react';
import {
  Wallet,
  Search,
  Plus,
  ArrowUpRight,
  Receipt,
  Download,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Expense } from '../types';
import { formatCurrency, cn } from '../utils';

export const ExpensesView: React.FC = () => {
  const { expenses, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = expenses.filter((e) => {
    const matchesCat = categoryFilter === 'all' || e.category === categoryFilter;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categories = [
    'all',
    'Food Cost',
    'Beverage Cost',
    'Labor & Payroll',
    'Rent & Utilities',
    'Maintenance'
  ];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & KPI Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Operational Outflows & P&L Expenses
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Vendor disbursements, payroll debits, utility bills, and food cost accounting
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Monthly Outflows
            </span>
            <span className="text-sm font-bold font-mono text-[#DC2626]">
              {formatCurrency(totalExpense)}
            </span>
          </div>

          <button
            onClick={() => addToast('Voucher Logged', 'Expense recorded to general ledger.', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor or description..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all',
                categoryFilter === cat
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-enterprise">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3.5">Expense Title</th>
                <th className="px-4 py-3.5">Cost Category</th>
                <th className="px-4 py-3.5">Vendor</th>
                <th className="px-4 py-3.5">Payment Method</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filtered.map((exp) => (
                <tr key={exp.id} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="px-4 py-3.5 font-bold text-[#111827]">{exp.title}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EEF0FF] text-[#635BFF]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-[#374151]">{exp.vendor}</td>
                  <td className="px-4 py-3.5 text-[#6B7280]">{exp.paymentMethod}</td>
                  <td className="px-4 py-3.5 text-[#6B7280] font-mono text-[11px]">{exp.date}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded-full capitalize',
                        exp.status === 'settled'
                          ? 'bg-[#ECFDF5] text-[#16A34A]'
                          : 'bg-[#FFFBEB] text-[#F59E0B]'
                      )}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-[#DC2626] text-sm">
                    -{formatCurrency(exp.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
