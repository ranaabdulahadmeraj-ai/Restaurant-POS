import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationTab,
  OrderStatus,
  OrderType,
  PaymentMethod,
  MenuItem,
  MenuItemVariant,
  MenuItemExtra,
  CartItem,
  Order,
  Table,
  TableStatus,
  InventoryItem,
  Supplier,
  Customer,
  DeliveryOrder,
  Employee,
  Expense,
  Branch,
  Notification
} from '../types';
import {
  INITIAL_BRANCHES,
  INITIAL_MENU_ITEMS,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_SUPPLIERS,
  INITIAL_CUSTOMERS,
  INITIAL_DELIVERY_ORDERS,
  INITIAL_EMPLOYEES,
  INITIAL_EXPENSES,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface RestaurantContextType {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  activeBranch: Branch;
  branches: Branch[];
  setActiveBranch: (branch: Branch) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Data State
  menuItems: MenuItem[];
  orders: Order[];
  tables: Table[];
  inventory: InventoryItem[];
  suppliers: Supplier[];
  customers: Customer[];
  deliveryOrders: DeliveryOrder[];
  employees: Employee[];
  expenses: Expense[];
  notifications: Notification[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // POS State
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, variant?: MenuItemVariant, extras?: MenuItemExtra[], notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartItemQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  selectedTableForOrder: Table | null;
  setSelectedTableForOrder: (table: Table | null) => void;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  tipAmount: number;
  setTipAmount: (amount: number) => void;
  subtotal: number;
  tax: number;
  discountAmount: number;
  total: number;

  // Actions
  createOrder: (paymentMethod?: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  toggleOrderItemDone: (orderId: string, cartItemId: string) => void;
  bumpKitchenOrder: (orderId: string) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  settleTableBill: (tableId: string) => void;
  seatParty: (tableId: string, partySize: number, guestName?: string) => void;
  toggleItemStock: (itemId: string) => void;
  updateItemPrice: (itemId: string, newPrice: number) => void;
  reorderInventoryItem: (itemId: string, amount: number) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;

  // Modals
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  customizerItem: MenuItem | null;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  activeTableDetail: Table | null;
  setActiveTableDetail: (table: Table | null) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [activeBranch, setActiveBranch] = useState<Branch>(INITIAL_BRANCHES[0]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Entities
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [suppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [customers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>(INITIAL_DELIVERY_ORDERS);
  const [employees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // POS State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTableForOrder, setSelectedTableForOrder] = useState<Table | null>(
    INITIAL_TABLES.find((table) => table.status === 'available') ?? null
  );
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [tipAmount, setTipAmount] = useState<number>(0);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeTableDetail, setActiveTableDetail] = useState<Table | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.08875; // 8.875% NYC tax rate
  const total = taxableAmount + tax + tipAmount;

  const addToCart = (
    item: MenuItem,
    quantity: number = 1,
    variant?: MenuItemVariant,
    extras: MenuItemExtra[] = [],
    notes?: string
  ) => {
    const variantPrice = variant ? variant.priceDelta : 0;
    const extrasPrice = extras.reduce((sum, e) => sum + e.price, 0);
    const unitPrice = item.price + variantPrice + extrasPrice;
    const itemTotal = unitPrice * quantity;

    const cartItemId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newCartItem: CartItem = {
      cartItemId,
      item,
      quantity,
      selectedVariant: variant,
      selectedExtras: extras,
      specialInstructions: notes,
      itemTotal
    };

    setCart((prev) => [...prev, newCartItem]);
    addToast('Added to Ticket', `${item.name} (${quantity}x) added to current order.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((c) => c.cartItemId !== cartItemId));
  };

  const updateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const nextQty = ci.quantity + delta;
            if (nextQty <= 0) return null;
            const unitPrice = ci.itemTotal / ci.quantity;
            return {
              ...ci,
              quantity: nextQty,
              itemTotal: unitPrice * nextQty
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setTipAmount(0);
  };

  const openCustomizer = (item: MenuItem) => {
    setCustomizerItem(item);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setCustomizerItem(null);
    setIsCustomizerOpen(false);
  };

  // Actions
  const createOrder = (paymentMethod: PaymentMethod = 'apple_pay'): Order => {
    const displayNum = Math.floor(2850 + Math.random() * 50);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      displayId: `#${displayNum}`,
      tableId: orderType === 'dine_in' ? selectedTableForOrder?.id : undefined,
      tableName: orderType === 'dine_in' ? selectedTableForOrder?.name : 'Quick Takeaway',
      orderType,
      items: [...cart],
      subtotal,
      tax,
      discount: discountAmount,
      tip: tipAmount,
      total,
      status: 'new',
      paymentStatus: 'paid',
      paymentMethod,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      serverName: 'Marco Silva (GM)',
      customerName:
        orderType === 'dine_in' && selectedTableForOrder
          ? `Guest @ ${selectedTableForOrder.name}`
          : 'Counter Customer',
      elapsedMinutes: 1,
      completedItems: []
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update table status if dine-in
    if (selectedTableForOrder && orderType === 'dine_in') {
      setTables((prev) =>
        prev.map((t) =>
          t.id === selectedTableForOrder.id
            ? {
                ...t,
                status: 'occupied',
                currentOrderId: newOrder.id,
                currentOrderTotal: total,
                seatedAt: 'Just now',
                guestCount: guestCount
              }
            : t
        )
      );
    }

    clearCart();
    addToast('Order Placed Successfully', `Ticket ${newOrder.displayId} sent to Kitchen Display System.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const toggleOrderItemDone = (orderId: string, cartItemId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const currentCompleted = ord.completedItems || [];
        const isDone = currentCompleted.includes(cartItemId);
        const nextCompleted = isDone
          ? currentCompleted.filter((id) => id !== cartItemId)
          : [...currentCompleted, cartItemId];

        // Check if all items are done
        const allDone = ord.items.every((item) => nextCompleted.includes(item.cartItemId));
        const nextStatus: OrderStatus = allDone ? 'ready' : 'preparing';

        return {
          ...ord,
          completedItems: nextCompleted,
          status: ord.status === 'served' || ord.status === 'completed' ? ord.status : nextStatus
        };
      })
    );
  };

  const bumpKitchenOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        let nextStatus: OrderStatus = ord.status;
        if (ord.status === 'new') nextStatus = 'preparing';
        else if (ord.status === 'preparing') nextStatus = 'ready';
        else if (ord.status === 'ready') nextStatus = 'served';
        else if (ord.status === 'served') nextStatus = 'completed';

        addToast(
          'Order Status Updated',
          `Ticket ${ord.displayId} moved to ${nextStatus.toUpperCase()}.`,
          'info'
        );

        return { ...ord, status: nextStatus };
      })
    );
  };

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setTables((prev) =>
      prev.map((t) => (t.id === tableId ? { ...t, status } : t))
    );
    addToast('Table Status Updated', `Table status changed to ${status}.`, 'info');
  };

  const settleTableBill = (tableId: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: 'cleaning',
              currentOrderId: undefined,
              currentOrderTotal: undefined,
              seatedAt: 'Just departed'
            }
          : t
      )
    );
    addToast('Table Settle Completed', 'Bill settled in full. Table marked for cleaning.', 'success');
  };

  const seatParty = (tableId: string, partySize: number, guestName?: string) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status: 'occupied',
              guestCount: partySize,
              seatedAt: 'Just seated',
              serverName: 'Sofia Rossi'
            }
          : t
      )
    );
    addToast('Guests Seated', `${partySize} guests seated at table. Server notified.`, 'success');
  };

  const toggleItemStock = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextStock = !item.inStock;
          addToast(
            nextStock ? 'Item In Stock' : 'Item 86-ed',
            `${item.name} is now ${nextStock ? 'Available' : 'Out of Stock'}.`,
            nextStock ? 'success' : 'warning'
          );
          return { ...item, inStock: nextStock };
        }
        return item;
      })
    );
  };

  const updateItemPrice = (itemId: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, price: newPrice } : item))
    );
    addToast('Menu Price Updated', `Price updated to $${newPrice.toFixed(2)}.`, 'success');
  };

  const reorderInventoryItem = (itemId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            currentStock: item.currentStock + amount,
            status: 'optimal'
          };
        }
        return item;
      })
    );
    addToast('PO Sent to Supplier', `Purchase order issued for inventory restock.`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <RestaurantContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeBranch,
        branches,
        setActiveBranch,
        isSidebarCollapsed,
        toggleSidebar,

        menuItems,
        orders,
        tables,
        inventory,
        suppliers,
        customers,
        deliveryOrders,
        employees,
        expenses,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,

        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        selectedTableForOrder,
        setSelectedTableForOrder,
        orderType,
        setOrderType,
        guestCount,
        setGuestCount,
        discountPercent,
        setDiscountPercent,
        tipAmount,
        setTipAmount,
        subtotal,
        tax,
        discountAmount,
        total,

        createOrder,
        updateOrderStatus,
        toggleOrderItemDone,
        bumpKitchenOrder,
        updateTableStatus,
        settleTableBill,
        seatParty,
        toggleItemStock,
        updateItemPrice,
        reorderInventoryItem,

        toasts,
        addToast,
        removeToast,

        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isCustomizerOpen,
        customizerItem,
        openCustomizer,
        closeCustomizer,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        activeTableDetail,
        setActiveTableDetail
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = (): RestaurantContextType => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
