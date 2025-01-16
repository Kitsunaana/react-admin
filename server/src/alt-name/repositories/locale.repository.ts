import { InjectModel } from '@nestjs/sequelize';
import { Locale } from '../domain/locale.entity';

export class LocaleRepository {
  constructor(@InjectModel(Locale) private localeModel: typeof Locale) {}

  public async getAll(): Promise<Locale[]> {
    return await this.localeModel.findAll({
      order: [['caption', 'asc']],
    });
  }
}
