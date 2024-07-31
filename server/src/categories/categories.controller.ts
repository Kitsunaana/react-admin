import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  /*@Post()
  create(@Body() dto: CreateCategoryDto) {
    console.log(dto);
    // return this.categoryService.create(dto);
  }*/

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(@UploadedFiles() files, @Body() body) {
    const { data } = body;
    console.log('Uploaded Files:', files);
    console.log('Data:', data);
    return { message: 'Files uploaded successfully' };
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
