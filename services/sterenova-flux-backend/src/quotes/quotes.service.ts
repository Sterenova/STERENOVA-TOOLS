import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Quote } from './quote.entity';
import { QuoteItem } from './quote-item.entity';
import { CreateQuoteDto, QuoteStatus } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
    @InjectRepository(QuoteItem)
    private readonly quoteItemsRepository: Repository<QuoteItem>,
  ) {}

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    console.log('Creating quote with data:', createQuoteDto);
    
    try {
      // Générer le numéro de devis
      const quoteNumber = await this.generateQuoteNumber();
      console.log('Generated quote number:', quoteNumber);
      
      // Créer le devis avec les valeurs par défaut
      const quote = this.quotesRepository.create({
        quoteNumber,
        status: 'draft' as any,
        type: createQuoteDto.type,
        issueDate: new Date(createQuoteDto.issueDate),
        expiryDate: createQuoteDto.expiryDate ? new Date(createQuoteDto.expiryDate) : null,
        eventDate: createQuoteDto.eventDate ? new Date(createQuoteDto.eventDate) : null,
        location: createQuoteDto.location,
        description: createQuoteDto.description,
        terms: createQuoteDto.terms,
        notes: createQuoteDto.notes,
        taxRate: createQuoteDto.taxRate,
        discountAmount: createQuoteDto.discountAmount || 0,
        subtotal: 0,
        taxAmount: 0,
        total: 0,
        createdById: createQuoteDto.createdById,
        clientId: createQuoteDto.clientId,
      });
      console.log('Created quote entity:', quote);

      // Sauvegarder le devis d'abord pour avoir l'ID
      const savedQuote = await this.quotesRepository.save(quote);
      console.log('Saved quote:', savedQuote);

      // Créer et sauvegarder les éléments du devis
      if (createQuoteDto.items && createQuoteDto.items.length > 0) {
        console.log('Creating quote items:', createQuoteDto.items);
        
        const quoteItems = createQuoteDto.items.map((itemDto, index) => {
          const item = this.quoteItemsRepository.create({
            type: itemDto.type,
            description: itemDto.description,
            detailedDescription: itemDto.detailedDescription,
            quantity: itemDto.quantity,
            unit: itemDto.unit,
            unitPrice: itemDto.unitPrice,
            discount: itemDto.discount || 0,
            notes: itemDto.notes,
            sortOrder: itemDto.sortOrder || index,
            quoteId: savedQuote.id,
          });
          
          // Calculate the total for this item
          item.calculateTotal();
          
          return item;
        });

        // Sauvegarder les éléments
        const savedItems = await this.quoteItemsRepository.save(quoteItems);
        console.log('Saved quote items:', savedItems);
        
        // Recharger le devis avec les éléments
        const quoteWithItems = await this.quotesRepository.findOne({
          where: { id: savedQuote.id },
          relations: ['items'],
        });

        if (quoteWithItems) {
          console.log('Quote with items loaded:', quoteWithItems);
          
          // Calculer les totaux
          quoteWithItems.calculateTotals();
          console.log('Calculated totals:', {
            subtotal: quoteWithItems.subtotal,
            taxAmount: quoteWithItems.taxAmount,
            total: quoteWithItems.total
          });
          
          // Sauvegarder à nouveau avec les totaux calculés
          const finalQuote = await this.quotesRepository.save(quoteWithItems);
          console.log('Final saved quote:', finalQuote);
          return finalQuote;
        }
      }

      return savedQuote;
    } catch (error) {
      console.error('Error creating quote:', error);
      throw error;
    }
  }

  async findAll(): Promise<Quote[]> {
    return await this.quotesRepository.find({
      relations: ['client', 'items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Quote> {
    const quote = await this.quotesRepository.findOne({
      where: { id },
      relations: ['client', 'items'],
    });
    if (!quote) {
      throw new NotFoundException(`Devis avec l'ID ${id} non trouvé`);
    }
    return quote;
  }

  async update(id: string, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.findOne(id);
    Object.assign(quote, updateQuoteDto);
    return await this.quotesRepository.save(quote);
  }

  async remove(id: string): Promise<void> {
    const quote = await this.findOne(id);
    await this.quotesRepository.remove(quote);
  }

  async findByStatus(status: QuoteStatus): Promise<Quote[]> {
    return await this.quotesRepository.find({
      where: { status: status as any },
      relations: ['client', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByClient(clientId: string): Promise<Quote[]> {
    return await this.quotesRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async generateQuoteNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Calculer le début et la fin du mois
    const startOfMonth = new Date(year, date.getMonth(), 1);
    const endOfMonth = new Date(year, date.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const count = await this.quotesRepository.count({
      where: {
        createdAt: Between(startOfMonth, endOfMonth),
      },
    });
    
    return `DEV-${year}${month}-${String(count + 1).padStart(3, '0')}`;
  }
}
