import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AltNameCategory, Locale as LocaleEntity } from '../entities/locale.entity';
import { AltName } from '../shared/types/types';

@Injectable()
export class LocalesService {
  constructor(
    @InjectModel(LocaleEntity) private localesRepository: typeof LocaleEntity,
    @InjectModel(AltNameCategory) private altNameCategoryRepository: typeof AltNameCategory,
  ) {}

  async getAll() {
    return await this.localesRepository.findAll({ order: [['caption', 'asc']] });
  }

  async delete(categoryId: string) {
    return await this.altNameCategoryRepository.destroy({
      where: { categoryId: categoryId },
    });
  }

  async destroyAltName(id: string) {
    return await this.altNameCategoryRepository.destroy({ where: { id } });
  }

  async createAltName(data: AltName, categoryId: string) {
    return await this.altNameCategoryRepository.create({
      categoryId,
      caption: data.caption,
      description: data.description as string | null,
      localeId: data.locale.id,
    });
  }

  async updateAltName(data: AltName, categoryId: string) {
    return await this.altNameCategoryRepository.update(
      {
        categoryId,
        caption: data.caption,
        description: data.description,
        localeId: data.locale.id,
      },
      {
        where: { id: data.id },
        returning: false,
      },
    );
  }

  async update(altNames: AltName[], categoryId: string) {
    await Promise.all(
      altNames.map(async (altName) => {
        if (altName.status === 'update') return this.updateAltName(altName, categoryId);
        if (altName.status === 'create') return this.createAltName(altName, categoryId);
        if (altName.status === 'remove') return this.destroyAltName(altName.id);
      }),
    );
  }

  async create(altNames: AltName[], categoryId: string) {
    await Promise.all(
      altNames.map(async ({ locale, ...other }) => {
        return await this.altNameCategoryRepository.create({
          localeId: locale.id,
          caption: other.caption,
          description: other.description as string | null,
          categoryId,
        });
      }),
    );
  }
}
