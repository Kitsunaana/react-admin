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
  readonly blur: number;

  @Transform(({ value }) => (value === 'null' ? null : value))
  readonly activeImageId: string | null;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  readonly isShowPhotoWithGoods: boolean;

  @Transform(({ value }) => JSON.parse(value))
  readonly items: {
    caption: string;
    units: null | string;
    value: string;
    hideClient: boolean;
  }[];
}
