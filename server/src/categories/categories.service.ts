import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';
import { TransformedUpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';
import { GetCategoryDto } from './dto/get-category-dto';
import { Op, Sequelize } from 'sequelize';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { Media } from '../entities-sequelize/media.entity';
import { CustomCategory } from '../entities-sequelize/custom-category';

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

  async update(id: number, dto: TransformedUpdateCategoryDto, files: Array<Express.Multer.File>) {
    const values = Object.entries(dto).reduce((prev, [key, value]) => {
      if (!['media'].includes(key)) prev[key] = value;

      return prev;
    }, {});

    console.log(dto);
    await this.filesService.updateOrder(dto.media);
    // await this.filesService.saveMedia(files, id);
    await this.filesService.deleteMedia(dto.media.filter((media) => media.deleted));

    return this.categoryRepository.update(values, { where: { id } });
  }

  async getAll(query: GetCategoryDto) {
    const limit = 25;

    return await this.categoryRepository.findAll({
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
        {
          model: CustomCategory,
        },
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
