import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { PaginatedResult } from '../../common/pagination/pagination.result';
import { ProductImage } from './entities/product-image.entity';
import { ProductFAQ } from './entities/product-faq.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
    @InjectRepository(ProductFAQ)
    private readonly productFaqRepo: Repository<ProductFAQ>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create({
      ...createProductDto,
      images: createProductDto.images?.map(img => this.productImageRepo.create(img)),
      faqs: createProductDto.faqs?.map(faq => this.productFaqRepo.create(faq)),
    });
    return this.productsRepository.save(product);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 10, search } = paginationDto;
    const skip = (page - 1) * limit;

    const where = search ? { name: Like(`%${search}%`) } : {};

    const [data, total] = await this.productsRepository.findAndCount({
      where,
      skip,
      take: limit,
      relations: ['images', 'faqs'],
      order: { createdAt: 'DESC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ 
      where: { id },
      relations: ['images', 'faqs'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    if (updateProductDto.images) {
      await this.productImageRepo.delete({ productId: id });
    }
    
    if (updateProductDto.faqs) {
      await this.productFaqRepo.delete({ productId: id });
    }

    const updatedProduct = this.productsRepository.create({
      ...product,
      ...updateProductDto,
      images: updateProductDto.images?.map(img => this.productImageRepo.create(img)) || product.images,
      faqs: updateProductDto.faqs?.map(faq => this.productFaqRepo.create(faq)) || product.faqs,
    });
    
    return this.productsRepository.save(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.softRemove(product);
  }
}
