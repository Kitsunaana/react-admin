import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag, TagCreate } from '../entities/tag.entity';
import { CategoryTag } from '../entities/category-tag.entity';

class TagCreateDto extends TagCreate {
  id: number;
  action?: 'create' | 'update' | 'remove';
}

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag) private tagRepository: typeof Tag,
    @InjectModel(CategoryTag) private categoryTagRepository: typeof CategoryTag,
  ) {}

  async findOrCreateTag({ caption }: TagCreate['tag']) {
    return await this.tagRepository.findOrCreate({
      where: { caption },
      defaults: { caption },
    });
  }

  async createCategoryTag(data: TagCreateDto, categoryId: number) {
    const [tag] = await this.findOrCreateTag(data.tag);

    return await this.categoryTagRepository.create({
      tagId: tag.id,
      icon: data.icon,
      tagColor: data.tagColor,
      categoryId,
    });
  }

  async create(tags: TagCreateDto[], categoryId: number) {
    await Promise.all(tags.map(async (item) => await this.createCategoryTag(item, categoryId)));
  }

  async updateCategoryTag({ tag, icon, tagColor, id }: TagCreateDto) {
    const tags = await this.categoryTagRepository.findAll({
      include: [{ model: Tag, where: { id } }],
    });

    let tagId = null;
    if (tags.length === 1) {
      tagId = id;
      await this.tagRepository.update({ caption: tag.caption }, { where: { id: tagId } });
    } else {
      const newTag = await this.tagRepository.create({ caption: tag.caption });
      tagId = newTag.id;
    }

    return await this.categoryTagRepository.update({ tagId, icon, tagColor }, { where: { id } });
  }

  async destroyCategoryTag({ id, tag }: TagCreateDto) {
    await this.categoryTagRepository.destroy({
      where: { id },
    });

    const tags = await this.tagRepository.findAll({
      include: [
        {
          model: CategoryTag,
          where: { tagId: tag?.id },
        },
      ],
    });

    if (tags.length === 0) await this.tagRepository.destroy({ where: { id: tag.id } });
  }

  async update(tags: TagCreateDto[], categoryId: number) {
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
