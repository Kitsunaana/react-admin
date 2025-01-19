import { IPostCategoryInput } from '../dto/inputs/post-category.input';
import { CustomCategory, Position } from '../../entities/custom-category';

export type ICreateCategoryCustomPayload = {
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  activeImageId: null | string;
  captionPosition: Position;
};

export interface IUpdateCategoryCustomPayload {
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  activeImageId: null | string;
  captionPosition: Position;
}

export interface CategoryCustomRepositoryImpl {
  create(payload: IPostCategoryInput, categoryId: string): Promise<CustomCategory>;
  update(payload: IUpdateCategoryCustomPayload, categoryId: string): Promise<CustomCategory[]>;
}
