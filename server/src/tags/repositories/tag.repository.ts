import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../domain/tag.entity';
import { ITagRepositoryImpl } from '../interfaces/tag.repository.interface';

@Injectable()
export class TagRepository implements ITagRepositoryImpl {
  public constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  public async getAll(): Promise<Tag[]> {
    return this.tagRepository.findAll({
      order: [['caption', 'asc']],
    });
  }

  public async upsert(caption: string): Promise<Tag> {
    return await this.tagRepository
      .findOrCreate({
        returning: true,
        where: {
          caption,
        },
        defaults: {
          id: uuidv4(),
          caption,
        },
      })
      .then((tag) => tag[0]);
  }

  public async removeUnused(): Promise<number> {
    return await this.tagRepository.destroy({
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
}
