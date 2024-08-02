import { Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Media } from './media.entity';

interface CategoryCreationAttrs {
  caption: string;
  description: string;
}

@Table({ timestamps: true })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description: string;

  @Column
  caption: string;

  @HasMany(() => Media)
  images: Media[];
}
