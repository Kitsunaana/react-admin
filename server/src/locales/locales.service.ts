import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AltNameCategory, Locale } from '../entities-sequelize/locale.entity';

export class CreateAltNameCategoryDto {
  caption: string;
  code: string;
  lang: string;
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

  async createAltNamesCategory(altNames: CreateAltNameCategoryDto[], categoryId: number) {
    await Promise.all(
      altNames.map(async (altName) => {
        const findLocale = await this.localesRepository.findOne({ where: { code: altName.code } });

        await this.altNameCategoryRepository.create({
          categoryId,
          caption: altName.caption,
          localeId: findLocale.id,
        });
      }),
    );
  }
}
