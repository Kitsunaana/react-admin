import { z } from 'zod';
import { ILocale } from '../domain/locale.type';

export type ICreateLocaleInput = ILocale[];

export const createLocaleInput = z.array(
  z.object({
    id: z.string(),
    caption: z.string(),
    altName: z.string(),
    code: z.string(),
  }),
);
