import { Transform } from 'class-transformer';

export class DeleteCategoryDto {
  @Transform(({ value }) => parseInt(value))
  readonly id: number;
}
