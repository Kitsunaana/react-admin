import { z } from 'zod';
import { ITagCommon, tagCommonSchema } from '../common/tag.common';
import { altNameCommonSchema, IAltNameCommon } from '../common/alt-name.common';
import { characteristicCommonSchema, ICharacteristicCommon } from '../common/characteristic.common';
import { IMediaCommon, mediaCommonSchema } from '../common/media.common';
import { categoryCommonSchema, ICategoryCommon } from '../common/category.common';

export interface IGetByIdCategoryOutput extends ICategoryCommon {
  id: string;
  order: number;

  media: Array<IMediaCommon>;
  characteristics: Array<ICharacteristicCommon>;
  altNames: Array<IAltNameCommon>;
  tags: Array<ITagCommon>;
}

export const getByIdCategoryOutput = categoryCommonSchema.extend({
  id: z.string(),
  order: z.number(),

  media: z.array(mediaCommonSchema),
  characteristics: z.array(characteristicCommonSchema),
  altNames: z.array(altNameCommonSchema),
  tags: z.array(tagCommonSchema),
});
