import { IsString, IsOptional, IsEnum, IsObject, IsNumber, IsUUID } from 'class-validator';

export class CreateDownloadHistoryDto {
  @IsString()
  templateName: string;

  @IsEnum(['post', 'story'])
  templateCategory: 'post' | 'story';

  @IsOptional()
  @IsObject()
  templateParameters?: Record<string, any>;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileFormat?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class DownloadHistoryResponseDto {
  id: string;
  templateName: string;
  templateCategory: 'post' | 'story';
  templateParameters?: Record<string, any>;
  fileName?: string;
  fileFormat: string;
  fileSize?: number;
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  downloadedAt: Date;
} 