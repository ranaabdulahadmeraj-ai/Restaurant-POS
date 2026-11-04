# 🍽️ RestaurantOS — Enterprise Restaurant Management Platform

A premium, production-grade Restaurant Operating System built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **Dashboard** — Live KPIs, revenue charts, inventory alerts, order pipeline
- **Point of Sale (POS)** — 3-column touch-optimized terminal with item customization
- **Kitchen Display System (KDS)** — Real-time dark-mode kitchen expediter screen
- **Floor Plan & Tables** — Interactive table management with status tracking
- **Orders** — Full order register with status workflow and CSV export
- **Menu Management** — Dish catalog with live pricing and 86-status toggles
- **Inventory** — PAR-level stock monitoring with 1-click reorder
- **Suppliers** — Vendor directory and purchase order management
- **Customers (CRM)** — VIP guest profiles, loyalty tiers, dietary notes
- **Delivery** — Live courier dispatch (DoorDash Drive, Uber Direct, In-House)
- **Employees** — Staff roster, shift tracking, sales performance
- **Expenses** — P&L expense ledger with category breakdown
- **Reports** — Z-Report, revenue analytics, payment method breakdowns
- **Settings** — Branch, tax, hardware configuration

## 🎨 Design System

Inspired by Linear, Stripe, Vercel, and Apple — using a clean, premium SaaS aesthetic.

| Token | Value |
|---|---|
| Primary Accent | `#635BFF` |
| Secondary Accent | `#0EA5A4` |
| Sidebar | `#111827` |
| Background | `#F7F8FA` |
| Font | Inter / Geist |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠️ Tech Stack

- **React 19** + TypeScript
- **Vite 8**
- **Tailwind CSS 3**
- **Lucide React** (icons)
- **Framer Motion** (animations)
- **Canvas Confetti** (checkout celebration)

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` | Open Command Palette |

## 📁 Project Structure

```
src/
├── components/
│   ├── common/        # CommandPalette, ToastContainer
│   ├── layout/        # Sidebar, Header
│   ├── pos/           # ProductCustomizerModal, CheckoutModal
│   └── tables/        # TableDetailModal
├── context/           # RestaurantContext (global state)
├── data/              # Mock data & sample content
├── types/             # TypeScript type definitions
├── utils/             # Formatting utilities
└── views/             # All 14 application screens
```

## 📄 License

MIT © RestaurantOS
