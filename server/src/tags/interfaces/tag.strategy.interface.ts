import { Model } from 'sequelize-typescript';

export interface ICreateTagPayload {
  tagId: string;
  ownerId: string;
  color: string;
  icon: string | null;
}

export interface IUpdateTagPayload {
  id: string;
  tagId: string;
  ownerId: string;
  color: string;
  icon: string | null;
}

export interface ITagStrategyImpl<Create extends Model = Model, Update = Create> {
  create(payload: ICreateTagPayload): Promise<Create>;
  update(payload: IUpdateTagPayload): Promise<[number, Update[]]>;
  removeById(tagId: string): Promise<number>;
  removeByOwnerId(ownerId: string): Promise<number>;
}
