import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  getAll() {
    return this.categoryService.getAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.categoryService.delete(parseInt(id));
  }
}
