import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class HealthService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'sterenova-client-management',
      version: '1.0.0',
      uptime: process.uptime(),
    };
  }

  async getReadiness() {
    const checks: Record<string, string> = {};

    // Check database connection
    try {
      await this.dataSource.query('SELECT 1');
      checks.database = 'ok';
    } catch (error) {
      checks.database = 'error';
    }

    const allChecksOk = Object.values(checks).every(status => status === 'ok');

    return {
      status: allChecksOk ? 'ready' : 'not ready',
      checks,
      timestamp: new Date().toISOString(),
    };
  }

  getLiveness() {
    return {
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
