import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, IsBoolean } from 'class-validator';

export class CreateSvgSettingsDto {
  @IsString()
  settingKey: string;

  @IsString()
  settingName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  value: any;

  @IsEnum(['string', 'number', 'boolean', 'object', 'array'])
  valueType: 'string' | 'number' | 'boolean' | 'object' | 'array';

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class UpdateSvgSettingsDto {
  @IsOptional()
  @IsString()
  settingName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  value?: any;

  @IsOptional()
  @IsEnum(['string', 'number', 'boolean', 'object', 'array'])
  valueType?: 'string' | 'number' | 'boolean' | 'object' | 'array';

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  priority?: number;
}

export class SvgSettingsResponseDto {
  id: string;
  settingKey: string;
  settingName: string;
  description?: string;
  value: any;
  valueType: 'string' | 'number' | 'boolean' | 'object' | 'array';
  isGlobal: boolean;
  category?: string;
  priority: number;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
} 