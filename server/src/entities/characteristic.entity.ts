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
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  @HasMany(() => CategoryCharacteristic, { foreignKeyConstraint: false, constraints: false })
  categoryCharacteristics: CategoryCharacteristic[];
}

@Table({ timestamps: false })
export class CategoryCharacteristic extends Model<CategoryCharacteristic> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @ForeignKey(() => Characteristic)
  @Column({ unique: false, allowNull: true })
  characteristicId: string;

  @BelongsTo(() => Characteristic)
  characteristic: Characteristic;

  @ForeignKey(() => Category)
  @Column({ unique: false, allowNull: true })
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Unit)
  @Column({ unique: false, allowNull: true })
  unitId: string;

  @BelongsTo(() => Unit)
  unit: Unit;

  @Column
  value: string;

  @Column({ type: DataType.BOOLEAN })
  hideClient: boolean;
}
