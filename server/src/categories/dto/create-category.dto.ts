import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsString()
  readonly caption: string;

  @IsString()
  readonly description: string;

  @Transform(({ value }) => JSON.parse(value))
  readonly imagesIds: Array<{ id: string; caption: string }>;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  blur: number;

  @Transform(({ value }) => (value === 'null' ? null : value))
  activeImageId: string | null;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isShowPhotoWithGoods: boolean;
}
