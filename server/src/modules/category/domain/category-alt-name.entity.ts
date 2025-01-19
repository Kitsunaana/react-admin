import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Locale } from '../../alt-name/domain/locale.entity';

export interface AltNameCategoryCreationAttrs {
  id: string;
  caption: string;
  description: string;
  localeId: string;
  categoryId: string;
}

@Table({ timestamps: false })
export class CategoryAltName extends Model<CategoryAltName, AltNameCategoryCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column
  caption!: string;

  @Column
  description!: string;

  @ForeignKey(() => Locale)
  @Column
  localeId!: string;

  @BelongsTo(() => Locale)
  locale!: Locale;

  @ForeignKey(() => Category)
  @Column
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;
}
