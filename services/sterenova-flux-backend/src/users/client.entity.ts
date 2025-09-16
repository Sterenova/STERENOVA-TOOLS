import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Quote } from '../quotes/quote.entity';
import { Invoice } from '../invoices/invoice.entity';

export enum ClientType {
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ClientType,
    default: ClientType.INDIVIDUAL,
  })
  type: ClientType;

  // Informations de base
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  // Adresse
  @Column({ length: 255, nullable: true })
  address: string;

  @Column({ length: 10, nullable: true })
  postalCode: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  country: string;

  // Informations entreprise (si applicable)
  @Column({ length: 100, nullable: true })
  companyName: string;

  @Column({ length: 50, nullable: true })
  siret: string;

  @Column({ length: 50, nullable: true })
  tvaNumber: string;

  // Informations de facturation
  @Column({ length: 255, nullable: true })
  billingAddress: string;

  @Column({ length: 10, nullable: true })
  billingPostalCode: string;

  @Column({ length: 100, nullable: true })
  billingCity: string;

  @Column({ length: 100, nullable: true })
  billingCountry: string;

  // Notes et informations supplémentaires
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => Quote, (quote) => quote.client)
  quotes: Quote[];

  @OneToMany(() => Invoice, (invoice) => invoice.client)
  invoices: Invoice[];

  // Méthodes utilitaires
  get displayName(): string {
    if (this.type === ClientType.COMPANY && this.companyName) {
      return this.companyName;
    }
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return this.name;
  }

  get fullAddress(): string {
    const parts = [this.address, this.postalCode, this.city, this.country];
    return parts.filter(Boolean).join(', ');
  }

  get billingFullAddress(): string {
    const parts = [this.billingAddress, this.billingPostalCode, this.billingCity, this.billingCountry];
    return parts.filter(Boolean).join(', ');
  }
}
