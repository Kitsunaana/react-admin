import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagCreate } from '../../entities/tag.entity';
import { CustomCategory, Position } from '../../entities/custom-category';
import { Media } from '../../entities/media.entity';

export class CreateCategoryDto {
  @IsString()
  readonly caption: string;

  @IsString()
  readonly description: string;

  @Transform(({ value }) => JSON.parse(value))
  readonly imagesIds: Array<{ id: string; caption: string }>;

  @Transform(({ value }) => JSON.parse(value))
  media: Array<Media & { deleted?: boolean }>;

  order: number | null;

  @Transform(({ value }) => value === 'true')
  readonly isShowPhotoWithGoods: boolean;

  readonly bgColor: string;

  readonly color: string;

  @Transform(({ value }) => parseInt(value))
  readonly blur: number;

  readonly captionPosition: Position;

  readonly activeImageId: string;

  @Transform(({ value }) => JSON.parse(value))
  readonly characteristics: {
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
