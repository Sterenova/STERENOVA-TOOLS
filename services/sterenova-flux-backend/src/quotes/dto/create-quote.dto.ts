import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsDateString, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

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

export enum ItemType {
  LABOR = 'labor',
  EQUIPMENT = 'equipment',
  TRAVEL = 'travel',
  SERVICE = 'service',
  DISCOUNT = 'discount',
  OTHER = 'other',
}

export class CreateQuoteItemDto {
  @ApiProperty({ description: 'Type de l\'élément', enum: ItemType })
  @IsEnum(ItemType)
  type: ItemType;

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

export class CreateQuoteDto {
  @ApiProperty({ description: 'Type de devis', enum: QuoteType })
  @IsEnum(QuoteType)
  type: QuoteType;

  @ApiProperty({ description: 'Date de création' })
  @IsDateString()
  issueDate: string;

  @ApiPropertyOptional({ description: 'Date d\'expiration' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ description: 'Date de l\'événement' })
  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @ApiPropertyOptional({ description: 'Lieu' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: 'Description du devis' })
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

  @ApiProperty({ description: 'ID de l\'utilisateur créateur' })
  @IsString()
  createdById: string;

  @ApiProperty({ description: 'ID du client' })
  @IsString()
  clientId: string;

  @ApiProperty({ description: 'Éléments du devis', type: [CreateQuoteItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuoteItemDto)
  items: CreateQuoteItemDto[];
}
