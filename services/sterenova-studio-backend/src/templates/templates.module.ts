import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesController } from './templates.controller';
import { TemplatesService } from './templates.service';
import { TemplateRegistryService } from './registry/template-registry.service';
import { DownloadHistoryController } from './controllers/download-history.controller';
import { FavoriteTemplateController } from './controllers/favorite-template.controller';
import { SvgSettingsController } from './controllers/svg-settings.controller';
import { DownloadHistoryService } from './services/download-history.service';
import { FavoriteTemplateService } from './services/favorite-template.service';
import { SvgSettingsService } from './services/svg-settings.service';
import { DownloadHistory } from './entities/download-history.entity';
import { FavoriteTemplate } from './entities/favorite-template.entity';
import { SvgSettings } from './entities/svg-settings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DownloadHistory,
      FavoriteTemplate,
      SvgSettings,
    ]),
  ],
  controllers: [
    TemplatesController,
    DownloadHistoryController,
    FavoriteTemplateController,
    SvgSettingsController,
  ],
  providers: [
    TemplatesService,
    TemplateRegistryService,
    DownloadHistoryService,
    FavoriteTemplateService,
    SvgSettingsService,
  ],
  exports: [
    TemplatesService,
    TemplateRegistryService,
    DownloadHistoryService,
    FavoriteTemplateService,
    SvgSettingsService,
  ],
})
export class TemplatesModule {} 