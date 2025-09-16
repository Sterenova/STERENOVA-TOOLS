import { IsString, IsOptional, IsEnum, IsObject, IsUUID, IsNumber } from 'class-validator';

export class CreateFavoriteTemplateDto {
  @IsString()
  templateName: string;

  @IsEnum(['post', 'story'])
  templateCategory: 'post' | 'story';

  @IsOptional()
  @IsObject()
  defaultParameters?: Record<string, any>;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsUUID()
  userId: string;
}

export class UpdateFavoriteTemplateDto {
  @IsOptional()
  @IsObject()
  defaultParameters?: Record<string, any>;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class FavoriteTemplateResponseDto {
  id: string;
  templateName: string;
  templateCategory: 'post' | 'story';
  defaultParameters?: Record<string, any>;
  notes?: string;
  usageCount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
} 