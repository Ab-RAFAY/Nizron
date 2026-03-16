import { IsString, IsArray, IsOptional, IsNotEmpty, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceCardDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;
}

export class CreateTechnologyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreatePricingBulletDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreatePricingPlanDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ type: [CreatePricingBulletDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePricingBulletDto)
  bullets?: CreatePricingBulletDto[];
}

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({ type: [CreateServiceCardDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceCardDto)
  serviceCards?: CreateServiceCardDto[];

  @ApiPropertyOptional({ type: [CreateTechnologyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTechnologyDto)
  technologies?: CreateTechnologyDto[];

  @ApiPropertyOptional({ type: [CreatePricingPlanDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePricingPlanDto)
  pricingPlans?: CreatePricingPlanDto[];
}

export class UpdateServiceDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ type: [CreateServiceCardDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateServiceCardDto)
  serviceCards?: CreateServiceCardDto[];

  @ApiPropertyOptional({ type: [CreateTechnologyDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTechnologyDto)
  technologies?: CreateTechnologyDto[];

  @ApiPropertyOptional({ type: [CreatePricingPlanDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePricingPlanDto)
  pricingPlans?: CreatePricingPlanDto[];
}
