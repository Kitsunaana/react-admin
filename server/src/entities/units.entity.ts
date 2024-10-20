import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryCharacteristic } from './characteristic.entity';

@Table({ timestamps: false })
export class Unit extends Model<Unit> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  @HasMany(() => CategoryCharacteristic)
  categoryCharacteristics: CategoryCharacteristic[];
}
