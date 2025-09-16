import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client, ClientType } from './client.entity';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiResponse({ status: 201, description: 'Client créé avec succès', type: Client })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients' })
  @ApiQuery({ name: 'search', required: false, description: 'Terme de recherche' })
  @ApiResponse({ status: 200, description: 'Liste des clients', type: [Client] })
  findAll(@Query('search') search?: string) {
    return this.clientsService.findAll(search);
  }

  @Get('active')
  @ApiOperation({ summary: 'Récupérer tous les clients actifs' })
  @ApiResponse({ status: 200, description: 'Liste des clients actifs', type: [Client] })
  findActive() {
    return this.clientsService.getActiveClients();
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Récupérer les clients par type' })
  @ApiResponse({ status: 200, description: 'Liste des clients du type spécifié', type: [Client] })
  findByType(@Param('type') type: ClientType) {
    return this.clientsService.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par ID' })
  @ApiResponse({ status: 200, description: 'Client trouvé', type: Client })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un client' })
  @ApiResponse({ status: 200, description: 'Client mis à jour', type: Client })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiResponse({ status: 200, description: 'Client supprimé' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Désactiver un client' })
  @ApiResponse({ status: 200, description: 'Client désactivé', type: Client })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  deactivate(@Param('id') id: string) {
    return this.clientsService.deactivate(id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activer un client' })
  @ApiResponse({ status: 200, description: 'Client activé', type: Client })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  activate(@Param('id') id: string) {
    return this.clientsService.activate(id);
  }
}
