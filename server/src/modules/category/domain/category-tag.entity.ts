import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { DataTypes } from 'sequelize';
import { Tag } from '../../tag/domain/tag.entity';

export interface CategoryTagCreationAttrs {
  id: string;
  icon: string | null;
  color: string;
  tagId: string;
  categoryId: string;
}

@Table({ timestamps: false })
export class CategoryTag extends Model<CategoryTag, CategoryTagCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ allowNull: true, type: DataTypes.STRING })
  icon!: string | null;

  @Column
  color!: string;

  @ForeignKey(() => Tag)
  @Column({ unique: false, allowNull: true })
  tagId!: string;

  @BelongsTo(() => Tag, { onDelete: 'CASCADE' })
  tag!: Tag;

  @ForeignKey(() => Category)
  @Column({ unique: false, allowNull: true, onDelete: 'CASCADE' })
  categoryId!: string;

  @BelongsTo(() => Category, { onDelete: 'CASCADE' })
  category!: Category;
}
