import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getInfo() {
    return {
      service: this.configService.get('SERVICE_NAME', 'backend-nestjs-template'),
      version: this.configService.get('SERVICE_VERSION', '0.1.0'),
      environment: this.configService.get('NODE_ENV', 'development'),
      timestamp: new Date().toISOString(),
    };
  }
}
