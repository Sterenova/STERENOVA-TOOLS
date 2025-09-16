import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteTemplate } from '../entities/favorite-template.entity';
import { 
  CreateFavoriteTemplateDto, 
  UpdateFavoriteTemplateDto, 
  FavoriteTemplateResponseDto 
} from '../dto/favorite-template.dto';

@Injectable()
export class FavoriteTemplateService {
  constructor(
    @InjectRepository(FavoriteTemplate)
    private favoriteTemplateRepository: Repository<FavoriteTemplate>,
  ) {}

  async create(createDto: CreateFavoriteTemplateDto): Promise<FavoriteTemplateResponseDto> {
    // Check if already exists
    const existing = await this.favoriteTemplateRepository.findOne({
      where: { userId: createDto.userId, templateName: createDto.templateName }
    });

    if (existing) {
      throw new ConflictException('Template already in favorites');
    }

    const favoriteTemplate = this.favoriteTemplateRepository.create(createDto);
    const saved = await this.favoriteTemplateRepository.save(favoriteTemplate);
    return this.mapToResponseDto(saved);
  }

  async findByUser(userId: string): Promise<FavoriteTemplateResponseDto[]> {
    const favorites = await this.favoriteTemplateRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return favorites.map(item => this.mapToResponseDto(item));
  }

  async findByUserAndCategory(userId: string, category: 'post' | 'story'): Promise<FavoriteTemplateResponseDto[]> {
    const favorites = await this.favoriteTemplateRepository.find({
      where: { userId, templateCategory: category },
      order: { createdAt: 'DESC' },
    });
    return favorites.map(item => this.mapToResponseDto(item));
  }

  async update(id: string, updateDto: UpdateFavoriteTemplateDto, userId: string): Promise<FavoriteTemplateResponseDto> {
    const favoriteTemplate = await this.favoriteTemplateRepository.findOne({
      where: { id, userId }
    });

    if (!favoriteTemplate) {
      throw new NotFoundException('Favorite template not found');
    }

    Object.assign(favoriteTemplate, updateDto);
    const saved = await this.favoriteTemplateRepository.save(favoriteTemplate);
    return this.mapToResponseDto(saved);
  }

  async remove(id: string, userId: string): Promise<void> {
    const favoriteTemplate = await this.favoriteTemplateRepository.findOne({
      where: { id, userId }
    });

    if (!favoriteTemplate) {
      throw new NotFoundException('Favorite template not found');
    }

    await this.favoriteTemplateRepository.remove(favoriteTemplate);
  }

  async incrementUsageCount(templateName: string, userId: string): Promise<void> {
    const favoriteTemplate = await this.favoriteTemplateRepository.findOne({
      where: { templateName, userId }
    });

    if (favoriteTemplate) {
      favoriteTemplate.usageCount += 1;
      await this.favoriteTemplateRepository.save(favoriteTemplate);
    }
  }

  async getMostUsedFavorites(userId: string, limit: number = 10): Promise<FavoriteTemplateResponseDto[]> {
    const favorites = await this.favoriteTemplateRepository.find({
      where: { userId },
      order: { usageCount: 'DESC', createdAt: 'DESC' },
      take: limit,
    });
    return favorites.map(item => this.mapToResponseDto(item));
  }

  async isFavorite(templateName: string, userId: string): Promise<boolean> {
    const favorite = await this.favoriteTemplateRepository.findOne({
      where: { templateName, userId }
    });
    return !!favorite;
  }

  private mapToResponseDto(entity: FavoriteTemplate): FavoriteTemplateResponseDto {
    return {
      id: entity.id,
      templateName: entity.templateName,
      templateCategory: entity.templateCategory,
      defaultParameters: entity.defaultParameters,
      notes: entity.notes,
      usageCount: entity.usageCount,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
} 