import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService, DashboardStats } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques du tableau de bord' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques du tableau de bord',
    type: 'object',
  })
  async getDashboardStats(): Promise<DashboardStats> {
    return this.dashboardService.getDashboardStats();
  }

  @Get('quotes/stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des devis' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques des devis',
    type: 'object',
  })
  async getQuoteStats() {
    return this.dashboardService.getQuoteStats();
  }

  @Get('invoices/stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des factures' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques des factures',
    type: 'object',
  })
  async getInvoiceStats() {
    return this.dashboardService.getInvoiceStats();
  }

  @Get('clients/stats')
  @ApiOperation({ summary: 'Récupérer les statistiques des clients' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques des clients',
    type: 'object',
  })
  async getClientStats() {
    return this.dashboardService.getClientStats();
  }
}
