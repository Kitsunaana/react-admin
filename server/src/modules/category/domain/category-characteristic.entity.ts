import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { DataTypes } from 'sequelize';
import { Characteristic } from '../../characteristic/domain/characteristic.entity';
import { Unit } from '../../characteristic/domain/units.entity';

export interface CategoryCharacteristicCreationAttrs {
  id: string;
  characteristicId: string;
  categoryId: string;
  unitId: string | null;
  value: string;
  hideClient: boolean;
}

@Table({ timestamps: false })
export class CategoryCharacteristic extends Model<
  CategoryCharacteristic,
  CategoryCharacteristicCreationAttrs
> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @ForeignKey(() => Characteristic)
  @Column({ unique: false, allowNull: true })
  characteristicId!: string;

  @BelongsTo(() => Characteristic, { onDelete: 'CASCADE' })
  characteristic!: Characteristic;

  @ForeignKey(() => Category)
  @Column({ unique: false, allowNull: true })
  categoryId!: string;

  @BelongsTo(() => Category, { onDelete: 'CASCADE' })
  category!: Category;

  @ForeignKey(() => Unit)
  @Column({ unique: false, allowNull: true, type: DataTypes.STRING })
  unitId!: string | null;

  @BelongsTo(() => Unit, { onDelete: 'CASCADE' })
  unit!: Unit;

  @Column
  value!: string;

  @Column({ type: DataType.BOOLEAN })
  hideClient!: boolean;
}
