import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from '../../modules/category/domain/category.entity';

export interface MediaCreationAttrs {
  id: string;
  caption: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
  order: number;
  categoryId: string;
}

@Table
export class Media extends Model<Media, MediaCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column
  caption!: string;

  @Column
  originalName!: string;

  @Column
  size!: number;

  @Column
  mimetype!: string;

  @Column
  path!: string;

  @Column({ defaultValue: 0 })
  order!: number;

  @Column
  @ForeignKey(() => Category)
  categoryId!: string;

  @BelongsTo(() => Category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  category!: Category;
}
