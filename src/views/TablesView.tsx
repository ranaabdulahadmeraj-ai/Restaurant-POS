import React, { useState } from 'react';
import {
  Grid3X3,
  Users,
  DollarSign,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Plus,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { FloorSection, Table, TableStatus } from '../types';
import { formatCurrency, cn } from '../utils';

export const TablesView: React.FC = () => {
  const {
    tables,
    setActiveTableDetail,
    setSelectedTableForOrder,
    setActiveTab
  } = useRestaurant();

  const [activeSection, setActiveSection] = useState<FloorSection | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<TableStatus | 'all'>('all');

  // Filtered tables
  const displayedTables = tables.filter((t) => {
    const matchesSection = activeSection === 'all' || t.section === activeSection;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSection && matchesStatus;
  });

  // Aggregated Floor Stats
  const totalTables = tables.length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;
  const availableCount = tables.filter((t) => t.status === 'available').length;
  const reservedCount = tables.filter((t) => t.status === 'reserved').length;
  const cleaningCount = tables.filter((t) => t.status === 'cleaning').length;
  const totalSeatedGuests = tables.reduce((sum, t) => sum + (t.guestCount || 0), 0);
  const openTabsRevenue = tables.reduce((sum, t) => sum + (t.currentOrderTotal || 0), 0);

  const statusConfig: Record<
    TableStatus,
    { label: string; bg: string; text: string; border: string; dot: string; glow: string }
  > = {
    available: {
      label: 'Available',
      bg: 'bg-[#ECFDF5]',
      text: 'text-[#16A34A]',
      border: 'border-[#16A34A]/30',
      dot: 'bg-[#16A34A]',
      glow: 'shadow-[#16A34A]/10'
    },
    occupied: {
      label: 'Occupied',
      bg: 'bg-[#EEF0FF]',
      text: 'text-[#635BFF]',
      border: 'border-[#635BFF]/30',
      dot: 'bg-[#635BFF]',
      glow: 'shadow-[#635BFF]/10'
    },
    reserved: {
      label: 'Reserved',
      bg: 'bg-[#FFFBEB]',
      text: 'text-[#F59E0B]',
      border: 'border-[#F59E0B]/30',
      dot: 'bg-[#F59E0B]',
      glow: 'shadow-[#F59E0B]/10'
    },
    cleaning: {
      label: 'Cleaning',
      bg: 'bg-[#E6F6F6]',
      text: 'text-[#0EA5A4]',
      border: 'border-[#0EA5A4]/30',
      dot: 'bg-[#0EA5A4]',
      glow: 'shadow-[#0EA5A4]/10'
    }
  };

  const sections: { id: FloorSection | 'all'; label: string }[] = [
    { id: 'all', label: 'All Floor Sections' },
    { id: 'main', label: 'Main Dining Room' },
    { id: 'terrace', label: 'Garden Patio Cabanas' },
    { id: 'vip', label: 'Salon Privé Mezzanine' },
    { id: 'bar', label: 'Cocktail Bar & Lounge' }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header & Floor Aggregates */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#635BFF] bg-[#EEF0FF] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Grid3X3 className="w-3.5 h-3.5" /> Interactive Floor Operations
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Dining Floor Management
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Real-time table turnover, party tracking, and guest tab settlement
          </p>
        </div>

        {/* Aggregate KPI chips */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Seated Guests
            </span>
            <span className="text-sm font-bold font-mono text-[#111827]">
              {totalSeatedGuests} Guests
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Open Floor Tabs
            </span>
            <span className="text-sm font-bold font-mono text-[#635BFF]">
              {formatCurrency(openTabsRevenue)}
            </span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Occupancy
            </span>
            <span className="text-sm font-bold font-mono text-[#16A34A]">
              {Math.round((occupiedCount / totalTables) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Section Selector bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        {/* Section tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                activeSection === sec.id
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Status legend & filter */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['all', 'available', 'occupied', 'reserved', 'cleaning'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize flex items-center gap-1.5 border transition-all',
                statusFilter === st
                  ? 'border-[#111827] bg-[#111827] text-white shadow-xs'
                  : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F9FAFB]'
              )}
            >
              {st !== 'all' && (
                <span className={cn('w-2 h-2 rounded-full', statusConfig[st].dot)} />
              )}
              <span>{st}</span>
              {st === 'available' && <span className="text-[10px] opacity-75">({availableCount})</span>}
              {st === 'occupied' && <span className="text-[10px] opacity-75">({occupiedCount})</span>}
              {st === 'reserved' && <span className="text-[10px] opacity-75">({reservedCount})</span>}
              {st === 'cleaning' && <span className="text-[10px] opacity-75">({cleaningCount})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {displayedTables.map((tbl) => {
          const cfg = statusConfig[tbl.status];
          const isOccupied = tbl.status === 'occupied';

          return (
            <div
              key={tbl.id}
              onClick={() => setActiveTableDetail(tbl)}
              className={cn(
                'p-5 rounded-2xl border bg-white cursor-pointer select-none transition-all flex flex-col justify-between shadow-enterprise hover:shadow-elevated hover:-translate-y-0.5 group relative overflow-hidden',
                cfg.border
              )}
            >
              {/* Top Row: Table identifier & Status badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-xs transition-transform group-hover:scale-105',
                      tbl.shape === 'round' ? 'rounded-full' : 'rounded-xl',
                      cfg.bg,
                      cfg.text
                    )}
                  >
                    {tbl.number}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{tbl.name}</h4>
                    <p className="text-[11px] text-[#6B7280] capitalize">
                      {tbl.section} Zone • Cap: {tbl.capacity}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5',
                    cfg.bg,
                    cfg.text
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                  {cfg.label}
                </span>
              </div>

              {/* Middle Row: Seating info or running bill */}
              <div className="my-5 py-3 border-y border-[#F3F4F6] space-y-1.5">
                {isOccupied ? (
                  <>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#6B7280]">Running Check:</span>
                      <span className="font-mono font-extrabold text-[#111827] text-sm">
                        {formatCurrency(tbl.currentOrderTotal || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#635BFF]" /> {tbl.guestCount} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#0EA5A4]" /> {tbl.seatedAt}
                      </span>
                    </div>
                  </>
                ) : tbl.status === 'reserved' ? (
                  <div className="text-xs text-[#F59E0B] font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tbl.seatedAt || 'Reserved 7:30 PM'}</span>
                  </div>
                ) : tbl.status === 'cleaning' ? (
                  <div className="text-xs text-[#0EA5A4] font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Sanitizing for next party</span>
                  </div>
                ) : (
                  <div className="text-xs text-[#16A34A] font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Ready for immediate seating</span>
                  </div>
                )}
              </div>

              {/* Bottom Row: Quick actions */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#9CA3AF] text-[11px]">
                  {tbl.serverName ? `Server: ${tbl.serverName}` : 'No server'}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTableForOrder(tbl);
                    setActiveTab('pos');
                  }}
                  className="text-[#635BFF] font-semibold flex items-center gap-1 hover:underline"
                >
                  POS <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
