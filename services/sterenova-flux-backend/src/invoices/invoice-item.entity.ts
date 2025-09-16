import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

export enum ItemType {
  LABOR = 'labor',
  EQUIPMENT = 'equipment',
  TRAVEL = 'travel',
  SERVICE = 'service',
  DISCOUNT = 'discount',
  OTHER = 'other',
}

@Entity('invoice_items')
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ItemType,
    default: ItemType.SERVICE,
  })
  type: ItemType;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255, nullable: true })
  detailedDescription: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ length: 20, default: '-' })
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  // Relations
  @ManyToOne(() => Invoice, (invoice) => invoice.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column({ name: 'invoice_id' })
  invoiceId: string;

  // Méthodes utilitaires
  calculateTotal(): void {
    const subtotal = this.quantity * this.unitPrice;
    this.total = subtotal - this.discount;
  }

  get displayUnit(): string {
    if (this.unit === '-' || !this.unit) {
      return this.quantity === 1 ? '-' : this.unit || '-';
    }
    return this.unit;
  }
}
