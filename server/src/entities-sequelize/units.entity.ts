import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Unit extends Model<Unit> {
  @Column({ unique: true, type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  caption: string;
}
