import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateCategoryDto, files: Array<Express.Multer.File>) {
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
  }

  async getAll() {
    return await this.categoryRepository.find({
      relations: { images: true },
      select: { images: { path: true, id: true } },
    });
  }

  async delete(id: number) {
    return await this.categoryRepository.softRemove({ id });
  }
}
