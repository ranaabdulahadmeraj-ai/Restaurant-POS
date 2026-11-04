import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { cn } from '../../utils';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useRestaurant();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto p-4 rounded-xl border bg-white shadow-elevated flex items-start gap-3 transition-all transform translate-y-0 duration-200',
            toast.type === 'success' && 'border-[#16A34A]/30 bg-white text-[#111827]',
            toast.type === 'warning' && 'border-[#F59E0B]/30 bg-white text-[#111827]',
            toast.type === 'info' && 'border-[#635BFF]/30 bg-white text-[#111827]'
          )}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#F59E0B]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#635BFF]" />}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-xs font-bold text-[#111827]">{toast.title}</h5>
            <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-lg hover:bg-[#F3F4F6] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
