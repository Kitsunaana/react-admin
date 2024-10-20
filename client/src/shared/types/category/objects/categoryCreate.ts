/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Category Api
 * Category Api
 * OpenAPI spec version: 1.0.0
 */
import type { CategoryCreateActiveImageId } from "./categoryCreateActiveImageId"
import type { AltNameCreate } from "./alt-name/altNameCreate"
import type { CaptionPosition } from "./captionPosition"
import type { CharacteristicCreate } from "./characteristic/characteristicCreate"
import type { CategoryCreateDescription } from "./categoryCreateDescription"
import type { Image } from "./media/image"
import type { MediaCreate } from "./media/mediaCreate"
import type { TagCreate } from "./tagCreate"

export interface CategoryCreate {
  activeImageId: CategoryCreateActiveImageId;
  altNames: AltNameCreate[];
  bgColor: string;
  blur: number;
  caption: string;
  captionPosition: CaptionPosition;
  characteristics: CharacteristicCreate[];
  color: string;
  description: CategoryCreateDescription;
  images: Image[];
  isShowPhotoWithGoods: boolean;
  media: MediaCreate[];
  tags: TagCreate[];
}
