import { CustomCategory } from './custom-category';
import { Category } from './category.entity';
import { Media } from './media.entity';
import { Model, ModelCtor } from 'sequelize-typescript';

export const Models: ModelCtor<Model<any, any>>[] = [CustomCategory, Category, Media];
