import { Model } from 'sequelize-typescript';

export interface ICreateAltNamePayload {
  id: string;
  ownerId: string;
  caption: string;
  description: string;
  localeId: string;
}

export interface IUpdateAltNamePayload {
  id: string;
  ownerId: string;
  caption: string;
  description: string;
  localeId: string;
}

export interface IAltNameStrategyImpl<Create extends Model = Model, Update extends Model = Create> {
  create(payload: ICreateAltNamePayload): Promise<Create>;
  update(payload: IUpdateAltNamePayload): Promise<[number, Update[]]>;
  removeById(id: string): Promise<number>;
  removeByOwnerId(ownerId: string): Promise<number>;
}
