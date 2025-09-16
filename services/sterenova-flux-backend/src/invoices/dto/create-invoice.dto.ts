import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  OTHER = 'OTHER',
}

export class CreateInvoiceItemDto {
  @ApiProperty({ description: 'Type de l\'élément' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Description courte' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Description détaillée' })
  @IsOptional()
  @IsString()
  detailedDescription?: string;

  @ApiProperty({ description: 'Quantité' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ description: 'Unité' })
  @IsString()
  unit: string;

  @ApiProperty({ description: 'Prix unitaire' })
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @ApiPropertyOptional({ description: 'Remise en pourcentage' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  discount?: number;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Ordre de tri' })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ description: 'Numéro de la facture' })
  @IsString()
  invoiceNumber: string;

  @ApiProperty({ description: 'Statut de la facture', enum: InvoiceStatus })
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @ApiProperty({ description: 'Date de création' })
  @IsDateString()
  issueDate: string;

  @ApiProperty({ description: 'Date d\'échéance' })
  @IsDateString()
  dueDate: string;

  @ApiPropertyOptional({ description: 'Date de paiement' })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;

  @ApiPropertyOptional({ description: 'Lieu' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Description de la facture' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Conditions' })
  @IsOptional()
  @IsString()
  terms?: string;

  @ApiPropertyOptional({ description: 'Notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Taux de TVA' })
  @IsNumber()
  @Min(0)
  @Max(100)
  taxRate: number;

  @ApiPropertyOptional({ description: 'Montant de la remise' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  @ApiPropertyOptional({ description: 'Méthode de paiement', enum: PaymentMethod })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiPropertyOptional({ description: 'Notes de paiement' })
  @IsOptional()
  @IsString()
  paymentNotes?: string;

  @ApiProperty({ description: 'ID de l\'utilisateur créateur' })
  @IsString()
  createdById: string;

  @ApiProperty({ description: 'ID du client' })
  @IsString()
  clientId: string;

  @ApiPropertyOptional({ description: 'ID du devis associé' })
  @IsOptional()
  @IsString()
  quoteId?: string;

  @ApiProperty({ description: 'Éléments de la facture', type: [CreateInvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];
}
