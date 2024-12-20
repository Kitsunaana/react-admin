import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryCharacteristic } from './characteristic.entity';

@Table({ timestamps: false })
export class Unit extends Model<Unit> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  @HasMany(() => CategoryCharacteristic)
  categoryCharacteristics: CategoryCharacteristic[];
}
