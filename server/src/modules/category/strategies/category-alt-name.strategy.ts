import {
  IAltNameStrategyImpl,
  ICreateAltNamePayload,
  IUpdateAltNamePayload,
} from '../../alt-name/interfaces/alt-name.strategy.interface';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CategoryAltName } from '../domain/category-alt-name.entity';

export class CategoryAltNameStrategy implements IAltNameStrategyImpl<CategoryAltName> {
  constructor(@InjectModel(CategoryAltName) private altNameCategoryModel: typeof CategoryAltName) {}

  public async create(payload: ICreateAltNamePayload): Promise<CategoryAltName> {
    return await this.altNameCategoryModel.create(
      {
        caption: payload.caption,
        description: payload.description,
        localeId: payload.localeId,
        categoryId: payload.ownerId,
        id: uuidv4(),
      },
      {
        returning: true,
      },
    );
  }

  public async update(payload: IUpdateAltNamePayload): Promise<CategoryAltName[]> {
    return await this.altNameCategoryModel
      .update(
        {
          caption: payload.caption,
          description: payload.description,
          localeId: payload.localeId,
          categoryId: payload.ownerId,
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
    return this.altNameCategoryModel.destroy({
      where: {
        id,
      },
    });
  }

  public async removeByOwnerId(ownerId: string): Promise<number> {
    return this.altNameCategoryModel.destroy({
      where: {
        categoryId: ownerId,
      },
    });
  }
}
