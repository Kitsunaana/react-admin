import { Media } from './media.entity';
import { CustomCategory } from '../../modules/category/domain/custom-category';
import { Category } from '../../modules/category/domain/category.entity';
import { Characteristic } from '../../modules/characteristic/domain/characteristic.entity';
import { Unit } from '../../modules/characteristic/domain/units.entity';
import { CategoryCharacteristic } from '../../modules/category/domain/category-characteristic.entity';
import { Locale } from '../../modules/alt-name/domain/locale.entity';
import { CategoryAltName } from '../../modules/category/domain/category-alt-name.entity';
import { Tag } from '../../modules/tag/domain/tag.entity';
import { CategoryTag } from '../../modules/category/domain/category-tag.entity';

export const Models = [
  CustomCategory,
  Category,
  Characteristic,
  Unit,
  CategoryCharacteristic,
  Locale,
  CategoryAltName,
  Tag,
  CategoryTag,
  Media,
];
