import { z } from 'zod';

export const getTranslatesInput = z.enum(['ru', 'en']);

export type IGetTranslateInput = 'ru' | 'en';
