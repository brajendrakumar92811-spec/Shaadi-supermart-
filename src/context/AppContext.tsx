import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  CityLocation,
  WeddingCategory,
  Vendor,
  Enquiry,
  Quotation,
  Booking,
  BudgetItem,
  ChecklistTask,
  AdvertisementBanner,
  AuditLogItem,
} from '../types';
import {
  INITIAL_CITIES,
  INITIAL_CATEGORIES,
  INITIAL_VENDORS,
  INITIAL_ENQUIRIES,
  INITIAL_QUOTATIONS,
  INITIAL_BOOKINGS,
  INITIAL_BUDGET_ITEMS,
  INITIAL_CHECKLIST,
  INITIAL_ADVERTISEMENTS,
} from '../data/mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedLocality: string;
  setSelectedLocality: (locality: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (catId: string) => void;
  weddingDateFilter: string;
  setWeddingDateFilter: (date: string) => void;

  activeCustomerTab: 'home' | 'directory' | 'budget' | 'checklist' | 'account';
  setActiveCustomerTab: (tab: 'home' | 'directory' | 'budget' | 'checklist' | 'account') => void;
  activeVendorModalId: string | null;
  setActiveVendorModalId: (id: string | null) => void;

  categories: WeddingCategory[];
  cities: CityLocation[];
  vendors: Vendor[];
  enquiries: Enquiry[];
  quotations: Quotation[];
  bookings: Booking[];
  budgetItems: BudgetItem[];
  totalBudget: number;
  checklist: ChecklistTask[];
  advertisements: AdvertisementBanner[];
  auditLogs: AuditLogItem[];
  favourites: string[];

  toggleFavourite: (vendorId: string) => void;
  submitEnquiry: (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => string;
  createQuotation: (data: Omit<Quotation, 'id' | 'createdAt' | 'status'>) => string;
  acceptQuotation: (quotationId: string) => void;
  payBookingAdvance: (bookingId: string, amount: number, method: string) => void;
  submitReview: (bookingId: string, vendorId: string, rating: number, comment: string) => void;
  registerVendor: (data: Partial<Vendor>) => void;
  approveVendor: (vendorId: string) => void;
  rejectVendor: (vendorId: string, reason: string) => void;
  toggleVendorSuspension: (vendorId: string, reason: string) => void;
  addCategory: (cat: { name: string; nameHi: string; icon: string; description: string }) => void;
  toggleCategoryStatus: (catId: string) => void;
  addLocality: (cityId: string, locality: string) => void;
  updateTotalBudget: (amount: number) => void;
  addBudgetItem: (item: Omit<BudgetItem, 'id'>) => void;
  deleteBudgetItem: (id: string) => void;
  toggleChecklistTask: (taskId: string) => void;
  addChecklistTask: (task: Omit<ChecklistTask, 'id'>) => void;
  recordAdClick: (adId: string) => void;
  updateVendorServices: (vendorId: string, packages: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'shaadi_supermart_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCity, setSelectedCity] = useState<string>('Etawah');
  const [selectedLocality, setSelectedLocality] = useState<string>('All Localities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [weddingDateFilter, setWeddingDateFilter] = useState<string>('2026-11-25');
  const [activeCustomerTab, setActiveCustomerTab] = useState<'home' | 'directory' | 'budget' | 'checklist' | 'account'>('home');
  const [activeVendorModalId, setActiveVendorModalId] = useState<string | null>(null);

  // Stored states with fallback to initial mock data
  const [categories, setCategories] = useState<WeddingCategory[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}categories`);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [cities, setCities] = useState<CityLocation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}cities`);
    return saved ? JSON.parse(saved) : INITIAL_CITIES;
  });

  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}vendors`);
    return saved ? JSON.parse(saved) : INITIAL_VENDORS;
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}enquiries`);
    return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quotations`);
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}bookings`);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}budget`);
    return saved ? JSON.parse(saved) : INITIAL_BUDGET_ITEMS;
  });

  const [totalBudget, setTotalBudget] = useState<number>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}total_budget`);
    return saved ? Number(saved) : 1500000;
  });

  const [checklist, setChecklist] = useState<ChecklistTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}checklist`);
    return saved ? JSON.parse(saved) : INITIAL_CHECKLIST;
  });

  const [advertisements, setAdvertisements] = useState<AdvertisementBanner[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}ads`);
    return saved ? JSON.parse(saved) : INITIAL_ADVERTISEMENTS;
  });

  const [favourites, setFavourites] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}favourites`);
    return saved ? JSON.parse(saved) : ['vendor-1', 'vendor-2'];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-1',
      actor: 'Super Admin',
      action: 'VENDOR_VERIFY',
      target: 'Royal Shutterbug Cine Studio',
      timestamp: '2026-10-01 11:20 AM',
      details: 'Business registration and phone verified.',
    },
    {
      id: 'log-2',
      actor: 'Super Admin',
      action: 'COMMISSION_SET',
      target: 'Platform Policy',
      timestamp: '2026-10-02 02:45 PM',
      details: 'Standard booking marketplace commission set to 8%.',
    },
  ]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}categories`, JSON.stringify(categories));
  }, [categories]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}cities`, JSON.stringify(cities));
  }, [cities]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}vendors`, JSON.stringify(vendors));
  }, [vendors]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}enquiries`, JSON.stringify(enquiries));
  }, [enquiries]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}quotations`, JSON.stringify(quotations));
  }, [quotations]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}bookings`, JSON.stringify(bookings));
  }, [bookings]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}budget`, JSON.stringify(budgetItems));
  }, [budgetItems]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}total_budget`, totalBudget.toString());
  }, [totalBudget]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}checklist`, JSON.stringify(checklist));
  }, [checklist]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}ads`, JSON.stringify(advertisements));
  }, [advertisements]);
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}favourites`, JSON.stringify(favourites));
  }, [favourites]);

  const addAuditLog = (action: string, target: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      actor: userRole === 'admin' ? 'Super Admin' : userRole === 'vendor' ? 'Vendor' : 'Customer',
      action,
      target,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const toggleFavourite = (vendorId: string) => {
    setFavourites(prev =>
      prev.includes(vendorId) ? prev.filter(id => id !== vendorId) : [...prev, vendorId]
    );
  };

  const submitEnquiry = (data: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): string => {
    const id = `enq-${Date.now()}`;
    const newEnquiry: Enquiry = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    addAuditLog('ENQUIRY_SUBMITTED', data.vendorName, `Requirements: ${data.requirements.slice(0, 40)}...`);
    return id;
  };

  const createQuotation = (data: Omit<Quotation, 'id' | 'createdAt' | 'status'>): string => {
    const id = `quote-${Date.now()}`;
    const newQuote: Quotation = {
      ...data,
      id,
      status: 'sent',
      createdAt: new Date().toISOString(),
    };
    setQuotations(prev => [newQuote, ...prev]);

    // Update enquiry status
    setEnquiries(prev =>
      prev.map(e => (e.id === data.enquiryId ? { ...e, status: 'quotation_sent' } : e))
    );

    addAuditLog('QUOTATION_SENT', data.vendorName, `Quotation total: ₹${data.totalAmount.toLocaleString('en-IN')}`);
    return id;
  };

  const acceptQuotation = (quotationId: string) => {
    const quote = quotations.find(q => q.id === quotationId);
    if (!quote) return;

    setQuotations(prev =>
      prev.map(q => (q.id === quotationId ? { ...q, status: 'accepted' } : q))
    );

    setEnquiries(prev =>
      prev.map(e => (e.id === quote.enquiryId ? { ...e, status: 'accepted' } : e))
    );

    // Create a new booking in awaiting advance payment state
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      quotationId: quote.id,
      enquiryId: quote.enquiryId,
      vendorId: quote.vendorId,
      vendorName: quote.vendorName,
      vendorPhone: vendors.find(v => v.id === quote.vendorId)?.phone || '9876543210',
      customerId: quote.customerId,
      customerName: quote.customerName,
      customerPhone: '9876543210',
      weddingDate: quote.weddingDate,
      venueAddress: 'Civil Lines, Etawah',
      serviceCategory: vendors.find(v => v.id === quote.vendorId)?.categoryName || 'Wedding Service',
      packageName: quote.items[0]?.name || 'Custom Wedding Package',
      totalAmount: quote.totalAmount,
      advancePaid: 0,
      balanceAmount: quote.totalAmount,
      bookingStatus: 'pending_confirmation',
      paymentStatus: 'unpaid',
      bookingDate: new Date().toISOString().split('T')[0],
      reviewed: false,
    };

    setBookings(prev => [newBooking, ...prev]);
    addAuditLog('BOOKING_CREATED', quote.vendorName, `Booking created from accepted quote ${quotationId}`);
  };

  const payBookingAdvance = (bookingId: string, amount: number, method: string) => {
    const ref = `TXN-${method.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const newAdvance = (b.advancePaid || 0) + amount;
          const newBalance = Math.max(0, b.totalAmount - newAdvance);
          const isFull = newBalance === 0;
          return {
            ...b,
            advancePaid: newAdvance,
            balanceAmount: newBalance,
            bookingStatus: 'confirmed',
            paymentStatus: isFull ? 'fully_paid' : 'advance_paid',
            transactionRef: ref,
            paymentMethod: method,
          };
        }
        return b;
      })
    );

    // Also update budget paid amount if linked
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setBudgetItems(prev =>
        prev.map(item => {
          if (item.vendorName && booking.vendorName.includes(item.vendorName.slice(0, 8))) {
            return {
              ...item,
              paidAmount: item.paidAmount + amount,
              isConfirmed: true,
            };
          }
          return item;
        })
      );
    }

    addAuditLog('PAYMENT_RECEIVED', booking?.vendorName || bookingId, `Advance of ₹${amount.toLocaleString('en-IN')} paid via ${method}. Ref: ${ref}`);
  };

  const submitReview = (bookingId: string, vendorId: string, rating: number, comment: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, reviewed: true } : b))
    );

    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          const newCount = v.reviewCount + 1;
          const newRating = Number(((v.rating * v.reviewCount + rating) / newCount).toFixed(2));
          return {
            ...v,
            reviewCount: newCount,
            rating: newRating,
          };
        }
        return v;
      })
    );

    addAuditLog('REVIEW_SUBMITTED', vendorId, `Rating: ${rating}/5, Comment: "${comment.slice(0, 30)}..."`);
  };

  const registerVendor = (data: Partial<Vendor>) => {
    const id = `vendor-${Date.now()}`;
    const newVendor: Vendor = {
      id,
      businessName: data.businessName || 'New Wedding Business',
      ownerName: data.ownerName || 'Business Owner',
      phone: data.phone || '9876543210',
      email: data.email || 'partner@shaadisupermart.com',
      categoryId: data.categoryId || 'photography',
      categoryName: categories.find(c => c.id === data.categoryId)?.name || 'Wedding Services',
      city: data.city || 'Etawah',
      locality: data.locality || 'Civil Lines',
      address: data.address || 'Etawah, Uttar Pradesh',
      pinCode: data.pinCode || '206001',
      serviceRadiusKm: data.serviceRadiusKm || 30,
      description: data.description || 'Quality wedding services in Etawah district.',
      yearsOfExperience: data.yearsOfExperience || 3,
      languages: data.languages || ['Hindi', 'English'],
      verified: false,
      verificationStatus: 'pending',
      rating: 5.0,
      reviewCount: 0,
      startingPrice: data.startingPrice || 15000,
      pricingUnit: data.pricingUnit || 'per event',
      bannerImage: 'vendor_new_banner',
      packages: data.packages || [
        {
          id: `pkg-${Date.now()}`,
          name: 'Standard Wedding Package',
          price: data.startingPrice || 15000,
          description: 'Basic service package for traditional Indian wedding ceremony.',
          inclusions: ['Complete ceremony coverage', 'Essential equipment setup', 'Professional team of 2'],
          advancePercentage: 25,
        },
      ],
      portfolio: [],
      availableDates: ['2026-11-20', '2026-11-25', '2026-12-04'],
      cancellationPolicy: data.cancellationPolicy || '50% refund if cancelled 15 days prior.',
      advancePercentage: data.advancePercentage || 25,
      completedBookingsCount: 0,
    };

    setVendors(prev => [newVendor, ...prev]);
    addAuditLog('VENDOR_REGISTERED', newVendor.businessName, 'New vendor application submitted for verification');
  };

  const approveVendor = (vendorId: string) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, verified: true, verificationStatus: 'verified' } : v))
    );
    const vendor = vendors.find(v => v.id === vendorId);
    addAuditLog('VENDOR_APPROVED', vendor?.businessName || vendorId, 'Verified status badge granted by Super Admin');
  };

  const rejectVendor = (vendorId: string, reason: string) => {
    setVendors(prev =>
      prev.map(v =>
        v.id === vendorId
          ? { ...v, verified: false, verificationStatus: 'rejected', rejectionReason: reason }
          : v
      )
    );
    const vendor = vendors.find(v => v.id === vendorId);
    addAuditLog('VENDOR_REJECTED', vendor?.businessName || vendorId, `Reason: ${reason}`);
  };

  const toggleVendorSuspension = (vendorId: string, reason: string) => {
    setVendors(prev =>
      prev.map(v => {
        if (v.id === vendorId) {
          const isSuspended = v.verificationStatus === 'rejected';
          return {
            ...v,
            verified: isSuspended,
            verificationStatus: isSuspended ? 'verified' : 'rejected',
            rejectionReason: isSuspended ? undefined : reason,
          };
        }
        return v;
      })
    );
    addAuditLog('VENDOR_SUSPENSION_TOGGLE', vendorId, `Status changed. Reason: ${reason}`);
  };

  const addCategory = (cat: { name: string; nameHi: string; icon: string; description: string }) => {
    const id = cat.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newCat: WeddingCategory = {
      id,
      name: cat.name,
      nameHi: cat.nameHi,
      icon: cat.icon || 'Sparkles',
      description: cat.description,
      active: true,
      order: categories.length + 1,
    };
    setCategories(prev => [...prev, newCat]);
    addAuditLog('CATEGORY_ADDED', cat.name, 'Admin added new category');
  };

  const toggleCategoryStatus = (catId: string) => {
    setCategories(prev =>
      prev.map(c => (c.id === catId ? { ...c, active: !c.active } : c))
    );
  };

  const addLocality = (cityId: string, locality: string) => {
    setCities(prev =>
      prev.map(c => {
        if (c.id === cityId && !c.localities.includes(locality)) {
          return { ...c, localities: [...c.localities, locality] };
        }
        return c;
      })
    );
    addAuditLog('LOCALITY_ADDED', `${cityId}: ${locality}`, 'New service locality registered');
  };

  const updateTotalBudget = (amount: number) => {
    setTotalBudget(amount);
  };

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = { ...item, id: `b-${Date.now()}` };
    setBudgetItems(prev => [...prev, newItem]);
  };

  const deleteBudgetItem = (id: string) => {
    setBudgetItems(prev => prev.filter(b => b.id !== id));
  };

  const toggleChecklistTask = (taskId: string) => {
    setChecklist(prev =>
      prev.map(t => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addChecklistTask = (task: Omit<ChecklistTask, 'id'>) => {
    const newTask: ChecklistTask = { ...task, id: `chk-${Date.now()}` };
    setChecklist(prev => [...prev, newTask]);
  };

  const recordAdClick = (adId: string) => {
    setAdvertisements(prev =>
      prev.map(a => (a.id === adId ? { ...a, clicks: a.clicks + 1 } : a))
    );
  };

  const updateVendorServices = (vendorId: string, packages: any[]) => {
    setVendors(prev =>
      prev.map(v => (v.id === vendorId ? { ...v, packages } : v))
    );
    addAuditLog('PACKAGES_UPDATED', vendorId, 'Vendor updated service packages');
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        language,
        setLanguage,
        selectedCity,
        setSelectedCity,
        selectedLocality,
        setSelectedLocality,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        weddingDateFilter,
        setWeddingDateFilter,
        activeCustomerTab,
        setActiveCustomerTab,
        activeVendorModalId,
        setActiveVendorModalId,
        categories,
        cities,
        vendors,
        enquiries,
        quotations,
        bookings,
        budgetItems,
        totalBudget,
        checklist,
        advertisements,
        auditLogs,
        favourites,
        toggleFavourite,
        submitEnquiry,
        createQuotation,
        acceptQuotation,
        payBookingAdvance,
        submitReview,
        registerVendor,
        approveVendor,
        rejectVendor,
        toggleVendorSuspension,
        addCategory,
        toggleCategoryStatus,
        addLocality,
        updateTotalBudget,
        addBudgetItem,
        deleteBudgetItem,
        toggleChecklistTask,
        addChecklistTask,
        recordAdClick,
        updateVendorServices,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
