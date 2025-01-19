import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UnitCreationAttrs {
  id: string;
  caption: string | null;
}

@Table({ timestamps: false })
export class Unit extends Model<Unit, UnitCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  caption!: string | null;
}
