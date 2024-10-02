import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

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

@Table({ timestamps: false })
export class CustomCategory extends Model<CustomCategory> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true })
  id: number;

  @Column({ type: DataType.BOOLEAN })
  isShowPhotoWithGoods: boolean;

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
  captionPosition: Position;

  @Column
  color: string;

  @Column
  bgColor: string;

  @Column
  blur: number;

  @Column({ allowNull: true })
  activeImageId: string | null;

  @Column
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
