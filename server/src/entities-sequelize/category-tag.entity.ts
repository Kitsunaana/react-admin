import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Table({ timestamps: false })
export class CategoryTag extends Model<CategoryTag> {
  @Column({ unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  icon: string;

  @Column
  tagColor: string;

  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @BelongsTo(() => Tag)
  tag: Tag;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
