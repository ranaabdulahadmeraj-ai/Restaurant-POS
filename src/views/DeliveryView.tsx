import React, { useState } from 'react';
import {
  Bike,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { formatCurrency, cn } from '../utils';

export const DeliveryView: React.FC = () => {
  const { deliveryOrders, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = deliveryOrders.filter(
    (d) =>
      d.displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.courier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Live Delivery & Courier Dispatcher
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Real-time delivery routing across DoorDash Drive, Uber Direct, and in-house fleet couriers
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECFDF5] border border-[#16A34A]/20 text-[#16A34A] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
          <span>Fleet Dispatch Online</span>
        </div>
      </div>

      {/* Grid of Delivery Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((del) => {
          const isDelivered = del.status === 'delivered';
          const isPickedUp = del.status === 'picked_up';

          return (
            <div
              key={del.id}
              className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-enterprise hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#635BFF] bg-[#EEF0FF] px-2 py-0.5 rounded">
                      {del.displayId}
                    </span>
                    <h3 className="text-base font-bold text-[#111827] mt-1.5">
                      {del.customerName}
                    </h3>
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider',
                      isDelivered
                        ? 'bg-[#ECFDF5] text-[#16A34A]'
                        : isPickedUp
                        ? 'bg-[#E6F6F6] text-[#0EA5A4]'
                        : 'bg-[#FFFBEB] text-[#F59E0B]'
                    )}
                  >
                    {del.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Delivery Address & ETA */}
                <div className="mt-4 pt-3 border-t border-[#F3F4F6] space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-[#374151]">
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                    <span className="leading-snug">{del.address}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#6B7280]">Order Value ({del.itemsCount} dishes):</span>
                    <span className="font-mono font-bold text-[#111827]">
                      {formatCurrency(del.total)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Estimated Delivery:</span>
                    <span className="font-mono font-bold text-[#635BFF]">
                      {del.etaMinutes > 0 ? `${del.etaMinutes} mins ETA` : 'Delivered'}
                    </span>
                  </div>
                </div>

                {/* Courier details card */}
                <div className="mt-3 p-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#111827]">{del.courier.name}</p>
                    <p className="text-[11px] text-[#6B7280]">{del.courier.company}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#635BFF] flex items-center gap-1 font-semibold">
                    <Phone className="w-3 h-3" /> {del.courier.phone}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] text-[#9CA3AF]">Placed: {del.placedAt}</span>
                <button
                  onClick={() => addToast('Courier Pinned', `Driver ${del.courier.name} notified for expedited delivery.`, 'info')}
                  className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
                >
                  Track Driver →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
