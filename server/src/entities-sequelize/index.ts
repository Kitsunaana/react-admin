import { CustomCategory } from './custom-category';
import { Category } from './category.entity';
import { Media } from './media.entity';
import { Model, ModelCtor } from 'sequelize-typescript';
import { CategoryCharacteristic, Characteristic } from './characteristic.entity';
import { Unit } from './units.entity';

export const Models: ModelCtor<Model<any, any>>[] = [
  CustomCategory,
  Category,
  Media,
  Characteristic,
  Unit,
  CategoryCharacteristic,
];