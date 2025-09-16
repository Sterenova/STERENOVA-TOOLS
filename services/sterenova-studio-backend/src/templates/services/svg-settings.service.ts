import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SvgSettings } from '../entities/svg-settings.entity';
import { 
  CreateSvgSettingsDto, 
  UpdateSvgSettingsDto, 
  SvgSettingsResponseDto 
} from '../dto/svg-settings.dto';

@Injectable()
export class SvgSettingsService {
  constructor(
    @InjectRepository(SvgSettings)
    private svgSettingsRepository: Repository<SvgSettings>,
  ) {}

  async create(createDto: CreateSvgSettingsDto): Promise<SvgSettingsResponseDto> {
    // Check if already exists
    const existing = await this.svgSettingsRepository.findOne({
      where: { 
        settingKey: createDto.settingKey, 
        userId: createDto.userId || undefined 
      }
    });

    if (existing) {
      throw new ConflictException('Setting already exists');
    }

    const svgSetting = this.svgSettingsRepository.create(createDto);
    const saved = await this.svgSettingsRepository.save(svgSetting);
    return this.mapToResponseDto(saved);
  }

  async findByUser(userId: string): Promise<SvgSettingsResponseDto[]> {
    const settings = await this.svgSettingsRepository.find({
      where: { userId },
      order: { priority: 'ASC', createdAt: 'ASC' },
    });
    return settings.map(item => this.mapToResponseDto(item));
  }

  async findGlobalSettings(): Promise<SvgSettingsResponseDto[]> {
    const settings = await this.svgSettingsRepository.find({
      where: { isGlobal: true },
      order: { priority: 'ASC', createdAt: 'ASC' },
    });
    return settings.map(item => this.mapToResponseDto(item));
  }

  async findByCategory(category: string, userId?: string): Promise<SvgSettingsResponseDto[]> {
    const whereClause: any = { category };
    if (userId) {
      whereClause.userId = userId;
    }

    const settings = await this.svgSettingsRepository.find({
      where: whereClause,
      order: { priority: 'ASC', createdAt: 'ASC' },
    });
    return settings.map(item => this.mapToResponseDto(item));
  }

  async findByKey(settingKey: string, userId?: string): Promise<SvgSettingsResponseDto | null> {
    const whereClause: any = { settingKey };
    if (userId) {
      whereClause.userId = userId;
    }

    const setting = await this.svgSettingsRepository.findOne({
      where: whereClause,
    });

    return setting ? this.mapToResponseDto(setting) : null;
  }

  async update(id: string, updateDto: UpdateSvgSettingsDto, userId?: string): Promise<SvgSettingsResponseDto> {
    const whereClause: any = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    const svgSetting = await this.svgSettingsRepository.findOne({
      where: whereClause,
    });

    if (!svgSetting) {
      throw new NotFoundException('SVG setting not found');
    }

    Object.assign(svgSetting, updateDto);
    const saved = await this.svgSettingsRepository.save(svgSetting);
    return this.mapToResponseDto(saved);
  }

  async remove(id: string, userId?: string): Promise<void> {
    const whereClause: any = { id };
    if (userId) {
      whereClause.userId = userId;
    }

    const svgSetting = await this.svgSettingsRepository.findOne({
      where: whereClause,
    });

    if (!svgSetting) {
      throw new NotFoundException('SVG setting not found');
    }

    await this.svgSettingsRepository.remove(svgSetting);
  }

  async getMergedSettings(userId?: string): Promise<Record<string, any>> {
    // Get global settings first
    const globalSettings = await this.findGlobalSettings();
    
    // Get user-specific settings if userId provided
    const userSettings = userId ? await this.findByUser(userId) : [];
    
    // Merge settings (user settings override global ones)
    const mergedSettings: Record<string, any> = {};
    
    // Apply global settings
    globalSettings.forEach(setting => {
      mergedSettings[setting.settingKey] = setting.value;
    });
    
    // Override with user settings
    userSettings.forEach(setting => {
      mergedSettings[setting.settingKey] = setting.value;
    });
    
    return mergedSettings;
  }

  async createDefaultSettings(userId: string): Promise<void> {
    const defaultSettings = [
      {
        settingKey: 'defaultWidth',
        settingName: 'Largeur par défaut',
        description: 'Largeur par défaut des SVG générés',
        value: 1080,
        valueType: 'number' as const,
        isGlobal: false,
        category: 'dimensions',
        priority: 1,
        userId,
      },
      {
        settingKey: 'defaultHeight',
        settingName: 'Hauteur par défaut',
        description: 'Hauteur par défaut des SVG générés',
        value: 1080,
        valueType: 'number' as const,
        isGlobal: false,
        category: 'dimensions',
        priority: 2,
        userId,
      },
      {
        settingKey: 'defaultFontFamily',
        settingName: 'Police par défaut',
        description: 'Famille de police par défaut',
        value: 'Arial, sans-serif',
        valueType: 'string' as const,
        isGlobal: false,
        category: 'typography',
        priority: 3,
        userId,
      },
      {
        settingKey: 'defaultFontSize',
        settingName: 'Taille de police par défaut',
        description: 'Taille de police par défaut en pixels',
        value: 16,
        valueType: 'number' as const,
        isGlobal: false,
        category: 'typography',
        priority: 4,
        userId,
      },
    ];

    for (const setting of defaultSettings) {
      try {
        await this.create(setting);
      } catch (error) {
        // Ignore conflicts if settings already exist
        if (error instanceof ConflictException) {
          continue;
        }
        throw error;
      }
    }
  }

  private mapToResponseDto(entity: SvgSettings): SvgSettingsResponseDto {
    return {
      id: entity.id,
      settingKey: entity.settingKey,
      settingName: entity.settingName,
      description: entity.description,
      value: entity.value,
      valueType: entity.valueType,
      isGlobal: entity.isGlobal,
      category: entity.category,
      priority: entity.priority,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
} 