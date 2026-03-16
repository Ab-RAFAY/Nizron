import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto, UpdateTeamDto } from './dto/team.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a team' })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teams with pagination and search by name' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.teamsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single team by id' })
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a team' })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a team (soft delete)' })
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
