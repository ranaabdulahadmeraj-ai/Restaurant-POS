import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Check, Flame, Clock } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { MenuItemVariant, MenuItemExtra } from '../../types';
import { cn } from '../../utils';

export const ProductCustomizerModal: React.FC = () => {
  const {
    isCustomizerOpen,
    customizerItem,
    closeCustomizer,
    addToCart
  } = useRestaurant();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<MenuItemVariant | undefined>(undefined);
  const [selectedExtras, setSelectedExtras] = useState<MenuItemExtra[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isCustomizerOpen || !customizerItem) return;
    setQuantity(1);
    setSelectedVariant(customizerItem.variants?.[0]);
    setSelectedExtras(customizerItem.extras?.filter((extra) => extra.selectedByDefault) || []);
    setNotes('');
  }, [customizerItem, isCustomizerOpen]);

  if (!isCustomizerOpen || !customizerItem) return null;

  const toggleExtra = (extra: MenuItemExtra) => {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const variantDelta = selectedVariant ? selectedVariant.priceDelta : 0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = customizerItem.price + variantDelta + extrasTotal;
  const grandTotal = unitPrice * quantity;

  const handleConfirm = () => {
    addToCart(customizerItem, quantity, selectedVariant, selectedExtras, notes.trim() || undefined);
    closeCustomizer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image banner */}
        <div className="relative h-48 bg-gray-900 shrink-0">
          <img
            src={customizerItem.image}
            alt={customizerItem.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={closeCustomizer}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Dish details overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#635BFF] text-white">
                {customizerItem.category}
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#0EA5A4]" /> {customizerItem.prepTimeMinutes}m prep
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#F59E0B]" /> {customizerItem.calories} kcal
              </span>
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white">{customizerItem.name}</h3>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          <p className="text-xs text-[#6B7280] leading-relaxed">
            {customizerItem.description}
          </p>

          {/* Variants / Temperature / Portion Size */}
          {customizerItem.variants && customizerItem.variants.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Choice of Preparation / Size
                </label>
                <span className="text-[11px] font-semibold text-[#635BFF] bg-[#EEF0FF] px-2 py-0.5 rounded-md">
                  Required
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {customizerItem.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl border text-left text-xs font-medium transition-all',
                        isSelected
                          ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] shadow-xs'
                          : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] bg-[#F7F8FA]'
                      )}
                    >
                      <span className="truncate">{v.name}</span>
                      <span className="font-semibold ml-2">
                        {v.priceDelta > 0 ? `+$${v.priceDelta.toFixed(2)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras & Add-ons */}
          {customizerItem.extras && customizerItem.extras.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Gourmet Extras & Add-ons
                </label>
                <span className="text-[11px] text-[#6B7280]">Optional</span>
              </div>
              <div className="space-y-1.5">
                {customizerItem.extras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none text-xs transition-all',
                        isChecked
                          ? 'border-[#0EA5A4] bg-[#E6F6F6] text-[#0C8F8E] font-medium'
                          : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] bg-white'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            'w-4 h-4 rounded flex items-center justify-center border transition-colors',
                            isChecked ? 'bg-[#0EA5A4] border-[#0EA5A4] text-white' : 'border-[#D1D5DB] bg-white'
                          )}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-semibold">+${extra.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Dressing on the side, severe nut allergy, extra crispy..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
            />
          </div>
        </div>

        {/* Footer: Stepper & Add to Order CTA */}
        <div className="p-4 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between gap-4 shrink-0">
          {/* Stepper */}
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-xl p-1 shadow-subtle">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] text-[#111827] flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#111827] font-mono">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg hover:bg-[#F3F4F6] text-[#111827] flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Big Add Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white font-semibold text-xs flex items-center justify-between shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Add Item to Ticket</span>
            <span className="font-mono text-sm">${grandTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
