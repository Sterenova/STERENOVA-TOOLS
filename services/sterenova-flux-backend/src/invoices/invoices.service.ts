import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Invoice } from './invoice.entity';
import { InvoiceItem } from './invoice-item.entity';
import { CreateInvoiceDto, InvoiceStatus } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepository: Repository<InvoiceItem>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoicesRepository.save(createInvoiceDto as any);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      relations: ['client', 'createdBy', 'items'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { id },
      relations: ['client', 'createdBy', 'items'],
    });

    if (!invoice) {
      throw new NotFoundException(`Facture avec l'ID ${id} non trouvée`);
    }

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice> {
    const invoice = await this.findOne(id);
    Object.assign(invoice, updateInvoiceDto);
    return await this.invoicesRepository.save(invoice);
  }

  async remove(id: string): Promise<void> {
    const invoice = await this.findOne(id);
    await this.invoicesRepository.remove(invoice);
  }

  async findByStatus(status: InvoiceStatus): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      where: { status: status as any },
      relations: ['client', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByClient(clientId: string): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      where: { client: { id: clientId } },
      relations: ['client', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByQuote(quoteId: string): Promise<Invoice[]> {
    return await this.invoicesRepository.find({
      where: { quote: { id: quoteId } },
      relations: ['client', 'createdBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async generateInvoiceNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // Calculer le début et la fin du mois
    const startOfMonth = new Date(year, date.getMonth(), 1);
    const endOfMonth = new Date(year, date.getMonth() + 1, 0, 23, 59, 59, 999);
    
    const count = await this.invoicesRepository.count({
      where: {
        createdAt: Between(startOfMonth, endOfMonth),
      },
    });
    
    return `FAC-${year}${month}-${String(count + 1).padStart(3, '0')}`;
  }

  async createFromQuote(quoteId: string, createInvoiceDto: Partial<CreateInvoiceDto>): Promise<Invoice> {
    throw new Error('Méthode non implémentée');
  }
}
