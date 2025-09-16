import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Client, ClientType } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // Vérifier si l'email existe déjà (si fourni)
    if (createClientDto.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: createClientDto.email },
      });

      if (existingClient) {
        throw new ConflictException('Un client avec cet email existe déjà');
      }
    }

    const client = this.clientRepository.create(createClientDto);
    return await this.clientRepository.save(client);
  }

  async findAll(search?: string): Promise<Client[]> {
    if (search) {
      return await this.clientRepository.find({
        where: [
          { name: Like(`%${search}%`) },
          { companyName: Like(`%${search}%`) },
          { firstName: Like(`%${search}%`) },
          { lastName: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
        ],
        order: { name: 'ASC' },
      });
    }

    return await this.clientRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    return client;
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientRepository.findOne({
      where: { email },
    });
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    // Vérifier si l'email est modifié et s'il existe déjà
    if (updateClientDto.email && updateClientDto.email !== client.email) {
      const existingClient = await this.clientRepository.findOne({
        where: { email: updateClientDto.email },
      });

      if (existingClient) {
        throw new ConflictException('Un client avec cet email existe déjà');
      }
    }

    Object.assign(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }

  async deactivate(id: string): Promise<Client> {
    const client = await this.findOne(id);
    client.isActive = false;
    return await this.clientRepository.save(client);
  }

  async activate(id: string): Promise<Client> {
    const client = await this.findOne(id);
    client.isActive = true;
    return await this.clientRepository.save(client);
  }

  async findByType(type: ClientType): Promise<Client[]> {
    return await this.clientRepository.find({
      where: { type },
      order: { name: 'ASC' },
    });
  }

  async getActiveClients(): Promise<Client[]> {
    return await this.clientRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }
}
