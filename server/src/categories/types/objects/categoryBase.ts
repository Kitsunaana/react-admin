/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * Category Api
 * Category Api
 * OpenAPI spec version: 1.0.0
 */
import type { CategoryBaseActiveImageId } from './categoryBaseActiveImageId';
import type { AltNameCreate } from './alt-name/altNameCreate';
import type { CaptionPosition } from './captionPosition';
import type { Characteristic } from './characteristic/characteristic';
import type { Media } from './media/media';

export interface CategoryBase {
  activeImageId: CategoryBaseActiveImageId;
  altNames: AltNameCreate[];
  bgColor: string;
  blur: number;
  caption: string;
  captionPosition: CaptionPosition;
  characteristics: Characteristic[];
  color: string;
  description: string;
  isShowPhotoWithGoods: boolean;
  media: Media[];
}