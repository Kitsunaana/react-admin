import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
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
  async create(@Body() dto: CreateGoodDto) {
    // const good = await this.goodsService.create(dto);
    // await this.filesService.saveMedia(files, [], { goodId: good.id });
  }

  @Get('/:id')
  async getById(@Param() params: { id: string }) {
    const id = parseInt(params.id);

    return await this.goodsService.getById(id);
  }

  @Get()
  async getAll() {
    return await this.goodsService.getAll();
  }
}
