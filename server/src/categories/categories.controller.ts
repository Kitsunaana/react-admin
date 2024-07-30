import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    console.log(dto);
    return this.categoryService.create(dto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(parseInt(id));
  }
}
