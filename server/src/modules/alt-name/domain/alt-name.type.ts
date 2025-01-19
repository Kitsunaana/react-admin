import { ILocale } from './locale.type';

export type IAltName = {
  id: string;
  caption: string;
  description: string;
  locale: ILocale;
  status: 'update' | 'create' | 'remove' | 'none';
};
