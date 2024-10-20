import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './category.entity';
import { Unit } from './units.entity';

@Table({ timestamps: false })
export class Characteristic extends Model<Characteristic> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  @HasMany(() => CategoryCharacteristic, { foreignKeyConstraint: false, constraints: false })
  categoryCharacteristics: CategoryCharacteristic[];
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
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Characteristic)
  @Column({ unique: false, allowNull: true })
  characteristicId: number;

  @BelongsTo(() => Characteristic)
  characteristic: Characteristic;

  @ForeignKey(() => Category)
  @Column({ unique: false, allowNull: true })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Unit)
  @Column({ unique: false, allowNull: true })
  unitId: number;

  @BelongsTo(() => Unit)
  unit: Unit;

  @Column
  value: string;

  @Column({ type: DataType.BOOLEAN })
  hideClient: boolean;
}
