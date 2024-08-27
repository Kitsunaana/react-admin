import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AltNameCategory, Locale } from '../entities-sequelize/locale.entity';

export class CreateAltNameCategoryDto {
  id?: number;
  caption: string;
  description: string | null;
  deleted?: boolean;
  action?: 'create' | 'update' | 'remove';
  locale: {
    id: number;
    caption: string;
    altName: string;
    code: string;
  };
}

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

  async updateAltNamesCategory(altNames: CreateAltNameCategoryDto[], categoryId: number) {
    await Promise.all(
      altNames.map(async (altName) => {
        if (altName?.action === 'update' && altName.id) {
          await this.altNameCategoryRepository.update(
            {
              categoryId,
              caption: altName.caption,
              description: altName.description,
              localeId: altName.locale.id,
            },
            { where: { id: altName.id } },
          );
        }

        if (altName?.action === 'create') {
          await this.altNameCategoryRepository.create({
            categoryId,
            caption: altName.caption,
            description: altName.description,
            localeId: altName.locale.id,
          });
        }

        if (altName.action === 'remove') {
          await this.altNameCategoryRepository.destroy({ where: { id: altName.id } });
        }
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
