import { Model } from 'sequelize-typescript';

export type CharacteristicCreatePayload = {
  characteristicId: string;
  ownerId: string;
  unitId: string;
  value: string;
  hideClient: boolean;
};

export type CharacteristicUpdatePayload = {
  id: string;
  ownerId: string;
  unitId: string;
  characteristicId: string;
  hideClient: boolean;
  value: string;
};

export interface CharacteristicStrategyImpl<Create extends Model = Model, Update = Create> {
  create(payload: CharacteristicCreatePayload): Promise<Create>;
  update(payload: CharacteristicUpdatePayload): Promise<Update[]>;
  removeById(id: string): Promise<number>;
  removeByOwnerId(ownerId: string): Promise<number>;
}
