import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @ManyToOne(() => Category, (category) => category.images)
  category: Category;
}
