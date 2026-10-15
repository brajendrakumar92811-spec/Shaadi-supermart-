export type UserRole = 'customer' | 'vendor' | 'admin';

export type Language = 'en' | 'hi';

export interface CityLocation {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  localities: string[];
}

export interface WeddingCategory {
  id: string;
  name: string;
  nameHi: string;
  icon: string;
  description: string;
  active: boolean;
  order: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  inclusions: string[];
  advancePercentage: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBooking: boolean;
  eventDate?: string;
}

export interface Vendor {
  id: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  categoryId: string;
  categoryName: string;
  city: string;
  locality: string;
  address: string;
  pinCode: string;
  serviceRadiusKm: number;
  description: string;
  yearsOfExperience: number;
  languages: string[];
  verified: boolean;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  rejectionReason?: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  pricingUnit: string; // e.g. "per day", "per event", "per plate"
  bannerImage: string;
  packages: ServicePackage[];
  portfolio: PortfolioItem[];
  availableDates: string[]; // YYYY-MM-DD
  isFeatured?: boolean;
  isSponsored?: boolean;
  cancellationPolicy: string;
  advancePercentage: number;
  completedBookingsCount: number;
}

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  vendorId: string;
  vendorName: string;
  weddingDate: string;
  venueAddress: string;
  locality: string;
  city: string;
  guestCount?: number;
  budgetEstimate: number;
  requirements: string;
  status: 'pending' | 'quotation_sent' | 'declined' | 'accepted';
  createdAt: string;
}

export interface QuotationItem {
  name: string;
  cost: number;
  notes?: string;
}

export interface Quotation {
  id: string;
  enquiryId: string;
  vendorId: string;
  vendorName: string;
  customerId: string;
  customerName: string;
  weddingDate: string;
  items: QuotationItem[];
  totalAmount: number;
  advanceRequired: number;
  validUntil: string;
  note: string;
  status: 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
}

export interface Booking {
  id: string;
  quotationId?: string;
  enquiryId?: string;
  vendorId: string;
  vendorName: string;
  vendorPhone: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  weddingDate: string;
  venueAddress: string;
  serviceCategory: string;
  packageName: string;
  totalAmount: number;
  advancePaid: number;
  balanceAmount: number;
  bookingStatus: 'pending_confirmation' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  paymentStatus: 'unpaid' | 'advance_paid' | 'fully_paid' | 'refunded';
  bookingDate: string;
  transactionRef?: string;
  paymentMethod?: string;
  reviewed?: boolean;
}

export interface BudgetItem {
  id: string;
  eventName: 'Roka' | 'Haldi' | 'Mehndi' | 'Sangeet' | 'Wedding' | 'Reception' | 'General';
  category: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  paidAmount: number;
  vendorName?: string;
  isConfirmed: boolean;
}

export interface ChecklistTask {
  id: string;
  title: string;
  titleHi: string;
  stage: '6-12_months' | '3-6_months' | '1-2_months' | '2_weeks' | 'wedding_week' | 'd_day';
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  category: string;
}

export interface AdvertisementBanner {
  id: string;
  title: string;
  sponsorName: string;
  tagline: string;
  city: string;
  categoryId?: string;
  imageUrl: string;
  targetUrl: string;
  startDate: string;
  endDate: string;
  active: boolean;
  impressions: number;
  clicks: number;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}
