import React, { useState } from 'react';
import {
  Search,
  Bell,
  Plus,
  Command,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Flame,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { cn } from '../../utils';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeBranch,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    setIsCommandPaletteOpen
  } = useRestaurant();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Map active tab to human readable breadcrumb
  const pageTitles: Record<string, string> = {
    dashboard: 'Operations Dashboard',
    pos: 'Point of Sale Terminal',
    orders: 'Live Orders Management',
    kds: 'Kitchen Display System (KDS)',
    tables: 'Floor Plan & Table Management',
    menu: 'Menu Engineering & Dishes',
    inventory: 'Stock & Inventory Control',
    suppliers: 'Supplier & Vendor Accounts',
    customers: 'Guest Loyalty & CRM',
    delivery: 'Live Delivery Dispatcher',
    employees: 'Staff Roster & Scheduling',
    expenses: 'Operational Expenses & P&L',
    reports: 'Financial & Sales Analytics',
    settings: 'System Configuration'
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Left: Breadcrumbs & Page title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <span className="hover:text-[#111827] cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            RestaurantOS
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <span className="font-semibold text-[#111827] bg-[#F3F4F6] px-2 py-0.5 rounded-md">
            {pageTitles[activeTab] || 'Dashboard'}
          </span>
        </div>

        {/* Live Service Pill */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#16A34A]/20 text-[#16A34A] text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
          <span>Dinner Service Live</span>
          <span className="text-[#6B7280]">•</span>
          <span className="font-mono text-[11px] text-[#374151]">{currentDate}</span>
        </div>
      </div>

      {/* Right: Actions, Search, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* Global Search Button / Cmd+K trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#F7F8FA] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs text-[#6B7280] hover:text-[#111827] transition-all shadow-subtle group"
        >
          <Search className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#635BFF]" />
          <span className="hidden sm:inline">Search orders, dishes, guests...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[#6B7280] bg-white border border-[#E5E7EB] rounded shadow-xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Quick New POS Ticket Button */}
        {activeTab !== 'pos' && (
          <button
            onClick={() => setActiveTab('pos')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-sm shadow-[#635BFF]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>POS Ticket</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors border border-transparent hover:border-[#E5E7EB]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl border border-[#E5E7EB] shadow-dropdown z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-[#F7F8FA] border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#111827]">Live Notifications</h4>
                  {unreadNotificationsCount > 0 && (
                    <span className="text-[10px] font-bold bg-[#635BFF] text-white px-1.5 py-0.5 rounded-full">
                      {unreadNotificationsCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-[11px] text-[#635BFF] hover:underline font-medium"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#F3F4F6]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={cn(
                      'p-3 hover:bg-[#F9FAFB] cursor-pointer transition-colors flex items-start gap-3',
                      !notif.read ? 'bg-[#EEF0FF]/30' : ''
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'urgent' && <AlertTriangle className="w-4 h-4 text-[#DC2626]" />}
                      {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />}
                      {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />}
                      {notif.type === 'info' && <Info className="w-4 h-4 text-[#635BFF]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-[#111827] truncate">{notif.title}</p>
                        <span className="text-[10px] text-[#9CA3AF] shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-[#6B7280] mt-0.5 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-[#F7F8FA] border-t border-[#E5E7EB] text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    setActiveTab('orders');
                  }}
                  className="text-xs text-[#635BFF] hover:underline font-semibold"
                >
                  View all system logs & reports →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Branch Indicator Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[#E5E7EB]">
          <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] flex items-center justify-center text-[#111827] font-semibold text-xs border border-[#E5E7EB]">
            NYC
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-semibold text-[#111827] truncate max-w-[120px]">
              {activeBranch.name}
            </span>
            <span className="text-[10px] text-[#16A34A] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
