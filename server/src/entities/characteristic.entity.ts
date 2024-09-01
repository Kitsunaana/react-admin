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

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  @BelongsToMany(() => Category, () => CategoryCharacteristic)
  categories: Array<Category & { CategoryCharacteristic: CategoryCharacteristic }>;
}

export class CategoryCharacteristicCreate {
  characteristicId: number;
  categoryId: number;
  unitId: number;
  value: string;
  hideClient: boolean;
}

export class CategoryCharacteristicUpdate {
  id: number;
  characteristicId: number;
  categoryId: number;
  unitId: number;
  value: string;
  hideClient: boolean;
}

@Table({ timestamps: false })
export class CategoryCharacteristic extends Model<
  CategoryCharacteristic,
  CategoryCharacteristicCreate
> {
  @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Characteristic)
  @Column
  characteristicId: number;

  @BelongsTo(() => Characteristic)
  characteristic: Characteristic;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Unit)
  @Column
  unitId: number;

  @BelongsTo(() => Unit)
  unit: Unit;

  @Column
  value: string;

  @Column({ type: DataType.BOOLEAN })
  hideClient: boolean;
}
