import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';
import { CreateServiceDto, UpdateServiceDto } from './dto/service.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { PaginatedResult } from '../../common/pagination/pagination.result';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly servicesRepository: Repository<ServiceEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    const service = this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(service);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<ServiceEntity>> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where = search ? { title: Like(`%${search}%`) } : {};

    const [data, total] = await this.servicesRepository.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['serviceCards', 'technologies', 'pricingPlans', 'pricingPlans.bullets'],
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<ServiceEntity> {
    const service = await this.servicesRepository.findOne({
      where: { id },
      relations: ['serviceCards', 'technologies', 'pricingPlans', 'pricingPlans.bullets'],
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceEntity> {
    const service = await this.findOne(id);
    
    // If new service cards are provided, we replace the existing ones to avoid duplicates/stale data
    if (updateServiceDto.serviceCards) {
      // Direct repository access to clean up old relations
      const cardRepo = this.servicesRepository.manager.getRepository('ServiceCard');
      await cardRepo.delete({ service: { id } });
    }
    
    const updatedService = this.servicesRepository.create({
      ...service,
      ...updateServiceDto,
    });
    
    return this.servicesRepository.save(updatedService);
  }

  async remove(id: string): Promise<void> {
    const service = await this.findOne(id);
    await this.servicesRepository.softRemove(service);
  }
}
