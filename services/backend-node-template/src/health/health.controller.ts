import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private configService: ConfigService) {}

  @Get('healthz')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  healthCheck() {
    return {
      status: 'ok',
      service: this.configService.get('SERVICE_NAME', 'backend-nestjs-template'),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('readyz')
  @ApiOperation({ summary: 'Readiness check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is ready' })
  readinessCheck() {
    // Add readiness checks here (DB, Redis, etc.)
    return {
      ready: true,
      service: this.configService.get('SERVICE_NAME', 'backend-nestjs-template'),
      timestamp: new Date().toISOString(),
    };
  }
}
