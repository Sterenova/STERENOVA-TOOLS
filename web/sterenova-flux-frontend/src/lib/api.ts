import { 
  User, 
  Client, 
  Quote, 
  Invoice, 
  CreateQuoteFormData, 
  CreateClientFormData,
  ApiResponse,
  PaginatedResponse,
  QuoteFilters,
  ClientFilters,
  DashboardStats
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Users API
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUser(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  // Clients API
  async getClients(filters?: ClientFilters): Promise<Client[]> {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.isActive !== undefined) params.append('isActive', filters.isActive.toString());
    if (filters?.search) params.append('search', filters.search);
    
    const query = params.toString();
    const endpoint = query ? `/clients?${query}` : '/clients';
    return this.request<Client[]>(endpoint);
  }

  async getClient(id: string): Promise<Client> {
    return this.request<Client>(`/clients/${id}`);
  }

  async createClient(data: CreateClientFormData): Promise<Client> {
    return this.request<Client>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateClient(id: string, data: Partial<CreateClientFormData>): Promise<Client> {
    return this.request<Client>(`/clients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteClient(id: string): Promise<void> {
    return this.request<void>(`/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Quotes API
  async getQuotes(filters?: QuoteFilters): Promise<Quote[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.clientId) params.append('clientId', filters.clientId);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.dateTo) params.append('dateTo', filters.dateTo);
    
    const query = params.toString();
    const endpoint = query ? `/quotes?${query}` : '/quotes';
    return this.request<Quote[]>(endpoint);
  }

  async getQuote(id: string): Promise<Quote> {
    return this.request<Quote>(`/quotes/${id}`);
  }

  async createQuote(data: CreateQuoteFormData): Promise<Quote> {
    return this.request<Quote>('/quotes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateQuote(id: string, data: Partial<CreateQuoteFormData>): Promise<Quote> {
    return this.request<Quote>(`/quotes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteQuote(id: string): Promise<void> {
    return this.request<void>(`/quotes/${id}`, {
      method: 'DELETE',
    });
  }

  async generateQuoteNumber(): Promise<{ quoteNumber: string }> {
    return this.request<{ quoteNumber: string }>('/quotes/generate/number');
  }

  async generateInvoiceNumber(): Promise<{ invoiceNumber: string }> {
    return this.request<{ invoiceNumber: string }>('/invoices/generate/number');
  }

  // Invoices API
  async getInvoices(): Promise<Invoice[]> {
    return this.request<Invoice[]>('/invoices');
  }

  async getInvoice(id: string): Promise<Invoice> {
    return this.request<Invoice>(`/invoices/${id}`);
  }

  async createInvoiceFromQuote(quoteId: string, data: any): Promise<Invoice> {
    return this.request<Invoice>(`/invoices/from-quote/${quoteId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard API
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard/stats');
  }

  async getQuoteStats() {
    return this.request('/dashboard/quotes/stats');
  }

  async getInvoiceStats() {
    return this.request('/dashboard/invoices/stats');
  }

  async getClientStats() {
    return this.request('/dashboard/clients/stats');
  }
}

export const apiService = new ApiService();
export default apiService;
