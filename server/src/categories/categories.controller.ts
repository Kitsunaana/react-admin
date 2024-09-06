import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category-dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';
import { FilesService } from '../files/files.service';
import { CharacteristicsService } from '../characteristics/characteristics.service';
import { LocalesService } from '../locales/locales.service';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class CustomFilesInterceptor {
  static imagesInterceptor() {
    return FilesInterceptor('images', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + file.originalname);
        },
      }),
    });
  }
}

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
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(CustomFilesInterceptor.imagesInterceptor())
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: CreateCategoryDto) {
    console.log(dto?.media);
    const category = await this.categoryService.create(dto);

    await this.localesService.create(dto.altNames, category.id);
    await this.characteristicsService.create(dto.items, category);
    if (dto?.media) await this.filesService.saveUploadedMedia(dto.media, category.id);
    await this.filesService.saveMedia(files, dto.imagesIds, { categoryId: category.id });
    await this.tagsService.create(dto.tags, category.id);

    return category;
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

  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(CustomFilesInterceptor.imagesInterceptor())
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UpdateCategoryDto,
  ) {
    const categoryId = (<any>dto).id;

    await this.filesService.updateOrder(dto.media);
    await this.filesService.saveMedia(files, dto.imagesIds, { categoryId });
    if (dto?.media) await this.filesService.saveUploadedMedia(dto.media, id);
    await this.filesService.deleteMedia(dto.media.filter((media) => media.deleted));
    await this.characteristicsService.update(dto.items, id);
    await this.localesService.updateAltNamesCategory(dto.altNames, id);
    await this.tagsService.update(dto.tags, id);

    return this.categoryService.update(id, dto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.tagsService.delete(parseInt(id));
    await this.localesService.delete(parseInt(id));
    await this.characteristicsService.delete(parseInt(id));

    return await this.categoryService.delete(parseInt(id));
  }
}
