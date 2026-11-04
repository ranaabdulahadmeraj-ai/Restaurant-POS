import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Printer,
  X,
  CreditCard,
  Smartphone,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Order, OrderStatus } from '../types';
import { formatCurrency, cn } from '../utils';

export const OrdersView: React.FC = () => {
  const { orders, updateOrderStatus, addToast } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch =
      o.displayId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerName && o.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.tableName && o.tableName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const statusBadges: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
    new: { bg: 'bg-[#EEF0FF]', text: 'text-[#635BFF]', dot: 'bg-[#635BFF]' },
    preparing: { bg: 'bg-[#FFFBEB]', text: 'text-[#F59E0B]', dot: 'bg-[#F59E0B]' },
    ready: { bg: 'bg-[#ECFDF5]', text: 'text-[#16A34A]', dot: 'bg-[#16A34A]' },
    served: { bg: 'bg-[#E6F6F6]', text: 'text-[#0EA5A4]', dot: 'bg-[#0EA5A4]' },
    completed: { bg: 'bg-[#F3F4F6]', text: 'text-[#374151]', dot: 'bg-[#9CA3AF]' },
    cancelled: { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]', dot: 'bg-[#DC2626]' }
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Orders & Transaction Register
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Complete audit trail of all dining hall tickets, takeaway orders, and deliveries
          </p>
        </div>

        <button
          onClick={() => {
            const csv = 'Order,Table,Customer,Total,Status\n' + orders.map(o => `${o.displayId},${o.tableName || ''},${o.customerName || ''},${o.total},${o.status}`).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `orders-export-${Date.now()}.csv`;
            a.click();
            addToast('Export Generated', 'Orders exported to CSV file successfully.', 'success');
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827] shadow-subtle transition-all"
        >
          <Download className="w-4 h-4 text-[#6B7280]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticket #, table, or guest..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'new', 'preparing', 'ready', 'served', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all',
                statusFilter === st
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enterprise Data Table */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-enterprise">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#6B7280] uppercase tracking-wider text-[10px] font-bold border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3.5">Ticket #</th>
                <th className="px-4 py-3.5">Table / Channel</th>
                <th className="px-4 py-3.5">Guest & Server</th>
                <th className="px-4 py-3.5">Items</th>
                <th className="px-4 py-3.5">Total & Tender</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Timestamp</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {filteredOrders.map((ord) => {
                const badge = statusBadges[ord.status] || statusBadges.new;
                return (
                  <tr
                    key={ord.id}
                    className="hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                    onClick={() => setSelectedOrder(ord)}
                  >
                    <td className="px-4 py-3.5 font-mono font-bold text-[#635BFF]">
                      {ord.displayId}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[#111827]">
                      {ord.tableName || ord.orderType.toUpperCase()}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-[#111827]">{ord.customerName || 'Walk-In Guest'}</p>
                      <p className="text-[10px] text-[#6B7280]">Staff: {ord.serverName}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280]">
                      {ord.items.length} dishes ({ord.items.reduce((s, i) => s + i.quantity, 0)} qty)
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-mono font-bold text-[#111827]">{formatCurrency(ord.total)}</p>
                      <p className="text-[10px] text-[#6B7280] capitalize">
                        {ord.paymentMethod?.replace('_', ' ') || 'Card'}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-full capitalize inline-flex items-center gap-1',
                          badge.bg,
                          badge.text
                        )}
                      >
                        <span className={cn('w-1.5 h-1.5 rounded-full', badge.dot)} />
                        {ord.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280] font-mono text-[11px]">
                      {ord.createdAt}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(ord);
                        }}
                        className="px-2.5 py-1 rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] text-[11px] font-semibold text-[#111827] inline-flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#6B7280]" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <Receipt className="w-8 h-8 text-[#9CA3AF] mx-auto mb-2" />
            <p className="text-xs font-semibold text-[#111827]">No orders found</p>
            <p className="text-[11px] text-[#6B7280]">Try clearing your search query or status filter.</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal / Chit Inspection */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-[#F7F8FA] border-b border-[#E5E7EB] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#111827]">
                    Ticket {selectedOrder.displayId}
                  </h3>
                  <span className="text-xs font-mono font-bold bg-[#EEF0FF] text-[#635BFF] px-2 py-0.5 rounded">
                    {selectedOrder.orderType.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Placed at {selectedOrder.createdAt} by {selectedOrder.serverName}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg hover:bg-[#E5E7EB] text-[#6B7280] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 overflow-y-auto space-y-4">
              {/* Status Update Quick Bar */}
              <div>
                <label className="block text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                  Order Status Progression
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['new', 'preparing', 'ready', 'served'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateOrderStatus(selectedOrder.id, st)}
                      className={cn(
                        'py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all text-center',
                        selectedOrder.status === st
                          ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="border rounded-xl border-[#E5E7EB] overflow-hidden">
                <div className="px-4 py-2 bg-[#F7F8FA] border-b border-[#E5E7EB] text-[10px] font-bold uppercase text-[#6B7280] tracking-wider">
                  Dishes Breakdown
                </div>
                <div className="divide-y divide-[#F3F4F6] p-2 space-y-1">
                  {selectedOrder.items.map((it) => (
                    <div key={it.cartItemId} className="p-2 flex justify-between items-start text-xs">
                      <div>
                        <p className="font-bold text-[#111827]">
                          {it.quantity}x {it.item.name}
                        </p>
                        {it.selectedVariant && (
                          <p className="text-[11px] text-[#635BFF]">
                            Choice: {it.selectedVariant.name}
                          </p>
                        )}
                        {it.selectedExtras.length > 0 && (
                          <p className="text-[11px] text-[#6B7280]">
                            + {it.selectedExtras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                      </div>
                      <span className="font-mono font-bold text-[#111827]">
                        ${it.itemTotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Totals */}
              <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#111827]">{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Sales Tax (8.875%)</span>
                  <span className="font-mono text-[#111827]">{formatCurrency(selectedOrder.tax)}</span>
                </div>
                <div className="flex justify-between text-[#6B7280]">
                  <span>Gratuity Tip</span>
                  <span className="font-mono text-[#111827]">{formatCurrency(selectedOrder.tip)}</span>
                </div>
                <div className="border-t border-[#E5E7EB] pt-2 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-[#111827]">Settled Total</span>
                  <span className="text-lg font-mono text-[#635BFF]">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
              >
                <Printer className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Re-print Chit</span>
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
