import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(data: CreateClientDto) {
    const client = this.clientRepository.create(data);
    return this.clientRepository.save(client);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    return this.clientRepository
      .findAndCount({
        skip,
        take: limit,
        order: {
          id: 'DESC',
        },
      })
      .then(([data, total]) => {
        return {
          data,
          total,
          page,
          lastPage: Math.ceil(total / limit),
        };
      });
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  update(id: number, data: UpdateClientDto) {
    return this.clientRepository.update(id, data);
  }
}
