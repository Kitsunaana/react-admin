import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly caption: string;

  @IsString()
  readonly description: string;
}
