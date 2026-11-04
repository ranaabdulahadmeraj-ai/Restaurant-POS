import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Crown,
  Heart,
  Calendar,
  AlertCircle,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Customer } from '../types';
import { formatCurrency, cn } from '../utils';

export const CustomersView: React.FC = () => {
  const { customers, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const filtered = customers.filter((c) => {
    const matchesTier = tierFilter === 'all' || c.vipTier === tierFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.favoriteItem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const totalVipSpend = customers.reduce((sum, c) => sum + c.totalSpend, 0);

  const tierBadges: Record<string, { bg: string; text: string; border: string }> = {
    'Black Diamond': { bg: 'bg-[#111827]', text: 'text-white', border: 'border-purple-500/40' },
    'Gold VIP': { bg: 'bg-[#FFFBEB]', text: 'text-[#D97706]', border: 'border-[#F59E0B]/30' },
    'Silver VIP': { bg: 'bg-[#F3F4F6]', text: 'text-[#4B5563]', border: 'border-[#D1D5DB]' },
    'Regular': { bg: 'bg-[#EEF0FF]', text: 'text-[#635BFF]', border: 'border-[#635BFF]/30' }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Guest CRM & VIP Loyalty Directory
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Dine-in patron history, lifetime spend tracking, seating preferences, and allergy notes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Tracked Guest Spend
            </span>
            <span className="text-sm font-bold font-mono text-[#111827]">
              {formatCurrency(totalVipSpend)}
            </span>
          </div>

          <button
            onClick={() => addToast('VIP Profile Created', 'Guest profile added to CRM database.', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Guest Profile</span>
          </button>
        </div>
      </div>

      {/* Search and Tier Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guest name, email, or favorite dish..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'Black Diamond', 'Gold VIP', 'Silver VIP', 'Regular'].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                tierFilter === t
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((guest) => {
          const badge = tierBadges[guest.vipTier] || tierBadges['Regular'];

          return (
            <div
              key={guest.id}
              className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-enterprise hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#EEF0FF] text-[#635BFF] flex items-center justify-center font-bold text-base shadow-xs">
                      {guest.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#111827]">{guest.name}</h3>
                      <p className="text-[11px] text-[#6B7280]">{guest.email}</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border',
                      badge.bg,
                      badge.text,
                      badge.border
                    )}
                  >
                    {guest.vipTier}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3F4F6] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Lifetime Spend:</span>
                    <span className="font-mono font-bold text-[#111827]">
                      {formatCurrency(guest.totalSpend)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Total Visits:</span>
                    <span className="font-semibold text-[#111827]">{guest.totalVisits} reservations</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Last Visit:</span>
                    <span className="font-medium text-[#111827]">{guest.lastVisit}</span>
                  </div>

                  <div className="pt-2 border-t border-[#F3F4F6]">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider block mb-1">
                      Favorite Dish & Wine
                    </span>
                    <p className="text-xs text-[#111827] font-medium italic">
                      "{guest.favoriteItem}"
                    </p>
                  </div>

                  {guest.dietaryNotes.length > 0 && (
                    <div className="pt-2 border-t border-[#F3F4F6]">
                      <span className="text-[10px] uppercase font-bold text-[#DC2626] tracking-wider block mb-1">
                        Dietary & Seating Notes
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {guest.dietaryNotes.map((note) => (
                          <span
                            key={note}
                            className="text-[10px] font-medium bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20 px-2 py-0.5 rounded"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] text-[#6B7280] font-mono">{guest.phone}</span>
                <button
                  onClick={() => addToast('Reservation Initiated', `Opening booking calendar for ${guest.name}.`, 'info')}
                  className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
                >
                  Book Table →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
