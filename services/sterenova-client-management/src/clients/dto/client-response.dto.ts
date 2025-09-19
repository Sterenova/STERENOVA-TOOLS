import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { Client } from '../client.entity';

export class ClientResponseDto {
  @ApiProperty({ description: 'ID unique du client' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'Prénom du client' })
  @Expose()
  firstName: string;

  @ApiProperty({ description: 'Nom du client' })
  @Expose()
  lastName: string;

  @ApiProperty({ description: 'Email du client' })
  @Expose()
  email: string;

  @ApiPropertyOptional({ description: 'Numéro de téléphone' })
  @Expose()
  phone?: string;

  @ApiPropertyOptional({ description: 'Nom de l\'entreprise' })
  @Expose()
  company?: string;

  @ApiPropertyOptional({ description: 'Adresse complète' })
  @Expose()
  address?: string;

  @ApiPropertyOptional({ description: 'Code postal' })
  @Expose()
  postalCode?: string;

  @ApiPropertyOptional({ description: 'Ville' })
  @Expose()
  city?: string;

  @ApiPropertyOptional({ description: 'Pays' })
  @Expose()
  country?: string;

  @ApiPropertyOptional({ description: 'Notes sur le client' })
  @Expose()
  notes?: string;

  @ApiProperty({ description: 'Statut du client' })
  @Expose()
  status: string;

  @ApiPropertyOptional({ description: 'Type de client' })
  @Expose()
  customerType?: string;

  @ApiPropertyOptional({ description: 'Numéro de TVA' })
  @Expose()
  taxNumber?: string;

  @ApiPropertyOptional({ description: 'Date de naissance' })
  @Expose()
  dateOfBirth?: Date;

  @ApiPropertyOptional({ description: 'Métadonnées supplémentaires' })
  @Expose()
  metadata?: Record<string, any>;

  @ApiProperty({ description: 'Date de création' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Date de dernière modification' })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ description: 'Nom complet du client' })
  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @ApiProperty({ description: 'Indique si le client est actif' })
  @Expose()
  get isActive(): boolean {
    return this.status === 'active';
  }

  @Exclude()
  deletedAt?: Date;

  constructor(partial: Partial<Client>) {
    Object.assign(this, partial);
  }
}
