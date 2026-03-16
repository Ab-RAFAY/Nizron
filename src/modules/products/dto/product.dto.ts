import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductImageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;
}

export class CreateProductFAQDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productUsePdf?: string;

  @ApiPropertyOptional({ type: [CreateProductImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @ApiPropertyOptional({ type: [CreateProductFAQDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductFAQDto)
  faqs?: CreateProductFAQDto[];
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  productUsePdf?: string;

  @ApiPropertyOptional({ type: [CreateProductImageDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @ApiPropertyOptional({ type: [CreateProductFAQDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductFAQDto)
  faqs?: CreateProductFAQDto[];
}
