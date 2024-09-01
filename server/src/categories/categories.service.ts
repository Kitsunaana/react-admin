import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { GetCategoryDto } from './dto/get-category-dto';
import sequelize, { Op, Sequelize } from 'sequelize';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { Media } from '../entities/media.entity';
import { CustomCategory } from '../entities/custom-category';
import { CategoryCharacteristic, Characteristic } from '../entities/characteristic.entity';
import { Unit } from '../entities/units.entity';
import { AltNameCategory, Locale } from '../entities/locale.entity';
import { Tag } from '../entities/tag.entity';
import { CategoryTag } from '../entities/category-tag.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    @InjectModel(CustomCategory) private customCategoryRepository: typeof CustomCategory,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(dto);
    const customCategory = await this.customCategoryRepository.create(dto);

    await category.$set('custom', customCategory);

    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.categoryRepository.update(
      {
        order: dto.order,
        caption: dto.caption,
        description: dto.description,
      },
      { where: { id } },
    );
    await this.customCategoryRepository.update(dto, {
      where: { categoryId: id },
    });
  }

  async getAll(query: GetCategoryDto) {
    const limit = 25;

    return await this.categoryRepository.findAndCountAll({
      include: [
        {
          model: Media,
          separate: true,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'mimetype', 'size', 'categoryId'],
          },
          order: [
            [Sequelize.col('Media.order'), 'desc'],
            [Sequelize.col('Media.createdAt'), 'asc'],
          ],
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
    });
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      include: [{ model: Media }],
    });

    await this.filesService.deleteMedia(category.media);
    return await category.destroy();
  }

  async getById(id: number) {
    return await this.categoryRepository.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Media,
          as: 'media',
          attributes: ['id', 'order', 'originalName', 'path'],
        },
        { model: CustomCategory },
        { model: CategoryCharacteristic, include: [Characteristic, Unit] },
        { model: AltNameCategory, include: [Locale] },
        { model: CategoryTag, include: [Tag], attributes: { exclude: ['tagId', 'categoryId'] } },
      ],
      order: [
        [Sequelize.literal(`"media"."order" IS NOT NULL`), 'desc'],
        [Sequelize.col('media.order'), 'desc'],
        [Sequelize.col('media.createdAt'), 'desc'],
      ],
    });
  }

  async updateOrder(dto: UpdateOrderCategoryDto) {
    return await this.categoryRepository.update({ order: dto.order }, { where: { id: dto.id } });
  }
}
