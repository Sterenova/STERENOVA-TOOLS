import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DownloadHistory } from '../entities/download-history.entity';
import { CreateDownloadHistoryDto, DownloadHistoryResponseDto } from '../dto/download-history.dto';

@Injectable()
export class DownloadHistoryService {
  constructor(
    @InjectRepository(DownloadHistory)
    private downloadHistoryRepository: Repository<DownloadHistory>,
  ) {}

  async create(createDto: CreateDownloadHistoryDto): Promise<DownloadHistoryResponseDto> {
    const downloadHistory = this.downloadHistoryRepository.create(createDto);
    const saved = await this.downloadHistoryRepository.save(downloadHistory);
    return this.mapToResponseDto(saved);
  }

  async findByUser(userId: string, limit: number = 50): Promise<DownloadHistoryResponseDto[]> {
    const history = await this.downloadHistoryRepository.find({
      where: { userId },
      order: { downloadedAt: 'DESC' },
      take: limit,
    });
    return history.map(item => this.mapToResponseDto(item));
  }

  async findByTemplate(templateName: string, limit: number = 50): Promise<DownloadHistoryResponseDto[]> {
    const history = await this.downloadHistoryRepository.find({
      where: { templateName },
      order: { downloadedAt: 'DESC' },
      take: limit,
    });
    return history.map(item => this.mapToResponseDto(item));
  }

  async getStats(userId?: string): Promise<{
    totalDownloads: number;
    downloadsByTemplate: Record<string, number>;
    downloadsByCategory: Record<string, number>;
  }> {
    let query = this.downloadHistoryRepository.createQueryBuilder('dh');
    
    if (userId) {
      query = query.where('dh.userId = :userId', { userId });
    }

    const totalDownloads = await query.getCount();

    const downloadsByTemplate = await query
      .select('dh.templateName', 'templateName')
      .addSelect('COUNT(*)', 'count')
      .groupBy('dh.templateName')
      .getRawMany();

    const downloadsByCategory = await query
      .select('dh.templateCategory', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('dh.templateCategory')
      .getRawMany();

    return {
      totalDownloads,
      downloadsByTemplate: downloadsByTemplate.reduce((acc, item) => {
        acc[item.templateName] = parseInt(item.count);
        return acc;
      }, {}),
      downloadsByCategory: downloadsByCategory.reduce((acc, item) => {
        acc[item.category] = parseInt(item.count);
        return acc;
      }, {}),
    };
  }

  async deleteOldHistory(olderThanDays: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    const result = await this.downloadHistoryRepository
      .createQueryBuilder()
      .delete()
      .where('downloadedAt < :cutoffDate', { cutoffDate })
      .execute();

    return result.affected || 0;
  }

  private mapToResponseDto(entity: DownloadHistory): DownloadHistoryResponseDto {
    return {
      id: entity.id,
      templateName: entity.templateName,
      templateCategory: entity.templateCategory,
      templateParameters: entity.templateParameters,
      fileName: entity.fileName,
      fileFormat: entity.fileFormat,
      fileSize: entity.fileSize,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      userId: entity.userId,
      downloadedAt: entity.downloadedAt,
    };
  }
} 