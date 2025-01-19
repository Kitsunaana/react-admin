import { z } from 'zod';
import { IMediaCommon, mediaCommonSchema } from '../common/media.common';
import { characteristicCommonSchema, ICharacteristicCommon } from '../common/characteristic.common';
import { altNameCommonSchema, IAltNameCommon } from '../common/alt-name.common';
import { ITagCommon, tagCommonSchema } from '../common/tag.common';
import { categoryCommonSchema, ICategoryCommon } from '../common/category.common';

export interface IPostCategoryInput extends ICategoryCommon {
  media: Array<IMediaCommon>;
  characteristics: Array<ICharacteristicCommon>;
  altNames: Array<IAltNameCommon>;
  tags: Array<ITagCommon>;
}

export const postCategoryInput = categoryCommonSchema.extend({
  media: z.array(mediaCommonSchema),
  altNames: z.array(altNameCommonSchema),
  characteristics: z.array(characteristicCommonSchema),
  tags: z.array(tagCommonSchema),
});
