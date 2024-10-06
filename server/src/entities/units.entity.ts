import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CategoryCharacteristic, Characteristic } from './characteristic.entity';

@Table({ timestamps: false })
export class Unit extends Model<Unit> {
  // @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;

  /*@BelongsToMany(() => Characteristic, () => CategoryCharacteristic)
  characteristics: Characteristic[];*/

  @HasMany(() => CategoryCharacteristic)
  categoryCharacteristics: CategoryCharacteristic[];
}
