import { Locale } from '../domain/locale.entity';
import { ILocale } from '../domain/locale.type';

export interface ILocaleRepositoryImpl {
  createLocale(payload: ILocale): Promise<Locale>;
  getAll(): Promise<Locale[]>;
}
