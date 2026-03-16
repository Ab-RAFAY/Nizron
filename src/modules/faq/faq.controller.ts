import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FAQService } from './faq.service';
import { CreateFAQDto, UpdateFAQDto } from './dto/faq.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('faq')
@Controller('faq')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a FAQ' })
  create(@Body() createFAQDto: CreateFAQDto) {
    return this.faqService.create(createFAQDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FAQs with pagination and search by title or category' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.faqService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single FAQ by id' })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a FAQ' })
  update(@Param('id') id: string, @Body() updateFAQDto: UpdateFAQDto) {
    return this.faqService.update(id, updateFAQDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a FAQ (soft delete)' })
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
}
