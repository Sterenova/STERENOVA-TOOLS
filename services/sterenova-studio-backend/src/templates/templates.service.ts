import { Injectable } from '@nestjs/common';
import { TemplateRegistryService } from './registry/template-registry.service';
import { DownloadHistoryService } from './services/download-history.service';
import { FavoriteTemplateService } from './services/favorite-template.service';
import { SvgSettingsService } from './services/svg-settings.service';
import { CreateDownloadHistoryDto } from './dto/download-history.dto';
import * as archiver from 'archiver';
import { createWriteStream } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly registry: TemplateRegistryService,
    private readonly downloadHistoryService: DownloadHistoryService,
    private readonly favoriteTemplateService: FavoriteTemplateService,
    private readonly svgSettingsService: SvgSettingsService,
  ) {}

  list() {
    return this.registry.getAllMetadata();
  }

  getOne(kind: 'post' | 'story', name: string): string | undefined {
    const template = this.registry.getTemplate(`${kind}/${name}`);
    if (!template) return undefined;

    // Generate with default values
    return template.generate({});
  }

  generateOne(
    kind: 'post' | 'story',
    name: string,
    replacements: Record<string, string> = {},
  ): string {
    const template = this.registry.getTemplate(`${kind}/${name}`);
    if (!template) {
      throw new Error(`Unknown template ${kind}/${name}`);
    }

    return template.generate(replacements);
  }

  async generateOneWithHistory(
    kind: 'post' | 'story',
    name: string,
    replacements: Record<string, string> = {},
    downloadInfo?: Partial<CreateDownloadHistoryDto>,
  ): Promise<string> {
    const template = this.registry.getTemplate(`${kind}/${name}`);
    if (!template) {
      throw new Error(`Unknown template ${kind}/${name}`);
    }

    const svg = template.generate(replacements);

    // Save download history if downloadInfo is provided
    if (downloadInfo) {
      try {
        await this.downloadHistoryService.create({
          templateName: name,
          templateCategory: kind,
          templateParameters: replacements,
          ...downloadInfo,
        });
      } catch (error) {
        // Log error but don't fail the generation
        console.error('Failed to save download history:', error);
      }
    }

    return svg;
  }

  getPreset(kind: 'post' | 'story', name: string): Record<string, string> {
    const template = this.registry.getTemplate(`${kind}/${name}`);
    if (!template) {
      throw new Error(`Unknown template ${kind}/${name}`);
    }

    return template.getPreset();
  }

  getAllPresets() {
    const templates = this.registry.getAllTemplates();
    const presets: Record<string, Record<string, string>> = {};

    for (const [key, template] of Object.entries(templates)) {
      presets[key] = template.getPreset();
    }

    return presets;
  }

  applyPlaceholders(sourceSvg: string, values: Record<string, string>): string {
    let svg = sourceSvg;
    for (const [key, val] of Object.entries(values)) {
      const pattern = new RegExp(this.escapeRegExp(`{{${key}}}`), 'g');
      svg = svg.replace(pattern, String(val));
    }
    return svg;
  }

  private escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async zipAll(targetDir: string, userId?: string): Promise<string> {
    const templates = this.registry.getAllTemplates();
    const archive = archiver('zip', { zlib: { level: 9 } });
    const outPath = join(targetDir, `sterenova_templates_${Date.now()}.zip`);
    const output = createWriteStream(outPath);

    return new Promise((resolve, reject) => {
      output.on('close', async () => {
        // Save download history for bulk download
        if (userId) {
          try {
            await this.downloadHistoryService.create({
              templateName: 'bulk_download',
              templateCategory: 'post',
              templateParameters: {
                count: Object.keys(templates).length.toString(),
              },
              fileName: `sterenova_templates_${Date.now()}.zip`,
              fileFormat: 'zip',
              userId,
            });
          } catch (error) {
            console.error('Failed to save bulk download history:', error);
          }
        }
        resolve(outPath);
      });
      archive.on('error', reject);
      archive.pipe(output);

      // Add each template
      for (const [key, template] of Object.entries(templates)) {
        const svg = template.generate({});
        const filename = `${key}.svg`;
        archive.append(svg, { name: filename });
      }

      archive.finalize();
    });
  }

  // New methods for template management
  getTemplateInfo(key: string) {
    return this.registry.getTemplateMetadata(key);
  }

  getTemplatesByCategory(category: 'post' | 'story') {
    return this.registry.getTemplatesByCategory(category);
  }

  searchTemplates(query: string) {
    const allMetadata = this.registry.getAllMetadata();
    const lowerQuery = query.toLowerCase();

    return allMetadata.filter(
      (template) =>
        template.name.toLowerCase().includes(lowerQuery) ||
        template.displayName.toLowerCase().includes(lowerQuery) ||
        template.description.toLowerCase().includes(lowerQuery) ||
        template.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    );
  }

  // New methods for user preferences and settings
  async getUserFavorites(userId: string) {
    return this.favoriteTemplateService.findByUser(userId);
  }

  async addToFavorites(
    userId: string,
    templateName: string,
    templateCategory: 'post' | 'story',
    defaultParameters?: Record<string, any>,
    notes?: string,
  ) {
    return this.favoriteTemplateService.create({
      userId,
      templateName,
      templateCategory,
      defaultParameters,
      notes,
    });
  }

  async removeFromFavorites(userId: string, favoriteId: string) {
    return this.favoriteTemplateService.remove(favoriteId, userId);
  }

  async getUserSettings(userId: string) {
    return this.svgSettingsService.getMergedSettings(userId);
  }

  async updateUserSetting(
    userId: string,
    settingKey: string,
    value: any,
    settingName?: string,
    description?: string,
  ) {
    const existing = await this.svgSettingsService.findByKey(
      settingKey,
      userId,
    );

    if (existing) {
      return this.svgSettingsService.update(
        existing.id,
        { value, settingName, description },
        userId,
      );
    } else {
      return this.svgSettingsService.create({
        settingKey,
        settingName: settingName || settingKey,
        value,
        valueType: this.getValueType(value),
        userId,
      });
    }
  }

  private getValueType(
    value: any,
  ): 'string' | 'number' | 'boolean' | 'object' | 'array' {
    if (typeof value === 'string') return 'string';
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (Array.isArray(value)) return 'array';
    if (typeof value === 'object' && value !== null) return 'object';
    return 'string';
  }

  async generatePng(
    kind: 'post' | 'story',
    name: string,
    replacements: Record<string, string> = {},
    dimensions?: { width?: number; height?: number },
  ): Promise<Buffer> {
    const svg = this.generateOne(kind, name, replacements);

    let sharpInstance = sharp(Buffer.from(svg));

    if (dimensions?.width || dimensions?.height) {
      sharpInstance = sharpInstance.resize(
        dimensions.width,
        dimensions.height,
        {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        },
      );
    }

    return sharpInstance.png().toBuffer();
  }

  async generateJpeg(
    kind: 'post' | 'story',
    name: string,
    replacements: Record<string, string> = {},
    dimensions?: { width?: number; height?: number },
    quality: number = 90,
  ): Promise<Buffer> {
    const svg = this.generateOne(kind, name, replacements);

    let sharpInstance = sharp(Buffer.from(svg));

    if (dimensions?.width || dimensions?.height) {
      sharpInstance = sharpInstance.resize(
        dimensions.width,
        dimensions.height,
        {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        },
      );
    }

    return sharpInstance.jpeg({ quality }).toBuffer();
  }
}
