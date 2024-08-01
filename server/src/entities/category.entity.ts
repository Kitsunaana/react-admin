import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from './media.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  caption: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Media, (media) => media.category, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  images: Media[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
