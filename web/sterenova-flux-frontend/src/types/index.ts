// Types pour les utilisateurs
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
}

// Types pour les clients
export interface Client {
  id: string
  type: ClientType
  name: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  companyName?: string
  siret?: string
  tvaNumber?: string
  billingAddress?: string
  billingCity?: string
  billingPostalCode?: string
  billingCountry?: string
  notes?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum ClientType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

// Types pour les devis
export interface Quote {
  id: string
  quoteNumber: string
  type: QuoteType
  status: QuoteStatus
  issueDate: string
  expiryDate?: string
  eventDate?: string
  location?: string
  description: string
  terms?: string
  notes?: string
  subtotal: number
  taxRate: number
  taxAmount: number
  discountAmount: number
  total: number
  client: Client
  createdBy: User
  items: QuoteItem[]
  createdAt: Date
  updatedAt: Date
}

export interface QuoteItem {
  id: string
  type: QuoteItemType
  description: string
  detailedDescription?: string
  quantity: number
  unit: string
  unitPrice: number
  discount: number
  notes?: string
  sortOrder: number
}

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

export enum QuoteType {
  EVENT = 'event',
  EQUIPMENT = 'equipment',
  SERVICE = 'service',
  MIXED = 'mixed',
}

export enum QuoteItemType {
  LABOR = 'labor',
  EQUIPMENT = 'equipment',
  TRAVEL = 'travel',
  SERVICE = 'service',
  DISCOUNT = 'discount',
  OTHER = 'other',
}

// Types pour les factures
export interface Invoice {
  id: string
  invoiceNumber: string
  status: InvoiceStatus
  issueDate: string
  dueDate: string
  paymentDate?: string
  paymentMethod?: PaymentMethod
  description: string
  terms?: string
  notes?: string
  subtotal: number
  taxRate: number
  taxAmount: number
  discountAmount: number
  total: number
  paidAmount: number
  client: Client
  createdBy: User
  quote?: Quote
  items: InvoiceItem[]
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceItem {
  id: string
  type: InvoiceItemType
  description: string
  detailedDescription?: string
  quantity: number
  unit: string
  unitPrice: number
  discount: number
  notes?: string
  sortOrder: number
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'bank_transfer',
  CHECK = 'check',
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  OTHER = 'other',
}

export enum InvoiceItemType {
  LABOR = 'labor',
  EQUIPMENT = 'equipment',
  TRAVEL = 'travel',
  SERVICE = 'service',
  DISCOUNT = 'discount',
  OTHER = 'other',
}

// Types pour les formulaires
export interface CreateQuoteFormData {
  clientId: string
  type: QuoteType
  issueDate: string
  expiryDate?: string
  eventDate?: string
  location?: string
  description: string
  terms?: string
  notes?: string
  taxRate: number
  discountAmount: number
  items: CreateQuoteItemFormData[]
  createdById?: string
}

export interface CreateQuoteItemFormData {
  type: QuoteItemType
  description: string
  detailedDescription?: string
  quantity: number
  unit: string
  unitPrice: number
  discount: number
  notes?: string
  sortOrder?: number
}

export interface CreateClientFormData {
  type: ClientType
  name: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  companyName?: string
  siret?: string
  tvaNumber?: string
  billingAddress?: string
  billingCity?: string
  billingPostalCode?: string
  billingCountry?: string
  notes?: string
}

// Types pour l'API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Types pour les filtres et recherche
export interface QuoteFilters {
  status?: QuoteStatus
  type?: QuoteType
  clientId?: string
  dateFrom?: string
  dateTo?: string
}

export interface ClientFilters {
  type?: ClientType
  isActive?: boolean
  search?: string
}

// Types pour les statistiques
export interface DashboardStats {
  totalQuotes: number
  totalInvoices: number
  totalClients: number
  totalRevenue: number
  monthlyQuotes: number
  monthlyInvoices: number
  monthlyRevenue: number
  recentQuotes: Quote[]
  recentInvoices: Invoice[]
  topClients: Client[]
}

// Types pour les notifications
export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
}
