import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env.local', 'env', '.env.local', '.env'],
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const database = configService.getOrThrow<any>('database');
        const environment = configService.getOrThrow<string>('environment');
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,
          ssl: database.ssl ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: environment !== 'production',
        };
      },
    }),
    AuthModule,
    ClientsModule,
    HealthModule,
  ],
})
export class AppModule {}
