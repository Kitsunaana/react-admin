import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { CustomFilesInterceptor } from '../categories/categories.controller';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FilesService } from '../files/files.service';

export class CreateGoodDto {
  @IsString()
  caption: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  categoryId: number;
}

@Controller('goods')
export class GoodsController {
  constructor(
    private goodsService: GoodsService,
    private filesService: FilesService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(CustomFilesInterceptor.imagesInterceptor())
  async create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: CreateGoodDto) {
    const good = await this.goodsService.create(dto);

    // await this.filesService.saveMedia(files, [], { goodId: good.id });
  }

  @Get()
  async getAll() {
    return await this.goodsService.getAll();
  }
}
