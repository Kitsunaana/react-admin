import { z } from 'zod';
import { altNameCommonSchema, IAltNameCommon } from '../common/alt-name.common';
import { ITagCommon, tagCommonSchema } from '../common/tag.common';
import { characteristicCommonSchema, ICharacteristicCommon } from '../common/characteristic.common';
import { IMediaCommon, mediaCommonSchema } from '../common/media.common';
import { categoryCommonSchema, ICategoryCommon } from '../common/category.common';

export interface IUpdateCategoryOutput extends ICategoryCommon {
  id: string;
  order: number;

  media: Array<
    IMediaCommon & {
      deleted?: boolean;
    }
  >;
  characteristics: Array<ICharacteristicCommon>;
  altNames: Array<IAltNameCommon>;
  tags: Array<ITagCommon>;
}

export const updateCategoryOutput = categoryCommonSchema.extend({
  id: z.string(),
  order: z.number(),

  media: z.array(
    mediaCommonSchema.extend({
      delete: z.boolean().optional(),
    }),
  ),
  characteristics: z.array(characteristicCommonSchema),
  altNames: z.array(altNameCommonSchema),
  tags: z.array(tagCommonSchema),
});
