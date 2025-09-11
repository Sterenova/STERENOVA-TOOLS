import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigController } from './controllers/config.controller';
import { ConfigService } from './services/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class AppModule {}
