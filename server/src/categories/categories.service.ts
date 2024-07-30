import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async create(dto: CreateCategoryDto) {
    return await this.categoryRepository.save(dto);
  }

  async getAll() {
    return await this.categoryRepository.find();
  }

  async delete(id: number) {
    return await this.categoryRepository.softRemove({ id });
  }
}
