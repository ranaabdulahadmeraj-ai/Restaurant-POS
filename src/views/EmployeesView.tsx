import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Plus,
  Clock,
  DollarSign,
  Award,
  CheckCircle2,
  Coffee,
  Shield
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { Employee } from '../types';
import { formatCurrency, cn } from '../utils';

export const EmployeesView: React.FC = () => {
  const { employees, addToast } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clockedInCount = employees.filter((e) => e.status === 'clocked_in').length;
  const totalSalesFloor = employees.reduce((sum, e) => sum + e.salesGenerated, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Staff Roster & Shift Management
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Real-time shift clock-in times, server sales performance, hourly wage rates, and station coverage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] shadow-subtle text-left">
            <span className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider block">
              Active Shift Crew
            </span>
            <span className="text-sm font-bold font-mono text-[#16A34A]">
              {clockedInCount} On Duty
            </span>
          </div>

          <button
            onClick={() => addToast('Staff Onboarded', 'Employee profile created and assigned PIN.', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((emp) => {
          const isClocked = emp.status === 'clocked_in';
          const isOnBreak = emp.status === 'on_break';

          return (
            <div
              key={emp.id}
              className="p-5 rounded-2xl border border-[#E5E7EB] bg-white shadow-enterprise hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#E5E7EB]"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#111827]">{emp.name}</h3>
                      <p className="text-xs text-[#6B7280] font-medium">{emp.role}</p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1',
                      isClocked
                        ? 'bg-[#ECFDF5] text-[#16A34A]'
                        : isOnBreak
                        ? 'bg-[#FFFBEB] text-[#F59E0B]'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                    )}
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        isClocked ? 'bg-[#16A34A]' : isOnBreak ? 'bg-[#F59E0B]' : 'bg-[#9CA3AF]'
                      )}
                    />
                    {emp.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3F4F6] space-y-2 text-xs">
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Current Shift Duration:</span>
                    <span className="font-mono font-bold text-[#111827]">{emp.shiftHours} hrs</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Base Hourly Rate:</span>
                    <span className="font-mono font-bold text-[#111827]">
                      {formatCurrency(emp.hourlyRate)}/hr
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Tickets Handled Today:</span>
                    <span className="font-semibold text-[#111827]">{emp.ordersHandled} tickets</span>
                  </div>
                  <div className="flex justify-between text-[#6B7280]">
                    <span>Sales Generated Today:</span>
                    <span className="font-mono font-extrabold text-[#16A34A]">
                      {formatCurrency(emp.salesGenerated)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] text-[#9CA3AF]">Badge: #{emp.id.replace('emp-', '0')}</span>
                <button
                  onClick={() => addToast('Shift Status Updated', `${emp.name} shift logs updated.`, 'info')}
                  className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F3F4F6] text-xs font-semibold text-[#111827]"
                >
                  Manage Shift →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
