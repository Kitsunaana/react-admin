import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ITagCreationAttrs {
  id: string;
  caption: string;
}

@Table({ timestamps: false })
export class Tag extends Model<Tag, ITagCreationAttrs> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id!: string;

  @Column({ unique: true })
  caption!: string;
}
