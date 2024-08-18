import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Unit } from './units.entity';

@Table({ timestamps: false })
export class Characteristic extends Model<Characteristic> {
  @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  caption: string;

  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsToMany(() => Category, () => CategoryCharacteristic)
  categories: Category[];
}

@Table({ timestamps: false })
export class CategoryCharacteristic extends Model<CategoryCharacteristic> {
  @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Characteristic)
  @Column
  characteristicId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @Column
  value: string;
}
