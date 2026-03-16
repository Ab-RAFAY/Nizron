import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto, UpdateMemberDto } from './dto/member.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a member' })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all members with pagination and search by name' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.membersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single member by id' })
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a member' })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(id, updateMemberDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member (soft delete)' })
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
