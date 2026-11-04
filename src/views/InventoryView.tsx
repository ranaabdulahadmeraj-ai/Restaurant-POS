import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Truck,
  RotateCcw,
  Download
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { InventoryItem } from '../types';
import { formatCurrency, cn } from '../utils';

export const InventoryView: React.FC = () => {
  const { inventory, reorderInventoryItem, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInventory = inventory.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalValue = inventory.reduce((sum, i) => sum + i.currentStock * i.unitCost, 0);
  const lowCount = inventory.filter((i) => i.status === 'low' || i.status === 'critical').length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & KPI Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Inventory & Raw Materials Control
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Real-time stock depletion, PAR level threshold alerts, and automated vendor purchase orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Total Stock Valuation
            </span>
            <span className="text-sm font-bold font-mono text-[#111827]">
              {formatCurrency(totalValue)}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#DC2626] font-semibold uppercase tracking-wider block">
              Items Under PAR
            </span>
            <span className="text-sm font-bold font-mono text-[#DC2626]">
              {lowCount} Items Alert
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SKU, ingredient, or vendor..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['all', 'critical', 'low', 'optimal'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all',
                statusFilter === st
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-enterprise">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3.5">SKU & Item Name</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Current Stock</th>
                <th className="px-4 py-3.5">PAR Range</th>
                <th className="px-4 py-3.5">Unit Cost</th>
                <th className="px-4 py-3.5">Supplier</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filteredInventory.map((item) => {
                const isCritical = item.status === 'critical';
                const isLow = item.status === 'low';

                return (
                  <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-[#111827]">{item.name}</p>
                      <p className="font-mono text-[10px] text-[#6B7280]">{item.sku}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280] font-medium">{item.category}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-mono font-bold text-sm text-[#111827]">
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280] font-mono">
                      {item.minPar} - {item.maxPar} {item.unit}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[#111827]">
                      {formatCurrency(item.unitCost)} / {item.unit}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[#111827] font-medium">{item.supplierName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider',
                          isCritical
                            ? 'bg-[#FEF2F2] text-[#DC2626]'
                            : isLow
                            ? 'bg-[#FFFBEB] text-[#F59E0B]'
                            : 'bg-[#ECFDF5] text-[#16A34A]'
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => reorderInventoryItem(item.id, 10)}
                        className="px-3 py-1.5 rounded-lg bg-[#635BFF] hover:bg-[#5147FF] text-white text-[11px] font-semibold transition-all shadow-xs"
                      >
                        + Restock 10 {item.unit}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
