import { Position } from 'src/entities/custom-category';
import { AltName, Characteristic, Media, Tag } from 'src/shared/types/types';
import { z } from 'zod';

export type PatchCategoryDto = {
  id: string;
  caption: string;
  description: string;
  media: Media[];
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  activeImageId: null | string;
  captionPosition: Position;
  characteristics: Characteristic[];
  altNames: AltName[];
  tags: Tag[];
  order: number;
};

export const patchCategorySchema = z.object({
  id: z.string(),
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
  order: z.number(),
  media: z.object({
    id: z.string(),
    filename: z.string(),
    mimetype: z.string(),
    originalName: z.string(),
    path: z.string(),
    size: z.number().int().positive(),
    order: z.number().nullable(),
    delete: z.boolean().optional(),
  }),
  altNames: z.object({
    id: z.string(),
    caption: z.string(),
    description: z.string(),
    locale: z.object({
      id: z.string(),
      altName: z.string(),
      caption: z.string(),
      code: z.string(),
    }),
    status: z.enum(['update', 'create', 'remove', 'none']),
  }),
  characteristics: z.object({
    id: z.string(),
    caption: z.string(),
    hideClient: z.string(),
    unit: z.string().nullable(),
    value: z.string(),
    status: z.enum(['update', 'create', 'remove', 'none']),
  }),
  tags: z.object({
    id: z.string(),
    caption: z.string(),
    color: z.string(),
    icon: z.string().nullable(),
    status: z.enum(['update', 'create', 'remove', 'none']),
  }),
});
