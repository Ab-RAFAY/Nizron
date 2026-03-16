import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto, UpdateMemberDto } from './dto/member.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { PaginatedResult } from '../../common/pagination/pagination.result';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.membersRepository.create(createMemberDto);
    return this.membersRepository.save(member);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Member>> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where = search ? { name: Like(`%${search}%`) } : {};

    const [data, total] = await this.membersRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Member> {
    const member = await this.membersRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    this.membersRepository.merge(member, updateMemberDto);
    return this.membersRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);
    await this.membersRepository.softRemove(member);
  }
}
