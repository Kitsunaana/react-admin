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
import { IsBoolean, IsBooleanString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FilesService } from '../files/files.service';

export class CreateGoodDto {
  @Transform(({ value }) => JSON.parse(value))
  category: {
    id: number;
    description: string | null;
    caption: string;
    order: number;
  };

  @IsString()
  caption: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsString()
  @IsOptional()
  article: string | null;

  @IsString()
  @IsOptional()
  label: string | null;

  @IsString()
  @IsOptional()
  deliveryTime: string | null;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  notCalculation: boolean | null;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isNew: boolean | null;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isHot: boolean | null;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isConsumable: boolean | null;

  @Transform(({ value }) => JSON.parse(value))
  imagesIds: string | null;
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
    console.log(dto);
    // const good = await this.goodsService.create(dto);

    // await this.filesService.saveMedia(files, [], { goodId: good.id });
  }

  @Get()
  async getAll() {
    return await this.goodsService.getAll();
  }
}
