import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { GetCategoryDto } from './dto/get-category-dto';
import { Op, Sequelize } from 'sequelize';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { Media } from '../entities/media.entity';
import { CustomCategory, Position } from '../entities/custom-category';
import { CategoryCharacteristic, Characteristic } from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import { AltNameCategory, Locale } from '../entities/locale.entity';
import { Tag } from '../entities/tag.entity';
import { CategoryTag } from '../entities/category-tag.entity';
import { CategoryDto } from './types';

export class CreateCategoryDto {
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  captionPosition: Position;
  activeImageId: string;
}

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(CustomCategory) private customCategoryRepository: typeof CustomCategory,
    private filesService: FilesService,
  ) {}

  async create(dto: CategoryDto.PostCategoryBody) {
    const category = await this.categoryRepository.create(dto);

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

  async update(id: number, dto: UpdateCategoryDto) {
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
        order: [['order', 'DESC']],
      })
      .then((rows) => ({ count, rows }));
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: [{ model: Media }],
      rejectOnEmpty: false,
    });

    await this.filesService.deleteMedia(category.media);
    return await category.destroy();
  }

  async getById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'order'],
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
        [Sequelize.col('media.createdAt'), 'desc'],
      ],
    });

    if (category) {
      const { custom, characteristics, tags, ...other } = category.toJSON();

      return {
        ...other,
        ...custom,
        characteristics: characteristics.map(({ characteristic, unit, ...other }) => ({
          ...other,
          characteristic: characteristic.caption,
          unit: unit.caption,
        })),
        tags: tags.map(({ tag, ...other }) => ({
          ...other,
          tag: tag.caption,
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
