import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesModule } from './templates/templates.module';
import { MotionModule } from './motion/motion.module';
import { AuthModule } from './auth/auth.module';

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
        const nodeEnv = configService.getOrThrow<string>('nodeEnv');
        return {
          type: 'postgres',
          host: database.host,
          port: database.port,
          username: database.user,
          password: database.password,
          database: database.name,
          ssl: database.ssl ? { rejectUnauthorized: false } : false,
          autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: Boolean(database.synchronize) && nodeEnv !== 'production',
        };
      },
    }),
    AuthModule,
    HealthModule,
    TemplatesModule,
    MotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
