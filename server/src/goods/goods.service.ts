import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './goods.controller';
import { InjectModel } from '@nestjs/sequelize';
import { Good } from '../entities/good.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(Good) private goodRepository: typeof Good) {}

  async create(dto: CreateGoodDto) {
    // return await this.goodRepository.create(dto);
  }

  async getAll() {
    return await this.goodRepository.findAll({
      include: { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      attributes: { exclude: ['categoryId'] },
    });
  }
}