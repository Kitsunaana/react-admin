import { z } from 'zod';
import { IMediaCommon, mediaCommonSchema } from '../common/media.common';
import { altNameCommonSchema, IAltNameCommon } from '../common/alt-name.common';

export interface IGetAllCategoriesOutput {
  count: number;
  rows: Array<{
    id: string;
    order: number;

    caption: string;
    description: string;

    media: Array<IMediaCommon>;
    altNames: Array<IAltNameCommon>;
  }>;
}

export const getAllCategoriesOutput = z.object({
  count: z.number(),
  rows: z.object({
    id: z.string(),
    order: z.number(),

    caption: z.string(),
    description: z.string(),

    media: z.array(mediaCommonSchema),
    altNames: z.array(altNameCommonSchema),
  }),
});
