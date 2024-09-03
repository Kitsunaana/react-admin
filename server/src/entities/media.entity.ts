import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Good } from './good.entity';

@Table
export class Media extends Model<Media> {
  @Column({ unique: true, primaryKey: true, type: DataType.STRING })
  id: string;

  @Column
  filename: string;

  @Column
  originalName: string;

  @Column
  size: number;

  @Column
  mimetype: string;

  @Column
  path: string;

  @Column({ defaultValue: null, allowNull: true })
  order: number;

  @Column
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  category: Category;

  @Column
  @ForeignKey(() => Good)
  goodId: number;

  @BelongsTo(() => Good, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  good: Category;
}
