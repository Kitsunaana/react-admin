import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { DataTypes } from 'sequelize';

export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center-center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface CustomCategoryCreationAttrs {
  id: string;
  isShowPhotoWithGoods: boolean;
  captionPosition: Position;
  color: string;
  bgColor: string;
  blur: number;
  activeImageId: string | null;
  categoryId: string;
}

@Table({ timestamps: false })
export class CustomCategory extends Model<CustomCategory, CustomCategoryCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ type: DataType.BOOLEAN })
  isShowPhotoWithGoods!: boolean;

  @Column({
    type: DataType.ENUM(
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ),
  })
  captionPosition!: Position;

  @Column
  color!: string;

  @Column
  bgColor!: string;

  @Column
  blur!: number;

  @Column({ allowNull: true, type: DataTypes.STRING })
  activeImageId!: string | null;

  @Column
  @ForeignKey(() => Category)
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;
}
