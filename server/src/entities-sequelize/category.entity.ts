import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Media } from './media.entity';

interface CategoryCreationAttrs {
  caption: string;
  description: string;
  order?: number;
}

@Table({ timestamps: true })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description: string;

  @Column
  caption: string;

  @Column({ defaultValue: -1, type: DataType.INTEGER })
  order: number;

  @HasMany(() => Media, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  images: Media[];
}
