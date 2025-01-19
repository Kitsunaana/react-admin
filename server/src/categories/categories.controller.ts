import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { getAllCategoryInput, IGetAllCategoryInput } from './dto/inputs/get-all-category.input';
import { IUpdateCategoryInput, updateCategoryInput } from './dto/inputs/update-category.input';
import { IPostCategoryInput, postCategoryInput } from './dto/inputs/post-category.input';
import { PatchOrderCategoryDto } from './dto/inputs/update-order-category.input';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { CategoryFacade } from './facades/categories.facade';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
    private categoryFacade: CategoryFacade,
  ) {}

  @Get()
  getAll(@Query(new ZodValidationPipe(getAllCategoryInput)) query: IGetAllCategoryInput) {
    return this.categoryService.getAll(query);
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Post()
  async create(@Body(new ZodValidationPipe(postCategoryInput)) dto: IPostCategoryInput) {
    return this.categoryFacade.create(dto);
  }

  @Patch('/:id')
  update(
    @Body(new ZodValidationPipe(updateCategoryInput)) input: IUpdateCategoryInput,
    @Param('id') id: string,
  ) {
    return this.categoryFacade.update(input, id);
  }

  @Patch('/order')
  updateOrder(@Body() dto: PatchOrderCategoryDto) {
    return this.categoryService.updateOrder(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryFacade.delete(id);
  }
}
