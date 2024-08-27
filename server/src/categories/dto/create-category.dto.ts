import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagCreate } from '../../entities-sequelize/tag.entity';

export class CreateCategoryDto {
  @IsString()
  readonly caption: string;

  @IsString()
  readonly description: string;

  @Transform(({ value }) => JSON.parse(value))
  readonly imagesIds: Array<{ id: string; caption: string }>;

  order: number | null;

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
    unit: string | null;
    value: string;
    hideClient: boolean;
  }[];

  @Transform(({ value }) => JSON.parse(value))
  readonly tags: ({
    id: number;
    action?: 'create' | 'update' | 'remove';
  } & TagCreate)[];

  @Transform(({ value }) => JSON.parse(value))
  readonly altNames: {
    id?: number;
    caption: string;
    description: string | null;
    action?: 'create' | 'update' | 'remove';
    locale: {
      id: number;
      code: string;
      caption: string;
      altName: string;
    };
  }[];
}
