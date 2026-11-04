import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Filter,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Order, OrderStatus } from '../types';
import { cn } from '../utils';

export const KitchenDisplayView: React.FC = () => {
  const { orders, bumpKitchenOrder, toggleOrderItemDone, updateOrderStatus } = useRestaurant();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stationFilter, setStationFilter] = useState<string>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active kitchen tickets (new, preparing, ready)
  const kitchenOrders = orders.filter(
    (o) => o.status === 'new' || o.status === 'preparing' || o.status === 'ready'
  );

  const getTimerBadge = (minutes: number) => {
    if (minutes > 18) {
      return {
        bg: 'bg-[#DC2626] text-white animate-pulse',
        icon: AlertTriangle,
        label: `${minutes}m (OVERDUE)`
      };
    }
    if (minutes > 10) {
      return {
        bg: 'bg-[#F59E0B] text-black',
        icon: Clock,
        label: `${minutes}m (RUSH)`
      };
    }
    return {
      bg: 'bg-[#16A34A] text-white',
      icon: Clock,
      label: `${minutes}m`
    };
  };

  return (
    <div
      className={cn(
        'min-h-[calc(100vh-64px)] p-6 transition-colors duration-200 select-none flex flex-col',
        isDarkMode ? 'bg-[#0B0F17] text-white' : 'bg-[#F7F8FA] text-[#111827]'
      )}
    >
      {/* Top KDS Controls Bar */}
      <div
        className={cn(
          'p-4 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4 border',
          isDarkMode
            ? 'bg-[#111827] border-[#1F2937]'
            : 'bg-white border-[#E5E7EB] shadow-subtle'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#635BFF] text-white flex items-center justify-center shadow-lg shadow-[#635BFF]/30">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight">Kitchen Expediter Screen</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A]/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" /> Live Sync
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF]">
              {kitchenOrders.length} active kitchen tickets • Average ticket time: 11.4 mins
            </p>
          </div>
        </div>

        {/* Station Filters & Controls */}
        <div className="flex items-center gap-3">
          {/* Station pills */}
          <div
            className={cn(
              'flex items-center gap-1 p-1 rounded-xl border text-xs',
              isDarkMode ? 'bg-[#1F2937] border-[#374151]' : 'bg-[#F7F8FA] border-[#E5E7EB]'
            )}
          >
            {[
              { id: 'all', label: 'All Stations' },
              { id: 'grill', label: 'Grill & Saute' },
              { id: 'woodfire', label: 'Woodfired Pizza' },
              { id: 'expo', label: 'Expediter (Pass)' }
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStationFilter(st.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg font-semibold transition-all',
                  stationFilter === st.id
                    ? 'bg-[#635BFF] text-white shadow-xs'
                    : isDarkMode
                    ? 'text-[#9CA3AF] hover:text-white'
                    : 'text-[#6B7280] hover:text-[#111827]'
                )}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sound Alert Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Kitchen chime enabled' : 'Kitchen chime muted'}
            className={cn(
              'p-2.5 rounded-xl border transition-colors',
              isDarkMode
                ? 'bg-[#1F2937] border-[#374151] text-[#9CA3AF] hover:text-white'
                : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            )}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#16A34A]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to High-Contrast Dark Theme'}
            className={cn(
              'p-2.5 rounded-xl border transition-colors',
              isDarkMode
                ? 'bg-[#1F2937] border-[#374151] text-amber-400 hover:text-white'
                : 'bg-white border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
            )}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Grid of Kitchen Order Tickets */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 flex-1">
        {kitchenOrders.map((ord) => {
          const timer = getTimerBadge(ord.elapsedMinutes);
          const TimerIcon = timer.icon;
          const completedCount = ord.completedItems?.length || 0;
          const totalItemsCount = ord.items.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div
              key={ord.id}
              className={cn(
                'rounded-2xl border flex flex-col justify-between overflow-hidden transition-all shadow-md',
                isDarkMode
                  ? 'bg-[#111827] border-[#1F2937] hover:border-[#374151]'
                  : 'bg-white border-[#E5E7EB] hover:shadow-elevated',
                ord.status === 'ready' && 'ring-2 ring-[#16A34A]'
              )}
            >
              {/* Ticket Header */}
              <div
                className={cn(
                  'p-4 border-b flex items-start justify-between gap-3',
                  isDarkMode ? 'border-[#1F2937] bg-[#161F30]' : 'border-[#E5E7EB] bg-[#F7F8FA]'
                )}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-extrabold text-[#635BFF]">
                      {ord.displayId}
                    </span>
                    <span className="font-bold text-sm">
                      {ord.tableName || ord.customerName || 'Takeaway'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#9CA3AF]">
                    <span>Server: {ord.serverName}</span>
                    <span>•</span>
                    <span>{ord.createdAt}</span>
                  </div>
                </div>

                {/* Priority Flags & Timer */}
                <div className="flex flex-col items-end gap-1.5">
                  <span
                    className={cn(
                      'text-xs font-mono font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-xs',
                      timer.bg
                    )}
                  >
                    <TimerIcon className="w-3.5 h-3.5" />
                    <span>{timer.label}</span>
                  </span>

                  {ord.isVip && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      VIP Table
                    </span>
                  )}
                  {ord.isRush && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      Rush
                    </span>
                  )}
                </div>
              </div>

              {/* Items List (Checkable for Line Cooks) */}
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                {ord.items.map((cartItem) => {
                  const isChecked = ord.completedItems?.includes(cartItem.cartItemId);

                  return (
                    <div
                      key={cartItem.cartItemId}
                      onClick={() => toggleOrderItemDone(ord.id, cartItem.cartItemId)}
                      className={cn(
                        'p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start justify-between gap-3',
                        isChecked
                          ? isDarkMode
                            ? 'bg-[#1F2937]/40 border-[#374151]/50 text-gray-500 line-through'
                            : 'bg-[#F3F4F6] border-[#E5E7EB] text-gray-400 line-through'
                          : isDarkMode
                          ? 'bg-[#1F2937]/70 border-[#374151] hover:border-[#635BFF] text-white'
                          : 'bg-[#F9FAFB] border-[#E5E7EB] hover:border-[#635BFF] text-[#111827]'
                      )}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <div
                          className={cn(
                            'w-5 h-5 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors',
                            isChecked
                              ? 'bg-[#16A34A] border-[#16A34A] text-white'
                              : 'border-gray-500 bg-transparent'
                          )}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono font-bold text-sm text-[#635BFF]">
                              {cartItem.quantity}x
                            </span>
                            <span className="font-bold text-xs leading-tight">
                              {cartItem.item.name}
                            </span>
                          </div>

                          {cartItem.selectedVariant && (
                            <p className="text-[11px] font-semibold text-[#0EA5A4] mt-0.5">
                              → {cartItem.selectedVariant.name}
                            </p>
                          )}

                          {cartItem.selectedExtras.length > 0 && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              + {cartItem.selectedExtras.map((e) => e.name).join(', ')}
                            </p>
                          )}

                          {cartItem.specialInstructions && (
                            <div className="mt-1 p-1.5 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/30 text-[#F59E0B] text-[10px] font-semibold">
                              Note: {cartItem.specialInstructions}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="text-[10px] text-gray-400 font-mono">
                        {cartItem.item.prepTimeMinutes}m
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons: Bump Order / Status Progression */}
              <div
                className={cn(
                  'p-3 border-t flex items-center justify-between gap-2',
                  isDarkMode ? 'border-[#1F2937] bg-[#161F30]' : 'border-[#E5E7EB] bg-[#F7F8FA]'
                )}
              >
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="font-mono">{completedCount}/{ord.items.length} dishes done</span>
                </div>

                <div className="flex items-center gap-2">
                  {ord.status === 'ready' ? (
                    <button
                      onClick={() => bumpKitchenOrder(ord.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold shadow-md shadow-[#16A34A]/30 flex items-center gap-1.5 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Expedite & Serve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => bumpKitchenOrder(ord.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-bold shadow-md shadow-[#635BFF]/30 flex items-center gap-1.5 transition-all"
                    >
                      <span>Bump Ticket →</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {kitchenOrders.length === 0 && (
          <div className="col-span-full h-80 flex flex-col items-center justify-center text-center p-8">
            <CheckCircle2 className="w-12 h-12 text-[#16A34A] mb-3" />
            <h3 className="text-lg font-bold">Kitchen Rail All Clear</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm">
              All pending food tickets have been prepared, plated, and served to dining guests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
