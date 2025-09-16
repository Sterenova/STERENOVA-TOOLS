import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { SvgSettingsService } from '../services/svg-settings.service';
import { 
  CreateSvgSettingsDto, 
  UpdateSvgSettingsDto, 
  SvgSettingsResponseDto 
} from '../dto/svg-settings.dto';

@Controller('svg-settings')
export class SvgSettingsController {
  constructor(private readonly svgSettingsService: SvgSettingsService) {}

  @Post()
  async create(@Body() createDto: CreateSvgSettingsDto): Promise<SvgSettingsResponseDto> {
    return this.svgSettingsService.create(createDto);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<SvgSettingsResponseDto[]> {
    return this.svgSettingsService.findByUser(userId);
  }

  @Get('global')
  async findGlobalSettings(): Promise<SvgSettingsResponseDto[]> {
    return this.svgSettingsService.findGlobalSettings();
  }

  @Get('merged/:userId')
  async getMergedSettings(@Param('userId') userId: string): Promise<Record<string, any>> {
    return this.svgSettingsService.getMergedSettings(userId);
  }

  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
    @Query('userId') userId?: string,
  ): Promise<SvgSettingsResponseDto[]> {
    return this.svgSettingsService.findByCategory(category, userId);
  }

  @Get('key/:settingKey')
  async findByKey(
    @Param('settingKey') settingKey: string,
    @Query('userId') userId?: string,
  ): Promise<SvgSettingsResponseDto | null> {
    return this.svgSettingsService.findByKey(settingKey, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSvgSettingsDto,
    @Query('userId') userId?: string,
  ): Promise<SvgSettingsResponseDto> {
    return this.svgSettingsService.update(id, updateDto, userId);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('userId') userId?: string,
  ): Promise<void> {
    return this.svgSettingsService.remove(id, userId);
  }

  @Post('user/:userId/defaults')
  async createDefaultSettings(@Param('userId') userId: string): Promise<void> {
    return this.svgSettingsService.createDefaultSettings(userId);
  }
} 