import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { QuoteNumberDto } from './dto/quote-number.dto';
import { Quote } from './quote.entity';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau devis' })
  @ApiResponse({ status: 201, description: 'Devis créé avec succès', type: Quote })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les devis' })
  @ApiResponse({ status: 200, description: 'Liste des devis', type: [Quote] })
  findAll(@Query('status') status?: string, @Query('clientId') clientId?: string) {
    if (status) {
      return this.quotesService.findByStatus(status as any);
    }
    if (clientId) {
      return this.quotesService.findByClient(clientId);
    }
    return this.quotesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un devis par ID' })
  @ApiResponse({ status: 200, description: 'Devis trouvé', type: Quote })
  @ApiResponse({ status: 404, description: 'Devis non trouvé' })
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un devis' })
  @ApiResponse({ status: 200, description: 'Devis mis à jour', type: Quote })
  @ApiResponse({ status: 404, description: 'Devis non trouvé' })
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un devis' })
  @ApiResponse({ status: 200, description: 'Devis supprimé' })
  @ApiResponse({ status: 404, description: 'Devis non trouvé' })
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id);
  }

  @Get('generate/number')
  @ApiOperation({ summary: 'Générer un numéro de devis' })
  @ApiResponse({ 
    status: 200, 
    description: 'Numéro de devis généré', 
    type: QuoteNumberDto 
  })
  async generateQuoteNumber(): Promise<QuoteNumberDto> {
    const quoteNumber = await this.quotesService.generateQuoteNumber();
    return { quoteNumber };
  }
}
