import { IsEmail, IsString, IsOptional, IsEnum, MinLength, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Prénom de l\'utilisateur' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Nom de famille de l\'utilisateur' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ description: 'Rôle de l\'utilisateur', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

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
}
