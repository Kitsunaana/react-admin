import { ILocale } from '../domain/alt-name.type';
import { z } from 'zod';

export type ICreateLocaleInput = ILocale[];

export const createLocaleInput = z.array(
  z.object({
    id: z.string(),
    caption: z.string(),
    altName: z.string(),
    code: z.string(),
  }),
);
