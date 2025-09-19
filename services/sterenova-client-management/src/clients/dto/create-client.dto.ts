import { IsString, IsEmail, IsOptional, IsDateString, IsEnum, IsObject, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CustomerType {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
  GOVERNMENT = 'government',
}

export enum ClientStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export class CreateClientDto {
  @ApiProperty({ description: 'Prénom du client', example: 'Jean' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ description: 'Nom du client', example: 'Dupont' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ description: 'Email du client', example: 'jean.dupont@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone', example: '+33123456789' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiPropertyOptional({ description: 'Nom de l\'entreprise', example: 'Acme Corp' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  company?: string;

  @ApiPropertyOptional({ description: 'Adresse', example: '123 Rue de la Paix' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({ description: 'Code postal', example: '75001' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Ville', example: 'Paris' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @ApiPropertyOptional({ description: 'Pays', example: 'France' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @ApiPropertyOptional({ description: 'Notes sur le client' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ 
    description: 'Statut du client', 
    enum: ClientStatus,
    default: ClientStatus.ACTIVE 
  })
  @IsOptional()
  @IsEnum(ClientStatus)
  status?: ClientStatus;

  @ApiPropertyOptional({ 
    description: 'Type de client', 
    enum: CustomerType,
    default: CustomerType.INDIVIDUAL 
  })
  @IsOptional()
  @IsEnum(CustomerType)
  customerType?: CustomerType;

  @ApiPropertyOptional({ description: 'Numéro de TVA', example: 'FR12345678901' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  taxNumber?: string;

  @ApiPropertyOptional({ description: 'Date de naissance', example: '1990-01-01' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'Métadonnées supplémentaires' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
