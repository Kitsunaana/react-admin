import { Tag } from '../domain/tag.entity';
import { ITag } from '../domain/tag.type';

export interface ITagRepositoryImpl {
  getAll(): Promise<Tag[]>;
  upsert(payload: ITag): Promise<[Tag, boolean]>;
  removeUnused(): Promise<number>;
}
