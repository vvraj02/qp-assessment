import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchingDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  readonly key: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  readonly value: string;
}

export class GetGroceryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  readonly page: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  readonly per_page: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly order_by: string;

  @ApiPropertyOptional({ type: [SearchingDto] })
  @IsOptional()
  readonly search: [SearchingDto];
}
