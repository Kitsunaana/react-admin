import { ILocale } from '../domain/alt-name.type';
import { Locale } from '../domain/locale.entity';

export interface ILocaleRepositoryImpl {
  createLocale(payload: ILocale): Promise<Locale>;
  getAll(): Promise<Locale[]>;
}
