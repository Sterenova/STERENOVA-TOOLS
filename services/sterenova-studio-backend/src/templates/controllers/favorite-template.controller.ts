import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { FavoriteTemplateService } from '../services/favorite-template.service';
import { 
  CreateFavoriteTemplateDto, 
  UpdateFavoriteTemplateDto, 
  FavoriteTemplateResponseDto 
} from '../dto/favorite-template.dto';

@Controller('favorite-templates')
export class FavoriteTemplateController {
  constructor(private readonly favoriteTemplateService: FavoriteTemplateService) {}

  @Post()
  async create(@Body() createDto: CreateFavoriteTemplateDto): Promise<FavoriteTemplateResponseDto> {
    return this.favoriteTemplateService.create(createDto);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<FavoriteTemplateResponseDto[]> {
    return this.favoriteTemplateService.findByUser(userId);
  }

  @Get('user/:userId/category/:category')
  async findByUserAndCategory(
    @Param('userId') userId: string,
    @Param('category') category: 'post' | 'story',
  ): Promise<FavoriteTemplateResponseDto[]> {
    return this.favoriteTemplateService.findByUserAndCategory(userId, category);
  }

  @Get('user/:userId/most-used')
  async getMostUsedFavorites(
    @Param('userId') userId: string,
    @Query('limit') limit: number = 10,
  ): Promise<FavoriteTemplateResponseDto[]> {
    return this.favoriteTemplateService.getMostUsedFavorites(userId, limit);
  }

  @Get('user/:userId/is-favorite/:templateName')
  async isFavorite(
    @Param('userId') userId: string,
    @Param('templateName') templateName: string,
  ): Promise<{ isFavorite: boolean }> {
    const isFavorite = await this.favoriteTemplateService.isFavorite(templateName, userId);
    return { isFavorite };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFavoriteTemplateDto,
    @Query('userId') userId: string,
  ): Promise<FavoriteTemplateResponseDto> {
    return this.favoriteTemplateService.update(id, updateDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    return this.favoriteTemplateService.remove(id, userId);
  }

  @Post(':id/increment-usage')
  async incrementUsage(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    // Get template name from the favorite template
    const favorite = await this.favoriteTemplateService.findByUser(userId);
    const targetFavorite = favorite.find(f => f.id === id);
    if (targetFavorite) {
      await this.favoriteTemplateService.incrementUsageCount(targetFavorite.templateName, userId);
    }
  }
} 