import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table
export class Media extends Model<Media> {
  @Column({ unique: true, autoIncrement: true, primaryKey: true, type: DataType.INTEGER })
  id: number;

  @Column
  filename: string;

  @Column
  size: number;

  @Column
  mimetype: string;

  @Column
  path: string;

  @Column
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  category: Category;
}
