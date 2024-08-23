import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';

@Table({ timestamps: false })
export class Locale extends Model<Locale> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ unique: true })
  caption: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  altName: string;
}

@Table({ timestamps: false })
export class AltNameCategory extends Model<AltNameCategory> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  caption: string;

  @ForeignKey(() => Locale)
  @Column
  localeId: number;

  @BelongsTo(() => Locale)
  locale: Locale;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}
