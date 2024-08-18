import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Characteristic } from './characteristic.entity';

@Table
export class Unit extends Model<Unit> {
  @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  caption: string;

  @HasMany(() => Characteristic)
  characteristics: Characteristic[];
}
