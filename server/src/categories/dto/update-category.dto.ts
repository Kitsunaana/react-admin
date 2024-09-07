import { CreateCategoryDto } from './create-category.dto';
import { Media } from '../../entities/media.entity';
import { CustomCategory } from '../../entities/custom-category';

export class UpdateCategoryDto extends CreateCategoryDto {
  readonly media: (Media & { deleted: boolean })[];

  custom: CustomCategory;

  readonly characteristics: {
    caption: string;
    unit: string | null;
    value: string;
    hideClient: boolean;
    action: 'update' | 'create' | 'remove';
    id?: number;
    deleted?: boolean;
  }[];
}
