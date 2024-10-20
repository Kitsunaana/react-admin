import { Model, ModelCtor } from 'sequelize-typescript';
import { CategoryTag } from './category-tag.entity';
import { Category } from './category.entity';
import { CategoryCharacteristic, Characteristic } from './characteristic.entity';
import { CustomCategory } from './custom-category';
import { Good } from './good.entity';
import { AltNameCategory, Locale } from './locale.entity';
import { Media } from './media.entity';
import { Tag } from './tag.entity';
import { Unit } from './units.entity';

export const Models: ModelCtor<Model<any, any>>[] = [
  CustomCategory,
  Category,
  Media,
  Characteristic,
  Unit,
  CategoryCharacteristic,
  Locale,
  AltNameCategory,
  Tag,
  CategoryTag,
  Good,
];
