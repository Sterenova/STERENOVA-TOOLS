import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Vérifier l\'état de santé du service' })
  @ApiResponse({
    status: 200,
    description: 'État de santé du service',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', format: 'date-time' },
        service: { type: 'string', example: 'sterenova-client-management' },
        version: { type: 'string', example: '1.0.0' },
        uptime: { type: 'number', description: 'Temps de fonctionnement en secondes' },
      },
    },
  })
  getHealth() {
    return this.healthService.getHealth();
  }

  @Get('ready')
  @ApiOperation({ summary: 'Vérifier si le service est prêt à recevoir des requêtes' })
  @ApiResponse({
    status: 200,
    description: 'Service prêt',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ready' },
        checks: {
          type: 'object',
          properties: {
            database: { type: 'string', example: 'ok' },
          },
        },
      },
    },
  })
  getReadiness() {
    return this.healthService.getReadiness();
  }

  @Get('live')
  @ApiOperation({ summary: 'Vérifier si le service est en vie' })
  @ApiResponse({
    status: 200,
    description: 'Service en vie',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'alive' },
        timestamp: { type: 'string', format: 'date-time' },
      },
    },
  })
  getLiveness() {
    return this.healthService.getLiveness();
  }
}
