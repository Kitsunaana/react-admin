import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../entities/category.entity';
import { Media } from '../../entities/media.entity';
import { Op, Sequelize } from 'sequelize';
import { CategoryAltName } from '../../entities/category-alt-name.entity';
import { CategoryGetAllCommandImpl } from '../interfaces/category-get-all.command.interface';
import { Locale } from '../../alt-name/domain/locale.entity';
import { IGetAllCategoryParams } from '../interfaces/category.repository.interface';

@Injectable()
export class CategoryGetAllCommand implements CategoryGetAllCommandImpl {
  public constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  public async execute(query: IGetAllCategoryParams): Promise<Category[]> {
    return await this.categoryModel.findAll({
      attributes: {
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: Media,
          separate: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'categoryId'],
          },
          order: [
            [Sequelize.col('Media.order'), 'desc'],
            [Sequelize.col('Media.createdAt'), 'asc'],
          ],
        },
        {
          model: CategoryAltName,
          include: [Locale],
          attributes: {
            exclude: ['localeId', 'categoryId'],
          },
        },
      ],
      order: [
        [Sequelize.literal(`"order" IS NOT NULL`), 'desc'],
        ['order', 'desc'],
        ['createdAt', 'asc'],
      ],
      where: this.getWhereConditionQuery(query.search),
      offset: this.getOffsetQuery(query.limit, query.page),
      limit: query.limit,
    });
  }

  private getWhereConditionQuery(search?: string) {
    if (!search) return {};

    return {
      [Op.or]: [
        { caption: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    };
  }

  private getOffsetQuery(limit: number, page?: number) {
    if (!page) return 0;
    return (page - 1) * limit;
  }
}
