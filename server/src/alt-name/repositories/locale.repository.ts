import { InjectModel } from '@nestjs/sequelize';
import { Locale } from '../domain/locale.entity';
import { ILocale } from '../domain/alt-name.type';

export class LocaleRepository {
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
