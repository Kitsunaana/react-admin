import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { CategoryTag } from './category-tag.entity';

@Table({ timestamps: false })
export class Tag extends Model<Tag> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
  })
  id: string;

  @Column({ unique: true })
  caption: string;

  @HasOne(() => CategoryTag)
  categoryTag: CategoryTag;
}
