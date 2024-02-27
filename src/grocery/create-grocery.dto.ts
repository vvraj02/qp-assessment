/* eslint-disable prettier/prettier */
import {
  IsOptional,
  IsNumber,
  Min,
  IsString,
  IsDecimal,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Decimal128 } from "typeorm";

export class CreateGroceryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => String)
  readonly name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Decimal128)
  readonly price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Type(() => Number)
  readonly quantity: number;
}
