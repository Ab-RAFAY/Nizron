import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';
import { ProductFAQ } from './entities/product-faq.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, ProductFAQ])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
