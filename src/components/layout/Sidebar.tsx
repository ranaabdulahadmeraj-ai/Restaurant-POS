import React from 'react';
import {
  LayoutDashboard,
  Store,
  Receipt,
  UtensilsCrossed,
  Grid3X3,
  BookOpen,
  Boxes,
  Truck,
  Users,
  Bike,
  UserCheck,
  Wallet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { NavigationTab } from '../../types';
import { cn } from '../../utils';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  section?: 'operations' | 'management' | 'finance' | 'system';
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    toggleSidebar,
    orders,
    inventory,
    activeBranch,
    branches,
    setActiveBranch
  } = useRestaurant();

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = React.useState(false);

  // Dynamic badge counts
  const liveKitchenOrdersCount = orders.filter(
    (o) => o.status === 'new' || o.status === 'preparing'
  ).length;

  const lowStockCount = inventory.filter(
    (i) => i.status === 'low' || i.status === 'critical'
  ).length;

  const navItems: NavItem[] = [
    // Operations
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'operations' },
    { id: 'pos', label: 'Point of Sale', icon: Store, badge: 'Live POS', badgeColor: 'bg-[#635BFF]', section: 'operations' },
    { id: 'orders', label: 'Orders', icon: Receipt, badge: orders.length, section: 'operations' },
    {
      id: 'kds',
      label: 'Kitchen Display',
      icon: UtensilsCrossed,
      badge: liveKitchenOrdersCount > 0 ? liveKitchenOrdersCount : undefined,
      badgeColor: 'bg-[#F59E0B]',
      section: 'operations'
    },
    { id: 'tables', label: 'Tables', icon: Grid3X3, section: 'operations' },

    // Management
    { id: 'menu', label: 'Menu Management', icon: BookOpen, section: 'management' },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Boxes,
      badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
      badgeColor: 'bg-[#DC2626]',
      section: 'management'
    },
    { id: 'suppliers', label: 'Suppliers', icon: Truck, section: 'management' },
    { id: 'customers', label: 'Customers', icon: Users, section: 'management' },
    { id: 'delivery', label: 'Delivery', icon: Bike, badge: '3 live', badgeColor: 'bg-[#0EA5A4]', section: 'management' },

    // Finance & Team
    { id: 'employees', label: 'Employees', icon: UserCheck, section: 'finance' },
    { id: 'expenses', label: 'Expenses', icon: Wallet, section: 'finance' },
    { id: 'reports', label: 'Reports', icon: BarChart3, section: 'finance' },

    // System
    { id: 'settings', label: 'Settings', icon: Settings, section: 'system' }
  ];

  return (
    <aside
      className={cn(
        'relative bg-[#111827] text-[#9CA3AF] flex flex-col border-r border-[#1F2937] transition-all duration-300 ease-in-out select-none z-30 shrink-0 h-screen sticky top-0',
        isSidebarCollapsed ? 'w-[74px]' : 'w-[264px]'
      )}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[#1F2937]/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#635BFF] to-[#0EA5A4] flex items-center justify-center shrink-0 shadow-lg shadow-[#635BFF]/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-[15px] tracking-tight">RestaurantOS</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#635BFF]/20 text-[#635BFF] border border-[#635BFF]/30">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-[#6B7280] font-medium truncate">Enterprise Platform</span>
            </div>
          )}
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={toggleSidebar}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-7 h-7 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-[#9CA3AF] hover:text-white flex items-center justify-center transition-colors"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Branch Selector Pill */}
      {!isSidebarCollapsed && (
        <div className="px-3 pt-3 pb-1">
          <div className="relative">
            <button
              onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#1F2937]/60 hover:bg-[#1F2937] border border-[#374151]/50 text-left transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">{activeBranch.name}</p>
                  <p className="text-[10px] text-[#9CA3AF] truncate">Dinner Service • Active</p>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B7280]" />
            </button>

            {isBranchDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 py-1 rounded-xl bg-[#1F2937] border border-[#374151] shadow-2xl z-50">
                <p className="px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-[#6B7280]">
                  Select Location
                </p>
                {branches.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setActiveBranch(b);
                      setIsBranchDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#374151]/60 transition-colors',
                      activeBranch.id === b.id ? 'text-white font-medium bg-[#374151]/40' : 'text-[#9CA3AF]'
                    )}
                  >
                    <span className="truncate">{b.name}</span>
                    {activeBranch.id === b.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#635BFF]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Links Scrollable Area */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          // Section headers
          const showSectionHeader =
            !isSidebarCollapsed &&
            (index === 0 ||
              navItems[index - 1].section !== item.section);

          return (
            <React.Fragment key={item.id}>
              {showSectionHeader && (
                <div className="pt-3 pb-1 px-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    {item.section}
                  </p>
                </div>
              )}

              <button
                onClick={() => setActiveTab(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
                  isActive
                    ? 'bg-[#635BFF] text-white shadow-md shadow-[#635BFF]/30 font-semibold'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0 transition-transform duration-150 group-hover:scale-105',
                    isActive ? 'text-white' : 'text-[#9CA3AF] group-hover:text-white'
                  )}
                />

                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}

                {!isSidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full text-white shrink-0',
                      item.badgeColor || (isActive ? 'bg-white/20' : 'bg-[#1F2937] text-[#9CA3AF]')
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed dot badge */}
                {isSidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={cn(
                      'absolute top-2 right-2 w-2 h-2 rounded-full',
                      item.badgeColor || 'bg-[#635BFF]'
                    )}
                  />
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      {/* User Profile Card at Bottom */}
      <div className="p-3 border-t border-[#1F2937] bg-[#111827]">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-xl hover:bg-[#1F2937] cursor-pointer transition-colors',
            isSidebarCollapsed ? 'justify-center' : ''
          )}
        >
          <div className="relative shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Marco Silva"
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#635BFF]/40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#16A34A] rounded-full ring-2 ring-[#111827]" />
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate">Marco Silva</span>
              <span className="text-[11px] text-[#6B7280] truncate">General Manager</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
