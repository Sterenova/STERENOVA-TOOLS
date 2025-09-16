import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceNumberDto } from './dto/invoice-number.dto';
import { Invoice } from './invoice.entity';

@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle facture' })
  @ApiResponse({ status: 201, description: 'Facture créée avec succès', type: Invoice })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les factures' })
  @ApiResponse({ status: 200, description: 'Liste des factures', type: [Invoice] })
  findAll(@Query('status') status?: string, @Query('clientId') clientId?: string, @Query('quoteId') quoteId?: string) {
    if (status) {
      return this.invoicesService.findByStatus(status as any);
    }
    if (clientId) {
      return this.invoicesService.findByClient(clientId);
    }
    if (quoteId) {
      return this.invoicesService.findByQuote(quoteId);
    }
    return this.invoicesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une facture par ID' })
  @ApiResponse({ status: 200, description: 'Facture trouvée', type: Invoice })
  @ApiResponse({ status: 404, description: 'Facture non trouvée' })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une facture' })
  @ApiResponse({ status: 200, description: 'Facture mise à jour', type: Invoice })
  @ApiResponse({ status: 404, description: 'Facture non trouvée' })
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une facture' })
  @ApiResponse({ status: 200, description: 'Facture supprimée' })
  @ApiResponse({ status: 404, description: 'Facture non trouvée' })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }

  @Get('generate/number')
  @ApiOperation({ summary: 'Générer un numéro de facture' })
  @ApiResponse({ 
    status: 200, 
    description: 'Numéro de facture généré', 
    type: InvoiceNumberDto 
  })
  async generateInvoiceNumber(): Promise<InvoiceNumberDto> {
    const invoiceNumber = await this.invoicesService.generateInvoiceNumber();
    return { invoiceNumber };
  }

  @Post('from-quote/:quoteId')
  @ApiOperation({ summary: 'Créer une facture à partir d\'un devis' })
  @ApiResponse({ status: 201, description: 'Facture créée à partir du devis', type: Invoice })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  createFromQuote(@Param('quoteId') quoteId: string, @Body() createInvoiceDto: Partial<CreateInvoiceDto>) {
    return this.invoicesService.createFromQuote(quoteId, createInvoiceDto);
  }
}
