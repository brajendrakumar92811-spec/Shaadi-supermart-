import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomerHome } from './components/customer/CustomerHome';
import { VendorDirectory } from './components/customer/VendorDirectory';
import { BudgetPlanner } from './components/customer/BudgetPlanner';
import { ChecklistPlanner } from './components/customer/ChecklistPlanner';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { VendorDetailModal } from './components/customer/VendorDetailModal';
import {
  Home,
  Search,
  Wallet,
  CalendarCheck,
  User,
  Shield,
  Briefcase,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    userRole,
    setUserRole,
    activeCustomerTab,
    setActiveCustomerTab,
    activeVendorModalId,
    setActiveVendorModalId,
  } = useApp();

  const [initialDetailTab, setInitialDetailTab] = React.useState<'overview' | 'quote'>('overview');

  const handleOpenDetails = (vendorId: string) => {
    setInitialDetailTab('overview');
    setActiveVendorModalId(vendorId);
  };

  const handleRequestQuote = (vendor: any) => {
    setInitialDetailTab('quote');
    setActiveVendorModalId(vendor.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 pb-16 md:pb-0">
      {/* Top Navigation conforming to Top-Bar Contract */}
      <Navbar />

      {/* Main View Area Routing */}
      <main className="flex-1">
        {userRole === 'vendor' ? (
          <VendorDashboard />
        ) : userRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          /* Customer Portal Views */
          <>
            {activeCustomerTab === 'home' && (
              <CustomerHome
                onOpenDetails={handleOpenDetails}
                onRequestQuote={handleRequestQuote}
              />
            )}
            {activeCustomerTab === 'directory' && (
              <VendorDirectory
                onOpenDetails={handleOpenDetails}
                onRequestQuote={handleRequestQuote}
              />
            )}
            {activeCustomerTab === 'budget' && <BudgetPlanner />}
            {activeCustomerTab === 'checklist' && <ChecklistPlanner />}
            {activeCustomerTab === 'account' && <CustomerPortal />}
          </>
        )}
      </main>

      {/* Global Vendor Profile & Quotation Request Modal */}
      {activeVendorModalId && (
        <VendorDetailModal
          vendorId={activeVendorModalId}
          initialTab={initialDetailTab}
          onClose={() => setActiveVendorModalId(null)}
        />
      )}

      {/* Footer (Rendered in customer & public views) */}
      {userRole === 'customer' && <Footer />}

      {/* Mobile Bottom Navigation Bar (strictly adheres to 15% mobile viewport cap) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 py-1.5 px-3 flex items-center justify-around text-[10px]"
      >
        <button
          onClick={() => {
            setUserRole('customer');
            setActiveCustomerTab('home');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center ${
            userRole === 'customer' && activeCustomerTab === 'home'
              ? 'text-[#6E1428] font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setUserRole('customer');
            setActiveCustomerTab('directory');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center ${
            userRole === 'customer' && activeCustomerTab === 'directory'
              ? 'text-[#6E1428] font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Vendors</span>
        </button>

        <button
          onClick={() => {
            setUserRole('customer');
            setActiveCustomerTab('budget');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center ${
            userRole === 'customer' && activeCustomerTab === 'budget'
              ? 'text-[#6E1428] font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Budget</span>
        </button>

        <button
          onClick={() => {
            setUserRole('customer');
            setActiveCustomerTab('checklist');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center ${
            userRole === 'customer' && activeCustomerTab === 'checklist'
              ? 'text-[#6E1428] font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Checklist</span>
        </button>

        <button
          onClick={() => {
            setUserRole('customer');
            setActiveCustomerTab('account');
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center ${
            userRole === 'customer' && activeCustomerTab === 'account'
              ? 'text-[#6E1428] font-bold'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Bookings</span>
        </button>

        <button
          onClick={() => {
            if (userRole === 'customer') setUserRole('vendor');
            else if (userRole === 'vendor') setUserRole('admin');
            else setUserRole('customer');
          }}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded cursor-pointer min-h-[44px] justify-center text-[#6E1428] font-semibold border-l border-stone-200 pl-2"
        >
          {userRole === 'admin' ? (
            <Shield className="w-4 h-4 text-amber-700" />
          ) : userRole === 'vendor' ? (
            <Briefcase className="w-4 h-4 text-[#6E1428]" />
          ) : (
            <Briefcase className="w-4 h-4 text-stone-500" />
          )}
          <span className="capitalize">{userRole}</span>
        </button>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
