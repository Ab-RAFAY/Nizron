import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFAQDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  questionTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class UpdateFAQDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  questionTitle?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  answer?: string;
}
