import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { CategoryDto } from '../categories/types';
import { CategoryTag } from '../entities/category-tag.entity';
import { Tag, TagCreate } from '../entities/tag.entity';

export class TagCreateDto extends TagCreate {
  id: number;
  action?: 'create' | 'update' | 'remove';
}

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private tagRepository: typeof Tag,
    @InjectModel(CategoryTag) private categoryTagRepository: typeof CategoryTag,
  ) {}

  async findOrCreateTag(caption: string) {
    return await this.tagRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async createCategoryTag(payload: CategoryDto.TagCreate, categoryId: number) {
    const [tag] = await this.findOrCreateTag(payload.caption);

    return await this.categoryTagRepository.create({
      tagId: tag.id,
      icon: payload.icon,
      tagColor: payload.color,
      categoryId,
    });
  }

  async create(tags: CategoryDto.TagCreate[], categoryId: number) {
    await Promise.all(tags.map(async (item) => await this.createCategoryTag(item, categoryId)));
  }

  async removeUnusedTags() {
    await this.tagRepository.destroy({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`(
            SELECT "tagId" FROM "CategoryTags"
            GROUP BY "tagId"
          )`),
        },
      },
    });
  }

  async updateCategoryTag(payload: CategoryDto.TagCreate) {
    const [tag] = await this.tagRepository.findOrCreate({
      where: { caption: payload.caption },
      defaults: { caption: payload.caption },
    });

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

  async destroyCategoryTag({ id }: CategoryDto.TagCreate) {
    await this.categoryTagRepository.destroy({ where: { id } });
  }

  async update(tags: CategoryDto.TagCreate[], categoryId: number) {
    const actions = {
      create: this.createCategoryTag,
      update: this.updateCategoryTag,
      remove: this.destroyCategoryTag,
    };

    await Promise.all(
      tags.map(async (item) => actions[item.action]?.bind(this, item, categoryId)()),
    );

    await this.removeUnusedTags();
  }

  async getAll() {
    return this.tagRepository
      .findAll({ order: [['caption', 'asc']] })
      .then((tags) => tags.map((tag) => tag.caption));
  }

  async delete(categoryId: number) {
    await this.categoryTagRepository.destroy({ where: { categoryId } });

    await this.removeUnusedTags();
  }
}
