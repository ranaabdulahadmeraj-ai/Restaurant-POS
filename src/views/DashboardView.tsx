import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  CreditCard,
  Percent,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Store,
  UtensilsCrossed,
  Grid3X3,
  Calendar,
  Sparkles,
  Layers
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { REVENUE_DATA, PAYMENT_BREAKDOWN } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils';
import { cn } from '../utils';

export const DashboardView: React.FC = () => {
  const {
    activeBranch,
    orders,
    tables,
    menuItems,
    inventory,
    setActiveTab,
    reorderInventoryItem,
    addToast
  } = useRestaurant();

  const [timeframe, setTimeframe] = useState<'today' | '7d' | '30d' | 'year'>('today');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Financial aggregates
  const totalRevenue = 48290.50;
  const totalOrdersCount = 1482;
  const avgOrderValue = 32.58;
  const netProfit = 18940.20;

  // Floor stats
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;
  const totalTables = tables.length;
  const occupancyPercent = Math.round((occupiedTables / totalTables) * 100);

  // Low stock inventory items
  const lowStockItems = inventory.filter((i) => i.status === 'low' || i.status === 'critical');

  // Sparkline SVG helper
  const renderSparkline = (points: number[], color: string) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const height = 36;
    const width = 110;
    const step = width / (points.length - 1);

    const pathData = points
      .map((p, i) => {
        const x = i * step;
        const y = height - ((p - min) / (max - min || 1)) * (height - 8) - 4;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#635BFF] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> General Manager Dashboard
            </span>
            <span className="text-xs text-[#6B7280]">•</span>
            <span className="text-xs font-medium text-[#111827]">{activeBranch.name}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-[#111827] tracking-tight">
            Good evening, Marco.
          </h1>
          <p className="text-xs lg:text-sm text-[#6B7280] mt-1">
            Dinner service is running at <span className="font-semibold text-[#111827]">{occupancyPercent}% floor capacity</span>. Average ticket prep time is 11.4 minutes.
          </p>
        </div>

        {/* Quick launch action shortcuts */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('pos')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Store className="w-4 h-4" />
            <span>Launch POS</span>
          </button>
          <button
            onClick={() => setActiveTab('kds')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#111827] text-xs font-semibold shadow-subtle transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4 text-[#F59E0B]" />
            <span>Kitchen Display</span>
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] text-[#111827] text-xs font-semibold shadow-subtle transition-colors"
          >
            <Grid3X3 className="w-4 h-4 text-[#0EA5A4]" />
            <span>Floor Plan</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise relative overflow-hidden group hover:shadow-elevated transition-all">
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Revenue</span>
            <span className="w-8 h-8 rounded-xl bg-[#EEF0FF] text-[#635BFF] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-[#111827] tracking-tight">
                {formatCurrency(totalRevenue)}
              </h2>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-bold text-[#16A34A] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
                <span className="text-[11px] text-[#9CA3AF]">vs last week</span>
              </div>
            </div>
            <div className="opacity-90 group-hover:scale-105 transition-transform">
              {renderSparkline([28, 32, 30, 42, 38, 45, 52], '#635BFF')}
            </div>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise relative overflow-hidden group hover:shadow-elevated transition-all">
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Total Orders</span>
            <span className="w-8 h-8 rounded-xl bg-[#E6F6F6] text-[#0EA5A4] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-[#111827] tracking-tight">
                {formatNumber(totalOrdersCount)}
              </h2>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-bold text-[#16A34A] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12.1%
                </span>
                <span className="text-[11px] text-[#9CA3AF]">vs last week</span>
              </div>
            </div>
            <div className="opacity-90 group-hover:scale-105 transition-transform">
              {renderSparkline([40, 48, 45, 55, 62, 59, 72], '#0EA5A4')}
            </div>
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise relative overflow-hidden group hover:shadow-elevated transition-all">
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Avg Order Value</span>
            <span className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#F59E0B] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-[#111827] tracking-tight">
                {formatCurrency(avgOrderValue)}
              </h2>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-bold text-[#16A34A] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +4.2%
                </span>
                <span className="text-[11px] text-[#9CA3AF]">vs last week</span>
              </div>
            </div>
            <div className="opacity-90 group-hover:scale-105 transition-transform">
              {renderSparkline([29, 31, 30, 32, 31, 33, 34], '#F59E0B')}
            </div>
          </div>
        </div>

        {/* Card 4: Net Profit */}
        <div className="p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise relative overflow-hidden group hover:shadow-elevated transition-all">
          <div className="flex items-center justify-between text-[#6B7280] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Net Profit</span>
            <span className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#16A34A] flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <h2 className="text-2xl font-extrabold font-mono text-[#111827] tracking-tight">
                {formatCurrency(netProfit)}
              </h2>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs font-bold text-[#16A34A] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +22.8%
                </span>
                <span className="text-[11px] text-[#9CA3AF]">margin 39.2%</span>
              </div>
            </div>
            <div className="opacity-90 group-hover:scale-105 transition-transform">
              {renderSparkline([12, 14, 13, 16, 18, 17, 21], '#16A34A')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Operations Grid: Revenue Chart + Live Order Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Revenue Chart (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#111827] tracking-tight">
                Hourly Revenue & Peak Traffic
              </h3>
              <p className="text-xs text-[#6B7280]">
                Live sales volume across dinner and lunch shifts
              </p>
            </div>

            {/* Timeframe pill selector */}
            <div className="flex items-center bg-[#F7F8FA] p-1 rounded-xl border border-[#E5E7EB]">
              {(['today', '7d', '30d', 'year'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all',
                    timeframe === t
                      ? 'bg-white text-[#111827] shadow-subtle'
                      : 'text-[#6B7280] hover:text-[#111827]'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Custom SVG Bar Chart with Hover Details */}
          <div className="relative h-60 w-full flex items-end gap-2 pt-8 pb-4">
            {REVENUE_DATA.map((item, idx) => {
              const maxVal = 10000;
              const barHeightPct = (item.amount / maxVal) * 100;
              const isHovered = hoveredPoint === idx;

              return (
                <div
                  key={item.time}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  onMouseEnter={() => setHoveredPoint(idx)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  {/* Floating tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 z-20 px-2.5 py-1.5 rounded-lg bg-[#111827] text-white text-[11px] font-mono shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95">
                      <p className="font-bold">{formatCurrency(item.amount)}</p>
                      <p className="text-[#9CA3AF] text-[10px]">{item.orders} orders</p>
                    </div>
                  )}

                  {/* Animated Bar */}
                  <div
                    style={{ height: `${barHeightPct}%` }}
                    className={cn(
                      'w-full max-w-[28px] rounded-t-md transition-all duration-300',
                      isHovered
                        ? 'bg-[#635BFF] shadow-lg shadow-[#635BFF]/30'
                        : 'bg-[#635BFF]/80 group-hover:bg-[#635BFF]'
                    )}
                  />
                  <span className="text-[10px] text-[#9CA3AF] mt-2 font-mono truncate max-w-full">
                    {item.time.replace(':00', '')}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#635BFF]" />
                <span>Gross Revenue ($)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                <span>Peak Hour: 8:00 PM ($9,480)</span>
              </span>
            </div>
            <span className="text-[11px] font-mono">Real-time sync: Active</span>
          </div>
        </div>

        {/* Live Order Pipeline Funnel & Table Occupancy (1 Column) */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-[#111827] tracking-tight">Live Order Pipeline</h3>
              <span className="text-xs font-semibold text-[#16A34A] bg-[#ECFDF5] px-2 py-0.5 rounded-md">
                Active Funnel
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Operational flow from ticket to expediter
            </p>
          </div>

          {/* Funnel Stages */}
          <div className="space-y-3">
            {[
              { label: 'New Tickets', count: 3, color: 'bg-[#635BFF]', text: 'text-[#635BFF]', bg: 'bg-[#EEF0FF]' },
              { label: 'In Kitchen (Fire)', count: 4, color: 'bg-[#F59E0B]', text: 'text-[#F59E0B]', bg: 'bg-[#FFFBEB]' },
              { label: 'Ready for Service', count: 2, color: 'bg-[#16A34A]', text: 'text-[#16A34A]', bg: 'bg-[#ECFDF5]' },
              { label: 'Out with Courier', count: 2, color: 'bg-[#0EA5A4]', text: 'text-[#0EA5A4]', bg: 'bg-[#E6F6F6]' }
            ].map((stage) => (
              <div key={stage.label} className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={cn('w-2.5 h-2.5 rounded-full', stage.color)} />
                  <span className="text-xs font-semibold text-[#111827]">{stage.label}</span>
                </div>
                <span className={cn('text-xs font-bold font-mono px-2 py-0.5 rounded-md', stage.bg, stage.text)}>
                  {stage.count} tickets
                </span>
              </div>
            ))}
          </div>

          {/* Floor Capacity Meter */}
          <div className="pt-4 border-t border-[#E5E7EB]">
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-semibold text-[#111827]">Dining Room Occupancy</span>
              <span className="font-mono font-bold text-[#635BFF]">{occupiedTables}/{totalTables} Tables ({occupancyPercent}%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                style={{ width: `${occupancyPercent}%` }}
                className="h-full bg-gradient-to-r from-[#635BFF] to-[#0EA5A4] rounded-full transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row: Payment Breakdown & Popular Dishes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#111827] tracking-tight">Sales by Tender Method</h3>
              <p className="text-xs text-[#6B7280]">Payment settlement distribution</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#111827] bg-[#F7F8FA] px-2.5 py-1 rounded-lg border border-[#E5E7EB]">
              $48,290.50 Total
            </span>
          </div>

          <div className="space-y-4">
            {PAYMENT_BREAKDOWN.map((pm) => (
              <div key={pm.method} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#111827]">{pm.method}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#6B7280]">{formatCurrency(pm.amount)}</span>
                    <span className="font-mono font-bold text-[#111827] w-10 text-right">{pm.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F3F4F6] overflow-hidden">
                  <div
                    style={{ width: `${pm.percentage}%`, backgroundColor: pm.color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Dishes Ranked */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#111827] tracking-tight">Top Performing Menu Items</h3>
              <p className="text-xs text-[#6B7280]">High volume and high margin dishes</p>
            </div>
            <button
              onClick={() => setActiveTab('menu')}
              className="text-xs text-[#635BFF] hover:underline font-semibold flex items-center gap-0.5"
            >
              Menu Engineering <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.slice(0, 4).map((dish, i) => (
              <div
                key={dish.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-5 text-center text-xs font-bold text-[#9CA3AF] font-mono">
                    #{i + 1}
                  </span>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#111827] truncate">{dish.name}</p>
                    <p className="text-[11px] text-[#6B7280] capitalize">
                      {dish.category} • ${dish.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold font-mono text-[#111827]">
                    {formatCurrency(dish.price * (32 - i * 5))}
                  </p>
                  <p className="text-[11px] text-[#16A34A] font-medium font-mono">
                    {32 - i * 5} orders
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Recent Orders Table + Low Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#111827] tracking-tight">Recent Orders</h3>
              <p className="text-xs text-[#6B7280]">Latest transactions from dining hall & takeaway</p>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs text-[#635BFF] hover:underline font-semibold flex items-center gap-0.5"
            >
              View all orders <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-3 py-2.5 rounded-l-lg">Order ID</th>
                  <th className="px-3 py-2.5">Table / Channel</th>
                  <th className="px-3 py-2.5">Items</th>
                  <th className="px-3 py-2.5">Total</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 rounded-r-lg text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {orders.slice(0, 5).map((ord) => {
                  const statusBadge: Record<string, string> = {
                    new: 'bg-[#EEF0FF] text-[#635BFF]',
                    preparing: 'bg-[#FFFBEB] text-[#F59E0B]',
                    ready: 'bg-[#ECFDF5] text-[#16A34A]',
                    served: 'bg-[#E6F6F6] text-[#0EA5A4]',
                    completed: 'bg-[#F3F4F6] text-[#374151]'
                  };

                  return (
                    <tr key={ord.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="px-3 py-3 font-mono font-bold text-[#635BFF]">
                        {ord.displayId}
                      </td>
                      <td className="px-3 py-3 font-medium text-[#111827]">
                        {ord.tableName || ord.customerName || 'Takeaway'}
                      </td>
                      <td className="px-3 py-3 text-[#6B7280]">
                        {ord.items.length} items
                      </td>
                      <td className="px-3 py-3 font-mono font-bold text-[#111827]">
                        {formatCurrency(ord.total)}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full capitalize',
                            statusBadge[ord.status] || 'bg-gray-100 text-gray-800'
                          )}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-[#9CA3AF] font-mono text-[11px]">
                        {ord.createdAt}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Inventory Warnings (1 Column) */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <h3 className="text-base font-bold text-[#111827] tracking-tight">Stock Warnings</h3>
              </div>
              <span className="text-xs font-bold text-[#DC2626] bg-[#FEF2F2] px-2 py-0.5 rounded-md">
                {lowStockItems.length} items low
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Automated PAR level monitoring
            </p>
          </div>

          <div className="space-y-3 my-4">
            {lowStockItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">{item.name}</p>
                    <p className="text-[11px] text-[#6B7280]">
                      Supplier: {item.supplierName}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626]">
                    {item.currentStock} {item.unit} left
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#9CA3AF]">PAR: {item.minPar} {item.unit}</span>
                  <button
                    onClick={() => {
                      reorderInventoryItem(item.id, 10);
                      addToast('Reorder PO Generated', `Ordered 10 ${item.unit} of ${item.name}`, 'success');
                    }}
                    className="text-[11px] font-semibold text-[#635BFF] hover:underline"
                  >
                    1-Click Restock →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('inventory')}
            className="w-full py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] transition-colors text-center"
          >
            Manage Full Inventory
          </button>
        </div>
      </div>
    </div>
  );
};
