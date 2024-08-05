import { CreateCategoryDto } from './create-category.dto';
import { Media } from '../../entities-sequelize/media.entity';

export class UpdateCategoryDto extends CreateCategoryDto {
  readonly media: string;
}

class CustomMedia extends Media {
  deleted?: boolean;
}

export class TransformedUpdateCategoryDto extends CreateCategoryDto {
  readonly media: CustomMedia[];
}
