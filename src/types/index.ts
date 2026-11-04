export type NavigationTab =
  | 'dashboard'
  | 'pos'
  | 'orders'
  | 'kds'
  | 'tables'
  | 'menu'
  | 'inventory'
  | 'suppliers'
  | 'customers'
  | 'delivery'
  | 'employees'
  | 'expenses'
  | 'reports'
  | 'settings';

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';

export type OrderType = 'dine_in' | 'takeaway' | 'delivery' | 'bar';

export type PaymentMethod = 'apple_pay' | 'credit_card' | 'cash' | 'split';

export type PaymentStatus = 'paid' | 'unpaid' | 'refunded' | 'authorized';

export interface MenuItemVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface MenuItemExtra {
  id: string;
  name: string;
  price: number;
  selectedByDefault?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'starters' | 'pizzas' | 'steaks' | 'pastas' | 'seafood' | 'cocktails' | 'wines' | 'desserts';
  image: string;
  calories: number;
  inStock: boolean;
  prepTimeMinutes: number;
  tags: string[]; // 'GF', 'Vegan', 'Chef Special', etc.
  variants?: MenuItemVariant[];
  extras?: MenuItemExtra[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  selectedVariant?: MenuItemVariant;
  selectedExtras: MenuItemExtra[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface Order {
  id: string;
  displayId: string;
  tableId?: string;
  tableName?: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  tip: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  serverName: string;
  customerName?: string;
  notes?: string;
  elapsedMinutes: number;
  courseNumber?: number;
  isRush?: boolean;
  isVip?: boolean;
  completedItems?: string[]; // IDs of items checked off in KDS
}

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning';
export type FloorSection = 'main' | 'terrace' | 'vip' | 'bar';

export interface Table {
  id: string;
  number: string;
  name: string;
  capacity: number;
  section: FloorSection;
  status: TableStatus;
  currentOrderId?: string;
  currentOrderTotal?: number;
  seatedAt?: string;
  guestCount?: number;
  serverName?: string;
  shape: 'round' | 'rect' | 'booth';
  position: { x: number; y: number; w: number; h: number };
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minPar: number;
  maxPar: number;
  unit: string;
  unitCost: number;
  supplierName: string;
  status: 'optimal' | 'low' | 'critical';
  lastOrdered: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  paymentTerms: string;
  rating: number;
  outstandingBalance: number;
  activeOrdersCount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  vipTier: 'Regular' | 'Silver VIP' | 'Gold VIP' | 'Black Diamond';
  totalVisits: number;
  totalSpend: number;
  lastVisit: string;
  favoriteItem: string;
  dietaryNotes: string[];
}

export interface DeliveryCourier {
  name: string;
  company: 'DoorDash Drive' | 'Uber Direct' | 'In-House Courier';
  phone: string;
  rating: number;
}

export interface DeliveryOrder {
  id: string;
  displayId: string;
  customerName: string;
  address: string;
  phone: string;
  courier: DeliveryCourier;
  itemsCount: number;
  total: number;
  status: 'dispatched' | 'picked_up' | 'delivered' | 'delayed';
  etaMinutes: number;
  placedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'General Manager' | 'Executive Chef' | 'Sous Chef' | 'Lead Sommelier' | 'Floor Captain' | 'Senior Bartender' | 'Line Cook';
  status: 'clocked_in' | 'on_break' | 'off_shift';
  shiftHours: number;
  hourlyRate: number;
  ordersHandled: number;
  salesGenerated: number;
  avatar: string;
}

export interface Expense {
  id: string;
  title: string;
  category: 'Food Cost' | 'Beverage Cost' | 'Labor & Payroll' | 'Rent & Utilities' | 'Maintenance' | 'Marketing';
  amount: number;
  vendor: string;
  date: string;
  paymentMethod: string;
  status: 'settled' | 'pending' | 'recurring';
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  tablesCount: number;
  activeStaffCount: number;
  status: 'open' | 'dinner_service' | 'closed';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  read: boolean;
}
