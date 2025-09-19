import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientResponseDto } from './dto/client-response.dto';
import { ClientQueryDto } from './dto/client-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles('admin', 'manager', 'user')
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({
    status: 201,
    description: 'Client créé avec succès',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Un client avec cet email existe déjà' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @Roles('admin', 'manager', 'user')
  @ApiOperation({ summary: 'Récupérer la liste des clients avec pagination et filtres' })
  @ApiResponse({
    status: 200,
    description: 'Liste des clients récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        clients: {
          type: 'array',
          items: { $ref: '#/components/schemas/ClientResponseDto' },
        },
        total: { type: 'number', description: 'Nombre total de clients' },
        page: { type: 'number', description: 'Page actuelle' },
        limit: { type: 'number', description: 'Nombre d\'éléments par page' },
        totalPages: { type: 'number', description: 'Nombre total de pages' },
      },
    },
  })
  async findAll(@Query() queryDto: ClientQueryDto) {
    return this.clientsService.findAll(queryDto);
  }

  @Get('stats')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Récupérer les statistiques des clients' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées avec succès',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number' },
        active: { type: 'number' },
        inactive: { type: 'number' },
        suspended: { type: 'number' },
        byType: {
          type: 'object',
          additionalProperties: { type: 'number' },
        },
      },
    },
  })
  async getStats() {
    return this.clientsService.getStats();
  }

  @Get(':id')
  @Roles('admin', 'manager', 'user')
  @ApiOperation({ summary: 'Récupérer un client par son ID' })
  @ApiParam({ name: 'id', description: 'ID unique du client' })
  @ApiResponse({
    status: 200,
    description: 'Client récupéré avec succès',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  async findOne(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.findOne(id);
  }

  @Get('email/:email')
  @Roles('admin', 'manager', 'user')
  @ApiOperation({ summary: 'Récupérer un client par son email' })
  @ApiParam({ name: 'email', description: 'Email du client' })
  @ApiResponse({
    status: 200,
    description: 'Client récupéré avec succès',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  async findByEmail(@Param('email') email: string): Promise<ClientResponseDto | null> {
    return this.clientsService.findByEmail(email);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiParam({ name: 'id', description: 'ID unique du client' })
  @ApiResponse({
    status: 200,
    description: 'Client mis à jour avec succès',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  @ApiResponse({ status: 409, description: 'Un client avec cet email existe déjà' })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @Roles('admin', 'manager')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un client (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID unique du client' })
  @ApiResponse({ status: 204, description: 'Client supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.clientsService.remove(id);
  }

  @Patch(':id/restore')
  @Roles('admin', 'manager')
  @ApiOperation({ summary: 'Restaurer un client supprimé' })
  @ApiParam({ name: 'id', description: 'ID unique du client' })
  @ApiResponse({
    status: 200,
    description: 'Client restauré avec succès',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  @ApiResponse({ status: 400, description: 'Ce client n\'est pas supprimé' })
  async restore(@Param('id') id: string): Promise<ClientResponseDto> {
    return this.clientsService.restore(id);
  }
}
