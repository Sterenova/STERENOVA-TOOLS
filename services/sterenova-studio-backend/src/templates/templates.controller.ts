import {
  Controller,
  Get,
  Param,
  Res,
  Query,
  Post,
  Body,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import type { Response } from 'express';
import { tmpdir } from 'os';
import { PALETTE, gradientCss } from './svg';
import { APP_TEMPLATES } from '../config/app';
import {
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { GeneratePlaceholdersDto } from './dto';

@ApiTags('templates')
@Controller('templates')
export class TemplatesController {
  constructor(private readonly service: TemplatesService) {}

  @Get('list')
  @ApiOkResponse({
    description: 'Liste des templates disponibles avec métadonnées',
  })
  list() {
    return this.service.list();
  }

  @Get('search')
  @ApiQuery({ name: 'q', description: 'Terme de recherche' })
  @ApiOkResponse({ description: 'Recherche de templates' })
  search(@Query('q') query: string) {
    if (!query)
      throw new BadRequestException('Query parameter "q" is required');
    return this.service.searchTemplates(query);
  }

  @Get('category/:category')
  @ApiParam({ name: 'category', enum: ['post', 'story'] })
  @ApiOkResponse({ description: 'Templates par catégorie' })
  getByCategory(@Param('category') category: 'post' | 'story') {
    return this.service.getTemplatesByCategory(category);
  }

  @Get('info/:key')
  @ApiParam({
    name: 'key',
    description: 'Clé du template (ex: post/01_post_hero_white.svg)',
  })
  @ApiOkResponse({ description: "Informations détaillées d'un template" })
  getTemplateInfo(@Param('key') key: string) {
    return this.service.getTemplateInfo(key);
  }

  @Get('presets')
  @ApiOkResponse({ description: 'Tous les presets disponibles' })
  presets() {
    return this.service.getAllPresets();
  }

  @Get('presets/:kind/:name')
  @ApiParam({ name: 'kind', enum: ['post', 'story'] })
  @ApiParam({ name: 'name' })
  @ApiOkResponse({ description: 'Preset pour un template spécifique' })
  getPreset(
    @Param('kind') kind: 'post' | 'story',
    @Param('name') name: string,
  ) {
    return this.service.getPreset(kind, name);
  }

  @Get('config/palette')
  @ApiOkResponse({ description: 'Palette de couleurs' })
  getPalette() {
    return PALETTE;
  }

  @Get('config/gradient.css')
  @ApiOkResponse({ description: 'CSS de gradient' })
  getGradient(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.send(gradientCss());
  }

  @Get(':kind/:name')
  @ApiParam({ name: 'kind', enum: ['post', 'story'] })
  @ApiParam({ name: 'name' })
  @ApiOkResponse({ description: 'SVG généré avec valeurs par défaut' })
  getOne(
    @Param('kind') kind: 'post' | 'story',
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const svg = this.service.getOne(kind, name);
    if (!svg) return res.status(404).json({ message: 'Template not found' });

    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.send(svg);
  }

  @Post(':kind/:name')
  @ApiParam({ name: 'kind', enum: ['post', 'story'] })
  @ApiParam({ name: 'name' })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: { type: 'string' },
      example: { TITLE: 'Mon Titre', PRICE: '299€' },
    },
  })
  @ApiOkResponse({ description: 'SVG généré avec placeholders remplacés' })
  generate(
    @Param('kind') kind: 'post' | 'story',
    @Param('name') name: string,
    @Body() body: Record<string, string>,
    @Res() res: Response,
  ) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Body must be a JSON object');
    }

    const svg = this.service.generateOne(kind, name, body);
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.send(svg);
  }

  @Post('placeholders/apply')
  @ApiBody({ type: GeneratePlaceholdersDto })
  @ApiOkResponse({ description: 'SVG avec placeholders remplacés' })
  applyPlaceholders(
    @Body() dto: GeneratePlaceholdersDto,
    @Res() res: Response,
  ) {
    const svg = this.service.applyPlaceholders(dto.sourceSvg, dto.values);
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.send(svg);
  }

  @Post(':kind/:name/png')
  @ApiParam({ name: 'kind', enum: ['post', 'story'] })
  @ApiParam({ name: 'name' })
  @ApiQuery({ name: 'width', required: false, description: 'Largeur en pixels' })
  @ApiQuery({ name: 'height', required: false, description: 'Hauteur en pixels' })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: { type: 'string' },
      example: { TITLE: 'Mon Titre', PRICE: '299€' },
    },
  })
  @ApiOkResponse({ description: 'PNG généré avec placeholders remplacés' })
  async generatePng(
    @Param('kind') kind: 'post' | 'story',
    @Param('name') name: string,
    @Body() body: Record<string, string>,
    @Res() res: Response,
    @Query('width') width?: string,
    @Query('height') height?: string,
  ) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Body must be a JSON object');
    }

    const dimensions = {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
    };

    const pngBuffer = await this.service.generatePng(kind, name, body, dimensions);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="${name}.png"`);
    res.send(pngBuffer);
  }

  @Post(':kind/:name/jpeg')
  @ApiParam({ name: 'kind', enum: ['post', 'story'] })
  @ApiParam({ name: 'name' })
  @ApiQuery({ name: 'width', required: false, description: 'Largeur en pixels' })
  @ApiQuery({ name: 'height', required: false, description: 'Hauteur en pixels' })
  @ApiQuery({ name: 'quality', required: false, description: 'Qualité JPEG (1-100)', default: '90' })
  @ApiBody({
    schema: {
      type: 'object',
      additionalProperties: { type: 'string' },
      example: { TITLE: 'Mon Titre', PRICE: '299€' },
    },
  })
  @ApiOkResponse({ description: 'JPEG généré avec placeholders remplacés' })
  async generateJpeg(
    @Param('kind') kind: 'post' | 'story',
    @Param('name') name: string,
    @Body() body: Record<string, string>,
    @Res() res: Response,
    @Query('width') width?: string,
    @Query('height') height?: string,
    @Query('quality') quality?: string,
  ) {
    if (!body || typeof body !== 'object') {
      throw new BadRequestException('Body must be a JSON object');
    }

    const dimensions = {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
    };

    const jpegBuffer = await this.service.generateJpeg(
      kind, 
      name, 
      body, 
      dimensions, 
      quality ? parseInt(quality) : 90
    );
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${name}.jpg"`);
    res.send(jpegBuffer);
  }

  @Get('archive/all.zip')
  @ApiOkResponse({ description: 'Archive ZIP de tous les templates' })
  async zipAll(
    @Res() res: Response,
    @Query('dir') dir?: string,
    @Query('userId') userId?: string,
  ) {
    const out = await this.service.zipAll(dir || tmpdir(), userId);
    res.download(out, APP_TEMPLATES.downloadFilename);
  }

  // New endpoints for user preferences and settings
  @Get('user/:userId/favorites')
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiOkResponse({ description: "Templates favoris de l'utilisateur" })
  async getUserFavorites(@Param('userId') userId: string) {
    return this.service.getUserFavorites(userId);
  }

  @Post('user/:userId/favorites')
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        templateName: { type: 'string' },
        templateCategory: { type: 'string', enum: ['post', 'story'] },
        defaultParameters: { type: 'object' },
        notes: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: 'Template ajouté aux favoris' })
  async addToFavorites(
    @Param('userId') userId: string,
    @Body()
    body: {
      templateName: string;
      templateCategory: 'post' | 'story';
      defaultParameters?: Record<string, any>;
      notes?: string;
    },
  ) {
    return this.service.addToFavorites(
      userId,
      body.templateName,
      body.templateCategory,
      body.defaultParameters,
      body.notes,
    );
  }

  @Delete('user/:userId/favorites/:favoriteId')
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiParam({ name: 'favoriteId', description: 'ID du favori' })
  @ApiOkResponse({ description: 'Template retiré des favoris' })
  async removeFromFavorites(
    @Param('userId') userId: string,
    @Param('favoriteId') favoriteId: string,
  ) {
    return this.service.removeFromFavorites(userId, favoriteId);
  }

  @Get('user/:userId/settings')
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiOkResponse({ description: "Paramètres SVG de l'utilisateur" })
  async getUserSettings(@Param('userId') userId: string) {
    return this.service.getUserSettings(userId);
  }

  @Post('user/:userId/settings/:settingKey')
  @ApiParam({ name: 'userId', description: "ID de l'utilisateur" })
  @ApiParam({ name: 'settingKey', description: 'Clé du paramètre' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        value: { type: 'any' },
        settingName: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: 'Paramètre mis à jour' })
  async updateUserSetting(
    @Param('userId') userId: string,
    @Param('settingKey') settingKey: string,
    @Body()
    body: {
      value: any;
      settingName?: string;
      description?: string;
    },
  ) {
    return this.service.updateUserSetting(
      userId,
      settingKey,
      body.value,
      body.settingName,
      body.description,
    );
  }
}
