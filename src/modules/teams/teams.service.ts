import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { PaginatedResult } from '../../common/pagination/pagination.result';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamsRepository.create(createTeamDto);
    return this.teamsRepository.save(team);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Team>> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where = search ? { name: Like(`%${search}%`) } : {};

    const [data, total] = await this.teamsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamsRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);
    this.teamsRepository.merge(team, updateTeamDto);
    return this.teamsRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamsRepository.softRemove(team);
  }
}
