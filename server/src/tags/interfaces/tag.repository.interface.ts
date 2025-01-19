import { Tag } from '../domain/tag.entity';

export interface ITagRepositoryImpl {
  getAll(): Promise<Tag[]>;
  upsert(caption: string): Promise<Tag>;
  removeUnused(): Promise<number>;
}
