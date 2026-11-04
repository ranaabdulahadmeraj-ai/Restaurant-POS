import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';

// Views
import { DashboardView } from './DashboardView';
import { PosView } from './PosView';
import { OrdersView } from './OrdersView';
import { KitchenDisplayView } from './KitchenDisplayView';
import { TablesView } from './TablesView';
import { MenuView } from './MenuView';
import { InventoryView } from './InventoryView';
import { SuppliersView } from './SuppliersView';
import { CustomersView } from './CustomersView';
import { DeliveryView } from './DeliveryView';
import { EmployeesView } from './EmployeesView';
import { ExpensesView } from './ExpensesView';
import { ReportsView } from './ReportsView';
import { SettingsView } from './SettingsView';

export const ViewRouter: React.FC = () => {
  const { activeTab } = useRestaurant();

  const views: Record<string, React.FC> = {
    dashboard: DashboardView,
    pos: PosView,
    orders: OrdersView,
    kds: KitchenDisplayView,
    tables: TablesView,
    menu: MenuView,
    inventory: InventoryView,
    suppliers: SuppliersView,
    customers: CustomersView,
    delivery: DeliveryView,
    employees: EmployeesView,
    expenses: ExpensesView,
    reports: ReportsView,
    settings: SettingsView,
  };

  const ActiveView = views[activeTab] || DashboardView;
  return <ActiveView />;
};
