import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag, TagCreate } from '../entities/tag.entity';
import { CategoryTag } from '../entities/category-tag.entity';
import { CategoryDto } from '../categories/types';

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

  async findOrCreateTag({ caption }: CategoryDto.TagCreate) {
    return await this.tagRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async createCategoryTag(payload: CategoryDto.TagCreate, categoryId: number) {
    const [tag] = await this.findOrCreateTag(payload);

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

  async updateCategoryTag(payload: CategoryDto.TagCreate) {
    const { caption, icon, color, id } = payload;

    const tags = await this.categoryTagRepository.findAll({
      include: [{ model: Tag, where: { caption } }],
    });

    let tagId = null;
    if (tags.length === 1) {
      await this.tagRepository.update(
        { caption: caption },
        { where: { caption }, returning: false },
      );

      const findTag = await this.tagRepository.findOne({
        where: { caption },
        rejectOnEmpty: false,
      });

      tagId = findTag.id;
    } else {
      const newTag = await this.tagRepository.create({ caption });
      tagId = newTag.id;
    }

    return await this.categoryTagRepository.update(
      { tagId, icon, tagColor: color },
      { where: { id }, returning: false },
    );
  }

  async destroyCategoryTag(payload: CategoryDto.TagCreate) {
    const { id, caption } = payload;

    const findTag = await this.tagRepository.findOne({
      where: { caption },
      rejectOnEmpty: true,
    });

    await this.categoryTagRepository.destroy({
      where: { id },
    });

    const tags = await this.tagRepository.findAll({
      include: [
        {
          model: CategoryTag,
          where: { tagId: findTag.id },
        },
      ],
    });

    if (tags.length === 0) await this.tagRepository.destroy({ where: { id: findTag.id } });
  }

  async update(tags: CategoryDto.TagCreate[], categoryId: number) {
    await Promise.all(
      tags.map(async (item) => {
        if (item.action === 'create') return this.createCategoryTag(item, categoryId);
        if (item.action === 'update') return await this.updateCategoryTag(item);
        if (item.action === 'remove') return await this.destroyCategoryTag(item);
      }),
    );
  }

  async getAll() {
    return this.tagRepository.findAll({ order: [['caption', 'asc']] });
  }

  async delete(categoryId: number) {
    const allTags = await this.tagRepository.findAll({
      include: [{ model: CategoryTag, where: { categoryId } }],
    });

    await Promise.all(allTags.map(async (tag) => await tag.destroy()));
  }
}
