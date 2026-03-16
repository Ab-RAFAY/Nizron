import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  skillSets: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateMemberDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  about?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skillSets?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;
}
