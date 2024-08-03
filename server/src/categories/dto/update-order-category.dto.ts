import { IsNumber } from 'class-validator';

export class UpdateOrderCategoryDto {
  @IsNumber()
  readonly order: number;

  @IsNumber()
  readonly id: number;
}
