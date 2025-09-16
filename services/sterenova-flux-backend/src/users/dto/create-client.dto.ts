import { IsEmail, IsString, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientType } from '../client.entity';

export class CreateClientDto {
  @ApiProperty({ description: 'Type de client', enum: ClientType })
  @IsEnum(ClientType)
  type: ClientType;

  @ApiProperty({ description: 'Nom du client' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Prénom (pour les particuliers)' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Nom de famille (pour les particuliers)' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Email du client' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone' })
  @IsOptional()
  @IsPhoneNumber('FR')
  phone?: string;

  @ApiPropertyOptional({ description: 'Adresse' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Code postal' })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Ville' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Pays' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Nom de l\'entreprise (pour les entreprises)' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ description: 'Numéro SIRET' })
  @IsOptional()
  @IsString()
  siret?: string;

  @ApiPropertyOptional({ description: 'Numéro de TVA' })
  @IsOptional()
  @IsString()
  tvaNumber?: string;

  @ApiPropertyOptional({ description: 'Adresse de facturation' })
  @IsOptional()
  @IsString()
  billingAddress?: string;

  @ApiPropertyOptional({ description: 'Code postal de facturation' })
  @IsOptional()
  @IsString()
  billingPostalCode?: string;

  @ApiPropertyOptional({ description: 'Ville de facturation' })
  @IsOptional()
  @IsString()
  billingCity?: string;

  @ApiPropertyOptional({ description: 'Pays de facturation' })
  @IsOptional()
  @IsString()
  billingCountry?: string;

  @ApiPropertyOptional({ description: 'Notes sur le client' })
  @IsOptional()
  @IsString()
  notes?: string;
}
