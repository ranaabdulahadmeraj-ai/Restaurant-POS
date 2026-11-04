import React from 'react';
import { RestaurantProvider } from './context/RestaurantContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ViewRouter } from './views/ViewRouter';
import { ToastContainer } from './components/common/ToastContainer';
import { CommandPalette } from './components/common/CommandPalette';
import { ProductCustomizerModal } from './components/pos/ProductCustomizerModal';
import { CheckoutModal } from './components/pos/CheckoutModal';
import { TableDetailModal } from './components/tables/TableDetailModal';

const AppInner: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F8FA]">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Sticky Top Header */}
        <Header />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">
          <ViewRouter />
        </main>
      </div>

      {/* Global Overlays */}
      <CommandPalette />
      <ProductCustomizerModal />
      <CheckoutModal />
      <TableDetailModal />
      <ToastContainer />
    </div>
  );
};

const App: React.FC = () => (
  <RestaurantProvider>
    <AppInner />
  </RestaurantProvider>
);

export default App;
