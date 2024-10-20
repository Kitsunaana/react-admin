/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Category Api
 * Category Api
 * OpenAPI spec version: 1.0.0
 */
import type { CategoryDtoActiveImageId } from "./categoryDtoActiveImageId"
import type { AltName } from "./alt-name/altName"
import type { CaptionPosition } from "./captionPosition"
import type { Characteristic } from "./characteristic/characteristic"
import type { Media } from "./media/media"
import type { CategoryDtoOrder } from "./categoryDtoOrder"
import type { Tag } from "./tag"

export interface CategoryDto {
  activeImageId: CategoryDtoActiveImageId;
  altNames: AltName[];
  bgColor: string;
  blur: number;
  caption: string;
  captionPosition: CaptionPosition;
  characteristics: Characteristic[];
  color: string;
  description: string;
  id: number;
  isShowPhotoWithGoods: boolean;
  media: Media[];
  order: CategoryDtoOrder;
  tags: Tag[];
}
