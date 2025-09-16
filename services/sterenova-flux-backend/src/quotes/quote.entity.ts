import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Client } from '../users/client.entity';
import { QuoteItem } from './quote-item.entity';

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

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  quoteNumber: string;

  @Column({
    type: 'enum',
    enum: QuoteStatus,
    default: QuoteStatus.DRAFT,
  })
  status: QuoteStatus;

  @Column({
    type: 'enum',
    enum: QuoteType,
    default: QuoteType.EVENT,
  })
  type: QuoteType;

  // Informations de base
  @Column({ type: 'date' })
  issueDate: Date;

  @Column({ type: 'date', nullable: true })
  expiryDate: Date;

  @Column({ type: 'date', nullable: true })
  eventDate: Date;

  @Column({ length: 255, nullable: true })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  terms: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // Informations de facturation
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 20 })
  taxRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  // Relations
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => Client, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'client_id' })
  clientId: string;

  @OneToMany(() => QuoteItem, (item) => item.quote, { cascade: true })
  items: QuoteItem[];

  // Métadonnées
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Méthodes utilitaires
  calculateTotals(): void {
    this.subtotal = this.items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.unitPrice * (1 - item.discount / 100);
      return sum + itemTotal;
    }, 0);
    this.taxAmount = (this.subtotal - this.discountAmount) * (this.taxRate / 100);
    this.total = this.subtotal - this.discountAmount + this.taxAmount;
  }

  get isExpired(): boolean {
    if (!this.expiryDate) return false;
    return new Date() > this.expiryDate;
  }

  get canBeConvertedToInvoice(): boolean {
    return this.status === QuoteStatus.ACCEPTED;
  }
}
