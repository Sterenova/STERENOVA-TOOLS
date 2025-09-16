import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Quote, QuoteStatus } from '../quotes/quote.entity';
import { Invoice, InvoiceStatus } from '../invoices/invoice.entity';
import { Client, ClientType } from '../users/client.entity';

export interface TopClient {
  id: string;
  name: string;
  email?: string;
  type: ClientType;
  totalRevenue: number;
}

export interface DashboardStats {
  totalQuotes: number;
  totalInvoices: number;
  totalClients: number;
  totalRevenue: number;
  monthlyQuotes: number;
  monthlyInvoices: number;
  monthlyRevenue: number;
  recentQuotes: Quote[];
  recentInvoices: Invoice[];
  topClients: TopClient[];
}

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async getDashboardStats(): Promise<DashboardStats> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    // Statistiques totales
    const [totalQuotes, totalInvoices, totalClients] = await Promise.all([
      this.quotesRepository.count(),
      this.invoicesRepository.count(),
      this.clientsRepository.count(),
    ]);

    // Statistiques mensuelles
    const [monthlyQuotes, monthlyInvoices] = await Promise.all([
      this.quotesRepository.count({
        where: {
          createdAt: Between(startOfMonth, endOfMonth),
        },
      }),
      this.invoicesRepository.count({
        where: {
          createdAt: Between(startOfMonth, endOfMonth),
        },
      }),
    ]);

    // Calcul des revenus
    const [totalRevenue, monthlyRevenue] = await Promise.all([
      this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('SUM(invoice.total)', 'total')
        .where('invoice.status = :status', { status: InvoiceStatus.PAID })
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
      this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('SUM(invoice.total)', 'total')
        .where('invoice.status = :status', { status: InvoiceStatus.PAID })
        .andWhere('invoice.createdAt BETWEEN :start AND :end', {
          start: startOfMonth,
          end: endOfMonth,
        })
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
    ]);

    // Éléments récents
    const [recentQuotes, recentInvoices] = await Promise.all([
      this.quotesRepository.find({
        relations: ['client'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
      this.invoicesRepository.find({
        relations: ['client'],
        order: { createdAt: 'DESC' },
        take: 5,
      }),
    ]);

    // Top clients par revenus
    const topClients = await this.clientsRepository
      .createQueryBuilder('client')
      .leftJoin('client.quotes', 'quote')
      .leftJoin('client.invoices', 'invoice')
      .select([
        'client.id',
        'client.name',
        'client.email',
        'client.type',
        'SUM(COALESCE(invoice.total, 0)) as totalRevenue',
      ])
      .groupBy('client.id')
      .orderBy('totalRevenue', 'DESC')
      .take(5)
      .getRawMany()
      .then(results =>
        results.map(result => ({
          id: result.client_id,
          name: result.client_name,
          email: result.client_email,
          type: result.client_type,
          totalRevenue: parseFloat(result.totalrevenue || '0'),
        })),
      );

    return {
      totalQuotes,
      totalInvoices,
      totalClients,
      totalRevenue,
      monthlyQuotes,
      monthlyInvoices,
      monthlyRevenue,
      recentQuotes,
      recentInvoices,
      topClients,
    };
  }

  async getQuoteStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [total, pending, accepted, expired, draft, totalValue, monthlyValue] = await Promise.all([
      this.quotesRepository.count(),
      this.quotesRepository.count({ where: { status: QuoteStatus.SENT } }),
      this.quotesRepository.count({ where: { status: QuoteStatus.ACCEPTED } }),
      this.quotesRepository.count({ where: { status: QuoteStatus.EXPIRED } }),
      this.quotesRepository.count({ where: { status: QuoteStatus.DRAFT } }),
      this.quotesRepository
        .createQueryBuilder('quote')
        .select('SUM(quote.total)', 'total')
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
      this.quotesRepository
        .createQueryBuilder('quote')
        .select('SUM(quote.total)', 'total')
        .where('quote.createdAt BETWEEN :start AND :end', {
          start: startOfMonth,
          end: endOfMonth,
        })
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
    ]);

    return {
      total,
      pending,
      accepted,
      expired,
      draft,
      totalValue,
      monthlyValue,
    };
  }

  async getInvoiceStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const [total, pending, paid, overdue, draft, totalValue, monthlyValue] = await Promise.all([
      this.invoicesRepository.count(),
      this.invoicesRepository.count({ where: { status: InvoiceStatus.SENT } }),
      this.invoicesRepository.count({ where: { status: InvoiceStatus.PAID } }),
      this.invoicesRepository.count({ where: { status: InvoiceStatus.OVERDUE } }),
      this.invoicesRepository.count({ where: { status: InvoiceStatus.DRAFT } }),
      this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('SUM(invoice.total)', 'total')
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
      this.invoicesRepository
        .createQueryBuilder('invoice')
        .select('SUM(invoice.total)', 'total')
        .where('invoice.createdAt BETWEEN :start AND :end', {
          start: startOfMonth,
          end: endOfMonth,
        })
        .getRawOne()
        .then(result => parseFloat(result?.total || '0')),
    ]);

    return {
      total,
      pending,
      paid,
      overdue,
      draft,
      totalValue,
      monthlyValue,
    };
  }

  async getClientStats() {
    const [total, individual, company, totalValue, monthlyValue] = await Promise.all([
      this.clientsRepository.count(),
      this.clientsRepository.count({ where: { type: ClientType.INDIVIDUAL } }),
      this.clientsRepository.count({ where: { type: ClientType.COMPANY } }),
      this.clientsRepository
        .createQueryBuilder('client')
        .leftJoin('client.invoices', 'invoice')
        .select('SUM(COALESCE(invoice.total, 0))', 'total')
        .where('invoice.status = :status', { status: InvoiceStatus.PAID })
        .getRawOne()
        .then(result => parseFloat(result?.sum || '0')),
      this.clientsRepository
        .createQueryBuilder('client')
        .leftJoin('client.invoices', 'invoice')
        .select('SUM(COALESCE(invoice.total, 0))', 'total')
        .where('invoice.status = :status', { status: InvoiceStatus.PAID })
        .andWhere('invoice.createdAt >= :start', {
          start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        })
        .getRawOne()
        .then(result => parseFloat(result?.sum || '0')),
    ]);

    return {
      total,
      individual,
      company,
      totalValue,
      monthlyValue,
    };
  }
}
