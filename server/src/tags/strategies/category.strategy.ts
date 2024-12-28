import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryTag } from 'src/entities/category-tag.entity';
import { Tag } from 'src/shared/types/types';
import { TagStrategy } from './interface';
import { TagRepository } from '../tag.repository';

@Injectable()
export class CategoryStrategy implements TagStrategy {
  constructor(
    @InjectModel(CategoryTag) private categoryTagRepository: typeof CategoryTag,
    private tagRepository: TagRepository,
  ) { }

  async getAll(): Promise<string[]> {
    return await this.tagRepository.getAll();
  }

  async create(payload: Tag, ownerId: string) {
    const [tag] = await this.tagRepository.upsert(payload);

    await this.categoryTagRepository.create({
      id: payload.id,
      tagId: tag.id,
      icon: payload.icon,
      tagColor: payload.color,
      categoryId: ownerId,
    });
  }

  async update(payload: Tag) {
    const [tag] = await this.tagRepository.upsert(payload);

    await this.categoryTagRepository.update(
      {
        icon: payload.icon,
        tagColor: payload.color,
        tagId: tag.id,
      },
      {
        where: { id: payload.id },
        returning: false,
      },
    );
  }

  async remove({ id }: Tag) {
    await this.categoryTagRepository.destroy({
      where: { id },
    });
  }

  async delete(ownerId: string) {
    await this.categoryTagRepository.destroy({
      where: { categoryId: ownerId },
    });

    await this.tagRepository.removeUnused();
  }
}
