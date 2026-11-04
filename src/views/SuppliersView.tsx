import React, { useState } from 'react';
import {
  Truck,
  Search,
  Phone,
  Mail,
  Star,
  ExternalLink,
  Plus,
  DollarSign,
  Clock
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { formatCurrency } from '../utils';

export const SuppliersView: React.FC = () => {
  const { suppliers, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOutstanding = suppliers.reduce((sum, s) => sum + s.outstandingBalance, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Supplier & Vendor Directory
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Gourmet purveyors, wholesale contracts, payment terms, and active procurement balances
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Payable Balances
            </span>
            <span className="text-sm font-bold font-mono text-[#DC2626]">
              {formatCurrency(totalOutstanding)}
            </span>
          </div>

          <button
            onClick={() => addToast('Supplier Added', 'New vendor onboarded to procurement registry.', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor name, category, or representative..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>
      </div>

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((sup) => (
          <div
            key={sup.id}
            className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-enterprise hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#EEF0FF] text-[#635BFF]">
                    {sup.category}
                  </span>
                  <h3 className="text-base font-bold text-[#111827] mt-2">{sup.name}</h3>
                  <p className="text-xs text-[#6B7280]">Rep: {sup.contactPerson}</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#F59E0B] bg-[#FFFBEB] px-2 py-1 rounded-lg border border-[#F59E0B]/20">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{sup.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3F4F6] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <Phone className="w-3.5 h-3.5 text-[#635BFF]" />
                  <span>{sup.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <Mail className="w-3.5 h-3.5 text-[#0EA5A4]" />
                  <span>{sup.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280]">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Terms: {sup.paymentTerms}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wider font-semibold">
                  Outstanding Balance
                </p>
                <p className="text-sm font-bold font-mono text-[#111827]">
                  {formatCurrency(sup.outstandingBalance)}
                </p>
              </div>

              <button
                onClick={() => addToast('Purchase Order Issued', `Reorder initiated with ${sup.name}.`, 'success')}
                className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] transition-colors"
              >
                Create PO →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
