import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../entities/category.entity';
import { Media } from '../../entities/media.entity';
import { CustomCategory } from '../../entities/custom-category';
import { Characteristic } from '../../characteristics/domain/characteristic.entity';
import { Unit } from '../../characteristics/domain/units.entity';
import { CategoryAltName } from '../../entities/category-alt-name.entity';
import { CategoryTag } from '../../entities/category-tag.entity';
import { Tag } from '../../tags/domain/tag.entity';
import { Sequelize } from 'sequelize';
import { CategoryGetByIdCommandImpl } from '../interfaces/category-get-by-id.command.interface';
import { Locale } from '../../alt-name/domain/locale.entity';
import { CategoryCharacteristic } from '../../entities/category-characteristic.entity';

@Injectable()
export class CategoryGetByIdCommand implements CategoryGetByIdCommandImpl {
  public constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  public async execute(id: string) {
    return await this.categoryModel.findOne({
      where: { id },
      rejectOnEmpty: false,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [
        [Sequelize.literal(`"media"."order" IS NOT NULL`), 'desc'],
        [Sequelize.col('media.order'), 'desc'],
        [Sequelize.col('media.createdAt'), 'asc'],
      ],
      include: [
        {
          model: Media,
          as: 'media',
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'categoryId'],
          },
        },
        {
          model: CustomCategory,
          attributes: {
            exclude: ['id', 'categoryId'],
          },
        },
        {
          model: CategoryCharacteristic,
          include: [Characteristic, Unit],
          attributes: {
            exclude: ['unitId', 'characteristicId', 'categoryId'],
          },
        },
        {
          model: CategoryAltName,
          include: [Locale],
          attributes: {
            exclude: ['categoryId', 'localeId'],
          },
        },
        {
          model: CategoryTag,
          include: [Tag],
          attributes: {
            exclude: ['tagId', 'categoryId'],
          },
        },
      ],
    });
  }
}
