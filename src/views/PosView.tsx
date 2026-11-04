import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Receipt,
  Sparkles,
  Flame,
  Clock,
  Check,
  ChevronRight,
  Split,
  Percent,
  X,
  Store,
  Layers,
  Pizza,
  Wine,
  Beef,
  Fish,
  Utensils
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem, MenuItemVariant, MenuItemExtra, OrderType } from '../types';
import { formatCurrency, cn } from '../utils';

export const PosView: React.FC = () => {
  const {
    menuItems,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    selectedTableForOrder,
    setSelectedTableForOrder,
    tables,
    orderType,
    setOrderType,
    guestCount,
    setGuestCount,
    discountPercent,
    setDiscountPercent,
    subtotal,
    tax,
    discountAmount,
    total,
    setIsCheckoutModalOpen,
    openCustomizer
  } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Center column selected item for live in-place customization
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const [activeVariant, setActiveVariant] = useState<MenuItemVariant | undefined>(
    menuItems[0]?.variants?.[0]
  );
  const [activeExtras, setActiveExtras] = useState<MenuItemExtra[]>([]);
  const [activeNotes, setActiveNotes] = useState<string>('');
  const [activeQuantity, setActiveQuantity] = useState<number>(1);

  useEffect(() => {
    if (orderType !== 'dine_in') return;

    const selectedTable = tables.find((table) => table.id === selectedTableForOrder?.id);
    if (selectedTable?.status === 'available') {
      if (selectedTable !== selectedTableForOrder) setSelectedTableForOrder(selectedTable);
      return;
    }

    setSelectedTableForOrder(tables.find((table) => table.status === 'available') ?? null);
  }, [orderType, selectedTableForOrder, setSelectedTableForOrder, tables]);

  // When clicking a dish card, set it as the center column active item
  const handleSelectDishForCenter = (dish: MenuItem) => {
    setActiveItem(dish);
    setActiveVariant(dish.variants?.[0]);
    setActiveExtras(dish.extras?.filter((e) => e.selectedByDefault) || []);
    setActiveNotes('');
    setActiveQuantity(1);
  };

  const toggleCenterExtra = (extra: MenuItemExtra) => {
    setActiveExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const centerVariantPrice = activeVariant ? activeVariant.priceDelta : 0;
  const centerExtrasTotal = activeExtras.reduce((sum, e) => sum + e.price, 0);
  const centerUnitPrice = activeItem.price + centerVariantPrice + centerExtrasTotal;
  const centerGrandTotal = centerUnitPrice * activeQuantity;

  const handleCenterAddToCart = () => {
    addToCart(
      activeItem,
      activeQuantity,
      activeVariant,
      activeExtras,
      activeNotes.trim() || undefined
    );
    // Reset notes & quantity
    setActiveNotes('');
    setActiveQuantity(1);
  };

  // Categories config
  const categories = [
    { id: 'all', label: 'Full Menu', icon: Utensils },
    { id: 'starters', label: 'Starters', icon: Sparkles },
    { id: 'pizzas', label: 'Artisan Pizzas', icon: Pizza },
    { id: 'steaks', label: 'Prime Steaks', icon: Beef },
    { id: 'pastas', label: 'Pastas', icon: Layers },
    { id: 'seafood', label: 'Seafood', icon: Fish },
    { id: 'cocktails', label: 'Cocktails', icon: Wine },
    { id: 'desserts', label: 'Desserts', icon: Flame }
  ];

  // Filtering
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-[#F7F8FA]">
      {/* =========================================================================
          LEFT COLUMN: CATEGORIES & PRODUCT GRID
          ========================================================================= */}
      <div className="flex-1 flex flex-col border-r border-[#E5E7EB] bg-white overflow-hidden min-w-0">
        {/* Top Controls: Search & Category Pills */}
        <div className="p-4 border-b border-[#E5E7EB] space-y-3 bg-[#F7F8FA]/60">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients, or dietary tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent shadow-subtle"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[#9CA3AF] hover:text-[#111827] p-0.5 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal Category Scroll Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shadow-subtle shrink-0',
                    isSelected
                      ? 'bg-[#635BFF] text-white shadow-sm shadow-[#635BFF]/30'
                      : 'bg-white text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB]'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3.5">
            {filteredItems.map((item) => {
              const isCenterActive = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectDishForCenter(item)}
                  className={cn(
                    'group rounded-2xl border bg-white overflow-hidden cursor-pointer transition-all flex flex-col justify-between text-left relative select-none',
                    isCenterActive
                      ? 'border-[#635BFF] ring-2 ring-[#635BFF]/30 shadow-elevated'
                      : 'border-[#E5E7EB] hover:border-[#D1D5DB] hover:shadow-card'
                  )}
                >
                  {/* Image container */}
                  <div className="relative h-28 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Stock pill */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={cn(
                          'text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider',
                          item.inStock
                            ? 'bg-[#16A34A]/90 text-white'
                            : 'bg-[#DC2626]/90 text-white'
                        )}
                      >
                        {item.inStock ? 'In Stock' : '86-ed'}
                      </span>
                    </div>

                    {/* Price on image */}
                    <div className="absolute bottom-2 right-2">
                      <span className="font-mono font-bold text-white text-xs bg-black/60 px-2 py-0.5 rounded-lg backdrop-blur-xs">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] group-hover:text-[#635BFF] transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#6B7280] line-clamp-2 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3F4F6] text-[10px] text-[#9CA3AF]">
                      <span>{item.calories} kcal</span>
                      <span className="text-[#635BFF] font-semibold flex items-center gap-0.5">
                        Customize <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <Utensils className="w-8 h-8 text-[#9CA3AF] mb-2" />
              <p className="text-sm font-semibold text-[#111827]">No dishes match your filter</p>
              <p className="text-xs text-[#6B7280] mt-1">Try searching for other ingredients or category.</p>
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          CENTER COLUMN: PRODUCT CUSTOMIZATION & VARIANTS
          ========================================================================= */}
      <div className="w-full lg:w-[360px] xl:w-[400px] border-r border-[#E5E7EB] bg-white flex flex-col justify-between overflow-hidden shrink-0">
        {/* Top Header */}
        <div className="p-4 border-b border-[#E5E7EB] bg-[#F7F8FA]/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#635BFF]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Item Customization
            </h3>
          </div>
          <button
            onClick={() => openCustomizer(activeItem)}
            className="text-[11px] text-[#635BFF] font-semibold hover:underline"
          >
            Expand Drawer
          </button>
        </div>

        {/* Scrollable Customization Controls */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Active item hero thumbnail */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
            <img
              src={activeItem.image}
              alt={activeItem.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#635BFF] bg-[#EEF0FF] px-2 py-0.5 rounded-md">
                {activeItem.category}
              </span>
              <h4 className="text-xs font-bold text-[#111827] mt-1 truncate">{activeItem.name}</h4>
              <p className="text-xs font-mono font-bold text-[#111827] mt-0.5">
                Base {formatCurrency(activeItem.price)}
              </p>
            </div>
          </div>

          {/* Variants / Doneness / Portions */}
          {activeItem.variants && activeItem.variants.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111827]">Choice of Preparation</label>
                <span className="text-[10px] text-[#635BFF] font-semibold uppercase">Required</span>
              </div>
              <div className="space-y-1.5">
                {activeItem.variants.map((v) => {
                  const isChecked = activeVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActiveVariant(v)}
                      className={cn(
                        'w-full flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all',
                        isChecked
                          ? 'border-[#635BFF] bg-[#EEF0FF] text-[#635BFF] font-semibold'
                          : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] bg-white'
                      )}
                    >
                      <span>{v.name}</span>
                      <span className="font-mono text-[11px]">
                        {v.priceDelta > 0 ? `+${formatCurrency(v.priceDelta)}` : 'Standard'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Gourmet Extras & Cheeses */}
          {activeItem.extras && activeItem.extras.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-[#111827]">Gourmet Extras</label>
                <span className="text-[10px] text-[#6B7280]">Optional</span>
              </div>
              <div className="space-y-1.5">
                {activeItem.extras.map((extra) => {
                  const isChecked = activeExtras.some((e) => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleCenterExtra(extra)}
                      className={cn(
                        'flex items-center justify-between p-2.5 rounded-xl border cursor-pointer select-none text-xs transition-all',
                        isChecked
                          ? 'border-[#0EA5A4] bg-[#E6F6F6] text-[#0C8F8E] font-medium'
                          : 'border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] bg-white'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'w-4 h-4 rounded flex items-center justify-center border transition-colors',
                            isChecked ? 'bg-[#0EA5A4] border-[#0EA5A4] text-white' : 'border-[#D1D5DB] bg-white'
                          )}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="truncate">{extra.name}</span>
                      </div>
                      <span className="font-mono text-[11px] font-semibold">
                        +{formatCurrency(extra.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen instructions note */}
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1.5">
              Special Request / Notes
            </label>
            <input
              type="text"
              value={activeNotes}
              onChange={(e) => setActiveNotes(e.target.value)}
              placeholder="e.g. Rare, sauce on side, birthday candle..."
              className="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
            />
          </div>
        </div>

        {/* Center Bottom: Quantity & Add Button */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F8FA] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#111827]">Order Quantity</span>
            <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-xl p-1 shadow-subtle">
              <button
                type="button"
                onClick={() => setActiveQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg hover:bg-[#F3F4F6] text-[#111827] flex items-center justify-center"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold font-mono text-[#111827]">
                {activeQuantity}
              </span>
              <button
                type="button"
                onClick={() => setActiveQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg hover:bg-[#F3F4F6] text-[#111827] flex items-center justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCenterAddToCart}
            className="w-full py-3 px-4 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold flex items-center justify-between shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Add to Ticket</span>
            <span className="font-mono font-bold text-sm">{formatCurrency(centerGrandTotal)}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN: STICKY SHOPPING CART & CHECKOUT
          ========================================================================= */}
      <div className="w-full lg:w-[380px] xl:w-[420px] bg-white flex flex-col justify-between overflow-hidden shrink-0 shadow-lg lg:shadow-none">
        {/* Cart Header: Order Type & Table Selector */}
        <div className="p-4 border-b border-[#E5E7EB] bg-[#F7F8FA]/80 space-y-3">
          {/* Dine-in vs Takeaway vs Delivery switcher */}
          <div className="grid grid-cols-3 gap-1.5 bg-[#E5E7EB]/60 p-1 rounded-xl">
            {(
              [
                { id: 'dine_in', label: 'Dine In' },
                { id: 'takeaway', label: 'Takeaway' },
                { id: 'bar', label: 'Bar Tab' }
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setOrderType(opt.id);
                  if (opt.id === 'dine_in') {
                    if (!selectedTableForOrder) {
                      setSelectedTableForOrder(tables.find((table) => table.status === 'available') ?? null);
                    }
                  } else {
                    setSelectedTableForOrder(null);
                  }
                }}
                className={cn(
                  'py-1.5 text-xs font-semibold rounded-lg capitalize transition-all',
                  orderType === opt.id
                    ? 'bg-white text-[#111827] shadow-subtle'
                    : 'text-[#6B7280] hover:text-[#111827]'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Table Assignment & Party Size (for Dine-in) */}
          {orderType === 'dine_in' && (
            <div className="flex items-center gap-2">
              <select
                value={selectedTableForOrder?.id || ''}
                onChange={(e) => {
                  const tbl = tables.find((t) => t.id === e.target.value);
                  setSelectedTableForOrder(tbl || null);
                }}
                className="flex-1 px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white text-xs font-semibold text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
              >
                <option value="">Select an available table</option>
                {tables.filter((table) => table.status === 'available').map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.section.toUpperCase()})
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-white border border-[#E5E7EB] px-2 py-1.5 rounded-xl">
                <span className="text-[11px] text-[#6B7280]">Guests:</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                  className="w-8 text-center text-xs font-bold font-mono text-[#111827] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Selected Items Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {cart.map((cartItem) => (
            <div
              key={cartItem.cartItemId}
              className="p-3 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA]/60 hover:bg-[#F7F8FA] transition-colors space-y-2"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-[#111827] truncate">
                    {cartItem.item.name}
                  </h5>
                  {cartItem.selectedVariant && (
                    <p className="text-[10px] text-[#635BFF] font-medium">
                      Prep: {cartItem.selectedVariant.name}
                    </p>
                  )}
                  {cartItem.selectedExtras.length > 0 && (
                    <p className="text-[10px] text-[#6B7280]">
                      +{cartItem.selectedExtras.map((e) => e.name).join(', ')}
                    </p>
                  )}
                  {cartItem.specialInstructions && (
                    <p className="text-[10px] text-[#F59E0B] italic">
                      "{cartItem.specialInstructions}"
                    </p>
                  )}
                </div>

                <span className="font-mono text-xs font-bold text-[#111827]">
                  {formatCurrency(cartItem.itemTotal)}
                </span>
              </div>

              {/* Quantity Stepper & Delete */}
              <div className="flex items-center justify-between pt-1 border-t border-[#E5E7EB]/70">
                <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg p-0.5">
                  <button
                    onClick={() => updateCartItemQuantity(cartItem.cartItemId, -1)}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#F3F4F6] text-[#6B7280]"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-mono font-bold text-[#111827]">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => updateCartItemQuantity(cartItem.cartItemId, 1)}
                    className="w-6 h-6 rounded flex items-center justify-center hover:bg-[#F3F4F6] text-[#6B7280]"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(cartItem.cartItemId)}
                  className="text-[#9CA3AF] hover:text-[#DC2626] p-1 rounded transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <div className="h-48 flex flex-col items-center justify-center text-center p-6 text-[#9CA3AF]">
              <Receipt className="w-8 h-8 mb-2 stroke-[1.5]" />
              <p className="text-xs font-semibold text-[#111827]">Ticket is currently empty</p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">
                Click any dish on the left to customize and add to order.
              </p>
            </div>
          )}
        </div>

        {/* Financial Settlement Bottom Area */}
        <div className="p-4 border-t border-[#E5E7EB] bg-[#F7F8FA] space-y-3">
          {/* Quick discount buttons */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6B7280] font-medium">Promo Discount</span>
            <div className="flex items-center gap-1.5">
              {[0, 10, 15, 20].map((disc) => (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setDiscountPercent(disc)}
                  className={cn(
                    'px-2 py-0.5 rounded text-[11px] font-semibold transition-colors',
                    discountPercent === disc
                      ? 'bg-[#635BFF] text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                  )}
                >
                  {disc === 0 ? 'None' : `${disc}%`}
                </button>
              ))}
            </div>
          </div>

          {/* Subtotal lines */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-[#6B7280]">
              <span>Subtotal</span>
              <span className="font-mono text-[#111827]">{formatCurrency(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#16A34A] font-semibold">
                <span>Discount ({discountPercent}%)</span>
                <span className="font-mono">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#6B7280]">
              <span>Tax (8.875%)</span>
              <span className="font-mono text-[#111827]">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-[#E5E7EB]">
              <span className="text-sm font-bold text-[#111827]">Due Total</span>
              <span className="text-2xl font-extrabold font-mono text-[#111827]">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Payment CTA */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={clearCart}
              disabled={cart.length === 0 || (orderType === 'dine_in' && !selectedTableForOrder)}
              className="py-3 px-3 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#DC2626] disabled:opacity-40 transition-colors"
              title="Void ticket"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => setIsCheckoutModalOpen(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-between shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Proceed to Payment</span>
              <span className="font-mono text-sm">{formatCurrency(total)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
