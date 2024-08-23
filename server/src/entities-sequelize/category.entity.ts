import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Media } from './media.entity';
import { CustomCategory } from './custom-category';
import { CategoryCharacteristic } from './characteristic.entity';
import { AltNameCategory, Locale } from './locale.entity';

interface CategoryCreationAttrs {
  caption: string;
  description: string;
  order?: number;
}

@Table({ timestamps: true })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description: string;

  @Column
  caption: string;

  @Column({ defaultValue: -1, type: DataType.INTEGER })
  order: number;

  @HasMany(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  media: Media[];

  @HasOne(() => CustomCategory)
  custom: CustomCategory;

  @HasMany(() => CategoryCharacteristic)
  characteristics: CategoryCharacteristic[];

  @HasMany(() => AltNameCategory)
  altNames: Locale;
}
