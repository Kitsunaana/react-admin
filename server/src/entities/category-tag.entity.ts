import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Table({ timestamps: false })
export class CategoryTag extends Model<CategoryTag> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column
  icon: string | null;

  @Column
  tagColor: string;

  @ForeignKey(() => Tag)
  @Column
  tagId: string;

  @BelongsTo(() => Tag)
  tag: Tag;

  @ForeignKey(() => Category)
  @Column
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;
}
