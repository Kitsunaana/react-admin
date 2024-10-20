import { Position } from '../../entities/custom-category';

export class CreateCategoryDto {
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  captionPosition: Position;
  activeImageId: string;
}
