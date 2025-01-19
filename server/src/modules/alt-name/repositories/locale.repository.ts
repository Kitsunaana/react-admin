import { InjectModel } from '@nestjs/sequelize';
import { Locale } from '../domain/locale.entity';
import { ILocaleRepositoryImpl } from '../interfaces/locale.repository.interface';
import { ILocale } from '../domain/locale.type';

export class LocaleRepository implements ILocaleRepositoryImpl {
  constructor(@InjectModel(Locale) private localeModel: typeof Locale) {}

  public async createLocale(payload: ILocale): Promise<Locale> {
    return await this.localeModel
      .findOrCreate({
        defaults: payload,
        where: {
          id: payload.id,
        },
      })
      .then((locale) => locale[0].get({ plain: true }));
  }

  public async getAll(): Promise<Locale[]> {
    return await this.localeModel.findAll({
      order: [['caption', 'asc']],
    });
  }
}
