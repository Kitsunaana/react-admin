import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table({ timestamps: false })
export class Locale extends Model<Locale> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column({ unique: true })
  caption: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  altName: string;
}

@Table({ timestamps: false })
export class AltNameCategory extends Model<AltNameCategory> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column
  caption: string;

  @Column
  description: string;

  @ForeignKey(() => Locale)
  @Column
  localeId: string;

  @BelongsTo(() => Locale)
  locale: Locale;

  @ForeignKey(() => Category)
  @Column
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;
}
