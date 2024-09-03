import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table({ timestamps: false })
export class Good extends Model<Good> {
  @Column({ primaryKey: true, unique: true, autoIncrement: true })
  id: number;

  @Column
  caption: string;

  @Column
  description: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
