import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table
export class Media extends Model<Media> {
  @Column
  filename: string;

  @Column
  size: string;

  @Column
  mimetype: string;

  @Column
  path: string;

  @Column
  @ForeignKey(() => Category)
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
