import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../domain/tag.entity';
import { ITag } from '../domain/tag.type';
import { ITagRepositoryImpl } from '../interfaces/tag.repository.interface';

@Injectable()
export class TagRepository implements ITagRepositoryImpl {
  public constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  public async getAll(): Promise<Tag[]> {
    return this.tagRepository.findAll({
      order: [['caption', 'asc']],
    });
  }

  public async upsert(payload: ITag): Promise<[Tag, boolean]> {
    return await this.tagRepository.findOrCreate({
      returning: true,
      where: {
        caption: payload.caption,
      },
      defaults: {
        id: uuidv4(),
        caption: payload.caption,
      },
    });
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
