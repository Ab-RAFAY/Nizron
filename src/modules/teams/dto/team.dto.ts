import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  skillSet: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateTeamDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  designation?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skillSet?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;
}
