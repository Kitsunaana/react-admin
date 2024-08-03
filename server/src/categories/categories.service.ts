import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';
import { GetCategoryDto } from './dto/get-category-dto';
import { Op } from 'sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category) private categoryRepository: typeof Category,
    private filesService: FilesService,
  ) {}

  /*async create(dto: CreateCategoryDto, files: Array<Express.Multer.File>) {
    const category = await this.categoryRepository.save(dto);

    await this.filesService.saveMedia(files, category);

    return await this.categoryRepository.findOne({
      where: { id: category.id },
      relations: { images: true },
      select: {
        images: {
          path: true,
          id: true,
        },
      },
    });
  }*/

  async create(dto: CreateCategoryDto, files: Array<Express.Multer.File>) {
    return this.categoryRepository.create(dto);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return this.categoryRepository.update(dto, { where: { id } });
  }

  async getAll(query: GetCategoryDto) {
    return await this.categoryRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: query?.search
        ? {
            [Op.or]: [
              { caption: { [Op.like]: `%${query.search}%` } },
              { description: { [Op.like]: `%${query.search}%` } },
            ],
          }
        : {},
      order: ['createdAt'],
      limit: 2,
      ...(query?.page
        ? {
            offset: (query.page - 1) * 2,
          }
        : {}),
    });
  }

  async delete(id: number) {
    // return await this.unstable_categoryRepository.softRemove({ id });
  }

  async getById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
    /*return await this.unstable_categoryRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
      select: {
        images: {
          path: true,
          id: true,
        },
      },
    });*/
  }
}
