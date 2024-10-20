import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { CategoryTag } from '../entities/category-tag.entity';
import { Category } from '../entities/category.entity';
import { CategoryCharacteristic, Characteristic } from '../entities/characteristic.entity';
import { CustomCategory } from '../entities/custom-category';
import { AltNameCategory, Locale } from '../entities/locale.entity';
import { Media } from '../entities/media.entity';
import { Tag } from '../entities/tag.entity';
import { Unit } from '../entities/units.entity';
import { FilesService } from '../files/files.service';
import { GetCategoryDto } from './dto/get-category-dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { CategoryDto } from './types';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(CustomCategory) private customCategoryRepository: typeof CustomCategory,
    private filesService: FilesService,
  ) {}

  async create(dto: CategoryDto.PostCategoryBody) {
    const category = await this.categoryRepository.create({ ...dto, order: null });

    await this.customCategoryRepository.create({
      isShowPhotoWithGoods: dto.isShowPhotoWithGoods,
      bgColor: dto.bgColor,
      color: dto.color,
      blur: dto.blur,
      captionPosition: dto.captionPosition,
      activeImageId: dto.activeImageId as string | null,
      categoryId: category.id,
    });

    return category;
  }

  async update(id: number, dto: Partial<CategoryDto.PatchCategoryBody>) {
    const category = await this.categoryRepository.update(
      {
        order: dto.order,
        caption: dto.caption,
        description: dto.description,
      },
      { where: { id }, returning: false },
    );

    await this.customCategoryRepository.update(dto, {
      where: { categoryId: id },
      returning: false,
    });

    return category;
  }

  async getAllCategories() {
    return await this.categoryRepository.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['order', 'desc']],
    });
  }

  async getAll(query: GetCategoryDto) {
    const limit = 25;

    const count = await this.categoryRepository.count();

    return await this.categoryRepository
      .findAll({
        include: [
          {
            model: Media,
            separate: true,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'goodId', 'categoryId'],
            },
            order: [
              [Sequelize.col('Media.order'), 'desc'],
              [Sequelize.col('Media.createdAt'), 'asc'],
            ],
          },
          {
            model: AltNameCategory,
            attributes: {
              exclude: ['localeId', 'categoryId'],
            },
            include: [Locale],
          },
        ],
        attributes: {
          exclude: ['updatedAt'],
        },
        where: query?.search
          ? {
              [Op.or]: [
                { caption: { [Op.like]: `%${query.search}%` } },
                { description: { [Op.like]: `%${query.search}%` } },
              ],
            }
          : {},
        limit,
        ...(query?.page ? { offset: (query.page - 1) * limit } : {}),
        order: [
          [Sequelize.literal(`"order" IS NOT NULL`), 'desc'],
          ['order', 'desc'],
          ['createdAt', 'asc'],
        ],
      })
      .then((rows) => ({ count, rows }));
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: [{ model: Media }],
      rejectOnEmpty: false,
    });

    await this.filesService.delete(category.media);
    return await category.destroy();
  }

  async getById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      rejectOnEmpty: false,
      include: [
        {
          model: Media,
          as: 'media',
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'categoryId', 'goodId'],
          },
        },
        { model: CustomCategory, attributes: { exclude: ['id', 'categoryId'] } },
        {
          model: CategoryCharacteristic,
          attributes: { exclude: ['unitId', 'characteristicId', 'categoryId'] },
          include: [Characteristic, Unit],
        },
        {
          model: AltNameCategory,
          include: [Locale],
          attributes: { exclude: ['categoryId', 'localeId'] },
        },
        {
          model: CategoryTag,
          include: [Tag],
          attributes: { exclude: ['tagId', 'categoryId'] },
        },
      ],
      order: [
        [Sequelize.literal(`"media"."order" IS NOT NULL`), 'desc'],
        [Sequelize.col('media.order'), 'desc'],
        [Sequelize.col('media.createdAt'), 'asc'],
      ],
    });

    if (category) {
      const { custom, categoryCharacteristics, tags, ...other } = category.toJSON();

      return {
        ...other,
        ...custom,
        characteristics: categoryCharacteristics.map(({ characteristic, unit, ...other }) => ({
          id: other.id,
          caption: characteristic.caption,
          unit: unit ? unit.caption : null,
          value: other.value,
          hideClient: other.hideClient,
        })),
        tags: tags.map(({ tag, ...other }) => ({
          caption: tag.caption,
          color: other.tagColor,
          icon: other.icon,
          id: other.id,
        })),
      };
    }
  }

  async updateOrder(dto: UpdateOrderCategoryDto) {
    return await this.categoryRepository.update(
      { order: dto.order },
      { where: { id: dto.id }, returning: false },
    );
  }
}
