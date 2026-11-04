import React, { useState } from 'react';
import { Settings, Save, Bell, Shield, CreditCard, Palette, Globe, Building2, Printer, Wifi } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { cn } from '../utils';

export const SettingsView: React.FC = () => {
  const { activeBranch, addToast } = useRestaurant();
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'billing', label: 'Payments & Billing', icon: CreditCard },
    { id: 'notifications', label: 'Alerts & Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'hardware', label: 'Printers & Hardware', icon: Printer },
    { id: 'integrations', label: 'API Integrations', icon: Wifi },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="pb-6 border-b border-[#E5E7EB] mb-6">
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">System Configuration</h1>
        <p className="text-xs text-[#6B7280] mt-1">Manage restaurant profile, hardware terminals, payment gateways, and access control policies.</p>
      </div>

      <div className="flex gap-8">
        {/* Settings sidebar */}
        <nav className="w-52 shrink-0 space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors',
                  activeSection === s.id
                    ? 'bg-[#635BFF] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
                )}
              >
                <Icon className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Settings content panel */}
        <div className="flex-1 p-6 rounded-2xl bg-white border border-[#E5E7EB] shadow-enterprise space-y-6">
          <h2 className="text-base font-bold text-[#111827] capitalize">
            {sections.find(s => s.id === activeSection)?.label} Settings
          </h2>

          {activeSection === 'general' && (
            <div className="space-y-4 text-xs">
              {[
                { label: 'Restaurant Name', value: 'RestaurantOS — Downtown Flagship', type: 'text' },
                { label: 'Primary Location', value: activeBranch.address, type: 'text' },
                { label: 'Business Phone', value: activeBranch.phone, type: 'text' },
                { label: 'Tax Rate (Jurisdiction)', value: '8.875', type: 'number' },
                { label: 'Default Currency', value: 'USD — United States Dollar', type: 'text' },
                { label: 'Operating Hours', value: '11:30 AM – 11:00 PM (Mon–Sun)', type: 'text' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block font-bold text-[#111827] mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#635BFF] max-w-md"
                  />
                </div>
              ))}
            </div>
          )}

          {activeSection !== 'general' && (
            <div className="h-40 flex items-center justify-center text-center text-[#9CA3AF]">
              <div>
                <Settings className="w-8 h-8 mx-auto mb-2 stroke-[1.5]" />
                <p className="text-xs font-semibold text-[#111827]">
                  {sections.find(s => s.id === activeSection)?.label} settings panel
                </p>
                <p className="text-[11px] mt-0.5">Configuration options for this section are managed via the admin portal.</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E5E7EB]">
            <button
              onClick={() => addToast('Settings Saved', 'All configuration changes saved and applied.', 'success')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
