import { CreateCategoryDto } from './create-category.dto';
import { Media } from '../../entities-sequelize/media.entity';
import { Transform } from 'class-transformer';
import { CustomCategory } from '../../entities-sequelize/custom-category';

class TransformedMedia extends Media {
  deleted: boolean;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @Transform(({ value }) => JSON.parse(value))
  readonly media: TransformedMedia[];

  @Transform(({ value }) => JSON.parse(value))
  custom: CustomCategory;
}

class CustomMedia extends Media {
  deleted?: boolean;
}

export class TransformedUpdateCategoryDto extends CreateCategoryDto {
  readonly media: CustomMedia[];
}
