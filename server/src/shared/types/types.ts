import { Position } from '../../entities/custom-category';
import { IAltName } from '../../alt-name/domain/alt-name.type';
import { ITag } from 'src/tags/domain/tag.type';
import { Characteristic } from '../../characteristics/domain/characteristic.entity';

export type Media = {
  id: string;
  caption: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  order: number;
  delete?: boolean;
};

export interface Category {
  id: string;
  caption: string;
  description: string;
  media: Media[];
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  activeImageId: null | string;
  captionPosition: Position;
  characteristics: Characteristic[];
  altNames: IAltName[];
  tags: ITag[];
  order: number;
}
