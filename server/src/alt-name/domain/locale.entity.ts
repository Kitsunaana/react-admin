import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface ILocaleCreationAttrs {
  id: string;
  caption: string;
  code: string;
  altName: string;
}

@Table({ timestamps: false })
export class Locale extends Model<Locale, ILocaleCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ unique: true })
  caption!: string;

  @Column({ unique: true })
  code!: string;

  @Column({ unique: true })
  altName!: string;
}
