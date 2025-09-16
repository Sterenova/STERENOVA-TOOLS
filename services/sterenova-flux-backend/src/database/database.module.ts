import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/user.entity';
import { Client } from '../users/client.entity';
import { Quote } from '../quotes/quote.entity';
import { QuoteItem } from '../quotes/quote-item.entity';
import { Invoice } from '../invoices/invoice.entity';
import { InvoiceItem } from '../invoices/invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
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
          entities: [User, Client, Quote, QuoteItem, Invoice, InvoiceItem],
          synchronize: true,
          logging: environment === 'development',
          ssl: false,
          retryAttempts: 10,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
