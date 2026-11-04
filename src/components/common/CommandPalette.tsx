import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  LayoutDashboard,
  Store,
  UtensilsCrossed,
  Grid3X3,
  Receipt,
  BookOpen,
  Boxes,
  Users,
  X,
  ArrowRight
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { NavigationTab } from '../../types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveTab,
    menuItems,
    tables,
    orders,
    openCustomizer
  } = useRestaurant();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const q = query.toLowerCase().trim();

  // Navigation commands
  const pages: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: LayoutDashboard },
    { id: 'pos', label: 'Go to Point of Sale (POS)', icon: Store },
    { id: 'kds', label: 'Go to Kitchen Display (KDS)', icon: UtensilsCrossed },
    { id: 'tables', label: 'Go to Tables & Floor Plan', icon: Grid3X3 },
    { id: 'orders', label: 'Go to Orders List', icon: Receipt },
    { id: 'menu', label: 'Go to Menu Management', icon: BookOpen },
    { id: 'inventory', label: 'Go to Inventory & Stock', icon: Boxes },
    { id: 'customers', label: 'Go to Customers & VIP CRM', icon: Users }
  ];

  const filteredPages = pages.filter((p) => p.label.toLowerCase().includes(q));

  const filteredDishes = menuItems.filter(
    (m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
  );

  const filteredTables = tables.filter(
    (t) => t.name.toLowerCase().includes(q) || t.number.toLowerCase().includes(q)
  );

  const filteredOrders = orders.filter(
    (o) =>
      o.displayId.toLowerCase().includes(q) ||
      (o.customerName && o.customerName.toLowerCase().includes(q))
  );

  const handleSelectPage = (tab: NavigationTab) => {
    setActiveTab(tab);
    setIsCommandPaletteOpen(false);
  };

  const handleSelectDish = (dish: (typeof menuItems)[0]) => {
    setActiveTab('pos');
    openCustomizer(dish);
    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#111827]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E5E7EB]">
          <Search className="w-5 h-5 text-[#635BFF]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search dishes, tables, orders..."
            className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9CA3AF] hover:text-[#111827] text-xs p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-[10px] uppercase font-mono px-2 py-1 bg-[#F3F4F6] text-[#6B7280] rounded border border-[#E5E7EB] cursor-pointer hover:bg-[#E5E7EB]"
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Dishes section */}
          {filteredDishes.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                Menu Dishes ({filteredDishes.length})
              </p>
              <div className="space-y-0.5">
                {filteredDishes.slice(0, 4).map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => handleSelectDish(dish)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#EEF0FF] group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#111827] group-hover:text-[#635BFF]">
                          {dish.name}
                        </p>
                        <p className="text-[11px] text-[#6B7280]">
                          ${dish.price.toFixed(2)} • {dish.category}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#635BFF] font-medium opacity-0 group-hover:opacity-100 flex items-center gap-1">
                      Add to Ticket <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Pages */}
          {filteredPages.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                Navigation
              </p>
              <div className="space-y-0.5">
                {filteredPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <button
                      key={page.id}
                      onClick={() => handleSelectPage(page.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#F3F4F6] text-xs font-medium text-[#111827] group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#6B7280] group-hover:text-[#635BFF]" />
                        <span>{page.label}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 text-[#9CA3AF] opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tables section */}
          {filteredTables.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                Tables
              </p>
              <div className="space-y-0.5">
                {filteredTables.slice(0, 3).map((tbl) => (
                  <button
                    key={tbl.id}
                    onClick={() => {
                      setActiveTab('tables');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#F3F4F6] text-xs font-medium text-[#111827] group transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#635BFF]" />
                      <span>{tbl.name} ({tbl.section})</span>
                      <span className="text-[11px] text-[#6B7280] font-normal">
                        Status: {tbl.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6B7280]">View Floor Plan →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Orders section */}
          {filteredOrders.length > 0 && (
            <div>
              <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                Active Orders
              </p>
              <div className="space-y-0.5">
                {filteredOrders.slice(0, 3).map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => {
                      setActiveTab('orders');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-[#F3F4F6] text-xs font-medium text-[#111827] group transition-colors"
                  >
                    <div>
                      <span className="font-bold text-[#635BFF]">{ord.displayId}</span>
                      <span className="text-[#6B7280] ml-2">{ord.customerName || ord.tableName}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#111827]">
                      ${ord.total.toFixed(2)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredDishes.length === 0 &&
            filteredPages.length === 0 &&
            filteredTables.length === 0 &&
            filteredOrders.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-xs text-[#6B7280]">No matching dishes, commands, or orders found.</p>
              </div>
            )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between text-[11px] text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono px-1 py-0.5 bg-white border border-[#E5E7EB] rounded">↑↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono px-1 py-0.5 bg-white border border-[#E5E7EB] rounded">↵</kbd> to select
            </span>
          </div>
          <span className="text-[10px] text-[#9CA3AF]">RestaurantOS Enterprise Spotlight</span>
        </div>
      </div>
    </div>
  );
};
