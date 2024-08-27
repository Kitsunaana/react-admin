import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { CategoryTag } from './category-tag.entity';

export class TagCreate {
  tag: { caption: string; id?: number };
  icon: string;
  tagColor: string;
  categoryId: number;
}

@Table({ timestamps: false })
export class Tag extends Model<Tag> {
  @Column({ unique: true, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  caption: string;

  @HasOne(() => CategoryTag)
  categoryTag: CategoryTag;
}
