import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private db: DbService) {}

  createCategory(dto: CreateCategoryDto) {
    return this.db.category.create({ data: dto });
  }

  getAllCategories() {
    return this.db.category.findMany();
  }
}
