import { Model } from 'sequelize-typescript';

export interface CreateAltNamePayload {
  id: string;
  ownerId: string;
  caption: string;
  description: string;
  localeId: string;
}

export interface UpdateAltNamePayload {
  id: string;
  ownerId: string;
  caption: string;
  description: string;
  localeId: string;
}

export interface AltNameStrategyImpl<Create extends Model = Model, Update extends Model = Create> {
  create(payload: CreateAltNamePayload): Promise<Create>;
  update(payload: UpdateAltNamePayload): Promise<[number, Update[]]>;
  removeById(id: string): Promise<number>;
  removeByOwnerId(ownerId: string): Promise<number>;
}
