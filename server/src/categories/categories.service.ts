import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities-sequelize/category.entity';

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

  async getAll() {
    return await this.categoryRepository.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: ['createdAt'],
    });
    /* return await this.unstable_categoryRepository.find({
      relations: { images: true },
      select: {
        images: {
          path: true,
          id: true,
        },
      },
    });*/
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
