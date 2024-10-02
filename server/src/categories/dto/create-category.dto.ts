import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagCreate } from '../../entities/tag.entity';
import { Position } from '../../entities/custom-category';
import { Media } from '../../entities/media.entity';
import { TagCreateDto } from '../../tags/tags.service';
import type { CaptionPosition, CategoryCreateActiveImageId } from '../types/objects';
import type { AltName } from '../types/objects/alt-name';
import type { Characteristic } from '../types/objects/characteristic';

export class CreateCategoryDto {
  isShowPhotoWithGoods: boolean;
  bgColor: string;
  color: string;
  blur: number;
  captionPosition: Position;
  activeImageId: string;
}
