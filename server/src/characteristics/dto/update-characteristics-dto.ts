import { CreateCharacteristicsDto } from './create-characteristics-dto';

export class UpdatedCharacteristicsDto extends CreateCharacteristicsDto {
  readonly action: 'update' | 'create' | 'remove';
  readonly id?: number;
}
