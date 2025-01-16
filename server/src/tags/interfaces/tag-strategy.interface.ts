import { Model } from 'sequelize-typescript';

export type ICreateTagPayload = {
  id: string;
  color: string;
  icon: string | null;
};

export type IUpdateTagPayload = {
  id: string;
  color: string;
  icon: string | null;
};

export interface ITagStrategyImpl<Create extends Model = Model, Update = Create> {
  create(payload: ICreateTagPayload, ownerId: string): Promise<Create>;
  update(payload: IUpdateTagPayload): Promise<[number, Update[]]>;
  removeById(tagId: string): Promise<number>;
  removeByOwnerId(ownerId: string): Promise<number>;
}
