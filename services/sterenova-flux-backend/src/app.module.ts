import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { QuotesModule } from './quotes/quotes.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env.local', 'env', '.env.local', '.env'],
      load: [configuration],
      validationSchema,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    QuotesModule,
    InvoicesModule,
    DashboardModule,
  ],
})
export class AppModule {}
