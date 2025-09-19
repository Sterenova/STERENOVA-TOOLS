import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientQueryDto } from './dto/client-query.dto';
import { ClientResponseDto } from './dto/client-response.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    // Vérifier si l'email existe déjà
    const existingClient = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
      withDeleted: false,
    });

    if (existingClient) {
      throw new ConflictException('Un client avec cet email existe déjà');
    }

    // Créer le nouveau client
    const client = this.clientRepository.create({
      ...createClientDto,
      dateOfBirth: createClientDto.dateOfBirth ? new Date(createClientDto.dateOfBirth) : undefined,
    });

    const savedClient = await this.clientRepository.save(client);
    return new ClientResponseDto(savedClient);
  }

  async findAll(queryDto: ClientQueryDto): Promise<{
    clients: ClientResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search, status, customerType, company, sortBy = 'createdAt', sortOrder = 'DESC' } = queryDto;

    const queryBuilder = this.clientRepository.createQueryBuilder('client');

    // Recherche par terme
    if (search) {
      queryBuilder.andWhere(
        '(client.firstName ILIKE :search OR client.lastName ILIKE :search OR client.email ILIKE :search OR client.company ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    // Filtres
    if (status) {
      queryBuilder.andWhere('client.status = :status', { status });
    }

    if (customerType) {
      queryBuilder.andWhere('client.customerType = :customerType', { customerType });
    }

    if (company) {
      queryBuilder.andWhere('client.company ILIKE :company', { company: `%${company}%` });
    }

    // Tri
    queryBuilder.orderBy(`client.${sortBy}`, sortOrder);

    // Pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const [clients, total] = await queryBuilder.getManyAndCount();

    const clientDtos = clients.map(client => new ClientResponseDto(client));

    return {
      clients: clientDtos,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    return new ClientResponseDto(client);
  }

  async findByEmail(email: string): Promise<ClientResponseDto | null> {
    const client = await this.clientRepository.findOne({
      where: { email },
      withDeleted: false,
    });

    return client ? new ClientResponseDto(client) : null;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    // Vérifier si l'email est modifié et s'il existe déjà
    if (updateClientDto.email && updateClientDto.email !== client.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: updateClientDto.email },
        withDeleted: false,
      });

      if (existingClient) {
        throw new ConflictException('Un client avec cet email existe déjà');
      }
    }

    // Mettre à jour les champs
    Object.assign(client, {
      ...updateClientDto,
      dateOfBirth: updateClientDto.dateOfBirth ? new Date(updateClientDto.dateOfBirth) : client.dateOfBirth,
    });

    const updatedClient = await this.clientRepository.save(client);
    return new ClientResponseDto(updatedClient);
  }

  async remove(id: string): Promise<void> {
    const client = await this.clientRepository.findOne({
      where: { id },
      withDeleted: false,
    });

    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    // Soft delete
    await this.clientRepository.softDelete(id);
  }

  async restore(id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    if (!client.deletedAt) {
      throw new BadRequestException('Ce client n\'est pas supprimé');
    }

    // Restaurer le client
    await this.clientRepository.restore(id);
    
    const restoredClient = await this.clientRepository.findOne({
      where: { id },
    });

    return new ClientResponseDto(restoredClient);
  }

  async getStats(): Promise<{
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    byType: Record<string, number>;
  }> {
    const total = await this.clientRepository.count({ withDeleted: false });
    const active = await this.clientRepository.count({ where: { status: 'active' } });
    const inactive = await this.clientRepository.count({ where: { status: 'inactive' } });
    const suspended = await this.clientRepository.count({ where: { status: 'suspended' } });

    const typeStats = await this.clientRepository
      .createQueryBuilder('client')
      .select('client.customerType', 'type')
      .addSelect('COUNT(*)', 'count')
      .where('client.customerType IS NOT NULL')
      .groupBy('client.customerType')
      .getRawMany();

    const byType = typeStats.reduce((acc, stat) => {
      acc[stat.type] = parseInt(stat.count);
      return acc;
    }, {});

    return {
      total,
      active,
      inactive,
      suspended,
      byType,
    };
  }
}
