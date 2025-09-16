import { Controller, Get, Post, Body, Query, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DownloadHistoryService } from '../services/download-history.service';
import { CreateDownloadHistoryDto, DownloadHistoryResponseDto } from '../dto/download-history.dto';

@Controller('download-history')
export class DownloadHistoryController {
  constructor(private readonly downloadHistoryService: DownloadHistoryService) {}

  @Post()
  async create(@Body() createDto: CreateDownloadHistoryDto): Promise<DownloadHistoryResponseDto> {
    return this.downloadHistoryService.create(createDto);
  }

  @Get('user/:userId')
  async findByUser(
    @Param('userId') userId: string,
    @Query('limit') limit: number = 50,
  ): Promise<DownloadHistoryResponseDto[]> {
    return this.downloadHistoryService.findByUser(userId, limit);
  }

  @Get('template/:templateName')
  async findByTemplate(
    @Param('templateName') templateName: string,
    @Query('limit') limit: number = 50,
  ): Promise<DownloadHistoryResponseDto[]> {
    return this.downloadHistoryService.findByTemplate(templateName, limit);
  }

  @Get('stats')
  async getStats(@Query('userId') userId?: string) {
    return this.downloadHistoryService.getStats(userId);
  }

  @Delete('cleanup')
  async cleanupOldHistory(@Query('days') days: number = 90) {
    const deletedCount = await this.downloadHistoryService.deleteOldHistory(days);
    return { message: `Deleted ${deletedCount} old records`, deletedCount };
  }
} 