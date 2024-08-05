import {
  ArgumentMetadata,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  PipeTransform,
  Post,
  Query,
  Search,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryDto } from './dto/get-category-dto';
import { UpdateOrderCategoryDto } from './dto/update-order-category.dto';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private fromJsonToObject: string) {}

  async transform(value: any) {
    if (!value?.[this.fromJsonToObject]) return value;

    try {
      const parsed = JSON.parse(value[this.fromJsonToObject]);
      return { ...value, [this.fromJsonToObject]: parsed };
    } catch (error) {
      throw new BadRequestException(`${this.fromJsonToObject} is not valid json`);
    }
  }
}

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post('')
  @UseInterceptors(
    FilesInterceptor('images', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // 1_000_000_000
          callback(null, uniqueSuffix + file.originalname);
        },
      }),
    }),
  )
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto, files);
  }

  @Get()
  getAll(@Query() query: GetCategoryDto) {
    return this.categoryService.getAll(query);
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
  @UseInterceptors(
    FilesInterceptor('images', 100, {
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // 1_000_000_000
          callback(null, uniqueSuffix + file.originalname);
        },
      }),
    }),
  )
  update(
    @Param('id') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body(new ValidationPipe('media')) dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, dto as any, files);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(parseInt(id));
  }
}
