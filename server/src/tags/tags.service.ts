import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag, TagCreate } from '../entities-sequelize/tag.entity';
import { CategoryTag } from '../entities-sequelize/category-tag.entity';

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

  async update(tags: TagCreateDto[], categoryId: number) {
    await Promise.all(
      tags.map(async (item) => {
        if (item.action === 'create') {
          const [tag] = await this.tagRepository.findOrCreate({
            where: { caption: item.tag.caption },
            defaults: item.tag.caption,
          });

          return await this.categoryTagRepository.create({
            tagId: tag.id,
            categoryId,
            tagColor: item.tagColor,
            icon: item.icon,
          });
        }

        if (item.action === 'update') {
          const tags = await this.categoryTagRepository.findAll({
            include: [{ model: Tag, where: { id: item.tag.id } }],
          });

          let tagId = null;
          if (tags.length === 1) {
            tagId = item.tag.id;
            await this.tagRepository.update(
              { caption: item.tag.caption },
              { where: { id: item.tag.id } },
            );
          } else {
            const tag = await this.tagRepository.create({ caption: item.tag.caption });
            tagId = tag.id;
          }

          await this.categoryTagRepository.update(
            {
              tagId,
              icon: item.icon,
              tagColor: item.tagColor,
            },
            { where: { id: item.id } },
          );
        }

        if (item.action === 'remove') {
          await this.categoryTagRepository.destroy({
            where: { id: item.id },
          });

          const tags = await this.tagRepository.findAll({
            include: [
              {
                model: CategoryTag,
                where: { tagId: item.tag?.id },
              },
            ],
          });

          if (tags.length === 0) {
            await this.tagRepository.destroy({ where: { id: item.tag.id } });
          }
        }
      }),
    );
  }

  async getAll() {
    return this.tagRepository.findAll({ order: [['caption', 'asc']] });
  }
}
