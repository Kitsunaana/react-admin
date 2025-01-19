import { CategoryTag } from './category-tag.entity';
import { Category } from './category.entity';
import { Characteristic } from '../characteristics/domain/characteristic.entity';
import { CustomCategory } from './custom-category';
import { CategoryAltName } from './category-alt-name.entity';
import { Media } from './media.entity';
import { Tag } from '../tags/domain/tag.entity';
import { Unit } from '../characteristics/domain/units.entity';
import { Locale } from '../alt-name/domain/locale.entity';
import { CategoryCharacteristic } from './category-characteristic.entity';

export const Models = [
  CustomCategory,
  Category,
  Media,
  Characteristic,
  Unit,
  CategoryCharacteristic,
  Locale,
  CategoryAltName,
  Tag,
  CategoryTag,
];
