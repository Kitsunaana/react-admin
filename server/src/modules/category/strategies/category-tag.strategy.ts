import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryTag } from '../domain/category-tag.entity';
import { v4 as uuidv4 } from 'uuid';
import {
  ITagStrategyImpl,
  IUpdateTagPayload,
  ICreateTagPayload,
} from '../../tag/interfaces/tag.strategy.interface';

@Injectable()
export class CategoryTagStrategy implements ITagStrategyImpl<CategoryTag> {
  public constructor(@InjectModel(CategoryTag) private categoryTagModel: typeof CategoryTag) {}

  public async create(payload: ICreateTagPayload): Promise<CategoryTag> {
    return await this.categoryTagModel
      .create({
        id: uuidv4(),
        tagId: payload.tagId,
        categoryId: payload.ownerId,
        icon: payload.icon,
        color: payload.color,
      })
      .then((data) => data.get({ plain: true }));
  }

  public async update(payload: IUpdateTagPayload): Promise<CategoryTag[]> {
    return await this.categoryTagModel
      .update(
        {
          tagId: payload.tagId,
          categoryId: payload.ownerId,
          icon: payload.icon,
          color: payload.color,
        },
        {
          returning: true,
          where: {
            id: payload.id,
          },
        },
      )
      .then((response) => response[1]);
  }

  public async removeById(id: string): Promise<number> {
    return await this.categoryTagModel.destroy({
      where: {
        id,
      },
    });
  }

  public async removeByOwnerId(ownerId: string): Promise<number> {
    return await this.categoryTagModel.destroy({
      where: {
        categoryId: ownerId,
      },
    });
  }
}
