import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @Column({ nullable: true })
  description: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
