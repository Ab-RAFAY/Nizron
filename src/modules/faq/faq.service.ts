import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FAQ } from './entities/faq.entity';
import { CreateFAQDto, UpdateFAQDto } from './dto/faq.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { PaginatedResult } from '../../common/pagination/pagination.result';

@Injectable()
export class FAQService {
  constructor(
    @InjectRepository(FAQ)
    private readonly faqRepository: Repository<FAQ>,
  ) {}

  async create(createFAQDto: CreateFAQDto): Promise<FAQ> {
    const faq = this.faqRepository.create(createFAQDto);
    return this.faqRepository.save(faq);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<FAQ>> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where = search ? [
      { questionTitle: Like(`%${search}%`) },
      { category: Like(`%${search}%`) }
    ] : {};

    const [data, total] = await this.faqRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<FAQ> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  async update(id: string, updateFAQDto: UpdateFAQDto): Promise<FAQ> {
    const faq = await this.findOne(id);
    this.faqRepository.merge(faq, updateFAQDto);
    return this.faqRepository.save(faq);
  }

  async remove(id: string): Promise<void> {
    const faq = await this.findOne(id);
    await this.faqRepository.softRemove(faq);
  }
}
