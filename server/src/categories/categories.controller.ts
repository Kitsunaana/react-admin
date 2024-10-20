import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { z } from 'zod';
import { CharacteristicsService } from '../characteristics/characteristics.service';
import { FilesService } from '../files/files.service';
import { LocalesService } from '../locales/locales.service';
import { TagsService } from '../tags/tags.service';
import { ZodValidationPipe } from './../pipes/zod-validation.pipe';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category-dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { CategoryDto, CategorySchemas } from './types';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
    private filesService: FilesService,
    private characteristicsService: CharacteristicsService,
    private localesService: LocalesService,
    private tagsService: TagsService,
  ) {}

  @Post('')
  @UsePipes(new ZodValidationPipe(CategorySchemas.createCategoriesBody))
  async create(@Body() dto: CategoryDto.CategoryCreate) {
    const category = await this.categoryService.create(dto);

    await this.localesService.create(dto.altNames, category.id);

    await this.filesService.create(
      dto.media.filter((media) => !media.deleted),
      category.id,
    );

    await this.characteristicsService.create(dto.characteristics, category.id);
    await this.tagsService.create(dto.tags, category.id);

    return this.categoryService.getById(category.id);
  }

  @Get()
  getAll(@Query() query: GetCategoryDto) {
    return this.categoryService.getAll(query);
  }

  @Get('/all')
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.categoryService.getById(id);
  }

  @Patch('/order')
  updateOrder(@Body() dto: UpdateOrderCategoryDto) {
    return this.categoryService.updateOrder(dto);
  }

  @Patch('/:categoryId')
  async update(
    @Body(new ZodValidationPipe(CategorySchemas.updateCategoryBody))
    dto: CategoryDto.PatchCategoryBody,
    @Param(new ZodValidationPipe(CategorySchemas.updateCategoryParams))
    params: z.infer<typeof CategorySchemas.updateCategoryParams>,
  ) {
    const { categoryId } = params;
    const id = parseInt(categoryId);

    await this.filesService.update(dto.media);
    await this.filesService.create(dto.media, id);
    await this.filesService.delete(dto.media.filter((media) => media?.deleted));

    await this.characteristicsService.update(dto.characteristics, id);
    await this.localesService.update(dto.altNames, id);
    await this.tagsService.update(dto.tags, id);

    await this.categoryService.update(id, dto);

    return await this.categoryService.getById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.tagsService.delete(parseInt(id));
    await this.localesService.delete(parseInt(id));
    await this.characteristicsService.remove(parseInt(id));

    return await this.categoryService.delete(parseInt(id));
  }
}
