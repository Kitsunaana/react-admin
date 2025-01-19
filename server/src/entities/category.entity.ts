import { DataTypes } from 'sequelize';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { CategoryTag } from './category-tag.entity';
import { CustomCategory } from './custom-category';
import { CategoryAltName } from './category-alt-name.entity';
import { Media } from './media.entity';
import { Locale } from '../alt-name/domain/locale.entity';
import { CategoryCharacteristic } from './category-characteristic.entity';

export interface CategoryCreationAttrs {
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
  id!: string;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description!: string;

  @Column
  caption!: string;

  @Column({ type: DataTypes.INTEGER })
  order!: number;

  @HasMany(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  media!: Media[];

  @HasOne(() => CustomCategory)
  custom!: CustomCategory;

  @HasMany(() => CategoryCharacteristic, { foreignKeyConstraint: false, constraints: false })
  categoryCharacteristics!: CategoryCharacteristic[];

  @HasMany(() => CategoryAltName)
  altNames!: CategoryAltName[];

  @HasMany(() => CategoryTag)
  tags!: CategoryTag[];
}
