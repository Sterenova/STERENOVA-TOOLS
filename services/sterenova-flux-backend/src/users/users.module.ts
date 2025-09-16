import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Client } from './client.entity';
import { UsersService } from './users.service';
import { ClientsService } from './clients.service';
import { UsersController } from './users.controller';
import { ClientsController } from './clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client])],
  providers: [UsersService, ClientsService],
  controllers: [UsersController, ClientsController],
  exports: [UsersService, ClientsService],
})
export class UsersModule {}
