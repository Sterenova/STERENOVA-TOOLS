import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '../services/config.service';

@ApiTags('Configuration')
@Controller('api/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('brand/name')
  @ApiOperation({ summary: 'Récupérer le nom de la marque' })
  @ApiResponse({ 
    status: 200, 
    description: 'Nom de la marque',
    schema: {
      type: 'string',
      example: 'Plateforme Microservices'
    }
  })
  getBrandName() {
    return this.configService.getBrandName();
  }

  @Get('brand/logo')
  @ApiOperation({ summary: 'Récupérer le logo de la marque' })
  @ApiResponse({ 
    status: 200, 
    description: 'Configuration du logo',
    schema: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        alt: { type: 'string' },
        width: { type: 'number' },
        height: { type: 'number' }
      }
    }
  })
  getLogo() {
    return this.configService.getLogo();
  }

  @Get('brand/colors')
  @ApiOperation({ summary: 'Récupérer les couleurs de la marque' })
  @ApiResponse({ 
    status: 200, 
    description: 'Configuration des couleurs',
    schema: {
      type: 'object',
      properties: {
        primary: { type: 'string' },
        secondary: { type: 'string' },
        accent: { type: 'string' }
      }
    }
  })
  getColors() {
    return this.configService.getColors();
  }

  @Get('brand/theme')
  @ApiOperation({ summary: 'Récupérer la configuration du thème' })
  @ApiResponse({ 
    status: 200, 
    description: 'Configuration du thème',
    schema: {
      type: 'object',
      properties: {
        mode: { type: 'string', enum: ['light', 'dark', 'auto'] },
        fontFamily: { type: 'string' }
      }
    }
  })
  getTheme() {
    return this.configService.getTheme();
  }

  @Get('brand')
  @ApiOperation({ summary: 'Récupérer toute la configuration de la marque' })
  @ApiResponse({ 
    status: 200, 
    description: 'Configuration complète de la marque',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        logo: {
          type: 'object',
          properties: {
            url: { type: 'string' },
            alt: { type: 'string' },
            width: { type: 'number' },
            height: { type: 'number' }
          }
        },
        colors: {
          type: 'object',
          properties: {
            primary: { type: 'string' },
            secondary: { type: 'string' },
            accent: { type: 'string' }
          }
        },
        theme: {
          type: 'object',
          properties: {
            mode: { type: 'string' },
            fontFamily: { type: 'string' }
          }
        },
        metadata: {
          type: 'object',
          properties: {
            version: { type: 'string' },
            lastUpdated: { type: 'string' }
          }
        }
      }
    }
  })
  getFullConfig() {
    return this.configService.getFullConfig();
  }

  @Get('health')
  @ApiOperation({ summary: 'Vérifier la santé du service de configuration' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service en bonne santé',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
        service: { type: 'string' },
        version: { type: 'string' }
      }
    }
  })
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'config-service',
      version: '1.0.0'
    };
  }
}
