import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CharacteristicsService } from '../characteristics/characteristics.service';
import { FilesService } from '../files/files.service';
import { LocalesService } from '../locales/locales.service';
import { TagsService } from '../tags/tags.service';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { PatchCategoryDto } from './dto/patch-category.dto';
import { PostCategoryDto, postCategorySchema } from './dto/post-category.dto';
import { PatchOrderCategoryDto } from './dto/update-order-category.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(
    private categoryService: CategoriesService,
    private filesService: FilesService,
    private characteristicsService: CharacteristicsService,
    private localesService: LocalesService,
    private tagsService: TagsService,
  ) { }

  @Post('')
  async create(@Body(new ZodValidationPipe(postCategorySchema)) dto: PostCategoryDto) {
    const category = await this.categoryService.create(dto);

    // await this.localesService.create(dto.altNames, category.id);

    // const nonDeletedMedia = dto.media.filter((media) => !media.delete);
    // await this.filesService.create(nonDeletedMedia, category.id);

    await this.characteristicsService.create(dto.characteristics, category.id);

    this.tagsService.setStrategy('CategoryStrategy');
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
  getById(@Param('id') id: string) {
    console.log(id);

    return this.categoryService.getById(id);
  }

  @Patch('/order')
  updateOrder(@Body() dto: PatchOrderCategoryDto) {
    return this.categoryService.updateOrder(dto);
  }

  @Patch('/:categoryId')
  async update(@Body() dto: PatchCategoryDto, @Param('categoryId') id) {
    await this.filesService.update(dto.media);
    await this.filesService.create(dto.media, id);
    await this.filesService.delete(dto.media.filter((media) => media?.delete));

    await this.characteristicsService.update(dto.characteristics, id);
    await this.localesService.update(dto.altNames, id);
    await this.tagsService.update(dto.tags, id);

    await this.categoryService.update(id, dto);

    return await this.categoryService.getById(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.tagsService.delete(id);
    await this.localesService.delete(id);
    await this.characteristicsService.remove(id);

    return await this.categoryService.delete(id);
  }
}
