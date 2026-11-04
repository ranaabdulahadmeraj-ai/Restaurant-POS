import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  DollarSign,
  TrendingUp,
  Percent,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { REVENUE_DATA, PAYMENT_BREAKDOWN } from '../data/mockData';
import { formatCurrency, formatPercent } from '../utils';

export const ReportsView: React.FC = () => {
  const { addToast } = useRestaurant();
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Financial Analytics & End-of-Day Z-Report
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Audited financial reporting, revenue breakdowns, food cost variances, and staff tip pools
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              window.print();
              addToast('Z-Report Printed', 'Official End-of-Day Z-Report generated.', 'success');
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Generate Official Z-Report</span>
          </button>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Gross Daily Sales</p>
          <p className="text-2xl font-extrabold font-mono text-[#111827] mt-1">$48,290.50</p>
          <p className="text-xs text-[#16A34A] font-semibold mt-1 flex items-center">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last Tuesday
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Cost of Goods Sold (COGS)</p>
          <p className="text-2xl font-extrabold font-mono text-[#111827] mt-1">$13,520.00</p>
          <p className="text-xs text-[#6B7280] mt-1">28.0% target ratio (Optimal)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Gratuity / Tips</p>
          <p className="text-2xl font-extrabold font-mono text-[#16A34A] mt-1">$8,690.00</p>
          <p className="text-xs text-[#6B7280] mt-1">Distributed across 16 crew members</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Sales Tax Collected</p>
          <p className="text-2xl font-extrabold font-mono text-[#111827] mt-1">$4,285.78</p>
          <p className="text-xs text-[#6B7280] mt-1">NYC 8.875% tax jurisdiction</p>
        </div>
      </div>

      {/* Category Performance & Heatmap breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Contribution */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise space-y-4">
          <h3 className="text-base font-bold text-[#111827]">Revenue Contribution by Menu Section</h3>
          <div className="space-y-3">
            {[
              { category: 'Prime Steaks & Grills', percentage: 34, revenue: 16418.77, color: 'bg-[#635BFF]' },
              { category: 'Artisan Woodfired Pizzas', percentage: 22, revenue: 10623.91, color: 'bg-[#0EA5A4]' },
              { category: 'Fine Wines & Sommelier Selection', percentage: 20, revenue: 9658.10, color: 'bg-[#F59E0B]' },
              { category: 'Handcrafted Pastas', percentage: 14, revenue: 6760.67, color: 'bg-[#16A34A]' },
              { category: 'Starters & Desserts', percentage: 10, revenue: 4829.05, color: 'bg-[#8B5CF6]' }
            ].map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#111827]">{cat.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#6B7280] font-mono">{formatCurrency(cat.revenue)}</span>
                    <span className="font-mono font-bold text-[#111827] w-8 text-right">{cat.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <div style={{ width: `${cat.percentage}%` }} className={`h-full ${cat.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Verification Card */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#16A34A] border border-[#16A34A]/20">
              Audited Financial Registry
            </span>
            <h3 className="text-base font-bold text-[#111827] mt-2">End-of-Day Settlement Status</h3>
            <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              All terminal drawers balanced against Stripe credit card settlement batches. Zero reconciliation variances found for current business date.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#6B7280]">
              <span>Batch Authorization ID:</span>
              <span className="text-[#111827] font-bold">ST-NY-20261103-99</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>Drawer Cash Float:</span>
              <span className="text-[#111827]">$500.00 Opening / $5,811.95 Counted</span>
            </div>
            <div className="flex justify-between text-[#6B7280]">
              <span>Cash Over/Short:</span>
              <span className="text-[#16A34A] font-bold">$0.00 (Balanced)</span>
            </div>
          </div>

          <button
            onClick={() => addToast('Batch Closed', 'Current shift batch closed and exported to QuickBooks.', 'success')}
            className="w-full py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
          >
            Export to QuickBooks / Xero →
          </button>
        </div>
      </div>
    </div>
  );
};
