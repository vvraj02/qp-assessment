import { IsNumber, IsArray, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';


export class OrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  readonly id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  readonly quantity: number;
}


export class OrderBoksDto {

  @ApiProperty({ type: [OrderDto] })
  @IsArray()
  readonly orderList: OrderDto[];

}
