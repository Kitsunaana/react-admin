import { DataTypes } from 'sequelize';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { CategoryTag } from './category-tag.entity';
import { CategoryCharacteristic } from './characteristic.entity';
import { CustomCategory } from './custom-category';
import { AltNameCategory, Locale } from './locale.entity';
import { Media } from './media.entity';

interface CategoryCreationAttrs {
  caption: string;
  description: string;
  order: number | null;
  id: string;
}

@Table({ timestamps: true })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description: string;

  @Column
  caption: string;

  @Column({ allowNull: true })
  order: number | null;

  @HasMany(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  media: Media[];

  @HasOne(() => CustomCategory)
  custom: CustomCategory;

  @HasMany(() => CategoryCharacteristic, { foreignKeyConstraint: false, constraints: false })
  categoryCharacteristics: CategoryCharacteristic[];

  @HasMany(() => AltNameCategory)
  altNames: Locale;

  @HasMany(() => CategoryTag)
  tags: CategoryTag[];
}
