import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CustomCategory } from '../../entities/custom-category';
import {
  CategoryCustomRepositoryImpl,
  ICreateCategoryCustomPayload,
  IUpdateCategoryCustomPayload,
} from '../interfaces/category-custom.repository.interface';

@Injectable()
export class CategoryCustomRepository implements CategoryCustomRepositoryImpl {
  public constructor(@InjectModel(CustomCategory) private customEntity: typeof CustomCategory) {}

  public async create(payload: ICreateCategoryCustomPayload, categoryId: string) {
    return await this.customEntity
      .create({
        categoryId,
        id: uuidv4(),
        isShowPhotoWithGoods: payload.isShowPhotoWithGoods,
        bgColor: payload.bgColor,
        color: payload.color,
        blur: payload.blur,
        captionPosition: payload.captionPosition,
        activeImageId: payload.activeImageId,
      })
      .then((custom) => custom.get({ plain: true }));
  }

  public async update(
    payload: IUpdateCategoryCustomPayload,
    categoryId: string,
  ): Promise<CustomCategory[]> {
    return await this.customEntity
      .update(payload, {
        returning: true,
        where: {
          categoryId,
        },
      })
      .then((response) => response[1]);
  }
}
