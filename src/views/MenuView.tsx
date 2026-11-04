import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Flame,
  Clock,
  Edit2,
  Check,
  X,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  Filter
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types';
import { formatCurrency, cn } from '../utils';

export const MenuView: React.FC = () => {
  const { menuItems, toggleItemStock, updateItemPrice, addToast } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'starters', label: 'Starters' },
    { id: 'pizzas', label: 'Pizzas' },
    { id: 'steaks', label: 'Steaks & Grills' },
    { id: 'pastas', label: 'Pastas' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'cocktails', label: 'Cocktails' },
    { id: 'desserts', label: 'Desserts' }
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setTempPrice(item.price.toString());
  };

  const handleSavePrice = (itemId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0) {
      updateItemPrice(itemId, val);
    }
    setEditingItemId(null);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E5E7EB]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Menu Engineering & Dish Catalog
          </h1>
          <p className="text-xs text-[#6B7280] mt-1">
            Manage recipes, adjust seasonal pricing, and instantly 86 (out-of-stock) items across POS terminals
          </p>
        </div>

        <button
          onClick={() => addToast('New Dish Created', 'Chef testing dish added to drafting roster.', 'info')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#635BFF] hover:bg-[#5147FF] text-white text-xs font-semibold shadow-md shadow-[#635BFF]/30 transition-all hover:scale-[1.01]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E5E7EB] shadow-subtle">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish or ingredient..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-xs text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all',
                selectedCategory === c.id
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isEditing = editingItemId === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border bg-white overflow-hidden shadow-enterprise hover:shadow-elevated transition-all flex flex-col justify-between group',
                !item.inStock ? 'opacity-80 border-dashed border-[#F59E0B]' : 'border-[#E5E7EB]'
              )}
            >
              {/* Image banner */}
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#635BFF]/80 text-white backdrop-blur-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stock status indicator */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleItemStock(item.id)}
                    className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors',
                      item.inStock
                        ? 'bg-[#16A34A] text-white'
                        : 'bg-[#DC2626] text-white animate-pulse'
                    )}
                  >
                    {item.inStock ? 'In Stock' : '86-ed (Out)'}
                  </button>
                </div>

                {/* Name on image banner */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-sm font-bold truncate">{item.name}</h3>
                </div>
              </div>

              {/* Description & specs */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-[#6B7280] pt-2 border-t border-[#F3F4F6]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0EA5A4]" /> {item.prepTimeMinutes}m prep
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> {item.calories} kcal
                  </span>
                </div>
              </div>

              {/* Price adjustment & 86 toggle footer */}
              <div className="p-3.5 bg-[#F7F8FA] border-t border-[#E5E7EB] flex items-center justify-between">
                {/* Price display / Inline editor */}
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono font-bold">$</span>
                    <input
                      type="number"
                      step="0.5"
                      value={tempPrice}
                      onChange={(e) => setTempPrice(e.target.value)}
                      className="w-16 px-1.5 py-0.5 rounded border border-[#635BFF] text-xs font-mono font-bold"
                    />
                    <button
                      onClick={() => handleSavePrice(item.id)}
                      className="p-1 rounded bg-[#16A34A] text-white hover:bg-[#15803D]"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setEditingItemId(null)}
                      className="p-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => handleStartEdit(item)}
                    className="flex items-center gap-1.5 cursor-pointer group/price"
                    title="Click to edit price"
                  >
                    <span className="text-base font-extrabold font-mono text-[#111827]">
                      {formatCurrency(item.price)}
                    </span>
                    <Edit2 className="w-3 h-3 text-[#9CA3AF] group-hover/price:text-[#635BFF]" />
                  </div>
                )}

                {/* 86 toggle button */}
                <button
                  onClick={() => toggleItemStock(item.id)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
                    item.inStock
                      ? 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:text-[#DC2626]'
                      : 'bg-[#DC2626] text-white'
                  )}
                >
                  <span>{item.inStock ? 'Mark 86' : 'Restore Stock'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
