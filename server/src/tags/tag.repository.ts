import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { Tag } from 'src/shared/types/types';
import { v4 as uuidv4 } from 'uuid';
import { Tag as TagEntity } from '../entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(@InjectModel(TagEntity) private tagRepository: typeof TagEntity) {}

  async upsert(tag: Tag) {
    return await this.tagRepository.findOrCreate({
      where: { caption: tag.caption },
      defaults: { caption: tag.caption, id: uuidv4() },
    });
  }

  async removeUnused() {
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

  async getAll() {
    return this.tagRepository
      .findAll({ order: [['caption', 'asc']] })
      .then((tags) => tags.map((tag) => tag.caption));
  }
}
