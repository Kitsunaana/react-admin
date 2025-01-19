import { Position } from '../../domain/custom-category';
import { z } from 'zod';

export interface ICategoryCommon {
  caption: string;
  description: string;

  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  activeImageId: null | string;
  captionPosition: Position;
}

export const categoryCommonSchema = z.object({
  caption: z.string(),
  description: z.string(),

  isShowPhotoWithGoods: z.boolean(),
  bgColor: z.string(),
  color: z.string(),
  blur: z.number().int().min(0).max(20),
  activeImageId: z.string().nullable(),
  captionPosition: z.enum([
    'top-left',
    'top-center',
    'top-right',
    'center-left',
    'center-center',
    'center-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ]),
});
