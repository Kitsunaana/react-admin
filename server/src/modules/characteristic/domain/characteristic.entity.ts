import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface CharacteristicCreationAttrs {
  id: string;
  caption: string;
}

@Table({ timestamps: false })
export class Characteristic extends Model<Characteristic, CharacteristicCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ type: DataType.STRING, unique: true })
  caption!: string;
}
