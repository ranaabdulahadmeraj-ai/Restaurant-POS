import React, { useState } from 'react';
import {
  X,
  Users,
  Clock,
  Receipt,
  Store,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { TableStatus } from '../../types';
import { cn, formatCurrency } from '../../utils';

export const TableDetailModal: React.FC = () => {
  const {
    activeTableDetail,
    setActiveTableDetail,
    updateTableStatus,
    settleTableBill,
    seatParty,
    orders,
    setActiveTab,
    setSelectedTableForOrder
  } = useRestaurant();

  if (!activeTableDetail) return null;

  const [partySize, setPartySize] = useState(activeTableDetail.capacity);
  const activeOrder = orders.find((o) => o.id === activeTableDetail.currentOrderId);

  const handleOpenInPOS = () => {
    setSelectedTableForOrder(activeTableDetail);
    setActiveTableDetail(null);
    setActiveTab('pos');
  };

  const statusColors: Record<TableStatus, { bg: string; text: string; dot: string }> = {
    available: { bg: 'bg-[#ECFDF5]', text: 'text-[#16A34A]', dot: 'bg-[#16A34A]' },
    occupied: { bg: 'bg-[#EEF0FF]', text: 'text-[#635BFF]', dot: 'bg-[#635BFF]' },
    reserved: { bg: 'bg-[#FFFBEB]', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
    cleaning: { bg: 'bg-[#E6F6F6]', text: 'text-[#0EA5A4]', dot: 'bg-[#0EA5A4]' }
  };

  const currentConfig = statusColors[activeTableDetail.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-[#F7F8FA] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center font-bold text-[#111827] shadow-subtle">
              {activeTableDetail.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#111827]">{activeTableDetail.name}</h3>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1.5',
                    currentConfig.bg,
                    currentConfig.text
                  )}
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full', currentConfig.dot)} />
                  {activeTableDetail.status}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280]">
                {activeTableDetail.section.toUpperCase()} Zone • Max {activeTableDetail.capacity} Guests
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTableDetail(null)}
            className="w-8 h-8 rounded-lg hover:bg-[#E5E7EB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Status Quick Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
              Update Table Status
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['available', 'occupied', 'reserved', 'cleaning'] as TableStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => updateTableStatus(activeTableDetail.id, st)}
                  className={cn(
                    'py-2 px-1 text-center rounded-xl text-xs font-semibold capitalize border transition-all',
                    activeTableDetail.status === st
                      ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                      : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* If Table is Occupied, display Active Order & Check */}
          {activeTableDetail.status === 'occupied' && (
            <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#635BFF]" />
                  <span className="text-xs font-bold text-[#111827]">Active Table Check</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#111827]">
                  {formatCurrency(activeTableDetail.currentOrderTotal || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Seated: {activeTableDetail.seatedAt || '45m ago'}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Party: {activeTableDetail.guestCount || 2} guests
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> {activeTableDetail.serverName || 'Staff'}
                </span>
              </div>

              {activeOrder && activeOrder.items.length > 0 && (
                <div className="border-t border-[#E5E7EB] pt-2 space-y-1">
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                    Ordered Dishes
                  </p>
                  {activeOrder.items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-xs text-[#374151]">
                      <span>{item.quantity}x {item.item.name}</span>
                      <span className="font-mono">${item.itemTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* If Table is Available, allow Quick Seat Guests */}
          {activeTableDetail.status === 'available' && (
            <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#16A34A]/20 space-y-3">
              <span className="text-xs font-bold text-[#16A34A]">Seat Walk-In Party</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {[1, 2, 4, 6, 8].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all',
                        partySize === size
                          ? 'bg-[#16A34A] text-white shadow-xs'
                          : 'bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6]'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    seatParty(activeTableDetail.id, partySize);
                    setActiveTableDetail(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#16A34A] text-white text-xs font-semibold hover:bg-[#15803D] transition-colors"
                >
                  Seat {partySize} Guests
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between gap-3">
          {activeTableDetail.status === 'occupied' && (
            <button
              onClick={() => {
                settleTableBill(activeTableDetail.id);
                setActiveTableDetail(null);
              }}
              className="py-2.5 px-4 rounded-xl border border-[#DC2626]/30 text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-semibold transition-colors"
            >
              Settle & Clear Table
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleOpenInPOS}
              className="py-2.5 px-4 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Open in POS Terminal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
