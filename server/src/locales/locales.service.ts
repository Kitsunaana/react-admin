import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AltNameCategory, Locale } from '../entities/locale.entity';
import { CreateAltNameCategoryDto } from './dto/create-alt-name-category-dto';

@Injectable()
export class LocalesService {
  constructor(
    @InjectModel(Locale) private localesRepository: typeof Locale,
    @InjectModel(AltNameCategory) private altNameCategoryRepository: typeof AltNameCategory,
  ) {}

  async getAll() {
    return await this.localesRepository.findAll({ order: [['caption', 'asc']] });
  }

  async delete(categoryId: number) {
    return await this.altNameCategoryRepository.destroy({
      where: { categoryId: categoryId },
    });
  }

  async destroyAltName(id: number) {
    return await this.altNameCategoryRepository.destroy({ where: { id } });
  }

  async createAltName(data: CreateAltNameCategoryDto, categoryId: number) {
    return await this.altNameCategoryRepository.create({
      categoryId,
      caption: data.caption,
      description: data.description,
      localeId: data.locale.id,
    });
  }

  async updateAltName(data: CreateAltNameCategoryDto, categoryId: number) {
    return await this.altNameCategoryRepository.update(
      {
        categoryId,
        caption: data.caption,
        description: data.description,
        localeId: data.locale.id,
      },
      { where: { id: data.id } },
    );
  }

  async updateAltNamesCategory(altNames: CreateAltNameCategoryDto[], categoryId: number) {
    await Promise.all(
      altNames.map(async (altName) => {
        if (altName.action === 'update') return this.updateAltName(altName, categoryId);
        if (altName.action === 'create') return this.createAltName(altName, categoryId);
        if (altName.action === 'remove') return this.destroyAltName(altName.id);
      }),
    );
  }

  async create(altNames: CreateAltNameCategoryDto[], categoryId: number) {
    await Promise.all(
      altNames.map(async ({ locale, ...other }) => {
        return await this.altNameCategoryRepository.create({
          ...other,
          localeId: locale.id,
          categoryId,
        });
      }),
    );
  }
}
