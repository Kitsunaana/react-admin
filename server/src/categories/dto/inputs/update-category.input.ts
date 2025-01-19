import { z } from 'zod';
import { ITagCommon, tagCommonSchema } from '../common/tag.common';
import { altNameCommonSchema, IAltNameCommon } from '../common/alt-name.common';
import { characteristicCommonSchema, ICharacteristicCommon } from '../common/characteristic.common';
import { IMediaCommon, mediaCommonSchema } from '../common/media.common';
import { categoryCommonSchema, ICategoryCommon } from '../common/category.common';

export interface IUpdateCategoryInput extends ICategoryCommon {
  id: string;

  media: Array<
    IMediaCommon & {
      delete?: boolean;
    }
  >;
  characteristics: Array<ICharacteristicCommon>;
  altNames: Array<IAltNameCommon>;
  tags: Array<ITagCommon>;
}

export const updateCategoryInput = categoryCommonSchema.extend({
  id: z.string(),
  media: z.array(
    mediaCommonSchema.extend({
      delete: z.boolean().optional(),
    }),
  ),
  altNames: z.array(altNameCommonSchema),
  characteristics: z.array(characteristicCommonSchema),
  tags: z.array(tagCommonSchema),
});
