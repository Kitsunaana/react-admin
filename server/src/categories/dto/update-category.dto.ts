import { CreateCategoryDto } from './create-category.dto';
import { Media } from '../../entities/media.entity';

export class UpdateCategoryDto extends CreateCategoryDto {
  readonly media: (Media & { deleted: boolean })[];

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
