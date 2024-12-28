import { Position } from '../../entities/custom-category';

export type Media = {
  id: string;
  filename: string;
  mimetype: string;
  originalName: string;
  path: string;
  size: number;
  order: number | null;
  delete?: boolean;
};

export type Locale = {
  id: string;
  altName: string;
  caption: string;
  code: string;
};

export type AltName = {
  id: string;
  caption: string;
  description: string;
  locale: Locale;
  status: 'update' | 'create' | 'remove' | 'none';
};

export type Characteristic = {
  id: string;
  caption: string;
  hideClient: boolean;
  unit: string | null;
  value: string;
  status: 'update' | 'create' | 'remove' | 'none';
};

export type Tag = {
  id: string;
  caption: string;
  color: string;
  icon: string | null;
  status: 'update' | 'create' | 'remove' | 'none';
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
  altNames: AltName[];
  tags: Tag[];
  order: number;
}
