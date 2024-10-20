import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../entities/category.entity';
import { Good } from '../entities/good.entity';
import { CreateGoodDto } from './goods.controller';

@Injectable()
export class GoodsService {
  constructor(@InjectModel(Good) private goodRepository: typeof Good) {}

  async create(dto: CreateGoodDto) {
    return await this.goodRepository.create({
      categoryId: dto.category.id,
      caption: dto.caption,
      description: dto.description,
    });
  }

  async getAll() {
    return await this.goodRepository.findAll({
      include: { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      attributes: { exclude: ['categoryId'] },
    });
  }

  async getById(id: number) {
    return await this.goodRepository.findOne({
      where: { id },
      rejectOnEmpty: false,
      include: [{ model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
    });
  }
}
