import { MenuItem, Table, Order, InventoryItem, Supplier, Customer, DeliveryOrder, Employee, Expense, Branch, Notification } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'downtown',
    name: 'Downtown Flagship',
    address: '450 Lexington Ave, New York, NY 10017',
    phone: '(212) 555-0198',
    tablesCount: 24,
    activeStaffCount: 16,
    status: 'dinner_service'
  },
  {
    id: 'uptown',
    name: 'Uptown Bistro & Lounge',
    address: '1028 Madison Ave, New York, NY 10075',
    phone: '(212) 555-0842',
    tablesCount: 18,
    activeStaffCount: 11,
    status: 'open'
  },
  {
    id: 'westside',
    name: 'Westside Marina Waterfront',
    address: '62 Chelsea Piers, New York, NY 10011',
    phone: '(212) 555-0377',
    tablesCount: 30,
    activeStaffCount: 22,
    status: 'dinner_service'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // STARTERS
  {
    id: 'item-1',
    name: 'Burrata Pugliese di Andria',
    description: 'Heirloom tomatoes, 25-year aged balsamic glaze, wild baby arugula, Sicilian extra virgin olive oil, toasted sourdough crisps.',
    price: 24.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a31?auto=format&fit=crop&w=600&q=80',
    calories: 480,
    inStock: true,
    prepTimeMinutes: 8,
    tags: ['Vegetarian', 'Gluten-Free Option'],
    variants: [
      { id: 'v-reg', name: 'Standard (200g)', priceDelta: 0 },
      { id: 'v-large', name: 'Grand Sharing (400g)', priceDelta: 16.00 }
    ],
    extras: [
      { id: 'e-prosciutto', name: 'San Daniele Prosciutto (24mo)', price: 8.00 },
      { id: 'e-truffle', name: 'Shaved Black Truffle', price: 12.00 },
      { id: 'e-focaccia', name: 'Warm Rosemary Focaccia', price: 4.50 }
    ]
  },
  {
    id: 'item-2',
    name: 'Prime Wagyu Beef Carpaccio',
    description: 'Thinly sliced A5 Miyazaki wagyu, caper emulsion, pickled shallots, parmigiano reggiano 36mo, crisp micro herbs.',
    price: 28.50,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    calories: 420,
    inStock: true,
    prepTimeMinutes: 10,
    tags: ['Chef Special', 'Keto'],
    extras: [
      { id: 'e-truffle-oil', name: 'White Truffle Drizzle', price: 5.00 },
      { id: 'e-caviar', name: 'Oscietra Caviar Bump (10g)', price: 25.00 }
    ]
  },
  {
    id: 'item-3',
    name: 'Crispy Calamari Fritti',
    description: 'Point Judith wild calamari, grilled lemon aioli, Calabrian chili honey, parsley salt.',
    price: 21.00,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=600&q=80',
    calories: 540,
    inStock: true,
    prepTimeMinutes: 9,
    tags: ['Popular'],
    extras: [
      { id: 'e-spicy-aioli', name: 'Extra Calabrian Dip', price: 2.50 }
    ]
  },

  // PIZZAS (Woodfired)
  {
    id: 'item-4',
    name: 'Tartufo Nero & Wild Mushroom Pizza',
    description: 'Fior di latte, black summer truffle cream, fontina d’Aosta, roasted chanterelles, thyme-infused honey crust.',
    price: 32.00,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    calories: 920,
    inStock: true,
    prepTimeMinutes: 12,
    tags: ['Chef Signature', 'Vegetarian'],
    variants: [
      { id: 'v-12in', name: '12" Neapolitan Crust', priceDelta: 0 },
      { id: 'v-16in', name: '16" Sharing Crust', priceDelta: 10.00 }
    ],
    extras: [
      { id: 'e-burrata-top', name: 'Whole Burrata on Top', price: 9.00 },
      { id: 'e-hot-honey', name: 'Hot Chili Honey Dip', price: 3.00 },
      { id: 'e-prosciutto-piz', name: 'Parma Ham Crisp', price: 6.00 }
    ]
  },
  {
    id: 'item-5',
    name: 'Diavola Piccante Woodfired Pizza',
    description: 'San Marzano DOP tomato sauce, smoked provolone, spicy spianata calabrese, pickled Fresno peppers, fresh oregano.',
    price: 28.00,
    category: 'pizzas',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    calories: 880,
    inStock: true,
    prepTimeMinutes: 11,
    tags: ['Spicy', 'Best Seller'],
    variants: [
      { id: 'v-12in', name: '12" Neapolitan Crust', priceDelta: 0 },
      { id: 'v-16in', name: '16" Sharing Crust', priceDelta: 10.00 }
    ],
    extras: [
      { id: 'e-olives', name: 'Castelvetrano Olives', price: 3.50 },
      { id: 'e-garlic-dip', name: 'Roasted Garlic Aioli', price: 2.50 }
    ]
  },

  // STEAKS & GRILLS
  {
    id: 'item-6',
    name: 'Dry-Aged Prime Bone-In Ribeye (18oz)',
    description: '45-day dry aged USDA Prime, roasted bone marrow butter, blistered rosemary vine tomatoes, Malbec demi-glace.',
    price: 74.00,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    calories: 1180,
    inStock: true,
    prepTimeMinutes: 20,
    tags: ['Prime Cut', 'Gluten-Free'],
    variants: [
      { id: 'v-rare', name: 'Rare (Cool Red Center)', priceDelta: 0 },
      { id: 'v-med-rare', name: 'Medium Rare (Warm Red Center)', priceDelta: 0 },
      { id: 'v-med', name: 'Medium (Warm Pink Center)', priceDelta: 0 },
      { id: 'v-med-well', name: 'Medium Well (Slight Pink)', priceDelta: 0 }
    ],
    extras: [
      { id: 'e-marrow', name: 'Split Roasted Bone Marrow', price: 12.00 },
      { id: 'e-lobster-tail', name: 'Butter-Poached Lobster Tail', price: 28.00 },
      { id: 'e-chimichurri', name: 'House Herb Chimichurri', price: 4.00 }
    ]
  },
  {
    id: 'item-7',
    name: 'Filet Mignon Centre-Cut (8oz)',
    description: 'Charbroiled Black Angus beef tenderloin, truffle potato puree, grilled jumbo asparagus, green peppercorn jus.',
    price: 58.00,
    category: 'steaks',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    calories: 780,
    inStock: true,
    prepTimeMinutes: 18,
    tags: ['Customer Favorite'],
    variants: [
      { id: 'v-rare', name: 'Rare', priceDelta: 0 },
      { id: 'v-med-rare', name: 'Medium Rare', priceDelta: 0 },
      { id: 'v-med', name: 'Medium', priceDelta: 0 },
      { id: 'v-med-well', name: 'Medium Well', priceDelta: 0 }
    ],
    extras: [
      { id: 'e-foie-gras', name: 'Seared Foie Gras Escalope', price: 22.00 },
      { id: 'e-truffle-butter', name: 'Black Truffle Butter', price: 5.50 }
    ]
  },

  // PASTAS
  {
    id: 'item-8',
    name: 'Handcrafted Tagliolini al Tartufo',
    description: 'House-extruded 30-yolk egg pasta, cultured Normandy butter, 36-month aged Parmigiano Vacche Rosse, shaved fresh black Norcia truffle.',
    price: 38.00,
    category: 'pastas',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817d1?auto=format&fit=crop&w=600&q=80',
    calories: 680,
    inStock: true,
    prepTimeMinutes: 12,
    tags: ['Handmade', 'Vegetarian'],
    extras: [
      { id: 'e-extra-truffle', name: 'Extra Norcia Truffle (5g)', price: 14.00 },
      { id: 'e-parm', name: 'Vacche Rosse Snow', price: 3.00 }
    ]
  },
  {
    id: 'item-9',
    name: 'Lobster Ravioli in Saffron Bisque',
    description: 'Maine lobster & ricotta filling, sweet pea mousseline, baby leeks, golden saffron shellfish emulsion.',
    price: 42.00,
    category: 'pastas',
    image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=600&q=80',
    calories: 720,
    inStock: true,
    prepTimeMinutes: 14,
    tags: ['Seafood Special'],
    extras: [
      { id: 'e-caviar-rav', name: 'Caviar Spoonful', price: 18.00 }
    ]
  },

  // SEAFOOD
  {
    id: 'item-10',
    name: 'Pan-Roasted Mediterranean Branzino',
    description: 'Crisp skin sea bass filet, saffron potato confit, braised fennel, caper berries, salsa verde.',
    price: 44.00,
    category: 'seafood',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    calories: 590,
    inStock: true,
    prepTimeMinutes: 16,
    tags: ['Gluten-Free', 'Healthy'],
    extras: [
      { id: 'e-shrimp', name: 'Jumbo Grilled Tiger Prawns (2pc)', price: 16.00 }
    ]
  },

  // COCKTAILS
  {
    id: 'item-11',
    name: 'Smoked Rosemary Old Fashioned',
    description: 'WhistlePig 10yr Rye, charred orange demerara, Angostura & chocolate bitters, smoked under cloche with applewood.',
    price: 22.00,
    category: 'cocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    calories: 210,
    inStock: true,
    prepTimeMinutes: 4,
    tags: ['Signature Drink'],
    extras: [
      { id: 'e-king-cube', name: 'Custom Stamped Diamond Ice', price: 1.00 }
    ]
  },
  {
    id: 'item-12',
    name: 'Yuzu Blossom French 75',
    description: 'Monkey 47 Gin, freshly squeezed Japanese yuzu, elderflower cordial, topped with Veuve Clicquot Brut.',
    price: 24.00,
    category: 'cocktails',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    calories: 180,
    inStock: true,
    prepTimeMinutes: 3,
    tags: ['Refreshing', 'Champagne'],
    extras: []
  },

  // DESSERTS
  {
    id: 'item-13',
    name: 'Valrhona Dark Chocolate Soufflé',
    description: '70% Guanaja chocolate molten core, Madagascar bourbon vanilla gelato, poured warm crème anglaise.',
    price: 18.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    calories: 620,
    inStock: true,
    prepTimeMinutes: 15,
    tags: ['Baked to Order', 'Dessert of Year'],
    extras: [
      { id: 'e-gold-leaf', name: '24K Edible Gold Leaf', price: 5.00 },
      { id: 'e-extra-gelato', name: 'Extra Gelato Scoop', price: 4.00 }
    ]
  },
  {
    id: 'item-14',
    name: 'Classic Espresso Tiramisu Classico',
    description: 'Savoiardi soaked in double Illy espresso & Marsala florio, whipped mascarpone zabaione, dusted Valrhona cocoa.',
    price: 16.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    calories: 510,
    inStock: true,
    prepTimeMinutes: 4,
    tags: ['Traditional Favorite'],
    extras: []
  }
];

export const INITIAL_TABLES: Table[] = [
  // MAIN DINING
  {
    id: 'tbl-1',
    number: 'T1',
    name: 'Table 1',
    capacity: 2,
    section: 'main',
    status: 'occupied',
    currentOrderId: 'ord-101',
    currentOrderTotal: 142.50,
    seatedAt: '42m ago',
    guestCount: 2,
    serverName: 'Sofia Rossi',
    shape: 'round',
    position: { x: 50, y: 40, w: 90, h: 90 }
  },
  {
    id: 'tbl-2',
    number: 'T2',
    name: 'Table 2',
    capacity: 4,
    section: 'main',
    status: 'occupied',
    currentOrderId: 'ord-102',
    currentOrderTotal: 285.00,
    seatedAt: '18m ago',
    guestCount: 4,
    serverName: 'Julian Meyer',
    shape: 'rect',
    position: { x: 180, y: 40, w: 120, h: 90 }
  },
  {
    id: 'tbl-3',
    number: 'T3',
    name: 'Table 3',
    capacity: 4,
    section: 'main',
    status: 'available',
    shape: 'rect',
    position: { x: 340, y: 40, w: 120, h: 90 }
  },
  {
    id: 'tbl-4',
    number: 'T4',
    name: 'Table 4',
    capacity: 6,
    section: 'main',
    status: 'reserved',
    seatedAt: 'Reserved 7:30 PM',
    guestCount: 6,
    serverName: 'Sofia Rossi',
    shape: 'booth',
    position: { x: 500, y: 40, w: 150, h: 90 }
  },
  {
    id: 'tbl-5',
    number: 'T5',
    name: 'Table 5',
    capacity: 2,
    section: 'main',
    status: 'cleaning',
    seatedAt: 'Just Departed',
    shape: 'round',
    position: { x: 50, y: 170, w: 90, h: 90 }
  },
  {
    id: 'tbl-6',
    number: 'T6',
    name: 'Table 6',
    capacity: 4,
    section: 'main',
    status: 'occupied',
    currentOrderId: 'ord-103',
    currentOrderTotal: 340.00,
    seatedAt: '58m ago',
    guestCount: 4,
    serverName: 'Julian Meyer',
    shape: 'rect',
    position: { x: 180, y: 170, w: 120, h: 90 }
  },

  // TERRACE & PATIO
  {
    id: 'tbl-7',
    number: 'P1',
    name: 'Patio Cabana 1',
    capacity: 4,
    section: 'terrace',
    status: 'occupied',
    currentOrderId: 'ord-104',
    currentOrderTotal: 198.00,
    seatedAt: '25m ago',
    guestCount: 3,
    serverName: 'Elena Rostova',
    shape: 'rect',
    position: { x: 60, y: 50, w: 110, h: 90 }
  },
  {
    id: 'tbl-8',
    number: 'P2',
    name: 'Patio Cabana 2',
    capacity: 4,
    section: 'terrace',
    status: 'available',
    shape: 'rect',
    position: { x: 210, y: 50, w: 110, h: 90 }
  },
  {
    id: 'tbl-9',
    number: 'P3',
    name: 'Garden Pergola',
    capacity: 8,
    section: 'terrace',
    status: 'reserved',
    seatedAt: 'Reserved 8:00 PM',
    guestCount: 8,
    serverName: 'Elena Rostova',
    shape: 'booth',
    position: { x: 360, y: 50, w: 170, h: 90 }
  },

  // VIP MEZZANINE
  {
    id: 'tbl-10',
    number: 'VIP 1',
    name: 'Salon Privé Laurent',
    capacity: 10,
    section: 'vip',
    status: 'occupied',
    currentOrderId: 'ord-105',
    currentOrderTotal: 840.00,
    seatedAt: '1h 15m ago',
    guestCount: 8,
    serverName: 'Marco Silva (GM)',
    shape: 'booth',
    position: { x: 80, y: 50, w: 220, h: 110 }
  },
  {
    id: 'tbl-11',
    number: 'VIP 2',
    name: 'The Wine Cellar Alcove',
    capacity: 6,
    section: 'vip',
    status: 'available',
    shape: 'round',
    position: { x: 350, y: 50, w: 130, h: 110 }
  },

  // BAR AREA
  {
    id: 'tbl-12',
    number: 'B1',
    name: 'Bar Seat 1-2',
    capacity: 2,
    section: 'bar',
    status: 'occupied',
    currentOrderId: 'ord-106',
    currentOrderTotal: 68.00,
    seatedAt: '12m ago',
    guestCount: 2,
    serverName: 'Leo Vance (Mixologist)',
    shape: 'round',
    position: { x: 50, y: 50, w: 80, h: 80 }
  },
  {
    id: 'tbl-13',
    number: 'B2',
    name: 'Bar Seat 3-4',
    capacity: 2,
    section: 'bar',
    status: 'available',
    shape: 'round',
    position: { x: 160, y: 50, w: 80, h: 80 }
  },
  {
    id: 'tbl-14',
    number: 'B3',
    name: 'High Top Lounge',
    capacity: 4,
    section: 'bar',
    status: 'occupied',
    currentOrderId: 'ord-107',
    currentOrderTotal: 154.00,
    seatedAt: '35m ago',
    guestCount: 4,
    serverName: 'Leo Vance (Mixologist)',
    shape: 'rect',
    position: { x: 270, y: 50, w: 110, h: 80 }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    displayId: '#2841',
    tableId: 'tbl-1',
    tableName: 'Table 1',
    orderType: 'dine_in',
    status: 'preparing',
    paymentStatus: 'unpaid',
    createdAt: '18:25 PM',
    serverName: 'Sofia Rossi',
    customerName: 'Marcus Sterling',
    elapsedMinutes: 12,
    courseNumber: 1,
    isVip: true,
    items: [
      {
        cartItemId: 'c-1',
        item: INITIAL_MENU_ITEMS[0], // Burrata
        quantity: 1,
        selectedVariant: INITIAL_MENU_ITEMS[0].variants?.[0],
        selectedExtras: [INITIAL_MENU_ITEMS[0].extras![0]],
        specialInstructions: 'Olive oil on the side please',
        itemTotal: 32.00
      },
      {
        cartItemId: 'c-2',
        item: INITIAL_MENU_ITEMS[3], // Tartufo Pizza
        quantity: 1,
        selectedVariant: INITIAL_MENU_ITEMS[3].variants?.[0],
        selectedExtras: [],
        itemTotal: 32.00
      },
      {
        cartItemId: 'c-3',
        item: INITIAL_MENU_ITEMS[10], // Old Fashioned
        quantity: 2,
        selectedExtras: [],
        itemTotal: 44.00
      }
    ],
    subtotal: 108.00,
    tax: 9.58,
    discount: 0,
    tip: 24.92,
    total: 142.50,
    completedItems: ['c-3']
  },
  {
    id: 'ord-102',
    displayId: '#2842',
    tableId: 'tbl-2',
    tableName: 'Table 2',
    orderType: 'dine_in',
    status: 'new',
    paymentStatus: 'unpaid',
    createdAt: '18:38 PM',
    serverName: 'Julian Meyer',
    customerName: 'Claire Vanderbilt',
    elapsedMinutes: 4,
    courseNumber: 1,
    isRush: true,
    items: [
      {
        cartItemId: 'c-4',
        item: INITIAL_MENU_ITEMS[1], // Wagyu Carpaccio
        quantity: 2,
        selectedExtras: [INITIAL_MENU_ITEMS[1].extras![0]],
        itemTotal: 67.00
      },
      {
        cartItemId: 'c-5',
        item: INITIAL_MENU_ITEMS[5], // Ribeye
        quantity: 2,
        selectedVariant: INITIAL_MENU_ITEMS[5].variants?.[1], // Med Rare
        selectedExtras: [INITIAL_MENU_ITEMS[5].extras![0]],
        itemTotal: 172.00
      }
    ],
    subtotal: 239.00,
    tax: 21.21,
    discount: 0,
    tip: 24.79,
    total: 285.00,
    completedItems: []
  },
  {
    id: 'ord-103',
    displayId: '#2843',
    tableId: 'tbl-6',
    tableName: 'Table 6',
    orderType: 'dine_in',
    status: 'ready',
    paymentStatus: 'unpaid',
    createdAt: '17:50 PM',
    serverName: 'Julian Meyer',
    customerName: 'Dr. Gregory House',
    elapsedMinutes: 24,
    courseNumber: 2,
    items: [
      {
        cartItemId: 'c-6',
        item: INITIAL_MENU_ITEMS[7], // Tagliolini
        quantity: 2,
        selectedExtras: [INITIAL_MENU_ITEMS[7].extras![0]],
        itemTotal: 104.00
      },
      {
        cartItemId: 'c-7',
        item: INITIAL_MENU_ITEMS[8], // Lobster Ravioli
        quantity: 2,
        selectedExtras: [],
        itemTotal: 84.00
      },
      {
        cartItemId: 'c-8',
        item: INITIAL_MENU_ITEMS[12], // Souffle
        quantity: 2,
        selectedExtras: [],
        itemTotal: 36.00
      }
    ],
    subtotal: 290.00,
    tax: 25.74,
    discount: 0,
    tip: 24.26,
    total: 340.00,
    completedItems: ['c-6', 'c-7']
  },
  {
    id: 'ord-104',
    displayId: '#2844',
    tableName: 'Patio Cabana 1',
    tableId: 'tbl-7',
    orderType: 'dine_in',
    status: 'served',
    paymentStatus: 'paid',
    paymentMethod: 'apple_pay',
    createdAt: '18:10 PM',
    serverName: 'Elena Rostova',
    customerName: 'Lucas Moreau',
    elapsedMinutes: 38,
    items: [
      {
        cartItemId: 'c-9',
        item: INITIAL_MENU_ITEMS[4], // Diavola Pizza
        quantity: 2,
        selectedVariant: INITIAL_MENU_ITEMS[4].variants?.[0],
        selectedExtras: [],
        itemTotal: 56.00
      },
      {
        cartItemId: 'c-10',
        item: INITIAL_MENU_ITEMS[11], // French 75
        quantity: 4,
        selectedExtras: [],
        itemTotal: 96.00
      }
    ],
    subtotal: 168.00,
    tax: 14.91,
    discount: 0,
    tip: 15.09,
    total: 198.00,
    completedItems: ['c-9', 'c-10']
  },
  {
    id: 'ord-105',
    displayId: '#2845',
    tableName: 'Salon Privé Laurent',
    tableId: 'tbl-10',
    orderType: 'dine_in',
    status: 'preparing',
    paymentStatus: 'authorized',
    paymentMethod: 'credit_card',
    createdAt: '17:30 PM',
    serverName: 'Marco Silva (GM)',
    customerName: 'Victoria Secret Exec Dinner',
    elapsedMinutes: 16,
    isVip: true,
    items: [
      {
        cartItemId: 'c-11',
        item: INITIAL_MENU_ITEMS[1], // Wagyu Carpaccio
        quantity: 4,
        selectedExtras: [INITIAL_MENU_ITEMS[1].extras![1]], // Caviar Bump
        itemTotal: 214.00
      },
      {
        cartItemId: 'c-12',
        item: INITIAL_MENU_ITEMS[5], // Ribeye
        quantity: 4,
        selectedVariant: INITIAL_MENU_ITEMS[5].variants?.[1],
        selectedExtras: [INITIAL_MENU_ITEMS[5].extras![1]], // Lobster tail
        itemTotal: 408.00
      }
    ],
    subtotal: 720.00,
    tax: 63.90,
    discount: 0,
    tip: 56.10,
    total: 840.00,
    completedItems: ['c-11']
  },
  {
    id: 'ord-108',
    displayId: '#2848',
    orderType: 'takeaway',
    status: 'ready',
    paymentStatus: 'paid',
    paymentMethod: 'apple_pay',
    createdAt: '18:42 PM',
    serverName: 'Front Desk Host',
    customerName: 'Sarah Jenkins',
    elapsedMinutes: 8,
    items: [
      {
        cartItemId: 'c-13',
        item: INITIAL_MENU_ITEMS[3], // Tartufo Pizza
        quantity: 1,
        selectedVariant: INITIAL_MENU_ITEMS[3].variants?.[0],
        selectedExtras: [],
        itemTotal: 32.00
      },
      {
        cartItemId: 'c-14',
        item: INITIAL_MENU_ITEMS[13], // Tiramisu
        quantity: 2,
        selectedExtras: [],
        itemTotal: 32.00
      }
    ],
    subtotal: 64.00,
    tax: 5.68,
    discount: 0,
    tip: 10.32,
    total: 80.00,
    completedItems: ['c-13', 'c-14']
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'PR-A5-WAGYU',
    name: 'Miyazaki A5 Wagyu Tenderloin',
    category: 'Meat & Poultry',
    currentStock: 4.8,
    minPar: 6.0,
    maxPar: 18.0,
    unit: 'kg',
    unitCost: 185.00,
    supplierName: 'Kobe Gourmet Imports',
    status: 'low',
    lastOrdered: 'Oct 30, 2026'
  },
  {
    id: 'inv-2',
    sku: 'TR-NORCIA-BLK',
    name: 'Fresh Black Norcia Truffles',
    category: 'Produce & Mushrooms',
    currentStock: 320,
    minPar: 500,
    maxPar: 1200,
    unit: 'grams',
    unitCost: 1.45,
    supplierName: 'Umbria Tartufi Co.',
    status: 'low',
    lastOrdered: 'Nov 01, 2026'
  },
  {
    id: 'inv-3',
    sku: 'CH-BURRATA-200',
    name: 'Pugliese Burrata Cheese DOP (200g)',
    category: 'Dairy & Cheese',
    currentStock: 12,
    minPar: 24,
    maxPar: 60,
    unit: 'pcs',
    unitCost: 6.20,
    supplierName: 'Latteria Sorrentina',
    status: 'critical',
    lastOrdered: 'Oct 28, 2026'
  },
  {
    id: 'inv-4',
    sku: 'SF-ME-LOBSTER',
    name: 'Live Maine Lobster (1.5 lb avg)',
    category: 'Seafood',
    currentStock: 28,
    minPar: 20,
    maxPar: 50,
    unit: 'live units',
    unitCost: 18.50,
    supplierName: 'Atlantic Harbor Seafoods',
    status: 'optimal',
    lastOrdered: 'Nov 02, 2026'
  },
  {
    id: 'inv-5',
    sku: 'LIQ-WP-10YR',
    name: 'WhistlePig 10 Year Straight Rye (750ml)',
    category: 'Spirits & Liqueur',
    currentStock: 14,
    minPar: 10,
    maxPar: 30,
    unit: 'bottles',
    unitCost: 62.00,
    supplierName: 'Empire Merchants Bev',
    status: 'optimal',
    lastOrdered: 'Oct 24, 2026'
  },
  {
    id: 'inv-6',
    sku: 'DR-VAL-70GUAN',
    name: 'Valrhona Guanaja 70% Dark Chocolate Feves',
    category: 'Dry Goods & Baking',
    currentStock: 8.5,
    minPar: 12.0,
    maxPar: 35.0,
    unit: 'kg',
    unitCost: 34.00,
    supplierName: 'Valrhona USA Direct',
    status: 'low',
    lastOrdered: 'Oct 22, 2026'
  },
  {
    id: 'inv-7',
    sku: 'OL-EVOO-SICIL',
    name: 'Castelvetrano Cold Press EVOO (5L Tin)',
    category: 'Oils & Condiments',
    currentStock: 9,
    minPar: 6,
    maxPar: 20,
    unit: 'tins',
    unitCost: 78.00,
    supplierName: 'Gustiamo Italian Specialty',
    status: 'optimal',
    lastOrdered: 'Oct 15, 2026'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Kobe Gourmet Imports',
    contactPerson: 'Kenji Takahashi',
    email: 'orders@kobegourmet.com',
    phone: '(212) 555-8392',
    category: 'Wagyu & Prime Meats',
    paymentTerms: 'Net 15',
    rating: 4.9,
    outstandingBalance: 4250.00,
    activeOrdersCount: 1
  },
  {
    id: 'sup-2',
    name: 'Umbria Tartufi Co.',
    contactPerson: 'Matteo Bellini',
    email: 'imports@umbriatartufi.it',
    phone: '+39 075 555 491',
    category: 'Fresh Truffles & Caviar',
    paymentTerms: 'Due upon arrival',
    rating: 5.0,
    outstandingBalance: 2890.00,
    activeOrdersCount: 2
  },
  {
    id: 'sup-3',
    name: 'Atlantic Harbor Seafoods',
    contactPerson: 'Captain Dave O\'Connor',
    email: 'orders@atlanticharbor.com',
    phone: '(617) 555-0914',
    category: 'Daily Wild Catch & Shellfish',
    paymentTerms: 'Net 30',
    rating: 4.8,
    outstandingBalance: 1650.00,
    activeOrdersCount: 1
  },
  {
    id: 'sup-4',
    name: 'Latteria Sorrentina',
    contactPerson: 'Francesca Esposito',
    email: 'sales@latteriasorrentina.com',
    phone: '(718) 555-3291',
    category: 'Fresh Italian Cheeses & Butter',
    paymentTerms: 'Weekly Autopay',
    rating: 4.7,
    outstandingBalance: 780.00,
    activeOrdersCount: 1
  },
  {
    id: 'sup-5',
    name: 'Empire Merchants Wine & Spirits',
    contactPerson: 'David Miller',
    email: 'dmiller@empiremerchants.com',
    phone: '(212) 555-9081',
    category: 'Wines, Champagnes & Fine Spirits',
    paymentTerms: 'Net 30',
    rating: 4.9,
    outstandingBalance: 6140.00,
    activeOrdersCount: 3
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Marcus Sterling',
    email: 'msterling@apexcapital.com',
    phone: '+1 (917) 555-4812',
    vipTier: 'Black Diamond',
    totalVisits: 47,
    totalSpend: 14890.00,
    lastVisit: 'Tonight (Seated)',
    favoriteItem: 'Prime Ribeye (Rare) + Brunello di Montalcino',
    dietaryNotes: ['Prefers Booth T4 or Salon Privé', 'Allergic to Shellfish']
  },
  {
    id: 'cust-2',
    name: 'Claire Vanderbilt',
    email: 'claire.vanderbilt@studio-v.design',
    phone: '+1 (646) 555-9034',
    vipTier: 'Gold VIP',
    totalVisits: 28,
    totalSpend: 7640.00,
    lastVisit: 'Tonight (Seated)',
    favoriteItem: 'Handcrafted Tagliolini al Tartufo',
    dietaryNotes: ['Extra Truffle sauce', 'Likes quiet corner tables']
  },
  {
    id: 'cust-3',
    name: 'Lucas Moreau',
    email: 'lmoreau@parisfoundry.io',
    phone: '+1 (347) 555-2281',
    vipTier: 'Silver VIP',
    totalVisits: 14,
    totalSpend: 3120.00,
    lastVisit: '2 days ago',
    favoriteItem: 'French 75 & Diavola Pizza',
    dietaryNotes: ['Prefers outdoor Patio Cabana']
  },
  {
    id: 'cust-4',
    name: 'Sofia Al-Mansoor',
    email: 'sofia.almansoor@gulfholding.com',
    phone: '+1 (212) 555-7762',
    vipTier: 'Black Diamond',
    totalVisits: 39,
    totalSpend: 19420.00,
    lastVisit: 'Last Friday',
    favoriteItem: 'Branzino & Dom Pérignon Vintage',
    dietaryNotes: ['Halal requirements', 'Always requests Sommelier Marco']
  },
  {
    id: 'cust-5',
    name: 'Dr. Gregory House',
    email: 'house.diagnostics@princeton.edu',
    phone: '+1 (609) 555-1049',
    vipTier: 'Regular',
    totalVisits: 9,
    totalSpend: 1850.00,
    lastVisit: 'Tonight (Seated)',
    favoriteItem: 'Prime Wagyu Carpaccio',
    dietaryNotes: ['No peanuts', 'Extra balsamic']
  }
];

export const INITIAL_DELIVERY_ORDERS: DeliveryOrder[] = [
  {
    id: 'del-1',
    displayId: '#DL-901',
    customerName: 'Eleanor Vance',
    address: '740 Park Ave, Penthouse B, NYC',
    phone: '(212) 555-0912',
    courier: {
      name: 'Carlos Rivera',
      company: 'DoorDash Drive',
      phone: '(347) 555-8910',
      rating: 4.95
    },
    itemsCount: 4,
    total: 168.50,
    status: 'dispatched',
    etaMinutes: 14,
    placedAt: '18:22 PM'
  },
  {
    id: 'del-2',
    displayId: '#DL-902',
    customerName: 'Jonathan Wu',
    address: '15 Central Park West, Apt 18C, NYC',
    phone: '(917) 555-3312',
    courier: {
      name: 'Ahmed Malik',
      company: 'Uber Direct',
      phone: '(646) 555-4011',
      rating: 4.88
    },
    itemsCount: 3,
    total: 122.00,
    status: 'picked_up',
    etaMinutes: 8,
    placedAt: '18:14 PM'
  },
  {
    id: 'del-3',
    displayId: '#DL-903',
    customerName: 'Devon Bradley',
    address: '100 Barclay St, Apt 9A, NYC',
    phone: '(212) 555-9921',
    courier: {
      name: 'Dmitri Petrov',
      company: 'In-House Courier',
      phone: '(212) 555-0198',
      rating: 5.0
    },
    itemsCount: 6,
    total: 310.00,
    status: 'delivered',
    etaMinutes: 0,
    placedAt: '17:45 PM'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Marco Silva',
    role: 'General Manager',
    status: 'clocked_in',
    shiftHours: 6.5,
    hourlyRate: 48.00,
    ordersHandled: 84,
    salesGenerated: 4820.00,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'emp-2',
    name: 'Chef Laurent Vasseur',
    role: 'Executive Chef',
    status: 'clocked_in',
    shiftHours: 7.2,
    hourlyRate: 55.00,
    ordersHandled: 112,
    salesGenerated: 7890.00,
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'emp-3',
    name: 'Sofia Rossi',
    role: 'Floor Captain',
    status: 'clocked_in',
    shiftHours: 5.0,
    hourlyRate: 26.00,
    ordersHandled: 42,
    salesGenerated: 3140.00,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'emp-4',
    name: 'Julian Meyer',
    role: 'Lead Sommelier',
    status: 'clocked_in',
    shiftHours: 5.8,
    hourlyRate: 32.00,
    ordersHandled: 38,
    salesGenerated: 4210.00,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'emp-5',
    name: 'Leo Vance',
    role: 'Senior Bartender',
    status: 'clocked_in',
    shiftHours: 4.5,
    hourlyRate: 28.00,
    ordersHandled: 64,
    salesGenerated: 2150.00,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'emp-6',
    name: 'Mateo Hernandez',
    role: 'Line Cook',
    status: 'on_break',
    shiftHours: 4.0,
    hourlyRate: 24.00,
    ordersHandled: 70,
    salesGenerated: 3400.00,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'Umbria Tartufi Co. - Weekly Fresh Shipment',
    category: 'Food Cost',
    amount: 2890.00,
    vendor: 'Umbria Tartufi Co.',
    date: 'Today, 2:30 PM',
    paymentMethod: 'Corporate Wire (Stripe Treasury)',
    status: 'settled'
  },
  {
    id: 'exp-2',
    title: 'Empire Merchants - Fine Wine Restock',
    category: 'Beverage Cost',
    amount: 4120.00,
    vendor: 'Empire Merchants Bev',
    date: 'Yesterday',
    paymentMethod: 'Amex Business Gold',
    status: 'settled'
  },
  {
    id: 'exp-3',
    title: 'Bi-Weekly Front & Kitchen Staff Payroll',
    category: 'Labor & Payroll',
    amount: 14850.00,
    vendor: 'Gusto Embedded Payroll',
    date: 'Oct 31, 2026',
    paymentMethod: 'ACH Direct Debit',
    status: 'settled'
  },
  {
    id: 'exp-4',
    title: 'Woodfired Pizza Oven Maintenance & Chimney Sweep',
    category: 'Maintenance',
    amount: 750.00,
    vendor: 'Artisan Hearth Techs',
    date: 'Oct 29, 2026',
    paymentMethod: 'Debit Card',
    status: 'settled'
  },
  {
    id: 'exp-5',
    title: 'Latteria Sorrentina Fresh Burrata & Mozzarella',
    category: 'Food Cost',
    amount: 680.00,
    vendor: 'Latteria Sorrentina',
    date: 'Oct 28, 2026',
    paymentMethod: 'Vendor Invoice',
    status: 'pending'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Low Stock Alert',
    message: 'Pugliese Burrata Cheese DOP (200g) reached critical threshold (12 pcs remaining).',
    time: '8m ago',
    type: 'urgent',
    read: false
  },
  {
    id: 'notif-2',
    title: 'VIP Arrival Notice',
    message: 'Black Diamond guest Marcus Sterling seated at Table 1. Favorite wine alerted to Sommelier.',
    time: '24m ago',
    type: 'info',
    read: false
  },
  {
    id: 'notif-3',
    title: 'High-Value Order Processed',
    message: 'Table Salon Privé Laurent placed ticket #2845 totaling $840.00.',
    time: '45m ago',
    type: 'success',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Shift Clock-In Reminder',
    message: 'Dinner service staff roster complete. 16 team members active on floor.',
    time: '1h ago',
    type: 'info',
    read: true
  }
];

export const REVENUE_DATA = [
  { time: '12:00 PM', amount: 1240, orders: 34 },
  { time: '1:00 PM', amount: 2480, orders: 62 },
  { time: '2:00 PM', amount: 1890, orders: 48 },
  { time: '3:00 PM', amount: 920, orders: 22 },
  { time: '4:00 PM', amount: 1100, orders: 28 },
  { time: '5:00 PM', amount: 3100, orders: 74 },
  { time: '6:00 PM', amount: 5640, orders: 128 },
  { time: '7:00 PM', amount: 8920, orders: 184 },
  { time: '8:00 PM', amount: 9480, orders: 204 },
  { time: '9:00 PM', amount: 7320, orders: 156 },
  { time: '10:00 PM', amount: 4800, orders: 98 },
  { time: '11:00 PM', amount: 2200, orders: 44 }
];

export const PAYMENT_BREAKDOWN = [
  { method: 'Apple Pay & Contactless', percentage: 44, amount: 21247.80, color: '#635BFF' },
  { method: 'Credit & Debit Cards', percentage: 38, amount: 18350.40, color: '#0EA5A4' },
  { method: 'Cash Payments', percentage: 11, amount: 5311.95, color: '#16A34A' },
  { method: 'Delivery Platforms (API)', percentage: 7, amount: 3380.35, color: '#F59E0B' }
];
